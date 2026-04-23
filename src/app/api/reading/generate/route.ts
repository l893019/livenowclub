import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import Redis from 'ioredis'
import { createHash } from 'crypto'

import {
  calculateDimensions,
  generateIdentity,
  type QuizAnswers,
} from '@/lib/dimensions'
import {
  getIndividualPrompt,
  getPairPrompt,
  getGroupPrompt,
  type IndividualReading,
  type PairReading,
  type GroupReading,
} from '@/lib/reading-prompts'

// =============================================================================
// REDIS CLIENT
// =============================================================================

const redis = new Redis(process.env.REDIS_URL || '')

// =============================================================================
// ANTHROPIC CLIENT
// =============================================================================

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// =============================================================================
// TYPES
// =============================================================================

type IndividualRequest = {
  type: 'individual'
  answers: QuizAnswers
}

type MemberData = {
  name: string
  answers: QuizAnswers
}

type PairRequest = {
  type: 'pair'
  members: [MemberData, MemberData]
}

type GroupRequest = {
  type: 'group'
  members: MemberData[]
}

type ReadingRequest = IndividualRequest | PairRequest | GroupRequest

type ReadingResponse =
  | { type: 'individual'; reading: IndividualReading }
  | { type: 'pair'; reading: PairReading }
  | { type: 'group'; reading: GroupReading }

// =============================================================================
// HELPERS
// =============================================================================

function generateCacheKey(request: ReadingRequest): string {
  const hash = createHash('sha256')

  if (request.type === 'individual') {
    hash.update(`individual:${JSON.stringify(request.answers)}`)
  } else if (request.type === 'pair') {
    // Sort members by name for consistent hashing
    const sorted = [...request.members].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    hash.update(`pair:${JSON.stringify(sorted)}`)
  } else {
    // Sort members by name for consistent hashing
    const sorted = [...request.members].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    hash.update(`group:${JSON.stringify(sorted)}`)
  }

  return `reading:${hash.digest('hex')}`
}

async function generateIndividualReading(
  answers: QuizAnswers
): Promise<IndividualReading> {
  const dimensions = calculateDimensions(answers)
  const identity = generateIdentity(dimensions)
  const prompt = getIndividualPrompt(answers, dimensions, identity)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  // Extract text from response
  const textContent = response.content.find((block) => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response')
  }

  // Parse JSON response
  const reading = JSON.parse(textContent.text) as IndividualReading
  return reading
}

async function generatePairReading(
  members: [MemberData, MemberData]
): Promise<PairReading> {
  const [a, b] = members

  const dimensionsA = calculateDimensions(a.answers)
  const identityA = generateIdentity(dimensionsA)

  const dimensionsB = calculateDimensions(b.answers)
  const identityB = generateIdentity(dimensionsB)

  const prompt = getPairPrompt(
    {
      name: a.name,
      answers: a.answers,
      dimensions: dimensionsA,
      identity: identityA,
    },
    {
      name: b.name,
      answers: b.answers,
      dimensions: dimensionsB,
      identity: identityB,
    }
  )

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  // Extract text from response
  const textContent = response.content.find((block) => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response')
  }

  // Parse JSON response
  const reading = JSON.parse(textContent.text) as PairReading
  return reading
}

async function generateGroupReading(
  members: MemberData[]
): Promise<GroupReading> {
  const membersWithDimensions = members.map((member) => {
    const dimensions = calculateDimensions(member.answers)
    const identity = generateIdentity(dimensions)
    return {
      name: member.name,
      answers: member.answers,
      dimensions,
      identity,
    }
  })

  const prompt = getGroupPrompt(membersWithDimensions)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  // Extract text from response
  const textContent = response.content.find((block) => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response')
  }

  // Parse JSON response
  const reading = JSON.parse(textContent.text) as GroupReading
  return reading
}

// =============================================================================
// API ROUTE
// =============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ReadingRequest

    // Validate request
    if (!body.type) {
      return NextResponse.json(
        { error: 'Missing type field' },
        { status: 400 }
      )
    }

    if (
      body.type === 'individual' &&
      (!body.answers || typeof body.answers !== 'object')
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid answers field' },
        { status: 400 }
      )
    }

    if (
      (body.type === 'pair' || body.type === 'group') &&
      (!body.members || !Array.isArray(body.members))
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid members field' },
        { status: 400 }
      )
    }

    if (body.type === 'pair' && body.members.length !== 2) {
      return NextResponse.json(
        { error: 'Pair reading requires exactly 2 members' },
        { status: 400 }
      )
    }

    if (body.type === 'group' && body.members.length < 2) {
      return NextResponse.json(
        { error: 'Group reading requires at least 2 members' },
        { status: 400 }
      )
    }

    // Generate cache key
    const cacheKey = generateCacheKey(body)

    // Check cache
    const cached = await redis.get(cacheKey)
    if (cached) {
      const reading = JSON.parse(cached)
      return NextResponse.json({ type: body.type, reading, cached: true })
    }

    // Generate reading based on type
    let reading: IndividualReading | PairReading | GroupReading

    if (body.type === 'individual') {
      reading = await generateIndividualReading(body.answers)
    } else if (body.type === 'pair') {
      reading = await generatePairReading(
        body.members as [MemberData, MemberData]
      )
    } else {
      reading = await generateGroupReading(body.members)
    }

    // Cache the result (expire after 30 days)
    await redis.set(cacheKey, JSON.stringify(reading), 'EX', 60 * 60 * 24 * 30)

    return NextResponse.json({
      type: body.type,
      reading,
      cached: false,
    } as ReadingResponse & { cached: boolean })
  } catch (error) {
    console.error('Error generating reading:', error)

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse LLM response' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate reading' },
      { status: 500 }
    )
  }
}

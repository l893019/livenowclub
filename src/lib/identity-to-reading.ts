/**
 * Map pre-generated identity content to reading format
 *
 * The identity data already contains rich content (superpower, blindSpot,
 * howYouGotHere, description). This module maps it to the reading format
 * for instant display without LLM calls.
 */

import type { Identity } from './identities'
import type { IndividualReading } from './reading-prompts'

/**
 * Convert an identity's pre-generated content to reading format.
 *
 * Mapping:
 * - pattern ← howYouGotHere (explains how answers led here)
 * - gifts ← superpowerExpanded (what this orientation gives you)
 * - movement ← description + alignsWith/tensionWith (how you engage)
 * - tradeoff ← blindSpotExpanded (the shadow side)
 */
export function identityToReading(identity: Identity): IndividualReading {
  // Condense superpowerExpanded to 2-3 key sentences for gifts
  const giftsParagraphs = identity.superpowerExpanded.split('\n\n')
  const gifts = giftsParagraphs.length > 1
    ? giftsParagraphs[0] + '\n\n' + giftsParagraphs[1]
    : identity.superpowerExpanded

  // Combine description with movement hints for movement section
  const movement = `${identity.description}\n\n${identity.pull}—that's where you'll find yourself returning. ${identity.edge}.`

  // Condense blindSpotExpanded for tradeoff
  const tradeoffParagraphs = identity.blindSpotExpanded.split('\n\n')
  const tradeoff = tradeoffParagraphs.length > 0
    ? identity.blindSpot + '\n\n' + tradeoffParagraphs[0]
    : identity.blindSpotExpanded

  return {
    identity: identity.name,
    pattern: identity.howYouGotHere,
    gifts,
    movement,
    tradeoff,
  }
}

/**
 * Pre-generated readings keyed by identity key.
 * Lazily populated on first access.
 */
let cachedReadings: Record<string, IndividualReading> | null = null

/**
 * Get a pre-generated reading for an identity key.
 * Returns undefined if identity not found.
 */
export function getPreGeneratedReading(identityKey: string): IndividualReading | undefined {
  // Lazy import to avoid circular dependency
  const { identities } = require('./identities')

  if (!cachedReadings) {
    cachedReadings = {}
    for (const [key, identity] of Object.entries(identities)) {
      cachedReadings[key] = identityToReading(identity as Identity)
    }
  }

  return cachedReadings[identityKey]
}

/**
 * Get all pre-generated readings.
 */
export function getAllPreGeneratedReadings(): Record<string, IndividualReading> {
  // Lazy import to avoid circular dependency
  const { identities } = require('./identities')

  if (!cachedReadings) {
    cachedReadings = {}
    for (const [key, identity] of Object.entries(identities)) {
      cachedReadings[key] = identityToReading(identity as Identity)
    }
  }

  return cachedReadings
}

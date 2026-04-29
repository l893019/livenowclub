/**
 * Identity System for Utopia Quiz
 *
 * 84 unique identities generated from:
 * - 7 nouns (based on Agency score)
 * - 12 adjectives (based on Certainty x Posture quadrant, 3 per quadrant)
 *
 * Each identity has rich content: descriptions, superpowers, blind spots,
 * compatibility insights, book recommendations, and famous figures.
 */

// =============================================================================
// Core Types
// =============================================================================

export type Noun =
  | 'architect'
  | 'builder'
  | 'maker'
  | 'shaper'
  | 'observer'
  | 'noticer'
  | 'witness'

export type Quadrant =
  | 'settled-expansive'
  | 'settled-protective'
  | 'seeking-expansive'
  | 'seeking-protective'

export type Adjective =
  // Settled + Expansive (certain + growth-oriented)
  | 'visionary'  // most extreme
  | 'driven'     // middle
  | 'poised'     // mildest
  // Settled + Protective (certain + cautious)
  | 'rooted'     // most extreme
  | 'steady'     // middle
  | 'grounded'   // mildest
  // Seeking + Expansive (questioning + growth-oriented)
  | 'adventurous' // most extreme
  | 'curious'     // middle
  | 'open'        // mildest
  // Seeking + Protective (questioning + cautious)
  | 'watchful'    // most extreme
  | 'careful'     // middle
  | 'thoughtful'  // mildest

export type Identity = {
  // Core
  key: string // "curious-architect"
  name: string // "Curious Architect"
  color: string // "#7c3aed"

  // Position
  noun: Noun
  adjective: Adjective
  quadrant: Quadrant

  // One-liners
  utopia: string // "Their utopia is an experiment..."
  description: string // 2-3 sentences
  pull: string // "toward undiscovered structure"
  edge: string // "you see systems others haven't imagined"
  oneSentence: string // Tweetable summary

  // Depth
  superpower: string // "building as exploration"
  superpowerExpanded: string // 3 paragraphs
  blindSpot: string // Short version
  blindSpotExpanded: string // 3 paragraphs
  coreBeliefs: string[] // 4 beliefs
  howYouGotHere: string // Paragraph explaining the mapping

  // Dimension-based compatibility
  alignsWith: string // "other Seekers—you share..."
  tensionWith: string // "Settled types—their certainty..."
  growsWith: string // "higher-Agency types—they push..."

  // Recommendations
  books: {
    title: string
    author: string
    reason: string
  }[] // 3 books

  famousFigures: {
    real: string[] // 3 real people
    fictional: string[] // 3 fictional characters
  }
}

// =============================================================================
// Constants: Noun Thresholds (Agency score mapping)
// =============================================================================

/**
 * Maps Agency score ranges to nouns.
 * Higher agency = more active/building orientation.
 * Lower agency = more receptive/witnessing orientation.
 */
export const NOUN_THRESHOLDS: { min: number; noun: Noun }[] = [
  { min: 0.6, noun: 'architect' },
  { min: 0.3, noun: 'builder' },
  { min: 0.0, noun: 'maker' },
  { min: -0.3, noun: 'shaper' },
  { min: -0.5, noun: 'observer' },
  { min: -0.7, noun: 'noticer' },
  // Below -0.7 is 'witness' (handled as default)
]

/**
 * All nouns in order from highest to lowest agency.
 */
export const NOUNS: Noun[] = [
  'architect',
  'builder',
  'maker',
  'shaper',
  'observer',
  'noticer',
  'witness',
]

// =============================================================================
// Constants: Adjectives by Quadrant
// =============================================================================

/**
 * Adjectives organized by quadrant (Certainty x Posture).
 * Ordered by intensity within each quadrant.
 */
export const ADJECTIVES_BY_QUADRANT: Record<Quadrant, Adjective[]> = {
  'settled-expansive': ['visionary', 'driven', 'poised'],
  'settled-protective': ['rooted', 'steady', 'grounded'],
  'seeking-expansive': ['adventurous', 'curious', 'open'],
  'seeking-protective': ['watchful', 'careful', 'thoughtful'],
}

/**
 * All adjectives as a flat array.
 */
export const ADJECTIVES: Adjective[] = [
  'visionary',
  'driven',
  'poised',
  'rooted',
  'steady',
  'grounded',
  'adventurous',
  'curious',
  'open',
  'watchful',
  'careful',
  'thoughtful',
]

// =============================================================================
// Color System
// =============================================================================

/**
 * Base colors for each quadrant.
 * These are the "anchor" colors that get varied by agency level.
 */
export const QUADRANT_BASE_COLORS: Record<Quadrant, string> = {
  'settled-expansive': '#ea580c', // Orange/Gold - Confident warmth
  'settled-protective': '#0d9488', // Teal/Green - Grounded calm
  'seeking-expansive': '#7c3aed', // Violet/Purple - Curious exploration
  'seeking-protective': '#6366f1', // Indigo/Blue - Thoughtful depth
}

/**
 * Color palette for each identity.
 * Varies by quadrant (hue) and agency level (saturation/lightness).
 *
 * High agency (Architect, Builder): More saturated, brighter
 * Mid agency (Maker, Shaper): Medium saturation
 * Low agency (Observer, Noticer, Witness): Softer, more muted
 */
export const IDENTITY_COLORS: Record<string, string> = {
  // Settled + Expansive (Orange/Gold family)
  // High agency - saturated, bright
  'visionary-architect': '#ea580c',
  'driven-architect': '#f97316',
  'poised-architect': '#fb923c',
  'visionary-builder': '#dc5208',
  'driven-builder': '#ed6c0c',
  'poised-builder': '#f08030',
  // Mid agency - medium saturation
  'visionary-maker': '#c94507',
  'driven-maker': '#d95a12',
  'poised-maker': '#e06e26',
  'visionary-shaper': '#b63e07',
  'driven-shaper': '#c65012',
  'poised-shaper': '#d46326',
  // Low agency - softer, muted
  'visionary-observer': '#a3380a',
  'driven-observer': '#b34815',
  'poised-observer': '#c45a28',
  'visionary-noticer': '#8f3210',
  'driven-noticer': '#9f421a',
  'poised-noticer': '#af5430',
  'visionary-witness': '#7c2c14',
  'driven-witness': '#8c3c1e',
  'poised-witness': '#9c4e34',

  // Settled + Protective (Teal/Green family)
  // High agency - saturated, bright
  'rooted-architect': '#0d9488',
  'steady-architect': '#14b8a6',
  'grounded-architect': '#2dd4bf',
  'rooted-builder': '#0b8579',
  'steady-builder': '#10a392',
  'grounded-builder': '#25c0ab',
  // Mid agency - medium saturation
  'rooted-maker': '#09756b',
  'steady-maker': '#0c8f80',
  'grounded-maker': '#1aab98',
  'rooted-shaper': '#08665d',
  'steady-shaper': '#0a7c70',
  'grounded-shaper': '#159586',
  // Low agency - softer, muted
  'rooted-observer': '#065750',
  'steady-observer': '#086a62',
  'grounded-observer': '#108074',
  'rooted-noticer': '#054943',
  'steady-noticer': '#065954',
  'grounded-noticer': '#0b6c64',
  'rooted-witness': '#043b38',
  'steady-witness': '#054a46',
  'grounded-witness': '#085a56',

  // Seeking + Expansive (Violet/Purple family)
  // High agency - saturated, bright
  'adventurous-architect': '#7c3aed',
  'curious-architect': '#8b5cf6',
  'open-architect': '#a78bfa',
  'adventurous-builder': '#7034d6',
  'curious-builder': '#8050e5',
  'open-builder': '#9a7af3',
  // Mid agency - medium saturation
  'adventurous-maker': '#642ebf',
  'curious-maker': '#7444ce',
  'open-maker': '#8d68e6',
  'adventurous-shaper': '#5828a8',
  'curious-shaper': '#6838b7',
  'open-shaper': '#8056d8',
  // Low agency - softer, muted
  'adventurous-observer': '#4c2291',
  'curious-observer': '#5c2ca0',
  'open-observer': '#7344ca',
  'adventurous-noticer': '#401c7a',
  'curious-noticer': '#502688',
  'open-noticer': '#6638bb',
  'adventurous-witness': '#341664',
  'curious-witness': '#442070',
  'open-witness': '#5a2cac',

  // Seeking + Protective (Indigo/Blue family)
  // High agency - saturated, bright
  'watchful-architect': '#6366f1',
  'careful-architect': '#818cf8',
  'thoughtful-architect': '#a5b4fc',
  'watchful-builder': '#575ae0',
  'careful-builder': '#747ce7',
  'thoughtful-builder': '#98a2f5',
  // Mid agency - medium saturation
  'watchful-maker': '#4b4ecf',
  'careful-maker': '#676cd6',
  'thoughtful-maker': '#8b90ee',
  'watchful-shaper': '#3f42be',
  'careful-shaper': '#5a5cc5',
  'thoughtful-shaper': '#7e7ee7',
  // Low agency - softer, muted
  'watchful-observer': '#3336ad',
  'careful-observer': '#4d4cb4',
  'thoughtful-observer': '#716cdf',
  'watchful-noticer': '#272a9c',
  'careful-noticer': '#403ca3',
  'thoughtful-noticer': '#645ad7',
  'watchful-witness': '#1b1e8b',
  'careful-witness': '#332c92',
  'thoughtful-witness': '#5748cf',
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get the identity key from noun and adjective.
 * Format: "adjective-noun" (lowercase, hyphenated)
 */
export function getIdentityKey(noun: Noun, adjective: Adjective): string {
  return `${adjective}-${noun}`
}

/**
 * Get the display name from noun and adjective.
 * Format: "Adjective Noun" (title case)
 */
export function getIdentityName(noun: Noun, adjective: Adjective): string {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  return `${capitalize(adjective)} ${capitalize(noun)}`
}

/**
 * Determine the noun from an agency score.
 */
export function getNounFromAgency(agency: number): Noun {
  for (const { min, noun } of NOUN_THRESHOLDS) {
    if (agency >= min) {
      return noun
    }
  }
  return 'witness'
}

/**
 * Determine the quadrant from certainty and posture scores.
 */
export function getQuadrant(certainty: number, posture: number): Quadrant {
  const certPole = certainty >= 0 ? 'settled' : 'seeking'
  const postPole = posture >= 0 ? 'expansive' : 'protective'
  return `${certPole}-${postPole}` as Quadrant
}

/**
 * Get the color for an identity key.
 */
export function getIdentityColor(key: string): string {
  return IDENTITY_COLORS[key] ?? '#6b7280' // fallback gray
}

/**
 * Calculate which adjective index to use based on dimension intensities.
 * Higher combined intensity = more extreme adjective (index 0).
 * Lower intensity = milder adjective (index 2).
 */
export function getAdjectiveIndex(certainty: number, posture: number): number {
  const combinedIntensity = (Math.abs(certainty) + Math.abs(posture)) / 2
  if (combinedIntensity > 0.7) return 0 // Most extreme adjective
  if (combinedIntensity > 0.4) return 1 // Middle adjective
  return 2 // Mildest adjective
}

/**
 * Generate all 84 identity keys.
 */
export function getAllIdentityKeys(): string[] {
  const keys: string[] = []
  for (const noun of NOUNS) {
    for (const adjective of ADJECTIVES) {
      keys.push(getIdentityKey(noun, adjective))
    }
  }
  return keys
}

// =============================================================================
// Identity Data
// =============================================================================

import { settledExpansiveIdentities } from './identities-settled-expansive'
import { settledProtectiveIdentities } from './identities-settled-protective'
import { seekingExpansiveIdentities } from './identities-seeking-expansive'
import { seekingProtectiveIdentities } from './identities-seeking-protective'

/**
 * All 84 identities, keyed by their identity key.
 *
 * Usage:
 *   const identity = identities['curious-architect']
 *   console.log(identity.superpower)
 */
export const identities: Record<string, Identity> = {
  ...settledExpansiveIdentities,
  ...settledProtectiveIdentities,
  ...seekingExpansiveIdentities,
  ...seekingProtectiveIdentities,
}

/**
 * Get an identity by its key.
 * Returns undefined if not found.
 */
export function getIdentity(key: string): Identity | undefined {
  return identities[key]
}

/**
 * Get the path to the landscape image for an identity.
 * Images are based on noun + quadrant (28 combinations: 7 nouns × 4 quadrants)
 */
export function getIdentityImage(identity: Identity): string {
  return `/wonder/essay/quiz/images/landscape-${identity.noun}-${identity.quadrant}.jpg`
}

/**
 * Get the image path from an identity key.
 */
export function getIdentityImageFromKey(key: string): string | undefined {
  const identity = identities[key]
  if (!identity) return undefined
  return getIdentityImage(identity)
}

/**
 * Dimensions type for the overloaded function signature.
 */
type Dimensions = {
  agency: number
  certainty: number
  posture: number
}

/**
 * Get an identity from dimension scores.
 * Calculates the noun, quadrant, and adjective from scores,
 * then returns the matching identity.
 *
 * When no explicit adjectiveIndex is provided, calculates it based on
 * the combined intensity of certainty and posture dimensions.
 *
 * @overload Accepts individual dimension values
 * @overload Accepts a Dimensions object
 */
export function getIdentityFromDimensions(
  agency: number,
  certainty: number,
  posture: number,
  adjectiveIndex?: number
): Identity | undefined
export function getIdentityFromDimensions(
  dimensions: Dimensions,
  adjectiveIndex?: number
): Identity | undefined
export function getIdentityFromDimensions(
  agencyOrDimensions: number | Dimensions,
  certaintyOrIndex?: number,
  posture?: number,
  adjectiveIndex?: number
): Identity | undefined {
  let agency: number
  let certainty: number
  let postureVal: number
  let adjIdx: number | undefined

  // Determine which overload was called
  if (typeof agencyOrDimensions === 'object') {
    // Called with Dimensions object
    agency = agencyOrDimensions.agency
    certainty = agencyOrDimensions.certainty
    postureVal = agencyOrDimensions.posture
    adjIdx = certaintyOrIndex // second param is adjectiveIndex
  } else {
    // Called with individual values
    agency = agencyOrDimensions
    certainty = certaintyOrIndex!
    postureVal = posture!
    adjIdx = adjectiveIndex
  }

  const noun = getNounFromAgency(agency)
  const quadrant = getQuadrant(certainty, postureVal)
  const adjectives = ADJECTIVES_BY_QUADRANT[quadrant]

  // Use intensity-based calculation if no explicit index provided
  const finalIndex = adjIdx ?? getAdjectiveIndex(certainty, postureVal)
  const adjective = adjectives[Math.min(finalIndex, adjectives.length - 1)]
  const key = getIdentityKey(noun, adjective)
  return identities[key]
}

// =============================================================================
// Archetype → Identity Mapping (for backward compatibility)
// =============================================================================

/**
 * Map old archetype keys to approximate identities.
 * Used when displaying members who don't have stored answers.
 */
const ARCHETYPE_TO_IDENTITY: Record<string, string> = {
  // High agency, optimistic
  citizen: 'visionary-builder',      // The Abundant → expansive builder
  shaper: 'poised-architect',        // The Builder → poised creator
  architect: 'driven-architect',     // The Architect → structured vision
  alive: 'poised-builder',           // The Alive → vital creator
  friction: 'adventurous-builder',   // The Challenger → pushes boundaries

  // Mid agency, balanced
  mender: 'open-maker',              // The Mender → healing through making
  between: 'curious-shaper',         // The Between → bridges understanding
  rooted: 'grounded-maker',          // The Rooted → grounded creation

  // Lower agency, receptive
  presence: 'steady-observer',       // The Present → embodied attention
  swimmer: 'curious-observer',       // The Deep → questioning witness
  conscience: 'watchful-observer',   // The Guardian → watchful protector
  cleareyed: 'thoughtful-observer',  // The Clear-Eyed → honest seeing
  embers: 'rooted-noticer',          // The Keeper → preserving attention
  unbound: 'open-witness',           // The Unbound → transcendent presence
}

/**
 * Get an identity from an old archetype key.
 * Returns undefined if archetype not recognized.
 */
export function getIdentityFromArchetype(archetypeKey: string): Identity | undefined {
  const identityKey = ARCHETYPE_TO_IDENTITY[archetypeKey]
  if (!identityKey) return undefined
  return identities[identityKey]
}

/**
 * Get identity for a member, preferring calculated from answers,
 * falling back to archetype mapping.
 */
export function getMemberIdentity(
  answers: (number | string)[] | null | undefined,
  archetypeKey: string
): Identity | undefined {
  // If we have answers, calculate identity from dimensions
  if (answers?.length === 7) {
    // Convert string answers to numbers if needed
    const numericAnswers = answers.map(a => typeof a === 'string' ? parseInt(a, 10) : a)
    // Import dynamically to avoid circular deps
    const { arrayToQuizAnswers, calculateDimensions } = require('./dimensions')
    const quizAnswers = arrayToQuizAnswers(numericAnswers)
    if (quizAnswers) {
      const dims = calculateDimensions(quizAnswers)
      const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture)
      return getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx)
    }
  }

  // Fall back to archetype mapping
  return getIdentityFromArchetype(archetypeKey)
}

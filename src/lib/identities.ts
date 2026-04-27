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
  // Settled + Expansive
  | 'confident'
  | 'assured'
  | 'bold'
  // Settled + Protective
  | 'steady'
  | 'grounded'
  | 'anchored'
  // Seeking + Expansive
  | 'adaptive'
  | 'curious'
  | 'open'
  // Seeking + Protective
  | 'careful'
  | 'cautious'
  | 'measured'

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
  'settled-expansive': ['confident', 'assured', 'bold'],
  'settled-protective': ['steady', 'grounded', 'anchored'],
  'seeking-expansive': ['adaptive', 'curious', 'open'],
  'seeking-protective': ['careful', 'cautious', 'measured'],
}

/**
 * All adjectives as a flat array.
 */
export const ADJECTIVES: Adjective[] = [
  'confident',
  'assured',
  'bold',
  'steady',
  'grounded',
  'anchored',
  'adaptive',
  'curious',
  'open',
  'careful',
  'cautious',
  'measured',
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
  'confident-architect': '#ea580c',
  'assured-architect': '#f97316',
  'bold-architect': '#fb923c',
  'confident-builder': '#dc5208',
  'assured-builder': '#ed6c0c',
  'bold-builder': '#f08030',
  // Mid agency - medium saturation
  'confident-maker': '#c94507',
  'assured-maker': '#d95a12',
  'bold-maker': '#e06e26',
  'confident-shaper': '#b63e07',
  'assured-shaper': '#c65012',
  'bold-shaper': '#d46326',
  // Low agency - softer, muted
  'confident-observer': '#a3380a',
  'assured-observer': '#b34815',
  'bold-observer': '#c45a28',
  'confident-noticer': '#8f3210',
  'assured-noticer': '#9f421a',
  'bold-noticer': '#af5430',
  'confident-witness': '#7c2c14',
  'assured-witness': '#8c3c1e',
  'bold-witness': '#9c4e34',

  // Settled + Protective (Teal/Green family)
  // High agency - saturated, bright
  'steady-architect': '#0d9488',
  'grounded-architect': '#14b8a6',
  'anchored-architect': '#2dd4bf',
  'steady-builder': '#0b8579',
  'grounded-builder': '#10a392',
  'anchored-builder': '#25c0ab',
  // Mid agency - medium saturation
  'steady-maker': '#09756b',
  'grounded-maker': '#0c8f80',
  'anchored-maker': '#1aab98',
  'steady-shaper': '#08665d',
  'grounded-shaper': '#0a7c70',
  'anchored-shaper': '#159586',
  // Low agency - softer, muted
  'steady-observer': '#065750',
  'grounded-observer': '#086a62',
  'anchored-observer': '#108074',
  'steady-noticer': '#054943',
  'grounded-noticer': '#065954',
  'anchored-noticer': '#0b6c64',
  'steady-witness': '#043b38',
  'grounded-witness': '#054a46',
  'anchored-witness': '#085a56',

  // Seeking + Expansive (Violet/Purple family)
  // High agency - saturated, bright
  'adaptive-architect': '#7c3aed',
  'curious-architect': '#8b5cf6',
  'open-architect': '#a78bfa',
  'adaptive-builder': '#7034d6',
  'curious-builder': '#8050e5',
  'open-builder': '#9a7af3',
  // Mid agency - medium saturation
  'adaptive-maker': '#642ebf',
  'curious-maker': '#7444ce',
  'open-maker': '#8d68e6',
  'adaptive-shaper': '#5828a8',
  'curious-shaper': '#6838b7',
  'open-shaper': '#8056d8',
  // Low agency - softer, muted
  'adaptive-observer': '#4c2291',
  'curious-observer': '#5c2ca0',
  'open-observer': '#7344ca',
  'adaptive-noticer': '#401c7a',
  'curious-noticer': '#502688',
  'open-noticer': '#6638bb',
  'adaptive-witness': '#341664',
  'curious-witness': '#442070',
  'open-witness': '#5a2cac',

  // Seeking + Protective (Indigo/Blue family)
  // High agency - saturated, bright
  'careful-architect': '#6366f1',
  'cautious-architect': '#818cf8',
  'measured-architect': '#a5b4fc',
  'careful-builder': '#575ae0',
  'cautious-builder': '#747ce7',
  'measured-builder': '#98a2f5',
  // Mid agency - medium saturation
  'careful-maker': '#4b4ecf',
  'cautious-maker': '#676cd6',
  'measured-maker': '#8b90ee',
  'careful-shaper': '#3f42be',
  'cautious-shaper': '#5a5cc5',
  'measured-shaper': '#7e7ee7',
  // Low agency - softer, muted
  'careful-observer': '#3336ad',
  'cautious-observer': '#4d4cb4',
  'measured-observer': '#716cdf',
  'careful-noticer': '#272a9c',
  'cautious-noticer': '#403ca3',
  'measured-noticer': '#645ad7',
  'careful-witness': '#1b1e8b',
  'cautious-witness': '#332c92',
  'measured-witness': '#5748cf',
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
  citizen: 'confident-builder',      // The Abundant → expansive builder
  shaper: 'bold-architect',          // The Builder → bold creator
  architect: 'assured-architect',    // The Architect → structured vision
  alive: 'bold-builder',             // The Alive → vital creator
  friction: 'adaptive-builder',      // The Challenger → pushes boundaries

  // Mid agency, balanced
  mender: 'open-maker',              // The Mender → healing through making
  between: 'curious-shaper',         // The Between → bridges understanding
  rooted: 'anchored-maker',          // The Rooted → grounded creation

  // Lower agency, receptive
  presence: 'grounded-observer',     // The Present → embodied attention
  swimmer: 'curious-observer',       // The Deep → questioning witness
  conscience: 'careful-observer',    // The Guardian → watchful protector
  cleareyed: 'measured-observer',    // The Clear-Eyed → honest seeing
  embers: 'steady-noticer',          // The Keeper → preserving attention
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

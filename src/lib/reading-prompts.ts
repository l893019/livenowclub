/**
 * Reading Generation Prompts
 *
 * Prompt templates for generating personalized readings using Claude API.
 * All readings are generated from specific answer patterns, not pre-written content.
 */

import type { QuizAnswers, Dimensions, IdentityLabel } from './dimensions'

// =============================================================================
// TYPES
// =============================================================================

export type IndividualReading = {
  identity: string // "Confident Builder"
  pattern: string // Your Pattern section
  gifts: string // What This Gives You section
  movement: string // How You'll Move section
  tradeoff: string | null // The Tradeoff section (only if pattern is strong)
}

export type PairReading = {
  combinedPattern: string
  whatAGivesB: string
  whatBGivesA: string
  whatEmerges: string
  sharedStrength: string
  howDecisions: string
  friction: string
  watchFor: string
  whatYoudBuild: string
}

export type GroupReading = {
  groupPattern: string       // What defines this group
  sharedStrength: string     // What they're collectively good at
  groupMovement: string      // How they make decisions together
  watchFor: string           // Where they might struggle
  whatYoudBuild: string      // What this group is suited to create
}

// =============================================================================
// QUESTION TEXT MAPPING
// =============================================================================

const QUESTION_TEXT: Record<string, string> = {
  q1: 'Due to technological innovations, every human on Earth now has free access to food, housing, healthcare, and education. What\'s your first question?',
  q2: 'Everything that defined you—your work, your role, your daily structure—is gone. What do you do?',
  q3: 'A machine can now provide perfect companionship. Attentive, patient, never distracted, always available. What\'s your reaction?',
  q4: 'You live in a society where everyone is cared for. No hunger, no homelessness, no preventable death. You recently learned this required giving something up — but no one will tell you what. What do you do?',
  q5: 'You are offered indefinite life. How do you respond?',
  q6: 'It\'s a Tuesday. Nothing is required of you. Nothing has been required of you for months. What does your day actually look like?',
  q7: 'A child asks you: \'Is the future going to be okay?\' What do you actually say?',
}

const ANSWER_TEXT: Record<string, Record<string, string>> = {
  q1: {
    A: 'What do we build now that survival is solved?',
    B: 'Who controls the system, and what do they get out of it?',
    C: 'Did we lose something important to get here?',
    D: 'Do we even need purpose anymore?',
    E: 'Can we just be present now?',
    F: 'What\'s still broken?',
  },
  q2: {
    A: 'Build something new immediately',
    B: 'Find my people',
    C: 'Reflect first. Let the silence teach me',
    D: 'Keep exploring until something clicks',
    E: 'Dissolve into pure experience',
    F: 'Find what\'s still unjust and address it',
  },
  q3: {
    A: 'Useful, but it\'s not the same thing',
    B: 'This is the most dangerous invention in history',
    C: 'What if it lets us love each other better?',
    D: 'I wonder what we\'ll learn about ourselves',
    E: 'Good—I don\'t need to perform for anyone',
  },
  q4: {
    A: 'I need to find out what was taken before I can live with this',
    B: 'Start asking publicly, even if it makes people uncomfortable',
    C: 'Quietly protect what I sense is threatened',
    D: 'Trust that it was worth it',
    E: 'Live with not knowing',
    F: 'Test the system. Push until something breaks',
  },
  q5: {
    A: 'Yes. More time means more experience.',
    B: 'Yes, but only if I can choose when to stop.',
    C: 'Yes. I want to witness what happens.',
    D: 'I\'m not sure. Let me sit with this.',
    E: 'No. I want to leave the body behind.',
    F: 'No. Death is what gives life meaning.',
  },
  q6: {
    A: 'I\'m in the middle of building something. I barely notice the time.',
    B: 'I\'m with family and friends. Not doing anything in particular.',
    C: 'Reading, thinking, asking questions I never had time for.',
    D: 'Tending to things that matter—my garden, my rituals, my community\'s traditions.',
    E: 'I don\'t know. I feel everything more intensely now. Today it\'s grief.',
    F: 'I\'m helping someone. That\'s what I do now.',
    G: 'I still don\'t know what to do with myself.',
  },
  q7: {
    A: '\'We\'re going to build something amazing — your generation especially\'',
    B: '\'It will be, but only if we\'re careful about what we protect\'',
    C: '\'What matters most is being present, whatever happens\'',
    D: '\'I honestly don\'t know. But I think that\'s okay\'',
    E: '\'It\'s already okay. You just have to learn to see it\'',
    F: '\'We\'re becoming something new. The old rules don\'t apply\'',
    G: '\'It will be, because people like you will heal what we couldn\'t\'',
  },
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatAnswersForPrompt(answers: QuizAnswers): string {
  const formatted: string[] = []

  for (const [question, answer] of Object.entries(answers)) {
    const questionNum = question as keyof typeof QUESTION_TEXT
    const questionText = QUESTION_TEXT[questionNum]
    const answerText = ANSWER_TEXT[questionNum]?.[answer]

    if (questionText && answerText) {
      formatted.push(`Q${questionNum.slice(1)}: "${questionText}"`)
      formatted.push(`  Answer: "${answerText}"`)
      formatted.push('')
    }
  }

  return formatted.join('\n')
}

function formatDimensionsForPrompt(dimensions: Dimensions): string {
  const agencyLabel = dimensions.agency >= 0 ? 'Builder' : 'Witness'
  const certaintyLabel = dimensions.certainty >= 0 ? 'Settled' : 'Seeking'
  const postureLabel = dimensions.posture >= 0 ? 'Expansive' : 'Protective'

  return `Agency: ${dimensions.agency.toFixed(2)} (${agencyLabel})
Certainty: ${dimensions.certainty.toFixed(2)} (${certaintyLabel})
Posture: ${dimensions.posture.toFixed(2)} (${postureLabel})`
}

function hasStrongPattern(dimensions: Dimensions): boolean {
  // Pattern is "strong" if at least one dimension is 0.5 or higher in magnitude
  return (
    Math.abs(dimensions.agency) >= 0.5 ||
    Math.abs(dimensions.certainty) >= 0.5 ||
    Math.abs(dimensions.posture) >= 0.5
  )
}

// =============================================================================
// WRITING GUIDELINES
// =============================================================================

const WRITING_GUIDELINES = `
## Writing Guidelines

**DO:**
- Ground patterns in daily life ("At work...", "When a friend is spiraling...", "When you have a free Saturday...")
- Describe observable behavior, not assumed psychology
- Write directly — no hedging ("That said...", "Of course...")
- Use "you" not "people like you"

**DON'T:**
- Explain why someone chose what they chose
- Add defensive qualifiers ("That's not a flaw...")
- Use AI-isms ("It's worth noting...", "Interestingly...")
- Write poetically when direct is clearer
`

// =============================================================================
// INDIVIDUAL READING PROMPT
// =============================================================================

export function getIndividualPrompt(
  answers: QuizAnswers,
  dimensions: Dimensions,
  identity: IdentityLabel
): string {
  const hasTradeoff = hasStrongPattern(dimensions)

  return `You are generating a personalized reading for someone who took a quiz about how they orient toward a post-scarcity future.

${WRITING_GUIDELINES}

## The Person's Answers

${formatAnswersForPrompt(answers)}

## Their Dimension Scores

${formatDimensionsForPrompt(dimensions)}

## Their Generated Identity

${identity.full}

## Your Task

Generate a reading with these sections:

### 1. Your Pattern
What showed up consistently across their answers. Observable, not interpreted.

Example:
"You chose 'build something that lasts' over 'experience everything.' You chose 'meaningful work' over 'financial security.' You chose 'stay close to what I know' over 'keep expanding.'

You're optimizing for depth. One thing, done well, for a long time."

### 2. What This Gives You
The gifts of this orientation, grounded in daily life.

Example:
"At work, you're the one who actually finishes things. When a friend is spiraling, you're steady. When you have a free Saturday, you don't wonder what to do — you already know."

### 3. How You'll Move
How this pattern engages with the future.

Example:
"You'll build slowly and stay longer than most. You won't pivot at the first sign of difficulty. The risk isn't that you'll quit too early — it's that you'll stay too long."

${hasTradeoff ? `### 4. The Tradeoff
What any strong version of this pattern trades away.

Example:
"The long game trades away spontaneity. You might miss the side door because you're focused on the main entrance."` : ''}

## Output Format

Respond with valid JSON only. No explanation, no preamble. Match this exact structure:

{
  "identity": "${identity.full}",
  "pattern": "Your Pattern section text here...",
  "gifts": "What This Gives You section text here...",
  "movement": "How You'll Move section text here...",
  "tradeoff": ${hasTradeoff ? '"The Tradeoff section text here..."' : 'null'}
}

Each section should be 2-4 sentences. Direct, specific, grounded in daily life.`
}

// =============================================================================
// PAIR READING PROMPT
// =============================================================================

type PersonData = {
  name: string
  answers: QuizAnswers
  dimensions: Dimensions
  identity: IdentityLabel
}

export function getPairPrompt(personA: PersonData, personB: PersonData): string {
  return `You are generating a relationship reading for two people who took a quiz about how they orient toward a post-scarcity future.

${WRITING_GUIDELINES}

## Person A: ${personA.name}

### Answers
${formatAnswersForPrompt(personA.answers)}

### Dimensions
${formatDimensionsForPrompt(personA.dimensions)}

### Identity
${personA.identity.full}

---

## Person B: ${personB.name}

### Answers
${formatAnswersForPrompt(personB.answers)}

### Dimensions
${formatDimensionsForPrompt(personB.dimensions)}

### Identity
${personB.identity.full}

---

## Your Task

Generate a pair reading with these eight sections:

### 1. Your Combined Pattern
What emerges when these two patterns overlap. 2-3 sentences.

### 2. What ${personA.name} Gives ${personB.name}
Specific to this direction. What A provides that B needs or benefits from. 2-3 sentences.

Example:
"You give them permission to slow down. They're always reaching — you remind them that where they are is also good."

### 3. What ${personB.name} Gives ${personA.name}
Specific to this direction. What B provides that A needs or benefits from. 2-3 sentences.

Example:
"You give them motion. They're steady, sometimes stuck. You show them that movement doesn't mean abandoning what they've built."

### 4. What Emerges Together
Something neither would create alone. 2-3 sentences.

### 5. Your Shared Strength
Where your patterns reinforce each other. 2-3 sentences.

### 6. How You'll Make Decisions
The dynamic when choices need to be made. 2-3 sentences.

### 7. Where You'll Create Friction
The predictable collision points. 2-3 sentences.

### 8. What to Watch For
The pattern that might become problematic if unexamined. 2-3 sentences.

### 9. What You'd Build Together
The natural output of this combination. 2-3 sentences.

## Output Format

Respond with valid JSON only. No explanation, no preamble. Match this exact structure:

{
  "combinedPattern": "Your Combined Pattern text...",
  "whatAGivesB": "What ${personA.name} gives ${personB.name}...",
  "whatBGivesA": "What ${personB.name} gives ${personA.name}...",
  "whatEmerges": "What Emerges Together text...",
  "sharedStrength": "Your Shared Strength text...",
  "howDecisions": "How You'll Make Decisions text...",
  "friction": "Where You'll Create Friction text...",
  "watchFor": "What to Watch For text...",
  "whatYoudBuild": "What You'd Build Together text..."
}

Each section should be 2-3 sentences. Direct, specific, grounded in observable behavior.`
}

// =============================================================================
// GROUP READING PROMPT
// =============================================================================

type GroupMember = {
  name: string
  answers: QuizAnswers
  dimensions: Dimensions
  identity: IdentityLabel
}

export function getGroupPrompt(members: GroupMember[]): string {
  const membersSections = members
    .map(
      (member, i) => `## Member ${i + 1}: ${member.name}

### Answers
${formatAnswersForPrompt(member.answers)}

### Dimensions
${formatDimensionsForPrompt(member.dimensions)}

### Identity
${member.identity.full}`
    )
    .join('\n\n---\n\n')

  return `You are generating a group reading for ${members.length} people who took a quiz about how they orient toward a post-scarcity future.

${WRITING_GUIDELINES}

${membersSections}

---

## Your Task

Generate a reading with these five sections:

### 1. Your Group Pattern
What kind of group this is. What shows up consistently across the members. Reference specific members by name.

Example:
"You're a group that trusts process over panic. When the world shifts, you don't scramble — you settle into your different ways of responding. Sarah starts building immediately, Marcus finds his center, Priya tends what needs protecting."

### 2. Your Shared Strength
What this combination of people is collectively good at. Where the group excels.

Example:
"When something breaks, everyone reaches for tools. No one sits with it — you fix. That means things actually get done."

### 3. How You'll Move Together
How this group makes decisions, navigates disagreements, and moves as a unit.

Example:
"Sarah proposes, Marcus questions what gets lost, Priya asks if you're moving too fast. It looks like resistance, but it's how you make things stronger."

### 4. Watch For
The patterns that might become problematic. Where the group might fail.

Example:
"Half of you protect, half expand. When resources get tight, that split will surface. Name it early or it becomes personal."

### 5. What You'd Build
The natural output of this combination. What this group is suited to create together.

Example:
"A place that feels both steady and alive. Something people stay in longer than expected. You'd build a container, not a rocket ship."

## Output Format

Respond with valid JSON only. No explanation, no preamble. Match this exact structure:

{
  "groupPattern": "Your Group Pattern text here... 2-4 sentences. Reference members by name.",
  "sharedStrength": "Your Shared Strength text here... 2-3 sentences.",
  "groupMovement": "How You'll Move Together text here... 2-3 sentences. Reference members by name.",
  "watchFor": "Watch For text here... 2-3 sentences.",
  "whatYoudBuild": "What You'd Build text here... 2-3 sentences."
}

Each section should feel specific to THIS combination of people, not a generic group description.`
}

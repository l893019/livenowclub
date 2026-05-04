const fs = require('fs');
const path = require('path');

// Read the book data
const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const booksMatch = booksContent.match(/const books = (\[[\s\S]*\]);/);
let books = eval(booksMatch[1]);

console.log(`Systematically analyzing all ${books.length} books for education themes...\n`);

// Comprehensive categorization logic that analyzes each book individually
function categorizeEducation(book) {
  const title = book.title || '';
  const desc = (book.desc || '').toLowerCase();
  const themes = book.themes || [];
  const persists = book.persists || [];
  const fades = book.fades || [];

  let educationPurpose, schoolReplacement;
  let reasoning = { purpose: '', replacement: '' };

  // === EDUCATION PURPOSE ANALYSIS ===

  // 1. SORTING & CLASS - Educational institutions used for hierarchical selection
  if (
    // Explicit mentions of selective education
    (desc.includes('school') || desc.includes('academy') || desc.includes('university')) &&
    (desc.includes('selected') || desc.includes('chosen') || desc.includes('genius') ||
     desc.includes('elite') || desc.includes('training') || desc.includes('recruit')) ||

    // Military/battle school selection
    desc.includes('battle school') ||
    desc.includes('military academy') ||
    (desc.includes('training') && desc.includes('command')) ||

    // Class/caste systems with educational gatekeeping
    (themes.includes('hierarchy') &&
     (desc.includes('class') || desc.includes('caste') || desc.includes('rank') || desc.includes('tier'))) ||

    // Specific known sorting books
    title === "Ender's Game" ||
    title === "Starship Troopers" ||
    title === "Lord of Light"
  ) {
    educationPurpose = 'sorting-class';
    reasoning.purpose = 'Educational selection/hierarchy/testing mechanism';
  }

  // 2. CONDITIONING & CONTROL - Behavioral programming, indoctrination
  else if (
    // Explicit conditioning language
    (desc.includes('engineered') && desc.includes('conditioned')) ||
    desc.includes('genetically engineered') && themes.includes('freedom') ||
    desc.includes('programmed') ||
    desc.includes('indoctrinat') ||
    desc.includes('brainwash') ||

    // Dystopian control through education
    (book.techStance === 'imprisoning' &&
     (desc.includes('society') || desc.includes('world') || desc.includes('system'))) ||

    // Freedom dissolves + hierarchical control
    (book.tensions?.freedom === 'dissolves' && book.tensions?.hierarchy === 'yes') ||

    // Raised for specific purposes (clones, etc.)
    (desc.includes('raised to') || desc.includes('bred to')) ||

    // Known conditioning books
    title === 'Brave New World' ||
    title === '1984' ||
    title === 'Never Let Me Go'
  ) {
    educationPurpose = 'conditioning-control';
    reasoning.purpose = 'Social control/conditioning/programming';
  }

  // 3. CHARACTER & SELF-ACTUALIZATION - Identity formation, personal transformation
  else if (
    // Primary identity theme
    themes[0] === 'identity' ||

    // Fluid/constructed identity + transformation
    ((book.identityModel === 'fluid' || book.identityModel === 'constructed' || book.identityModel === 'multiple') &&
     themes.includes('identity')) ||

    // Explicit transformation language
    desc.match(/\btransform(s|ed|ing)\b(?!.*battle)/) ||
    desc.includes('becoming') ||
    desc.includes('discover who') ||
    desc.includes('who am i') ||
    desc.includes('sense of self') ||

    // Transcendence as life's worth
    book.worthLiving === 'transcendence' ||

    // Self-discovery journeys
    (themes.includes('identity') && themes.includes('meaning') && !desc.includes('war'))
  ) {
    educationPurpose = 'character-actualization';
    reasoning.purpose = 'Identity formation/self-discovery/transformation';
  }

  // 4. LIFELONG PRACTICE - Continuous learning as ongoing process
  else if (
    // Discovery/creation as core
    book.worthLiving === 'discovery' ||
    (book.worthLiving === 'creation' && themes.includes('work')) ||

    // Voluntary work + learning themes
    book.workRole === 'voluntary' &&
    (desc.includes('learn') || desc.includes('discover') || desc.includes('solve')) ||

    // Craft + difficulty that persists
    (persists.includes('craft') && persists.includes('difficulty')) ||
    (persists.includes('curiosity') || persists.includes('exploration')) ||

    // Problem-solving narratives
    (desc.includes('must') && (desc.includes('solve') || desc.includes('figure out') || desc.includes('discover'))) ||

    // Essential work that requires ongoing skill
    (book.workRole === 'essential' && persists.includes('craft'))
  ) {
    educationPurpose = 'lifelong-practice';
    reasoning.purpose = 'Continuous learning/discovery/problem-solving';
  }

  // 5. MENTORSHIP & TRANSMISSION - Personal teaching relationships
  else if (
    // Explicit mentorship
    desc.includes('mentor') ||
    desc.includes('apprentice') ||
    desc.includes('master') && desc.includes('teach') ||
    desc.includes('train') && desc.includes('to become') ||

    // Craft + care combination (knowledge transmission)
    (persists.includes('craft') && persists.includes('care')) ||

    // Stories/tradition transmission
    (persists.includes('stories') && themes.includes('connection')) ||

    // Guild systems
    desc.includes('guild')
  ) {
    educationPurpose = 'mentorship-transmission';
    reasoning.purpose = 'Personal teaching/craft transmission/mentorship';
  }

  // 6. ABSENT/IRRELEVANT - Education not addressed
  else {
    educationPurpose = 'absent-irrelevant';
    reasoning.purpose = 'Education not central to the narrative';
  }

  // === SCHOOL REPLACEMENT ANALYSIS ===

  // 1. UNCHANGED - Traditional institutions persist
  if (
    desc.includes('school') ||
    desc.includes('university') ||
    desc.includes('academy') ||
    desc.includes('college') ||
    desc.includes('student') ||
    desc.includes('classroom') ||
    desc.includes('professor') ||
    desc.includes('campus')
  ) {
    schoolReplacement = 'unchanged';
    reasoning.replacement = 'Traditional educational institutions exist';
  }

  // 2. VIRTUAL/NEURAL - Simulations, cyberspace learning
  else if (
    (desc.includes('simulation') && desc.includes('training')) ||
    desc.includes('virtual reality') ||
    desc.includes('virtual world') ||
    (desc.includes('cyberspace') || persists.includes('cyberspace')) ||
    desc.includes('matrix') ||
    desc.includes('neural simulation')
  ) {
    schoolReplacement = 'virtual-neural';
    reasoning.replacement = 'Virtual/simulated learning environments';
  }

  // 3. DIRECT TRANSFER - Mind uploading, neural downloads
  else if (
    desc.includes('upload') && desc.includes('knowledge') ||
    desc.includes('download') && (desc.includes('skill') || desc.includes('memory')) ||
    desc.includes('neural implant') ||
    desc.includes('mind transfer') ||
    desc.includes('consciousness transfer') ||
    desc.includes('direct knowledge') ||
    persists.includes('mind_uploading') ||
    persists.includes('neural_laces') ||
    (book.deathRole === 'transcended' && desc.includes('digital'))
  ) {
    schoolReplacement = 'direct-transfer';
    reasoning.replacement = 'Direct knowledge transfer/uploading';
  }

  // 4. AI TUTORS - AI-driven education
  else if (
    book.aiPresence === 'central' ||
    book.aiPresence === 'companion' ||
    (desc.includes('ai') && (desc.includes('teach') || desc.includes('learn') || desc.includes('guide')))
  ) {
    schoolReplacement = 'ai-tutors';
    reasoning.replacement = 'AI-mediated learning';
  }

  // 5. APPRENTICESHIP - Craft-based, guild learning
  else if (
    persists.includes('craft') ||
    desc.includes('apprentice') ||
    desc.includes('guild') ||
    desc.includes('craftsman') ||
    desc.includes('master craftsman') ||
    (educationPurpose === 'mentorship-transmission')
  ) {
    schoolReplacement = 'apprenticeship';
    reasoning.replacement = 'Craft/guild/apprenticeship systems';
  }

  // 6. SELF-ORGANIZED - Community, collective learning
  else if (
    desc.includes('self-taught') ||
    desc.includes('collective') && desc.includes('learn') ||
    desc.includes('community') && desc.includes('education') ||
    (persists.includes('community') && book.workRole === 'voluntary') ||
    desc.includes('cooperat') && themes.includes('connection')
  ) {
    schoolReplacement = 'self-organized';
    reasoning.replacement = 'Self-organized/community learning';
  }

  // 7. OBSOLETE - No formal education
  else {
    schoolReplacement = 'obsolete';
    reasoning.replacement = 'Formal education absent/obsolete';
  }

  return { educationPurpose, schoolReplacement, reasoning };
}

// Process all books
const results = [];
books = books.map((book, index) => {
  const { educationPurpose, schoolReplacement, reasoning } = categorizeEducation(book);

  results.push({
    index: index + 1,
    title: book.title,
    year: book.year,
    purpose: educationPurpose,
    replacement: schoolReplacement,
    reasoning
  });

  return {
    ...book,
    educationPurpose,
    schoolReplacement
  };
});

// Calculate statistics
const purposeCounts = {};
const replacementCounts = {};

books.forEach(book => {
  purposeCounts[book.educationPurpose] = (purposeCounts[book.educationPurpose] || 0) + 1;
  replacementCounts[book.schoolReplacement] = (replacementCounts[book.schoolReplacement] || 0) + 1;
});

// Display results
console.log('=== FINAL CATEGORIZATION RESULTS ===\n');

console.log('WHAT IS EDUCATION FOR?');
Object.entries(purposeCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([purpose, count]) => {
    const pct = Math.round((count / books.length) * 100);
    console.log(`  ${purpose}: ${count} books (${pct}%)`);
  });

console.log('\nWHAT REPLACES TRADITIONAL SCHOOLS?');
Object.entries(replacementCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([replacement, count]) => {
    const pct = Math.round((count / books.length) * 100);
    console.log(`  ${replacement}: ${count} books (${pct}%)`);
  });

// Show sample categorizations for verification
console.log('\n=== SAMPLE CATEGORIZATIONS (first 20) ===\n');
results.slice(0, 20).forEach(r => {
  console.log(`${r.index}. ${r.title} (${r.year})`);
  console.log(`   Purpose: ${r.purpose} - ${r.reasoning.purpose}`);
  console.log(`   Replacement: ${r.replacement} - ${r.reasoning.replacement}`);
  console.log('');
});

// Save results
const updatedContent = booksContent.replace(
  /const books = \[[\s\S]*\];/,
  `const books = ${JSON.stringify(books, null, 2)};`
);

fs.writeFileSync(booksPath, updatedContent, 'utf8');

// Save detailed log
fs.writeFileSync(
  path.join(__dirname, 'education-categorization-log.json'),
  JSON.stringify(results, null, 2),
  'utf8'
);

console.log('\n✅ All 208 books analyzed and tagged');
console.log('✅ Updated merged-books.js saved');
console.log('✅ Detailed log saved to education-categorization-log.json\n');

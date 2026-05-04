const fs = require('fs');
const path = require('path');

// Read the book data
const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');

// Extract the books array from the JavaScript file
const booksMatch = booksContent.match(/const books = (\[[\s\S]*\]);/);
if (!booksMatch) {
  console.error('Could not find books array in merged-books.js');
  process.exit(1);
}

const books = eval(booksMatch[1]);

console.log(`Found ${books.length} books to tag`);

// Education categorization logic based on existing book metadata
function categorizeEducation(book) {
  const desc = (book.desc || '').toLowerCase();
  const themes = book.themes || [];
  const persists = book.persists || [];
  const fades = book.fades || [];
  const title = (book.title || '').toLowerCase();

  // Detect education purpose
  let educationPurpose = 'absent-irrelevant'; // default

  // Sorting & class mechanism - hierarchy, selection, testing (CHECK THIS FIRST - more specific)
  if (
    desc.includes('battle school') ||
    desc.includes('academy') ||
    desc.includes('selected') ||
    desc.includes('chosen') ||
    desc.includes('elite') ||
    desc.includes('military training') ||
    (desc.includes('school') && (desc.includes('test') || desc.includes('genius') || desc.includes('recruit'))) ||
    title.includes('academy') ||
    (themes.includes('hierarchy') && (desc.includes('school') || desc.includes('training')))
  ) {
    educationPurpose = 'sorting-class';
  }

  // Conditioning & control - dystopian, imprisoning tech, controlling systems (more specific now)
  else if (
    book.techStance === 'imprisoning' ||
    book.techStance === 'oppressive' ||
    (desc.includes('engineered') && desc.includes('condition')) ||
    (desc.includes('genetically') && desc.includes('conditioned')) ||
    desc.includes('indoctrination') ||
    desc.includes('brainwash') ||
    desc.includes('programmed') ||
    (fades.includes('freedom') && book.techStance === 'imprisoning') ||
    (book.tensions && book.tensions.freedom === 'dissolves' && themes.includes('hierarchy'))
  ) {
    educationPurpose = 'conditioning-control';
  }

  // Character & self-actualization - identity themes, personal growth, transformation
  else if (
    themes.includes('identity') &&
 (book.identityModel === 'constructed' || book.identityModel === 'fluid') ||
    book.worthLiving === 'transcendence' ||
    (desc.includes('transform') && !desc.includes('battle')) ||
    desc.includes('self-discovery') ||
    desc.includes('who am i') ||
    desc.includes('becoming') ||
    (themes[0] === 'identity' && !desc.includes('war') && !desc.includes('military'))
  ) {
    educationPurpose = 'character-actualization';
  }

  // Lifelong practice - voluntary work, continuous growth, learning as ongoing
  else if (
    book.workRole === 'voluntary' ||
    book.worthLiving === 'discovery' ||
    book.worthLiving === 'creation' ||
    persists.includes('curiosity') ||
    persists.includes('exploration') ||
    (desc.includes('learn') && !desc.includes('school')) ||
    desc.includes('evolving') ||
    desc.includes('continuous')
  ) {
    educationPurpose = 'lifelong-practice';
  }

  // Mentorship & transmission - craft, care, personal teaching
  else if (
    persists.includes('craft') &&
    (persists.includes('care') || desc.includes('mentor') || desc.includes('apprentice')) ||
    desc.includes('master and apprentice') ||
    desc.includes('taught by') ||
    desc.includes('mentor') ||
    persists.includes('mentorship')
  ) {
    educationPurpose = 'mentorship-transmission';
  }

  // Detect school replacement
  let schoolReplacement = 'obsolete'; // default

  // Unchanged - traditional institutions still exist (check first - most specific)
  if (
    desc.includes('school') ||
    desc.includes('university') ||
    desc.includes('academy') ||
    desc.includes('student') ||
    desc.includes('professor') ||
    desc.includes('classroom')
  ) {
    schoolReplacement = 'unchanged';
  }

  // Virtual/neural academies - cyberspace, virtual learning, simulations
  else if (
    (desc.includes('simulation') && (desc.includes('training') || desc.includes('battle'))) ||
    desc.includes('virtual reality') ||
    desc.includes('virtual world') ||
    desc.includes('cyberspace') && desc.includes('learn') ||
    desc.includes('matrix') ||
    persists.includes('cyberspace')
  ) {
    schoolReplacement = 'virtual-neural';
  }

  // Direct transfer - mind uploading, neural interfaces for knowledge
  else if (
    desc.includes('upload') && desc.includes('knowledge') ||
    desc.includes('download') && (desc.includes('skill') || desc.includes('memory')) ||
    desc.includes('neural implant') ||
    desc.includes('direct knowledge') ||
    desc.includes('consciousness transfer') ||
    persists.includes('neural_laces') ||
    persists.includes('mind_uploading')
  ) {
    schoolReplacement = 'direct-transfer';
  }

  // AI tutors - AI presence in education context
  else if (
    book.aiPresence === 'central' ||
    book.aiPresence === 'companion' ||
    (desc.includes('ai') && (desc.includes('teach') || desc.includes('learn') || desc.includes('tutor')))
  ) {
    schoolReplacement = 'ai-tutors';
  }

  // Apprenticeship - craft-based, mentorship, guilds
  else if (
    (persists.includes('craft') && persists.includes('care')) ||
    desc.includes('apprentice') ||
    desc.includes('guild') ||
    desc.includes('master craftsman') ||
    (desc.includes('mentor') && desc.includes('skill'))
  ) {
    schoolReplacement = 'apprenticeship';
  }

  // Self-organized - community learning, voluntary collectives
  else if (
    desc.includes('self-taught') ||
    desc.includes('collective learning') ||
    desc.includes('community education') ||
    (persists.includes('community') && book.workRole === 'voluntary')
  ) {
    schoolReplacement = 'self-organized';
  }

  return { educationPurpose, schoolReplacement };
}

// Tag all books
const taggedBooks = books.map(book => {
  const { educationPurpose, schoolReplacement } = categorizeEducation(book);
  return {
    ...book,
    educationPurpose,
    schoolReplacement
  };
});

// Calculate statistics
const purposeCounts = {};
const replacementCounts = {};

taggedBooks.forEach(book => {
  purposeCounts[book.educationPurpose] = (purposeCounts[book.educationPurpose] || 0) + 1;
  replacementCounts[book.schoolReplacement] = (replacementCounts[book.schoolReplacement] || 0) + 1;
});

console.log('\n=== EDUCATION PURPOSE ===');
Object.entries(purposeCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([purpose, count]) => {
    const pct = Math.round((count / taggedBooks.length) * 100);
    console.log(`${purpose}: ${count} books (${pct}%)`);
  });

console.log('\n=== SCHOOL REPLACEMENT ===');
Object.entries(replacementCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([replacement, count]) => {
    const pct = Math.round((count / taggedBooks.length) * 100);
    console.log(`${replacement}: ${count} books (${pct}%)`);
  });

// Save the updated book data
const updatedContent = booksContent.replace(
  /const books = \[[\s\S]*\];/,
  `const books = ${JSON.stringify(taggedBooks, null, 2)};`
);

fs.writeFileSync(booksPath, updatedContent, 'utf8');
console.log('\n✅ Books tagged and saved to merged-books.js');

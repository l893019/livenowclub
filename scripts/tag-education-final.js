const fs = require('fs');
const path = require('path');

// Read the book data
const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const booksMatch = booksContent.match(/const books = (\[[\s\S]*\]);/);
const books = eval(booksMatch[1]);

console.log(`Tagging ${books.length} books with education data`);

// More nuanced education categorization
function categorizeEducation(book) {
  const desc = (book.desc || '').toLowerCase();
  const themes = book.themes || [];
  const persists = book.persists || [];
  const fades = book.fades || [];
  const title = (book.title || '').toLowerCase();

  let educationPurpose, schoolReplacement;

  // EDUCATION PURPOSE
  // Sorting & class (hierarchy-based selection)
  if (
    desc.match(/\b(academy|school|selected|elite|chosen|recruit)\b/) &&
    (themes.includes('hierarchy') || desc.match(/\b(military|battle|training|test)\b/))
  ) {
    educationPurpose = 'sorting-class';
  }
  // Conditioning & control (behavioral programming)
  else if (
    (book.techStance === 'imprisoning') ||
    desc.match(/\b(engineered|conditioned|programmed|indoctrinat)\b/) ||
    (fades.includes('freedom') && themes.includes('hierarchy'))
  ) {
    educationPurpose = 'conditioning-control';
  }
  // Character & self-actualization (identity transformation)
  else if (
    themes[0] === 'identity' ||
    (themes.includes('identity') && book.identityModel === 'fluid') ||
    book.worthLiving === 'transcendence' ||
    desc.match(/\b(transform|becoming|discover.*self)\b/)
  ) {
    educationPurpose = 'character-actualization';
  }
  // Lifelong practice (continuous learning)
  else if (
    book.workRole === 'voluntary' ||
    book.worthLiving === 'discovery' ||
    book.worthLiving === 'creation' ||
    persists.includes('curiosity') ||
    desc.match(/\b(learn|evolv|discover)\b/)
  ) {
    educationPurpose = 'lifelong-practice';
  }
  // Mentorship & transmission
  else if (
    (persists.includes('craft') && persists.includes('care')) ||
    desc.match(/\b(mentor|apprentice|master.*teach)\b/)
  ) {
    educationPurpose = 'mentorship-transmission';
  }
  else {
    educationPurpose = 'absent-irrelevant';
  }

  // SCHOOL REPLACEMENT
  // Unchanged (traditional institutions)
  if (desc.match(/\b(school|university|academy|student|classroom)\b/)) {
    schoolReplacement = 'unchanged';
  }
  // Virtual/neural academies
  else if (
    desc.match(/\b(simulation.*train|virtual.*reality|cyberspace)\b/) ||
    persists.includes('cyberspace')
  ) {
    schoolReplacement = 'virtual-neural';
  }
  // Direct transfer
  else if (
    desc.match(/\b(upload.*knowledge|download.*skill|neural.*implant|consciousness.*transfer)\b/) ||
    persists.includes('mind_uploading')
  ) {
    schoolReplacement = 'direct-transfer';
  }
  // AI tutors
  else if (
    book.aiPresence === 'central' ||
    book.aiPresence === 'companion'
  ) {
    schoolReplacement = 'ai-tutors';
  }
  // Apprenticeship
  else if (
    persists.includes('craft') ||
    desc.match(/\b(apprentice|guild|craftsman)\b/)
  ) {
    schoolReplacement = 'apprenticeship';
  }
  // Self-organized
  else if (
    desc.match(/\b(self-taught|collective.*learn|community.*education)\b/) ||
    (persists.includes('community') && book.workRole === 'voluntary')
  ) {
    schoolReplacement = 'self-organized';
  }
  else {
    schoolReplacement = 'obsolete';
  }

  return { educationPurpose, schoolReplacement };
}

// Tag books
const taggedBooks = books.map(book => {
  const { educationPurpose, schoolReplacement } = categorizeEducation(book);
  return { ...book, educationPurpose, schoolReplacement };
});

// Calculate stats
const purposeCounts = {};
const replacementCounts = {};

taggedBooks.forEach(book => {
  purposeCounts[book.educationPurpose] = (purposeCounts[book.educationPurpose] || 0) + 1;
  replacementCounts[book.schoolReplacement] = (replacementCounts[book.schoolReplacement] || 0) + 1;
});

console.log('\n=== WHAT IS EDUCATION FOR? ===');
Object.entries(purposeCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([purpose, count]) => {
    const pct = Math.round((count / taggedBooks.length) * 100);
    console.log(`${purpose}: ${pct}%`);
  });

console.log('\n=== WHAT REPLACES TRADITIONAL SCHOOLS? ===');
Object.entries(replacementCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([replacement, count]) => {
    const pct = Math.round((count / taggedBooks.length) * 100);
    console.log(`${replacement}: ${pct}%`);
  });

// Save
const updatedContent = booksContent.replace(
  /const books = \[[\s\S]*\];/,
  `const books = ${JSON.stringify(taggedBooks, null, 2)};`
);

fs.writeFileSync(booksPath, updatedContent, 'utf8');
console.log('\n✅ Tagged and saved\n');

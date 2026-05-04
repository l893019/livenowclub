const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const books = eval(booksContent.match(/const books = (\[[\s\S]*\]);/)[1]);

console.log(`Tagging books from the education analysis that exist in the dataset...\n`);

// Map of book titles to their education tags
const educationMap = {
  // Character & self-actualization (12)
  'The Diamond Age': { purpose: 'character-actualization', replacement: 'ai-tutors' },
  'Anathem': { purpose: 'character-actualization', replacement: 'self-organized' },
  'Flowers for Algernon': { purpose: 'character-actualization', replacement: 'obsolete' },
  "Ender's Game": { purpose: 'character-actualization', replacement: 'unchanged' },
  'The Fifth Season': { purpose: 'character-actualization', replacement: 'conditioning-systems' },
  'Binti': { purpose: 'character-actualization', replacement: 'unchanged' },
  'The Dispossessed': { purpose: 'character-actualization', replacement: 'self-organized' },
  'Snow Crash': { purpose: 'character-actualization', replacement: 'ai-tutors' },
  'Kindred': { purpose: 'character-actualization', replacement: 'obsolete' },
  'The Book of the New Sun': { purpose: 'character-actualization', replacement: 'apprenticeship' },
  'A Closed and Common Orbit': { purpose: 'character-actualization', replacement: 'ai-tutors' },
  "Rainbows End": { purpose: 'character-actualization', replacement: 'ai-tutors' },

  // Conditioning & control (6 - Psycho-Pass not in dataset)
  'Brave New World': { purpose: 'conditioning-control', replacement: 'conditioning-systems' },
  'A Clockwork Orange': { purpose: 'conditioning-control', replacement: 'conditioning-systems' },
  'Nineteen Eighty-Four': { purpose: 'conditioning-control', replacement: 'obsolete' },
  'We': { purpose: 'conditioning-control', replacement: 'obsolete' },
  'The Handmaid\'s Tale': { purpose: 'conditioning-control', replacement: 'obsolete' },
  'Cyteen': { purpose: 'conditioning-control', replacement: 'obsolete' },

  // Mentorship & transmission (4)
  'The Lifecycle of Software Objects': { purpose: 'mentorship-transmission', replacement: 'ai-tutors' },
  'Too Like the Lightning': { purpose: 'mentorship-transmission', replacement: 'apprenticeship' },
  'Parable of the Sower': { purpose: 'mentorship-transmission', replacement: 'apprenticeship' },
  'A Canticle for Leibowitz': { purpose: 'mentorship-transmission', replacement: 'apprenticeship' },

  // Sorting & class (1 - others not in dataset)
  'Player Piano': { purpose: 'sorting-class', replacement: 'obsolete' },

  // Lifelong practice - Culture series books
  'Consider Phlebas': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'The Player of Games': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'Use of Weapons': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'Excession': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'Inversions': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'Look to Windward': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'Matter': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'Surface Detail': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'The Hydrogen Sonata': { purpose: 'lifelong-practice', replacement: 'obsolete' },
  'Always Coming Home': { purpose: 'lifelong-practice', replacement: 'apprenticeship' },
  'Woman on the Edge of Time': { purpose: 'lifelong-practice', replacement: 'apprenticeship' }
};

// Reset all books first
let updatedBooks = books.map(book => ({
  ...book,
  educationPurpose: undefined,
  schoolReplacement: undefined
}));

// Tag the books from our map
let taggedCount = 0;
let notFoundBooks = [];

Object.keys(educationMap).forEach(title => {
  const found = updatedBooks.find(b => b.title === title);
  if (!found) {
    notFoundBooks.push(title);
  }
});

updatedBooks = updatedBooks.map(book => {
  if (educationMap[book.title]) {
    taggedCount++;
    return {
      ...book,
      educationPurpose: educationMap[book.title].purpose,
      schoolReplacement: educationMap[book.title].replacement
    };
  }
  return book;
});

console.log(`✓ Tagged ${taggedCount} books where education is central`);
console.log(`✓ ${208 - taggedCount} books have no education tagging`);

if (notFoundBooks.length > 0) {
  console.log(`\n⚠ Books from analysis not found in dataset:`);
  notFoundBooks.forEach(title => console.log(`  - ${title}`));
}

// Calculate actual percentages
const purposeCounts = {};
const replacementCounts = {};

updatedBooks.forEach(book => {
  if (book.educationPurpose) {
    purposeCounts[book.educationPurpose] = (purposeCounts[book.educationPurpose] || 0) + 1;
  }
  if (book.schoolReplacement) {
    replacementCounts[book.schoolReplacement] = (replacementCounts[book.schoolReplacement] || 0) + 1;
  }
});

console.log('\n=== ACTUAL COUNTS ===');
console.log('\nEducation Purpose:');
Object.entries(purposeCounts).sort((a, b) => b[1] - a[1]).forEach(([purpose, count]) => {
  const pct = Math.round((count / taggedCount) * 100);
  console.log(`  ${purpose}: ${count} (${pct}%)`);
});

console.log('\nSchool Replacement:');
Object.entries(replacementCounts).sort((a, b) => b[1] - a[1]).forEach(([replacement, count]) => {
  const pct = Math.round((count / taggedCount) * 100);
  console.log(`  ${replacement}: ${count} (${pct}%)`);
});

// Save updated books
const updatedContent = booksContent.replace(
  /const books = \[[\s\S]*\];/,
  `const books = ${JSON.stringify(updatedBooks, null, 2)};`
);

fs.writeFileSync(booksPath, updatedContent, 'utf8');
console.log(`\n✅ Updated merged-books.js with ${taggedCount} education-tagged books\n`);

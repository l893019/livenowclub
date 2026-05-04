const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const books = eval(booksContent.match(/const books = (\[[\s\S]*\]);/)[1]);

console.log(`Updating education tags for 30 books where education is central...\n`);

// The 30 books where education is central, organized by category
const educationBooks = {
  'character-actualization': [
    'The Diamond Age',
    'Anathem',
    'Flowers for Algernon',
    "Ender's Game",
    'The Fifth Season',
    'Binti',
    'The Dispossessed',
    'Snow Crash',
    'Kindred',
    'The Book of the New Sun',
    'A Closed and Common Orbit',
    "Rainbows End"
  ],
  'conditioning-control': [
    'Brave New World',
    'A Clockwork Orange',
    '1984',
    'We',
    'The Handmaid\'s Tale',
    'Cyteen'
    // Note: Psycho-Pass (2012) is not in our dataset
  ],
  'mentorship-transmission': [
    'The Lifecycle of Software Objects',
    'Too Like the Lightning',
    'Parable of the Sower',
    'A Canticle for Leibowitz'
  ],
  'sorting-class': [
    'Player Piano',
    'Folding Beijing'
    // Note: Gattaca (1997) and Manna (2003) may not be in our dataset
  ],
  'lifelong-practice': [
    'Always Coming Home',
    'Woman on the Edge of Time'
    // Note: "Culture series" is multiple books - need to handle separately
  ]
};

// School replacement mappings
const schoolReplacements = {
  'The Diamond Age': 'ai-tutors',
  'Anathem': 'self-organized',
  'Flowers for Algernon': 'conditioning-systems',
  "Ender's Game": 'unchanged',
  'The Fifth Season': 'conditioning-systems',
  'Binti': 'unchanged',
  'The Dispossessed': 'self-organized',
  'Snow Crash': 'ai-tutors',
  'Kindred': 'obsolete',
  'The Book of the New Sun': 'apprenticeship',
  'A Closed and Common Orbit': 'ai-tutors',
  "Rainbows End": 'ai-tutors',
  'Brave New World': 'conditioning-systems',
  'A Clockwork Orange': 'obsolete',
  '1984': 'obsolete',
  'We': 'obsolete',
  'The Handmaid\'s Tale': 'obsolete',
  'Cyteen': 'obsolete',
  'The Lifecycle of Software Objects': 'ai-tutors',
  'Too Like the Lightning': 'apprenticeship',
  'Parable of the Sower': 'apprenticeship',
  'A Canticle for Leibowitz': 'apprenticeship',
  'Player Piano': 'obsolete',
  'Folding Beijing': 'obsolete',
  'Always Coming Home': 'apprenticeship',
  'Woman on the Edge of Time': 'apprenticeship'
};

// Handle Culture series books separately
const cultureBooksPattern = /^(Consider Phlebas|The Player of Games|Use of Weapons|Excession|Inversions|Look to Windward|Matter|Surface Detail|The Hydrogen Sonata)$/;

// First, reset all books
let updatedBooks = books.map(book => ({
  ...book,
  educationPurpose: undefined,
  schoolReplacement: undefined
}));

// Then tag only the 30 where education is central
let taggedCount = 0;
updatedBooks = updatedBooks.map(book => {
  // Check if this book is in our education list
  for (const [purpose, titles] of Object.entries(educationBooks)) {
    if (titles.includes(book.title)) {
      taggedCount++;
      return {
        ...book,
        educationPurpose: purpose,
        schoolReplacement: schoolReplacements[book.title] || 'obsolete'
      };
    }
  }

  // Check if it's a Culture series book
  if (cultureBooksPattern.test(book.title)) {
    taggedCount++;
    return {
      ...book,
      educationPurpose: 'lifelong-practice',
      schoolReplacement: 'obsolete'
    };
  }

  return book;
});

console.log(`Tagged ${taggedCount} books where education is central`);
console.log(`${208 - taggedCount} books have no education tagging`);

// Verify the counts
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

console.log('\n=== EDUCATION PURPOSE ===');
Object.entries(purposeCounts).sort((a, b) => b[1] - a[1]).forEach(([purpose, count]) => {
  console.log(`  ${purpose}: ${count}`);
});

console.log('\n=== SCHOOL REPLACEMENT ===');
Object.entries(replacementCounts).sort((a, b) => b[1] - a[1]).forEach(([replacement, count]) => {
  console.log(`  ${replacement}: ${count}`);
});

// Save updated books
const updatedContent = booksContent.replace(
  /const books = \[[\s\S]*\];/,
  `const books = ${JSON.stringify(updatedBooks, null, 2)};`
);

fs.writeFileSync(booksPath, updatedContent, 'utf8');
console.log('\n✅ Updated merged-books.js with 30 education-tagged books\n');

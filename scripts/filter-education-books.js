const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const books = eval(booksContent.match(/const books = (\[[\s\S]*\]);/)[1]);

console.log(`Filtering from ${books.length} total books to those where education is actually present...\n`);

// Filter to books where education is actually a theme
const educationBooks = books.filter(book => {
  const desc = (book.desc || '').toLowerCase();

  // STRICT: Only books with explicit educational institutions or teaching/learning as a core plot element
  const hasSchoolKeywords = desc.match(/\b(school|academy|university|college|student|professor|classroom)\b/);

  const hasExplicitTeaching = desc.match(/\b(trained|teaches|mentor|apprentice|tutor|instruction|lesson)\b/);

  const hasEducationAsPlot =
    desc.includes('conditioned') ||
    desc.includes('education') ||
    desc.includes('raised to') ||
    desc.includes('bred to') ||
    desc.includes('engineered') && desc.includes('serve');

  // Strong education purpose (not lifelong-practice or character-actualization which are often inferred)
  const hasStrongEducationPurpose =
    book.educationPurpose === 'conditioning-control' ||
    book.educationPurpose === 'sorting-class' ||
    book.educationPurpose === 'mentorship-transmission';

  return hasSchoolKeywords || hasExplicitTeaching || hasEducationAsPlot || hasStrongEducationPurpose;
});

console.log(`Found ${educationBooks.length} books where education is actually present\n`);

// Show sample
console.log('=== SAMPLE BOOKS (first 20) ===\n');
educationBooks.slice(0, 20).forEach(b => {
  console.log(`${b.title} (${b.year})`);
  console.log(`  Purpose: ${b.educationPurpose}`);
  console.log(`  Replacement: ${b.schoolReplacement}`);
  console.log(`  Desc: ${b.desc}`);
  console.log('');
});

// Recalculate percentages
const purposeCounts = {};
const replacementCounts = {};

educationBooks.forEach(book => {
  purposeCounts[book.educationPurpose] = (purposeCounts[book.educationPurpose] || 0) + 1;
  replacementCounts[book.schoolReplacement] = (replacementCounts[book.schoolReplacement] || 0) + 1;
});

console.log('\n=== RECALCULATED PERCENTAGES ===\n');

console.log('WHAT IS EDUCATION FOR?');
Object.entries(purposeCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([purpose, count]) => {
    const pct = Math.round((count / educationBooks.length) * 100);
    console.log(`  ${purpose}: ${count} books (${pct}%)`);
  });

console.log('\nWHAT REPLACES TRADITIONAL SCHOOLS?');
Object.entries(replacementCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([replacement, count]) => {
    const pct = Math.round((count / educationBooks.length) * 100);
    console.log(`  ${replacement}: ${count} books (${pct}%)`);
  });

// Save filtered list
fs.writeFileSync(
  path.join(__dirname, 'education-filtered-books.json'),
  JSON.stringify({
    total: educationBooks.length,
    books: educationBooks.map(b => ({
      title: b.title,
      year: b.year,
      author: b.author,
      desc: b.desc,
      educationPurpose: b.educationPurpose,
      schoolReplacement: b.schoolReplacement
    })),
    stats: {
      purpose: purposeCounts,
      replacement: replacementCounts
    }
  }, null, 2)
);

console.log('\n✅ Filtered list saved to education-filtered-books.json');

const fs = require('fs');
const path = require('path');

// Read the book data
const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const booksMatch = booksContent.match(/const books = (\[[\s\S]*\]);/);
let books = eval(booksMatch[1]);

console.log(`Starting manual review of ${books.length} books\n`);

// Manual categorization based on careful analysis
// I'll go through each book systematically

const manualTags = {
  // I'll fill this in as I review each book
  // Format: 'Book Title': { purpose: 'category', replacement: 'category', reasoning: 'why' }
};

// Display format for review
books.forEach((book, index) => {
  console.log(`\n[${index + 1}/${books.length}] ${book.title} (${book.year}) - ${book.author}`);
  console.log(`Desc: ${book.desc}`);
  console.log(`Themes: ${book.themes.join(', ')}`);
  console.log(`Tech: ${book.techStance} | Work: ${book.workRole} | Identity: ${book.identityModel}`);
  if (book.persists?.length) console.log(`Persists: ${book.persists.join(', ')}`);
  console.log(`---`);
});

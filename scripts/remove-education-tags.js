const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const books = eval(booksContent.match(/const books = (\[[\s\S]*\]);/)[1]);

console.log('Removing all education tags from books...\n');

// Remove educationPurpose and schoolReplacement from all books
const cleanedBooks = books.map(book => {
  const { educationPurpose, schoolReplacement, ...rest } = book;
  return rest;
});

// Save updated books
const updatedContent = booksContent.replace(
  /const books = \[[\s\S]*\];/,
  `const books = ${JSON.stringify(cleanedBooks, null, 2)};`
);

fs.writeFileSync(booksPath, updatedContent, 'utf8');
console.log('✅ Removed all education tags from merged-books.js\n');

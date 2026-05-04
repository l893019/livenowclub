const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const books = eval(booksContent.match(/const books = (\[[\s\S]*\]);/)[1]);

// Create comprehensive CSV
let csv = 'Title,Year,Author,Themes,TechStance,AIPresence,WorkRole,Persists,Education Purpose,School Replacement,Description\n';
books.forEach(book => {
  const themes = (book.themes || []).join('; ');
  const persists = (book.persists || []).join('; ');
  const desc = (book.desc || '').replace(/"/g, '""');
  const author = (book.author || '').replace(/"/g, '""');

  csv += `"${book.title}",${book.year},"${author}","${themes}",${book.techStance},${book.aiPresence},${book.workRole},"${persists}",${book.educationPurpose},${book.schoolReplacement},"${desc}"\n`;
});

fs.writeFileSync(process.env.HOME + '/Desktop/education-full-data.csv', csv);
console.log('✓ Full data CSV saved to Desktop');

// Books grouped by replacement type
const byReplacement = {};
books.forEach(b => {
  if (!byReplacement[b.schoolReplacement]) {
    byReplacement[b.schoolReplacement] = [];
  }
  byReplacement[b.schoolReplacement].push({
    title: b.title,
    year: b.year,
    desc: b.desc
  });
});

fs.writeFileSync(
  process.env.HOME + '/Desktop/education-by-replacement.json',
  JSON.stringify(byReplacement, null, 2)
);
console.log('✓ Books by replacement type saved to Desktop');

// Show current counts
console.log('\n=== SCHOOL REPLACEMENT BREAKDOWN ===');
Object.keys(byReplacement).sort((a, b) => byReplacement[b].length - byReplacement[a].length).forEach(type => {
  const count = byReplacement[type].length;
  const pct = Math.round((count / books.length) * 100);
  console.log(`${type}: ${count} (${pct}%)`);
});

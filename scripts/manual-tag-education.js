const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Read the book data
const booksPath = path.join(__dirname, '../public/wonder/data/merged-books.js');
const booksContent = fs.readFileSync(booksPath, 'utf8');
const booksMatch = booksContent.match(/const books = (\[[\s\S]*\]);/);
let books = eval(booksMatch[1]);

const PURPOSE_OPTIONS = {
  '1': 'character-actualization',
  '2': 'lifelong-practice',
  '3': 'sorting-class',
  '4': 'conditioning-control',
  '5': 'mentorship-transmission',
  '6': 'absent-irrelevant'
};

const REPLACEMENT_OPTIONS = {
  '1': 'virtual-neural',
  '2': 'ai-tutors',
  '3': 'direct-transfer',
  '4': 'apprenticeship',
  '5': 'self-organized',
  '6': 'unchanged',
  '7': 'obsolete'
};

let currentIndex = 0;

function showBook(index) {
  const book = books[index];
  console.clear();
  console.log(`\n========== BOOK ${index + 1}/${books.length} ==========`);
  console.log(`Title: ${book.title} (${book.year}) by ${book.author}`);
  console.log(`\nDescription: ${book.desc}`);
  console.log(`\nThemes: ${book.themes.join(', ')}`);
  if (book.persists?.length) console.log(`Persists: ${book.persists.join(', ')}`);
  if (book.fades?.length) console.log(`Fades: ${book.fades.join(', ')}`);
  console.log(`Tech stance: ${book.techStance}`);
  console.log(`Identity model: ${book.identityModel}`);
  console.log(`Work role: ${book.workRole}`);
  console.log(`Worth living for: ${book.worthLiving}`);
  if (book.tensions) {
    console.log(`Tensions: ${JSON.stringify(book.tensions)}`);
  }
  console.log(`\n--- EDUCATION PURPOSE ---`);
  console.log(`1. Character & self-actualization`);
  console.log(`2. Lifelong practice (no endpoint)`);
  console.log(`3. Sorting & class mechanism`);
  console.log(`4. Conditioning & control`);
  console.log(`5. Mentorship & human transmission`);
  console.log(`6. Absent or irrelevant`);
  if (book.educationPurpose) {
    console.log(`\n[Currently: ${book.educationPurpose}]`);
  }
}

function askPurpose() {
  rl.question('\nSelect purpose (1-6, or s to skip, q to quit, b to go back): ', (answer) => {
    if (answer === 'q') {
      save AndExit();
      return;
    }
    if (answer === 'b') {
      if (currentIndex > 0) {
        currentIndex--;
        showBook(currentIndex);
        askPurpose();
      } else {
        console.log('Already at first book');
        askPurpose();
      }
      return;
    }
    if (answer === 's') {
      currentIndex++;
      if (currentIndex < books.length) {
        showBook(currentIndex);
        askPurpose();
      } else {
        saveAndExit();
      }
      return;
    }

    const purpose = PURPOSE_OPTIONS[answer];
    if (!purpose) {
      console.log('Invalid selection');
      askPurpose();
      return;
    }

    books[currentIndex].educationPurpose = purpose;

    console.log(`\n--- WHAT REPLACES SCHOOLS? ---`);
    console.log(`1. Virtual/neural academies`);
    console.log(`2. AI tutors`);
    console.log(`3. Direct knowledge transfer`);
    console.log(`4. Apprenticeship guilds`);
    console.log(`5. Self-organized communities`);
    console.log(`6. Schools unchanged`);
    console.log(`7. Education obsolete`);
    if (books[currentIndex].schoolReplacement) {
      console.log(`\n[Currently: ${books[currentIndex].schoolReplacement}]`);
    }

    askReplacement();
  });
}

function askReplacement() {
  rl.question('\nSelect replacement (1-7): ', (answer) => {
    const replacement = REPLACEMENT_OPTIONS[answer];
    if (!replacement) {
      console.log('Invalid selection');
      askReplacement();
      return;
    }

    books[currentIndex].schoolReplacement = replacement;

    currentIndex++;
    if (currentIndex < books.length) {
      showBook(currentIndex);
      askPurpose();
    } else {
      saveAndExit();
    }
  });
}

function saveAndExit() {
  // Calculate stats
  const purposeCounts = {};
  const replacementCounts = {};

  books.forEach(book => {
    if (book.educationPurpose) {
      purposeCounts[book.educationPurpose] = (purposeCounts[book.educationPurpose] || 0) + 1;
    }
    if (book.schoolReplacement) {
      replacementCounts[book.schoolReplacement] = (replacementCounts[book.schoolReplacement] || 0) + 1;
    }
  });

  const tagged = books.filter(b => b.educationPurpose).length;

  console.log(`\n\n=== PROGRESS: ${tagged}/${books.length} books tagged ===`);

  if (Object.keys(purposeCounts).length > 0) {
    console.log('\n=== WHAT IS EDUCATION FOR? ===');
    Object.entries(purposeCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([purpose, count]) => {
        const pct = Math.round((count / tagged) * 100);
        console.log(`${purpose}: ${count} books (${pct}%)`);
      });
  }

  if (Object.keys(replacementCounts).length > 0) {
    console.log('\n=== WHAT REPLACES SCHOOLS? ===');
    Object.entries(replacementCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([replacement, count]) => {
        const pct = Math.round((count / tagged) * 100);
        console.log(`${replacement}: ${count} books (${pct}%)`);
      });
  }

  // Save
  const updatedContent = booksContent.replace(
    /const books = \[[\s\S]*\];/,
    `const books = ${JSON.stringify(books, null, 2)};`
  );

  fs.writeFileSync(booksPath, updatedContent, 'utf8');
  console.log('\n✅ Progress saved to merged-books.js');

  rl.close();
  process.exit(0);
}

// Start
// Find first untagged book
while (currentIndex < books.length && books[currentIndex].educationPurpose) {
  currentIndex++;
}

if (currentIndex >= books.length) {
  console.log('All books already tagged!');
  saveAndExit();
} else {
  showBook(currentIndex);
  askPurpose();
}

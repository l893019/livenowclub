// ORBITS content extracted from essays - inputs that shape Louise's thinking

export type Book = {
  title: string;
  author: string;
  description?: string;
  link?: string;
};

export type Practice = {
  title: string;
  description: string;
  link?: string;
};

// Books that have shaped Louise's thinking
export const BOOKS: Book[] = [
  // From ORBITS sections
  { title: "It Lasts Forever and Then It's Over", author: "Anne de Marcken", description: "A haunting, philosophical novella narrated by a zombie. It moves through death, decay, and the persistence of love." },
  { title: "The Inevitable", author: "Kevin Kelly", description: "On technological forces that are already in motion and how to ride them with intention. Fundamental to my worldview." },
  { title: "Flatland", author: "Edwin A. Abbott", description: "A parable on dimensional blindness and the limits of perception." },
  { title: "East of Eden", author: "John Steinbeck", description: "A sprawling, biblical tale of love, jealousy, and moral inheritance." },
  { title: "The Order of Time", author: "Carlo Rovelli", description: "A physicist's meditation on time as fluid and relational." },
  { title: "Ways of Seeing", author: "John Berger", description: "A short but radical re-orientation toward image, gender, and gaze." },
  { title: "The Perennial Philosophy", author: "Aldous Huxley", description: "A collage of mystic voices from every tradition, all circling the same truth." },
  { title: "Nineteen Ways of Looking at Wang Wei", author: "Eliot Weinberger", description: "A slim, brilliant meditation on translation and perception." },
  { title: "Wild Geese Returning", author: "Michèle Metsch", description: "Poems that can be read forward and backward, revealing mirrored meanings." },
  { title: "Man and His Symbols", author: "Carl Jung", description: "A map of the symbols that rise from the collective unconscious." },
  { title: "The Dream and the Underworld", author: "James Hillman", description: "Hillman reimagines dreams as mythic spaces to inhabit." },
  { title: "The Lathe of Heaven", author: "Ursula K. Le Guin", description: "A novel where dreams shape reality." },
  { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", description: "A labyrinth of mirrors linking mathematics, music, and mind." },
  { title: "The Body Keeps the Score", author: "Bessel van der Kolk", description: "A classic on trauma and somatic healing." },
  { title: "Bluets", author: "Maggie Nelson", description: "Grief, color, and desire woven into philosophy." },
  { title: "A Memory Called Empire", author: "Arkady Martine", description: "An ambassador enters a culture so interconnected it feels telepathic." },

  // From How to Travel Alone - short, meditative books for solo travel
  { title: "Invisible Cities", author: "Italo Calvino" },
  { title: "Einstein's Dreams", author: "Alan Lightman" },
  { title: "The Imitation of Christ", author: "Thomas Kempis" },
  { title: "Labyrinths", author: "Jorge Luis Borges" },
  { title: "The House of Belonging", author: "David Whyte" },
  { title: "The Heart Sutra", author: "Red Pine (translator)" },
  { title: "The Secret of the Golden Flower", author: "Richard Wilhelm (translator)" },
  { title: "Book of Common Prayer", author: "Church of England" },
  { title: "Meditations", author: "Marcus Aurelius" },
  { title: "Exhalation", author: "Ted Chiang" },
  { title: "Stories of Your Life", author: "Ted Chiang" },
  { title: "Letters to a Young Poet", author: "Rainer Maria Rilke" },
  { title: "The Prophet", author: "Kahlil Gibran" },
  { title: "The Periodic Table", author: "Primo Levi" },
];

// Practices that help Louise live now
export const PRACTICES: Practice[] = [
  {
    title: "5Rhythms",
    description: "Dance practice. If you are in New York, come dance with me. Otherwise, find a class near you.",
    link: "https://www.5rhythms.com/EventSearch.php",
  },
  {
    title: "23rd Street Studio",
    description: "Art class in San Francisco I can't recommend highly enough. One exercise: tense your body as much as possible and then let that tension flow through your arm onto the page.",
    link: "https://23rdstreetstudio.com/",
  },
  {
    title: "Dream Practice",
    description: "Start with 30-60 minutes of light therapy or daylight. Before bed, meditate using the Expand app from Monroe. Write down dreams first thing in the morning. Let symbols infiltrate your art and mind.",
    link: "https://info.monroeinstitute.org/get-expand-app",
  },
];

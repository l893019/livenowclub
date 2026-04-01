import Redis from 'ioredis';

// Initialize Redis client using REDIS_URL
const redis = new Redis(process.env.REDIS_URL || '');

// =============================================================================
// TYPES
// =============================================================================

export type UserResult = {
  id: string;
  name: string;
  email: string | null;
  archetype: string;
  secondaryArchetype: string;
  scores: Record<string, number>;
  answers: string[];
  createdAt: string;
};

export type UtopiaMember = {
  id: string;
  name: string;
  archetype: string;
  joinedAt: string;
  isFounder?: boolean;
};

// =============================================================================
// SUGGESTED UTOPIA NAMES BY ARCHETYPE
// =============================================================================

export const SUGGESTED_UTOPIA_NAMES: Record<string, string> = {
  citizen: "The Abundant Commons",
  shaper: "The Unfinished City",
  architect: "The People's House",
  presence: "The Gathering Place",
  swimmer: "The Deep End",
  rooted: "The Still Garden",
  conscience: "The Watchtower",
  embers: "The Memory Palace",
  friction: "The Proving Ground",
  unbound: "The Infinite Edge",
  alive: "The Feeling World",
  mender: "The Repair Shop",
  cleareyed: "The Clear View",
  between: "The Threshold",
};

export function getSuggestedUtopiaName(archetype: string): string {
  return SUGGESTED_UTOPIA_NAMES[archetype] || "My Utopia";
}

export type UtopiaRoom = {
  slug: string;
  name: string;
  createdBy: string;
  members: UtopiaMember[];
  createdAt: string;
};

// =============================================================================
// STAR NAMES
// =============================================================================

export const STAR_NAMES = [
  'Sirius', 'Vega', 'Arcturus', 'Rigel', 'Procyon', 'Betelgeuse', 'Altair',
  'Aldebaran', 'Antares', 'Spica', 'Pollux', 'Fomalhaut', 'Deneb', 'Regulus',
  'Capella', 'Castor', 'Bellatrix', 'Elnath', 'Alnilam', 'Alnitak', 'Alioth',
  'Dubhe', 'Alkaid', 'Mizar', 'Polaris', 'Canopus', 'Achernar', 'Hadar',
  'Acrux', 'Mimosa', 'Shaula', 'Kaus', 'Nunki', 'Alsephina', 'Menkent',
  'Peacock', 'Alnair', 'Alphard', 'Mirfak', 'Algol', 'Almach', 'Schedar',
  'Caph', 'Alderamin', 'Rasalhague', 'Eltanin', 'Thuban', 'Kochab', 'Pherkad',
  'Alphecca', 'Gemma', 'Nekkar', 'Izar', 'Muphrid', 'Seginus', 'Talitha',
  'Alcor', 'Megrez', 'Phecda', 'Merak', 'Muscida', 'Alula', 'Tania',
  'Algenib', 'Alpheratz', 'Mirach', 'Hamal', 'Sheratan', 'Botein', 'Bharani',
  'Alcyone', 'Atlas', 'Electra', 'Maia', 'Merope', 'Taygeta', 'Celaeno',
  'Asterope', 'Nashira', 'Deneb Algedi', 'Sadalsuud', 'Sadalmelik', 'Skat',
  'Markab', 'Scheat', 'Matar', 'Enif', 'Baham', 'Homam', 'Sadalbari',
  'Gienah', 'Algorab', 'Minkar', 'Kraz', 'Alchiba', 'Zaniah', 'Porrima',
  'Vindemiatrix', 'Heze', 'Zavijava', 'Syrma', 'Khambalia', 'Diadem',
  'Cor Caroli', 'Chara', 'Asterion', 'Rastaban', 'Grumium',
  'Sadr', 'Albireo', 'Gienah Cygni', 'Azha', 'Cursa', 'Acamar', 'Ankaa',
  'Diphda', 'Menkar', 'Kaffaljidhma', 'Baten Kaitos', 'Deneb Kaitos',
  'Suhail', 'Naos', 'Regor', 'Aspidiske', 'Avior', 'Miaplacidus', 'Tureis',
  'Alsuhail', 'Markeb', 'Lesath', 'Sargas', 'Girtab', 'Dschubba', 'Acrab',
  'Jabbah', 'Graffias', 'Zubeneschamali', 'Zubenelgenubi', 'Brachium',
  'Unukalhai', 'Alya', 'Marfik', 'Yed Prior', 'Yed Posterior', 'Sabik',
  'Atria', 'Kuma', 'Alathfar', 'Sheliak', 'Sulafat', 'Sulaphat', 'Sarin',
  'Tyl', 'Edasich', 'Giausar', 'Aldhibah', 'Nodus', 'Alrakis', 'Arrakis',
  'Alwaid', 'Etamin', 'Aldhibain', 'Tarazed', 'Dabih', 'Algedi', 'Giedi',
  'Ancha', 'Situla', 'Albali', 'Sadachbia',
  'Sadaltager', 'Biham', 'Salm', 'Fum al Samakah'
];

export function getRandomStarName(): string {
  return STAR_NAMES[Math.floor(Math.random() * STAR_NAMES.length)];
}

export function generateSlug(starName: string): string {
  const base = starName.toLowerCase().replace(/\s+/g, '-');
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${base}-${suffix}`;
}

// =============================================================================
// USER FUNCTIONS
// =============================================================================

export async function saveUserResult(result: UserResult): Promise<void> {
  await redis.set(`user:${result.id}`, JSON.stringify(result));
}

export async function getUserResult(userId: string): Promise<UserResult | null> {
  const data = await redis.get(`user:${userId}`);
  if (!data) return null;
  return JSON.parse(data);
}

export async function updateUserArchetype(
  userId: string,
  archetype: string,
  secondaryArchetype: string,
  scores: Record<string, number>,
  answers: string[]
): Promise<void> {
  const existing = await getUserResult(userId);
  if (!existing) return;

  const updated: UserResult = {
    ...existing,
    archetype,
    secondaryArchetype,
    scores,
    answers,
  };

  await saveUserResult(updated);

  // Update archetype in all utopias this user belongs to
  const utopias = await getUserUtopias(userId);
  for (const utopia of utopias) {
    const memberIndex = utopia.members.findIndex(m => m.id === userId);
    if (memberIndex !== -1) {
      utopia.members[memberIndex].archetype = archetype;
      await redis.set(`utopia:${utopia.slug}`, JSON.stringify(utopia));
    }
  }
}

// =============================================================================
// UTOPIA FUNCTIONS
// =============================================================================

export async function createUtopia(
  userId: string,
  userName: string,
  userArchetype: string,
  customName?: string
): Promise<UtopiaRoom> {
  const utopiaName = customName || getSuggestedUtopiaName(userArchetype);
  const slug = generateSlug(utopiaName);

  const room: UtopiaRoom = {
    slug,
    name: utopiaName,
    createdBy: userId,
    members: [{
      id: userId,
      name: userName,
      archetype: userArchetype,
      joinedAt: new Date().toISOString(),
      isFounder: true,
    }],
    createdAt: new Date().toISOString(),
  };

  // Save utopia
  await redis.set(`utopia:${slug}`, JSON.stringify(room));

  // Add to user's utopia list
  await addUtopiaToUser(userId, slug);

  return room;
}

export async function getUtopia(slug: string): Promise<UtopiaRoom | null> {
  const data = await redis.get(`utopia:${slug}`);
  if (!data) return null;
  return JSON.parse(data);
}

export async function joinUtopia(
  slug: string,
  userId: string,
  userName: string,
  userArchetype: string
): Promise<UtopiaRoom | null> {
  const utopia = await getUtopia(slug);
  if (!utopia) return null;

  // Check if already a member
  if (utopia.members.some(m => m.id === userId)) {
    return utopia;
  }

  // Add member
  utopia.members.push({
    id: userId,
    name: userName,
    archetype: userArchetype,
    joinedAt: new Date().toISOString(),
  });

  // Save
  await redis.set(`utopia:${slug}`, JSON.stringify(utopia));

  // Add to user's utopia list
  await addUtopiaToUser(userId, slug);

  return utopia;
}

export async function leaveUtopia(slug: string, userId: string): Promise<boolean> {
  const utopia = await getUtopia(slug);
  if (!utopia) return false;

  // Remove member
  utopia.members = utopia.members.filter(m => m.id !== userId);

  // Save
  await redis.set(`utopia:${slug}`, JSON.stringify(utopia));

  // Remove from user's utopia list
  await removeUtopiaFromUser(userId, slug);

  return true;
}

// =============================================================================
// USER UTOPIA LIST
// =============================================================================

async function addUtopiaToUser(userId: string, slug: string): Promise<void> {
  const key = `user:${userId}:utopias`;
  const existing = await redis.get(key);
  const list: string[] = existing ? JSON.parse(existing) : [];
  if (!list.includes(slug)) {
    list.push(slug);
    await redis.set(key, JSON.stringify(list));
  }
}

async function removeUtopiaFromUser(userId: string, slug: string): Promise<void> {
  const key = `user:${userId}:utopias`;
  const existing = await redis.get(key);
  if (!existing) return;
  const list: string[] = JSON.parse(existing);
  const updated = list.filter(s => s !== slug);
  await redis.set(key, JSON.stringify(updated));
}

export async function getUserUtopias(userId: string): Promise<UtopiaRoom[]> {
  const key = `user:${userId}:utopias`;
  const data = await redis.get(key);
  const slugs: string[] = data ? JSON.parse(data) : [];

  const utopias: UtopiaRoom[] = [];
  for (const slug of slugs) {
    const utopia = await getUtopia(slug);
    if (utopia) {
      utopias.push(utopia);
    }
  }

  return utopias;
}

// =============================================================================
// UUID GENERATION
// =============================================================================

export function generateUserId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

import Redis from 'ioredis';
import { encrypt, decrypt, isEncrypted } from './crypto';

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
  slug?: string; // friendly URL slug for /meet/[slug] links
};

export type UtopiaMember = {
  id: string;
  name: string;
  archetype: string;
  joinedAt: string;
  isFounder?: boolean;
  answers?: string[]; // Quiz answers for LLM-generated readings
};

// =============================================================================
// UTOPIA NAME GENERATION
// =============================================================================

import { generateStarName } from "./star-names";

// Re-export for server-side use
export { generateStarName };

// Legacy export for backwards compatibility
export const SUGGESTED_UTOPIA_NAMES: Record<string, string> = {};

export function getSuggestedUtopiaName(_archetype: string): string {
  return generateStarName();
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

/**
 * Saves a user result to Redis with encryption of sensitive fields.
 *
 * Encrypted fields:
 * - email: User's email address (if present)
 * - answers: Quiz answers array (stored as encrypted JSON string)
 *
 * @param result - The user result to save
 */
export async function saveUserResult(result: UserResult): Promise<void> {
  // Encrypt sensitive fields before storing
  const encryptedResult = { ...result };

  // Encrypt email if present
  if (encryptedResult.email) {
    encryptedResult.email = await encrypt(encryptedResult.email);
  }

  // Encrypt answers array
  encryptedResult.answers = await encrypt(JSON.stringify(encryptedResult.answers));

  // Set with 90-day TTL to ensure persistence (90 days = 7,776,000 seconds)
  await redis.set(`user:${result.id}`, JSON.stringify(encryptedResult), 'EX', 7776000);
}

/**
 * Retrieves a user result from Redis with automatic decryption and lazy migration.
 *
 * Decrypts sensitive fields:
 * - email: If encrypted, decrypts to plaintext
 * - answers: If encrypted, decrypts JSON string and parses to array
 *
 * Lazy migration:
 * - If unencrypted data is detected, automatically re-saves with encryption
 * - Ensures gradual migration from legacy unencrypted data
 *
 * @param userId - The user ID to retrieve
 * @returns The user result with decrypted data, or null if not found
 */
export async function getUserResult(userId: string): Promise<UserResult | null> {
  const data = await redis.get(`user:${userId}`);
  if (data) {
    const parsed = JSON.parse(data);
    let needsMigration = false;

    // Decrypt email if present and encrypted
    if (parsed.email && typeof parsed.email === 'string') {
      if (isEncrypted(parsed.email)) {
        parsed.email = await decrypt(parsed.email);
      } else {
        // Unencrypted data detected - mark for migration
        needsMigration = true;
      }
    }

    // Decrypt answers if encrypted, or detect if migration needed
    if (parsed.answers) {
      if (typeof parsed.answers === 'string' && isEncrypted(parsed.answers)) {
        // Encrypted answers (stored as JSON string)
        const decryptedAnswers = await decrypt(parsed.answers);
        parsed.answers = JSON.parse(decryptedAnswers);
      } else if (Array.isArray(parsed.answers)) {
        // Unencrypted answers - mark for migration
        needsMigration = true;
      }
    }

    // Lazy migration: re-save with encryption if unencrypted data was detected
    if (needsMigration) {
      await saveUserResult(parsed);
    }

    return parsed;
  }

  // Fallback: Try to reconstruct user from utopias they're a member of
  const utopiaKeys = await redis.keys('utopia:*');
  for (const key of utopiaKeys) {
    const utopiaData = await redis.get(key);
    if (!utopiaData) continue;

    try {
      const utopia = JSON.parse(utopiaData);
      const member = utopia.members?.find((m: any) => m.id === userId);
      if (member && member.archetype && member.answers) {
        // Reconstruct user from utopia member data
        const reconstructed: UserResult = {
          id: userId,
          name: member.name || 'Anonymous',
          archetype: member.archetype,
          secondaryArchetype: member.secondaryArchetype || '',
          scores: member.scores || {},
          answers: member.answers,
          email: member.email || '',
          slug: member.slug || '',
          createdAt: member.joinedAt || new Date().toISOString(),
        };
        // Save it back to Redis for future use (with encryption)
        await saveUserResult(reconstructed);
        return reconstructed;
      }
    } catch (e) {
      continue;
    }
  }

  return null;
}

export async function getUserBySlug(slug: string): Promise<UserResult | null> {
  const userId = await redis.get(`slug:${slug.toLowerCase()}`);
  if (!userId) return null;
  return getUserResult(userId);
}

export async function generateUserSlug(userId: string, name: string): Promise<string> {
  // Create slug from name (lowercase, replace spaces with hyphens)
  let baseSlug = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-') // spaces to hyphens
    .replace(/-+/g, '-') // collapse multiple hyphens
    .slice(0, 20); // limit length

  if (!baseSlug) {
    baseSlug = 'user';
  }

  // Check if slug exists, add suffix if needed
  let slug = baseSlug;
  let suffix = 1;
  while (await redis.exists(`slug:${slug}`)) {
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }

  // Save slug -> userId mapping with 90-day TTL
  await redis.set(`slug:${slug}`, userId, 'EX', 7776000);

  // Update user with slug
  const user = await getUserResult(userId);
  if (user) {
    user.slug = slug;
    await saveUserResult(user);
  }

  return slug;
}

export async function updateUserEmail(userId: string, email: string | null): Promise<void> {
  const existing = await getUserResult(userId);
  if (!existing) return;

  const updated: UserResult = {
    ...existing,
    email,
  };

  await saveUserResult(updated);
}

export async function updateUserName(userId: string, name: string): Promise<void> {
  const existing = await getUserResult(userId);
  if (!existing) return;

  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error('Name cannot be empty');
  }

  const updated: UserResult = {
    ...existing,
    name: trimmedName,
  };

  await saveUserResult(updated);

  // Update name in all utopias this user belongs to
  const utopias = await getUserUtopias(userId);
  for (const utopia of utopias) {
    const memberIndex = utopia.members.findIndex(m => m.id === userId);
    if (memberIndex !== -1) {
      utopia.members[memberIndex].name = trimmedName;
      await redis.set(`utopia:${utopia.slug}`, JSON.stringify(utopia));
    }
  }
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
  customName?: string,
  userAnswers?: string[]
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
      answers: userAnswers,
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
  userArchetype: string,
  userAnswers?: string[]
): Promise<UtopiaRoom | null> {
  const utopia = await getUtopia(slug);
  if (!utopia) {
    console.log('[joinUtopia] Utopia not found:', slug);
    return null;
  }

  // Check if already a member
  const existingMember = utopia.members.find(m => m.id === userId);
  if (existingMember) {
    console.log('[joinUtopia] User already a member:', {
      userId,
      existingMember: { id: existingMember.id, name: existingMember.name },
      totalMembers: utopia.members.length
    });
    return utopia;
  }

  // Add member
  utopia.members.push({
    id: userId,
    name: userName,
    archetype: userArchetype,
    joinedAt: new Date().toISOString(),
    answers: userAnswers,
  });

  console.log('[joinUtopia] Added new member:', {
    userId,
    userName,
    userArchetype,
    totalMembers: utopia.members.length
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

# Connections Model Implementation Plan

> **For Claude:** Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Replace upfront utopia creation with personal compatibility links that accumulate connections, which can then be curated into groups.

**Architecture:** Personal links (`/meet/[name]`) let users share a single permanent URL. When someone takes the quiz via your link, a mutual connection is created. Users see 1:1 compatibility readings with each connection. Groups are curated from connections later (Phase 3).

**Tech Stack:** Next.js 16, React, Redis (existing), TypeScript

---

## Phase 1: Personal Links + Connections (This Plan)

### Task 1: Create Connections Library

**Files:**
- Create: `src/lib/connections.ts`

**Implementation:**

```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

// =============================================================================
// TYPES
// =============================================================================

export type Connection = {
  id: string;
  userAId: string;
  userBId: string;
  createdAt: string;
};

// =============================================================================
// CONNECTION FUNCTIONS
// =============================================================================

/**
 * Create a mutual connection between two users.
 * Connections are bidirectional - if A connects with B, B also connects with A.
 */
export async function createConnection(userAId: string, userBId: string): Promise<Connection> {
  // Normalize order to prevent duplicate connections (always store smaller ID first)
  const [first, second] = [userAId, userBId].sort();
  const connectionId = `${first}:${second}`;

  const existing = await redis.get(`connection:${connectionId}`);
  if (existing) {
    return JSON.parse(existing);
  }

  const connection: Connection = {
    id: connectionId,
    userAId: first,
    userBId: second,
    createdAt: new Date().toISOString(),
  };

  // Store connection
  await redis.set(`connection:${connectionId}`, JSON.stringify(connection));

  // Add to both users' connection lists
  await redis.sadd(`user:${first}:connections`, connectionId);
  await redis.sadd(`user:${second}:connections`, connectionId);

  return connection;
}

/**
 * Get all connections for a user
 */
export async function getUserConnections(userId: string): Promise<Connection[]> {
  const connectionIds = await redis.smembers(`user:${userId}:connections`);

  const connections: Connection[] = [];
  for (const id of connectionIds) {
    const data = await redis.get(`connection:${id}`);
    if (data) {
      connections.push(JSON.parse(data));
    }
  }

  // Sort by most recent first
  return connections.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Check if two users are connected
 */
export async function areConnected(userAId: string, userBId: string): Promise<boolean> {
  const [first, second] = [userAId, userBId].sort();
  const connectionId = `${first}:${second}`;
  const exists = await redis.exists(`connection:${connectionId}`);
  return exists === 1;
}

/**
 * Remove a connection (user removes someone from their connections)
 * Note: This is unilateral - removes from YOUR list only
 */
export async function removeConnection(userId: string, connectionId: string): Promise<void> {
  await redis.srem(`user:${userId}:connections`, connectionId);
  // Note: We don't delete the connection itself or remove from other user's list
  // The other person can still see them in their connections
}

/**
 * Get the other user ID from a connection
 */
export function getOtherUserId(connection: Connection, currentUserId: string): string {
  return connection.userAId === currentUserId ? connection.userBId : connection.userAId;
}
```

**Verification:**
```bash
npm run build
```
Expected: Build passes with no TypeScript errors

**Commit:**
```bash
git add src/lib/connections.ts
git commit -m "feat: add connections library with Redis storage"
```

---

### Task 2: Add User Slug Support

**Files:**
- Modify: `src/lib/utopia.ts`

**Context:** Users need a friendly slug for their personal link (`/meet/lou` instead of `/meet/abc123-uuid`). Add slug generation and lookup functions.

**Changes to add after the existing types:**

```typescript
// Add to types section
export type UserResult = {
  id: string;
  name: string;
  email: string | null;
  archetype: string;
  secondaryArchetype: string;
  scores: Record<string, number>;
  answers: string[];
  createdAt: string;
  slug?: string; // NEW: friendly URL slug
};

// Add new function after getUserResult
export async function getUserBySlug(slug: string): Promise<UserResult | null> {
  const userId = await redis.get(`slug:${slug.toLowerCase()}`);
  if (!userId) return null;
  return getUserResult(userId);
}

// Add new function to generate and save slug
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

  // Save slug -> userId mapping
  await redis.set(`slug:${slug}`, userId);

  // Update user with slug
  const user = await getUserResult(userId);
  if (user) {
    user.slug = slug;
    await saveUserResult(user);
  }

  return slug;
}
```

**Verification:**
```bash
npm run build
```
Expected: Build passes

**Commit:**
```bash
git add src/lib/utopia.ts
git commit -m "feat: add user slug support for friendly URLs"
```

---

### Task 3: Create Meet Page Route

**Files:**
- Create: `src/app/meet/[slug]/page.tsx`
- Create: `src/app/meet/[slug]/MeetPageClient.tsx`
- Create: `src/app/meet/[slug]/MeetPageClient.module.css`

**page.tsx:**

```typescript
import type { Metadata } from "next";
import { getUserBySlug } from "@/lib/utopia";
import { MeetPageClient } from "./MeetPageClient";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUserBySlug(slug);

  if (!user) {
    return { title: "User Not Found" };
  }

  return {
    title: `See your compatibility with ${user.name} | Live Now Club`,
    description: `Take the worldview quiz to see how compatible you are with ${user.name}`,
    openGraph: {
      title: `See your compatibility with ${user.name}`,
      description: `Take the worldview quiz to see how compatible you are with ${user.name}`,
    },
  };
}

export default async function MeetPage({ params }: Props) {
  const { slug } = await params;
  const user = await getUserBySlug(slug);

  if (!user) {
    notFound();
  }

  return (
    <MeetPageClient
      targetUser={{
        id: user.id,
        name: user.name,
        slug: user.slug || slug,
      }}
    />
  );
}
```

**MeetPageClient.tsx:**

```typescript
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./MeetPageClient.module.css";

type TargetUser = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  targetUser: TargetUser;
};

export function MeetPageClient({ targetUser }: Props) {
  const router = useRouter();
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already completed quiz
    const storedUserId = localStorage.getItem("userId");
    const storedAnswers = localStorage.getItem("quizAnswers");

    if (storedUserId && storedAnswers) {
      setHasCompletedQuiz(true);
      setCurrentUserId(storedUserId);
    }
  }, []);

  const handleStartQuiz = () => {
    // Store target user ID for connection creation after quiz
    localStorage.setItem("connectWith", targetUser.id);
    router.push("/wonder");
  };

  const handleSeeCompatibility = () => {
    // Go directly to compatibility view
    router.push(`/wonder/essay/quiz/result?compare=${targetUser.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.label}>Compatibility Check</p>
        <h1 className={styles.title}>
          See how compatible you are with{" "}
          <span className={styles.name}>{targetUser.name}</span>
        </h1>

        {hasCompletedQuiz ? (
          <>
            <p className={styles.subtitle}>
              You've already taken the quiz. See your compatibility now.
            </p>
            <button className={styles.primaryButton} onClick={handleSeeCompatibility}>
              See Compatibility
            </button>
          </>
        ) : (
          <>
            <p className={styles.subtitle}>
              Answer 7 questions to discover your worldview and see how it compares.
            </p>
            <button className={styles.primaryButton} onClick={handleStartQuiz}>
              Take the Quiz
            </button>
            <p className={styles.time}>Takes about 3 minutes</p>
          </>
        )}
      </div>
    </div>
  );
}
```

**MeetPageClient.module.css:**

```css
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #fdf8f3 0%, #fff9f5 100%);
}

.card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #e8178a;
  margin-bottom: 16px;
}

.title {
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1.3;
  color: #2d2a26;
  margin-bottom: 16px;
}

.name {
  color: #e8178a;
}

.subtitle {
  font-size: 1rem;
  color: rgba(45, 42, 38, 0.7);
  line-height: 1.6;
  margin-bottom: 32px;
}

.primaryButton {
  background: #e8178a;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 48px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primaryButton:hover {
  background: #d01579;
  transform: translateY(-1px);
}

.time {
  margin-top: 16px;
  font-size: 0.85rem;
  color: rgba(45, 42, 38, 0.5);
}
```

**Verification:**
```bash
npm run build
```
Expected: Build passes

**Commit:**
```bash
git add src/app/meet/
git commit -m "feat: add /meet/[slug] page for compatibility links"
```

---

### Task 4: Create Connection on Quiz Completion

**Files:**
- Create: `src/app/api/connections/create/route.ts`
- Modify: `src/app/wonder/essay/quiz/result/ReadingPage.tsx` (add connection creation effect)

**route.ts:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '@/lib/connections';
import { getUserResult } from '@/lib/utopia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, connectWithUserId } = body;

    if (!userId || !connectWithUserId) {
      return NextResponse.json(
        { error: 'Missing userId or connectWithUserId' },
        { status: 400 }
      );
    }

    // Verify both users exist
    const userA = await getUserResult(userId);
    const userB = await getUserResult(connectWithUserId);

    if (!userA || !userB) {
      return NextResponse.json(
        { error: 'One or both users not found' },
        { status: 404 }
      );
    }

    // Create mutual connection
    const connection = await createConnection(userId, connectWithUserId);

    return NextResponse.json({
      success: true,
      connection,
    });
  } catch (error) {
    console.error('Error creating connection:', error);
    return NextResponse.json(
      { error: 'Failed to create connection' },
      { status: 500 }
    );
  }
}
```

**ReadingPage.tsx changes:**

Add this effect near the top of the component (after the existing useEffects):

```typescript
// Create connection if came from someone's link
useEffect(() => {
  const connectWith = localStorage.getItem("connectWith");
  const userId = localStorage.getItem("userId");

  if (connectWith && userId && connectWith !== userId) {
    fetch('/api/connections/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        connectWithUserId: connectWith,
      }),
    }).then(() => {
      localStorage.removeItem("connectWith");
    }).catch(console.error);
  }
}, []);
```

**Verification:**
```bash
npm run build
```
Expected: Build passes

**Commit:**
```bash
git add src/app/api/connections/create/route.ts
git add src/app/wonder/essay/quiz/result/ReadingPage.tsx
git commit -m "feat: create connection when user completes quiz from someone's link"
```

---

### Task 5: Create Your World Page (`/me`)

**Files:**
- Create: `src/app/me/page.tsx`
- Create: `src/app/me/MePageClient.tsx`
- Create: `src/app/me/MePageClient.module.css`

**page.tsx:**

```typescript
import type { Metadata } from "next";
import { MePageClient } from "./MePageClient";

export const metadata: Metadata = {
  title: "Your World | Live Now Club",
  description: "Your connections and groups",
};

export default function MePage() {
  return <MePageClient />;
}
```

**MePageClient.tsx:**

```typescript
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./MePageClient.module.css";
import type { UserResult } from "@/lib/utopia";
import type { Connection } from "@/lib/connections";
import { arrayToQuizAnswers, calculateDimensions } from "@/lib/dimensions";
import { getIdentityFromDimensions, getAdjectiveIndex } from "@/lib/identities";

type ConnectionWithUser = Connection & {
  otherUser: UserResult;
};

export function MePageClient() {
  const router = useRouter();
  const [user, setUser] = useState<UserResult | null>(null);
  const [connections, setConnections] = useState<ConnectionWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/wonder");
      return;
    }

    // Fetch user data and connections
    Promise.all([
      fetch(`/api/utopia/user/${userId}`).then(r => r.json()),
      fetch(`/api/connections/list?userId=${userId}`).then(r => r.json()),
    ]).then(([userData, connectionsData]) => {
      if (userData.user) {
        setUser(userData.user);
      }
      if (connectionsData.connections) {
        setConnections(connectionsData.connections);
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, [router]);

  const handleCopyLink = () => {
    if (!user?.slug) return;
    const link = `${window.location.origin}/meet/${user.slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!user?.slug) return;
    const link = `${window.location.origin}/meet/${user.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "See your compatibility with me",
          text: "Take the worldview quiz and see how compatible we are!",
          url: link,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      handleCopyLink();
    }
  };

  // Get identity from user answers
  const getIdentity = (answers: string[]) => {
    const quizAnswers = arrayToQuizAnswers(answers);
    if (!quizAnswers) return null;
    const dims = calculateDimensions(quizAnswers);
    const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
    return getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const identity = user.answers ? getIdentity(user.answers) : null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Identity Section */}
        <section className={styles.identitySection}>
          <p className={styles.label}>Your World</p>
          <h1 className={styles.identityName} style={{ color: identity?.color }}>
            {identity?.name || "Unknown"}
          </h1>
          <div className={styles.shareButtons}>
            <button className={styles.copyButton} onClick={handleCopyLink}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button className={styles.shareButton} onClick={handleShare}>
              Share
            </button>
          </div>
        </section>

        {/* Connections Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Your Connections {connections.length > 0 && `(${connections.length})`}
            </h2>
            {connections.length > 5 && (
              <Link href="/me/connections" className={styles.seeAll}>
                See all →
              </Link>
            )}
          </div>

          {connections.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Share your link to start connecting with others.</p>
            </div>
          ) : (
            <div className={styles.connectionsList}>
              {connections.slice(0, 5).map((conn) => {
                const connIdentity = conn.otherUser.answers
                  ? getIdentity(conn.otherUser.answers)
                  : null;
                return (
                  <Link
                    key={conn.id}
                    href={`/wonder/essay/quiz/result?compare=${conn.otherUser.id}`}
                    className={styles.connectionCard}
                  >
                    <span className={styles.connectionName}>
                      {conn.otherUser.name}
                    </span>
                    <span
                      className={styles.connectionIdentity}
                      style={{ color: connIdentity?.color }}
                    >
                      {connIdentity?.name || "Unknown"}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Groups Section - Placeholder for Phase 3 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Groups (0)</h2>
          </div>
          <div className={styles.emptyState}>
            <p>Groups coming soon! Create groups from your connections.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
```

**MePageClient.module.css:**

```css
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf8f3 0%, #fff9f5 100%);
  padding: 24px;
}

.content {
  max-width: 600px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 48px;
  color: rgba(45, 42, 38, 0.6);
}

/* Identity Section */
.identitySection {
  background: white;
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  margin-bottom: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #e8178a;
  margin-bottom: 8px;
}

.identityName {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 24px;
}

.shareButtons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.copyButton,
.shareButton {
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copyButton {
  background: rgba(45, 42, 38, 0.06);
  border: none;
  color: #2d2a26;
}

.copyButton:hover {
  background: rgba(45, 42, 38, 0.1);
}

.shareButton {
  background: #e8178a;
  border: none;
  color: white;
}

.shareButton:hover {
  background: #d01579;
}

/* Sections */
.section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.sectionHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.sectionTitle {
  font-size: 1rem;
  font-weight: 500;
  color: #2d2a26;
}

.seeAll {
  font-size: 0.85rem;
  color: #e8178a;
  text-decoration: none;
}

.seeAll:hover {
  text-decoration: underline;
}

.emptyState {
  padding: 24px;
  text-align: center;
  color: rgba(45, 42, 38, 0.6);
  font-size: 0.95rem;
}

/* Connections List */
.connectionsList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.connectionCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(45, 42, 38, 0.03);
  border-radius: 12px;
  text-decoration: none;
  transition: background 0.2s ease;
}

.connectionCard:hover {
  background: rgba(45, 42, 38, 0.06);
}

.connectionName {
  font-size: 0.95rem;
  color: #2d2a26;
  font-weight: 500;
}

.connectionIdentity {
  font-size: 0.85rem;
  font-weight: 500;
}
```

**Verification:**
```bash
npm run build
```
Expected: Build passes

**Commit:**
```bash
git add src/app/me/
git commit -m "feat: add /me page (Your World) with connections display"
```

---

### Task 6: Create Connections List API

**Files:**
- Create: `src/app/api/connections/list/route.ts`

**Implementation:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getUserConnections, getOtherUserId } from '@/lib/connections';
import { getUserResult } from '@/lib/utopia';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const connections = await getUserConnections(userId);

    // Enrich with other user data
    const enrichedConnections = await Promise.all(
      connections.map(async (conn) => {
        const otherUserId = getOtherUserId(conn, userId);
        const otherUser = await getUserResult(otherUserId);
        return {
          ...conn,
          otherUser: otherUser || { id: otherUserId, name: 'Unknown' },
        };
      })
    );

    return NextResponse.json({
      success: true,
      connections: enrichedConnections,
    });
  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}
```

**Verification:**
```bash
npm run build
```
Expected: Build passes

**Commit:**
```bash
git add src/app/api/connections/list/route.ts
git commit -m "feat: add connections list API endpoint"
```

---

### Task 7: Generate User Slug on Quiz Completion

**Files:**
- Modify: `src/app/api/utopia/save-result/route.ts`

**Changes:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { saveUserResult, generateUserSlug, type UserResult } from '@/lib/utopia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result: UserResult = body.result;

    if (!result || !result.id || !result.name || !result.archetype) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug if not present
    if (!result.slug) {
      result.slug = await generateUserSlug(result.id, result.name);
    }

    await saveUserResult(result);

    return NextResponse.json({
      success: true,
      slug: result.slug,
    });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json(
      { error: 'Failed to save result' },
      { status: 500 }
    );
  }
}
```

**Verification:**
```bash
npm run build
```
Expected: Build passes

**Commit:**
```bash
git add src/app/api/utopia/save-result/route.ts
git commit -m "feat: generate user slug when saving quiz result"
```

---

### Task 8: Update Result Page with Personal Link

**Files:**
- Modify: `src/app/wonder/essay/quiz/result/ReadingPage.tsx`

**Context:** After quiz completion, show the user's personal link prominently so they can share it.

**Changes to add in the component:**

1. Add state for user slug:
```typescript
const [userSlug, setUserSlug] = useState<string | null>(null);
const [linkCopied, setLinkCopied] = useState(false);
```

2. Update the effect that saves the result to capture the slug:
```typescript
// In the saveResultToServer function or effect, capture the slug from response
.then(data => {
  if (data.slug) {
    setUserSlug(data.slug);
    localStorage.setItem('userSlug', data.slug);
  }
})
```

3. Add a share section after the identity reveal:
```typescript
{userSlug && !isViewingOther && (
  <div className={styles.shareSection}>
    <p className={styles.shareLabel}>Share your link</p>
    <div className={styles.linkBox}>
      <span className={styles.linkText}>
        livenowclub.vercel.app/meet/{userSlug}
      </span>
      <button
        className={styles.copyLinkButton}
        onClick={() => {
          navigator.clipboard.writeText(`https://livenowclub.vercel.app/meet/${userSlug}`);
          setLinkCopied(true);
          setTimeout(() => setLinkCopied(false), 2000);
        }}
      >
        {linkCopied ? "Copied!" : "Copy"}
      </button>
    </div>
    <p className={styles.shareHint}>
      Send to friends to see your compatibility
    </p>
  </div>
)}
```

4. Add corresponding CSS to ReadingPage.module.css:
```css
/* Share Section */
.shareSection {
  margin: 32px 0;
  padding: 24px;
  background: rgba(232, 23, 138, 0.04);
  border-radius: 16px;
  text-align: center;
}

.shareLabel {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #e8178a;
  margin-bottom: 12px;
}

.linkBox {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.linkText {
  font-size: 0.9rem;
  color: #2d2a26;
  font-family: monospace;
}

.copyLinkButton {
  background: #e8178a;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.copyLinkButton:hover {
  background: #d01579;
}

.shareHint {
  font-size: 0.85rem;
  color: rgba(45, 42, 38, 0.6);
}
```

**Verification:**
```bash
npm run build
```
Expected: Build passes

**Commit:**
```bash
git add src/app/wonder/essay/quiz/result/ReadingPage.tsx
git add src/app/wonder/essay/quiz/result/ReadingPage.module.css
git commit -m "feat: show personal link on result page for sharing"
```

---

### Task 9: Add Navigation Link to /me

**Files:**
- Modify: `src/app/wonder/essay/quiz/result/ReadingPage.tsx`

**Context:** Add a link to "Your World" from the result page so users can navigate to their connections.

**Changes:**

Add after the share section or in a prominent location:

```typescript
{!isViewingOther && (
  <Link href="/me" className={styles.yourWorldLink}>
    Go to Your World →
  </Link>
)}
```

Add CSS:
```css
.yourWorldLink {
  display: inline-block;
  margin-top: 24px;
  color: #e8178a;
  font-size: 0.95rem;
  text-decoration: none;
  font-weight: 500;
}

.yourWorldLink:hover {
  text-decoration: underline;
}
```

**Verification:**
```bash
npm run build
```
Expected: Build passes

**Commit:**
```bash
git add src/app/wonder/essay/quiz/result/ReadingPage.tsx
git add src/app/wonder/essay/quiz/result/ReadingPage.module.css
git commit -m "feat: add navigation link to Your World from result page"
```

---

### Task 10: Final Integration Test

**Manual Testing Checklist:**

1. Start dev server: `npm run dev`

2. Test Flow 1 - New User:
   - Go to `/wonder`
   - Complete quiz
   - Verify identity shows with personal link
   - Copy link and verify it's in format `/meet/[name]`
   - Click "Go to Your World" and verify `/me` shows empty connections

3. Test Flow 2 - Connection from Link:
   - Open incognito window
   - Go to the copied link `/meet/[slug]`
   - Verify page shows "See your compatibility with [Name]"
   - Complete quiz
   - Verify connection is created
   - Go to `/me` and verify connection shows

4. Test Flow 3 - Return to /me:
   - Original user window
   - Go to `/me`
   - Verify new connection appears
   - Click connection to see compatibility reading

**Verification:**
```bash
npm run build
npm run dev
# Manual testing per checklist above
```

**Commit:**
```bash
git add -A
git commit -m "feat: complete connections model Phase 1 implementation"
```

---

## Verification Checklist

- [ ] Build passes with no TypeScript errors
- [ ] `/meet/[slug]` shows compatibility invite page
- [ ] Quiz completion creates user with slug
- [ ] Connection created when completing quiz from someone's link
- [ ] `/me` shows identity and connections list
- [ ] Personal link shown on result page
- [ ] Clicking connection shows 1:1 compatibility reading

---

## Future Phases (Not This Plan)

**Phase 2: Email Persistence**
- Save email prompt
- Magic link generation/sending
- Magic link auth flow
- Persist user across devices

**Phase 3: Groups**
- Group creation from connections
- Group view with dynamics
- Group list

**Phase 4: Polish**
- Share buttons (native share sheet)
- Notifications (email)
- Connection removal
- Group leaving

# 1:1 Comparison Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enable users to see dimension-based relationship comparisons when viewing quiz results with a `compare` parameter.

**Architecture:** Extend the existing `/wonder/essay/quiz/result` page to detect `compare=[userId]` parameter, fetch both users' data, display side-by-side dimension spectrums, and generate a narrative reading based on dimension differences using non-judgmental language.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Redis (via existing utopia.ts), React client components

---

## Task 1: Create Comparison Reading Generator

**Files:**
- Create: `src/lib/comparison-reading.ts`

**Step 1: Create the comparison reading generator**

Create the file with dimension-based narrative generation:

```typescript
import type { Dimensions } from './dimensions';

export type ComparisonReading = {
  intro: string;
  narrative: string;
};

type DimensionAnalysis = {
  userOrientation: string;
  otherOrientation: string;
  dynamic: string;
};

/**
 * Analyze agency difference between two people
 */
function analyzeAgency(userAgency: number, otherAgency: number, userName: string, otherName: string): DimensionAnalysis {
  const diff = Math.abs(userAgency - otherAgency);

  // Determine orientations
  const userOrientation = userAgency > 0.3
    ? "oriented toward building"
    : userAgency < -0.3
    ? "oriented toward witnessing"
    : "balanced between building and witnessing";

  const otherOrientation = otherAgency > 0.3
    ? "oriented toward building"
    : otherAgency < -0.3
    ? "oriented toward witnessing"
    : "balanced between building and witnessing";

  // Generate dynamic description
  let dynamic = "";
  if (diff < 0.3) {
    dynamic = `You're both similarly oriented—${userOrientation}. This creates natural alignment in how you engage with the world.`;
  } else if (userAgency > otherAgency) {
    dynamic = `${userName} is ${userOrientation}. ${otherName} is ${otherOrientation}. ${userName} architects and initiates while ${otherName} observes and appreciates what emerges.`;
  } else {
    dynamic = `${otherName} is ${otherOrientation}. ${userName} is ${userOrientation}. ${otherName} architects and initiates while ${userName} observes and appreciates what emerges.`;
  }

  return { userOrientation, otherOrientation, dynamic };
}

/**
 * Analyze certainty difference between two people
 */
function analyzeCertainty(userCertainty: number, otherCertainty: number, userName: string, otherName: string): DimensionAnalysis {
  const diff = Math.abs(userCertainty - otherCertainty);

  // Determine orientations
  const userOrientation = userCertainty > 0.3
    ? "settled in answers"
    : userCertainty < -0.3
    ? "living in questions"
    : "balanced between seeking and settling";

  const otherOrientation = otherCertainty > 0.3
    ? "settled in answers"
    : otherCertainty < -0.3
    ? "living in questions"
    : "balanced between seeking and settling";

  // Generate dynamic description
  let dynamic = "";
  if (diff < 0.3) {
    dynamic = `You're both ${userOrientation}. This shared orientation creates alignment in how you approach certainty.`;
  } else if (userCertainty > otherCertainty) {
    dynamic = `${userName} is ${userOrientation} while ${otherName} is ${otherOrientation}. ${userName} has made peace with convictions while ${otherName} keeps questioning. This is where you'll create friction—what ${userName} considers resolved, ${otherName} wants to explore.`;
  } else {
    dynamic = `${otherName} is ${otherOrientation} while ${userName} is ${userOrientation}. ${otherName} has made peace with convictions while ${userName} keeps questioning. This is where you'll create friction—what ${otherName} considers resolved, ${userName} wants to explore.`;
  }

  return { userOrientation, otherOrientation, dynamic };
}

/**
 * Analyze posture difference between two people
 */
function analyzePosture(userPosture: number, otherPosture: number, userName: string, otherName: string): DimensionAnalysis {
  const diff = Math.abs(userPosture - otherPosture);

  // Determine orientations
  const userOrientation = userPosture > 0.3
    ? "expansive"
    : userPosture < -0.3
    ? "protective"
    : "balanced between expansion and protection";

  const otherOrientation = otherPosture > 0.3
    ? "expansive"
    : otherPosture < -0.3
    ? "protective"
    : "balanced between expansion and protection";

  // Generate dynamic description
  let dynamic = "";
  if (diff < 0.3) {
    dynamic = `You're both ${userOrientation}. This shared posture creates natural agreement about risk and growth.`;
  } else if (userPosture > otherPosture) {
    dynamic = `${userName} is ${userOrientation}—pushing boundaries, growing outward, exploring new territory. ${otherName} is ${otherOrientation}—guarding what matters, maintaining what works, building walls around what's valuable. ${userName} wants to expand what ${otherName} wants to preserve.`;
  } else {
    dynamic = `${otherName} is ${otherOrientation}—pushing boundaries, growing outward, exploring new territory. ${userName} is ${userOrientation}—guarding what matters, maintaining what works, building walls around what's valuable. ${otherName} wants to expand what ${userName} wants to preserve.`;
  }

  return { userOrientation, otherOrientation, dynamic };
}

/**
 * Generate synthesis of what the relationship creates
 */
function generateSynthesis(
  userDims: Dimensions,
  otherDims: Dimensions,
  userName: string,
  otherName: string,
  agencyAnalysis: DimensionAnalysis,
  certaintyAnalysis: DimensionAnalysis,
  postureAnalysis: DimensionAnalysis
): string {
  const agencyDiff = Math.abs(userDims.agency - otherDims.agency);
  const certaintyDiff = Math.abs(userDims.certainty - otherDims.certainty);
  const postureDiff = Math.abs(userDims.posture - otherDims.posture);

  // Find biggest difference
  const maxDiff = Math.max(agencyDiff, certaintyDiff, postureDiff);

  let synthesis = "\n\n";

  if (maxDiff < 0.4) {
    synthesis += `You and ${otherName} are remarkably aligned across all three dimensions. This creates natural harmony—you'll tend to see the world similarly, value similar things, and move in similar directions. `;
    synthesis += `The ease between you is real, but watch that you don't miss what the other orientation could offer. Sometimes friction creates growth.`;
  } else {
    synthesis += `Your differences are real: `;

    const tensions = [];
    if (agencyDiff > 0.4) tensions.push("one builds while the other witnesses");
    if (certaintyDiff > 0.4) tensions.push("one settles while the other seeks");
    if (postureDiff > 0.4) tensions.push("one expands while the other protects");

    synthesis += tensions.join(", ") + ". ";

    synthesis += `This creates genuine friction. What one considers finished, the other wants to question. Where one wants to move, the other wants to stay. `;
    synthesis += `But that's also your creative potential—you need each other's orientation. The tension is the generative force.`;
  }

  return synthesis;
}

/**
 * Generate a comparison reading from two sets of dimensions
 */
export function generateComparisonReading(
  userDims: Dimensions,
  otherDims: Dimensions,
  userIdentity: { name: string },
  otherIdentity: { name: string },
  userName: string,
  otherName: string
): ComparisonReading {
  const agencyAnalysis = analyzeAgency(userDims.agency, otherDims.agency, userName, otherName);
  const certaintyAnalysis = analyzeCertainty(userDims.certainty, otherDims.certainty, userName, otherName);
  const postureAnalysis = analyzePosture(userDims.posture, otherDims.posture, userName, otherName);

  const intro = `You're a ${userIdentity.name}. ${otherName} is a ${otherIdentity.name}.`;

  let narrative = "";

  // Add dimension analyses
  narrative += agencyAnalysis.dynamic + "\n\n";
  narrative += certaintyAnalysis.dynamic + "\n\n";
  narrative += postureAnalysis.dynamic;

  // Add synthesis
  narrative += generateSynthesis(
    userDims,
    otherDims,
    userName,
    otherName,
    agencyAnalysis,
    certaintyAnalysis,
    postureAnalysis
  );

  return { intro, narrative };
}
```

**Step 2: Commit**

```bash
git add src/lib/comparison-reading.ts
git commit -m "feat: add dimension-based comparison reading generator"
```

---

## Task 2: Create Dual Dimension Spectrum Component

**Files:**
- Create: `src/app/wonder/essay/quiz/result/ComparisonSpectrum.tsx`
- Create: `src/app/wonder/essay/quiz/result/ComparisonSpectrum.module.css`

**Step 1: Create the comparison spectrum component**

```typescript
"use client";

import styles from "./ComparisonSpectrum.module.css";
import type { Dimensions } from "@/lib/dimensions";

type ComparisonSpectrumProps = {
  userDimensions: Dimensions;
  otherDimensions: Dimensions;
  userName: string;
  otherName: string;
};

export function ComparisonSpectrum({
  userDimensions,
  otherDimensions,
  userName,
  otherName,
}: ComparisonSpectrumProps) {
  // Convert -1 to 1 range to 0 to 100 percentage
  const toPercent = (value: number) => ((value + 1) / 2) * 100;

  const spectrums = [
    {
      name: "Agency",
      lowLabel: "Witness",
      highLabel: "Architect",
      userValue: userDimensions.agency,
      otherValue: otherDimensions.agency,
      userPercent: toPercent(userDimensions.agency),
      otherPercent: toPercent(otherDimensions.agency),
    },
    {
      name: "Certainty",
      lowLabel: "Seeking",
      highLabel: "Settled",
      userValue: userDimensions.certainty,
      otherValue: otherDimensions.certainty,
      userPercent: toPercent(userDimensions.certainty),
      otherPercent: toPercent(otherDimensions.certainty),
    },
    {
      name: "Posture",
      lowLabel: "Protective",
      highLabel: "Expansive",
      userValue: userDimensions.posture,
      otherValue: otherDimensions.posture,
      userPercent: toPercent(userDimensions.posture),
      otherPercent: toPercent(otherDimensions.posture),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendMarker} ${styles.userMarker}`} />
            <span>{userName}</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendMarker} ${styles.otherMarker}`} />
            <span>{otherName}</span>
          </div>
        </div>
      </div>

      {spectrums.map((spectrum) => (
        <div key={spectrum.name} className={styles.spectrum}>
          <div className={styles.labels}>
            <span className={styles.lowLabel}>{spectrum.lowLabel}</span>
            <span className={styles.dimensionName}>{spectrum.name}</span>
            <span className={styles.highLabel}>{spectrum.highLabel}</span>
          </div>
          <div className={styles.track}>
            <div
              className={`${styles.marker} ${styles.userMarker}`}
              style={{ left: `${spectrum.userPercent}%` }}
              aria-label={`${userName}: ${spectrum.userValue.toFixed(2)}`}
            />
            <div
              className={`${styles.marker} ${styles.otherMarker}`}
              style={{ left: `${spectrum.otherPercent}%` }}
              aria-label={`${otherName}: ${spectrum.otherValue.toFixed(2)}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Create the styles**

```css
.container {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 20px;
}

.header {
  margin-bottom: 32px;
}

.legend {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
}

.legendItem {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text);
}

.legendMarker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.userMarker {
  background: var(--accent-pink);
}

.otherMarker {
  background: #6366f1;
}

.spectrum {
  margin-bottom: 40px;
}

.labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--text-dim);
}

.lowLabel {
  flex: 1;
  text-align: left;
}

.dimensionName {
  flex: 1;
  text-align: center;
  font-weight: 500;
  color: var(--text);
}

.highLabel {
  flex: 1;
  text-align: right;
}

.track {
  position: relative;
  height: 4px;
  background: rgba(45, 42, 38, 0.1);
  border-radius: 2px;
}

.marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid var(--bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: default;
  transition: transform 0.2s ease;
}

.marker:hover {
  transform: translate(-50%, -50%) scale(1.2);
}
```

**Step 3: Commit**

```bash
git add src/app/wonder/essay/quiz/result/ComparisonSpectrum.tsx src/app/wonder/essay/quiz/result/ComparisonSpectrum.module.css
git commit -m "feat: add dual dimension spectrum visualization"
```

---

## Task 3: Create Comparison View Component

**Files:**
- Create: `src/app/wonder/essay/quiz/result/ComparisonView.tsx`
- Create: `src/app/wonder/essay/quiz/result/ComparisonView.module.css`

**Step 1: Create the comparison view component**

```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ComparisonSpectrum } from "./ComparisonSpectrum";
import { generateComparisonReading } from "@/lib/comparison-reading";
import { calculateDimensions, arrayToQuizAnswers, type Dimensions } from "@/lib/dimensions";
import {
  getIdentityFromDimensions,
  getAdjectiveIndex,
  type Identity,
} from "@/lib/identities";
import styles from "./ComparisonView.module.css";

type UserData = {
  id: string;
  name: string;
  answers: string[];
};

type ComparisonViewProps = {
  currentUserId: string;
  compareUserId: string;
  onViewFullResult?: () => void;
};

export function ComparisonView({
  currentUserId,
  compareUserId,
  onViewFullResult,
}: ComparisonViewProps) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [otherUser, setOtherUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);

        // Fetch both users in parallel
        const [currentResponse, otherResponse] = await Promise.all([
          fetch(`/api/utopia/user?userId=${currentUserId}`),
          fetch(`/api/utopia/user?userId=${compareUserId}`),
        ]);

        if (!currentResponse.ok || !otherResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const currentData = await currentResponse.json();
        const otherData = await otherResponse.json();

        if (!currentData.user || !otherData.user) {
          throw new Error("User data not found");
        }

        setCurrentUser(currentData.user);
        setOtherUser(otherData.user);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Could not load comparison. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [currentUserId, compareUserId]);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/wonder/essay/quiz/result?compare=${currentUserId}`;
    await navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading comparison...</div>
      </div>
    );
  }

  if (error || !currentUser || !otherUser) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error || "Could not load comparison"}
        </div>
      </div>
    );
  }

  // Calculate dimensions for both users
  const currentAnswers = arrayToQuizAnswers(currentUser.answers);
  const otherAnswers = arrayToQuizAnswers(otherUser.answers);

  const currentDims = calculateDimensions(currentAnswers);
  const otherDims = calculateDimensions(otherAnswers);

  // Get identities
  const currentAdjIndex = getAdjectiveIndex(currentDims.certainty, currentDims.posture);
  const otherAdjIndex = getAdjectiveIndex(otherDims.certainty, otherDims.posture);

  const currentIdentity = getIdentityFromDimensions(
    currentDims.agency,
    currentDims.certainty,
    currentDims.posture,
    currentAdjIndex
  );

  const otherIdentity = getIdentityFromDimensions(
    otherDims.agency,
    otherDims.certainty,
    otherDims.posture,
    otherAdjIndex
  );

  if (!currentIdentity || !otherIdentity) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Could not determine identities</div>
      </div>
    );
  }

  // Generate reading
  const reading = generateComparisonReading(
    currentDims,
    otherDims,
    currentIdentity,
    otherIdentity,
    "You",
    otherUser.name
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>You and {otherUser.name}</h1>
        <div className={styles.headerActions}>
          {onViewFullResult && (
            <button onClick={onViewFullResult} className={styles.linkButton}>
              See my full result
            </button>
          )}
          <Link
            href={`/wonder/essay/quiz/result?i=${otherIdentity.key}&n=${encodeURIComponent(otherUser.name)}`}
            className={styles.linkButton}
          >
            See their full result
          </Link>
        </div>
      </div>

      <ComparisonSpectrum
        userDimensions={currentDims}
        otherDimensions={otherDims}
        userName="You"
        otherName={otherUser.name}
      />

      <div className={styles.reading}>
        <p className={styles.intro}>{reading.intro}</p>
        <div className={styles.narrative}>
          {reading.narrative.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={handleCopyLink} className={styles.primaryButton}>
          {linkCopied ? "Link copied!" : "Compare with someone else"}
        </button>
        <Link href="/wonder/essay/quiz/my-utopias" className={styles.secondaryButton}>
          See all my comparisons
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Create the styles**

```css
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.header {
  text-align: center;
  margin-bottom: 48px;
}

.title {
  font-size: 32px;
  font-weight: 500;
  margin: 0 0 16px 0;
  color: var(--text);
}

.headerActions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.linkButton {
  font-size: 14px;
  color: var(--text-dim);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  transition: color 0.2s ease;
}

.linkButton:hover {
  color: var(--accent-pink);
}

.loading,
.error {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-dim);
  font-size: 16px;
}

.error {
  color: #dc2626;
}

.reading {
  max-width: 600px;
  margin: 48px auto;
  line-height: 1.7;
}

.intro {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 24px 0;
  color: var(--text);
}

.narrative {
  font-size: 16px;
  color: var(--text);
}

.narrative p {
  margin: 0 0 20px 0;
}

.narrative p:last-child {
  margin-bottom: 0;
}

.actions {
  max-width: 400px;
  margin: 64px auto 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.primaryButton {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background: var(--accent-pink);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: center;
}

.primaryButton:hover {
  background: #d1157a;
}

.secondaryButton {
  padding: 12px 32px;
  font-size: 14px;
  color: var(--text-dim);
  background: none;
  border: 1px solid rgba(45, 42, 38, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  text-decoration: none;
  display: block;
}

.secondaryButton:hover {
  border-color: var(--accent-pink);
  color: var(--accent-pink);
}
```

**Step 3: Commit**

```bash
git add src/app/wonder/essay/quiz/result/ComparisonView.tsx src/app/wonder/essay/quiz/result/ComparisonView.module.css
git commit -m "feat: add comparison view component"
```

---

## Task 4: Integrate Comparison into Result Page

**Files:**
- Modify: `src/app/wonder/essay/quiz/result/ReadingPage.tsx`

**Step 1: Update ReadingPage to show comparison when compareUserId is present**

Add import at top of file:

```typescript
import { ComparisonView } from "./ComparisonView";
```

Update the component to handle comparison view:

Find the return statement (around line 300+) and add comparison check before the main reading:

```typescript
// Around line 300, before the main return with reading display
// Add this after state declarations but before the return

// If comparison mode, show comparison view
if (effectiveCompareUserId && hasQuizUserId) {
  const userId = localStorage.getItem("quiz-user-id");
  if (userId) {
    return (
      <ComparisonView
        currentUserId={userId}
        compareUserId={effectiveCompareUserId}
        onViewFullResult={() => {
          // Clear compare param from URL
          const url = new URL(window.location.href);
          url.searchParams.delete('compare');
          window.history.pushState({}, '', url.toString());
          setEffectiveCompareUserId(undefined);
        }}
      />
    );
  }
}
```

**Step 2: Test the integration**

Manual test steps:
1. Navigate to `/wonder/essay/quiz/result?compare=[someUserId]`
2. Verify comparison view loads
3. Verify "See my full result" clears compare param
4. Verify "See their full result" navigates correctly
5. Verify "Compare with someone else" copies link

**Step 3: Commit**

```bash
git add src/app/wonder/essay/quiz/result/ReadingPage.tsx
git commit -m "feat: integrate comparison view into result page"
```

---

## Task 5: Add Auto-Scroll Behavior for Share Links

**Files:**
- Modify: `src/app/wonder/essay/quiz/result/ReadingPage.tsx`

**Step 1: Add scroll-to-comparison behavior**

Add this useEffect after the existing useEffects (around line 200):

```typescript
// Auto-scroll to comparison when coming from share link
useEffect(() => {
  if (effectiveCompareUserId && !isViewingOther) {
    // Small delay to ensure content is rendered
    const timer = setTimeout(() => {
      // Scroll to comparison section smoothly
      window.scrollTo({
        top: 400, // Approximate position after brief result summary
        behavior: 'smooth',
      });
    }, 500);

    return () => clearTimeout(timer);
  }
}, [effectiveCompareUserId, isViewingOther]);
```

**Step 2: Commit**

```bash
git add src/app/wonder/essay/quiz/result/ReadingPage.tsx
git commit -m "feat: add auto-scroll to comparison for share links"
```

---

## Task 6: Update API User Endpoint (If Needed)

**Files:**
- Check: `src/app/api/utopia/user/route.ts` exists and returns user data correctly

**Step 1: Verify API endpoint**

Check if `/api/utopia/user?userId=[id]` returns user with answers array.

If file doesn't exist, create it:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getUserResult } from '@/lib/utopia';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  try {
    const user = await getUserResult(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**Step 2: Test the endpoint**

```bash
# In development, test the endpoint
curl http://localhost:3000/api/utopia/user?userId=test-user-id
```

**Step 3: Commit if created**

```bash
git add src/app/api/utopia/user/route.ts
git commit -m "feat: add user API endpoint for comparisons"
```

---

## Task 7: Manual Testing & Refinement

**Step 1: Test complete flow**

1. Take quiz as User A
2. Copy share link
3. Open in incognito as User B
4. Complete quiz
5. Verify:
   - Brief result summary shows
   - Auto-scrolls to comparison
   - Dimension spectrums show both users correctly
   - Reading narrative is coherent and non-judgmental
   - "See my full result" works
   - "See their full result" works
   - "Compare with someone else" copies link
   - "See all my comparisons" navigates correctly

**Step 2: Test edge cases**

1. Invalid compare user ID → should show error
2. Compare with self → should handle gracefully
3. Missing quiz answers → should show error
4. Very similar dimensions → reading should note alignment
5. Very different dimensions → reading should note tension

**Step 3: Refine narrative generator**

Based on testing, adjust the narrative generation logic in `comparison-reading.ts`:
- Improve threshold values for "similar" vs "different"
- Refine language for edge cases
- Ensure all dimension combinations produce coherent readings

**Step 4: Commit refinements**

```bash
git add src/lib/comparison-reading.ts
git commit -m "refine: improve comparison narrative generation"
```

---

## Task 8: Documentation

**Step 1: Update README or docs**

Add section explaining the comparison feature:

```markdown
## 1:1 Comparison Feature

Users can compare their quiz results with others using the `compare` URL parameter.

### URL Format
```
/wonder/essay/quiz/result?compare=[otherUserId]
```

### Flow
1. User A shares quiz link
2. User B takes quiz
3. Result page loads with `compare=userA` param
4. Shows brief result summary
5. Auto-scrolls to comparison view
6. Displays side-by-side dimension spectrums
7. Shows dimension-based narrative reading

### Components
- `ComparisonView.tsx` - Main comparison container
- `ComparisonSpectrum.tsx` - Dual dimension visualization
- `comparison-reading.ts` - Narrative generation logic

### Generation Logic
Readings are generated from dimension scores using:
- Non-judgmental language (oriented toward X vs Y)
- Threshold-based similarity detection
- Dynamic narrative based on differences
- Synthesis of what the relationship creates
```

**Step 2: Commit documentation**

```bash
git add README.md  # or docs/features/comparison.md
git commit -m "docs: add 1:1 comparison feature documentation"
```

---

## Completion Checklist

- [ ] Comparison reading generator created (`comparison-reading.ts`)
- [ ] Dual dimension spectrum component created
- [ ] Comparison view component created with error handling
- [ ] Integration into ReadingPage complete
- [ ] Auto-scroll behavior implemented
- [ ] API endpoint verified/created
- [ ] Manual testing completed for happy path
- [ ] Edge cases tested and handled
- [ ] Narrative refinements based on testing
- [ ] Documentation updated
- [ ] All commits follow conventional commit format
- [ ] Feature working end-to-end

---

## Notes for Implementation

**DRY Principles:**
- Reuse existing `Dimensions` type and `calculateDimensions` function
- Reuse existing `Identity` system and color scheme
- Leverage existing API patterns (`/api/utopia/user`)

**YAGNI Principles:**
- No LLM generation for now (archetype system not needed)
- No group comparisons (only 1:1)
- No comparison history storage (just URL-based)
- No share image generation (can add later)

**Code Quality:**
- All components are typed with TypeScript
- Error states handled gracefully
- Loading states provide feedback
- Responsive design follows existing patterns
- Accessibility: ARIA labels on markers

**Performance:**
- Parallel API fetches for both users
- Client-side calculation of dimensions
- No unnecessary re-renders
- Cached reading generation (pure function)

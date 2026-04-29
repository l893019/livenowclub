# QA Plan: Worldview Quiz Feature

> Last updated: 2026-04-29

## Quick Test Checklist

### Smoke Test (5 min)
- [ ] `/wonder/essay` loads, quiz starts
- [ ] Complete quiz with 7 answers
- [ ] Result page shows identity name and content
- [ ] `/meet/lou` loads with correct identity
- [ ] Share link copies to clipboard

---

## 1. Quiz Flow

### 1.1 Start Quiz
| Test | Steps | Expected |
|------|-------|----------|
| Entry point | Go to `/wonder/essay` → click start | Quiz loads with Q1 |
| Progress indicator | Answer Q1 | Progress shows 1/7 |
| Navigation | Click back on Q2 | Returns to Q1 with answer preserved |

### 1.2 Answer Validation
| Test | Steps | Expected |
|------|-------|----------|
| All answers required | Try to submit with 6 answers | Blocked, shows error |
| Valid answer range | Each question accepts only valid options | A-D for most, up to G for q6/q7 |

### 1.3 Result Calculation
| Test | Steps | Expected |
|------|-------|----------|
| Identity generated | Complete quiz | Shows "[Adjective] [Noun]" format |
| Dimension spectrum | Complete quiz | Three sliders appear (Agency, Certainty, Posture) |
| Consistent identity | Refresh result page | Same identity shows |

### 1.4 localStorage
| Test | Steps | Expected |
|------|-------|----------|
| quiz-user-id stored | Complete quiz | `localStorage.getItem("quiz-user-id")` returns UUID |
| quiz-user-result stored | Complete quiz | Contains answers array of length 7 |
| Persistence | Close and reopen browser | Data persists |

---

## 2. Result Page (/wonder/essay/quiz/result)

### 2.1 Content Display
| Test | Steps | Expected |
|------|-------|----------|
| Identity name | Load result | Shows "The [Adjective] [Noun]" |
| Utopia vision | Load result | Shows vision description |
| Superpower section | Load result | Shows core gift + expanded text |
| Blind spot section | Load result | Shows edge + expanded text |
| Book recommendations | Load result | Shows 3 books with reasons |
| Famous figures | Load result | Shows 3 real + 3 fictional |

### 2.2 URL Parameters
| Test | Steps | Expected |
|------|-------|----------|
| Identity key `?i=` | `/result?i=curious-architect` | Shows Curious Architect content |
| Archetype fallback `?a=` | `/result?a=citizen` | Shows archetype-mapped content |
| Compare mode `?compare=` | `/result?compare={userId}` | Shows relationship comparison |
| Name for OG `?n=` | `/result?n=Louise` | OG meta shows name |

### 2.3 Share Functionality
| Test | Steps | Expected |
|------|-------|----------|
| Copy link button | Click share/copy | Clipboard contains `/meet/{slug}` |
| Share modal | Click share | Shows options (copy, native share) |
| OG meta tags | Inspect page source | Title, description, image present |

---

## 3. Meet Page (/meet/[slug])

### 3.1 User Lookup
| Test | Steps | Expected |
|------|-------|----------|
| Valid slug | `/meet/lou` | Shows user's identity |
| Invalid slug | `/meet/nonexistent` | Shows 404 |
| Identity from answers | User has 7 answers | Shows calculated identity |
| No answers fallback | User has no answers | Shows archetype-based identity |

### 3.2 CTA Logic
| Test | Steps | Expected |
|------|-------|----------|
| New visitor | Clear localStorage, visit `/meet/lou` | Shows "Discover Your Worldview" |
| Returning user | Has quiz data, visit `/meet/lou` | Shows "See Where You Intersect" |
| Start quiz | Click "Discover Your Worldview" | Goes to `/wonder/essay`, sets `connectWith` |
| See intersection | Click "See Where You Intersect" | Goes to `/result?compare={userId}` |

### 3.3 Connection Creation
| Test | Steps | Expected |
|------|-------|----------|
| Connection trigger | Complete quiz after visiting meet page | Connection created via API |
| Mutual connection | Check both users | Both have connection record |

---

## 4. Utopia Groups (/wonder/essay/quiz/utopia/[slug])

### 4.1 Group Creation
| Test | Steps | Expected |
|------|-------|----------|
| Create group | Click "Create a Group" on result | Modal shows name input |
| Custom name | Enter "Test Group" | Group created with that name |
| Default name | Leave name blank | Group gets random star name |
| Email field | Enter email | Stored for notifications |
| Redirect | Submit form | Goes to `/utopia/{slug}` |

### 4.2 View Modes (1 member)
| Test | Steps | Expected |
|------|-------|----------|
| Solo view | Visit group with 1 member | Shows invitation-first view |
| Share link | Copy share link | Contains `/utopia/{slug}/join` |

### 4.3 View Modes (2 members)
| Test | Steps | Expected |
|------|-------|----------|
| Two-person view | Visit group with 2 members | Shows enhanced relationship |
| Dimension comparison | View relationship | Shows side-by-side spectrums |

### 4.4 View Modes (3+ members)
| Test | Steps | Expected |
|------|-------|----------|
| Multi-member view | Visit group with 3+ | Shows reading-first with radar |
| Member dots | View radar | Shows all members as dots |
| Click member | Click on another member | Opens relationship view |
| Click self | Click on yourself | Opens full profile |

### 4.5 Join Flow
| Test | Steps | Expected |
|------|-------|----------|
| Join page loads | Visit `/utopia/{slug}/join` | Shows founder's identity |
| Take quiz CTA | Click "Take Quiz & Join" | Goes to quiz with join params |
| Auto-join | Complete quiz | User added to group |
| Join animation | Land on utopia page | Animation triggers |
| Email notification | User joins | Existing members emailed |

### 4.6 Member Management
| Test | Steps | Expected |
|------|-------|----------|
| Leave group | Click leave | Removed from member list |
| Update name | Change name | Reflects in all utopias |

---

## 5. Identity System

### 5.1 Calculation Consistency
| Test | Steps | Expected |
|------|-------|----------|
| Same answers = same identity | Take quiz twice with same answers | Same identity both times |
| Threshold boundaries | Test edge case answers | Correct adjective (Visionary/Driven/Poised) |

### 5.2 Identity Coverage
| Test | Steps | Expected |
|------|-------|----------|
| All 84 identities exist | Check identities object | 84 keys present |
| All fields populated | Spot check identities | No empty descriptions/superpowers |

### 5.3 Archetype Fallback
| Test | Steps | Expected |
|------|-------|----------|
| Old archetype URL | `/result?a=citizen` | Maps to identity |
| Member without answers | View in utopia | Shows archetype-based identity |

---

## 6. API Endpoints

### 6.1 Quiz Results
| Endpoint | Method | Test |
|----------|--------|------|
| `/api/utopia/save-result` | POST | Saves result, returns slug |
| `/api/utopia/user/{userId}` | GET | Returns user data |

### 6.2 Utopia Management
| Endpoint | Method | Test |
|----------|--------|------|
| `/api/utopia/create` | POST | Creates group, returns slug |
| `/api/utopia/join` | POST | Adds member, sends emails |
| `/api/utopia/leave` | POST | Removes member |
| `/api/utopia/{slug}` | GET | Returns room data |

### 6.3 Connections
| Endpoint | Method | Test |
|----------|--------|------|
| `/api/connections/create` | POST | Creates mutual connection |
| `/api/connections/list` | GET | Returns user's connections |

---

## 7. Edge Cases

### 7.1 Data Issues
| Test | Steps | Expected |
|------|-------|----------|
| Missing localStorage | Clear storage, load result | Graceful fallback or redirect |
| Corrupt quiz data | Set invalid JSON in localStorage | Error handled, quiz restarts |
| Redis connection fail | Simulate offline | Error message shown |

### 7.2 Navigation
| Test | Steps | Expected |
|------|-------|----------|
| Browser back mid-quiz | Answer Q3, press back | Returns to Q2 with answers |
| Refresh result page | F5 on result | Same content loads |
| Deep link invalid user | `/result?compare=fake` | Error or graceful fallback |

### 7.3 Concurrent Users
| Test | Steps | Expected |
|------|-------|----------|
| Two users join simultaneously | Both click join at same time | Both successfully added |
| User leaves while viewing | User A views User B, B leaves | Graceful handling |

---

## 8. Mobile Testing

### 8.1 Responsive Design
| Test | Screen | Expected |
|------|--------|----------|
| Quiz questions | 375px width | Readable, tappable |
| Result page | 375px width | All sections visible |
| Meet page | 375px width | CTA buttons accessible |
| Utopia radar | 375px width | Members visible, tappable |

### 8.2 Touch Interactions
| Test | Steps | Expected |
|------|-------|----------|
| Swipe between questions | Swipe left/right | Navigate questions (if supported) |
| Native share | Tap share on iOS/Android | Opens share sheet |

---

## 9. Performance

| Test | Target | How to Test |
|------|--------|-------------|
| Quiz load time | < 2s | Lighthouse |
| Result page LCP | < 2.5s | Lighthouse |
| Meet page TTFB | < 500ms | Network tab |
| Image optimization | Next/Image used | Inspect elements |

---

## 10. Known Issues

| Issue | Status | Notes |
|-------|--------|-------|
| Redis connection warnings | Non-critical | Intermittent ECONNRESET in logs |
| metadataBase warning | Non-critical | Affects local dev OG resolution |

---

## Test Data

### Test Users
| Slug | Expected Identity | Notes |
|------|-------------------|-------|
| `lou` | Driven Builder (verify) | Main test user |

### Test Groups
| Slug | Members | Notes |
|------|---------|-------|
| `demo` | Multiple | Demo group for testing |

---

## Regression Tests After Changes

When modifying these files, run related tests:

| File Changed | Tests to Run |
|--------------|--------------|
| `src/lib/dimensions.ts` | Identity calculation, threshold tests |
| `src/lib/identities.ts` | All identity lookup, fallback tests |
| `src/app/meet/` | Meet page tests |
| `src/app/wonder/essay/quiz/result/` | Result page tests |
| `src/app/wonder/essay/quiz/utopia/` | Utopia group tests |
| `src/app/api/utopia/` | API endpoint tests |
| `src/app/api/connections/` | Connection tests |

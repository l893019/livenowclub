"use client";

import { archetypes } from "@/lib/archetypes";
import { RadarChart } from "@/components/RadarChart";
import {
  archetypePositions,
  getGroupCenterOfGravity,
  type RadarPosition,
} from "@/lib/radar-positions";
import styles from "./TwoPersonView.module.css";

type Member = {
  id: string;
  name: string;
  archetype: string;
};

// Pair dynamics data
const pairAlignments: Record<string, string[]> = {
  "citizen+alive": ["Pleasure is not a distraction", "Abundance is meant to be enjoyed"],
  "citizen+shaper": ["Progress needs resources", "Building requires fuel"],
  "citizen+friction": ["Comfort can coexist with challenge", "Growth happens in good conditions"],
  "shaper+friction": ["Change requires tension", "Building is never comfortable"],
  "shaper+alive": ["Transformation can feel good", "Building is its own pleasure"],
  "swimmer+unbound": ["The horizon keeps moving", "Questions lead past answers"],
  "swimmer+cleareyed": ["Seeing clearly means questioning", "Truth requires depth"],
  "architect+mender": ["Systems need repair", "Repair needs systems"],
  "architect+conscience": ["Structures need accountability", "Power requires watching"],
  "presence+rooted": ["Stillness is a practice", "Being here is enough"],
  "rooted+embers": ["Memory requires presence", "The past grounds us"],
  "conscience+cleareyed": ["Truth needs witnesses", "Watching serves honesty"],
  "embers+mender": ["The old can be repaired", "Memory guides repair"],
};

const pairTensions: Record<string, string[]> = {
  "citizen+conscience": ["Ease vs vigilance", "Trust vs suspicion"],
  "citizen+embers": ["Future vs past", "Progress vs preservation"],
  "shaper+rooted": ["Movement vs stillness", "Building vs being"],
  "shaper+embers": ["New vs old", "Change vs memory"],
  "friction+presence": ["Struggle vs peace", "Challenge vs acceptance"],
  "friction+rooted": ["Difficulty vs ease", "Climbing vs settling"],
  "swimmer+mender": ["Questions vs answers", "Uncertainty vs fixing"],
  "swimmer+shaper": ["Contemplation vs action", "Depth vs building"],
  "unbound+rooted": ["Transcendence vs groundedness", "Leaving vs staying"],
  "unbound+embers": ["Future vs past", "Beyond vs memory"],
  "alive+conscience": ["Pleasure vs duty", "Feeling vs watching"],
  "alive+cleareyed": ["Experience vs analysis", "Sensation vs truth"],
};

const pairNeeds: Record<string, string> = {
  "citizen+shaper": "Someone who questions your momentum",
  "citizen+conscience": "A way to hold both comfort and vigilance",
  "shaper+rooted": "Rhythms of action and rest",
  "swimmer+mender": "The courage to act on incomplete knowledge",
  "friction+presence": "Permission to struggle and be still",
  "unbound+embers": "A bridge between what was and what could be",
  "alive+cleareyed": "Truth that doesn't kill the joy",
  "architect+conscience": "Trust that the watchers are building too",
};

function getPairKey(a: string, b: string): string {
  return [a, b].sort().join("+");
}

function getAlignments(archetype1: string, archetype2: string): string[] {
  const key = getPairKey(archetype1, archetype2);
  if (pairAlignments[key]) return pairAlignments[key];

  // Fallback: use shared traits from archetype data
  const data1 = archetypes[archetype1];
  const data2 = archetypes[archetype2];
  if (data1 && data2) {
    return ["Different paths, same search for meaning"];
  }
  return [];
}

function getTensions(archetype1: string, archetype2: string): string[] {
  const key = getPairKey(archetype1, archetype2);
  if (pairTensions[key]) return pairTensions[key];

  // Fallback
  return ["Every difference is a potential blind spot—or a gift"];
}

function getNeed(archetype1: string, archetype2: string): string {
  const key = getPairKey(archetype1, archetype2);
  if (pairNeeds[key]) return pairNeeds[key];

  // Fallback
  return "A third voice to help you hear each other";
}

type TwoPersonViewProps = {
  members: Member[];
  utopiaName: string;
};

export function TwoPersonView({ members, utopiaName }: TwoPersonViewProps) {
  if (members.length !== 2) return null;

  const [person1, person2] = members;
  const arch1 = archetypes[person1.archetype];
  const arch2 = archetypes[person2.archetype];
  const pos1 = archetypePositions[person1.archetype] || { x: 0, y: 0 };
  const pos2 = archetypePositions[person2.archetype] || { x: 0, y: 0 };
  const centerOfGravity = getGroupCenterOfGravity([pos1, pos2]);

  const alignments = getAlignments(person1.archetype, person2.archetype);
  const tensions = getTensions(person1.archetype, person2.archetype);
  const need = getNeed(person1.archetype, person2.archetype);

  // Check if same archetype
  const isSameArchetype = person1.archetype === person2.archetype;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>A Utopia of Two</span>
        <h2 className={styles.title}>
          <span style={{ color: arch1?.color }}>{arch1?.name?.split(" ")[0]}</span>
          {" × "}
          <span style={{ color: arch2?.color }}>{arch2?.name?.split(" ")[0]}</span>
        </h2>
        <p className={styles.subtitle}>{utopiaName}</p>
      </div>

      {/* Radar with line between dots */}
      <div className={styles.radarSection}>
        <RadarChart
          size={300}
          userDots={[
            {
              id: person1.id,
              name: person1.name,
              position: pos1,
              color: arch1?.color || "#888",
            },
            {
              id: person2.id,
              name: person2.name,
              position: pos2,
              color: arch2?.color || "#888",
            },
          ]}
          centerOfGravity={centerOfGravity}
          showAllArchetypes={false}
        />
      </div>

      {/* People */}
      <div className={styles.people}>
        <div className={styles.person}>
          <div className={styles.personDot} style={{ backgroundColor: arch1?.color }} />
          <div className={styles.personName}>{person1.name || "Anonymous"}</div>
          <div className={styles.personArchetype} style={{ color: arch1?.color }}>
            {arch1?.name}
          </div>
        </div>
        <div className={styles.person}>
          <div className={styles.personDot} style={{ backgroundColor: arch2?.color }} />
          <div className={styles.personName}>{person2.name || "Anonymous"}</div>
          <div className={styles.personArchetype} style={{ color: arch2?.color }}>
            {arch2?.name}
          </div>
        </div>
      </div>

      {isSameArchetype ? (
        <div className={styles.analysis}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Doubled</span>
            <p className={styles.sectionText}>
              Two {arch1?.name}s. You share the same vision—and the same blind spots.
              What you build together will be powerful. What you miss, you'll miss together.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.analysis}>
          {/* Where you align */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Where you align</span>
            <ul className={styles.list}>
              {alignments.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Where you clash */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Where you might clash</span>
            <ul className={styles.list}>
              {tensions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* What you need together */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>What this pair needs</span>
            <p className={styles.sectionText}>{need}</p>
          </div>
        </div>
      )}
    </div>
  );
}

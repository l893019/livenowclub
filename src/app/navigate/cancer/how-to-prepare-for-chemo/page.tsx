import Link from "next/link";
import GuideShell, { GS } from "@/components/GuideShell";
import { getGuide, guideMetadata, GuideFaq } from "@/lib/guides";

const guide = getGuide("how-to-prepare-for-chemo");

export const metadata = guideMetadata(guide);

const FAQS: GuideFaq[] = [
  {
    question: "Should I get a port before chemotherapy?",
    answer:
      "If your team offers one, strongly consider it. I didn’t get one for my first round and I wish I had. I needed frequent blood transfusions and hydration, each one a new IV stick, and by the end my veins were so scarred that nurses sometimes needed three or four attempts. A port is a quarter-sized device placed under the skin near your collarbone in a minor outpatient procedure. Once it heals you barely notice it, and you can shower and swim normally. It does carry some risk of infection or clots, so talk it through with your oncologist.",
  },
  {
    question: "Do ice booties and gloves prevent neuropathy?",
    answer:
      "They helped me. Not every chemotherapy causes neuropathy, so first ask your oncologist whether yours does. For the regimens that do, wearing booties and gloves filled with ice packs during the infusion is a common way to reduce nerve damage in hands and feet. They’re inexpensive and available online.",
  },
  {
    question: "What should I pack for chemo and ER visits?",
    answer:
      "Keep a go-bag ready: noise-cancelling headphones, something to watch or read, ginger nausea chews, snacks and protein bars, fuzzy socks, a blanket, an eye mask, and overnight basics like a toothbrush. Wear comfortable clothes with easy arm access, and nothing with metal if you also have radiation appointments.",
  },
  {
    question: "When does hair loss start after chemo?",
    answer:
      "For the chemotherapies that cause hair loss, it typically begins two to four weeks after the first treatment, and it happens in stages rather than all at once. Ask your oncologist what to expect from your specific regimen. Cutting your hair short before treatment makes the transition less jarring, and if you want a wig, get fitted before you lose your hair so it can be matched to your natural color.",
  },
  {
    question: "What should I buy before starting chemo?",
    answer:
      "The things I used most: soft sheets (skin gets sensitive), a weighted blanket, a heating pad, an eye mask, unscented lotions, Aquaphor if you’re having radiation, a soft toothbrush, dry-mouth mouthwash, pillboxes for the medication schedule, comfortable sweatpant sets, and ice booties and gloves if your regimen causes neuropathy.",
  },
];

export default function PrepareForChemoPage() {
  return (
    <GuideShell
      guide={guide}
      faqs={FAQS}
      goDeeper={
        <>
          <li style={GS.li}>
            <Link href="/read/expecting-the-unexpected" style={GS.link}>Expecting the Unexpected</Link>: my
            complete cancer guide, where all of this comes from, in full detail.{" "}
            <a href="/expecting-the-unexpected-guide.pdf" style={GS.link}>Free PDF here</a>.
          </li>
          <li style={GS.li}>
            <Link href="/read/when-it-all-falls-out" style={GS.link}>When It All Falls Out</Link>: the
            essay I wrote about losing my hair.
          </li>
          <li style={GS.li}>
            <Link href="/navigate/cancer/just-diagnosed" style={GS.link}>Just Diagnosed: What to Do First</Link>: if
            you haven’t built your care team yet, start there.
          </li>
        </>
      }
    >
      <p style={GS.p}>
        Neither you nor your doctors know exactly how your body will handle treatment,
        so the useful move is to prepare for a hard version and be pleasantly surprised.
        I went through two rounds of chemotherapy. The first put me in the ER almost
        weekly; during the second I barely went. This page is the setup that made the
        difference: what to decide before your first infusion, what to change at home,
        and what to keep by the door.
      </p>

      <h2 style={GS.h2}>Decisions to make before your first infusion</h2>
      <h3 style={GS.h3}>The port</h3>
      <p style={GS.p}>
        If the option is given to you, I would recommend it. I didn’t get one in my
        first round, and knowing what I know now, I wish I had. I needed a lot of
        blood transfusions and extra hydration, and every single time meant a new IV
        stick. By the end of treatment my veins were scarred and hard to access.
        A port is a small device, about the size of a quarter, placed under the skin
        below your collarbone in a minor outpatient procedure. Once it heals you
        barely notice it. It carries some risk of infection or clots, so discuss it
        with your team.
      </p>
      <h3 style={GS.h3}>Ice booties and gloves</h3>
      <p style={GS.p}>
        Not every chemotherapy causes neuropathy. Check with your oncologist whether
        yours does. For mine, I wore booties and gloves filled with ice packs during
        the relevant treatments to protect the nerves in my hands and feet.
      </p>
      <h3 style={GS.h3}>Hair: cold cap or not</h3>
      <p style={GS.p}>
        For the regimens that cause hair loss, it usually starts two to four weeks
        after the first treatment. I chose not to use a cold cap: it added significant
        time to every session, and there was still less than a 50% chance of keeping
        more than half my hair. I preferred to be completely bald rather than patchy.
        I cut my hair short before treatment started, which made the transition less
        jarring, and about four weeks in I shaved my head. I found it liberating.
        If you want a wig, get fitted before the hair goes, ask for human hair over
        acrylic, and get a brow pen that matches your hair color. Your hair falls out
        in stages, so you have time to practice.
      </p>
      <h3 style={GS.h3}>Fertility</h3>
      <p style={GS.p}>
        If you want the future option of biological children, raise it immediately.
        Doctors will recommend egg retrieval as soon as possible so it doesn’t delay
        treatment. It wasn’t an option for me, but two places we found along the way:{" "}
        <a href="https://www.ccrm.com/" style={GS.link}>CCRM Fertility</a> and{" "}
        <a href="https://chickmission.com/" style={GS.link}>Chick Mission</a>, which
        helps cover the cost.
      </p>

      <h2 style={GS.h2}>Set up your home for healing</h2>
      <p style={GS.p}>
        I liked having different spaces around my home so it felt like I was moving
        around, even when I didn’t have the energy to move far.
      </p>
      <ul style={{ paddingLeft: "20px" }}>
        <li style={GS.li}><strong>Bed:</strong> soft sheets (your skin may get very sensitive), a noise machine, a loose eye mask, a weighted blanket for anxiety, and a heating pad for the cold spells that come with anemia.</li>
        <li style={GS.li}><strong>Bathroom:</strong> unscented lotions (scent sensitivity is real), Aquaphor for radiation burns, a soft toothbrush, dry-mouth mouthwash to stay ahead of mouth sores, and put the razor away, since some chemotherapies make you bleed more easily.</li>
        <li style={GS.li}><strong>A place to watch TV:</strong> I thought I could get through cancer just by reading, and that was a colossal mistake. Queue a mix of shows you don’t need to follow and ones that are fully immersive, for different energy levels.</li>
        <li style={GS.li}><strong>A projects corner:</strong> painting supplies, a journal, a book you can read one partial chapter of whenever energy shows up.</li>
      </ul>

      <h2 style={GS.h2}>Get your uniform</h2>
      <p style={GS.p}>
        I lived in sweatpant sets and rotated through colors. It was a relief not to
        think about what to wear, and everything washed easily. Two practical notes:
        avoid metal anywhere on the clothing so you can walk straight into radiation
        appointments, and think about access, sleeves that roll up easily for IVs, or
        a low-cut tank with a cardigan if you have a port.
      </p>

      <h2 style={GS.h2}>Logistics that save you later</h2>
      <ul style={{ paddingLeft: "20px" }}>
        <li style={GS.li}><strong>Transportation:</strong> a plan for every appointment, ideally with your advocate or a friend, arranged in advance.</li>
        <li style={GS.li}><strong>Food:</strong> a meal train or grocery service, and a stock of bone broth and other comforting, nutritious things.</li>
        <li style={GS.li}><strong>Medication:</strong> you’ll be given several medicines for side effects. Pillboxes help, and keep the instructions somewhere shared, I used my phone’s Notes app, but a Google Doc your advocate can see works well.</li>
        <li style={GS.li}><strong>The ER go-bag:</strong> pack it now and keep it by the door: noise-cancelling headphones, something to entertain yourself, ginger nausea chews, snacks and protein bars, fuzzy socks, a blanket, an eye mask, toothbrush and toothpaste. ER visits are long even when they end fine.</li>
      </ul>

      <h2 style={GS.h2}>Protect your head</h2>
      <p style={GS.p}>
        Do whatever you need to do to mentally put yourself in a bubble. The
        treatments are brutal, but you are fighting the same war as the chemoradiation.
        For me that meant ambient music (Nils Frahm, Brian Eno, Hiroshi Yoshimura),
        box breathing, and meditation apps: Joe Dispenza’s recordings, Expand by
        Monroe for health-specific meditations, and Calm for bedtime stories and
        emergencies.
      </p>
      <p style={GS.p}>
        And one more, which sounds silly until you need it: do a photoshoot before
        treatment starts. I did two. When I was at my worst, it helped to know my
        past self was documented. When I lost my hair, I did another one, to remind
        myself I could be beautiful in any situation.
      </p>
    </GuideShell>
  );
}

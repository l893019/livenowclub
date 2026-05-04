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

import { getAllEssays } from "@/lib/essays";
import AllEssaysClient from "./AllEssaysClient";

export const metadata = {
  title: "All Writing | The Live Now Club",
  description: "Browse the complete archive of essays, poems, and meditations.",
};

export default function AllEssaysPage() {
  // Get essays on server
  const essays = getAllEssays();

  // Pass to client component for interactivity
  return <AllEssaysClient essays={essays} />;
}

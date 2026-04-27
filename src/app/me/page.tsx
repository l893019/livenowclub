import type { Metadata } from "next";
import { MePageClient } from "./MePageClient";

export const metadata: Metadata = {
  title: "Your World | Live Now Club",
  description: "Your connections and groups",
};

export default function MePage() {
  return <MePageClient />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The Live Now Club",
  description: "I'm Louise. A person of many verbs working on being just a noun. Writer, founder, investor, painter, experience designer, human.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

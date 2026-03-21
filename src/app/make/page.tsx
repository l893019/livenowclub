import { redirect } from "next/navigation";

export const metadata = {
  title: "Make | Living a Creative Life",
  description: "Tools to help you make things.",
};

export default function MakePage() {
  redirect("https://louiseireland.substack.com");
}

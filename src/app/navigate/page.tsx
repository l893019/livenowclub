import { redirect } from "next/navigation";

export const metadata = {
  title: "Navigate | Lou's Guide to Cancer",
  description: "Everything I wish someone had told me. Practical guidance for navigating cancer and supporting those who are.",
};

export default function NavigatePage() {
  redirect("https://louiseireland.substack.com/t/cancer");
}

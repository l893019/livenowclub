import { redirect } from "next/navigation";

export const metadata = {
  title: "Wonder | Exploring the Future",
  description: "AI, post-scarcity, and the questions that keep me up at night.",
};

export default function WonderPage() {
  redirect("https://after-abundance.netlify.app");
}

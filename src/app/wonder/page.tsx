import { redirect } from "next/navigation";

export const metadata = {
  title: "Wonder | The Live Now Club",
  description: "Explorations at the intersection of AI, humanity, and meaning.",
};

export default function WonderPage() {
  redirect("/library");
}

import { redirect } from "next/navigation";

export const metadata = {
  title: "After Abundance | The Live Now Club",
  description: "What 200+ works of science fiction reveal about human purpose when scarcity ends.",
};

export default function WonderPage() {
  redirect("/wonder/essay");
}

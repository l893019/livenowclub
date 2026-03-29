import { redirect } from "next/navigation";

export const metadata = {
  title: "Read | The Live Now Club",
  description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy.",
};

export default function ReadPage() {
  redirect("/library");
}

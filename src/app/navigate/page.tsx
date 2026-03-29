import { redirect } from "next/navigation";

export const metadata = {
  title: "Cancer Guide: Navigating Diagnosis, Treatment & Beyond | The Live Now Club",
  description:
    "A comprehensive guide to navigating cancer, written by a survivor. Practical advice for newly diagnosed patients, those in treatment, caregivers, and anyone seeking meaning through illness.",
};

export default function NavigatePage() {
  redirect("/guide#navigating");
}

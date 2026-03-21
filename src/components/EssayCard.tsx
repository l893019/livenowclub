import Link from "next/link";
import { Essay, formatDate } from "@/data/essays";

type EssayCardProps = {
  essay: Essay;
};

export default function EssayCard({ essay }: EssayCardProps) {
  return (
    <Link href={`/essays/${essay.slug}`} className="essay-card">
      <span className="text-tag">{essay.section}</span>
      <h3 className="essay-card-title mt-2">{essay.title}</h3>
      {essay.subtitle && (
        <p className="essay-card-subtitle">{essay.subtitle}</p>
      )}
      <span className="essay-card-date">{formatDate(essay.date)}</span>
    </Link>
  );
}

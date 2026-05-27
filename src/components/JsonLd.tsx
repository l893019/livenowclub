const SITE = "https://livenowclub.com";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Louise Ireland",
    url: SITE,
    jobTitle: "Writer",
    description:
      "Writer and Stage III cervical cancer patient. Author of The Live Now Club — essays on mortality, meaning, and how to live now.",
    sameAs: ["https://louiseireland.substack.com"],
    knowsAbout: ["Cervical Cancer","Mortality","Meaning","Self-Love","Artificial Intelligence","Philosophy"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Live Now Club",
    url: SITE,
    founder: { "@type": "Person", name: "Louise Ireland" },
    sameAs: ["https://louiseireland.substack.com"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

interface ArticleJsonLdProps {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
}

export function ArticleJsonLd(props: ArticleJsonLdProps) {
  const url = `${SITE}/read/${props.slug}`;
  const image = props.image
    ? (props.image.startsWith("http") ? props.image : `${SITE}${props.image}`)
    : `${SITE}/images/og-default.jpg`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: props.title,
    description: props.description,
    image,
    datePublished: props.publishedAt,
    dateModified: props.modifiedAt || props.publishedAt,
    author: { "@type": "Person", name: "Louise Ireland", url: `${SITE}/about` },
    publisher: { "@type": "Organization", name: "The Live Now Club", url: SITE },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

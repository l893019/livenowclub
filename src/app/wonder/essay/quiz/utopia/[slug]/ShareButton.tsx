"use client";

type ShareButtonProps = {
  shareText: string;
  shareUrl: string;
};

export default function ShareButton({ shareText, shareUrl }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Build a utopia with me",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareText + "\n\n" + shareUrl);
      alert("Copied to clipboard!");
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleShare}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      Invite Friends
    </button>
  );
}

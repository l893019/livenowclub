type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl md:text-5xl",
  };

  return (
    <span
      className={`logo-text ${sizeClasses[size]} ${className}`}
    >
      The Live Now Club
    </span>
  );
}

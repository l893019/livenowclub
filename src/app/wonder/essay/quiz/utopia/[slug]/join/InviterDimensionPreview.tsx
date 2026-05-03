"use client";

import { arrayToQuizAnswers, calculateDimensions } from "@/lib/dimensions";

type InviterDimensionPreviewProps = {
  inviterAnswers?: string[];
  inviterColor: string;
  inviterName: string;
};

export function InviterDimensionPreview({
  inviterAnswers,
  inviterColor,
  inviterName,
}: InviterDimensionPreviewProps) {
  // Calculate dimensions if we have answers
  const dimensions = inviterAnswers?.length === 7
    ? (() => {
        const answers = arrayToQuizAnswers(inviterAnswers);
        return answers ? calculateDimensions(answers) : null;
      })()
    : null;

  // Convert -1 to 1 range to 0 to 100 percentage
  const toPercent = (value: number) => ((value + 1) / 2) * 100;

  const spectrums = [
    { key: "agency" as const, lowLabel: "Witness", highLabel: "Builder" },
    { key: "certainty" as const, lowLabel: "Seeking", highLabel: "Settled" },
    { key: "posture" as const, lowLabel: "Protective", highLabel: "Expansive" },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "280px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {spectrums.map((spectrum) => (
        <div key={spectrum.key} style={{ width: "100%" }}>
          {/* Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(45, 42, 38, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {spectrum.lowLabel}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(45, 42, 38, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {spectrum.highLabel}
            </span>
          </div>

          {/* Track */}
          <div
            style={{
              position: "relative",
              height: "24px",
              background: "rgba(45, 42, 38, 0.06)",
              borderRadius: "12px",
            }}
          >
            {/* Inviter marker */}
            {dimensions && (
              <div
                style={{
                  position: "absolute",
                  left: `${toPercent(dimensions[spectrum.key])}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    bottom: "100%",
                    marginBottom: "4px",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: inviterColor,
                    whiteSpace: "nowrap",
                  }}
                >
                  {inviterName}
                </span>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: inviterColor,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
            )}

            {/* "You?" placeholder - opposite side */}
            <div
              style={{
                position: "absolute",
                left: dimensions
                  ? `${100 - toPercent(dimensions[spectrum.key])}%`
                  : "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: "100%",
                  marginBottom: "4px",
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "rgba(45, 42, 38, 0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                you?
              </span>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  border: "2px dashed rgba(45, 42, 38, 0.3)",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </div>
        </div>
      ))}

      {!dimensions && (
        <p
          style={{
            fontSize: "12px",
            color: "rgba(45, 42, 38, 0.5)",
            textAlign: "center",
            marginTop: "8px",
          }}
        >
          Take the quiz to see where you fall
        </p>
      )}
    </div>
  );
}

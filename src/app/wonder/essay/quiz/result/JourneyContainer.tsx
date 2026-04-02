"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import styles from "./JourneyContainer.module.css";

type Step = {
  id: string;
  component: ReactNode;
};

type JourneyContainerProps = {
  steps: Step[];
  initialStep?: number;
  onStepChange?: (stepIndex: number, stepId: string) => void;
};

export function JourneyContainer({
  steps,
  initialStep = 0,
  onStepChange,
}: JourneyContainerProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  const goToStep = useCallback(
    (stepIndex: number, newDirection: "forward" | "back") => {
      if (stepIndex < 0 || stepIndex >= steps.length || isAnimating) return;

      setDirection(newDirection);
      setIsAnimating(true);
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex, steps[stepIndex].id);

      // Reset animation state after animation completes
      setTimeout(() => setIsAnimating(false), 400);
    },
    [steps, isAnimating, onStepChange]
  );

  const goForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1, "forward");
    }
  }, [currentStep, steps.length, goToStep]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1, "back");
    }
  }, [currentStep, goToStep]);

  const jumpToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex === currentStep) return;
      const newDirection = stepIndex > currentStep ? "forward" : "back";
      goToStep(stepIndex, newDirection);
    },
    [currentStep, goToStep]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goBack();
          break;
        case "ArrowRight":
        case "ArrowDown":
        case " ": // Space
          e.preventDefault();
          goForward();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goForward, goBack]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={styles.container}>
      {/* Step content */}
      <div className={styles.stepWrapper}>
        <div
          key={currentStep}
          className={`${styles.stepContent} ${
            direction === "forward" ? styles.slideFromRight : styles.slideFromLeft
          }`}
        >
          {steps[currentStep].component}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className={styles.navButtons}>
        <button
          className={styles.navButton}
          onClick={goBack}
          disabled={isFirstStep || isAnimating}
          aria-label="Previous step"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className={styles.navButton}
          onClick={goForward}
          disabled={isLastStep || isAnimating}
          aria-label="Next step"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Progress dots */}
      <div className={styles.progressDots}>
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={`${styles.dot} ${
              index === currentStep
                ? styles.dotActive
                : index < currentStep
                ? styles.dotCompleted
                : styles.dotPending
            }`}
            onClick={() => jumpToStep(index)}
            disabled={isAnimating}
            aria-label={`Go to step ${index + 1}: ${step.id}`}
            aria-current={index === currentStep ? "step" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

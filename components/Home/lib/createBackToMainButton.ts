import { gsap } from "gsap";

export function createBackToMainButton(onBackToMain: () => void) {
  const backButton = document.createElement("button");
  backButton.textContent = "Main Page";

  Object.assign(backButton.style, {
    position: "fixed",
    top: "24px",
    left: "24px",
    zIndex: "9999",
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    opacity: "0",
    transform: "translateY(-18px) scale(0.92)",
    boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
  });

  document.body.appendChild(backButton);

  let isClosing = false;

  const enterTween = gsap.fromTo(
    backButton,
    {
      y: -18,
      opacity: 0,
      scale: 0.92,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    },
  );

  const handleMouseEnter = () => {
    if (isClosing) return;

    gsap.to(backButton, {
      scale: 1.04,
      y: -2,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (isClosing) return;

    gsap.to(backButton, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseDown = () => {
    if (isClosing) return;

    gsap.to(backButton, {
      scale: 0.96,
      duration: 0.12,
      ease: "power2.out",
    });
  };

  const handleMouseUp = () => {
    if (isClosing) return;

    gsap.to(backButton, {
      scale: 1.02,
      duration: 0.12,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    if (isClosing) return;
    isClosing = true;

    backButton.style.pointerEvents = "none";

    gsap.to(backButton, {
      y: -16,
      opacity: 0,
      scale: 0.9,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        onBackToMain();
      },
    });
  };

  backButton.addEventListener("mouseenter", handleMouseEnter);
  backButton.addEventListener("mouseleave", handleMouseLeave);
  backButton.addEventListener("mousedown", handleMouseDown);
  backButton.addEventListener("mouseup", handleMouseUp);
  backButton.addEventListener("click", handleClick);

  return () => {
    enterTween.kill();
    gsap.killTweensOf(backButton);

    backButton.removeEventListener("mouseenter", handleMouseEnter);
    backButton.removeEventListener("mouseleave", handleMouseLeave);
    backButton.removeEventListener("mousedown", handleMouseDown);
    backButton.removeEventListener("mouseup", handleMouseUp);
    backButton.removeEventListener("click", handleClick);

    backButton.remove();
  };
}
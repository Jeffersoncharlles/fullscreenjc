import { useEffect } from "react";

const PLACEHOLDER_ID = "focototal-video-placeholder";

type UseVideoContainerPlaceholderProps = {
  isModalOpen: boolean;
  videoContainer: HTMLElement | null;
  modalContentRef: React.RefObject<HTMLDivElement | null>;
};

export function useVideoContainerPlaceholder({
  isModalOpen,
  videoContainer,
  modalContentRef,
}: UseVideoContainerPlaceholderProps) {
  useEffect(() => {
    if (!videoContainer) return;

    // Garante o contexto de posicionamento
    videoContainer.style.position = "relative";

    const originalParent = videoContainer.parentElement;
    if (!originalParent) return;

    const applyFullscreenStyles = (el: HTMLElement) => {
      el.style.setProperty("width", "100%", "important");
      el.style.setProperty("height", "100%", "important");
      el.style.setProperty("max-width", "none", "important");
      el.style.setProperty("max-height", "none", "important");
    };

    const resetFullscreenStyles = (el: HTMLElement) => {
      el.style.removeProperty("width");
      el.style.removeProperty("height");
      el.style.removeProperty("max-width");
      el.style.removeProperty("max-height");
    };

    const applyRecursively = (root: HTMLElement) => {
      applyFullscreenStyles(root);
      root
        .querySelectorAll<HTMLElement>("*, iframe, video")
        .forEach(applyFullscreenStyles);
    };

    const resetRecursively = (root: HTMLElement) => {
      resetFullscreenStyles(root);
      root
        .querySelectorAll<HTMLElement>("*, iframe, video")
        .forEach(resetFullscreenStyles);
    };

    if (isModalOpen) {
      const placeholder = document.createElement("div");
      placeholder.id = PLACEHOLDER_ID;
      const rect = videoContainer.getBoundingClientRect();
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;

      originalParent.replaceChild(placeholder, videoContainer);

      const modalContent = modalContentRef.current;
      if (modalContent) {
        applyRecursively(videoContainer);
        modalContent.appendChild(videoContainer);
      }
    } else {
      const placeholder = document.getElementById(PLACEHOLDER_ID);
      if (placeholder && placeholder.parentElement) {
        resetRecursively(videoContainer);
        placeholder.parentElement.replaceChild(videoContainer, placeholder);
      }
    }
  }, [isModalOpen, videoContainer, modalContentRef]);
}

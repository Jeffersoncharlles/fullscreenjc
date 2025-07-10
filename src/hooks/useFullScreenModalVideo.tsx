import { useEffect } from "react";

const PLACEHOLDER_ID = "focototal-video-placeholder";

type UseFullscreenModalVideoProps = {
  isModalOpen: boolean;
  videoContainer: HTMLElement | null;
  originalParentRef: React.RefObject<HTMLElement>;
  modalContentRef: React.RefObject<HTMLElement>;
};

export function useFullscreenModalVideo({
  isModalOpen,
  videoContainer,
  originalParentRef,
  modalContentRef,
}: UseFullscreenModalVideoProps) {
  useEffect(() => {
    if (!originalParentRef.current || !videoContainer) return;

    const originalParent = originalParentRef.current;
    const openButton = videoContainer.querySelector<HTMLElement>(
      "#focototal-open-button"
    );

    if (isModalOpen) {
      if (openButton) openButton.style.display = "none";

      const placeholder = document.createElement("div");
      placeholder.id = PLACEHOLDER_ID;

      const rect = videoContainer.getBoundingClientRect();
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;

      originalParent.replaceChild(placeholder, videoContainer);

      const modalContent = modalContentRef.current;
      if (modalContent) {
        modalContent.appendChild(videoContainer);

        // Estiliza o container e o iframe
        videoContainer.style.setProperty("width", "100%", "important");
        videoContainer.style.setProperty("height", "100%", "important");
        videoContainer.style.setProperty("max-width", "none", "important");
        videoContainer.style.setProperty("max-height", "none", "important");

        const iframe = videoContainer.querySelector("iframe");
        if (iframe) {
          iframe.style.width = "100%";
          iframe.style.height = "100%";
        }
      }
    } else {
      if (openButton) openButton.style.display = "block";

      const placeholder = document.getElementById(PLACEHOLDER_ID);
      if (placeholder?.parentElement) {
        placeholder.parentElement.replaceChild(videoContainer, placeholder);
        placeholder.remove();

        // Remove estilos inline
        videoContainer.style.width = "";
        videoContainer.style.height = "";

        const iframe = videoContainer.querySelector("iframe");
        if (iframe) {
          iframe.style.width = "";
          iframe.style.height = "";
        }
      }
    }
  }, [isModalOpen, videoContainer, originalParentRef, modalContentRef]);
}

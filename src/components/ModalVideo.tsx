import { X } from "lucide-react";
import { useState, useEffect, useRef, type FC } from "react"; // Importa CSSProperties
import { createPortal } from "react-dom";

// Define que o componente espera receber uma prop 'videoContainer'
interface ModalVideoProps {
  videoContainer: HTMLElement;
}

const PLACEHOLDER_ID = "focototal-video-placeholder";

export const ModalVideo: FC<ModalVideoProps> = ({ videoContainer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // O primeiro useEffect (que procurava o vídeo) foi removido!

  useEffect(() => {
    // A lógica do placeholder agora usa o videoContainer recebido via props
    if (!videoContainer) return;

    // Garante o contexto de posicionamento
    videoContainer.style.position = "relative";

    const originalParent = videoContainer.parentElement;
    if (!originalParent) return;

    if (isModalOpen) {
      const placeholder = document.createElement("div");
      placeholder.id = PLACEHOLDER_ID;
      const rect = videoContainer.getBoundingClientRect();
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;
      originalParent.replaceChild(placeholder, videoContainer);
      const modalContent = modalContentRef.current;
      if (modalContent) {
        videoContainer.classList.add("focototal-fullscreen-active");
        modalContent.appendChild(videoContainer);
      }
    } else {
      const placeholder = document.getElementById(PLACEHOLDER_ID);
      if (placeholder && placeholder.parentElement) {
        videoContainer.classList.remove("focototal-fullscreen-active");
        placeholder.parentElement.replaceChild(videoContainer, placeholder);
      }
    }
  }, [isModalOpen, videoContainer]);
  return (
    <>
      {/* ---- MUDANÇA PARA USAR O PORTAL ---- */}
      {!isModalOpen &&
        createPortal(
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-[15px] right-[25px] z-[2147483647]
           px-4 py-2
          text-white font-bold
         rounded-lg select-none border border-white
         cursor-pointer transition-colors duration-300 ease-in-out
         "
          >
            Tela Cheia
          </button>,
          videoContainer // O alvo do nosso portal é o próprio container do vídeo
        )}

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[2147483640] p-4">
            <div className="w-full h-full max-w-[1600px] flex flex-col">
              <div className="w-full flex-shrink-0 flex justify-end items-center py-2">
                {/* ---- APLICAÇÃO DOS ESTILOS INLINE ---- */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  // style={closeButtonStyle}
                  className="block visible opacity-100
         absolute top-[5px] right-[25px] z-[2147483647]
         text-[45px] font-bold text-white dark:text-white leading-[1]
         bg-none border-none p-0 cursor-pointer"
                >
                  <X className="text-white" />
                </button>
              </div>

              <div ref={modalContentRef} className="w-full flex-grow min-h-0">
                {/* O videoContainer será movido para cá */}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

import { X } from "lucide-react";
import { useState, useRef, type FC } from "react"; // Importa CSSProperties
import { createPortal } from "react-dom";
import { useVideoContainerPlaceholder } from "../hooks/use-video-container-placeholder";

// Define que o componente espera receber uma prop 'videoContainer'
interface ModalVideoProps {
  videoContainer: HTMLElement;
}

export const ModalVideo: FC<ModalVideoProps> = ({ videoContainer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useVideoContainerPlaceholder({
    isModalOpen,
    videoContainer,
    modalContentRef,
  });

  return (
    <>
      {/* ---- MUDANÇA PARA USAR O PORTAL ---- */}
      {!isModalOpen &&
        createPortal(
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-[15px] right-[25px] z-[2147483647] px-4 py-2 text-zinc-100 font-bold rounded-lg select-none border border-zinc-50 cursor-pointer transition-colors duration-300 ease-in-out"
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

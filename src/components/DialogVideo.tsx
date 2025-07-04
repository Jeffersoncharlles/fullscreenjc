import { X } from "lucide-react";
import { Dialog, DialogClose, DialogContent } from "./ui/dialog";
import { useVideoContainerPlaceholder } from "@/hooks/use-video-container-placeholder";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalVideoProps {
  videoContainer: HTMLElement;
}

const DialogVideo = ({ videoContainer }: ModalVideoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useVideoContainerPlaceholder({
    isModalOpen,
    videoContainer,
    modalContentRef,
  });

  return (
    <>
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
      <Dialog open={isModalOpen}>
        <DialogClose>
          <X />
        </DialogClose>
        <DialogContent>
          <div ref={modalContentRef} className="w-full flex-grow min-h-0" />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DialogVideo;

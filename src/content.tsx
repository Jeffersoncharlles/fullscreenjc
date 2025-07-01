import React from "react";
import ReactDOM from "react-dom/client";
import { ModalVideo } from "./components/ModalVideo";
import "./index.css";
import { platforms } from "./config/plataform";

// Função que inicia a aplicação React
function initializeReactApp(videoElement: HTMLElement) {
  // Evita injetar a aplicação mais de uma vez
  if (document.getElementById("focototal-react-root")) {
    return;
  }

  const rootElement = document.createElement("div");
  rootElement.id = "focototal-react-root";
  document.body.appendChild(rootElement);

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ModalVideo videoContainer={videoElement} />
    </React.StrictMode>
  );
}

// Função que procura pelo vídeo
function findVideoAndStart() {
  for (const platform of platforms) {
    const selector = Object.values(platform)[0];
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      // Vídeo encontrado! Inicia o React e para de procurar.
      initializeReactApp(element);
      return true;
    }
  }
  return false;
}

if (!findVideoAndStart()) {
  // Se não encontrar, cria um observador para esperar por mudanças na página
  const observer = new MutationObserver(() => {
    if (findVideoAndStart()) {
      // Quando encontrar, para de observar para economizar recursos
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

import { platforms } from "../config/plataform";

interface initializeReactApp {
  (videoElement: HTMLElement): void;
}

function findVideoAndStart(initializeReactApp: initializeReactApp) {
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

// if (!findVideoAndStart(initializeReactApp)) {
//   // Se não encontrar, cria um observador para esperar por mudanças na página
//   const observer = new MutationObserver(() => {
//     if (findVideoAndStart()) {
//       // Quando encontrar, para de observar para economizar recursos
//       observer.disconnect();
//     }
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });
// }

export { findVideoAndStart };

const startUCA = (contentMedia, wikiPageShow) => {
  const bgFull = document.createElement("div");
  bgFull.classList.add("bg-full");

  const btn = document.createElement("div");
  btn.classList.add("btn-fullscreen");
  btn.innerText = "FULL";

  contentMedia.appendChild(btn);

  let isFullscreen = false;

  //quando clicar no botão
  btn.onclick = function () {
    if (!isFullscreen) {
      isFullscreen = true;
      document.body.appendChild(bgFull);
      bgFull.appendChild(contentMedia);
      contentMedia.classList.add("full");
      btn.innerText = "Exit";
    } else {
      isFullscreen = false;
      contentMedia.classList.remove("full");
      wikiPageShow.appendChild(contentMedia);
      bgFull.remove();
      btn.innerText = "FULL";
    }
  };
};

const startApp = (playerVideo, parentPlayerVideo) => {
  const bgFullscreen = document.createElement("div");
  bgFullscreen.classList.add("bg_full");

  const btn = document.createElement("div");
  btn.classList.add("btn-fullscreen");
  btn.innerText = "FULL";
  playerVideo.appendChild(btn);

  let isFullscreen = false;

  btn.onclick = () => {
    if (!isFullscreen) {
      isFullscreen = true;
      document.body.appendChild(bgFullscreen);
      bgFullscreen.appendChild(playerVideo);
      playerVideo.classList.add("fullscreenPage");
      btn.innerText = "Exit";
    } else {
      isFullscreen = false;
      playerVideo.classList.remove("fullscreenPage");
      parentPlayerVideo.appendChild(playerVideo);
      bgFullscreen.remove();
      btn.innerText = "FULL";
    }
  };
};

const startBweb = (videob7web, parentVideob7web) => {
  const bgFullscreen = document.createElement("div");
  bgFullscreen.classList.add("bg_full");

  const btn = document.createElement("div");
  btn.classList.add("btn-fullscreen");
  btn.innerText = "FULL";
  videob7web.appendChild(btn);

  let isFullscreen = false;

  btn.onclick = () => {
    if (!isFullscreen) {
      isFullscreen = true;
      document.body.appendChild(bgFullscreen);
      bgFullscreen.appendChild(videob7web);
      videob7web.classList.add("fullscreenPage");
      btn.innerText = "Exit";
    } else {
      isFullscreen = false;
      videob7web.classList.remove("fullscreenPage");
      parentVideob7web.appendChild(videob7web);
      bgFullscreen.remove();
      btn.innerText = "FULL";
    }
  };
};

const startCosmos = (videoElement, parentElement) => {
  // Evita adicionar um novo botão se a função for chamada mais de uma vez
  if (parentElement.querySelector(".btn-fullscreen-b7")) {
    return;
  }

  const btn = document.createElement("div");
  btn.classList.add("btn-fullscreen-b7");
  btn.innerText = "TELA CHEIA";
  parentElement.appendChild(btn);

  btn.onclick = () => {
    // ---- INÍCIO DAS MODIFICAÇÕES ----

    // 1. CRIAÇÃO DO PLACEHOLDER
    // Um elemento div vazio que vai "guardar o lugar" do vídeo.
    const placeholder = document.createElement("div");

    // 2. TROCA DO VÍDEO PELO PLACEHOLDER
    // Antes de qualquer outra coisa, substituímos o vídeo pelo placeholder.
    // Isso mantém o layout da página estável.
    parentElement.replaceChild(placeholder, videoElement);

    // ---- FIM DAS MODIFICAÇÕES ----

    // Cria os elementos do modal do zero (código original)
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay-b7";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content-b7";

    const closeModalBtn = document.createElement("button");
    closeModalBtn.className = "modal-close-button-b7";
    closeModalBtn.innerHTML = "&times;";

    // Define a ação de fechar o modal
    closeModalBtn.onclick = () => {
      // ---- INÍCIO DAS MODIFICAÇÕES ----

      // 3. DEVOLVENDO O VÍDEO AO LUGAR EXATO
      // Em vez de 'appendChild', agora substituímos o placeholder de volta pelo vídeo.
      if (placeholder.parentElement) {
        placeholder.parentElement.replaceChild(videoElement, placeholder);
      } else {
        // Um fallback de segurança, caso algo remova o placeholder do DOM
        parentElement.appendChild(videoElement);
      }

      // ---- FIM DAS MODIFICAÇÕES ----

      modalOverlay.remove();
      btn.style.display = "block";
    };

    // Monta a estrutura do modal e o exibe na tela (código original)
    modalOverlay.appendChild(modalContent);
    modalOverlay.appendChild(closeModalBtn);
    modalContent.appendChild(videoElement);
    document.body.appendChild(modalOverlay);

    btn.style.display = "none";
  };
};

const initializeVideoObserver = () => {
  // A mesma estrutura de configuração da Opção 1.
  const platforms = [
    { selector: ".show-content", startFunction: startUCA },
    { selector: ".page__media", startFunction: startApp },
    { selector: ".plyr__video-wrapper", startFunction: startBweb },
    { selector: '[data-testid="embed-container"]', startFunction: startCosmos },
  ];

  // Função que procura pelo vídeo e inicia o script.
  const findAndStartVideo = () => {
    for (const platform of platforms) {
      const videoElement = document.querySelector(platform.selector);

      if (videoElement) {
        // Se encontramos, desconectamos o "vigia" para ele parar de consumir recursos.
        observer.disconnect();

        const parentElement = videoElement.parentNode;
        if (parentElement) {
          platform.startFunction(videoElement, parentElement);
        }

        // Retorna true para indicar que encontramos o elemento.
        return true;
      }
    }
    // Retorna false se não encontrar nada.
    return false;
  };

  // Cria o "vigia" (Observer). Ele executará findAndStartVideo sempre que o DOM mudar.
  const observer = new MutationObserver(() => {
    findAndStartVideo();
  });

  // Tenta executar uma primeira vez, caso o elemento já esteja na página quando o script rodar.
  const alreadyFound = findAndStartVideo();

  // Se o elemento ainda não foi encontrado, diz ao "vigia" para começar a observar o corpo da página.
  if (!alreadyFound) {
    observer.observe(document.body, {
      childList: true, // Observa adição/remoção de filhos diretos.
      subtree: true, // Observa também os "netos", "bisnetos", etc.
    });
  }
};

// Inicie todo o processo
initializeVideoObserver();

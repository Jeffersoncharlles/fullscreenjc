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
  // Adiciona o botão "TELA CHEIA" ao contêiner pai do vídeo.
  // Evita adicionar um novo botão se a função for chamada mais de uma vez
  if (parentElement.querySelector(".btn-fullscreen-b7")) {
    return;
  }

  const btn = document.createElement("div");
  btn.classList.add("btn-fullscreen-b7");
  btn.innerText = "TELA CHEIA";
  parentElement.appendChild(btn);

  btn.onclick = () => {
    // 1. Cria os elementos do modal do zero
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay-b7";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content-b7";

    const closeModalBtn = document.createElement("button");
    closeModalBtn.className = "modal-close-button-b7";
    closeModalBtn.innerHTML = "&times;";

    // 2. Define a ação de fechar o modal
    closeModalBtn.onclick = () => {
      parentElement.appendChild(videoElement); // Devolve o vídeo ao seu local original
      modalOverlay.remove(); // Remove o modal da página
      btn.style.display = "block"; // Mostra o botão "TELA CHEIA" de novo
    };

    // 3. Monta a estrutura do modal e o exibe na tela
    modalOverlay.appendChild(modalContent);
    modalOverlay.appendChild(closeModalBtn);
    modalContent.appendChild(videoElement); // Move o vídeo para dentro do modal
    document.body.appendChild(modalOverlay); // Adiciona o modal à página

    btn.style.display = "none"; // Esconde o botão original
  };
};

const interval = setInterval(() => {
  //uca faculdade
  const contentMedia = document.querySelector(".show-content");

  // hotmart 1
  const playerVideo = document.querySelector(".page__media");

  //B7 web
  const videob7web = document.querySelector(".gAbRoy");

  // const videoCosmos = document.querySelector(".css-1y4o8mg");
  const videoCosmos = document.querySelector('[data-testid="embed-container"]');

  if (contentMedia) {
    const wikiPageShow = contentMedia.parentNode;
    clearInterval(interval);
    startUCA(contentMedia, wikiPageShow);
  }

  if (videoCosmos) {
    const parentVideo = videoCosmos.parentNode;
    clearInterval(interval);
    startCosmos(videoCosmos, parentVideo);
  }

  if (contentMedia) {
    const wikiPageShow = contentMedia.parentNode;
    clearInterval(interval);
    startUCA(contentMedia, wikiPageShow);
  }

  if (playerVideo) {
    const parentPlayerVideo = playerVideo.parentNode;
    clearInterval(interval);
    startApp(playerVideo, parentPlayerVideo);
  }

  if (videob7web) {
    const parentVideob7web = videob7web.parentNode;
    clearInterval(interval);
    startBweb(videob7web, parentVideob7web);
  }
}, 50);
window.addEventListener("load", initializeVideoModal);

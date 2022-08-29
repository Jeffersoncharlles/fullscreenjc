

const startUCA = (contentMedia, wikiPageShow) => {
    const bgFull = document.createElement('div')
    bgFull.classList.add('bg-full')


    const btn = document.createElement('div')
    btn.classList.add('btn-fullscreen')
    btn.innerText = 'FULL'

    contentMedia.appendChild(btn)

    let isFullscreen = false;

    //quando clicar no botão
    btn.onclick = function () {
        if (!isFullscreen) {
            isFullscreen = true
            document.body.appendChild(bgFull)
            bgFull.appendChild(contentMedia)
            contentMedia.classList.add('full')
            btn.innerText = 'Exit'
        } else {
            isFullscreen = false
            contentMedia.classList.remove('full')
            wikiPageShow.appendChild(contentMedia)
            bgFull.remove()
            btn.innerText = 'FULL'
        }
    }


}


const startApp = (playerVideo, parentPlayerVideo) => {
    const bgFullscreen = document.createElement('div')
    bgFullscreen.classList.add('bg_full')


    const btn = document.createElement('div')
    btn.classList.add('btn-fullscreen')
    btn.innerText = 'FULL'
    playerVideo.appendChild(btn)

    let isFullscreen = false


    btn.onclick = () => {

        if (!isFullscreen) {
            isFullscreen = true
            document.body.appendChild(bgFullscreen)
            bgFullscreen.appendChild(playerVideo)
            playerVideo.classList.add('fullscreenPage')
            btn.innerText = 'Exit'
        } else {
            isFullscreen = false
            playerVideo.classList.remove('fullscreenPage')
            parentPlayerVideo.appendChild(playerVideo)
            bgFullscreen.remove()
            btn.innerText = 'FULL'
        }



    }

}


const interval = setInterval(() => {

    //uca faculdade
    const contentMedia = document.querySelector('.show-content')

    // hotmart 1
    const playerVideo = document.querySelector('.page__media')


    if (contentMedia) {
        const wikiPageShow = contentMedia.parentNode;
        clearInterval(interval)
        startUCA(contentMedia, wikiPageShow)
    }

    if (playerVideo) {
        const parentPlayerVideo = playerVideo.parentNode
        clearInterval(interval)
        startApp(playerVideo, parentPlayerVideo)
    }

}, 50)



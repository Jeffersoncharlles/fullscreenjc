

const startApp = (contentMedia,wikiPageShow)=>{
    const bgFull = document.createElement('div')
    bgFull.classList.add('bg-full')


    const btn = document.createElement('div')
    btn.classList.add('btn-fullscreen')
    btn.innerText = 'Full'

    contentMedia.appendChild(btn)

    let isFullscreen = false;

    //quando clicar no botão
    btn.onclick = function(){
        if (!isFullscreen) {
            isFullscreen = true
            document.body.appendChild(bgFull)
            //jogando no final do body um filho novo 

            bgFull.appendChild(contentMedia)
           contentMedia.classList.add('full')
        }else{
            isFullscreen = false
            contentMedia.classList.remove('full')
            wikiPageShow.appendChild(contentMedia)
            bgFull.classList.remove('bg-full')
            

        }
    }

    
}


const interval = setInterval(()=>{
    const contentMedia = document.querySelector('.show-content')
    

    if (contentMedia) {
        const wikiPageShow = contentMedia.parentNode;
        clearInterval(interval)

        startApp(contentMedia,wikiPageShow)
        
    }
},50)



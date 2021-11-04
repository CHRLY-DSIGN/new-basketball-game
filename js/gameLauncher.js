/* window.onload = function() {
    basicGame.init();
    
}; */

window.onload = function() {
    document.getElementById("launch-btn").onclick = function() {
        document.querySelector('#launcher-menu').setAttribute('class', 'hide')
        document.querySelector('#intro').removeAttribute('class', 'hide')
        document.querySelector('#intro-video').play()
        setTimeout(function(){document.querySelector('#intro').setAttribute('class', 'hide');}, 29000)
        setTimeout(function(){document.querySelector('#main-menu').removeAttribute('class', 'hide');}, 29000)
        
        
    }
    
    document.getElementById("main-menu-btn2").onclick = function(){
        document.querySelector('#how-to-play').removeAttribute('class', 'hide')
    }	
    
    
    document.getElementById("back-btn").onclick = function(){
        document.querySelector('#how-to-play').setAttribute('class', 'hide')
    }


    document.getElementById("play-btn").onclick = function() {
        document.querySelector('#main-menu').setAttribute('class', 'hide')
        document.querySelector('#game-board').removeAttribute('class', 'hide')
        document.querySelector('#home-btn').removeAttribute('class', 'hide')
        document.querySelector('#score').removeAttribute('class','hide')
		document.querySelector('#best-score').removeAttribute('class','hide')
        basicGame.init()
    }


	
}


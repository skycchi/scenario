
var click = new Audio("https://files.catbox.moe/i3b5jy.ogg");
document.onclick = function() {
    click.play();
}
click.volume = 0.5;

function shuffle(){
    var hints = $('.box');
    var i = 0;

    $('.inner').on('click', function(){
        i = (i + 1) % hints.length;
        hints.hide().eq(i).show();
    })
}

$(document).ready(function() {
    shuffle();
});

barba.hooks.after(() => {
    shuffle();
});                    

barba.init({
    views: [{
        before({ next }) {

        // load your script
        let script = document.createElement('script');
        script.src = '/scripts/shuffle.js'; // location of your draggable js file that is responsible for that image loading and dragging functionality
        next.container.appendChild(script);
        }, 
    }],
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
    
});
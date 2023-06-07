
var click = new Audio("https://files.catbox.moe/i3b5jy.ogg");
document.onclick = function() {
    click.play();
}
click.volume = 0.5;

var audio = document.getElementById("go");
audio.volume = 0.5;

function shuffle(){
    var hints = $('.box');
    var i = 0;

    $('.inner').on('click', function(){
        i = (i + 1) % hints.length;
        hints.hide().eq(i).show();
    })
}

function animate(){
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
        };
        window.requestAnimationFrame(step);
        
    }
    
    const obj = document.getElementById("value");
    animateValue(obj, 100, 0, 5000);

    $("#subtitle").delay(5000).fadeIn();

    document.onclick = function() {
        $("#subtitle").fadeOut(50);
        $("#options").fadeIn(100);
    }
}

$(document).ready(function() {
    shuffle();
    animate();
});

barba.hooks.after(() => {
    shuffle();
    animate();
});                    

barba.init({
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
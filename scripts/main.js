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
    $("#options").delay(5000).fadeIn();
}

function click(){
    var click = new Audio("/music/sound effects/click.ogg");
    
    document.onclick = function() {
        click.play();
    }
}

function music(){
    var music = document.getElementById("music");
    music.play();
}

function ani() {
    document.getElementById("compHealthBar").className = 'enemyhp';
    document.getElementById("yourHealthBar2").className = 'playerhp';
    document.getElementById("announcements").innerHTML += "Len jumps into action. He chips away at the Creation's health by summoning knives around him and willing them to attack. Other brave people soon join in with their weapons.<br>"
    document.getElementById("attack").disabled = true;
    $(".creation").delay(5000).fadeOut();
    setTimeout(function() {
        document.getElementById("announcements").innerHTML += "The Creation was defeated! Len gains 1 level and 100 points."
    }, 5000);
    
}

$(document).ready(function() {
    click();
    shuffle();
    animate();
    music(); 
});

barba.hooks.after(() => {
    click();
    shuffle();
    animate();
    music();
});   

function stats() {
    var x = document.getElementById("stats");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

barba.init({
   prevent: ({ el }) => el.classList && el.classList.contains('prevent'),
  transitions: [{
    name: 'opacity-transition',
/*    from: {
      namespace: [
          'index1','index2','index3','page1','page2','page3','page4'
      ]
    },*/
      
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0,
      });
    },
  }],
    views: [{
        namespace: 'page6',
        beforeEnter({ next }) {

        // load your script
        let script = document.createElement('script');
        script.src = '/scripts/battle.js'; // location of your draggable js file that is responsible for that image loading and dragging functionality
        next.container.appendChild(script);
        }, 
    }],
    
});
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

// each player chooses a move
// defense goes first (player then comp)
// attacks go second (player then comp)
// health gets minused as attacks land



//Global variables >>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var yourMove;
var compMove;
var savedCompMove;
var yourHealth = 100;
var compHealth = 100;

//Turn counters >>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var totRounds = 0;

//Doument rewrites >>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var res;
var playByPlay = document.getElementById('announcements');
var yourHealthBar = document.getElementById('yourHealthBar');
var compHealthBar = document.getElementById('compHealthBar');
var attackButton = document.getElementById('attack');
var counterButton = document.getElementById('counter');
var playAgain = document.getElementById('playAgain');

//Moves >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function enableButtons() {
	attackButton.disabled = false;
	counterButton.disabled = false;
}

//Shared Functions >>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// triggers the fight in the HTML
function fight(id) {
    addRound();
    compMove(id);
    healthChange();
    gameOver();
}
// adds a round to the round counters
function addRound() {
    totRounds += 1;
}

//adds the counter action to attack
function counter(y, c) {
    var move = Math.floor((Math.random()*5));
    if (move >= 3 && y === 'attack') {
        res = "The Creation's counter was successful! Len took 10 damage!";
        yourHealth -= 10;
    } else if (move >= 3 && y === 'counter') {
        res = "Len's counter was successful! The Creation took 10 damage.";
        compHealth -= 10;
    } else if (move < 3 && y === 'attack') {
        res = "The Creation's counter failed! Len dealt 15 damage!";
        compHealth -= 15;
    } else if (move < 3 && y === 'counter') {
        res = "Len's counter was not successful! Len received 15 damage!";
        yourHealth -= 15;
    }

}

// Dislpays results of the round
function roundResults(res) {
    playByPlay.innerHTML += res + "<br>";
}

function healthChange() {
    yourHealthBar.style.width = yourHealth + "%";
    compHealthBar.style.width =  compHealth + "%";
}

function gameOver() {
    if (yourHealth === 0) {
        res = 'Game over.';
        roundResults(res);
        attackButton.disabled = true;
        counterButton.disabled = true;
    }
    if (compHealth === 0) {
        res = 'Battle over! Len gained 1 level and 100 points.';
        roundResults(res);
        attackButton.disabled = true;
        counterButton.disabled = true;
    }
}

//The Game >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Takes the moves of the player and generates one for the comp and then runs the damage step
function compMove(id) {
    var move = Math.floor((Math.random()*4)+1);
    if (move <= 3) {
        savedCompMove =  'attack';
    } else {
        savedCompMove = 'counter';
    };
    res = ('your move is <span>'+ id + '</span> and the computers move is <span>' + savedCompMove + '</span> on round ' + totRounds);
    damageStep(id, savedCompMove);
    roundResults(res);

}

//proccesses the moves to a result
function damageStep(y, c) {
    if ( y === 'attack' && c === 'attack') {
        res = 'Both Len and the Creation took damage!';
        if (compHealth >= 10 && yourHealth >= 10) {
            compHealth -= 10;
            yourHealth -= 10;
        } else {
            compHealth = 0;
            yourHealth = 0;
        }
    } else if ( y === 'counter' && c === 'counter') {
        res = "Both Len and the Creation took defensive stances. No damage dealt.";
    } else if ( y === 'attack' && c === 'counter') {
        res = 'The Creation took a defensive stance and prepares to counter.';
        counter(y, c);
    } else if ( y === 'counter' && c === 'attack') {
        res = 'Len took a defensive stance and prepares to counter.';
        counter(y, c);
    }
}

window.onload=enableButtons();


$(document).ready(function() {
    click();
    shuffle();
    animate();
    music(); 
    enableButtons();
});

barba.hooks.after(() => {
    click();
    shuffle();
    animate();
    music();
    enableButtons();
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
  }]
    
});
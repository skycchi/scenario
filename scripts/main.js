//0 = Len
//1 = Gabriel
//2 = Mira

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
    music.volume = 0.5;
}

//Global Variables
var player;
var player2;
var player3;
var enemy;


//Sound effects
var attackhit = new Audio("/music/sound effects/attackhit.mp3");
var damagetaken = new Audio("/music/sound effects/damagetaken.mp3");
var healentity = new Audio("/music/sound effects/heal.mp3");
var creationhit = new Audio("/music/sound effects/creation.mp3");
var criticalhit = new Audio("/music/sound effects/critical.mp3");
var protection = new Audio("/music/sound effects/protection.mp3");

//Important Elements
var playerhealth;
var playerhealth2;
var playerhealth3;
var playerstamina;
var playerstamina2;
var playerstamina3;
var enemyhealth;
var battlenotes;
var attacklist;
var attacklist2;
var attacklist3;

//Attack List (JSON defining all attacks for all class types)
var attacks = {
    //Player Classes
    'Len': ['Stab', 'Acceleration', 'Heal Len'],
    'Gabriel': ['Shoot', 'Precision', 'Heal Gabriel'],
    'Mira': ['Slash', 'Protection', 'Heal Mira'],

    //Enemies
    'Creation':['God Hand','Radiance','Dodge'],
    'Higher Creation':['God Hand','Radiance','Memento Mori'],
    'Protector':['Slash', 'Protection', 'Heal'],
    'Creator':['Creation','Devastation','Annihilation'],
};

//Make Attack Buttons
var makeattacks = function() {
    var thearray = attacks[player];
    for(var i=0;i<thearray.length;i++){
        makebutton(thearray[i]);
    }
}

var makeattacks2 = function() {
    var thearray = attacks[player2];
    for(var i=0;i<thearray.length;i++){
        makebutton2(thearray[i]);
    }
}

var makeattacks3 = function() {
    var thearray = attacks[player3];
    for(var i=0;i<thearray.length;i++){
        makebutton3(thearray[i]);
    }
}

//Health Values
var playerhp = 100;
var playerhp2 = 100;
var playerhp3 = 100;
var playersp = 100;
var playersp2 = 100;
var playersp3 = 100;
if(window.location.pathname == '/pages/thecreator.html') {
    var enemyhp = 500;
}
else{
    var enemyhp = 100;
}
var enemysp = 100;
var enemyheal = 10;
if(window.location.pathname == '/pages/page6.html' || window.location.pathname == '/pages/page9.html') {
    var healsleft = 20;
}

else if(window.location.pathname == '/pages/theprotector.html') {
    var healsleft = 10;
}

else{
    var healsleft = 30;
}


//Defend Flags
var playerdefend = 0;
var playerdefend2 = 0;
var playerdefend3 = 0;
var enemydefend = 0;

//Update player health
var updatephealth = function(v) {
    if(v<0) {
        if(playerdefend==1) {v = 0}
        if(playerdefend==2) {if(Math.random() > 0.5) v = 0;}
        var t = "Dealt " + Math.abs(v) + " damage.";
        if(playerdefend===1) t+=" "+player3+" defends the attack!";
        if(playerdefend===2&&v!==0) t+=" "+player+" attempts to dodge, but fails!";
        if(playerdefend===2&&v===0) t+=" "+player+" successfully dodges the attack!";
        playerdefend = 0;
    }
    playerhp += v;
    if(playerhp<0) playerhp = 0;
    if(playerhp>100) playerhp = 100;
    playerhealth.text(playerhp);
    return t;
}

//Update player health 2
var updatephealth2 = function(v) {
    if(v<0) {
        if(playerdefend2==1) {v = 0}
        if(playerdefend2==2) {if(Math.random() > 0.5) v = 0;}
        var t = "Dealt " + Math.abs(v) + " damage.";
        if(playerdefend2===1) t+=" "+player3+" defends the attack!";
        if(playerdefend2===2&&v!==0) t+=" "+player2+" attempts to dodge, but fails!";
        if(playerdefend2===2&&v===0) t+=" "+player2+" successfully dodges the attack!";
        playerdefend2 = 0;
    }
    playerhp2 += v;
    if(playerhp2<0) playerhp2 = 0;
    if(playerhp2>100) playerhp2 = 100;
    playerhealth2.text(playerhp2);
    return t;
}

//Update player health 3
var updatephealth3 = function(v) {
    if(v<0) {
        if(playerdefend3==1) {v = 0}
        if(playerdefend3==2) {if(Math.random() > 0.5) v = 0;}
        var t = "Dealt " + Math.abs(v) + " damage.";
        if(playerdefend3===1) t+=" "+player3+" defends the attack!";
        if(playerdefend3===2&&v!==0) t+=" "+player3+" attempts to dodge, but fails!";
        if(playerdefend3===2&&v===0) t+=" "+player3+" successfully dodges the attack!";
        playerdefend3 = 0;
    }
    playerhp3 += v;
    if(playerhp3<0) playerhp3 = 0;
    if(playerhp3>100) playerhp3 = 100;
    playerhealth3.text(playerhp3);
    return t;
}

//Update enemy health
var updateehealth = function(v) {
    if(v<0) {
        if(enemydefend==1) {v = 0}
        if(enemydefend==2) {if(Math.random() > 0.5) v = 0;}
        var t = "Dealt " + Math.abs(v) + " damage.";
        if(enemydefend===1) t+=" The "+enemy+" defends the attack!";
        if(enemydefend===2&&v!==0) t+=" The "+enemy+" attempts to dodge, but fails!";
        if(enemydefend===2&&v===0) t+=" The "+enemy+" successfully dodges the attack!";
        enemydefend = 0;
    }
    enemyhp += v;
    if(enemyhp<0) enemyhp = 0;
    if(window.location.pathname == '/pages/thecreator.html') {
        if(enemyhp>500) enemyhp = 500;
    }
    else{
        if(enemyhp>100) enemyhp = 100;
    }
    
    enemyhealth.text(enemyhp);
    return t;
}

var updateheals = function(){
    $("#heals").text(healsleft);
}

//Update Battle Notes
var updatenotes = function(t) {
    battlenotes.text(t);
}

//Pick a random enemy move
var pickenemymove = function() {
    var thearray = attacks[enemy];
    return thearray[Math.floor(Math.random()*thearray.length)];
}

//Handle all button presses
var buttonpress = function(t) {

    //Remove Buttons
    attacklist.empty();
    attacklist2.empty();
    attacklist3.empty();

    //Check Health
    if(enemyhp===0) {
        if(window.location.pathname == '/pages/theprotector.html') {
            updatenotes(player+" wins the battle! "+player+ " gains 1 level and 100 points. HP and SP are automatically restored! " + player+ " gains extra points from defeating a human!");
        }
        else if(window.location.pathname == '/pages/page6.html' || window.location.pathname == '/pages/page9.html'){
            updatenotes(player2+" and "+player+" win the battle! Both gain 1 level and 100 points. HP and SP are automatically restored!");
        }
        else{
            updatenotes(player2+", "+player+", and "+ player3 +" win the battle! Each gain 1 level and 100 points. HP and SP are automatically restored!");
        }
        $(".arrowright").css('visibility', 'visible');
        $(".spritewrap").fadeOut();
        enemyhp = 100;
        return
    }
    if(playerhp===0) {
        updatenotes(player+" died! Game over.");
        return
    }
    if(playerhp2===0) {
        updatenotes(player2+" died! Game over.");
        return
    }
    if(playerhp3===0) {
        updatenotes(player3+" died! Game over.");
        return
    }

    //Continue
    if(t==="Continue") {

        //Pick enemy moves
        t = pickenemymove();

        //Smarter AI
        while( (enemydefend>0&&(t==="Dodge"||t==="Defend")) || (enemyhp===100&&t==="Heal") )
            t = pickenemymove();

        //Enemy moves
        if(t==="Devastation") {
            if(Math.floor(Math.random() * 3) === 0){
                if(Math.random() > 0.75){
                    updatenotes("The "+enemy+" uses Devastation. "+updatephealth(-50 +Math.floor(Math.random()*30-15) ));
                    creationhit.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Devastation, and misses.");
                }
            }
            else if(Math.floor(Math.random() * 3) === 1){
                if(Math.random() > 0.75){
                    updatenotes("The "+enemy+" uses Devastation. "+updatephealth2(-50 +Math.floor(Math.random()*30-15) ));
                    creationhit.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Devastation, and misses.");
                }
            }
            else{
                if(Math.random() > 0.75){
                    updatenotes("The "+enemy+" uses Devastation. "+updatephealth3(-50 +Math.floor(Math.random()*30-15) ));
                    creationhit.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Devastation, and misses.");
                }
            }
        }
        
        if(t==="Slash") {
            updatenotes("The "+ enemy + " uses Slash. "+updatephealth(-20 +Math.floor(Math.random()*20-10) ));
            attackhit.play();
        }
        if(t==="Stab") {
            if(Math.random() > 0.25)
                updatenotes("The "+enemy+" uses Stab. "+updatephealth(-40 +Math.floor(Math.random()*30-15) ));
            else
                updatenotes("The "+enemy+" uses Stab, and misses.");
        }
        if(t==="Shoot") {
            if(Math.random() > 0.25)
                updatenotes("The "+enemy+" uses Shoot. "+updatephealth(-30 +Math.floor(Math.random()*30-15) ));
            else
                updatenotes("The "+enemy+" uses Shoot, and misses.");
        }
        if(t==="Dodge") {
            updatenotes("The "+enemy+" prepares to dodge an attack.");
            enemydefend=2;
        }
        if(t==="Protection") {
            if(enemysp === 0){
                updatenotes("The "+enemy+" prepares to Protect, but fails!");
            }
            else{
                updatenotes("The "+enemy+" prepares to Protect!");
                enemydefend=1;
                enemysp -= 10;
                protection.play();
            }
        }
        if(t==="Radiance") {
            if(Math.floor(Math.random() * 2) === 0){
                if(Math.random() > 0.75){
                    updatenotes("The "+enemy+" uses Radiance. "+updatephealth(-30 +Math.floor(Math.random()*30-15) ));
                    damagetaken.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Radiance, and misses.");
                }
            }
            else{
                if(Math.random() > 0.75){
                    updatenotes("The "+enemy+" uses Radiance. "+updatephealth2(-30 +Math.floor(Math.random()*30-15) ));
                    damagetaken.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Radiance, and misses.");
                }
            }
        }
        if(t==="God Hand") {
            if(Math.floor(Math.random() * 2) === 0){
                if(Math.random() > 0.25){
                    updatenotes("The "+enemy+" uses God Hand. "+updatephealth(-50 +Math.floor(Math.random()*40-20) ));
                    damagetaken.play();
                }
                 else{
                    updatenotes("The "+enemy+" uses God Hand, and misses.");
                 }
            }
            else{
                if(Math.random() > 0.25){
                    updatenotes("The "+enemy+" uses God Hand. "+updatephealth2(-50 +Math.floor(Math.random()*40-20) ));
                    damagetaken.play();
                }
                else{
                    updatenotes("The "+enemy+" uses God Hand, and misses.");
                }
            }
        }
        if(t==="Heal") {
            if(enemyheal === 0){
                updatenotes("The "+enemy+" uses Heal, but fails!");
            }
            else{
                var heal = 50;
                updatenotes("The "+enemy+" uses Heal, and recovers "+heal+" HP!");
                enemyheal -= 1;
                healentity.play();
                updateehealth(heal);
            }
        }
        if(t==="Creation") {
            var heal = 50;
            updatenotes("The "+enemy+" uses Creation, and recovers "+heal+" HP!");
            healentity.play();
            updateehealth(heal);
        }
        if(t==="Memento Mori") {
            if(Math.floor(Math.random() * 2) === 0){
                if(Math.random() > 0.10){
                    updatenotes("The "+enemy+" uses Memento Mori. "+updatephealth(-60 +Math.floor(Math.random()*30-15) ));
                    damagetaken.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Memento Mori, and misses.");
                }
            }
            else{
                if(Math.random() > 0.10){
                    updatenotes("The "+enemy+" uses Memento Mori. "+updatephealth2(-60 +Math.floor(Math.random()*30-15) ));
                    damagetaken.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Memento Mori, and misses.");
                }
            }
        }
        if(t==="Annihilation") {
            if(Math.floor(Math.random() * 3) === 0){
                if(Math.random() > 0.10){
                    updatenotes("The "+enemy+" uses Annhilation. "+updatephealth(-80 +Math.floor(Math.random()*30-15) ));
                    creationhit.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Annhilation, and misses.");
                }
            }
            else if(Math.floor(Math.random() * 3) === 1){
                if(Math.random() > 0.10){
                    updatenotes("The "+enemy+" uses Annhilation. "+updatephealth2(-80 +Math.floor(Math.random()*30-15) ));
                    creationhit.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Annhilation, and misses.");
                }
            }
            else{
                if(Math.random() > 0.10){
                    updatenotes("The "+enemy+" uses Annhilation. "+updatephealth3(-80 +Math.floor(Math.random()*30-15) ));
                    creationhit.play();
                }
                else{
                    updatenotes("The "+enemy+" uses Annhilation, and misses.");
                }
            }
        }
        if(playerhp>0)
            makeattacks();
        if(playerhp2>0)
            makeattacks2();
        if(playerhp3>0)
            makeattacks3();
        else
            makebutton("Continue");
    }
    
    //Player moves
    else {
        if(t==="Protection") {
            if(playersp3>0){
                updatenotes(player3+" prepares to Protect!");
                playersp3 -= 10;
                playerdefend = 1;
                playerdefend2 = 1;
                playerdefend3 = 1;
                protection.play();
                playerstamina3.text(playersp3);
            }
            else{
                updatenotes('SP is too low to use Protection!');
            }
        }
        if(t==="Slash") {
            updatenotes(player3+" uses Slash. "+updateehealth(-20 +Math.floor(Math.random()*20-10) ));
            attackhit.play();
        }
        if(t==="Stab") {
            if(Math.random() > 0.5)
                updatenotes(player+" uses Stab. "+updateehealth(-40 +Math.floor(Math.random()*30-15) ));
            else
                updatenotes(player+" uses Stab, and misses.");
        }
        if(t==="Shoot") {
            if(Math.random() > 0.25){
                updatenotes(player2+" uses Shoot. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
                attackhit.play();
            }
            else{
                updatenotes(player2+" uses Shoot, and misses.");
            }
        }
        if(t==="Precision") {
            if(playersp2>0){
                updatenotes(player2+" uses Precision. A critical hit! "+updateehealth(-50 +Math.floor(Math.random()*30-15) ));
                criticalhit.play();
                playersp2 -= 10;
                playerstamina2.text(playersp2);
            }
            else
                updatenotes('SP is too low to use Precision!');
        }
        if(t==="Acceleration") {
            if(playersp>0){
                updatenotes(player+" uses Acceleration. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
                attackhit.play();
                playersp -= 10;
                playerstamina.text(playersp);
            }
            else
                updatenotes('SP is too low to use Acceleration!');
        }
        if(t==="Dodge") {
            updatenotes(player+" prepares to dodge an attack.");
            playerdefend=2;
        }
        if(t==="Defend") {
            updatenotes(player2+" prepares to defend an attack.");
            playerdefend2=1;
        }
        if(t==="Fireball") {
            if(Math.random() > 0.25)
                updatenotes(player+" uses Fireball. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
            else
                updatenotes(player+" uses Fireball, and misses.");
        }
        if(t==="Thunder") {
            if(Math.random() > 0.75)
                updatenotes(player+" uses Thunder. "+updateehealth(-50 +Math.floor(Math.random()*40-20) ));
            else
                updatenotes(player+" uses Thunder, and misses.");
        }
        if(t==="Heal Gabriel"){
            if(heals<=0){
                updatenotes("Out of Heals!")
            }
            else{
                var heal = 50;
                updatenotes(player2+" uses Heal, and recovered "+heal+" HP!");
                healentity.play();
                updatephealth2(heal);
                healsleft -= 1;
                updateheals(healsleft);
            }
        }
        if(t==="Heal Len"){
            if(heals<=0){
                updatenotes("Out of Heals!")
            }
            else{
                var heal = 50;
                updatenotes(player+" uses Heal, and recovered "+heal+" HP!");
                healentity.play();
                updatephealth(heal);
                healsleft -= 1;
                updateheals(healsleft);
            }
        }
        if(t==="Heal Mira"){
            if(heals<=0){
                updatenotes("Out of Heals!")
            }
            else{
                var heal = 50;
                updatenotes(player3+" uses Heal, and recovered "+heal+" HP!");
                healentity.play();
                updatephealth3(heal);
                healsleft -= 1;
                updateheals(healsleft);
            }
        }
        makebutton("Continue");
    }
}

//Make Button
var makebutton = function(t) {
    var button = $('<button/>',{
        text: t,
        click: function () { buttonpress(t); }
    });
    attacklist.append(button);
};

var makebutton2 = function(t) {
    var button = $('<button/>',{
        text: t,
        click: function () { buttonpress(t); }
    });
    attacklist2.append(button);
};

var makebutton3 = function(t) {
    var button = $('<button/>',{
        text: t,
        click: function () { buttonpress(t); }
    });
    attacklist3.append(button);
};


var cookie = 0;

function addOne(){
    cookie++;
    localStorage.setItem("cookie", cookie);
    console.log(localStorage.getItem("cookie"));
}

function subOne(){
    cookie--;
    localStorage.setItem("cookie", cookie);
    console.log(localStorage.getItem("cookie"));
}

$(document).ready(function() {
    click();
    
    //Get arguments
    player = "Len";
    player2 = "Gabriel";
    player3 = "Mira";
    
    if(window.location.pathname == '/pages/theprotector.html') {
        enemy = "Protector";
    }
    if(window.location.pathname == '/pages/thecreator.html') {
        enemy = "Creator";
    }
    else{
        enemy = "Creation";
    }

    //Get important elements
    playerhealth = $("#playerhealth");
    playerhealth2 = $("#playerhealth2");
    playerhealth3 = $("#playerhealth3");
    playerstamina = $("#playerstamina");
    playerstamina2 = $("#playerstamina2");
    playerstamina3 = $("#playerstamina3");
    enemyhealth = $("#enemyhealth");
    battlenotes = $("#battlenotes");
    attacklist = $("#attacklist");
    attacklist2 = $("#attacklist2");
    attacklist3 = $("#attacklist3");

    //Update text
    $("#playertitle").text(player);
    $("#playertitle2").text(player2);
    $("#playertitle3").text(player3);
    $("#enemytitle").text(enemy);
    
    makeattacks();
    makeattacks2();
    makeattacks3();
    shuffle();
    animate();
    music(); 
});

barba.hooks.after(() => {
    click();
    
    //Get arguments
    player = "Len";
    player2 = "Gabriel";
    player3 = "Mira";
    
    if(window.location.pathname == '/pages/theprotector.html') {
        enemy = "Protector";
    }
    if(window.location.pathname == '/pages/thecreator.html') {
        enemy = "Creator";
    }
    else{
        enemy = "Creation";
    }

    //Get important elements
    playerhealth = $("#playerhealth");
    playerhealth2 = $("#playerhealth2");
    playerhealth3 = $("#playerhealth3");
    playerstamina = $("#playerstamina");
    playerstamina2 = $("#playerstamina2");
    playerstamina3 = $("#playerstamina3");
    enemyhealth = $("#enemyhealth");
    battlenotes = $("#battlenotes");
    attacklist = $("#attacklist");
    attacklist2 = $("#attacklist2");
    attacklist3 = $("#attacklist3");
    
    //Update text
    $("#playertitle").text(player);
    $("#playertitle2").text(player2);
    $("#playertitle3").text(player3);
    $("#enemytitle").text(enemy);
    
    makeattacks();
    makeattacks2();
    makeattacks3();
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

function addMoon(){
    $('#moon').addClass('moon');
}
setInterval(addMoon, 35000);

barba.init({
   prevent: ({ el }) => el.classList && el.classList.contains('prevent'),
    transitions: [{
    name: 'opacity-transition',
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
    
});
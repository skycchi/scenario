function init(){
//Global Variables
    var player;
    var player2;
    var enemy;

    //Important Elements
    var playerhealth;
    var playerhealth2;
    var playerstamina;
    var playerstamina2;
    var enemyhealth;
    var battlenotes;
    var attacklist;
    var attacklist2;
    
    var lenlevel = 1;
    var lenpoints = 0;
    var gabriellevel = 1;
    var gabrielpoints= = 0;

    //Attack List (JSON defining all attacks for all class types)
    var attacks = {
        //Player Classes
        'Len': ['Slash','Stab','Acceleration'],
        'Gabriel': ['Shoot','Defend','Precision'],

        //Enemies
        'Creation':['God Hand','Radiance','Dodge'],
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

    //Health Values
    var playerhp = 100;
    var playerhp2 = 100;
    var playersp = 100;
    var playersp2 = 100;
    var enemyhp = 100;

    //Defend Flags
    var playerdefend = 0;
    var playerdefend2 = 0;
    var enemydefend = 0;

    //Update player health
    var updatephealth = function(v) {
        if(v<0) {
            if(playerdefend==1) {v = Math.floor(v/4)}
            if(playerdefend==2) {if(Math.random() > 0.5) v = 0;}
            var t = "Dealt " + Math.abs(v) + " damage.";
            if(playerdefend===1) t+=" "+player+" defends the attack!";
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
            if(playerdefend2==1) {v = Math.floor(v/4)}
            if(playerdefend2==2) {if(Math.random() > 0.5) v = 0;}
            var t = "Dealt " + Math.abs(v) + " damage.";
            if(playerdefend2===1) t+=" "+player2+" defends the attack!";
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

    //Update enemy health
    var updateehealth = function(v) {
        if(v<0) {
            if(enemydefend==1) {v = Math.floor(v/4)}
            if(enemydefend==2) {if(Math.random() > 0.5) v = 0;}
            var t = "Dealt " + Math.abs(v) + " damage.";
            if(enemydefend===1) t+=" The "+enemy+" defends the attack!";
            if(enemydefend===2&&v!==0) t+=" The "+enemy+" attempts to dodge, but fails!";
            if(enemydefend===2&&v===0) t+=" The "+enemy+" successfully dodges the attack!";
            enemydefend = 0;
        }
        enemyhp += v;
        if(enemyhp<0) enemyhp = 0;
        if(enemyhp>100) enemyhp = 100;
        enemyhealth.text(enemyhp);
        return t;
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

        //Check Health
        if(enemyhp===0) {
            updatenotes(player+" wins the battle! Len gains 1 level and 100 points.");
            lenlevel += 1;
            lenpoints += 100;
            return
        }
        if(playerhp===0) {
            updatenotes(player+" died!");
            return
        }
        if(playerhp2===0) {
            updatenotes(player2+" died!");
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
            if(t==="Slash") {
                updatenotes("The "+enemy+" uses Slash. "+updatephealth(-20 +Math.floor(Math.random()*20-10) ));
            }
            if(t==="Stab") {
                if(Math.random() > 0.5)
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
            if(t==="Defend") {
                updatenotes("The "+enemy+" prepares to defend an attack.");
                enemydefend=1;
            }
            if(t==="Radiance") {
                if(Math.floor(Math.random() * 2) === 0){
                    if(Math.random() > 0.25)
                        updatenotes("The "+enemy+" uses Radiance. "+updatephealth(-30 +Math.floor(Math.random()*30-15) ));
                    else
                        updatenotes("The "+enemy+" uses Radiance, and misses.");
                }
                else{
                    if(Math.random() > 0.25)
                        updatenotes("The "+enemy+" uses Radiance. "+updatephealth2(-30 +Math.floor(Math.random()*30-15) ));
                    else
                        updatenotes("The "+enemy+" uses Radiance, and misses.");
                }
            }
            if(t==="God Hand") {
                if(Math.floor(Math.random() * 2) === 0){
                    if(Math.random() > 0.75)
                        updatenotes("The "+enemy+" uses God Hand. "+updatephealth(-50 +Math.floor(Math.random()*40-20) ));
                     else
                        updatenotes("The "+enemy+" uses God Hand, and misses.");
                }
                else{
                    if(Math.random() > 0.75)
                    updatenotes("The "+enemy+" uses God Hand. "+updatephealth2(-50 +Math.floor(Math.random()*40-20) ));
                else
                    updatenotes("The "+enemy+" uses God Hand, and misses.");
                }


            }
            if(t==="Heal") {
                var heal = 20;
                updatenotes("The "+enemy+" uses Heal, and recovered "+heal+" HP!");
                updateehealth(heal);
            }
            if(t==="Dark Arts") {
                if(Math.random() > 0.85)
                    updatenotes("The "+enemy+" uses Dark Arts. "+updatephealth(-80 +Math.floor(Math.random()*300-150) ));
                else
                    updatenotes("The "+enemy+" uses Dark Arts, and misses.");
            }
            if(playerhp>0)
                makeattacks();
            if(playerhp2>0)
                makeattacks2();
            else
                makebutton("Continue");
        }

        //Player moves
        else {
            if(t==="Slash") {
                updatenotes(player+" uses Slash. "+updateehealth(-20 +Math.floor(Math.random()*20-10) ));
            }
            if(t==="Stab") {
                if(Math.random() > 0.5)
                    updatenotes(player+" uses Stab. "+updateehealth(-40 +Math.floor(Math.random()*30-15) ));
                else
                    updatenotes(player+" uses Stab, and misses.");
            }
            if(t==="Shoot") {
                if(Math.random() > 0.25)
                    updatenotes(player2+" uses Shoot. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
                else
                    updatenotes(player2+" uses Shoot, and misses.");
            }
            if(t==="Precision") {
                if(playersp2>0){
                    updatenotes(player2+" uses Precision. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
                    playersp2 -= 20;
                    playerstamina2.text(playersp2);
                }
                else
                    updatenotes('SP is too low to use Precision!');
            }
            if(t==="Acceleration") {
                if(playersp>0){
                    updatenotes(player+" uses Acceleration. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
                    playersp -= 20;
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
            if(t==="Heal") {
                var heal = 20;
                updatenotes(player+" uses Heal, and recovered "+heal+" HP!");
                updatephealth(heal);
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

    //Ready
    $( document ).ready(function() {

        //Get arguments
        player = "Len";
        player2 = "Gabriel";
        enemy = "Creation";

        //Get important elements
        playerhealth = $("#playerhealth");
        playerhealth2 = $("#playerhealth2");
        playerstamina = $("#playerstamina");
        playerstamina2 = $("#playerstamina2");
        enemyhealth = $("#enemyhealth");
        battlenotes = $("#battlenotes");
        attacklist = $("#attacklist");
        attacklist2 = $("#attacklist2");

        //Update text
        $("#playertitle").text(player);
        $("#playertitle2").text(player2);
        $("#enemytitle").text(enemy);

        //Begin battle
        makeattacks();
        makeattacks2();

    });
}

init();
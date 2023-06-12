//Global Variables
var player;
var enemy;

//Important Elements
var playerhealth;
var enemyhealth;
var battlenotes;
var attacklist;

//Attack List (JSON defining all attacks for all class types)
var attacks = {
	//Player Classes
	'Len': ['Slash','Stab','Dodge'],
	'Gabriel': ['Shoot','Defend','Dodge'],

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

//Health Values
var playerhp = 100;
var enemyhp = 100;

//Defend Flags
var playerdefend = 0;
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
	
	//Check Health
	if(enemyhp===0) {
		updatenotes(player+" wins the battle! Len gains 1 level and 100 points.");
		return
	}
	if(playerhp===0) {
		updatenotes(player+" died!");
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
			if(Math.random() > 0.25)
				updatenotes("The "+enemy+" uses Radiance. "+updatephealth(-30 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes("The "+enemy+" uses Radiance, and misses.");
		}
		if(t==="God Hand") {
			if(Math.random() > 0.75)
				updatenotes("The "+enemy+" uses God Hand. "+updatephealth(-50 +Math.floor(Math.random()*40-20) ));
			else
				updatenotes("The "+enemy+" uses God Hand, and misses.");
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
				updatenotes(player+" uses Shoot. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(player+" uses Shoot, and misses.");
		}
		if(t==="Dodge") {
			updatenotes(player+" prepares to dodge an attack.");
			playerdefend=2;
		}
		if(t==="Defend") {
			updatenotes(player+" prepares to defend an attack.");
			playerdefend=1;
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

//Ready
$( document ).ready(function() {
	
	//Get arguments
	player = "Len";
    player2 = "Gabriel";
	enemy = "Creation";
	
	//Get important elements
	playerhealth = $("#playerhealth");
    playerhealth2 = $("#playerhealth2");
	enemyhealth = $("#enemyhealth");
	battlenotes = $("#battlenotes");
	attacklist = $("#attacklist");
	
	//Update text
	$("#playertitle").text(player);
    $("#playertitle2").text(player2);
	$("#enemytitle").text(enemy);
	
	//Begin battle
	makeattacks();
	
});
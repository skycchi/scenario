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
	'Creation':['Slash','Dodge','Heal'],
};

//Make Attack Buttons
var makeattacks = function() {
	var thearray = attacks[player];
	for(var i=0;i<thearray.length;i++)
		makebutton(thearray[i]);
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
		if(playerdefend==1) {v = Math.floor(v/4)};
		if(playerdefend==2) {if(Math.random() > 0.5) v = 0;}
		var t = "Dealt " + Math.abs(v) + " damage.";
		if(playerdefend===1) t+=" "+player+" defended the attack!";
		if(playerdefend===2&&v!==0) t+=" "+player+" attempted to dodge, but failed!";
		if(playerdefend===2&&v===0) t+=" "+player+" successfully dodged the attack!";
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
		if(enemydefend==1) {v = Math.floor(v/4)};
		if(enemydefend==2) {if(Math.random() > 0.5) v = 0;}
		var t = "Dealt " + Math.abs(v) + " damage.";
		if(enemydefend===1) t+="The "+enemy+" defended the attack!";
		if(enemydefend===2&&v!==0) t+="The "+enemy+" attempted to dodge, but failed!";
		if(enemydefend===2&&v===0) t+="The "+enemy+" successfully dodged the attack!";
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
			updatenotes("The "+enemy+" used Slash. "+updatephealth(-20 +Math.floor(Math.random()*20-10) ));
		}
		if(t==="Stab") {
			if(Math.random() > 0.5)
				updatenotes("The "+enemy+" used Stab. "+updatephealth(-40 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes("The "+enemy+" used Stab, and missed.");
		}
		if(t==="Shoot") {
			if(Math.random() > 0.25)
				updatenotes("The "+enemy+" used Shoot. "+updatephealth(-30 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes("The "+enemy+" used Shoot, and missed.");
		}
		if(t==="Dodge") {
			updatenotes("The "+enemy+" prepares to dodge an attack.");
			enemydefend=2;
		}
		if(t==="Defend") {
			updatenotes("The "+enemy+" prepares to defend an attack.");
			enemydefend=1;
		}
		if(t==="Fireball") {
			if(Math.random() > 0.25)
				updatenotes("The "+enemy+" used Fireball. "+updatephealth(-30 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes("The "+enemy+" used Fireball, and missed.");
		}
		if(t==="Thunder") {
			if(Math.random() > 0.75)
				updatenotes("The "+enemy+" used Thunder. "+updatephealth(-50 +Math.floor(Math.random()*40-20) ));
			else
				updatenotes("The "+enemy+" used Thunder, and missed.");
		}
		if(t==="Heal") {
			var heal = 20;
			updatenotes("The "+enemy+" used Heal, and recovered "+heal+" HP!");
			updateehealth(heal);
		}
		if(t==="Dark Arts") {
			if(Math.random() > 0.85)
				updatenotes("The "+enemy+" used Dark Arts. "+updatephealth(-80 +Math.floor(Math.random()*300-150) ));
			else
				updatenotes("The "+enemy+" used Dark Arts, and missed.");
		}
		if(playerhp>0)
			makeattacks();
		else
			makebutton("Continue");
	}
	
	//Player moves
	else {
		if(t==="Slash") {
			updatenotes(player+" used Slash. "+updateehealth(-20 +Math.floor(Math.random()*20-10) ));
		}
		if(t==="Stab") {
			if(Math.random() > 0.5)
				updatenotes(player+" used Stab. "+updateehealth(-40 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(player+" used Stab, and missed.");
		}
		if(t==="Shoot") {
			if(Math.random() > 0.25)
				updatenotes(player+" used Shoot. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(player+" used Shoot, and missed.");
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
				updatenotes(player+" used Fireball. "+updateehealth(-30 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(player+" used Fireball, and missed.");
		}
		if(t==="Thunder") {
			if(Math.random() > 0.75)
				updatenotes(player+" used Thunder. "+updateehealth(-50 +Math.floor(Math.random()*40-20) ));
			else
				updatenotes(player+" used Thunder, and missed.");
		}
		if(t==="Heal") {
			var heal = 20;
			updatenotes(player+" used Heal, and recovered "+heal+" HP!");
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
	}).addClass("btn btn-lg btn-default");
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
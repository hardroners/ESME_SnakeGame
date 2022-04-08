//fonction permettant de placer tous les sprites sprite
function Sprite(filename, abs,ord,size){
	this._node = document.createElement("img"); // les annontations _node sont des variables privées ou locales
	this._node.src = filename;
	this._node.id = filename;
	this._node.style.position="absolute";
	this._node.style.height=size + "px";
	this._node.style.width="auto";
	document.body.appendChild(this._node);

//implémentation des sprties en dynamique
//defineProperty contient un getter et un setter pour mettre à jour les variables dynamiquement
//Ici abs correspond à l'abscisse de notre sprite
	Object.defineProperty(this, "left", {
		get: function(){ //getter récupérant la valeur en abscisse
			return this._abs;
		},
		set: function(x){ //setter imposant une nouvelle valeur x
			this._abs= x;
			this._node.style.left = this._abs+"px";
		}
	});

// meme chose en ordonnée
	Object.defineProperty(this, "top", {
		get: function(){ //getter récupérant la valeur en ordonnée
			return this._ord;
		},
		set: function(y){ //setter imposant une nouvelle valeur y
			this._ord = y;
			this._node.style.top= this._ord+"px";
		}
	});
// ce dernier est pour l'implémentation du missile il ne sera pas appelé dans les autres cas
	Object.defineProperty(this,"display", {
		get: function(){
			return this._node.style.display;
		},
		set: function(value){
			this._ord=value;
			this._node.style.display=value;
		}
	});

	this.left= abs;
	this.top = ord;
	this.position = "absolute";
}

Sprite.prototype.checkCollision = function (other){
	return (( (this.top + this._node.height) > other.top) && (this.top<(other.top+other._node.height)) && ((this.left+this._node.width)>other.left) && (this.left<(other.left+other._node.width)))
}
var armyRows = 15;
var armyColumns = 7;
var idMissile = null;
var idAlien = null;
var music = document.getElementById("music");
var lasersound = document.getElementById("lasersound");
var explosionsound = document.getElementById("explosionsound");
//positionnement des sprites


let vaisseau = new Sprite("images/vaisseau.png", document.body.clientWidth/2, 3*document.body.clientHeight/4,60);


let alien = [];
createAlien();

// for (var k =0;k < alien.length; k++){
// 	alienMoveLeft(alien[k]);
// }


function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}
let missile = new Sprite("images/laser.png", vaisseau.left + vaisseau._node.width/3,vaisseau.top,50);
missile.display = "none";

function createAlien(){
	for (let i = 0; i < armyRows; i++) {
		for(let j = 0; j < armyColumns; j++){
			let alien1 = new Sprite("images/invader.png",i*document.body.clientWidth/20,j* document.body.clientHeight/12,40);
			alien.push(alien1);
			alienMoveRight(alien1);
		}
	}
	return alien;
}



let vitesse = 1;
function alienMoveRight(alien){
	// clearInterval(frame);
	idAlien = setInterval(frame, 10);
	function frame(){
			if (alien.left > document.body.clientWidth - 100){
				alien.top += 20;
				alienMoveLeft(alien);
				// clearInterval(frame);
			} else {
				alien.left += vitesse;

				//clearInterval(id);
			}
	}
}


function alienMoveLeft(alien){
	// clearInterval(frame);
	idAlien = setInterval(frame, 10);
	function frame(){
		if (alien.left < 0){
			alien.top += 20;
			alienMoveRight(alien);
			// clearInterval(frame);
		} else {
			alien.left -= vitesse;
			clearInterval(frame);
			//clearInterval(id);
		}
	}
}


function myMove(missile) {
	var pos = vaisseau.top;
	missile.display = "block";
  idMissile = setInterval(frame, 10);
	function frame() { // fonction rafraissiant l'animation du missile
		for (let j = 0;j < alien.length;j++){
			if(missile.checkCollision(alien[j]) && missile.display == "block" ){ //verifier la collision avec un missile et un alien
				alien[j].position = "fixed";
				clearInterval(idMissile);
				missile.display = "none";
				alien[j].display = "none";
				// clearInterval(idAlien);
				console.log(alien.length);
				explosionsound.play();
				alien.splice(j,1);
			}
		} if (missile.top < -1) {
				missile.display = "none";
				clearInterval(idMissile);
			} else {
			pos -= 10;
      missile.top = pos;
    }
}
}

//function qui détecte lorsque l'on appuie sur un bouton
document.onkeydown = function (event) {
	music.volume = 0.05;
	//  music.play();
	//console.log(event.keyCode);
	if (vaisseau.left >= 0 && vaisseau.left <= document.body.clientWidth - 100){
		switch (event.keyCode) {
		case 81: // touche Q
			vaisseau.left -= 20;
			break;
		case 37: // fleche de gauche
			vaisseau.left -= 20;
			break;
		case 68: // touche D
			vaisseau.left += 20;
			break;
		case 39: // fleche de droite
			vaisseau.left += 20;
			break;
		default:
	}
	if (event.keyCode == 32){
		if (missile.display == "none"){
			lasersound.play();
			missile.top = vaisseau.top - vaisseau._node.height /2;
			missile.left = vaisseau.left + vaisseau._node.width /3;
			myMove(missile);
		}
	}
} else if (vaisseau.left < 0) {
		vaisseau.left = 0;
	} else if (vaisseau.left > document.body.clientWidth - 100) {
		vaisseau.left = document.body.clientWidth - 100;
	}
}

// Z = 90, Q = 81, S = 83, D = 68, Space = 32;

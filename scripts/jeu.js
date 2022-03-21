//fonction permettant de placer tous les sprites sprite
function Sprite(filename, abs,ord,size){
	this._node = document.createElement("img"); // les annontations _node sont des variables privées ou locales
	this._node.src = filename;
	this._node.id = filename;
	this._node.style.position="absolute";
	this._node.style.height=size + "px";
	this._node.style.width="auto";
	console.log(filename + "    "+abs+"  "+ ord);
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
			this._node.style.left= this._abs+"px";
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
}



//positionnement des sprites
let alien1 = new Sprite("images/invader.png",2*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien2 = new Sprite("images/invader.png",3*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien3 = new Sprite("images/invader.png",4*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien4 = new Sprite("images/invader.png",5*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien5 = new Sprite("images/invader.png",6*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien6 = new Sprite("images/invader.png",7*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien7 = new Sprite("images/invader.png",8*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien8 = new Sprite("images/invader.png",9*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien9 = new Sprite("images/invader.png",10*document.body.clientWidth/16, document.body.clientHeight/4,60);
let alien10 = new Sprite("images/invader.png",2*document.body.clientWidth/16, 2*document.body.clientHeight/4,60);
let alien11 = new Sprite("images/invader.png",3*document.body.clientWidth/16, 2*document.body.clientHeight/4,60);
let alien12 = new Sprite("images/invader.png",4*document.body.clientWidth/16, 2*document.body.clientHeight/4,60);
let alien13 = new Sprite("images/invader.png",5*document.body.clientWidth/16, 2*document.body.clientHeight/4,60);
let alien14 = new Sprite("images/invader.png",6*document.body.clientWidth/16, 2*document.body.clientHeight/4,60);
let alien15 = new Sprite("images/invader.png",7*document.body.clientWidth/16, 2*document.body.clientHeight/4,60);
let alien16 = new Sprite("images/invader.png",8*document.body.clientWidth/16, 2*document.body.clientHeight/4,60);
let alien17 = new Sprite("images/invader.png",9*document.body.clientWidth/16, 2*document.body.clientHeight/4,60);

let vaisseau = new Sprite("images/vaisseau.png", document.body.clientWidth/2, 3*document.body.clientHeight/4,60);
// let missile = new Sprite("images/laser.png", vaisseau.left,vaisseau.top,50);
// missile.display = "none";


function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}


function createAlien(){
	let ramdompos = getRandomInt(1,16);
	let alien = new Sprite("images/invader.png",ramdompos*document.body.clientWidth/16, document.body.clientHeight/4,60);
	return alien;
}
var id = null;
function myMove() {
	let missile = new Sprite("images/laser.png", vaisseau.left,vaisseau.top,50);
	missile.display = "none";
	missile.left = vaisseau.left;
	var pos = vaisseau.top;
	missile.display = "block"
  // clearInterval(id);
  id = setInterval(frame, 10);
	function frame() {
    if (missile.top < -1 ) {
			missile.display = "none";
    } else if (missile.checkCollision(alien)) {
    	alien.display = "none";
    }
     else {
			// missile.display = "block";
			pos -= 10;
      missile.top = pos;
    }
	}
}

Sprite.prototype.checkCollision = function (other){
	return (( this.top + this._node.height > other.top) && (this.top<(other.top+other._node.height)) && (this.left+this._node.width>other.left) && (this.left<other.left+other._node.width))
}

//function qui détecte lorsque l'on appuie sur un bouton
document.onkeydown = function (event) {
	console.log(event.keyCode);
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
		myMove();

	}
} else if (vaisseau.left < 0) {
		vaisseau.left = 0;
	} else if (vaisseau.left > document.body.clientWidth - 100) {
		vaisseau.left = document.body.clientWidth - 100;
	}
	}

// Z = 90, Q = 81, S = 83, D = 68, Space = 32;

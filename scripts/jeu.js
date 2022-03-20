//fonction permettant de placer tous les sprites sprite
function Sprite(filename, abs,ord,size){
	this._node = document.createElement("img"); // les annontations _node sont des variables privées ou locales
	this._node.src = filename;
	this._node.style.position="absolute";
	this._node.style.height=size + "px";
	this._node.style.width="auto";
	console.log(filename + "    "+abs+"  "+ ord);
	// this._node.style.left=abs+"px";
	// this._node.style.top	=ord+"px";
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
let alien1 = new Sprite("images/invader.png",3*document.body.clientWidth/8, document.body.clientHeight/4,100);
let alien2 = new Sprite("images/invader.png",4*document.body.clientWidth/8, document.body.clientHeight/4,100);
let alien3 = new Sprite("images/invader.png",5*document.body.clientWidth/8, document.body.clientHeight/4,100);
let vaisseau = new Sprite("images/vaisseau.png", document.body.clientWidth/2, 3*document.body.clientHeight/4,100);
let missile = new Sprite("images/laser.png", vaisseau.left,vaisseau.top,50);
missile.display = "none";

var id = null;
function myMove(missile) {
	missile.display = "none";
	missile.left = vaisseau.left;
	var pos = vaisseau.top;
  clearInterval(id);
  id = setInterval(frame, 10);
	function frame() {
    if (pos == document.body.clientHeight) {
      clearInterval(id);
			missile.display = "none";
			myMove();
    } else {
			missile.display = "block";
			pos -= 10;
      missile.top = pos;
    }
  }
}

//function qui détecte lorsque l'on appuie sur un bouton
document.onkeydown = function (event) {
	console.log(event.keyCode);
	missile.display = "block";
	let _keyCode = event.keyCode;
	if (vaisseau.left >= 0 && vaisseau.left <= document.body.clientWidth - 100){
		switch (event.keyCode) {
		case 81: // touche Q
			vaisseau.left -= 10;
			break;
		case 37: // fleche de gauche
			vaisseau.left -= 10;
			break;
		case 68: // touche D
			vaisseau.left += 10;
			break;
		case 39: // fleche de droite
			vaisseau.left += 10;
			break;
		default:
	}
	if (_keyCode == 32){

		myMove(missile);
	}
} else if (vaisseau.left < 0) {
		vaisseau.left = 0;
	} else if (vaisseau.left > document.body.clientWidth - 100) {
		vaisseau.left = document.body.clientWidth - 100;
	}
	}

// Z = 90, Q = 81, S = 83, D = 68, Space = 32;

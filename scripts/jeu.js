//fonction permettant de placer tous les sprites sprite
function Sprite(filename, left,top){

	this._node = document.createElement("img");
	this._node.src = filename;
	this._node.style.position="absolute";
	this._node.style.height="100px";
	this._node.style.width="auto";
	// this._node.style.left=left+"px";
	// this._node.style.top=top+"px";
	document.body.appendChild(this._node);

  Object.defineProperty(this,"left", {
   get: function(){
		return this._left;
	},
	set: function(value){
		this._left=value;
		this._node.style.left=this._left+"px";
	}
	});

	Object.defineProperty(this,"top", {
	get: function(){
		return this._top;
	},
	set: function(value){
		this._top=value;
		this._node.style.top=this._top+"px";
	}
	});

	Object.defineProperty(this,"display", {
	get: function(){
		return this._node.style.display;
	},
	set: function(value){
		this._top=value;
		this._node.style.display=value;
	}
	});

	this.left=left;
	this.top = top;
}

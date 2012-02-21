function SetBrowserBindings(){
	document.onkeydown = function(e){
		var key = e.keyCode || e.which;
		if (GameContext.PressedKeys.indexOf(key) == -1) {
			GameContext.PressedKeys.push(key);
			console.log(GameContext.PressedKeys);	
		};	
	}
	
	document.onkeyup = function(e){
		var key = e.keyCode || e.which;
		GameContext.PressedKeys.pop(GameContext.PressedKeys.indexOf(key));
		console.log(GameContext.PressedKeys);	
	}
	
	window.onresize = function(){
		resizeCanvas();
	};		
};

function resizeCanvas(){
	GameContext.Canvas.width = window.innerWidth;
    GameContext.Canvas.height = window.innerHeight;
}

function setFullScreen(){
	var elem = document.getElementById("cnv");
		if (elem.requestFullScreen) {
		  elem.requestFullScreen();
		} else if (elem.mozRequestFullScreen) {
		  elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullScreen) {
		  elem.webkitRequestFullScreen();
		}
}

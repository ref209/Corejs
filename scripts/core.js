var GameContext = {
	KEYS: { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32 }, 
	PressedKeys: [],
	Canvas: null,
	Ctx: null,
	PreRenderCanvas: null,
	PreRenderCtx: null,
	FRAME_DURATION: 20
}

//TODO: Remove global variables
var player = null;

var spnFps = null;
var lwFPS = 100;
var fsFPS = 0;
var lastUpdate = 0;

window.onload = function(){
	
	spnFps = document.getElementById("spnFps");
	
	GameContext.Canvas = document.getElementById("cnv");
	GameContext.Ctx = GameContext.Canvas.getContext("2d");
	resizeCanvas();
	
	GameContext.PreRenderCanvas = document.getElementById("prCnv");
	GameContext.PreRenderCtx = document.getElementById("2d");
	
	SetBrowserBindings();
	
	Init(); 
	
	//setInterval(GameLoop, 20);
	Frame(GameContext.FRAME_DURATION);
}

function CalculateFPS(){
    if(lastUpdate == null) lastUpdate = 0;
    var now = Date.now();
    var elapsed = (now - lastUpdate);
    fps = Math.floor(1000/elapsed)
    
    if (lwFPS > fps) {
    	lwFPS = fps;	
    }
    if (fsFPS < fps) {
    	fsFPS = fps;	
    }
    
    lastUpdate = now;
}

function Frame(frameDuration){
	while(+new Date() - lastUpdate < frameDuration){
	//twiddle thumbs
	}
	
	lastUpdate = +new Date();
	
	GameLoop();
	
	//Trigger next frame
	
	setTimeout(function(){
		Frame(frameDuration);
	}, frameDuration / 2);
}

function GameLoop(){
	//CalculateFPS();
	Update();
	Draw();	
}

function Init(){
	var playerValues = {topSpeed: 5.0, acceleration: 0.3, handling: 0.1, deceleration: 0.001, topSpeedBackward: -2.0, accelerationBackward: 0.1,
							pos: {x: GameContext.Canvas.width / 2, y: GameContext.Canvas.height / 2}, sprite: "./content/sprites/ship1.png"};
	player = new Ship(playerValues);
}

function Update(){
	if(GameContext.PressedKeys.indexOf(GameContext.KEYS.SPACE) != -1){
		spnFps.innerHTML = "Fps: " + fps + ". Lowest Fps: " + lwFPS + ". Highest Fps: " + fsFPS + ".";
		lwFPS = 100;
		fsFPS = 0;
	}
	player.Update();
}

function Draw(){
	GameContext.Ctx.save();
	GameContext.Ctx.clearRect(0, 0, GameContext.Canvas.width, GameContext.Canvas.height);
	
	//Test Code
	var renderToCanvas = function (width, height, renderFunction) {
	    var buffer = GameContext.PreRenderCanvas;
	    buffer.width = width;
	    buffer.height = height;
	    renderFunction(buffer.getContext('2d'));
	    return buffer;
	};
	
	var spriteDimension = player.GetSpriteDimension();
	var cached = renderToCanvas(spriteDimension.width, spriteDimension.height, function (ctx) {
	    player.Draw(ctx);
	});
	
	//Test Code
	shipPosition = player.GetPosition();
	GameContext.Ctx.drawImage(cached, shipPosition.x, shipPosition.y);
	
	//player.Draw();
	
	GameContext.Ctx.restore();
}


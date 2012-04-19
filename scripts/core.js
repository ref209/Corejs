var GameContext = {
	KEYS: { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32, ONE: 49, TWO: 50 }, 
	PressedKeys: [],
	Canvas: null,
	Ctx: null,
	PreDrawCanvas: null,
	PreDrawCtx: null,
	FRAME_DURATION: 20,
	CallContext: {
		UpdateCollection: [],
		PreDrawCollection: [],
		DrawCollection: []
	}
}

var lastUpdate = 0;
var elapsedTime = 0;
var game = null;
var fps = 0;
window.onload = function(){
	
	spnFps = document.getElementById("spnFps");
	
	GameContext.Canvas = document.getElementById("mainCnv");
	GameContext.Ctx = GameContext.Canvas.getContext("2d");
	resizeCanvas();
	
	GameContext.PreDrawCanvas = document.getElementById("preCnv");
	GameContext.PreDrawCtx = GameContext.PreDrawCanvas.getContext("2d");
	
	SetBrowserBindings();
	
	game = new MainGame();
			
	Frame(GameContext.FRAME_DURATION);
}

function Frame(frameDuration){
	while(+new Date() - lastUpdate < frameDuration){
	//twiddle thumbs
	}
	
	var now = +new Date();
	if (lastUpdate != 0) {
		elapsedTime = now - lastUpdate;	
	}
	
	fps = Math.floor(1000/elapsedTime)
	spnFps.innerHTML = fps;
	
	if(fps < 50){
		//console.log("Low FPS: " + fps);
	}
	
	lastUpdate = now;
	
	GameLoop();
	
	//Trigger next frame
	
	setTimeout(function(){
		Frame(frameDuration);
	}, frameDuration / 2);
}

function RenderToMainCanvas(width, height, callback) {
    GameContext.PreDrawCanvas.width = width;
    GameContext.PreDrawCanvas.height = height;
    callback(GameContext.PreDrawCtx);
    return GameContext.PreDrawCanvas;
};

function GameLoop(){
	Update();
	Draw();
}

function SubscribeCallContext(subscriber){
	if(subscriber.Update != null){
		GameContext.CallContext.UpdateCollection.push(subscriber.Update);	
	}
	
	var preDraw = null;
	if (subscriber.PreDraw != null) {
		var dm = 100;
		if(subscriber.GetSpriteDiameter != null){
			dm = subscriber.GetSpriteDiameter();
		}
		preDraw = { preDraw: subscriber.PreDraw, diameter: dm };
		GameContext.CallContext.PreDrawCollection.push(preDraw);	
	}
	
	GameContext.CallContext.DrawCollection.push({ PreDraw: preDraw || null, Draw: subscriber.Draw });
}

function Update(){
	for(var i=0,j=GameContext.CallContext.UpdateCollection.length; i<j; i++){
	  GameContext.CallContext.UpdateCollection[i](elapsedTime);
	};
}

function Draw(){
	GameContext.Ctx.save();
	GameContext.Ctx.clearRect(0, 0, GameContext.Canvas.width, GameContext.Canvas.height);
	for(var i=0,j=GameContext.CallContext.DrawCollection.length; i<j; i++){
		var buffer = null;
		if (GameContext.CallContext.DrawCollection[i].PreDraw != null) {
			buffer = RenderToMainCanvas(GameContext.CallContext.DrawCollection[i].PreDraw.diameter, GameContext.CallContext.DrawCollection[i].PreDraw.diameter, GameContext.CallContext.DrawCollection[i].PreDraw.preDraw)	
		}
		GameContext.CallContext.DrawCollection[i].Draw(buffer);
	};
	GameContext.Ctx.restore();
}

function CloneObject(inObj)
{
    for (i in inObj)
    {
        this[i] = inObj[i];
    }
}
 



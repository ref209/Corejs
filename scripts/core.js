var GameContext = {
	KEYS: { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32 }, 
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
	GameContext.CallContext.UpdateCollection.push(subscriber.Update);
	GameContext.CallContext.PreDrawCollection.push(subscriber.PreDraw)
	GameContext.CallContext.DrawCollection.push(subscriber.Draw);
}

function Update(){
	for(var i=0,j=GameContext.CallContext.UpdateCollection.length; i<j; i++){
	  GameContext.CallContext.UpdateCollection[i](elapsedTime);
	};
}

function Draw(){
	GameContext.Ctx.clearRect(0, 0, GameContext.Canvas.width, GameContext.Canvas.height);
	GameContext.Ctx.save();
	for(var i=0,j=GameContext.CallContext.DrawCollection.length; i<j; i++){
		var buffer = RenderToMainCanvas(100, 100, GameContext.CallContext.PreDrawCollection[i])
	  	GameContext.CallContext.DrawCollection[i](buffer);
	};
	GameContext.Ctx.restore();
}


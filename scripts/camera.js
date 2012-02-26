function Camera(init){
	var pos = init.pos || { x: 0, y: 0 };
	var translation = { x: 0, y: 0 };
	var GetTargetPosition = init.target;
	var speed = init.speed || 100;
	
	this.SetTarget = function(getTargetPosition){
		GetTargetPosition = getTargetPosition;
	}
	
	this.Update = function(elapsedTime){
		var targetPos = GetTargetPosition();
		translation.x = (targetPos.x - pos.x); //* (speed * elapsedTime / 1000);
        translation.y = (targetPos.y - pos.y); //* (speed * elapsedTime / 1000);
        pos.x = -((pos.x + translation.x) - GameContext.Canvas.width / 2); 
        pos.y = -((pos.y + translation.y) - GameContext.Canvas.height / 2);
        
	}
	
	this.PreDraw = function(){
		
	}
	
	this.Draw = function(){
		GameContext.Ctx.translate(pos.x, pos.y);
		GameContext.Canvas.style.backgroundPosition = pos.x + "px " + pos.y + "px";
	}
	
	SubscribeCallContext(this);
}

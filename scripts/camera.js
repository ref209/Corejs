function Camera(init){
	var pos = init.pos || { x: 0, y: 0 };
	var translation = { x: 0, y: 0 };
	var GetTargetPosition = init.target;
	var speed = init.speed || 16;
	
	this.SetTarget = function(getTargetPosition){
		GetTargetPosition = getTargetPosition;
	}
	
	this.GetTargetPosition = function(){
		return GetTargetPosition();
	}
	
	this.GetPosition = function(){
		return pos;
	}
	
	this.Update = function(elapsedTime){
		var targetPos = GetTargetPosition();
		translation.x = ((targetPos.x - pos.x) - GameContext.Canvas.width / 2) / speed; 
        translation.y = ((targetPos.y - pos.y) - GameContext.Canvas.height / 2) / speed;
        pos.x = (pos.x + translation.x);
        pos.y = (pos.y + translation.y);
        
	}
	
	this.PreDraw = function(){
		
	}
	
	this.Draw = function(){
		GameContext.Ctx.translate(-pos.x, -pos.y);
		//GameContext.Canvas.style.backgroundPosition = -pos.x / 2 + "px " + -pos.y / 2 + "px";
	}
	
	SubscribeCallContext(this);
}

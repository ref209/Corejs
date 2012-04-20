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
	
	this.GetDimension = function(){
		return { width: GameContext.Canvas.width, height: GameContext.Canvas.height };
	}
	
	this.IsInViewPort = function(elementPosition, elementDimension){
		return IsCollidingRectangle(this.GetPosition(), this.GetDimension(), elementPosition, elementDimension)
	}
	
	this.Update = function(elapsedTime){
		var targetPos = GetTargetPosition();
		//if (elapsedTime > 0) {
			translation.x = ((targetPos.x - pos.x) - GameContext.Canvas.width / 2) / speed; //(speed * elapsedTime / 1000); 
	        translation.y = ((targetPos.y - pos.y) - GameContext.Canvas.height / 2) / speed; //(speed * elapsedTime / 1000);
	        pos.x = (pos.x + translation.x);
	        pos.y = (pos.y + translation.y);	
		//}
	}
	
	this.Draw = function(){
		GameContext.Ctx.translate(-pos.x, -pos.y);
		GameContext.Canvas.style.backgroundPosition = -pos.x + "px " + -pos.y + "px";
	}
	
	SubscribeCallContext(this);
}

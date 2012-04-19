function Navigator(init){
	var getParentPosition = init.getParentPos;
	var getTargetPosition = init.getTargetPos;
	var parentDistance = init.parentDistance || 100;
	var pos = { x: 0, y: 0 };
	var rotation = 0;
	
	var sprite = new Image(); 
	sprite.src = init.sprite;
	
	this.Update = function(){
		var parentPos = getParentPosition();
		var targetPos = getTargetPosition();
		
		var a = parentPos.x - targetPos.x;
		var b = parentPos.y - targetPos.y;
		var h = CalculateHypotenuse(a, b);
		
		rotation = CalculateAngle(b, h);
		
		//Workaround
		if((a > 0 && b < 0) || (a > 0 && b > 0)){
			rotation = -rotation;			
		}
				
		pos.x = parentPos.x;
		pos.y = parentPos.y;
	}
	
	this.Draw = function(){
		GameContext.Ctx.save();
		
		GameContext.Ctx.translate(pos.x, pos.y);
		GameContext.Ctx.rotate(rotation);
		GameContext.Ctx.translate(0, -parentDistance);
		GameContext.Ctx.drawImage(sprite, -sprite.width/2, -sprite.height/2);
		
		GameContext.Ctx.restore();
		
	}
	
	SubscribeCallContext(this);
}

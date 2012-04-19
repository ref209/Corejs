TargetType = { Rectangle: 0, Circle: 1 };

function Target(init){
	var pos = init.pos || {x: 0, y: 0};
	var width = init.width || 40;
	var height = init.height || 40;
	var type = init.type || TargetType.Rectangle;
	var radius = init.radius || 20;
	
	this.GetPosition = function(){
		return pos;
	}
	
	this.SetPosition = function(newPos){
		pos = newPos;
	}
	
	this.GetDimension = function(){
		return {width: width, height: height};
	}
	
	this.GetRadius = function(){
		return radius;
	}
	
	this.Draw = function(){
		GameContext.Ctx.strokeStyle = "rgb(0, 255, 0)";		
		switch (type){
			case TargetType.Rectangle:
				GameContext.Ctx.strokeRect(pos.x, pos.y, width, height);
				break;
			case TargetType.Circle:
				//GameContext.Ctx.lineWidth = 4;
 
				GameContext.Ctx.beginPath();
				GameContext.Ctx.arc(pos.x, pos.y, radius, 0, Math.PI*2, true);
				GameContext.Ctx.closePath();
				
				GameContext.Ctx.stroke();
		}
	}
	
	SubscribeCallContext(this);
} 
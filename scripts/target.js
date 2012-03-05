function Target(init){
	var pos = init.pos || {x: 0, y: 0};
	var width = init.width || 40;
	var height = init.height || 40;
	
	this.GetPosition = function(){
		return pos;
	}
	
	this.SetPosition = function(newPos){
		pos = newPos;
	}
	
	this.GetDimension = function(){
		return {width: width, height: height};
	}
	
	this.Update = function(){
		
	}
	
	this.PreDraw = function(){
		
	}
	
	this.Draw = function(){
		
		GameContext.Ctx.strokeStyle = "rgb(0, 255, 0)";
		GameContext.Ctx.strokeRect(pos.x, pos.y, width, height);
		
	}
	
	SubscribeCallContext(this);
} 
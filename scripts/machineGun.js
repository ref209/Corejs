function MachineGun(init){
	var getParentPos = init.getParentPos;
	var getParentAngle = init.getParentAngle;
	
	var pos = {x: 0, y: 0};
	
	var cadence = init.cadence || 10;
	/*var sprite = new Image(); 
	sprite.src = init.sprite;*/
	
	var bullets = [];
	
	var getPosition = function(){
		pos = new CloneObject(getParentPos());
		pos.x += 15;
		return pos;
	}
	
	this.Update = function(elapsedTime){
		if(GameContext.PressedKeys.indexOf(GameContext.KEYS.SPACE) != -1)
		{
			bullets.push(new Bullet({ getParentPos: getPosition, getParentAngle: getParentAngle }));
		}
		
		for (var i=0; i < bullets.length; i++) {
	  		bullets[i].pos.x = (bullets[i].pos.x + (bullets[i].speed * elapsedTime / 1000) * Math.sin(bullets[i].angle));
        	bullets[i].pos.y = (bullets[i].pos.y - (bullets[i].speed * elapsedTime / 1000) * Math.cos(bullets[i].angle));
        	
        	bullets[i].life -= bullets[i].lifeTime;
        	
        	if (bullets[i].life < 0) {
	  			bullets.splice(bullets[i], 1);
	  		}
		}
	}
	
	this.Draw = function(){
		
		
		for (var i=0; i < bullets.length; i++) {
	  		GameContext.Ctx.save();
	  		GameContext.Ctx.fillStyle = "rgba(255, 255, 255, " + bullets[i].life + ")";
	  		GameContext.Ctx.fillRect(bullets[i].pos.x, bullets[i].pos.y, 1, 1);	
		  	GameContext.Ctx.restore();
		}    
	}
	
	SubscribeCallContext(this);
}


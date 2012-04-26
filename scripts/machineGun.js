function MachineGun(init){
	var getParentPos = init.getParentPos;
	var getParentAngle = init.getParentAngle;
	
	var pos = {x: 0, y: 0};
	
	var cadence = init.cadence || 10;
	/*var sprite = new Image(); 
	sprite.src = init.sprite;*/
	
	var bullets = [];
	
	var getPosition = function(){
		return new CloneObject(getParentPos());
	}
	
	this.Update = function(elapsedTime){
		if(GameContext.PressedKeys.indexOf(GameContext.KEYS.SPACE) != -1)
		{
			bullets.push(new Bullet({ getParentPos: getPosition, getParentAngle: getParentAngle }));
		}
		
		for (var i=0; i < bullets.length; i++) {
		  	if (bullets[i].GetLife() < 0) {
		  		UnsubscribeShootable(bullets[i].id);
  				delete bullets.splice(bullets[i], 1);
  			}
		}
	}

	SubscribeCallContext(this);
}


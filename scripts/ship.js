function Ship(init){
	//TODO: Default values.
	
	var TOP_SPEED = init.topSpeed;
	var ACCELERATION = init.acceleration;
	var HANDLING = init.handling;
	var DECELERATION = init.deceleration;
	var TOP_SPEED_BACKWARD = init.topSpeedBackward;
	var ACCELERATION_BACKWARD = init.accelerationBackward;
	
	var pos = init.pos;
	var speed = 0;
	var angle = 0;
	var sprite = new Image(); 
	sprite.src = init.sprite;
		
	
	function GetAngle(){
        return angle * Math.PI / 4;
    }
    
    function GetPlayerInput(){
    	//TODO: Create IsPressedKey Mehtod
    	if (GameContext.PressedKeys.indexOf(GameContext.KEYS.UP) != -1) {
    		if (speed < TOP_SPEED)
                speed += ACCELERATION;
    	}
    	if (GameContext.PressedKeys.indexOf(GameContext.KEYS.DOWN) != -1) {
    		if (speed > TOP_SPEED_BACKWARD)
                speed -= ACCELERATION_BACKWARD;
    	}
    	if (GameContext.PressedKeys.indexOf(GameContext.KEYS.LEFT) != -1) {
    		angle -= HANDLING;
    	}
    	if (GameContext.PressedKeys.indexOf(GameContext.KEYS.RIGHT) != -1) {
    		angle += HANDLING;
    	}
    }
    
    function CalculateShipPosition(){
    	if(speed > DECELERATION){
                speed -= DECELERATION;
        }
        else if (speed < DECELERATION)
            speed += DECELERATION;
        else
            speed = 0;

        pos.x = (pos.x + speed * Math.sin(GetAngle()));
        pos.y = (pos.y - speed * Math.cos(GetAngle()));
    }
    
    this.GetSpriteDimension = function(){
    	return { width: sprite.width, height: sprite.height };
    }
    
    this.GetPosition = function(){
    	return pos;
    }
	
	this.Update = function(){
		GetPlayerInput();
		CalculateShipPosition();
	};
	
	this.Draw = function(ctx){
		ctx.translate(pos.x, pos.y);
		ctx.rotate(GetAngle());
		ctx.drawImage(sprite, -sprite.width/2, -sprite.height/2);
	};
}

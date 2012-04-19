function Ship(init){
	//TODO: Default values.
	
	var TOP_SPEED = init.topSpeed || 1;
	var ACCELERATION = init.acceleration || 1;
	var HANDLING = init.handling || 1;
	var DECELERATION = init.deceleration || 1;
	var TOP_SPEED_BACKWARD = init.topSpeedBackward || 1;
	var ACCELERATION_BACKWARD = init.accelerationBackward || 1;
	
	var pos = init.pos || {x: 0, y: 0};
	var speed = 0;
	var angle = 0;
	var sprite = new Image(); 
	sprite.src = init.sprite;
	
	var diameter = CalculateSpriteDiameter(sprite);
		
	
	function GetAngle(){
        return angle * Math.PI / 4;
    }
    
    function GetPlayerInput(elapsedTime){
    	//TODO: Create IsPressedKey Mehtod
    	if (GameContext.PressedKeys.indexOf(GameContext.KEYS.UP) != -1) {
    		if (speed < TOP_SPEED)
                speed += ACCELERATION;
    	}
    	if (GameContext.PressedKeys.indexOf(GameContext.KEYS.DOWN) != -1) {
    		if (speed > TOP_SPEED_BACKWARD)
    		{
                speed -= ACCELERATION_BACKWARD;
    		}
    	}
    	if (GameContext.PressedKeys.indexOf(GameContext.KEYS.LEFT) != -1) {
    		angle -= (HANDLING * elapsedTime / 1000);
    	}
    	if (GameContext.PressedKeys.indexOf(GameContext.KEYS.RIGHT) != -1) {
    		angle += (HANDLING * elapsedTime / 1000);
    	}
    }
    
    function CalculateShipPosition(){
    	if(speed > DECELERATION){
                speed -= DECELERATION;
        }
        else if (speed < DECELERATION){
            speed += DECELERATION;
		}
        else
            speed = 0;

        pos.x = (pos.x + (speed * elapsedTime / 1000) * Math.sin(GetAngle()));
        pos.y = (pos.y - (speed * elapsedTime / 1000) * Math.cos(GetAngle()));
    }
    
    this.GetSpriteDimension = function(){
    	return { width: sprite.width, height: sprite.height };
    }
    
    this.GetSpriteDiameter = function(){
    	return diameter;
    }
    
    this.GetPosition = function(){
    	return pos;
    }
    
    this.GetCenterPosition = function(){
    	return { x: pos.x + diameter / 2, y: pos.y + diameter / 2 };
    }
	
	this.Update = function(elapsedTime){
		GetPlayerInput(elapsedTime);
		CalculateShipPosition(elapsedTime);
	};
	
	this.PreDraw = function(){
		GameContext.PreDrawCtx.translate(GameContext.PreDrawCanvas.width / 2, GameContext.PreDrawCanvas.height / 2);
		GameContext.PreDrawCtx.rotate(GetAngle());
		GameContext.PreDrawCtx.drawImage(sprite, -sprite.width / 2.5, -sprite.height / 2.5);
	}
	
	this.Draw = function(preDraw){
		GameContext.Ctx.drawImage(preDraw, pos.x, pos.y);
	};
	
	SubscribeCallContext(this);
}

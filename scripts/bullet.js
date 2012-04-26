function Bullet(init){
	var pos = new CloneObject(init.getParentPos());
	var angle = init.getParentAngle();
	var speed = init.speed || 800;
	var life = init.life || 1;
	var lifeTime = init.life || 0.01;
	
	this.OnImpact = function(){
		life = 0;
	}
	
    this.GetPosition = function(){
    	return pos;
    }
    
    this.GetSpriteDimension = function(){
    	return { width: 1, height: 1 };
    }
    
    this.GetLife = function(){
    	return life;
    }
    
    this.Update = function(){
    	pos.x = (pos.x + (speed * elapsedTime / 1000) * Math.sin(angle));
    	pos.y = (pos.y - (speed * elapsedTime / 1000) * Math.cos(angle));
    	
    	life -= lifeTime;
    }
    
    this.Draw = function(){
    	GameContext.Ctx.save();
  		GameContext.Ctx.fillStyle = "rgba(255, 255, 255, " + life + ")";
  		GameContext.Ctx.fillRect(pos.x, pos.y, 1, 1);	
	  	GameContext.Ctx.restore();
    }
	
	SubscribeCallContext(this);
	this.id = SubscribeShootable(this);
}
function Bullet(init){
	this.pos = new CloneObject(init.getParentPos());
	this.angle = init.getParentAngle();
	this.speed = init.speed || 800;
	this.life = init.life || 1;
	this.lifeTime = init.life || 0.01;
}
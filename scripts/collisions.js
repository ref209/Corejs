function IsColliding(aPos, aDimension, bPos, bDimension){
	
	var aMaxX = aPos.x + aDimension.width;
	var aMaxY = aPos.y + aDimension.height
	var bMaxX = bPos.x + bDimension.width;
	var bMaxY = bPos.y + bDimension.height;
	
	return (aMaxX > bPos.x && aPos.x < bMaxX) && (aMaxY > bPos.y && aPos.y < bMaxY);
        
}

function IsCollidingRectangle(aPos, aDimension, bPos, bDimension){
	
	var aMaxX = aPos.x + aDimension.width;
	var aMaxY = aPos.y + aDimension.height;
	var bMaxX = bPos.x + bDimension.width;
	var bMaxY = bPos.y + bDimension.height;
	
	return (aMaxX > bPos.x && aPos.x < bMaxX) && (aMaxY > bPos.y && aPos.y < bMaxY);
        
}

function IsCollidingInXAxis(aPos, aDimension, bPos, bDimension){
	
	var aMaxX = aPos.x + aDimension.width;
	var bMaxX = bPos.x + bDimension.width;
	
	return (aMaxX > bPos.x && aPos.x < bMaxX);       
}

function IsCollidingInYAxis(aPos, aDimension, bPos, bDimension){
	
	var aMaxY = aPos.y + aDimension.height;
	var bMaxY = bPos.y + bDimension.height;
	
	return (aMaxY > bPos.y && aPos.y < bMaxY);
}

function IsCollidingCircle(aPos, bPos, radius){
	return (radius > CalculateHypotenuse(GetLineDistance(aPos.x, bPos.x), GetLineDistance(aPos.y, bPos.y)));
}



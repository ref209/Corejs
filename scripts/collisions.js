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
	return (radius > CalculateDistance(GetLineDistance(aPos.x, bPos.x), GetLineDistance(aPos.y, bPos.y)));
}

function GetLineDistance(n1, n2){
	var max = Math.max(n1, n2)
	var min = Math.min(n1, n2)
	return max-min;
}

function CalculateDistance(a, b){
	return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
}


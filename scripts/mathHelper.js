function GetLineDistance(n1, n2){
	var max = Math.max(n1, n2)
	var min = Math.min(n1, n2)
	return max-min;
}

function CalculateHypotenuse(a, b){
	return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
}

function CalculateAngle(a, c){
	return Math.acos(a/c);
}
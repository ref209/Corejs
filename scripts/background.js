function Background(init, camera){
	var pos = init.pos || { x: 0, y: 0 }
	
	var sprite = new Image(); 
	sprite.src = init.sprite;
	var backgroundPoints = [];
		
	
	function InitBackground(){
		var lastPosition = new CloneObject(camera.GetPosition());
		var lastDimension = { width: sprite.width, height: sprite.height };
		
		var test = camera.GetDimension();
		
		lastPosition.x = lastPosition.x - sprite.width;
		lastPosition.y = lastPosition.y - sprite.height;
		
		test.width = test.width + sprite.width;
		test.height = test.height + sprite.height;
		
		while(lastPosition.x <= test.width && lastPosition.y <= test.height){
			addRow(lastPosition, lastDimension, test);
			lastPosition.y = lastPosition.y + (lastDimension.height - 1);
			lastPosition.x = -sprite.width;
		}
		
		console.log(backgroundPoints);
	}
	
	function addRow(lastPosition, lastDimension, cameraDimension){
		var row = [];
		while(lastPosition.x <= cameraDimension.width && lastPosition.y <= cameraDimension.height){
			row.push(new CloneObject(lastPosition));
			lastPosition.x = lastPosition.x + (lastDimension.width - 1);
		}
		backgroundPoints.push(row);
	}
	
	function addColumn(lastPosition, lastDimension){
		while(IsColliding(camera.GetPosition(), camera.GetDimension(), lastPosition, lastDimension )){
			setBackgroundWidth(lastPosition, lastDimension);
			lastPosition.y = lastPosition.y + lastDimension.height;
		}
	}
	InitBackground();
			
	this.Update = function(){
		
		var cameraPos = camera.GetPosition();
		var cameraDim = camera.GetDimension();
		/*cameraPos.x = cameraPos.x - sprite.width;
		cameraPos.y = cameraPos.y - sprite.height;
		
		cameraDim.width = cameraDim.width + sprite.width;
		cameraDim.height = cameraDim.height + sprite.height;*/
		
		
		for (var i=0; i < backgroundPoints.length; i++) {
			for (var j=0; j < backgroundPoints[i].length; j++) {
			  if(!IsCollidingInXAxis(cameraPos, cameraDim, { x: backgroundPoints[i][j].x, y: backgroundPoints[i][j].y }, {width: sprite.width, height: sprite.height} )){
			  	if (j > 0) {
			  		backgroundPoints[i].splice(backgroundPoints[i].length - 1, 1);
			  		backgroundPoints[i].splice(0, 0, { x: backgroundPoints[i][0].x - sprite.width, y: backgroundPoints[i][0].y});
			  	}
			  	else{
			  		backgroundPoints[i].splice(0, 1);
			  		backgroundPoints[i].splice(0, 0, { x: backgroundPoints[i][backgroundPoints[i].length - 1].x + sprite.width, y: backgroundPoints[i][backgroundPoints[i].length - 1].y});
			  	}
			  }
			  if(!IsCollidingInYAxis(cameraPos, cameraDim, { x: backgroundPoints[i][j].x, y: backgroundPoints[i][j].y }, {width: sprite.width, height: sprite.height} )){
					if (i > 0) {
						var currentRow = backgroundPoints.splice(0, 1)[0];
						for (var x=0; x < currentRow.length; x++) {
							currentRow[x].y = currentRow[x].y + sprite.height; 
					  	}
					  	backgroundPoints.splice(0, 0, currentRow);
					}
					else{
						var currentRow = backgroundPoints.splice(0, 1)[0];
						for (var x=0; x < currentRow.length; x++) {
							currentRow[x].y = currentRow[x].y - sprite.height; 
					  	}
					  	backgroundPoints.splice(0, 0, currentRow);
					}
	  			}
			}
		}
		var test = 1;
	}
	
	this.Draw = function(){
		for (var i=0; i < backgroundPoints.length; i++) {
			for (var j=0; j < backgroundPoints[i].length; j++) {
			  GameContext.Ctx.drawImage(sprite, backgroundPoints[i][j].x, backgroundPoints[i][j].y);
			}
		}
	}
	SubscribeCallContext(this);
}

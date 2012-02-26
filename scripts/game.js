function MainGame(){
	
	var playerValues = {topSpeed: 5.0, acceleration: 0.3, handling: 0.1, deceleration: 0.001, topSpeedBackward: -2.0, accelerationBackward: 0.1,
					pos: {x: GameContext.Canvas.width / 2, y: GameContext.Canvas.height / 2}, sprite: "./content/sprites/ship1.png"};
	var player = new Ship(playerValues);
	
	var playerCloneValues = {topSpeed: 5.0, acceleration: 0.3, handling: 0.1, deceleration: 0.001, topSpeedBackward: -2.0, accelerationBackward: 0.1,
							pos: {x: 30 / 2, y: 30}, sprite: "./content/sprites/ship1.png"};
	
	var playerClone = new Ship(playerCloneValues);
		
}

class Ball {
	constructor(canvasDOM, ctx, posX, posY, radios = 123.26) {
		this.ctx = ctx

		this.canvasDOM = canvasDOM

		this.pos = {
			x: posX,
			y: posY,
			initialX: 777.57,
			initialY: 312,
		}

		this.size = {
			width: radios,
			height: radios,
		}

		this.image = undefined

		this.T = 0

		this.oldTimestamp = 0

		this.secondsPassed = 0

		this.isShooted = false
		this.radios = radios
		this.initialBallSize = 123.26

		this.isEventAdded = false

		this.angle = undefined

		this.speed = undefined

		this.g = 0.3

		
		this.visible = true
		
		this.spritePosX = 0
		
		new Shooter(this.canvasDOM, this.shoot.bind(this))
		this.startGame()

	}

	startGame() {
		/* this.image = new Image()
		this.image.src = '../IMAGES/basketball_game_ball.png' */

		this.image = new Image()
		this.image.src = 'IMAGES/BASKETBAL_BALL_SPRITE_189.png'

		if (!this.isShooted) {
			this.spritePosX = 0
		}

	}
	
	draw() {
		
		if (this.visible) {
			//this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.radios, this.radios)
			this.drawSprite()
		}
		
	}

	shoot(res) {
		console.log(res)
		this.isShooted = true
		this.T++
		this.hipo = res.hipo
		this.angle = res.angle
		let timeElapsed = res.timeElapsed
		this.speed = this.hipo / timeElapsed
		
		this.player.playerShoot = true

		this.update()
		//console.log("shoooteado", this.angle, this.speed);
	}

	update() {
		
		console.log('Updating..')
		
		if (this.angle < 40) {
			this.angle = this.angle + 20
		}
		
		this.move(this.speed, this.angle, this.pos.initialX, this.pos.initialY)
		
		let modifier = 1
		let deltaX = this.pos.x - this.pos.initialX
		
		modifier = modifier + deltaX / 250
		
		console.log(modifier);
		if (modifier <= 5) {
			this.radios = this.initialBallSize / modifier
		}

	}


	move(speed, angle, initialX, initialY) {

		this.T ++

		this.spritePosX += this.spritePosX === 28350 ? -28350  : 189
	
		this.pos.x =
			speed * Math.cos((-angle * Math.PI) / 180) * this.T +
			initialX
		this.pos.y =
			0.5 * this.g * this.T ** 2 +
			3 * speed * Math.sin((-angle * Math.PI) / 180) * this.T +
			initialY
	}



	droppingBall(x, y) {
		this.T ++

		this.pos.x -=  this.T/10 
		this.pos.y += this.T  * this.g * 0.5
	}


	
	
	drawSprite(framesCounter) {
		
		/* this.image = new Image()
		this.image.src = '../IMAGES/BASKETBAL_BALL_SPRITE_189.png' */

		console.log(this.spritePosX)

		this.ctx.drawImage(
			this.image, 
			this.spritePosX, //posicion en la que empieza a dibujar el frame (x)
			0, //posicion en la que empieza a dibujar el frame (y)
			189, //posicion en la que acaba de dibujar el frame x
			189, //posicion en la que acaba de dibujar el frame y
			this.pos.x, //posx
			this.pos.y, //posy
			this.radios, //ancho del frame
			this.radios //alto del frame
			)
		//this.ctx.drawImage(this.image, this.spritePosX, 0, 189, 189, this.pos.initialX, this.pos.initialY, this.initiaBallSize, this.initiaBallSize)
			
		//this.animateSprite()
	}
	



}
	
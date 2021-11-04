const basicGame = {
	ctx: undefined,
	canvasDOM: undefined,
	canvasSize: { width: undefined, height: undefined },
	duck: undefined,
	FPS: 60,
	framesCounter: 0,
	points: 0,
	player: undefined,
	isGonnaCollide: false,
	collided: false,
	collidedBoard: false,
	collidedBasketLeft: false,
	score: 0,
	scoreRecords: [],
	bestScore : undefined,
	hasScored: false,

	init() {
		this.setContext()
		this.setDimensions()
		this.createBall()
		this.createElements()
		this.drawElements()
		this.start()
		this.resetScoreCounter()
		this.resetRecord()
		
	},

	setContext() {
		this.canvasDOM = document.querySelector('#myCanvas')
		this.ctx = this.canvasDOM.getContext('2d')
	},

	setDimensions() {
		this.canvasSize.width = 1664
		this.canvasSize.height = 936
		this.canvasDOM.setAttribute('width', this.canvasSize.width)
		this.canvasDOM.setAttribute('height', this.canvasSize.height)
		this.setBallDimensions()
	},

	start() {
		this.intervalId = setInterval(() => {
			this.framesCounter++
			this.clearScreen()
			this.drawElements()

			if (this.ball.isShooted) {
				console.log("BALL IS SHOOTED FUNCTION ------------------")
				this.player.playerShoot = true
				if (this.collided) {
					this.animateCollisionFloor()
				} else if (this.collidedBoard){
					this.animationCollisionBoard()
				} else if (this.collidedBasketLeft){
					this.animationCollisionBasketLeft()
				} else {
					this.ball.update()
				}
				this.drawBall()
			}

			this.drawPlayer()
			this.drawBallStand()
			this.drawNet()

			if (this.isCollisionBoard()) {
				//console.log('collision board')
				this.collidedBoard = true
				if (!this.hasScored) this.resetScoreCounter()
				
			}

			if (this.isCollisionBasketLeft()) {
				//console.log('collision basket left')
				this.collidedBasketLeft = true
				if (!this.hasScored)  this.resetScoreCounter()
			}

			if (this.isCollisionBasketRight()) {
				//console.log('GOAAAAAAALLLLLL ---------------------')
				//console.log("llegnado ponsicion score");
				this.hasScored = true
				this.scoreCounter()
			} 

			if (this.isCollisionFloor()) {
				this.collided = true
				//console.log('collision floor')
				if (!this.hasScored) this.resetScoreCounter()
			}


			if (this.isCanvasCollision()) {
				//document.location.reload()
				//this.gameOver()
				//basicGame.init();

				this.resetBall();
				this.hasScored = false
				this.player.playerShoot = false
				
			}

			this.goHome()


		}, 1000 / this.FPS)
		this.framesCounter > 50 ? clearInterval(this.intervalId) : null
	},

	clearScreen() {
		this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
	},

	gameOver() {
		clearInterval(this.intervalId)
	},

	createElements() {
		this.createBackground()
		this.createBasket()
		this.createBall()
		this.createPlayer()
		this.createBallStand()
		this.createCollisionBoard()
		this.createCollisionBasketLeft()
		this.createCollisionBasketRight()
		this.createCollisionFloor()
		this.createNet()
		this.createScoreboard()
	},

	drawElements() {
		this.drawBackground()
		this.drawBasket()
		this.drawBall()
		this.drawPlayer()
		this.drawBallStand()
		this.drawCollisionBoard()
		this.drawCollisionBasketLeft()
		this.drawCollisionBasketRight()
		this.drawCollisionFloor()
		this.drawNet()
		this.drawScoreboard()
	},

	createBackground() {
		this.background = new Background(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height)
	},

	drawBackground() {
		this.background.draw()
	},

	createBasket() {
		this.basket = new BasketStandar(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height)
	},

	drawBasket() {
		this.basket.draw()
	},

	createPlayer() {
		this.player = new Player(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height)
	},

	drawPlayer() {
		this.player.draw()
	},

	setBallDimensions() {
		this.ballInitialX = this.canvasSize.width / 2.14
		this.ballInitialY = this.canvasSize.height / 3
		this.ballInitialWidth = this.canvasSize.width / 13.54
		this.ballInitialHeight = this.canvasSize.height / 7.62
	},

	createBall() {
		this.ball = new Ball(this.canvasDOM, this.ctx, this.ballInitialX, this.ballInitialY, this.ballInitialWidth)
	},

	drawBall() {
		this.ball.draw()
		this.assigneIsGonnaCollide()
	},

	createBallStand() {
		this.ballStand = new BallStand(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height)
	},

	drawBallStand() {
		this.ballStand.draw()
	},


	createCollisionBoard() {
		this.collisionBoard = new CollisionBoard(this.ctx, 1110, 152, 2, 120)
	},


	drawCollisionBoard() {
		this.collisionBoard.draw()
	},


	isCollisionBoard() {
		return (
			this.ball.pos.x - 30 + this.ball.size.width-40 > this.collisionBoard.pos.x && //lado drch del ball lado izq del this.collisionBoard
			this.ball.pos.x < this.collisionBoard.pos.x + this.collisionBoard.size.width && //lado izq del ball lado drch del this.collisionBoard
			this.ball.pos.y + this.ball.size.height-40 > this.collisionBoard.pos.y //lado de abajo del ball lado de arriba del this.collisionBoard
		)
	},


	createCollisionBasketLeft() {
		this.collisionBasketLeft = new CollisionBasketLeft(this.ctx, 980, 260, 5, 5)
	},


	drawCollisionBasketLeft() {
		this.collisionBasketLeft.draw()
	},


	isCollisionBasketLeft() {
		
		return (
			this.ball.pos.x + this.ball.radios > this.collisionBasketLeft.pos.x && //lado drch del ball lado izq del this.collisionBasketLeft
			this.ball.pos.x < this.collisionBasketLeft.pos.x + this.collisionBasketLeft.size.width && //lado izq del ball lado drch del this.collisionBasketLeft
			this.ball.pos.y + this.ball.radios  > this.collisionBasketLeft.pos.y && //lado de abajo del ball lado de arriba del this.collisionBasketLeft
			this.ball.pos.y <  this.collisionBasketLeft.pos.y + this.collisionBasketLeft.size.height  //laddo de arriba del ball, lado de abajo del objeto
		)
	},


	createCollisionBasketRight() {
		this.collisionBasketRight = new CollisionBasketRight(this.ctx, 1040, 340, 20, 2)
	},


	drawCollisionBasketRight() {
		this.collisionBasketRight.draw()
	},


	isCollisionBasketRight() {

		return (
			this.ball.pos.x + this.ball.size.width > this.collisionBasketRight.pos.x+20 && //lado drch del ball lado izq del this.collisionBasketRight
			this.ball.pos.x < this.collisionBasketRight.pos.x + this.collisionBasketRight.size.width && //lado izq del ball lado drch del this.collisionBasketRight
			this.ball.pos.y + this.ball.size.height > this.collisionBasketRight.pos.y+20 && //lado de abajo del ball lado de arriba del this.collisionBasketRight
			this.ball.pos.y < this.collisionBasketRight.pos.y + this.collisionBasketRight.size.height
		)
	},


	createCollisionFloor() {
		this.collisionFloor = new CollisionFloor(this.ctx, 0, 615, 1664, 12)
	},


	drawCollisionFloor() {
		this.collisionFloor.draw()
	},


	isCollisionFloor() {
		return (
			this.ball.pos.y + this.ball.size.height-40 > this.collisionFloor.pos.y //lado de abajo del ball lado de arriba del this.collisionFloor
		)
	},


	assigneIsGonnaCollide() {
		if (this.ball.radios < 90) {
			this.isGonnaCollide = true
		} else {
			this.isGonnaCollide = false
		}
	},


	animateCollisionFloor() {
		
		this.ball.visible = false;

		let actualX = + this.ball.pos.x.toString()
		let actualY = + this.ball.pos.y.toString()
		let actualRadios = +this.ball.radios.toString()
		
		
		if (!this.ballBounceAnimation) {
			this.createBounceAnimationBall(actualX,actualY,actualRadios)
		}
		this.ballBounceAnimation.move(this.ball.speed, this.ball.angle, actualX, actualY)
		this.ballBounceAnimation.draw()
	},


	createBounceAnimationBall(actualX,actualY,actualRadios) {
		this.ballBounceAnimation = new Ball(this.canvasDOM, this.ctx, actualX, actualY, actualRadios)

	},


	moveBounceAnimationBall(speed,angle, actualX, actualY){
		this.ballBounceAnimation.move(speed,angle, actualX, actualY)
	},


	animationCollisionBoard() {
		
		let actualX = + this.ball.pos.x.toString()
		let actualY = + this.ball.pos.y.toString()
		
		this.ball.droppingBall(actualX, actualY)
	},


	animationCollisionBasketLeft() {

		let actualX = + this.ball.pos.x.toString()
		let actualY = + this.ball.pos.y.toString()
		
		this.ball.droppingBall(actualX, actualY)

	},

	isCanvasCollision() {

		if (this.ballBounceAnimation) {
			return (
				this.ballBounceAnimation.pos.y + this.ballBounceAnimation.size.height-40 > 1664  //lado de abajo del ball lado de arriba del this.collisionFloor
			)
		}
	},


	createNet() {
		this.net = new Net(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height)
	},

	drawNet() {
		this.net.draw()
	},


	createScoreboard() {
		this.scoreboard = new Scoreboard(this.ctx, 0,0, this.canvasSize.width, this.canvasSize.height)
	},


	drawScoreboard() {
		this.scoreboard.draw()
	},


	scoreCounter() {
		this.score++
		this.scoreRecords.push(this.score)
		this.bestScore = this.getRecord(this.scoreRecords)
		document.querySelector('#score').textContent = this.score
		document.querySelector('#best-score').textContent = this.bestScore
		console.log(this.score);

	},


	getRecord(someArray){
		return Math.max.apply(null, someArray);
	},


	resetScoreCounter() {
		this.score = 0
		document.querySelector('#score').textContent = this.score
	},

	resetRecord() {
		document.querySelector('#best-score').textContent = 0
	},


	resetBall() {

		this. isGonnaCollide = false,
	    this.collided = false,
	    this.collidedBoard = false,
	    this.collidedBasketLeft = false,
		this.ballBounceAnimation = undefined
		this.createBall()

	},


	goHome() {
		document.getElementById("home-btn").onclick = function(){
			document.querySelector('#main-menu').removeAttribute('class', 'hide')
			document.querySelector('#home-btn').setAttribute('class', 'hide')
			document.querySelector('#game-board').setAttribute('class', 'hide')
			document.querySelector('#score').setAttribute('class','hide')
			document.querySelector('#best-score').setAttribute('class','hide')
		}
	},


	
}
   
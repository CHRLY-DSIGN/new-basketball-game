class Scoreboard {

    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
    
        this.pos = {
            x : posX,
            y : posY,
        } 
    
        this.size = {
          width: width,
          height: height
        }
    
        this.image = undefined
            
        this.startGame()
    
      }
    
      startGame() {
        this.image = new Image()
        this.image.src = '../IMAGES/basketball_game_scoreboard.png'
      }
    
    
      draw() {
        this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.width, this.size.height)
      }

}
class Player {
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

        this.playerShoot = false,
        this.spritePosX = 0
        this.image = undefined
    
        this.startGame()
      }


      startGame() {
    
        /* this.image = new Image();
        this.image.src = '../IMAGES/basketball_game_background_player.png'; */

        this.image = new Image()
		    this.image.src = '../IMAGES/basketball_game_player_sprite.png'

        if (!this.playerShoot) {
          this.spritePosX = 0
        }

      }


      draw() {
        
        if (this.playerShoot) {
          console.log("ANIMADOO---------")
          this.drawPlayerSpriteAnimated()
		      this.spritePosX += this.spritePosX === 51584 ? -51584  : 1664
          
          
        } else {
          this.drawPlayerSprite()
        }
      }

      drawPlayerSprite(framesCounter) {
    
        this.ctx.drawImage(
          this.image, 
          this.spritePosX, //posicion en la que empieza a dibujar el frame (x)
          0, //posicion en la que empieza a dibujar el frame (y)
          2560, //posicion en la que acaba de dibujar el frame x
          1440, //posicion en la que acaba de dibujar el frame y
          0, //posx
          0, //posy
          2560, //ancho del frame
          1440 //alto del frame
          )
      }

      drawPlayerSpriteAnimated(framesCounter) {
    
        this.ctx.drawImage(
          this.image, 
          this.spritePosX, //posicion en la que empieza a dibujar el frame (x)
          0, //posicion en la que empieza a dibujar el frame (y)
          2560, //posicion en la que acaba de dibujar el frame x
          1440, //posicion en la que acaba de dibujar el frame y
          0, //posx
          0, //posy
          2560, //ancho del frame
          1440 //alto del frame
          )
      }
}
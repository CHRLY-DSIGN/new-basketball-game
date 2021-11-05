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

        this.image = undefined
        
        this.playerShoot = false,
        this.spritePosX = 0
        this.sprite = undefined
        this.isAnimationFinished = false
        this.startGame()
      }


      startGame() {
    
        this.image = new Image();
        this.image.src = 'IMAGES/basketball_game_background_player.png';

        this.sprite = new Image()
		    this.sprite.src = 'IMAGES/basketball_game_player_sprite.png'

        if (!this.playerShoot) {
          this.spritePosX = 0
        }

      }


      draw() {
        
        if (!this.isAnimationFinished) {
          
          this.drawPlayerSpriteAnimated()
          if (this.spritePosX < 51584 - 1664) {
            this.spritePosX += 1664
          } else {
            this.isAnimationFinished = true
            console.log("HE ACABADO LA ANIMACION", this.isAnimationFinished);
            this.spritePosX = 0
          }
		      //this.spritePosX += this.spritePosX === 51584 ? -51584  : 1664
		      //this.spritePosX += 100;
          
          //this.drawPlayerSprite()

          
          
        } else {
          this.drawPlayerSprite()
        }
      }

      drawPlayerSprite(framesCounter) {

        // this.image = new Image();
        // this.image.src = '../IMAGES/basketball_game_background_player.png';
    
        this.ctx.drawImage(
          this.image, 
          0, //posicion en la que empieza a dibujar el frame (x)
          0, //posicion en la que empieza a dibujar el frame (y)
          2560, //posicion en la que acaba de dibujar el frame x
          1440, //posicion en la que acaba de dibujar el frame y
          0, //posx
          0, //posy
          1664, //ancho del frame
          936 //alto del frame
          )
      }

      drawPlayerSpriteAnimated(framesCounter) {

        // this.image = new Image()
		    // this.image.src = '../IMAGES/basketball_game_player_sprite.png'
        this.ctx.drawImage(
          this.sprite, 
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
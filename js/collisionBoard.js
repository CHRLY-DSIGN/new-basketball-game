class CollisionBoard {
    constructor(ctx, posX, posY, width, height) {
      this.ctx = ctx
  
      this.pos = {
        x: posX,
        y: posY
      }
  
      this.size = {
        width: width,
        height: height
      }
    }
  
    draw() {
      this.ctx.fillStyle = "rgba(235, 0, 120, 0)";
      this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
    }
  
  }
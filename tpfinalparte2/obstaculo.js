class Obstaculo {
  constructor(x, y, ancho, alto, tipo, textura = null) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto; 
    this.tipo = tipo; 
    this.textura = textura;
    this.esSolido = (tipo === "plataforma" || tipo === "bloque");
  }

  dibujar() {
    noStroke();

    if (this.tipo === "plataforma" || this.tipo === "bloque") {
      if (this.textura) {
        let alturaVisual = this.alto + 50; 
        let offsetVisualY = 35;            

        image(this.textura, this.x, this.y - offsetVisualY, this.ancho, alturaVisual);
      } else {
        fill(120);
        rect(this.x, this.y, this.ancho, this.alto);
      }
    } else if (this.tipo === "meta") {
      fill(100);
      rect(this.x, this.y, 4, this.alto);
      fill(46, 204, 113);
      triangle(this.x + 4, this.y, this.x + 35, this.y + 15, this.x + 4, this.y + 30);
    }
  }
}

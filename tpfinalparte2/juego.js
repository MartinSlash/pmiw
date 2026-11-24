class Juego {
  constructor(sprites, texturaPiedra, texturaFondo, texturaPincho) {
    // Recursos
    this.spritesJugador = sprites;
    this.texturaPiedra = texturaPiedra;
    this.texturaFondo = texturaFondo;
    this.texturaPincho = texturaPincho;

    this.imgmenu = imgmenu;
    this.imgGanar = imgGanar;
    this.imgperder = imgperder;

    // Maquina de estados simple 
    this.estado = "inicio"; 
    this.reiniciar();
  }

  // Inicia todos los objetos del nivel
  reiniciar() {
    this.jugador = new Personaje(50, 200, this.spritesJugador);
    this.obstaculos = [];
    this.pinchos = [];
    this.balas = [];
    this.balasVerticales = [];
    this.camaraX = 0;
    this.tiempo = 60; // Limite de tiempo de la partida en segundos
    this.gano = false;
    this.cooldownDaño = 0; // Evita restar tiempo repetidamente al tocar un pincho

    let tex = this.texturaPiedra;

    // Plataformas, bloques y meta 
    this.obstaculos.push(new Obstaculo(0, 360, 300, 40, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(380, 300, 140, 20, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(600, 260, 100, 20, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(780, 320, 120, 20, "plataforma", tex));

    this.obstaculos.push(new Obstaculo(1000, 360, 300, 40, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(1100, 280, 40, 40, "bloque", tex));
    this.obstaculos.push(new Obstaculo(1140, 220, 40, 40, "bloque", tex));
    this.obstaculos.push(new Obstaculo(1350, 280, 120, 20, "plataforma", tex));

    this.obstaculos.push(new Obstaculo(1600, 360, 200, 40, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(1820, 280, 80, 20, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(2000, 230, 80, 20, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(2180, 290, 80, 20, "plataforma", tex));

    this.obstaculos.push(new Obstaculo(2400, 360, 700, 40, "plataforma", tex));
    this.pinchos.push(new Pincho(2520, 330, 60, 30, this.texturaPincho));
    this.obstaculos.push(new Obstaculo(2700, 280, 40, 40, "bloque", tex));

    this.obstaculos.push(new Obstaculo(3000, 260, 40, 100, "meta"));
  }

  actualizar() {
    
    // Si no estamos jugando no avanza el tiempo 
    if (this.estado !== "jugando") return;

    //si esta activo el cooldown del pincho lo reinicia
    if (this.cooldownDaño > 0) {
      this.cooldownDaño--;
    }

    // baja el tiempo
    if (frameCount % 60 === 0 && this.jugador.vivo && !this.gano) {
      this.tiempo--;
      if (this.tiempo <= 0) {
        this.tiempo = 0;
        this.jugador.vivo = false;
      }
    }

    // desplazamiento horizontal de camara 
    this.camaraX = this.jugador.x - width / 3;
    if (this.camaraX < 0) this.camaraX = 0;

    // Detiene el movimiento de las balas si ya perdio o gano
    if (!this.jugador.vivo || this.gano) return;

    this.jugador.actualizar(this.obstaculos);

    // caida del jugador
    if (this.jugador.y > height + 50) {
      this.jugador.vivo = false;
    }

     
    if (frameCount % 120 === 0) {
      this.balas.push(new Bala(this.camaraX + width + 30, random(160, 310)));
    }

    
    if (frameCount % 110 === 0) {
      let spawnX = random(this.camaraX + 120, this.camaraX + width - 60);
      this.balasVerticales.push(new BalaVertical(spawnX, -30));
    }

    // Revisa si el jugador llega a la meta
    for (let i = 0; i < this.obstaculos.length; i++) {
      let obs = this.obstaculos[i];
      if (obs.tipo === "meta" && this.jugador.toca(obs)) {
        this.gano = true;
      }
    }

    // Revisa colision con pinchos 
    for (let i = 0; i < this.pinchos.length; i++) {
      let p = this.pinchos[i];
      if (p.toca(this.jugador) && this.cooldownDaño === 0) {
        this.tiempo -= 15;
        this.cooldownDaño = 45;
      }
    }

    // Actualiza balas horizontales y elimina las que impactan al jugador
    for (let i = this.balas.length - 1; i >= 0; i--) {
      let b = this.balas[i];
      b.actualizar();
      if (b.toca(this.jugador)) {
        this.tiempo -= 15;
        this.balas.splice(i, 1);
      }
    }

    
    for (let i = this.balasVerticales.length - 1; i >= 0; i--) {
      let bv = this.balasVerticales[i];
      bv.actualizar();
      if (bv.toca(this.jugador)) {
        this.tiempo -= 15;
        this.balasVerticales.splice(i, 1);
      }
    }
  }

  
  dibujar() {
    if (this.estado === "inicio") {
      if (this.imgmenu) {
        image(this.imgmenu, 0, 0, width, height);
      } else {
        background(20);
      }
      fill(255, 240, 200);
      stroke(0);
      strokeWeight(4);
      textSize(18);
      textAlign(CENTER, CENTER);
      text("Apretá ENTER para jugar", width / 2, height - 25);
      return;
    }

    // Fondo 
    if (this.texturaFondo) {
      image(this.texturaFondo, 0, 0, width, height);
    } else {
      background(255);
    }

    // Aplica el movimiento de camara 
    push();
    translate(-this.camaraX, 0);

    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].dibujar();
    }

    for (let i = 0; i < this.pinchos.length; i++) {
      this.pinchos[i].dibujar();
    }

    this.jugador.dibujar();

    for (let i = 0; i < this.balas.length; i++) {
      this.balas[i].dibujar();
    }

    for (let i = 0; i < this.balasVerticales.length; i++) {
      this.balasVerticales[i].dibujar();
    }

    pop();

    this.dibujarcronometro();
  }

  // Dibuja el cronometro y las pantallas de victoria o derrota
  dibujarcronometro() {
    textSize(16);
    textAlign(LEFT, TOP);
    fill(255);
    noStroke();
    text("Tiempo: " + this.tiempo + "s", 20, 20);

    if (this.gano) {
      if (this.imgGanar) {
        image(this.imgGanar, 0, 0, width, height);
      }
      fill(255);
      stroke(0);
      strokeWeight(3);
      textSize(18);
      textAlign(CENTER, CENTER);
      text("Apretá R para reiniciar", width / 2, height - 25);
    } else if (!this.jugador.vivo) {
      if (this.imgperder) {
        image(this.imgperder, 0, 0, width, height);
      }
      fill(255);
      stroke(0);
      strokeWeight(3);
      textSize(18);
      textAlign(CENTER, CENTER);
      text("Apretá R para reintentar", width / 2, height - 25);
    }
  }

  teclaPresionada(codigo, tecla) {
    
    // Empezar a jugar / jugando
    
    if (this.estado === "inicio") {
      if (codigo === ENTER || tecla === " ") {
        this.reiniciar();
        this.estado = "jugando";
      }
      return;
    }

    // Salto
    if (codigo === UP_ARROW || codigo === 32 || tecla === 'w' || tecla === 'W') {
      this.jugador.saltar();
    }

    // Al ganar o perder reinicia el nivel 
    if (!this.jugador.vivo || this.gano) {
      if (tecla === 'r' || tecla === 'R') {
        this.reiniciar();
        this.estado = "jugando";
      }
    }
  }
}

PImage tituloImg;

PImage escena1;
PImage escena2;
PImage escena3;
PImage escena4;
PImage escena4Camino2; 
PImage escena5Camino2; 
PImage escena6Camino2; 
PImage escena5;
PImage escena5_5;    
PImage escenaGameOver;

int escenaActual = 0; 

void setup() {
  size(800, 450);

  tituloImg = loadImage("Pantalla1.jpg");

  escena1 = loadImage("Pantalla2.jpg");
  escena2 = loadImage("Pantalla3.jpg");
  escena3 = loadImage("Pantalla4C1.png");         
  escena4 = loadImage("Pantalla5C1.png");         
  escena4Camino2 = loadImage("Pantalla5C2.jpg");   
  escena5Camino2 = loadImage("Pantalla6C2.jpg");   
  escena6Camino2 = loadImage("Pantalla7C2.jpg");   
  escena5 = loadImage("Pantalla6C1.png");         
  escena5_5 = loadImage("Pantalla5.5.jpg");       
  escenaGameOver = loadImage("Pantalla7FC1.jpg");   
}

void draw() {
  background(0);

  if (escenaActual == 0) {
    image(tituloImg, 0, 0, 800, 450);
  } 
  else if (escenaActual == 1) {
    image(escena1, 0, 0, 800, 450);
  } 
  else if (escenaActual == 2) {
    image(escena2, 0, 0, 800, 450);
  } 
  else if (escenaActual == 3) {
    image(escena3, 0, 0, 800, 450);
  } 
  else if (escenaActual == 4) {
    image(escena4, 0, 0, 800, 450);
  } 
  else if (escenaActual == 7) {
    image(escena4Camino2, 0, 0, 800, 450);
  }
  else if (escenaActual == 10) {
    image(escena5_5, 0, 0, 800, 450);
  }
  else if (escenaActual == 8) {
    image(escena5Camino2, 0, 0, 800, 450);
  }
  else if (escenaActual == 9) {
    image(escena6Camino2, 0, 0, 800, 450);
  }
  else if (escenaActual == 5) {
    image(escena5, 0, 0, 800, 450);
  } 
  else if (escenaActual == 99) {
    image(escenaGameOver, 0, 0, 800, 450);
  }
}

void mouseClicked() {

  if (escenaActual == 0) {
    int btnPlayX = 280;
    int btnPlayY = 320;
    int btnPlayW = 240;
    int btnPlayH = 50;

    if (mouseX > btnPlayX && mouseX < btnPlayX + btnPlayW &&
        mouseY > btnPlayY && mouseY < btnPlayY + btnPlayH) {
      escenaActual = 1; 
    }
  }

  else if (escenaActual == 1 || escenaActual == 2) {
    escenaActual++;
  }
  else if (escenaActual == 4) {
    escenaActual = 5;
  }
  else if (escenaActual == 7) {
    escenaActual = 8;
  }
  else if (escenaActual == 10) {
    escenaActual = 8;
  }
  else if (escenaActual == 8) {
    escenaActual = 9;
  }

  else if (escenaActual == 3) {
    int btnCamino1X = 100;
    int btnCamino1Y = 360;
    int btnCamino1W = 280;
    int btnCamino1H = 60;

    int btnCamino2X = 420;
    int btnCamino2Y = 360;
    int btnCamino2W = 280;
    int btnCamino2H = 60;

    if (mouseX > btnCamino1X && mouseX < btnCamino1X + btnCamino1W &&
        mouseY > btnCamino1Y && mouseY < btnCamino1Y + btnCamino1H) {
      escenaActual = 4; 
    }
    
    else if (mouseX > btnCamino2X && mouseX < btnCamino2X + btnCamino2W &&
             mouseY > btnCamino2Y && mouseY < btnCamino2Y + btnCamino2H) {
      escenaActual = 7; 
    }
  }

  else if (escenaActual == 5) {

    int btnAtacarX = 110;
    int btnAtacarY = 345;
    int btnAtacarW = 250;
    int btnAtacarH = 60;

    int btnEsquivarX = 440;
    int btnEsquivarY = 345;
    int btnEsquivarW = 250;
    int btnEsquivarH = 60;

    if (mouseX > btnAtacarX && mouseX < btnAtacarX + btnAtacarW &&
        mouseY > btnAtacarY && mouseY < btnAtacarY + btnAtacarH) {
      escenaActual = 99; 
    }

    else if (mouseX > btnEsquivarX && mouseX < btnEsquivarX + btnEsquivarW &&
             mouseY > btnEsquivarY && mouseY < btnEsquivarY + btnEsquivarH) {
      escenaActual = 10; 
    }
  }
}

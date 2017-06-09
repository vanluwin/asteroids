//define o contrutor Nave
function Nave(){
   this.posicao = createVector(width/2,height/2);//define a posição inicial como o centro da tela
   this.velocidade = createVector(0,0);          //define a velocidade como o vetor nulo
   this.acele = createVector(0, 0);              //define a aceleração como o vetor nulo
   this.angulo = 0;                              //define o angulo inicial como zero
   this.k = 0;                                   //define o multiplicador do angulo inicialmente como zero
   this.r = 20;                                  //raio para ser verificado colisões
   this.isBoosting = false;                      //define o estado 'está acelerando' como falso
   this.morto = false;                           //define o estado 'morto' como falso

  this.boosting = function(b) {   //função para definir o estado 'está acelerando' como o parametro b
    this.isBoosting = b;
  }

  //define o metodo para mostrar a nave
  this.mostrar = function() {
    this.angulo += this.k;  //adiciona ao angulo o multiplicador 'k'
    stroke(255);            //define o contorno com a cor branco
    fill(0);                //preence a forma com preto
    rectMode(CENTER);
    push();                 //começa uma nova rotina de desenho
    translate(this.posicao.x, this.posicao.y);  //muda o centro de cordenadas da tela para a atual posição da nave
    rotate(this.angulo);                        //roda a nave em seu atual angulo
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);//forma da nave
    pop();                 //encerra a nova rotina de desenho a retorna a padrão
    //rect(0, 0, 10, 20);
    //image(ship, this.posicao.x, this.posicao.y);
  }

  //define o metodo para mover a nave
  this.update = function() {

    if (this.isBoosting) {    //se a nave 'está acelerando' o metodo boost é chamado
      this.boost();
    }
    this.posicao.add(this.velocidade); //se não é adicionado ao vetor posição o vetor velocidade
    this.velocidade.mult(0.99);       //diminiu o vetor velocidade em 1% a cada vez que o metodo é chamado o que fará a nave parar de se mover
  }

  //define o metodo para a aceleração da nave
  this.boost = function(){
    this.acele = p5.Vector.fromAngle(this.angulo-PI/2); //cria um vetor a partir do angulo da nave que aponta para cima
    this.acele.mult(0.1);                              //adiciona um multiplicador, ao vetor aceleração para que eventualmente ele zere
    this.velocidade.add(this.acele);                  // é adicionado ao vetor velocidade o vetor aceleração
  }

  //define o metodo para verificar se a nave se encontra nas bordas da tela
  //e altera a posição da nave para a possição correspondente no oposto da tela
  this.edges = function(){
    if(this.posicao.x > width){
      this.posicao.x = 0;
    }else if(this.posicao.x < 0){
      this.posicao.x = width;
    }
    if(this.posicao.y > height){
      this.posicao.y = 0;
    }else if(this.posicao.y < 0){
      this.posicao.y = height;
    }
  }

  //define o metodo que verifica se a nave foi atingida
  this.atingida = function( meteoro) {
    //cria a variavel 'd' que recebe a distancia entre a posicção atual da nave e o meteoro que foi passado como parâmetro
    var d = dist(this.posicao.x, this.posicao.y, meteoro.posicao.x, meteoro.posicao.y);
    if(d < this.r + meteoro.r-5){ //se o raio de colisão da nave for menor que sua soma com o raio do metroro
      if(vidas == 0){       //se não houver mais vidas escreve na tela fim de jogo
        textSize(30);
        noStroke();
        fill(255,0,0);
        text("       Game Over", 520, 240);
        text("Precione espaço para tentar novamente",420, 280);
        this.morto = true;
        nave = NULL;
      }else{                //se ainda houver vidas
        vidas--;            //uma vida é perdida
        nave = new Nave();  //e a nave volta para o centro da tela
    }

    }
  }

}

//Variaveis que serão usadas por todo o jogo
var nave;
var meteoros = [];
var tiros = [];
var tempo = 3000;
var pontos = 0;
var vidas = 2;

/*
function preload(){
  ship = loadImage('imagens/ship.png');
  imagens[1] = loadImage('imagens/meteoro.png');
  imagens[2] = loadImage('imagens/tiro.png');
}
*/
//função do framework p5js que é executada uma vez ao inicio do sketch
function setup() {
  //cria o lugar onde o jogo acontecerá
  createCanvas(1330,600);

  //cria um obejeto nave
  nave = new Nave();

  //preenche o vetor meteros com obejetos meteoro
  for (var i = 0; i < 10; i++) {
    meteoros.push(new Meteoro());
  }

  //cria um interlo de tempo no qual serão adicionados novos meteros
  setInterval(criarMeteoro, tempo);


}

//funcção para criar novos meteoros
function criarMeteoro(){
  //adiciona no vetor meteoros um novo meteoro
  meteoros.push(new Meteoro());
  //diminui o tempo de criação de novos meteoros ate atingir 0.5s
  if(tempo > 500){
    tempo-=500;
  }
}

//função para adicionar pontos ao placar
function somarPontos(){
    pontos+=20;
}

//função para recarregar a pagina quando o jogador morrer
function recarregar() {
    location.reload();
}

//função do fremework p5 que fica em loop durante a execução do sketch
function draw(){
  //define o fundo do canvas como preto
  background(0);

  //escreve na tela os pontos do jogador e sua vidas restantes
  textSize(25);
  fill(255);
  text(pontos,20, 30);
  text(vidas,20, 60);

  //desenha todos os meteoros
  for (var i = 0; i < meteoros.length; i++) {
    meteoros[i].update();//metodo para mover o meteoro
    meteoros[i].mostrar();//metodo para mostrar o meteoro
    meteoros[i].edges();//metodo para verificar se o meteoro se encontra nas bordas do canvas
    nave.atingida(meteoros[i]);//metodo para verificar se um meteoro atingiu a nave
  }

  //desenha todos os tiros
  for (var i = tiros.length-1; i >= 0; i--){
    tiros[i].mostrar();//metodo pra mostrar os tiros
    tiros[i].mover();//metodo para mover os tiros

    if(tiros[i].offscren()){//verifica se algum tiro saiu da tela
      tiros.splice(i, 1);//remove o tiro que saiu da tela do vetor de tiros
    }else{//se o tiro n estiver fora da tela ele continuara a ser desenhado ate atingir um meteoro
        for(var j = meteoros.length-1; j >=0; j--){//percorrer o vetor de meteoros
          if (tiros[i].hits(meteoros[j])) {        // e verificar se algum tiro atingiu um meteoro
            if (meteoros[j].r > 30) {//verifica se o raio do meteoro é menor que 30
              var novosMeteros = meteoros[j].quebrar();//se for ele será dividido em dois pelo metodo que retorna um vetor com os novos meteoros
              meteoros = meteoros.concat(novosMeteros);//adiciona os novos meteoros no vetor de meteoros
            }
          somarPontos();//adiciona os pontos
          meteoros.splice(j, 1);//remove do vetor meteoros o que foi destruido
          tiros.splice(i, 1);//remove do vetor tiros o tiro que atingiu o meteoro
          break;//sai do for de verificação
        }
      }
    }
  }

  nave.mostrar();//metodo para desenhar a nave
  nave.update();//metodo para mover a nave
  nave.edges();//metodo para verficar se a nave esta nas bordas da tela

}

//função do framework p5 que verifica se alguma tecla foi 'despressionada'
function keyReleased(){
  /*se houver sido uma das diressionais esquerdo ou direito
   o multiplicador do angulo recebe 0 e se foi o diressional
   para cima a nave para de receber aceleração
   */
  if (keyCode === RIGHT_ARROW) {
    nave.k = 0;
  } else if (keyCode === LEFT_ARROW) {
    nave.k = 0;
  }else if (keyCode === UP_ARROW){
    nave.boosting(false);
  }

}

//função do framework p5 que verifica se alguma tecla foi pressionada
function keyPressed() {
  //verifica qual tecla foi pressionada
  if (keyCode === UP_ARROW) {
    //se foi seta para cima addiona aceleração a nave
    nave.boosting(true);
  }else if (keyCode === RIGHT_ARROW) {
    //se foi seta para direita adiona um multiplicador positivo ao angulo para que a nave rode para a direita
    nave.k = 0.03;
  } else if (keyCode === LEFT_ARROW) {
    //se foi seta para esquerda adiona um multiplicador negativo ao angulo para que a nave rode para a esquerda
    nave.k = -0.03;
  } else if (key === ' '){
    //se a telca foi a barra de espaço e a nave esta morta a pagina será recarregada
    //se não um novo tiro sera criado e adicionado no vetor tiros
    if(nave.morto){
      recarregar();
    }else{
      var tiro = new Tiro(nave.posicao, nave.angulo);
      tiros.push(tiro);
    }

  }
}

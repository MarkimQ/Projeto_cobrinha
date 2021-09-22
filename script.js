let canvas = document.getElementById("cobra"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let cobra = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
cobra[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criar_fundo(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha(){
    for(i = 0; i < cobra.length; i++){
        context.fillStyle = "green";
        context.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}

function comida(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){  
    
    
    if(cobra[0].x > 15 * box && direction == 'right') cobra[0].x = 0
    if(cobra[0].x > 15 * box && direction == 'up') cobra[0].x = 0
    if(cobra[0].x > 15 * box && direction == 'down') cobra[0].x = 0

    if(cobra[0].x < 0  && direction == 'left') cobra[0].x = 15 * box
    if(cobra[0].x < 0  && direction == 'up') cobra[0].x = 15 * box
    if(cobra[0].x < 0  && direction == 'down') cobra[0].x = 15 * box

    if(cobra[0].y > 15 * box && direction == 'down') cobra[0].y = 0
    if(cobra[0].y > 15 * box && direction == 'right') cobra[0].y = 0
    if(cobra[0].y > 15 * box && direction == 'left') cobra[0].y = 0

    if(cobra[0].y < 0 && direction == 'up') cobra[0].y = 15 * box
    if(cobra[0].y < 0 && direction == 'right') cobra[0].y = 15 * box
    if(cobra[0].y < 0 && direction == 'left') cobra[0].y = 15 * box

       
    
    for(i = 1; i < cobra.length; i++){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criar_fundo();
    criarCobrinha();
    comida();

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if(direction == "right") cobraX += box;
    if(direction == "left") cobraX -= box;
    if (direction == "up") cobraY -= box;
    if(direction == "down") cobraY += box;

    if(cobraX != food.x || cobraY != food.y){
        cobra.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);
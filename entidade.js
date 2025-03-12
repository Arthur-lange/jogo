const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
let gameOver

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando == false && !gameOver){
        personagem.velocidadey = 15
        console.log("PULOU")
        personagem.pulando = true
    }
    if(e.code == 'Enter' && gameOver){
        reiniciarJogo()
    }
})

class entidade{
    #gravidade
    constructor(x,y,largura,altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5
    }
    get gravidade(){
        return this.#gravidade 
    }
}
class personagem extends entidade{
    constructor(x,y,largura,altura){
        super(x,y,largura,altura)
    }
}
class obstaculo extends entidade{
    constructor(x,y,largura,altura){
        super(x,y,largura,altura)
    }
}

const x = new entidade(10,20,30,50)
console.log(x.gravidade)

function loop(){
    if (gameOver) {
        desenharGameOver()
        return
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    desenharPersonagem()
    desenharObstaculo()
    atualizarPersonagem()
    atualizarObstaculo()
    detectarColisao()
    
    requestAnimationFrame(loop)
}

loop()

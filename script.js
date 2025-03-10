const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 0.5
let gameOver = false

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

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
}

function desenharPersonagem(){
    // Desenha a cabeça
    ctx.fillStyle = 'peachpuff'
    ctx.beginPath()
    ctx.arc(personagem.x + 25, personagem.y, 15, 0, Math.PI * 2)
    ctx.fill()
    
    // Desenha os olhos
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(personagem.x + 20, personagem.y - 5, 2, 0, Math.PI * 2)
    ctx.arc(personagem.x + 30, personagem.y - 5, 2, 0, Math.PI * 2)
    ctx.fill()
    
    // Desenha o nariz
    ctx.fillStyle = 'brown'
    ctx.beginPath()
    ctx.arc(personagem.x + 25, personagem.y, 2, 0, Math.PI * 2)
    ctx.fill()
    
    // Desenha a boca
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.arc(personagem.x + 25, personagem.y + 5, 5, 0, Math.PI)
    ctx.stroke()
    
    // Desenha o corpo (terno verde)
    ctx.fillStyle = 'green'
    ctx.fillRect(personagem.x + 15, personagem.y + 15, 20, 30)
    
    // Desenha a gravata
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(personagem.x + 25, personagem.y + 15)
    ctx.lineTo(personagem.x + 22, personagem.y + 25)
    ctx.lineTo(personagem.x + 28, personagem.y + 25)
    ctx.fill()
    
    // Desenha as pernas
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(personagem.x + 20, personagem.y + 45)
    ctx.lineTo(personagem.x + 15, personagem.y + 60)
    ctx.moveTo(personagem.x + 30, personagem.y + 45)
    ctx.lineTo(personagem.x + 35, personagem.y + 60)
    ctx.stroke()
    
    // Desenha os braços
    ctx.beginPath()
    ctx.moveTo(personagem.x + 15, personagem.y + 20)
    ctx.lineTo(personagem.x, personagem.y + 35)
    ctx.moveTo(personagem.x + 35, personagem.y + 20)
    ctx.lineTo(personagem.x + 50, personagem.y + 35)
    ctx.stroke()
}

function atualizarPersonagem(){
    if(personagem.pulando){
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if(personagem.y >= canvas.height - 50){
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height - 50
        }
    }
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 7
}

function desenharObstaculo(){
    let gradient = ctx.createLinearGradient(obstaculo.x, obstaculo.y, obstaculo.x, obstaculo.y + obstaculo.altura)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(0.5, 'orange')
    gradient.addColorStop(1, 'darkred')
    
    ctx.fillStyle = gradient
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
    
    for(let i = 0; i < 5; i++){
        let bubbleX = obstaculo.x + Math.random() * obstaculo.largura
        let bubbleY = obstaculo.y + Math.random() * obstaculo.altura
        let bubbleSize = Math.random() * 5 + 3
        ctx.fillStyle = 'yellow'
        ctx.beginPath()
        ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2)
        ctx.fill()
    }
}

function atualizarObstaculo(){
    obstaculo.x -= obstaculo.velocidadex
    if(obstaculo.x <= 0 - obstaculo.largura){
        obstaculo.x = canvas.width
        obstaculo.velocidadex += 0.2
        let nova_altura = (Math.random() * 50) + 100
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
    }
}

function detectarColisao(){
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        console.log("GAME OVER")
        gameOver = true
    }
}

function desenharGameOver(){
    ctx.fillStyle = 'black'
    ctx.font = '50px Arial'
    ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2)
    ctx.font = '20px Arial'
    ctx.fillText('Pressione ENTER para reiniciar', canvas.width / 2 - 150, canvas.height / 2 + 40)
}

function reiniciarJogo(){
    gameOver = false
    personagem.y = canvas.height - 50
    personagem.velocidadey = 0
    obstaculo.x = canvas.width - 50
    obstaculo.velocidadex = 7
    loop()
}

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

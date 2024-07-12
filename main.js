const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
//querySelectorAll = para pegar todos os elementos da lista
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('#start-pause img');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioFinalizado = new Audio('./sons/beep.mp3');
const tempoNaTela = document.querySelector('#timer');
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
/*
addEventListener = permite que registremos funções (callbacks) que serão chamadas quando um evento específico ocorrer.
elemento.addEventListener(evento, callback);

elemento: É o elemento HTML ao qual queremos associar o evento.
evento: É uma string que representa o tipo de evento que desejamos capturar.
callback: É a função que será chamada quando o evento ocorrer.
*/
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    //setAttribute = setar um atributo, existem outros com removeAttribute ou getAtribute
    // html.setAttribute('data-contexto','foco');
    // banner.setAttribute('src', './imagens/foco.png')
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            //innerHTML = inserir texto e TAG no html
            //muito bom para fazer listas, so colocar o simbolo +=
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faca uma pausa`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar a superfice<br>
                <strong class="app__title-strong">Faca uma pausa longa`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioFinalizado.play();
        alert('Tempo Finalizado');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}
startPauseBt.addEventListener('click', iniciarOuPausar);
function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play();
        zerar();
        return; 
    }
    
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    //textContent = ideal para inserir somente texto
    iniciarOuPausarBt.textContent = 'Pausar';
    iniciarOuPausarImg.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarOuPausarImg.setAttribute('src', './imagens/play_arrow.png');
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo();
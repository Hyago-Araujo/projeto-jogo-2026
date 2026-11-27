const personagemJogo = document.getElementById("personagem");
const cenarioJogo = document.getElementById("cenario");
const npcVendedor = document.getElementById("npc-vendedor");
const interacaoVendedor = document.getElementById("interacao-vendedor");

const dialogo = document.getElementById("dialogo");
const dialogoPersonagem = document.getElementById("dialogo-personagem");
const dialogoTexto = document.getElementById("dialogo-texto");
const dialogoContinuar = document.getElementById("dialogo-continuar");

const transicao = document.getElementById("transicao");

let vidaMaxima = 100;
let vidaAtual = 100;

const barraVida = document.getElementById("vida-barra");
const textoVida = document.getElementById("vida-texto");

let posicaoX = 250;
let posicaoY = 0;

const velocidadeAndar = 1.2;
const velocidadeCorrer = 2.4;
const velocidadeDodge = 5;

const caminhoPagina = window.location.pathname.toLowerCase();

const cidade = npcVendedor !== null;
const bifurcacao = caminhoPagina.includes("cena-03-bifurcacao");
const lago = caminhoPagina.includes("cena-04-lago");
const floresta = !cidade && !bifurcacao && !lago;

const alturaChao = cidade ? 105 : 80;

const teclas = {
    esquerda: false,
    direita: false,
    shift: false,
    control: false
};

let pulando = false;
let atacando = false;
let defendendo = false;
let dandoDodge = false;
let agachado = false;

let personagemMorto = false;

let goblinDerrotado = false;
let dialogoDerrotaGoblin = false;
let dialogoBifurcacao = false;
let escolhaBifurcacaoAberta = false;
let bifurcacaoDialogoIniciado = false;

let dialogoLagoIniciado = false;
let dialogoLagoFinalizado = false;

let velocidadePulo = 0;
let direcaoDodge = 1;

let dialogoAberto = false;
let dialogoFinalizado = false;
let indiceDialogo = 0;

let transicaoIniciada = false;

let seguindoCaminho = false;
let caminhoEscolhido = "";

const velocidadeCaminho = 2;
const forcaPulo = 10;
const gravidade = 0.35;
const distanciaInteracao = 180;

const falas = [
    {
        personagem: "Vendedor",
        texto: "Você é o caçador que veio de fora da cidade?"
    },
    {
        personagem: "Caçador",
        texto: "Sim. Fui enviado para investigar as ruínas."
    },
    {
        personagem: "Vendedor",
        texto: "Então você deve estar procurando por isto."
    },
    {
        personagem: "Vendedor",
        texto: "O rei deixou esta carta comigo antes de sua partida."
    },
    {
        personagem: "Vendedor",
        texto: "Ele pediu que eu a entregasse pessoalmente ao responsável pela missão."
    },
    {
        personagem: "Caçador",
        texto: "A carta do rei..."
    },
    {
        personagem: "Caçador",
        texto: "Agora entendo por que fui enviado até aqui."
    },
    {
        personagem: "Vendedor",
        texto: "Leia com atenção. O caminho até as ruínas não será fácil."
    },
    {
        personagem: "Caçador",
        texto: "Entendido. Vou partir assim que estiver preparado."
    }
];

const falasFloresta = [
    {
        personagem: "Caçador",
        texto: "As ruínas devem estar por aqui."
    },
    {
        personagem: "Caçador",
        texto: "...O que foi isso?"
    },
    {
        personagem: "Caçador",
        texto: "Um goblin?!"
    },
    {
        personagem: "Caçador",
        texto: "Parece que teremos problemas."
    }
];

const falasDerrotaGoblin = [
    {
        personagem: "Caçador",
        texto: "Consegui derrotar aquele goblin."
    },
    {
        personagem: "Caçador",
        texto: "Agora posso continuar minha jornada."
    }
];

const falasBifurcacao = [
    {
        personagem: "Caçador",
        texto: "O caminho se divide..."
    },
    {
        personagem: "Caçador",
        texto: "Preciso decidir por onde seguir."
    },
    {
        personagem: "Caçador",
        texto: "Qual caminho devo seguir?"
    }
];

const falasLago = [
    {
        personagem: "Caçador",
        texto: "Então era aqui que o caminho terminava..."
    },
    {
        personagem: "Caçador",
        texto: "Esse lago parece tranquilo demais."
    },
    {
        personagem: "Lobo Glacial",
        texto: "GRRRRRR..."
    },
    {
        personagem: "Caçador",
        texto: "Então você é a criatura que estava escondida por aqui."
    },
    {
        personagem: "Caçador",
        texto: "Não vou deixar você impedir minha passagem."
    }
];

if (floresta || bifurcacao) {
    posicaoX = 80;
}

personagemJogo.style.left = posicaoX + "px";
personagemJogo.style.bottom = alturaChao + "px";


function atualizarVida() {
    const porcentagem =
        (vidaAtual / vidaMaxima) * 100;

    barraVida.style.width =
        porcentagem + "%";

    textoVida.textContent =
        vidaAtual + " / " + vidaMaxima;
}


atualizarVida();


function receberDano(dano) {

    if (
        dandoDodge ||
        personagemMorto
    ) {
        return;
    }

    vidaAtual -= dano;

    if (vidaAtual < 0) {
        vidaAtual = 0;
    }

    atualizarVida();

    if (vidaAtual <= 0) {
        morrerPersonagem();
    }
}


window.receberDanoJogador = receberDano;


function morrerPersonagem() {

    if (personagemMorto) {
        return;
    }

    personagemMorto = true;
    seguindoCaminho = false;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    pulando = false;
    atacando = false;
    defendendo = false;
    dandoDodge = false;
    agachado = false;

    dialogoAberto = false;

    if (interacaoVendedor) {
        interacaoVendedor.classList.remove("ativo");
    }

    if (dialogo) {
        dialogo.classList.remove("ativo");
    }

    if (
        typeof window.pararMovimentoGoblin ===
        "function"
    ) {
        window.pararMovimentoGoblin();
    }

    if (
        typeof window.pararMovimentoLobo ===
        "function"
    ) {
        window.pararMovimentoLobo();
    }

    if (
        typeof window.pararMovimentoInimigo ===
        "function"
    ) {
        window.pararMovimentoInimigo();
    }

    if (
        typeof window.iniciarMorte ===
        "function"
    ) {
        window.iniciarMorte();
    }

    setTimeout(function() {
        window.location.reload();
    }, 1500);
}


function distanciaDoVendedor() {

    if (!npcVendedor) {
        return Infinity;
    }

    const personagemCentro =
        posicaoX +
        personagemJogo.offsetWidth / 2;

    const vendedorLeft =
        npcVendedor.offsetLeft;

    const vendedorCentro =
        vendedorLeft +
        npcVendedor.offsetWidth / 2;

    return Math.abs(
        personagemCentro -
        vendedorCentro
    );
}


function verificarInteracao() {

    if (!cidade) {
        return;
    }

    if (
        dialogoAberto ||
        dialogoFinalizado ||
        personagemMorto
    ) {

        interacaoVendedor.classList.remove(
            "ativo"
        );

        return;
    }

    const distancia =
        distanciaDoVendedor();

    if (
        distancia <=
        distanciaInteracao
    ) {

        interacaoVendedor.classList.add(
            "ativo"
        );

    } else {

        interacaoVendedor.classList.remove(
            "ativo"
        );
    }
}


function iniciarDialogo() {

    if (
        !cidade ||
        personagemMorto ||
        dialogoFinalizado
    ) {
        return;
    }

    const distancia =
        distanciaDoVendedor();

    if (
        distancia >
        distanciaInteracao
    ) {
        return;
    }

    dialogoAberto = true;
    indiceDialogo = 0;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;

    mostrarFala();

    interacaoVendedor.classList.remove(
        "ativo"
    );

    trocarAnimacao("idle");
}


function iniciarDialogoFloresta() {

    if (
        !floresta ||
        personagemMorto ||
        dialogoAberto ||
        dialogoFinalizado ||
        goblinDerrotado
    ) {
        return;
    }

    dialogoAberto = true;
    indiceDialogo = 0;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;

    mostrarFalaFloresta();

    trocarAnimacao("idle");
}


function iniciarDialogoLago() {

    if (
        !lago ||
        personagemMorto ||
        dialogoLagoIniciado
    ) {
        return;
    }

    dialogoLagoIniciado = true;
    dialogoLagoFinalizado = false;

    dialogoAberto = true;
    dialogoFinalizado = false;
    indiceDialogo = 0;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    if (
        typeof window.pararMovimentoLobo ===
        "function"
    ) {
        window.pararMovimentoLobo();
    }

    mostrarFalaLago();

    trocarAnimacao("idle");
}


function mostrarFala() {

    const fala =
        falas[indiceDialogo];

    dialogoPersonagem.textContent =
        fala.personagem;

    dialogoTexto.textContent =
        fala.texto;

    dialogoContinuar.textContent =
        "Pressione E para continuar";

    dialogo.classList.add("ativo");
}


function mostrarFalaFloresta() {

    const fala =
        falasFloresta[indiceDialogo];

    dialogoPersonagem.textContent =
        fala.personagem;

    dialogoTexto.textContent =
        fala.texto;

    dialogoContinuar.textContent =
        "Pressione E para continuar";

    dialogo.classList.add("ativo");
}


function mostrarFalaDerrotaGoblin() {

    const fala =
        falasDerrotaGoblin[indiceDialogo];

    dialogoPersonagem.textContent =
        fala.personagem;

    dialogoTexto.textContent =
        fala.texto;

    dialogoContinuar.textContent =
        "Pressione E para continuar";

    dialogo.classList.add("ativo");
}


function mostrarFalaLago() {

    const fala =
        falasLago[indiceDialogo];

    dialogoPersonagem.textContent =
        fala.personagem;

    dialogoTexto.textContent =
        fala.texto;

    dialogoContinuar.textContent =
        "Pressione E para continuar";

    dialogo.classList.add("ativo");
}


function continuarDialogo() {

    if (!dialogoAberto) {
        return;
    }

    indiceDialogo++;

    if (
        indiceDialogo >=
        falas.length
    ) {

        finalizarDialogo();

        return;
    }

    mostrarFala();
}


function continuarDialogoFloresta() {

    if (!dialogoAberto) {
        return;
    }

    indiceDialogo++;

    if (
        indiceDialogo >=
        falasFloresta.length
    ) {

        dialogoAberto = false;
        dialogoFinalizado = true;

        dialogo.classList.remove(
            "ativo"
        );

        dialogoPersonagem.textContent = "";
        dialogoTexto.textContent = "";

        if (
            typeof window.iniciarMovimentoGoblin ===
            "function"
        ) {
            window.iniciarMovimentoGoblin();
        }

        atualizarEstadoAnimacao();

        return;
    }

    mostrarFalaFloresta();
}


function continuarDialogoLago() {

    if (!dialogoAberto) {
        return;
    }

    indiceDialogo++;

    if (
        indiceDialogo >=
        falasLago.length
    ) {

        finalizarDialogoLago();

        return;
    }

    mostrarFalaLago();
}


function finalizarDialogoLago() {

    dialogoAberto = false;
    dialogoFinalizado = true;
    dialogoLagoFinalizado = true;

    dialogo.classList.remove(
        "ativo"
    );

    dialogoPersonagem.textContent = "";
    dialogoTexto.textContent = "";

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    atualizarEstadoAnimacao();

    if (
        typeof window.iniciarMovimentoLobo ===
        "function"
    ) {
        window.iniciarMovimentoLobo();
    }
}


function mostrarFalaBifurcacao() {

    const fala =
        falasBifurcacao[indiceDialogo];

    dialogoPersonagem.textContent =
        fala.personagem;

    dialogoTexto.textContent =
        fala.texto;

    dialogoContinuar.textContent =
        "Pressione E para continuar";

    dialogo.classList.add("ativo");
}


function iniciarDialogoBifurcacao() {

    if (
        !bifurcacao ||
        personagemMorto ||
        dialogoAberto ||
        dialogoFinalizado ||
        bifurcacaoDialogoIniciado
    ) {
        return;
    }

    bifurcacaoDialogoIniciado = true;
    dialogoBifurcacao = true;
    dialogoAberto = true;
    indiceDialogo = 0;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    mostrarFalaBifurcacao();

    trocarAnimacao("idle");
}


function continuarDialogoBifurcacao() {

    if (!dialogoAberto) {
        return;
    }

    indiceDialogo++;

    if (
        indiceDialogo >=
        falasBifurcacao.length
    ) {

        dialogoAberto = false;
        dialogoFinalizado = true;
        dialogoBifurcacao = false;

        dialogo.classList.remove(
            "ativo"
        );

        dialogoPersonagem.textContent = "";
        dialogoTexto.textContent = "";

        mostrarEscolhaBifurcacao();
        atualizarEstadoAnimacao();

        return;
    }

    mostrarFalaBifurcacao();
}


function mostrarEscolhaBifurcacao() {

    const escolha =
        document.getElementById(
            "escolha-bifurcacao"
        );

    if (!escolha) {
        return;
    }

    escolha.classList.add("ativo");
    escolhaBifurcacaoAberta = true;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    trocarAnimacao("idle");
}


function escolherCaminho(caminho) {

    if (
        !bifurcacao ||
        !escolhaBifurcacaoAberta
    ) {
        return;
    }

    escolhaBifurcacaoAberta = false;

    const escolha =
        document.getElementById(
            "escolha-bifurcacao"
        );

    if (escolha) {
        escolha.classList.remove(
            "ativo"
        );
    }

    if (
        caminho === "lago"
    ) {

        localStorage.setItem(
            "caminhoEscolhido",
            "lago"
        );

    } else {

        localStorage.setItem(
            "caminhoEscolhido",
            "montanhas"
        );
    }

    caminhoEscolhido =
        caminho;

    const textoEscolha =
        caminho === "lago"
            ? "Vou seguir pelo caminho do lago."
            : "Vou seguir pelo caminho das montanhas.";

    dialogoPersonagem.textContent =
        "Caçador";

    dialogoTexto.textContent =
        textoEscolha;

    dialogoContinuar.textContent =
        "Caminho escolhido";

    dialogo.classList.add(
        "ativo"
    );

    dialogoAberto = true;
    dialogoFinalizado = false;
    dialogoBifurcacao = true;

    setTimeout(function() {

        dialogo.classList.remove(
            "ativo"
        );

        dialogoAberto = false;
        dialogoBifurcacao = false;
        dialogoFinalizado = true;

        iniciarCaminhoAutomatico();

    }, 1000);
}


function iniciarCaminhoAutomatico() {

    if (
        !bifurcacao ||
        !caminhoEscolhido ||
        personagemMorto
    ) {
        return;
    }

    seguindoCaminho = true;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    trocarAnimacao("walk");
}


function atualizarCaminhoAutomatico() {

    const larguraCenario =
        cenarioJogo.clientWidth;

    const destinoX =
        caminhoEscolhido === "lago"
            ? larguraCenario * 0.30
            : larguraCenario * 0.70;

    const destinoBottom =
        alturaChao + 190;

    const atualX =
        posicaoX;

    const atualBottom =
        parseFloat(
            personagemJogo.style.bottom
        ) || alturaChao;

    const diferencaX =
        destinoX - atualX;

    const diferencaBottom =
        destinoBottom - atualBottom;

    const distancia =
        Math.sqrt(
            (diferencaX * diferencaX) +
            (diferencaBottom * diferencaBottom)
        );

    if (
        distancia <=
        velocidadeCaminho
    ) {

        posicaoX =
            destinoX;

        personagemJogo.style.left =
            posicaoX + "px";

        personagemJogo.style.bottom =
            destinoBottom + "px";

        seguindoCaminho = false;

        iniciarTransicaoCaminho();

        return;
    }

    const movimentoX =
        (diferencaX / distancia) *
        velocidadeCaminho;

    const movimentoBottom =
        (diferencaBottom / distancia) *
        velocidadeCaminho;

    posicaoX +=
        movimentoX;

    personagemJogo.style.left =
        posicaoX + "px";

    personagemJogo.style.bottom =
        (atualBottom + movimentoBottom) +
        "px";

    if (movimentoX < 0) {
        personagemJogo.style.transform =
            "scaleX(-1)";
    } else if (movimentoX > 0) {
        personagemJogo.style.transform =
            "scaleX(1)";
    }
}


function iniciarTransicaoCaminho() {

    if (
        transicaoIniciada ||
        personagemMorto
    ) {
        return;
    }

    transicaoIniciada = true;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    trocarAnimacao("idle");

    if (transicao) {

        transicao.classList.add(
            "ativa"
        );

        setTimeout(function() {

            if (
                caminhoEscolhido ===
                "lago"
            ) {

                window.location.href =
                    "cena-04-lago.html";

            } else {

                window.location.href =
                    "cena-04-montanhas.html";
            }

        }, 600);

    }
}


function iniciarDialogoDerrotaGoblin() {

    if (
        !floresta ||
        personagemMorto ||
        dialogoDerrotaGoblin
    ) {
        return;
    }

    goblinDerrotado = true;
    dialogoDerrotaGoblin = true;
    dialogoAberto = true;
    indiceDialogo = 0;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    if (
        typeof window.pararMovimentoGoblin ===
        "function"
    ) {
        window.pararMovimentoGoblin();
    }

    mostrarFalaDerrotaGoblin();

    trocarAnimacao("idle");
}


function continuarDialogoDerrotaGoblin() {

    if (!dialogoAberto) {
        return;
    }

    indiceDialogo++;

    if (
        indiceDialogo >=
        falasDerrotaGoblin.length
    ) {

        dialogoAberto = false;
        dialogoDerrotaGoblin = false;

        dialogo.classList.remove(
            "ativo"
        );

        dialogoPersonagem.textContent = "";
        dialogoTexto.textContent = "";

        atualizarEstadoAnimacao();

        return;
    }

    mostrarFalaDerrotaGoblin();
}


function finalizarDialogo() {

    dialogoAberto = false;
    dialogoFinalizado = true;

    dialogo.classList.remove(
        "ativo"
    );

    dialogoPersonagem.textContent = "";
    dialogoTexto.textContent = "";

    if (interacaoVendedor) {
        interacaoVendedor.classList.remove(
            "ativo"
        );
    }

    atualizarEstadoAnimacao();
}


function iniciarTransicao() {

    if (
        transicaoIniciada ||
        personagemMorto
    ) {
        return;
    }

    transicaoIniciada = true;

    teclas.esquerda = false;
    teclas.direita = false;
    teclas.shift = false;
    teclas.control = false;

    pulando = false;
    atacando = false;
    defendendo = false;
    dandoDodge = false;
    agachado = false;

    if (transicao) {

        transicao.classList.add(
            "ativa"
        );

        setTimeout(function() {

            if (cidade) {

                window.location.href =
                    "cena-02-floresta.html";

            } else if (floresta) {

                window.location.href =
                    "cena-03-bifurcacao.html";
            }

        }, 600);

    } else {

        if (cidade) {

            window.location.href =
                "cena-02-floresta.html";

        } else if (floresta) {

            window.location.href =
                "cena-03-bifurcacao.html";
        }
    }
}


function verificarSaidaDoCenario() {

    if (bifurcacao) {
        return;
    }

    if (
        floresta &&
        !goblinDerrotado
    ) {
        return;
    }

    if (
        transicaoIniciada ||
        personagemMorto
    ) {
        return;
    }

    const larguraCenario =
        cenarioJogo.clientWidth;

    const larguraPersonagem =
        personagemJogo.offsetWidth;

    const limiteDireito =
        larguraCenario -
        larguraPersonagem;

    if (
        posicaoX >=
        limiteDireito
    ) {

        posicaoX =
            limiteDireito;

        personagemJogo.style.left =
            posicaoX + "px";

        iniciarTransicao();
    }
}


window.addEventListener(
    "keydown",
    function(evento) {

        if (personagemMorto) {
            return;
        }

        if (
            evento.code ===
            "KeyE"
        ) {

            evento.preventDefault();

            if (dialogoAberto) {

                if (
                    lago &&
                    dialogoLagoIniciado
                ) {

                    continuarDialogoLago();

                } else if (
                    floresta &&
                    dialogoDerrotaGoblin
                ) {

                    continuarDialogoDerrotaGoblin();

                } else if (
                    floresta
                ) {

                    continuarDialogoFloresta();

                } else if (
                    bifurcacao &&
                    dialogoBifurcacao
                ) {

                    continuarDialogoBifurcacao();

                } else {

                    continuarDialogo();
                }

            } else {

                if (floresta) {

                    iniciarDialogoFloresta();

                } else if (bifurcacao) {

                    iniciarDialogoBifurcacao();

                } else if (lago) {

                    iniciarDialogoLago();

                } else {

                    iniciarDialogo();
                }
            }

            return;
        }

        if (
            dialogoAberto ||
            transicaoIniciada ||
            seguindoCaminho
        ) {
            return;
        }

        if (
            evento.code === "ArrowRight" ||
            evento.code === "KeyD"
        ) {

            evento.preventDefault();

            teclas.direita = true;

            personagemJogo.style.transform =
                "scaleX(1)";

            atualizarEstadoAnimacao();
        }

        if (
            evento.code === "ArrowLeft" ||
            evento.code === "KeyA"
        ) {

            evento.preventDefault();

            teclas.esquerda = true;

            personagemJogo.style.transform =
                "scaleX(-1)";

            atualizarEstadoAnimacao();
        }

        if (
            evento.code === "ShiftLeft" ||
            evento.code === "ShiftRight"
        ) {

            evento.preventDefault();

            teclas.shift = true;

            atualizarEstadoAnimacao();
        }

        if (
            evento.code === "Space"
        ) {

            evento.preventDefault();

            if (
                !pulando &&
                !atacando &&
                !defendendo &&
                !dandoDodge &&
                !agachado
            ) {

                pulando = true;

                velocidadePulo =
                    forcaPulo;

                trocarAnimacao("jump");

                atualizarFramePulo(0);
            }
        }

        if (
            evento.code === "ControlLeft" ||
            evento.code === "ControlRight"
        ) {

            evento.preventDefault();

            teclas.control = true;

            if (
                !pulando &&
                !atacando &&
                !defendendo &&
                !dandoDodge
            ) {

                agachado = true;

                trocarAnimacao("crouch");
            }
        }

        if (
            evento.code === "KeyC"
        ) {

            evento.preventDefault();

            if (
                !dandoDodge &&
                !atacando &&
                !defendendo &&
                !pulando &&
                !agachado
            ) {

                executarDodge();
            }
        }
    }
);


window.addEventListener(
    "keyup",
    function(evento) {

        if (personagemMorto) {
            return;
        }

        if (
            evento.code === "ArrowRight" ||
            evento.code === "KeyD"
        ) {
            teclas.direita = false;
        }

        if (
            evento.code === "ArrowLeft" ||
            evento.code === "KeyA"
        ) {
            teclas.esquerda = false;
        }

        if (
            evento.code === "ShiftLeft" ||
            evento.code === "ShiftRight"
        ) {
            teclas.shift = false;
        }

        if (
            evento.code === "ControlLeft" ||
            evento.code === "ControlRight"
        ) {

            evento.preventDefault();

            teclas.control = false;
            agachado = false;
        }

        atualizarEstadoAnimacao();
    }
);


window.addEventListener(
    "blur",
    function() {

        if (personagemMorto) {
            return;
        }

        teclas.esquerda = false;
        teclas.direita = false;
        teclas.shift = false;
        teclas.control = false;

        if (agachado) {
            agachado = false;
        }

        atualizarEstadoAnimacao();
    }
);


window.addEventListener(
    "mousedown",
    function(evento) {

        if (
            personagemMorto ||
            dialogoAberto ||
            transicaoIniciada ||
            seguindoCaminho
        ) {
            return;
        }

        if (
            evento.button === 0
        ) {

            if (
                atacando ||
                defendendo ||
                dandoDodge ||
                agachado
            ) {
                return;
            }

            atacando = true;

            iniciarAtaque();
        }

        if (
            evento.button === 2
        ) {

            evento.preventDefault();

            if (
                pulando ||
                atacando ||
                dandoDodge ||
                agachado
            ) {
                return;
            }

            defendendo = true;

            iniciarDefesa();
        }
    }
);


window.addEventListener(
    "mouseup",
    function(evento) {

        if (personagemMorto) {
            return;
        }

        if (
            evento.button === 2
        ) {

            defendendo = false;

            atualizarEstadoAnimacao();
        }
    }
);


window.addEventListener(
    "contextmenu",
    function(evento) {
        evento.preventDefault();
    }
);


function executarDodge() {

    if (
        personagemMorto ||
        dandoDodge
    ) {
        return;
    }

    const dodgeIniciado =
        iniciarDodgeAnimacao();

    if (!dodgeIniciado) {
        return;
    }

    dandoDodge = true;

    if (
        personagemJogo.style.transform ===
        "scaleX(-1)"
    ) {

        direcaoDodge = -1;

    } else {

        direcaoDodge = 1;
    }
}


function iniciarDodgeAnimacao() {

    if (
        typeof window.iniciarDodge ===
        "function"
    ) {

        return window.iniciarDodge();
    }

    return false;
}


function atualizarEstadoAnimacao() {

    if (
        personagemMorto ||
        dialogoAberto ||
        transicaoIniciada ||
        seguindoCaminho
    ) {
        return;
    }

    if (
        atacando ||
        defendendo ||
        dandoDodge ||
        pulando
    ) {
        return;
    }

    if (agachado) {

        trocarAnimacao("crouch");

        return;
    }

    if (
        teclas.esquerda ||
        teclas.direita
    ) {

        if (teclas.shift) {

            trocarAnimacao("run");

        } else {

            trocarAnimacao("walk");
        }

    } else {

        trocarAnimacao("idle");
    }
}


function atualizarFrameDoPulo() {

    const alturaMaxima =
        (forcaPulo * forcaPulo) /
        (2 * gravidade);

    let progresso =
        posicaoY /
        alturaMaxima;

    if (progresso < 0) {
        progresso = 0;
    }

    if (progresso > 1) {
        progresso = 1;
    }

    let frame;

    if (
        velocidadePulo > 0
    ) {

        if (progresso < 0.15) {
            frame = 0;
        } else if (progresso < 0.30) {
            frame = 1;
        } else if (progresso < 0.45) {
            frame = 2;
        } else if (progresso < 0.60) {
            frame = 3;
        } else {
            frame = 4;
        }

    } else {

        if (progresso > 0.85) {
            frame = 4;
        } else if (progresso > 0.70) {
            frame = 5;
        } else if (progresso > 0.50) {
            frame = 6;
        } else if (progresso > 0.25) {
            frame = 7;
        } else {
            frame = 8;
        }
    }

    if (
        !atacando &&
        !dandoDodge
    ) {

        atualizarFramePulo(frame);
    }
}


function atualizarMovimento() {

    if (
        !personagemJogo ||
        !cenarioJogo
    ) {
        return;
    }

    if (personagemMorto) {

        requestAnimationFrame(
            atualizarMovimento
        );

        return;
    }

    if (seguindoCaminho) {

        atualizarCaminhoAutomatico();

        requestAnimationFrame(
            atualizarMovimento
        );

        return;
    }

    const larguraCenario =
        cenarioJogo.clientWidth;

    const larguraPersonagem =
        personagemJogo.offsetWidth;

    const limiteEsquerdo = 0;

    const limiteDireito =
        larguraCenario -
        larguraPersonagem;

    let velocidadeAtual =
        velocidadeAndar;

    if (teclas.shift) {
        velocidadeAtual =
            velocidadeCorrer;
    }

    if (
        teclas.direita &&
        !atacando &&
        !defendendo &&
        !dandoDodge &&
        !agachado &&
        !dialogoAberto &&
        !transicaoIniciada
    ) {

        posicaoX +=
            velocidadeAtual;
    }

    if (
        teclas.esquerda &&
        !atacando &&
        !defendendo &&
        !dandoDodge &&
        !agachado &&
        !dialogoAberto &&
        !transicaoIniciada
    ) {

        posicaoX -=
            velocidadeAtual;
    }

    if (dandoDodge) {

        posicaoX +=
            velocidadeDodge *
            direcaoDodge;
    }

    if (
        posicaoX <
        limiteEsquerdo
    ) {

        posicaoX =
            limiteEsquerdo;
    }

    if (
        posicaoX >
        limiteDireito
    ) {

        posicaoX =
            limiteDireito;
    }

    personagemJogo.style.left =
        posicaoX + "px";

    verificarSaidaDoCenario();

    if (
        bifurcacao &&
        !bifurcacaoDialogoIniciado
    ) {

        const pontoDialogo =
            larguraCenario * 0.45;

        if (
            posicaoX >=
            pontoDialogo
        ) {

            iniciarDialogoBifurcacao();
        }
    }

    if (pulando) {

        velocidadePulo -=
            gravidade;

        posicaoY +=
            velocidadePulo;

        if (
            posicaoY <= 0
        ) {

            posicaoY = 0;
            velocidadePulo = 0;
            pulando = false;

            if (
                !atacando &&
                !dandoDodge
            ) {

                atualizarFramePulo(8);
                atualizarEstadoAnimacao();
            }

        } else {

            if (
                !atacando &&
                !dandoDodge
            ) {

                atualizarFrameDoPulo();
            }
        }
    }

    if (
        atacando &&
        !estaAtacando()
    ) {

        atacando = false;

        if (pulando) {

            atualizarFrameDoPulo();

        } else {

            atualizarEstadoAnimacao();
        }
    }

    if (
        dandoDodge &&
        !estaDandoDodge()
    ) {

        dandoDodge = false;

        atualizarEstadoAnimacao();
    }

    personagemJogo.style.bottom =
        (alturaChao + posicaoY) +
        "px";

    verificarInteracao();

    requestAnimationFrame(
        atualizarMovimento
    );
}


atualizarMovimento();


if (floresta) {

    setTimeout(
        iniciarDialogoFloresta,
        800
    );
}


if (lago) {

    setTimeout(
        iniciarDialogoLago,
        800
    );
}
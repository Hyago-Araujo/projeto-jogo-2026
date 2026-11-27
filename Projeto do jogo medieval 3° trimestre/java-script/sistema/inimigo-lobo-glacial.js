const lobo =
    document.getElementById("inimigo-lobo-glacial");

const personagem =
    document.getElementById("personagem");

const hudInimigo =
    document.getElementById("hud-inimigo");

const nomeInimigo =
    document.getElementById("nome-inimigo");

const barraVidaInimigo =
    document.getElementById("vida-inimigo-barra");

let loboVidaMaxima = 100;
let loboVidaAtual = 100;

let loboMovendo = false;
let loboMorto = false;
let loboAtacando = false;
let loboRecebendoDano = false;
let loboDirecao = -1;

let loboPosicaoX = 900;

let velocidadeLobo = 1.15;
let distanciaAtaque = 115;
let danoLobo = 10;

let ultimoAtaque = 0;
let intervaloAtaque = 1200;

let frameLobo = 0;
let intervaloFrame = null;

const caminhosLobo = {
    idle:
        "../assets/personagens/inimigos/lobo-glacial/idle/idle-",
    walk:
        "../assets/personagens/inimigos/lobo-glacial/walk/walk-",
    run:
        "../assets/personagens/inimigos/lobo-glacial/run/run-",
    attack:
        "../assets/personagens/inimigos/lobo-glacial/attack/attack-",
    hurt:
        "../assets/personagens/inimigos/lobo-glacial/hurt/hurt-",
    death:
        "../assets/personagens/inimigos/lobo-glacial/death/death-",
    howl:
        "../assets/personagens/inimigos/lobo-glacial/howl/howl-"
};

const quantidadeFrames = {
    idle: 8,
    walk: 8,
    run: 8,
    attack: 8,
    hurt: 4,
    death: 8,
    howl: 6
};


function atualizarHudLobo() {

    if (!barraVidaInimigo) {
        return;
    }

    const porcentagem =
        (loboVidaAtual / loboVidaMaxima) * 100;

    barraVidaInimigo.style.width =
        porcentagem + "%";
}


function mostrarHudLobo() {

    if (!hudInimigo) {
        return;
    }

    if (nomeInimigo) {
        nomeInimigo.textContent =
            "Lobo Glacial";
    }

    hudInimigo.classList.add("ativo");

    atualizarHudLobo();
}


function esconderHudLobo() {

    if (!hudInimigo) {
        return;
    }

    hudInimigo.classList.remove("ativo");
}


function definirSpriteLobo(animacao, frame) {

    if (!lobo || !caminhosLobo[animacao]) {
        return;
    }

    const numero =
        String(frame + 1).padStart(2, "0");

    lobo.src =
        caminhosLobo[animacao] +
        numero +
        ".png";
}


function pararAnimacaoLobo() {

    if (intervaloFrame !== null) {

        clearInterval(intervaloFrame);

        intervaloFrame = null;
    }
}


function iniciarAnimacaoLobo(
    animacao,
    velocidade
) {

    if (!lobo || loboMorto) {
        return;
    }

    pararAnimacaoLobo();

    frameLobo = 0;

    definirSpriteLobo(
        animacao,
        frameLobo
    );

    intervaloFrame = setInterval(
        function() {

            frameLobo++;

            if (
                frameLobo >=
                quantidadeFrames[animacao]
            ) {

                frameLobo = 0;
            }

            definirSpriteLobo(
                animacao,
                frameLobo
            );

        },
        velocidade
    );
}


function tocarAnimacaoUmaVez(
    animacao,
    velocidade,
    aoTerminar
) {

    if (!lobo) {
        return;
    }

    pararAnimacaoLobo();

    frameLobo = 0;

    definirSpriteLobo(
        animacao,
        frameLobo
    );

    intervaloFrame = setInterval(
        function() {

            frameLobo++;

            if (
                frameLobo >=
                quantidadeFrames[animacao]
            ) {

                pararAnimacaoLobo();

                if (
                    typeof aoTerminar ===
                    "function"
                ) {
                    aoTerminar();
                }

                return;
            }

            definirSpriteLobo(
                animacao,
                frameLobo
            );

        },
        velocidade
    );
}


function atualizarDirecaoLobo() {

    if (
        !lobo ||
        !personagem
    ) {
        return;
    }

    const centroLobo =
        loboPosicaoX +
        lobo.offsetWidth / 2;

    const centroPersonagem =
        personagem.offsetLeft +
        personagem.offsetWidth / 2;

    if (
        centroPersonagem <
        centroLobo
    ) {

        loboDirecao = -1;

    } else {

        loboDirecao = 1;
    }

    if (loboDirecao === -1) {

        lobo.style.transform =
            "scaleX(-1)";

    } else {

        lobo.style.transform =
            "scaleX(1)";
    }
}


function obterDistanciaLobo() {

    if (
        !lobo ||
        !personagem
    ) {
        return Infinity;
    }

    const centroLobo =
        loboPosicaoX +
        lobo.offsetWidth / 2;

    const centroPersonagem =
        personagem.offsetLeft +
        personagem.offsetWidth / 2;

    return Math.abs(
        centroPersonagem -
        centroLobo
    );
}


function iniciarMovimentoLobo() {

    if (
        !lobo ||
        loboMorto
    ) {
        return;
    }

    loboMovendo = true;

    mostrarHudLobo();

    atualizarDirecaoLobo();

    iniciarAnimacaoLobo(
        "walk",
        130
    );
}


window.iniciarMovimentoLobo =
    iniciarMovimentoLobo;


function pararMovimentoLobo() {

    loboMovendo = false;
    loboAtacando = false;

    pararAnimacaoLobo();

    if (
        lobo &&
        !loboMorto
    ) {

        definirSpriteLobo(
            "idle",
            0
        );
    }
}


window.pararMovimentoLobo =
    pararMovimentoLobo;


window.pararMovimentoInimigo =
    pararMovimentoLobo;


function verificarAtaqueLobo() {

    if (
        !loboAtacando ||
        loboMorto
    ) {
        return;
    }

    const distancia =
        obterDistanciaLobo();

    if (
        distancia <=
        distanciaAtaque
    ) {

        if (
            typeof window.receberDanoJogador ===
            "function"
        ) {

            window.receberDanoJogador(
                danoLobo
            );
        }
    }
}


function iniciarAtaqueLobo() {

    if (
        loboMorto ||
        loboAtacando
    ) {
        return;
    }

    const agora =
        Date.now();

    if (
        agora -
        ultimoAtaque <
        intervaloAtaque
    ) {
        return;
    }

    const distancia =
        obterDistanciaLobo();

    if (
        distancia >
        distanciaAtaque
    ) {
        return;
    }

    ultimoAtaque = agora;

    loboAtacando = true;

    loboMovendo = false;

    atualizarDirecaoLobo();

    tocarAnimacaoUmaVez(
        "attack",
        90,
        function() {

            loboAtacando = false;

            if (loboMorto) {
                return;
            }

            if (loboMovendo) {

                iniciarAnimacaoLobo(
                    "walk",
                    130
                );

            } else {

                iniciarAnimacaoLobo(
                    "idle",
                    160
                );
            }
        }
    );
}


function receberDanoLobo(dano) {

    if (
        loboMorto ||
        loboRecebendoDano
    ) {
        return;
    }

    loboVidaAtual -= dano;

    if (
        loboVidaAtual < 0
    ) {
        loboVidaAtual = 0;
    }

    atualizarHudLobo();

    if (
        loboVidaAtual <= 0
    ) {

        morrerLobo();

        return;
    }

    loboRecebendoDano = true;

    loboMovendo = false;
    loboAtacando = false;

    tocarAnimacaoUmaVez(
        "hurt",
        100,
        function() {

            loboRecebendoDano = false;

            if (loboMorto) {
                return;
            }

            loboMovendo = true;

            iniciarAnimacaoLobo(
                "walk",
                130
            );
        }
    );
}


window.receberDanoLobo =
    receberDanoLobo;


function morrerLobo() {

    if (loboMorto) {
        return;
    }

    loboMorto = true;
    loboMovendo = false;
    loboAtacando = false;
    loboRecebendoDano = false;

    pararAnimacaoLobo();

    if (lobo) {

        lobo.style.zIndex =
            "50";

        lobo.style.transform =
            loboDirecao === -1
                ? "scaleX(-1)"
                : "scaleX(1)";
    }

    tocarAnimacaoUmaVez(
        "death",
        120,
        function() {

            definirSpriteLobo(
                "death",
                quantidadeFrames.death - 1
            );

            setTimeout(
                function() {
                    esconderHudLobo();
                },
                700
            );
        }
    );
}


function verificarAtaqueDoJogador() {

    if (
        loboMorto ||
        !lobo
    ) {
        return;
    }

    const distancia =
        obterDistanciaLobo();

    if (
        distancia <= 150
    ) {

        receberDanoLobo(20);
    }
}


window.verificarAtaqueDoJogador =
    verificarAtaqueDoJogador;


function atualizarLobo() {

    if (
        !lobo ||
        !personagem
    ) {

        requestAnimationFrame(
            atualizarLobo
        );

        return;
    }

    if (
        loboMorto
    ) {

        requestAnimationFrame(
            atualizarLobo
        );

        return;
    }

    if (
        !loboMovendo ||
        loboAtacando ||
        loboRecebendoDano
    ) {

        requestAnimationFrame(
            atualizarLobo
        );

        return;
    }

    const distancia =
        obterDistanciaLobo();

    atualizarDirecaoLobo();

    if (
        distancia <=
        distanciaAtaque
    ) {

        iniciarAtaqueLobo();

    } else {

        const personagemX =
            personagem.offsetLeft;

        const diferenca =
            personagemX -
            loboPosicaoX;

        if (
            Math.abs(diferenca) > 3
        ) {

            if (
                diferenca > 0
            ) {

                loboPosicaoX +=
                    velocidadeLobo;

            } else {

                loboPosicaoX -=
                    velocidadeLobo;
            }

            lobo.style.left =
                loboPosicaoX + "px";
        }

        if (
            loboMovendo &&
            intervaloFrame === null
        ) {

            iniciarAnimacaoLobo(
                "walk",
                130
            );
        }
    }

    requestAnimationFrame(
        atualizarLobo
    );
}


loboPosicaoX =
    lobo.offsetLeft || 900;

lobo.style.left =
    loboPosicaoX + "px";

lobo.style.zIndex =
    "100";

loboVidaAtual =
    loboVidaMaxima;

atualizarHudLobo();

definirSpriteLobo(
    "idle",
    0
);

atualizarLobo();
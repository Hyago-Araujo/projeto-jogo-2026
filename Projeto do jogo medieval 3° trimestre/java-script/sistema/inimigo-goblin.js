const goblin =
    document.getElementById("inimigo-goblin");

const personagem =
    document.getElementById("personagem");

const cenario =
    document.getElementById("cenario");

const hudInimigo =
    document.getElementById("hud-inimigo");

const nomeInimigo =
    document.getElementById("nome-inimigo");

const vidaInimigoTexto =
    document.getElementById("vida-inimigo-texto");

const vidaInimigoBarra =
    document.getElementById("vida-inimigo-barra");

const goblinIdle = [
    "../assets/personagens/inimigos/goblin/idle/idle-01.png",
    "../assets/personagens/inimigos/goblin/idle/idle-02.png",
    "../assets/personagens/inimigos/goblin/idle/idle-03.png",
    "../assets/personagens/inimigos/goblin/idle/idle-04.png",
    "../assets/personagens/inimigos/goblin/idle/idle-05.png",
    "../assets/personagens/inimigos/goblin/idle/idle-06.png",
    "../assets/personagens/inimigos/goblin/idle/idle-07.png",
    "../assets/personagens/inimigos/goblin/idle/idle-08.png"
];

const goblinWalk = [
    "../assets/personagens/inimigos/goblin/walk/walk-01.png",
    "../assets/personagens/inimigos/goblin/walk/walk-02.png",
    "../assets/personagens/inimigos/goblin/walk/walk-03.png",
    "../assets/personagens/inimigos/goblin/walk/walk-04.png",
    "../assets/personagens/inimigos/goblin/walk/walk-05.png",
    "../assets/personagens/inimigos/goblin/walk/walk-06.png",
    "../assets/personagens/inimigos/goblin/walk/walk-07.png",
    "../assets/personagens/inimigos/goblin/walk/walk-08.png"
];

const goblinAttack = [
    "../assets/personagens/inimigos/goblin/attack/attack-01.png",
    "../assets/personagens/inimigos/goblin/attack/attack-02.png",
    "../assets/personagens/inimigos/goblin/attack/attack-03.png",
    "../assets/personagens/inimigos/goblin/attack/attack-04.png",
    "../assets/personagens/inimigos/goblin/attack/attack-05.png",
    "../assets/personagens/inimigos/goblin/attack/attack-06.png",
    "../assets/personagens/inimigos/goblin/attack/attack-07.png",
    "../assets/personagens/inimigos/goblin/attack/attack-08.png"
];

const goblinDeath = [
    "../assets/personagens/inimigos/goblin/death/death-01.png",
    "../assets/personagens/inimigos/goblin/death/death-02.png",
    "../assets/personagens/inimigos/goblin/death/death-03.png",
    "../assets/personagens/inimigos/goblin/death/death-04.png",
    "../assets/personagens/inimigos/goblin/death/death-05.png",
    "../assets/personagens/inimigos/goblin/death/death-06.png",
    "../assets/personagens/inimigos/goblin/death/death-07.png",
    "../assets/personagens/inimigos/goblin/death/death-08.png"
];

let goblinFrame = 0;
let goblinAnimacao = "idle";

let goblinPosicao = 900;
let goblinDirecao = -1;

let goblinEstado = "parado";

let goblinMovendo = false;
let goblinMovimentoIniciado = false;

let goblinAtacando = false;
let goblinPodeAtacar = true;
let goblinAtaqueAcertou = false;

let goblinMorteIniciada = false;

const danoGoblin = 10;
const danoAtaqueJogador = 25;

const velocidadeIdleGoblin = 220;
const velocidadeWalkGoblin = 130;
const velocidadeAttackGoblin = 100;
const velocidadeDeathGoblin = 180;

const velocidadePatrulhaGoblin = 1.0;
const velocidadePerseguicaoGoblin = 1.35;

const limiteEsquerdoGoblin = 650;
const limiteDireitoGoblin = 1150;

const distanciaDeteccaoGoblin = 500;
const distanciaParadaGoblin = 55;
const distanciaPerdaGoblin = 700;

const intervaloAtaqueGoblin = 1000;

let ultimoTempoMovimento = 0;

let nomeAtualInimigo = "GOBLIN";
let vidaAtualInimigo = 100;
let vidaMaximaInimigo = 100;
let inimigoMorto = false;

function atualizarVidaInimigo() {

    if (
        !vidaInimigoTexto ||
        !vidaInimigoBarra
    ) {
        return;
    }

    vidaInimigoTexto.textContent =
        vidaAtualInimigo +
        " / " +
        vidaMaximaInimigo;

    const porcentagem =
        (
            vidaAtualInimigo /
            vidaMaximaInimigo
        ) * 100;

    vidaInimigoBarra.style.width =
        Math.max(
            0,
            porcentagem
        ) + "%";
}

function configurarInimigo(
    nome,
    vidaMaxima
) {

    nomeAtualInimigo =
        nome;

    vidaMaximaInimigo =
        vidaMaxima;

    vidaAtualInimigo =
        vidaMaxima;

    inimigoMorto =
        false;

    goblinMorteIniciada =
        false;

    goblin.style.bottom =
        "95px";

    goblin.style.height =
        "115px";

    goblin.style.objectPosition =
        "center bottom";

    goblin.style.zIndex =
        "100";

    if (nomeInimigo) {

        nomeInimigo.textContent =
            nome;
    }

    atualizarVidaInimigo();
}

function mostrarHudInimigo() {

    if (hudInimigo) {

        hudInimigo.classList.add(
            "ativo"
        );
    }
}

function esconderHudInimigo() {

    if (hudInimigo) {

        hudInimigo.classList.remove(
            "ativo"
        );
    }
}

function receberDanoInimigo(dano) {

    if (inimigoMorto) {
        return;
    }

    if (goblinMorteIniciada) {
        return;
    }

    vidaAtualInimigo -=
        dano;

    if (
        vidaAtualInimigo < 0
    ) {

        vidaAtualInimigo =
            0;
    }

    atualizarVidaInimigo();

    if (
        vidaAtualInimigo <= 0
    ) {

        morrerGoblin();
    }
}

function morrerGoblin() {

    if (goblinMorteIniciada) {
        return;
    }

    goblinMorteIniciada =
        true;

    goblin.style.bottom =
        "85px";

    goblin.style.height =
        "115px";

    goblin.style.objectPosition =
        "center bottom";

    goblin.style.zIndex =
        "50";

    inimigoMorto =
        true;

    goblinMovendo =
        false;

    goblinAtacando =
        false;

    goblinPodeAtacar =
        false;

    goblinAtaqueAcertou =
        true;

    goblinEstado =
        "morto";

    goblinAnimacao =
        "death";

    goblinFrame =
        0;

    goblin.src =
        goblinDeath[0];

    let frameMorte =
        0;

    const intervalo =
        setInterval(
            function () {

                frameMorte++;

                if (
                    frameMorte >=
                    goblinDeath.length
                ) {

                    clearInterval(
                        intervalo
                    );

                    goblin.src =
                        goblinDeath[
                            goblinDeath.length - 1
                        ];

                    goblinFrame =
                        goblinDeath.length - 1;

                    goblin.style.bottom =
                        "85px";

                    goblin.style.zIndex =
                        "50";

                    setTimeout(
                        function () {

                            if (
                                typeof window.iniciarDialogoDerrotaGoblin ===
                                "function"
                            ) {

                                window.iniciarDialogoDerrotaGoblin();
                            }

                        },
                        300
                    );

                    return;
                }

                goblin.src =
                    goblinDeath[
                        frameMorte
                    ];

                goblinFrame =
                    frameMorte;

            },
            velocidadeDeathGoblin
        );
}

function animarGoblin() {

    if (inimigoMorto) {
        return;
    }

    let sprites;

    if (
        goblinAnimacao ===
        "idle"
    ) {

        sprites =
            goblinIdle;

    } else if (
        goblinAnimacao ===
        "walk"
    ) {

        sprites =
            goblinWalk;

    } else if (
        goblinAnimacao ===
        "attack"
    ) {

        return;

    } else {

        sprites =
            goblinIdle;
    }

    goblin.src =
        sprites[goblinFrame];

    goblinFrame++;

    if (
        goblinFrame >=
        sprites.length
    ) {

        goblinFrame =
            0;
    }

    const velocidade =
        goblinAnimacao === "idle"
            ? velocidadeIdleGoblin
            : velocidadeWalkGoblin;

    setTimeout(
        animarGoblin,
        velocidade
    );
}

function trocarAnimacaoGoblin(
    novaAnimacao
) {

    if (inimigoMorto) {
        return;
    }

    if (
        novaAnimacao ===
        goblinAnimacao &&
        novaAnimacao !==
        "attack"
    ) {

        return;
    }

    goblinAnimacao =
        novaAnimacao;

    goblinFrame =
        0;

    if (
        novaAnimacao ===
        "attack"
    ) {

        iniciarAnimacaoAtaqueGoblin();

    } else {

        animarGoblin();
    }
}

function atualizarDirecaoGoblin() {

    if (
        goblinDirecao < 0
    ) {

        goblin.style.transform =
            "scaleX(-1)";

    } else {

        goblin.style.transform =
            "scaleX(1)";
    }
}

function atualizarDirecaoParaPersonagem() {

    const personagemX =
        obterCentroPersonagem();

    const goblinX =
        obterCentroGoblin();

    if (
        personagemX <
        goblinX
    ) {

        goblinDirecao =
            -1;

    } else {

        goblinDirecao =
            1;
    }

    atualizarDirecaoGoblin();
}

function obterCentroPersonagem() {

    if (!personagem) {

        return 0;
    }

    return personagem.offsetLeft +
        personagem.offsetWidth / 2;
}

function obterCentroGoblin() {

    return goblinPosicao +
        goblin.offsetWidth / 2;
}

function calcularDistanciaGoblin() {

    const personagemX =
        obterCentroPersonagem();

    const goblinX =
        obterCentroGoblin();

    return Math.abs(
        personagemX -
        goblinX
    );
}

function detectarPersonagem() {

    if (inimigoMorto) {
        return;
    }

    const distancia =
        calcularDistanciaGoblin();

    if (goblinAtacando) {

        return;
    }

    if (
        goblinEstado ===
        "patrulhando"
    ) {

        if (
            distancia <=
            distanciaDeteccaoGoblin
        ) {

            goblinEstado =
                "perseguindo";

            trocarAnimacaoGoblin(
                "walk"
            );
        }

        return;
    }

    if (
        goblinEstado ===
        "perseguindo"
    ) {

        if (
            distancia >
            distanciaPerdaGoblin
        ) {

            goblinEstado =
                "patrulhando";

            trocarAnimacaoGoblin(
                "walk"
            );

            return;
        }

        if (
            distancia <=
            distanciaParadaGoblin &&
            goblinPodeAtacar
        ) {

            goblinEstado =
                "atacando";

            atualizarDirecaoParaPersonagem();

            trocarAnimacaoGoblin(
                "attack"
            );
        }

        return;
    }

    if (
        goblinEstado ===
        "parado"
    ) {

        if (
            distancia >
            distanciaParadaGoblin &&
            distancia <=
            distanciaPerdaGoblin
        ) {

            goblinEstado =
                "perseguindo";

            trocarAnimacaoGoblin(
                "walk"
            );

            return;
        }

        if (
            distancia >
            distanciaPerdaGoblin
        ) {

            goblinEstado =
                "patrulhando";

            trocarAnimacaoGoblin(
                "walk"
            );
        }
    }
}

function patrulharGoblin(
    deltaTempo
) {

    if (inimigoMorto) {
        return;
    }

    goblinPosicao +=
        velocidadePatrulhaGoblin *
        (
            deltaTempo /
            16.67
        ) *
        goblinDirecao;

    if (
        goblinPosicao <=
        limiteEsquerdoGoblin
    ) {

        goblinPosicao =
            limiteEsquerdoGoblin;

        goblinDirecao =
            1;

        atualizarDirecaoGoblin();

        goblinFrame =
            0;
    }

    if (
        goblinPosicao >=
        limiteDireitoGoblin
    ) {

        goblinPosicao =
            limiteDireitoGoblin;

        goblinDirecao =
            -1;

        atualizarDirecaoGoblin();

        goblinFrame =
            0;
    }
}

function perseguirGoblin(
    deltaTempo
) {

    if (inimigoMorto) {
        return;
    }

    const personagemX =
        obterCentroPersonagem();

    const goblinX =
        obterCentroGoblin();

    const distanciaHorizontal =
        personagemX -
        goblinX;

    if (
        Math.abs(
            distanciaHorizontal
        ) <=
        distanciaParadaGoblin
    ) {

        if (goblinPodeAtacar) {

            goblinEstado =
                "atacando";

            atualizarDirecaoParaPersonagem();

            trocarAnimacaoGoblin(
                "attack"
            );

        } else {

            goblinEstado =
                "parado";

            trocarAnimacaoGoblin(
                "idle"
            );
        }

        return;
    }

    if (
        distanciaHorizontal < 0
    ) {

        goblinDirecao =
            -1;

    } else {

        goblinDirecao =
            1;
    }

    atualizarDirecaoGoblin();

    goblinPosicao +=
        velocidadePerseguicaoGoblin *
        (
            deltaTempo /
            16.67
        ) *
        goblinDirecao;

    limitarGoblinNaTela();
}

function causarDanoGoblin() {

    if (
        goblinAtaqueAcertou
    ) {

        return;
    }

    const distancia =
        calcularDistanciaGoblin();

    if (
        distancia >
        distanciaParadaGoblin
    ) {

        return;
    }

    if (
        typeof window.receberDano ===
        "function"
    ) {

        window.receberDano(
            danoGoblin
        );

        goblinAtaqueAcertou =
            true;
    }
}

function verificarAtaqueDoJogador() {

    if (inimigoMorto) {
        return;
    }

    if (goblinMorteIniciada) {
        return;
    }

    const distancia =
        calcularDistanciaGoblin();

    if (
        distancia >
        distanciaParadaGoblin + 45
    ) {
        return;
    }

    if (
        typeof window.receberDanoInimigo ===
        "function"
    ) {

        window.receberDanoInimigo(
            danoAtaqueJogador
        );
    }
}

function iniciarAnimacaoAtaqueGoblin() {

    if (inimigoMorto) {
        return;
    }

    goblinAtacando =
        true;

    goblinPodeAtacar =
        false;

    goblinAtaqueAcertou =
        false;

    atualizarDirecaoParaPersonagem();

    goblinFrame =
        0;

    goblin.src =
        goblinAttack[0];

    const intervalo =
        setInterval(
            () => {

                if (!goblinAtacando) {

                    clearInterval(
                        intervalo
                    );

                    return;
                }

                goblinFrame++;

                if (
                    goblinFrame === 4
                ) {

                    causarDanoGoblin();
                }

                if (
                    goblinFrame >=
                    goblinAttack.length
                ) {

                    clearInterval(
                        intervalo
                    );

                    finalizarAtaqueGoblin();

                    return;
                }

                goblin.src =
                    goblinAttack[
                        goblinFrame
                    ];

            },
            velocidadeAttackGoblin
        );
}

function finalizarAtaqueGoblin() {

    goblinAtacando =
        false;

    goblinFrame =
        0;

    setTimeout(
        () => {

            if (inimigoMorto) {
                return;
            }

            const distancia =
                calcularDistanciaGoblin();

            goblinPodeAtacar =
                true;

            if (
                distancia <=
                distanciaParadaGoblin
            ) {

                atualizarDirecaoParaPersonagem();

                goblinEstado =
                    "atacando";

                trocarAnimacaoGoblin(
                    "attack"
                );

            } else if (
                distancia <=
                distanciaPerdaGoblin
            ) {

                goblinEstado =
                    "perseguindo";

                trocarAnimacaoGoblin(
                    "walk"
                );

            } else {

                goblinEstado =
                    "patrulhando";

                trocarAnimacaoGoblin(
                    "walk"
                );
            }

        },
        intervaloAtaqueGoblin
    );
}

function limitarGoblinNaTela() {

    if (!cenario) {
        return;
    }

    const larguraCenario =
        cenario.clientWidth;

    const larguraGoblin =
        goblin.offsetWidth;

    const limiteEsquerdo =
        -50;

    const limiteDireito =
        larguraCenario -
        larguraGoblin +
        50;

    if (
        goblinPosicao <
        limiteEsquerdo
    ) {

        goblinPosicao =
            limiteEsquerdo;
    }

    if (
        goblinPosicao >
        limiteDireito
    ) {

        goblinPosicao =
            limiteDireito;
    }
}

function atualizarGoblin(
    tempoAtual
) {

    if (!goblinMovendo) {
        return;
    }

    if (inimigoMorto) {
        return;
    }

    if (
        !ultimoTempoMovimento
    ) {

        ultimoTempoMovimento =
            tempoAtual;
    }

    const deltaTempo =
        tempoAtual -
        ultimoTempoMovimento;

    ultimoTempoMovimento =
        tempoAtual;

    detectarPersonagem();

    if (
        goblinEstado ===
        "patrulhando"
    ) {

        patrulharGoblin(
            deltaTempo
        );

    } else if (
        goblinEstado ===
        "perseguindo"
    ) {

        perseguirGoblin(
            deltaTempo
        );
    }

    goblin.style.left =
        goblinPosicao + "px";

    requestAnimationFrame(
        atualizarGoblin
    );
}

function iniciarMovimentoGoblin() {

    if (
        goblinMovimentoIniciado
    ) {

        return;
    }

    goblinMovimentoIniciado =
        true;

    goblinMovendo =
        true;

    goblinEstado =
        "patrulhando";

    ultimoTempoMovimento =
        0;

    trocarAnimacaoGoblin(
        "walk"
    );

    atualizarDirecaoGoblin();

    mostrarHudInimigo();

    requestAnimationFrame(
        atualizarGoblin
    );
}

function pararMovimentoGoblin() {

    goblinMovendo =
        false;

    ultimoTempoMovimento =
        0;

    goblinEstado =
        "parado";

    goblinAtacando =
        false;

    goblinPodeAtacar =
        true;

    if (!inimigoMorto) {

        trocarAnimacaoGoblin(
            "idle"
        );
    }
}

goblin.style.left =
    goblinPosicao + "px";

atualizarDirecaoGoblin();

configurarInimigo(
    "GOBLIN",
    100
);

window.iniciarMovimentoGoblin =
    iniciarMovimentoGoblin;

window.pararMovimentoGoblin =
    pararMovimentoGoblin;

window.receberDanoInimigo =
    receberDanoInimigo;

window.configurarInimigo =
    configurarInimigo;

window.mostrarHudInimigo =
    mostrarHudInimigo;

window.esconderHudInimigo =
    esconderHudInimigo;

window.obterCentroPersonagem =
    obterCentroPersonagem;

window.obterCentroGoblin =
    obterCentroGoblin;

window.verificarAtaqueDoJogador =
    verificarAtaqueDoJogador;
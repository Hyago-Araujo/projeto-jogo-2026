(function () {

    const personagem = document.getElementById("personagem");

    const caminhosAnimacoes = {

        idle: [
            "../assets/personagens/cacador/animacoes/idle/idle-01.png",
            "../assets/personagens/cacador/animacoes/idle/idle-02.png",
            "../assets/personagens/cacador/animacoes/idle/idle-03.png",
            "../assets/personagens/cacador/animacoes/idle/idle-04.png",
            "../assets/personagens/cacador/animacoes/idle/idle-05.png",
            "../assets/personagens/cacador/animacoes/idle/idle-06.png",
            "../assets/personagens/cacador/animacoes/idle/idle-07.png",
            "../assets/personagens/cacador/animacoes/idle/idle-08.png"
        ],

        walk: [
            "../assets/personagens/cacador/animacoes/walk/walk-01.png",
            "../assets/personagens/cacador/animacoes/walk/walk-02.png",
            "../assets/personagens/cacador/animacoes/walk/walk-03.png",
            "../assets/personagens/cacador/animacoes/walk/walk-04.png",
            "../assets/personagens/cacador/animacoes/walk/walk-05.png",
            "../assets/personagens/cacador/animacoes/walk/walk-06.png",
            "../assets/personagens/cacador/animacoes/walk/walk-07.png",
            "../assets/personagens/cacador/animacoes/walk/walk-08.png",
            "../assets/personagens/cacador/animacoes/walk/walk-09.png",
            "../assets/personagens/cacador/animacoes/walk/walk-10.png",
            "../assets/personagens/cacador/animacoes/walk/walk-11.png",
            "../assets/personagens/cacador/animacoes/walk/walk-12.png",
            "../assets/personagens/cacador/animacoes/walk/walk-13.png",
            "../assets/personagens/cacador/animacoes/walk/walk-14.png"
        ],

        run: [
            "../assets/personagens/cacador/animacoes/run/run-01.png",
            "../assets/personagens/cacador/animacoes/run/run-02.png",
            "../assets/personagens/cacador/animacoes/run/run-03.png",
            "../assets/personagens/cacador/animacoes/run/run-04.png",
            "../assets/personagens/cacador/animacoes/run/run-05.png",
            "../assets/personagens/cacador/animacoes/run/run-06.png",
            "../assets/personagens/cacador/animacoes/run/run-07.png",
            "../assets/personagens/cacador/animacoes/run/run-08.png",
            "../assets/personagens/cacador/animacoes/run/run-09.png",
            "../assets/personagens/cacador/animacoes/run/run-10.png",
            "../assets/personagens/cacador/animacoes/run/run-11.png",
            "../assets/personagens/cacador/animacoes/run/run-12.png"
        ],

        jump: [
            "../assets/personagens/cacador/animacoes/jump/jump-01.png",
            "../assets/personagens/cacador/animacoes/jump/jump-02.png",
            "../assets/personagens/cacador/animacoes/jump/jump-03.png",
            "../assets/personagens/cacador/animacoes/jump/jump-04.png",
            "../assets/personagens/cacador/animacoes/jump/jump-05.png",
            "../assets/personagens/cacador/animacoes/jump/jump-06.png",
            "../assets/personagens/cacador/animacoes/jump/jump-07.png",
            "../assets/personagens/cacador/animacoes/jump/jump-08.png",
            "../assets/personagens/cacador/animacoes/jump/jump-09.png"
        ],

        attack: [
            "../assets/personagens/cacador/animacoes/attack/attack-01.png",
            "../assets/personagens/cacador/animacoes/attack/attack-02.png",
            "../assets/personagens/cacador/animacoes/attack/attack-03.png",
            "../assets/personagens/cacador/animacoes/attack/attack-04.png",
            "../assets/personagens/cacador/animacoes/attack/attack-05.png",
            "../assets/personagens/cacador/animacoes/attack/attack-06.png",
            "../assets/personagens/cacador/animacoes/attack/attack-07.png",
            "../assets/personagens/cacador/animacoes/attack/attack-08.png",
            "../assets/personagens/cacador/animacoes/attack/attack-09.png",
            "../assets/personagens/cacador/animacoes/attack/attack-10.png",
            "../assets/personagens/cacador/animacoes/attack/attack-11.png"
        ],

        defense: [
            "../assets/personagens/cacador/animacoes/defense/defense-01.png",
            "../assets/personagens/cacador/animacoes/defense/defense-02.png",
            "../assets/personagens/cacador/animacoes/defense/defense-03.png",
            "../assets/personagens/cacador/animacoes/defense/defense-04.png",
            "../assets/personagens/cacador/animacoes/defense/defense-05.png",
            "../assets/personagens/cacador/animacoes/defense/defense-06.png",
            "../assets/personagens/cacador/animacoes/defense/defense-07.png",
            "../assets/personagens/cacador/animacoes/defense/defense-08.png",
            "../assets/personagens/cacador/animacoes/defense/defense-09.png"
        ],

        dodge: [
            "../assets/personagens/cacador/animacoes/dodge/dodge-01.png",
            "../assets/personagens/cacador/animacoes/dodge/dodge-02.png",
            "../assets/personagens/cacador/animacoes/dodge/dodge-03.png",
            "../assets/personagens/cacador/animacoes/dodge/dodge-04.png",
            "../assets/personagens/cacador/animacoes/dodge/dodge-05.png",
            "../assets/personagens/cacador/animacoes/dodge/dodge-06.png",
            "../assets/personagens/cacador/animacoes/dodge/dodge-07.png"
        ],

        crouch: [
            "../assets/personagens/cacador/animacoes/crouch/crouch-01.png",
            "../assets/personagens/cacador/animacoes/crouch/crouch-02.png",
            "../assets/personagens/cacador/animacoes/crouch/crouch-03.png",
            "../assets/personagens/cacador/animacoes/crouch/crouch-04.png",
            "../assets/personagens/cacador/animacoes/crouch/crouch-05.png"
        ],

        death: [
            "../assets/personagens/cacador/animacoes/death/death-01.png",
            "../assets/personagens/cacador/animacoes/death/death-02.png",
            "../assets/personagens/cacador/animacoes/death/death-03.png",
            "../assets/personagens/cacador/animacoes/death/death-04.png",
            "../assets/personagens/cacador/animacoes/death/death-05.png",
            "../assets/personagens/cacador/animacoes/death/death-06.png",
            "../assets/personagens/cacador/animacoes/death/death-07.png",
            "../assets/personagens/cacador/animacoes/death/death-08.png"
        ]

    };

    const imagens = {
        idle: [],
        walk: [],
        run: [],
        jump: [],
        attack: [],
        defense: [],
        dodge: [],
        crouch: [],
        death: []
    };

    let animacaoAtual = "idle";
    let frameAtual = 0;
    let ultimoFrame = performance.now();
    let ultimoFrameValido = personagem.src;

    let ataqueJaCausouDano = false;

    const velocidadeIdle = 500;
    const velocidadeWalk = 300;
    const velocidadeRun = 120;
    const velocidadeAttack = 60;
    const velocidadeDefense = 100;
    const velocidadeDodge = 70;
    const velocidadeCrouch = 150;
    const velocidadeDeath = 150;

    function carregarImagem(caminho) {

        return new Promise(function (resolver) {

            const imagem = new Image();

            imagem.onload = function () {
                resolver(imagem);
            };

            imagem.onerror = function () {
                resolver(null);
            };

            imagem.src = caminho;

        });

    }

    async function carregarAnimacoes() {

        for (const nomeAnimacao in caminhosAnimacoes) {

            for (const caminho of caminhosAnimacoes[nomeAnimacao]) {

                const imagem = await carregarImagem(caminho);

                imagens[nomeAnimacao].push(imagem);

            }

        }

        if (imagens.idle[0]) {

            personagem.src = imagens.idle[0].src;
            ultimoFrameValido = imagens.idle[0].src;

        }

    }

    window.trocarAnimacao = function (nome) {

        if (!imagens[nome]) {
            return;
        }

        if (animacaoAtual === nome) {
            return;
        }

        animacaoAtual = nome;
        frameAtual = 0;
        ultimoFrame = performance.now();

        const primeiroFrame = imagens[nome][0];

        if (primeiroFrame) {

            personagem.src = primeiroFrame.src;
            ultimoFrameValido = primeiroFrame.src;

        }

    };

    window.atualizarFramePulo = function (frame) {

        if (!imagens.jump.length) {
            return;
        }

        if (frame < 0) {
            frame = 0;
        }

        if (frame >= imagens.jump.length) {
            frame = imagens.jump.length - 1;
        }

        const imagem = imagens.jump[frame];

        if (imagem) {

            animacaoAtual = "jump";
            frameAtual = frame;

            personagem.src = imagem.src;
            ultimoFrameValido = imagem.src;

        }

    };

    window.iniciarAtaque = function () {

        if (imagens.attack.length !== 11) {
            return;
        }

        animacaoAtual = "attack";
        frameAtual = 0;
        ultimoFrame = performance.now();

        ataqueJaCausouDano = false;

        personagem.src = imagens.attack[0].src;
        ultimoFrameValido = imagens.attack[0].src;

    };

    window.iniciarDefesa = function () {

        if (imagens.defense.length !== 9) {
            return;
        }

        animacaoAtual = "defense";
        frameAtual = 0;
        ultimoFrame = performance.now();

        personagem.src = imagens.defense[0].src;
        ultimoFrameValido = imagens.defense[0].src;

    };

    window.iniciarDodge = function () {

        if (imagens.dodge.length !== 7) {
            return false;
        }

        animacaoAtual = "dodge";
        frameAtual = 0;
        ultimoFrame = performance.now();

        personagem.src = imagens.dodge[0].src;
        ultimoFrameValido = imagens.dodge[0].src;

        return true;

    };

    window.iniciarMorte = function () {

        if (imagens.death.length !== 8) {
            return false;
        }

        animacaoAtual = "death";
        frameAtual = 0;
        ultimoFrame = performance.now();

        personagem.src = imagens.death[0].src;
        ultimoFrameValido = imagens.death[0].src;

        return true;

    };

    window.estaAtacando = function () {
        return animacaoAtual === "attack";
    };

    window.estaDefendendo = function () {
        return animacaoAtual === "defense";
    };

    window.estaDandoDodge = function () {
        return animacaoAtual === "dodge";
    };

    personagem.addEventListener("error", function () {

        personagem.src = ultimoFrameValido;

    });

    function atualizarAnimacao(tempoAtual) {

        if (animacaoAtual === "death") {

            if (tempoAtual - ultimoFrame >= velocidadeDeath) {

                frameAtual++;

                if (frameAtual >= imagens.death.length) {

                    frameAtual = imagens.death.length - 1;

                    const ultimoFrameMorte =
                        imagens.death[frameAtual];

                    if (ultimoFrameMorte) {

                        personagem.src =
                            ultimoFrameMorte.src;

                        ultimoFrameValido =
                            ultimoFrameMorte.src;

                    }

                } else {

                    const imagemAtual =
                        imagens.death[frameAtual];

                    if (imagemAtual) {

                        personagem.src =
                            imagemAtual.src;

                        ultimoFrameValido =
                            imagemAtual.src;

                    }

                }

                ultimoFrame = tempoAtual;

            }

        } else if (animacaoAtual === "attack") {

            if (tempoAtual - ultimoFrame >= velocidadeAttack) {

                frameAtual++;

                if (
                    frameAtual === 5 &&
                    !ataqueJaCausouDano
                ) {

                    ataqueJaCausouDano = true;

                    if (
                        typeof window.verificarAtaqueDoJogador ===
                        "function"
                    ) {

                        window.verificarAtaqueDoJogador();

                    }

                }

                if (frameAtual >= imagens.attack.length) {

                    frameAtual = 0;
                    animacaoAtual = "idle";

                } else {

                    const imagemAtual =
                        imagens.attack[frameAtual];

                    if (imagemAtual) {

                        personagem.src =
                            imagemAtual.src;

                        ultimoFrameValido =
                            imagemAtual.src;

                    }

                }

                ultimoFrame = tempoAtual;

            }

        } else if (animacaoAtual === "defense") {

            if (tempoAtual - ultimoFrame >= velocidadeDefense) {

                frameAtual++;

                if (frameAtual >= imagens.defense.length) {
                    frameAtual = 0;
                }

                const imagemAtual =
                    imagens.defense[frameAtual];

                if (imagemAtual) {

                    personagem.src =
                        imagemAtual.src;

                    ultimoFrameValido =
                        imagemAtual.src;

                }

                ultimoFrame = tempoAtual;

            }

        } else if (animacaoAtual === "dodge") {

            if (tempoAtual - ultimoFrame >= velocidadeDodge) {

                frameAtual++;

                if (frameAtual >= imagens.dodge.length) {

                    animacaoAtual = "idle";
                    frameAtual = 0;

                } else {

                    const imagemAtual =
                        imagens.dodge[frameAtual];

                    if (imagemAtual) {

                        personagem.src =
                            imagemAtual.src;

                        ultimoFrameValido =
                            imagemAtual.src;

                    }

                }

                ultimoFrame = tempoAtual;

            }

        } else if (animacaoAtual === "crouch") {

            if (tempoAtual - ultimoFrame >= velocidadeCrouch) {

                frameAtual++;

                if (frameAtual >= imagens.crouch.length) {
                    frameAtual = 0;
                }

                const imagemAtual =
                    imagens.crouch[frameAtual];

                if (imagemAtual) {

                    personagem.src =
                        imagemAtual.src;

                    ultimoFrameValido =
                        imagemAtual.src;

                }

                ultimoFrame = tempoAtual;

            }

        } else if (animacaoAtual !== "jump") {

            let velocidadeAtual;

            if (animacaoAtual === "idle") {
                velocidadeAtual = velocidadeIdle;
            }

            if (animacaoAtual === "walk") {
                velocidadeAtual = velocidadeWalk;
            }

            if (animacaoAtual === "run") {
                velocidadeAtual = velocidadeRun;
            }

            if (tempoAtual - ultimoFrame >= velocidadeAtual) {

                frameAtual++;

                if (
                    frameAtual >=
                    imagens[animacaoAtual].length
                ) {

                    frameAtual = 0;

                }

                const imagemAtual =
                    imagens[animacaoAtual][frameAtual];

                if (imagemAtual) {

                    personagem.src =
                        imagemAtual.src;

                    ultimoFrameValido =
                        imagemAtual.src;

                }

                ultimoFrame = tempoAtual;

            }

        }

        requestAnimationFrame(atualizarAnimacao);

    }

    carregarAnimacoes();

    requestAnimationFrame(atualizarAnimacao);

})();
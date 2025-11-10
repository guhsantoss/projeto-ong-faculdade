document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SELEÇÃO DE ELEMENTOS FUNDAMENTAIS
    const mainContent = document.querySelector('main .container');
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const nav = document.querySelector('header nav');
    const themeSwitch = document.querySelector('#checkbox-theme');

    // =============================================================
    // 2. CONTROLE DO MODO ESCURO
    // =============================================================
    if (themeSwitch) {
        const temaSalvo = localStorage.getItem('theme');
        if (temaSalvo === 'dark') {
            document.body.classList.add('dark-mode');
            themeSwitch.checked = true;
        }

        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // =============================================================
    // 3. FUNÇÕES DE ATIVAÇÃO E VALIDAÇÃO (REQUISITO 3)
    // =============================================================

    function ativarMascaras() {
        const inputCpf = document.querySelector('#cpf');
        const inputTel = document.querySelector('#telefone');
        const inputCep = document.querySelector('#cep');

        // Lógica das máscaras
        if (inputCpf) {
            inputCpf.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            });
        }
        if (inputTel) {
            inputTel.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
                e.target.value = value;
            });
        }
        if (inputCep) {
            inputCep.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/^(\d{5})(\d)/g, '$1-$2');
                e.target.value = value;
            });
        }
    }

    function ativarValidacaoFormulario() {
        const form = document.querySelector('#form-voluntario');
        const alertSucesso = document.querySelector('#alert-sucesso');
        if (!form) return;

        // Função auxiliar para criar e mostrar a mensagem de erro na tela.
        function mostrarErro(inputElemento, mensagem) {
            inputElemento.classList.add('erro'); 
            const divErro = document.createElement('div');
            divErro.className = 'mensagem-erro';
            divErro.innerText = mensagem;
            inputElemento.parentNode.appendChild(divErro);
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            let isValid = true; 
            
            // 1. Limpa todas as mensagens de erro e classes de erro antigas.
            form.querySelectorAll('.mensagem-erro').forEach(erro => erro.remove());
            form.querySelectorAll('.erro').forEach(input => input.classList.remove('erro'));
            alertSucesso.style.display = 'none';

            // 2. Validação de Nome e Email (Requisito de Consistência)
            const nome = form.querySelector('#nome');
            if (nome.value.trim().length < 3) {
                isValid = false;
                mostrarErro(nome, 'O nome deve ter no mínimo 3 caracteres.');
            }
            
            const email = form.querySelector('#email');
            if (!email.value.includes('@') || !email.value.includes('.')) {
                isValid = false;
                mostrarErro(email, 'Por favor, insira um e-mail válido.');
            }

            // 3. Sucesso
            if (isValid) {
                alertSucesso.style.display = 'block';
                form.reset();
            }
        });
    }

    // =============================================================
    // 4. MOTOR DA SPA
    // =============================================================

    function carregarConteudo(href) {
        if (href.includes('projetos.html')) {
            mainContent.innerHTML = templateProjetos();
            ativarMascaras(); // Garante que as máscaras funcionam se o usuário voltar para o cadastro
            ativarValidacaoFormulario(); 
        } else if (href.includes('cadastro.html')) {
            mainContent.innerHTML = templateCadastro();
            ativarMascaras();
            ativarValidacaoFormulario(); 
        } else if (href.includes('index.html')) {
            mainContent.innerHTML = templateHome();
        }
    }

    // Configura os "escutadores" de clique nos links.
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = event.target.getAttribute('href');

            if (nav.classList.contains('menu-aberto')) {
                nav.classList.remove('menu-aberto');
            }
            
            carregarConteudo(href);
        });
    });

    // Inicializa a Home na primeira visita
    carregarConteudo('index.html');
});

// =============================================================
// SISTEMA DE TEMPLATES (REQUISITO 2)
// =============================================================

const templateHome = function() {
    return `
        <section id="inicio">
            <h2>Resgatando vidas, criando futuros.</h2>
            <p>Somos a Patas com Futuro, uma organização dedicada ao resgate, cuidado e adoção de animais em situação de risco. Cada vida que salvamos é uma história de esperança.</p>
        </section>
        <hr>
        <section id="sobre-nos">
            <h2>Nossa História: Uma Jornada de Amor e Resgate</h2>
            <p>A ONG Patas com Futuro nasceu em 2015 do sonho de um pequeno grupo de amigos que não podiam mais ignorar o sofrimento dos animais de rua em nossa cidade. Hoje, contamos com uma rede de voluntários e parceiros dedicados, mas a paixão que nos moveu no primeiro dia permanece a mesma: dar uma segunda chance a quem mais precisa.</p>
            <figure>
                <img src="imagens/fundacao-ong.jpg" alt="Foto antiga do primeiro grupo de voluntários com alguns cães resgatados." loading="lazy">
                <figcaption>Nossos fundadores em 2015, no início de tudo.</figcaption>
            </figure>
        </section>
        <hr>
        <section id="contato">
            <h2>Entre em Contato Conosco</h2>
            <p><strong>Telefone / WhatsApp:</strong> (11) 98765-4321</p>
            <p><strong>E-mail:</strong> contato@patascomfuturo.org</p>
            <p><strong>Endereço:</strong> Rua dos Vira-Latas Felizes, 123, Cidade Animalia - SP</p>
        </section> 
    `;
};

const templateProjetos = function() {
    return `
        <section id="introducao-projetos">
            <h2>Conheça o Impacto do Seu Apoio</h2>
            <p>Cada doação e cada hora de voluntariado se transformam em ações concretas que salvam vidas. Veja abaixo os principais pilares do nosso trabalho.</p>
        </section>
        <hr>
        <section class="projeto-detalhe">
            <h3>Projeto Resgate e Reabilitação</h3>
            <p>Nossas equipes atuam diariamente resgatando animais em situações de risco. Após o resgate, eles recebem cuidados veterinários completos e alimentação de qualidade.</p>
            <h4>Vídeo Institucional: O Dia a Dia do Resgate</h4>
            <div class="video-wrapper">
                <div class="video-responsivo">
                    <video controls poster="imagens/capa-video.jpg">
                        <source src="videos/resgate-institucional.mp4" type="video/mp4">
                        <source src="videos/resgate-institucional.webm" type="video/webm">
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                </div>
            </div>
            <h4>Depoimento de um Adotante</h4>
            <audio controls>
                <source src="audios/depoimento-joana.mp3" type="audio/mpeg">
                <source src="audios/depoimento-joana.ogg" type="audio/ogg">
                Seu navegador não suporta o elemento de áudio.
            </audio>
        </section>
        <hr>
        <section class="projeto-detalhe">
            <h3>Feiras de Adoção</h3>
            <p>Regularmente, organizamos feiras de adoção. Veja alguns momentos!</p>
            <div class="row galeria-fotos">
                <figure class="col-lg-4 col-md-6">
                    <img src="imagens/galeria/imagen1.jpg" alt="Cão esperando adoção" loading="lazy">
                    <figcaption>
                        Esperando por um lar.
                        <div><span class="badge badge-amarelo">Novo Resgate</span></div>
                    </figcaption>
                </figure>
                <figure class="col-lg-4 col-md-6">
                    <img src="imagens/galeria/imagen2.jpg" alt="O olhar doce do Tobias." loading="lazy">
                    <figcaption>
                        O olhar doce do Tobias.
                        <div><span class="badge badge-verde">Pronto para Adoção</span></div>
                    </figcaption>
                </figure>
            </div>
        </section>
        <hr>
        <section id="participe">
            <h2>Gostou dos nossos projetos? Faça parte!</h2>
            <p>Seu apoio é fundamental para que essas histórias continuem acontecendo.</p>
            <a href="cadastro.html" class="btn btn-primary">Seja um Voluntário</a>
        </section>
    `;
};

function templateCadastro() {
    return `
        <section id="formulario-voluntariado">
            <div class="alert alert-sucesso" style="display: none;" id="alert-sucesso">
                <strong>Sucesso!</strong> Seu formulário foi enviado e será analisado por nossa equipe.
            </div>
            <h2>Formulário de Cadastro de Voluntário</h2>
            <p>Preencha os campos abaixo para fazer parte da nossa equipe. Entraremos em contato em breve!</p>
            <form action="#" method="POST" id="form-voluntario" novalidate>
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    <div><label for="nome">Nome Completo:</label><input type="text" id="nome" name="nome_completo" required minlength="3"></div>
                    <div><label for="email">E-mail:</label><input type="email" id="email" name="email_voluntario" required placeholder="seuemail@exemplo.com"></div>
                    <div><label for="nascimento">Data de Nascimento:</label><input type="date" id="nascimento" name="data_nascimento" required></div>
                    <div><label for="cpf">CPF:</label><input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"></div>
                    <div><label for="telefone">Telefone / Celular:</label><input type="tel" id="telefone" name="telefone" required placeholder="(XX) XXXXX-XXXX" pattern="\\(\\d{2}\\)\\s\\d{5}-\\d{4}"></div>
                    <div><label for="cep">CEP:</label><input type="text" id="cep" name="cep" required placeholder="00000-000" pattern="\\d{5}-\\d{3}"></div>
                    <div><label for="endereco">Endereço (Rua, Nº):</label><input type="text" id="endereco" name="endereco" required></div>
                    <div><label for="cidade">Cidade:</label><input type="text" id="cidade" name="cidade" required></div>
                    <div><label for="estado">Estado:</label><input type="text" id="estado" name="estado" required maxlength="2"></div>
                </fieldset>
                <fieldset>
                    <legend>Habilidades e Áreas de Interesse</legend>
                    <p>Marque todas as áreas nas quais você gostaria de ajudar:</p>
                    <div><input type="checkbox" id="interesse_caes" name="interesses" value="passear-caes"><label for="interesse_caes">Passear com cães</label></div>
                    <div><input type="checkbox" id="interesse_gatos" name="interesses" value="cuidar-gatos"><label for="interesse_gatos">Cuidar de gatos no abrigo</label></div>
                    <div><input type="checkbox" id="interesse_limpeza" name="interesses" value="limpeza-abrigo"><label for="interesse_limpeza">Limpeza e organização do abrigo</label></div>
                    <div><input type="checkbox" id="interesse_eventos" name="interesses" value="eventos-adocao"><label for="interesse_eventos">Participar de feiras de adoção</label></div>
                    <div><input type="checkbox" id="interesse_redes" name="interesses" value="redes-sociais"><label for="interesse_redes">Ajudar com redes sociais e divulgação</label></div>
                </fieldset>
                <fieldset>
                    <legend>Disponibilidade</legend>
                    <p>Qual período você prefere?</p>
                    <div><input type="radio" id="disp_manha" name="disponibilidade" value="manha" checked><label for="disp_manha">Manhãs (Segunda a Sexta)</label></div>
                    <div><input type="radio" id="disp_tarde" name="disponibilidade" value="tarde"><label for="disp_tarde">Tardes (Segunda a Sexta)</label></div>
                    <div><input type="radio" id="disp_fds" name="disponibilidade" value="fds"><label for="disp_fds">Finais de Semana</label></div>
                </fieldset>
                <button type="submit" class="btn btn-primary">Enviar Cadastro</button>
            </form>
        </section>
    `;
}
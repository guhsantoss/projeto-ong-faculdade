# 🚀 Projeto Front-End: Plataforma ONG Patas com Futuro

Este repositório contém o projeto final das disciplinas de Experiência Prática 1, 2, 3 e 4, focado no desenvolvimento de uma plataforma web completa para uma ONG fictícia. O projeto demonstra a evolução de uma estrutura HTML semântica para uma Single Page Application (SPA) interativa, responsiva e acessível.

---

## 🔗 Links de Acesso Rápido

* **Site Ao Vivo (GitHub Pages):** [https://guhsantoss.github.io/projeto-ong-faculdade/](https://guhsantoss.github.io/projeto-ong-faculdade/)
* **Repositório do Código:** [https://github.com/guhsantoss/projeto-ong-faculdade](https://github.com/guhsantoss/projeto-ong-faculdade)

---

## ✅ Checklist de Requisitos da Entrega 4

Este projeto cumpre todos os requisitos da entrega final:

| Requisito | Status | Observações |
| :--- | :--- | :--- |
| **Controle de Versão (GitFlow)** | ✅ **Cumprido** | O projeto utiliza `Issues` para tarefas, `feature branches` para desenvolvimento, `Pull Requests` para merge e `tags` para versionamento. |
| **Acessibilidade (WCAG 2.1)** | ✅ **Cumprido** | O site garante contraste de cores adequado, navegação completa via teclado (`Tab`) e foi implementado um **Modo Escuro** acessível. |
| **Otimização para Produção** | ✅ **Cumprido** | Os arquivos `style.css` e `script.js` foram **minificados** (`.min.css`, `.min.js`) e são os arquivos carregados pelo HTML. |
| **Documentação Técnica** | ✅ **Cumprido** | Este `README.md` serve como a documentação profissional do projeto. |

---

## 🛠 Tecnologias e Conceitos Aplicados

Este projeto foi construído do zero, utilizando apenas as tecnologias fundamentais da web para demonstrar domínio completo dos conceitos ensinados:

* **HTML5 Semântico:** (Entrega 1) Uso de tags como `<header>`, `<main>`, `<section>`, `<nav>` e `<figure>` para estruturar o conteúdo de forma lógica e acessível.
* **CSS3 Moderno:** (Entrega 2)
    * **Design System:** Uso de Variáveis CSS (`:root`) para uma paleta de cores e tipografia consistentes.
    * **CSS Grid:** Para o layout principal da página (cabeçalho, conteúdo, rodapé).
    * **Flexbox:** Para alinhamentos complexos (menu, cards).
    * **Grid de 12 Colunas:** Sistema de layout responsivo implementado para os cards de projetos.
    * **Responsividade:** 5+ breakpoints (`@media`) para adaptar o layout a todos os tamanhos de tela, incluindo um menu "hambúrguer".
* **JavaScript (ES6+):** (Entrega 3)
    * **Manipulação do DOM:** Seleção de elementos (`querySelector`) e manipulação de classes (`classList.toggle`).
    * **SPA (Single Page Application):** Sistema de templates (`templateProjetos`, `templateCadastro`) que injeta HTML no `<main>` sem recarregar a página.
    * **Validação de Formulário:** Sistema de verificação de consistência que exibe mensagens de erro (`.mensagem-erro`) personalizadas.
    * **Event Listeners:** Uso de `addEventListener` para cliques, envios de formulário e interatividade.
* **Acessibilidade e Otimização:** (Entrega 4)
    * **Modo Escuro:** Interruptor que salva a preferência do usuário no **`localStorage`**.
    * **Minificação:** Redução do tamanho dos arquivos CSS e JS para melhor performance.
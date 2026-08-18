# Portfólio Pessoal - Lucas Willian

Projeto de portfólio web desenvolvido para a disciplina de Desenvolvimento Web do Bacharelado em Sistemas de Informação, com foco em apresentação profissional, responsividade e interatividade.

## Visão Geral

O site foi estruturado em páginas separadas para organizar melhor os conteúdos:

- Sobre mim
- Formação
- Portfólio
- Contato

Além da navegação entre páginas, o projeto inclui componentes dinâmicos em JavaScript para timeline acadêmica, filtros de habilidades e projetos, modal de detalhes e validação de formulário.

## Funcionalidades

- Layout responsivo para desktop e mobile
- Alternância de tema claro/escuro com persistência em localStorage
- Menu mobile com abertura e fechamento dinâmico
- Seção de formação com timeline renderizada via JavaScript
- Filtros e busca para habilidades
- Filtros e busca para projetos
- Modal de detalhes dos projetos
- Formulário de contato com validação de campos
- Envio real de formulário via FormSubmit
- Redirecionamento para página de sucesso após envio

## Estrutura do Projeto

```text
facul-web/
├── sobre.html
├── formacao.html
├── portfolio.html
├── contato.html
├── obrigado.html
├── css/
│   └── style.css
└── js/
		└── script.js
```

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- FormSubmit (envio de e-mail sem backend próprio)

## Como Executar Localmente

1. Clone ou baixe este repositório.
2. Abra a pasta do projeto no VS Code.
3. Inicie com uma extensão de servidor local (ex.: Live Server) ou abra o arquivo inicial no navegador.
4. Acesse qualquer uma das páginas HTML para navegação.

## Configuração do Formulário de Contato

O formulário usa FormSubmit para enviar mensagens diretamente para o e-mail configurado.

- Endpoint configurado em contato.html:
  - action="https://formsubmit.co/lucaswcode@gmail.com"
- Campos ocultos utilizados:
  - \_subject: assunto personalizado do e-mail
  - \_captcha: desativado para simplificar envio
  - \_next: redirecionamento para obrigado.html após sucesso

Importante:

- No primeiro envio, o FormSubmit pede confirmação no e-mail de destino para ativar o recebimento.

## Autor

Lucas Willian

- E-mail: lucaswcode@gmail.com
- WhatsApp: https://wa.me/5541996699936

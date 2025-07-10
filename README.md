# FocoTotal - Extensão para Google Chrome

FocoTotal é uma extensão para o Google Chrome que melhora a sua experiência ao assistir vídeos, adicionando um "modo cinema" que escurece o restante da página para focar totalmente no conteúdo do vídeo.

## Tecnologias Utilizadas

Este projeto é uma extensão de navegador construída com tecnologias web modernas.

- **Manifest V3:** A especificação mais recente para extensões do Chrome, garantindo maior segurança e performance.
- **TypeScript:** Adiciona tipagem estática ao JavaScript para um desenvolvimento mais robusto e com menos erros.
- **React:** Utilizado para construir a interface do usuário (como pop-ups ou páginas de opções).
- **Vite:** Ferramenta de build moderna que oferece um ambiente de desenvolvimento extremamente rápido.
- **HTML5 & CSS3:** Para a estruturação e estilização dos elementos injetados nas páginas.

## Padrões de Projeto

A extensão utiliza padrões comuns no desenvolvimento para Chrome:

- **Content Scripts:** O núcleo da funcionalidade reside em `content.js` e `content.css`. Esses arquivos são injetados diretamente nas páginas web (conforme definido em `manifest.json`) para interagir com o DOM, identificar players de vídeo e aplicar o estilo de "modo cinema".
- **Build de Produção:** O código-fonte em TypeScript/React localizado na pasta `src` é compilado pela ferramenta Vite para a pasta `dist`, que contém os arquivos JavaScript e CSS puros que o navegador pode executar.

## Instruções de Setup e Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **NPM** ou **Yarn**

### 1. Instalação

Clone o repositório e instale as dependências do projeto:

```bash
npm install
```

### 2. Desenvolvimento

Para compilar o projeto em modo de desenvolvimento e observar as alterações em tempo real, execute:

```bash
# Este comando irá gerar a pasta /dist e mantê-la atualizada
npm run dev
```

### 3. Build para Produção

Para gerar a versão final e otimizada da extensão na pasta `/dist`, execute:

```bash
npm run build
```

### 4. Carregando a Extensão no Chrome

1. Após executar `npm run build` (ou `npm run dev`), a pasta `/dist` será criada.
2. Abra o Google Chrome e navegue para `chrome://extensions`.
3. Ative o **"Modo do desenvolvedor"** no canto superior direito.
4. Clique em **"Carregar sem compactação"**.
5. Selecione a pasta `dist` gerada no seu projeto.
6. A extensão **FocoTotal** aparecerá na sua lista e estará pronta para uso.

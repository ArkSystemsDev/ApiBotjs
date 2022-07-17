<h1 align="center"> Api Auto Vendas </h1>

<p align="center">
  <img width="800" alt="b26fab25f90d161d81b679edbd5abd24-Full" src="https://user-images.githubusercontent.com/42703631/179326340-7653baf8-efa9-4f94-8203-6590d890bc7e.png">
</p>

## Sobre
  Um projeto de automação de sistemas, onde visamos facilitar os processos de criação de anuncio nas plataformas OLX e Facebook

Desenvolvedora: BloodyMoon
Escrito por: Vitor Batista - Desenvolvedor Back - End

## ✔️ Técnicas e Tecnologias
**FrameWork Principal - Puppeteer**
- ``puppeteer: v15.4.0``

**Dependencias**
- ``nodemon: v2.0.19``
- ``express: v4.18.1``
- ``dotenv: v16.0.1``

**Design Pattern - ``Factory``**

**🕓 - DataBase - ``Postgree``**


##📌Figma com nosso Organograma
    No [link](https://www.figma.com/file/cCtnBcv870yvqr26uhDegf/Untitled?node-id=108%3A845) está presente todo o nosso organograma de código de como está planejada a versão 1.0 do projeto como um todo.

# :hammer: Funcionalidades do projeto
## ⚙️ Automatização de processos
  
- `Criação de Anuncios`: Criação de anuncios nas plataformas OLX e Facebook 
- `Produtos`: Criação de produtos para serem anunciados seguindo os requisitos da plataforma proposta
    - [x] Registro de Produtos: Carros, Imoveis e etc...
    - [x] Editar produtos já existentes.
    - [x] Deletar produtos já vendidos.
- `Geração de Arquivos de Log 📃`: Arquivos de log que devem ser enviados diaramente ao painel administrativo para sinalizar aos gerentes e subgerentes como está o processo de atividade do bot.

# Para empresa
- `Menu Administrativo`: Menu administrativo para Gerentes e SubGerentes.
    - `ID com privilegios`: Funcionarios terão seus niveis de privilegio dentro do projeto contendo seu login e senha e um ID administrativo.
    - Cada funcionario terá niveis de privilegio baseado em seu ID sendo eles:

        -[x] ID:01 - Gerente
         - Acesso completo a aplicação.
      
        -[x] ID:10 - SubGerente
         - Acesso a relatórios de consultores

        -[x] ID:15 - Funcionario
         - Criação dos anuncios e cadastramento de novas contas.

        -[x] ID:20 - Administrador
         - Cuida de toda a parte da aplicação tendo privilegios para acessar os arquivos.
        
- `Dados de Log`: A empresa recebera no painel adminstrativo todos os dados de log serão armazenados em um banco de dados, todos os dados armazenados poderam ser convertidos em arquivos ``power bi`` e serem feitos o download.
    - Dentro do arquivo ira conter as seguintes informações:
        - [x] Acesso de relatorios de consultores
        - [x] Relatorio de equipe
        - [x] Relatorios de SubGerentes
        - [x] Dados de Log do bot
- `Gestão de projeto`: Melhoria para seu negocio
- `Relatorios de Serviço`: Geração de arquivos de Log enviados por email a cada produto anunciado.
- `Gerenciamento de Cargos`: Sistema de gerenciamento de cargos, para melhor gestão de equipe.
    
## 🛠️ Abrir e rodar o projeto

**Para ter acesso ao projeto, é necessário instalar as dependencias, ``puppeteer`` utilizando o comando ``npm install puppeteer``.**
**Obsevações: Caso o puppeteer não esteja abrindo o navegador ao executar o código faça a verificação na documentação do puppeteer e cheque a sintaxe de seu código o link de acesso a documentação está presente [aqui](https://devdocs.io/puppeteer/)**

**Ao realizar a instalação da dependencia é necessário está presente no computador o ``Chromium DevTols`` que pode ser encontrado atráves do seguinte [link](https://download-chromium.appspot.com/dl/Win_x64?type=snapshots) de acesso direto ao download**

**Observação2: Caso ainda não está sendo realizado a inicilização do bot. Deverar ser instalado o ``yarn`` em seu ambiente e será utilizado o comando ``yarn install puppeteer`` para realizar a instalação completa de todas as dependencias do puppeter. Utilize esse método somente em ultimo caso.**

**Você pode acessar os arquivos do projeto clicando aqui [BloodyMoon](https://github.com/ArkSystemsDev).**

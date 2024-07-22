# Managee - Sistema de Gerenciamento de Eventos

## Visão Geral

Managee é um sistema de gerenciamento de eventos desenvolvido utilizando a arquitetura de Microfrontends, visando modularidade, escalabilidade e eficiência. Esta aplicação permite criar, gerenciar e visualizar eventos, 
além de permitir que usuários se inscrevam e confirmem presença nos mesmos. O sistema oferece um dashboard completo para acompanhamento das inscrições e confirmações.

## Funcionalidades

- **Gerenciamento de Eventos**: Criação, edição e visualização de dados de eventos.
- **Inscrições**: Usuários podem se inscrever em eventos através de links dedicados.
- **Confirmação de Presença**: Função para confirmar presença em eventos.
- **Dashboard**: Visualização das inscrições e confirmações em tempo real.
- **Notificações**: Sistema de de envio de emails para confirmação de inscições.

## Tecnologias Utilizadas

### Frontend

- **React**
- **TailwindCSS**: Tota estilização do projeto.
- **react-hook-form**: Utilizado para gerenciamento e validação de formulários.
- **zod**: Biblioteca de validação de esquemas.
- **React Icons**: Conjunto de ícones para a interface.
- **Toastify**: Para exibição de notificações.


### Backend

- **Node.js**
- **TypeScript**
- **Express**
- **MongoDB**
- **Render**: Hospedagem da aplicação.
- **Axios**: Para realizar chamadas HTTP.
- **nodemailer**: Configuração de envio de e-mails.

### Arquitetura de Microfrontends

A aplicação Managee utiliza a arquitetura de Microfrontends com a Module Federation para dividir a interface em pequenos módulos independentes que podem ser desenvolvidos, implantados e atualizados de forma isolada. Essa abordagem permite maior flexibilidade e escalabilidade, facilitando a manutenção e evolução do sistema.

- **MF_ADMIN**: Microfrontend responsável pela exibição do dashboard.
- **MF_EVENT**: Microfrontend que contém todas as páginas relacionados aos eventos (inscrições, edição, detalhes).
- **MF_AUTH**: Serviço que contém o backend do software. Autenticação, criação de usuários e todo gerenciamento dos eventos.
- **Container App**: Aplicação principal que orquestra os microfrontends, gerenciando a navegação e a comunicação entre eles.

## Como Executar o Projeto Localmente

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/managee.git
    cd managee
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

4. Para construir o projeto para produção:
    ```bash
    npm run build
    ```

5. Para servir o projeto construído:
    ```bash
    npm run build:start
    ```

    **Gerencie seus eventos com eficiência e facilidade utilizando o Managee!**

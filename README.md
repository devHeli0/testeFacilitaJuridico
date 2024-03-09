Sistema de Gerenciamento de Clientes
Este sistema visa proporcionar uma solução eficiente para uma empresa que realiza limpeza em residências, ajudando a centralizar e gerenciar as informações dos seus clientes. O sistema é composto por um backend em Node.js utilizando PostgreSQL como banco de dados e um frontend em React.

Funcionalidades
Parte 1: Gerenciamento de Clientes
Listagem de Clientes:

O sistema permite listar todos os clientes cadastrados, exibindo seus nomes, emails e telefones.
Os clientes podem ser filtrados com base nas informações cadastradas, facilitando a busca por clientes específicos.
Cadastro de Clientes:

É possível cadastrar novos clientes fornecendo seus nomes, emails e telefones.
Parte 2: Otimização de Rotas de Atendimento
Mapa Bidimensional:

Cada cliente cadastrado possui uma coordenada X e uma coordenada Y em um mapa bidimensional, representando sua localização.
Cálculo de Rota:

Um algoritmo calcula a rota partindo da empresa (0,0) e passando pela localização de todos os clientes cadastrados, retornando à empresa no final.
A rota é calculada para ter a menor distância possível, maximizando a eficiência na visitação dos clientes.
Visualização da Rota:

Na tela de clientes, há um botão que, ao ser clicado, abre uma modal mostrando a ordem de visitação dos clientes na rota calculada.
A ordem de visitação é exibida de forma simples, com uma lista dos clientes na ordem que devem ser visitados.
Como Executar a Aplicação
Pré-requisitos
Docker instalado na máquina local.
Passos
Clone este repositório para a sua máquina local.
Navegue até o diretório clonado.
Abra um terminal e execute o seguinte comando para iniciar os serviços:
Copy code
docker-compose up
Aguarde até que todos os serviços estejam em execução.
Abra um navegador e acesse http://localhost:3001 para utilizar o frontend da aplicação.
Com isso, o sistema estará pronto para ser utilizado, permitindo o gerenciamento eficiente dos clientes e a otimização das rotas de atendimento da empresa.

# GTA San Andreas Online — Sistema de Salas (protótipo)

Este projeto implementa um servidor de salas em tempo real com:
- criação de sala e código aleatório de 6 caracteres;
- entrada por código;
- lista de jogadores conectados;
- chat entre participantes;
- limite inicial de 8 participantes por sala.

## Requisitos
- Node.js 18 ou superior
- Acesso à internet para instalar as dependências e hospedar o servidor

## Como iniciar
1. Extraia o ZIP em um computador.
2. Abra um terminal dentro da pasta do projeto.
3. Execute `npm install`.
4. Execute `npm start`.
5. Abra `http://localhost:3000` no navegador.

Para amigos entrarem de outras casas, o servidor precisa ser publicado em uma hospedagem que aceite aplicações Node.js e WebSocket. Não compartilhe portas ou exponha seu computador sem entender a configuração de segurança.

## Importante sobre o PS3
Este é o primeiro protótipo do serviço de salas e chat. Ele ainda não é um PKG e não injeta multiplayer no GTA San Andreas NPEB/NPUB. Para ter personagens juntos dentro do jogo será necessário desenvolver e testar uma modificação cliente compatível com a versão exata do jogo e com o PS3 HEN. O SA-MP de PC não é um cliente PS3.


## Atualização 0.2 — mapa visual e locais
- Adicionada tela "Abrir mapa da cidade", usando o mapa geral enviado como referência.
- É possível tocar/clicar no mapa para posicionar um marcador visual.
- Adicionadas imagens de referência para "Cidade do interior", "Bairro das casas" e "A Rua Mais Milionária".
- As imagens são referências visuais no protótipo; não foram instaladas dentro dos arquivos do GTA.


## Atualização 0.3 — missão inicial (protótipo)
Ao criar ou entrar em uma sala, a interface inicia uma missão tutorial:
1. Pegar o carro (etapa simulada).
2. Revelar o marcador vermelho da casa no mapa.
3. Marcar a chegada à casa.
4. Entrar pela bolinha vermelha.
5. Exibir a mensagem "MISSÃO CONCLUÍDA".

Limitação: os botões simulam as etapas na interface web. Isso ainda não controla veículos, personagens, colisões ou interiores dentro do GTA no PS3. A integração real exige desenvolvimento de um cliente/mod compatível com o executável NPEB/NPUB e testes no console.


## Atualização 0.4 — interior da casa, salvamento e modo livre
- Ao entrar na casa, aparece a notificação "MISSÃO CONCLUÍDA".
- Surge a etapa do ponto azul no fundo da casa.
- Ao alcançar o ponto azul, aparece a tela "Salvar jogo".
- Ao salvar, o protótipo libera o estado "Modo livre".
- HUD ilustrativo mostra a pistola enviada como referência e munição 20/20.

Limitação: estas etapas são simulações na página web. Não salvam progresso real do GTA, não adicionam uma arma ao inventário do jogo e não alteram o executável NPEB/NPUB. A integração no PS3 requer desenvolvimento e testes específicos no cliente do jogo.


## Atualização 0.5 — lojas interativas (protótipo web)
- Adicionada loja de armas com catálogo, seleção destacada/brilhante, preço e botão X/Comprar.
- Adicionada loja de comida com seleção destacada, preços e compra.
- Saldo demonstrativo inicial: $5.000; compras descontam do saldo.
- Compras são registradas no chat da sala e atualizam o estado visual do protótipo.
- Catálogo usa nomes e preços fictícios de jogo; a imagem enviada aparece como referência visual.

Limitação: o menu não é a loja original do GTA, não implementa animação/câmera/controles reais do GTA V e não equipa modelos 3D na mão do personagem. O inventário, saldo e energia são apenas estados da interface web. A integração real no PS3 exige um cliente/mod próprio compatível com a versão NPEB/NPUB.

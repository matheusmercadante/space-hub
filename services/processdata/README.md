<h1 align="center">
    <img alt="SpaceHub" title="#delicinha" src="../.github/spacehub.svg" width="250px" />
</h1>

<p align="center">
  <a href="#rocket-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#collision-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-rodando-o-projeto">Rodando o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-rodando-o-projeto">Endpoints</a>
</p>

<h2>
<strong>Microservice ProcessData</strong> da aplicação Space Hub.
</h2>

## 🚀 Sobre

À adicionar

## :collision: Funcionalidades

- Comparar sheet com outra base de dados;
- Converter sheet;
- Retornar novo sheet com merge;

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Python](https://www.python.org/)
- [Tornado](https://www.tornadoweb.org/en/stable/)
- [Pandas](https://pandas.pydata.org/)
- [RabbitMQ](https://www.rabbitmq.com/)

\* Para mais detalhes, veja o <kbd>[pyproject.toml](./pyproject.toml)</kbd>

## :zap: Rodando o projeto

### Docker

É preciso ter o [Docker](https://www.docker.com/) instaldo em sua máquina. Feito a instalação, rodar os seguintes comandos:

```bash
$ docker run --name database -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

# Após executar os comandos acima, verificar se as imagens estão rodando no terminal:
$ docker ps

# Caso as imagens estejam paradas/não aparecem no terminal, executar:
$ docker start database
```

### ProcessData

```bash
# Entrar na raiz do projeto **/processdata** e rodar o comando:
$ poetry install

# Ainda na raiz do projeto, rodar o comando:
$ python processdata/server.py ## python3 processdata/server.py
```

Feito isso, o server ficara escutando IO

Se desejar, pode rodar os testes do projeto, usando o seguinte comando:

```bash
$ poetry test
```

## :notebook: Endpoints

Você pode executar online ou fazer o download dos endpoints e executar diretamente no Insomnia:

## [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2FWallysonGalvao%2Frocketseat-gobarber%2Fmaster%2Fbackend%2Fendpoints.json)

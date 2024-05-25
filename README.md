
# Baixe o Docker na sua máquina [here](https://www.docker.com/products/docker-desktop/)

Essa aplicação trabalha juntamente com a versão do frontend [AQUI](https://github.com/j0hnbarbosa/agendamento-servicos-web)

# Execute os comandos no terminal:
```bash
  
  ## Esse comando conta com um PONTO no final que indica o local de onde será pego os arquivos
  docker build -t agendamento-servicos-api .

  ## Para iniciar a execução da aplicação digite:
  docker-compose up -d

  ## Para parar a execução digite:
  docker-compose down

  ## Para parar a execução da aplicação e excluir os dados salvos na base de dados digite:
  docker-compose down -v

```

## Se acessar o endereço http://localhost:3001 irá acessar a documentação da api.
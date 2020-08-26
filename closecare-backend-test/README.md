## Explicação do que foi feito

Esse código e referete ao backend do teste. A API recebe POST para cadastrar um funcionário e também faz busca de um funcionário através do ID do mesmo.

## Documentação da API:

Rota: http://localhost:8000/api/v1/employee/<id> Método: GET


Rota: http://localhost:8000/api/v1/employee Método: POST

```json
{
    "first_name": "João",
    "last_name": "Silva",
    "gender": "m",
    "birth_date": "2000-09-03",
    "CPF": "533.918.870-10"
}
```

## Como rodar o backend:

Para facilitar o processo de rodar o código foi criado o docker-compose.yml que tem o banco de dados (PostgreSQL) e o código do backend.

Para rodar basta ter o docker e o docker-compose instalado na máquina e dentro da pasta raiz deste projeto rodar no terminal o seguinte comando:

```
docker-compose up
```

## Melhorias:

- Serializar utilizando alguma lib como flask-marshmallow
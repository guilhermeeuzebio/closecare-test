## Como rodar essa aplicação:

Para facilitar o processo de rodar o código foi utilizado o docker.

Para rodar o frontend basta ter o docker instalado na máquina e dentro da pasta raiz deste projeto rodar no terminal os seguintes comandos:

```
docker build -t closecare-frontend-test .

docker run -p 4200:80 closecare-frontend-test
```

Após rodar acesse:

http://localhost:4200/

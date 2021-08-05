# Desafio técnico backend Node

## Ferrmentas utilizadas:

- express de framework;
- axios para requisicoes http;
- pino para logs da aplicação;
- jsonwebtoken para autenticação via jwt;
- mongoose para ODM;

<br />

## Como executar a aplicação:

### Criar arquivo .env com configurações baseado no .env_exemple
- Definir string de conexão com o mongodb
- Definir SECRET_HASH da aplicação


<br />

### No diretorio do projeto, rode:

### Usando Yarn:

#### `yarn` para instalação das dependencias

#### `yarn start` para executar a aplicação

### Usando NPM:

#### `npm install` para instalação das dependencias

#### `npm start` para executar a aplicação



<br />

## Rotas e exemplos:

<br />
Para cadastrar num novo revendedor

#### [POST] em /revendedor/cadastrar
<br />

```json
{
	"nome":"Fulano de Tal",
	"emai": "fulanodetal@mail.com",
	"password":"teste@boti123",
	"cpf":"12312312312"
}
```
<br />
Para fazer login de um revendedor

#### [POST] em /revendedor/login


```json
{
	"email": "fulanodetal@mail.com",
	"password":"teste@boti123"
}
```
<br />
Para cadastrar uma nova compra

#### [POST] em /compras/cadastrar


```json
{
	"codigo":"1",
	"data": "05/02/2021",
	"valor":"2000",
	"cpf":"12312312312"
}
```
<br />
Para listar compras cadastradas

#### [GET] em /compras/listar


<br />
Para consultar cashback acumulado

#### [GET] em /compras/cashback
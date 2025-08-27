# Product API

Este projeto é uma aplicação completa para cadastro, autenticação e gerenciamento de produtos, composta por um back-end em Spring Boot e um front-end em React.

## Sumário
- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Endpoints Principais](#endpoints-principais)
- [Autenticação](#autenticação)
- [Paginação](#paginação)
- [Docker](#docker)

---

## Descrição
O sistema permite o cadastro, autenticação de usuários e o gerenciamento de produtos, incluindo operações de criação, listagem (com paginação), atualização e remoção. O front-end consome a API e oferece uma interface moderna para interação.

## Tecnologias
- **Back-end:** Java 17+, Spring Boot, Spring Data JPA, JWT, Maven, Docker
- **Front-end:** React (Create React App), Context API, MUI, Toastify, Docker
- **Banco de Dados:** (configurável via Spring Data JPA)

> ⚠️ **Observação:**
> Este projeto permite o uso de praticamente qualquer banco de dados relacional suportado pelo Spring Data JPA (ex: H2, PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, etc).
>
> **Como trocar o banco de dados:**
> 1. Adicione a dependência do driver do banco desejado no `pom.xml`.
> 2. Configure a URL, usuário e senha no arquivo `src/main/resources/application.properties`.
>
> **Exemplo para PostgreSQL:**
> ```xml
> <dependency>
>   <groupId>org.postgresql</groupId>
>   <artifactId>postgresql</artifactId>
>   <scope>runtime</scope>
> </dependency>
> ```
> ```properties
> spring.datasource.url=jdbc:postgresql://localhost:5432/seubanco
> spring.datasource.username=usuario
> spring.datasource.password=senha
> ```
> Não é necessário alterar o código Java, apenas as configurações e dependências.

## Como rodar o projeto

### Pré-requisitos
- Java 17+
- Node.js 18+
- Docker (opcional, recomendado para ambiente de produção)

### Rodando com Docker
1. Clone o repositório:
   ```sh
   git clone https://github.com/roberto-cassio/Product-API.git
   cd Product-API
   ```
2. Defina a variável de ambiente do JWT no back-end (exemplo):
   ```sh
   export SECURITY_JWT_SECRET_KEY=uma_senha_secreta
   ```
3. Suba os containers:
   ```sh
   docker-compose up --build
   ```
4. Acesse o front-end em [http://localhost:3000](http://localhost:3000)

### Rodando localmente (sem Docker)
1. Back-end:
   ```sh
   cd Product-API
   ./mvnw spring-boot:run
   ```
2. Front-end:
   ```sh
   cd ui/products-api
   npm install
   npm start
   ```

## Funcionalidades
- Cadastro e login de usuários (JWT)
- CRUD de produtos
- Paginação de produtos
- Validação de dados
- Interface responsiva

## Estrutura de Pastas
```
Product-API/
├── src/
│   ├── main/java/com/example/productapi/
│   │   ├── auth/           # Autenticação e usuários
│   │   ├── configs/        # Configurações de segurança e filtros
│   │   └── products/       # Domínio de produtos
│   └── test/java/...       # Testes automatizados
├── ui/products-api/        # Front-end React
│   ├── src/components/     # Componentes reutilizáveis
│   ├── src/contexts/       # Contextos de autenticação e produtos
│   ├── src/pages/          # Páginas principais
│   └── ...
├── docker-compose.yml      # Orquestração Docker
├── Dockerfile              # Dockerfile do back-end
└── ...
```

## Endpoints Principais
- `POST /api/auth/register` — Cadastro de usuário
- `POST /api/auth/login` — Login e obtenção do token JWT
- `GET /api/products` — Listagem paginada de produtos
- `POST /api/products` — Cadastro de produto
- `PUT /api/products/{id}` — Atualização de produto
- `DELETE /api/products/{id}` — Remoção de produto

## Autenticação
- O sistema utiliza JWT para autenticação.
- Após o login, inclua o token no header `Authorization: Bearer <token>` para acessar endpoints protegidos.

## Paginação
- O endpoint de listagem de produtos aceita parâmetros `page`, `size` e `sort`.
- Exemplo: `/api/products?page=0&size=10&sort=name,asc`


## Documentação automática (Swagger/OpenAPI)
- O projeto utiliza o [Springdoc OpenAPI](https://springdoc.org/) para gerar documentação automática da API (Swagger UI).
- Para ativar, adicione a dependência abaixo no seu `pom.xml` (já incluída neste projeto):
  ```xml
  <dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.5.0</version>
  </dependency>
  ```
- Após rodar a aplicação, acesse: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Docker
- O projeto inclui `docker-compose.yml` para facilitar o deploy integrado do back-end e front-end.
- Certifique-se de definir a variável de ambiente `SECURITY_JWT_SECRET_KEY` para o back-end.

---

## Contribuição
Pull requests são bem-vindos! Para sugestões, abra uma issue.



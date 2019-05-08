# employees-CRUD

## API:
Construida em Python utilizando Flask + SQLAlchemy.

### Desenvolvimento
Para iniciar o desenvolvimento é necessário ter instalado [Python 3](https://www.python.org/download/releases/3.0/).
É recomendado a utilização de um ambiente virtual como [virtualenv](https://virtualenv.pypa.io/en/latest/).

Para instalar as dependências do projeto navegue até a pasta api e utilize o comando:

    pip3 install -r requirements.txt

Para rodar:

    python3 app.py HOST=0.0.0.0 PORT=3000

## Frontend
Construido utilizando o Framework Angular 7.

### Desenvolvimento
É necessário ter a versão 8 ou 10 do NodeJS e instalado o [Angular CLI](https://angular.io/guide/quickstart)
Após ter os requisitos instalados navegue até a pasta front/employeecrud e a aplicação poderá ser servida com:
    
    ng serve --open

### Deploy
É possível compilar a versão para produção utilizando:
    
    ng build --prod

Os arquivos serão criados em employeedcrud/dist/ .

## Docker
Caso esteja familiarizado com Docker, é possível iniciar a aplicação a partir de:
    
    docker-compose up -d

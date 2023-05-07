# Proyecto "Recipes"

Es un proyecto para conectar La oferta de platos de restaurantes y su clase de servicio, con los deseos de los usuarios. El usuario ingresará los intereses de sabores, nivel del restaurante y tipo de comida que desea, y el sistema le devolverá una lista de restaurantes o platos que cumplen con sus deseos. El usuario podrá determinar si desea ver los restaurantes o los platos, o ambos.

## Requerimientos
- NodeJS 14 o superior
- Docker (opcional)
- Docker Compose (opcional)

## Primeros pasos
1. Instalación.
  ```bash
  $ npm install
  ```
2. Copiar el archivo de variables de entorno.
  ```bash
  $ cp .env.example .env
  ```
3. Ejecución.
  ```bash
  # Ejecución en entorno local de docker, con docker compose
  $ npm run start:docker
  ```
4. Pruebas. Usar la información que se encuentra en la carpeta [requests](./requests) para probar los servicios, usando un cliente REST como Postman.
5. Detener la ejecución.
  ```bash
  $ npm run stop:docker
  ```
### Nota:
Es posible hacer una ejecución local con NodeJS, pero se debe tener una base de datos de MongoDB en local. Se puede usar el archivo [docker-compose.yml](./docker-compose.yml) para lanzar una base de datos de MongoDB en local, con el comando:
```bash
$ docker compose up mongoRecipes
```
Este comando lanzará una base de datos de MongoDB en el puerto 27017. Se debe cambiar la configuración de la base de datos en el archivo [.env](./.env) para que apunte a la base de datos local.

## Definición de funcionalidad
El servicio requiere unos criterios de entrada para hacer la selección del restaurante y o plato. Los criterios son:
- Categoría del restaurante: Numeros del 1 al 5, donde 1 es el más económico y 5 el más costoso.
- Concepto de comida del restaurante: Comida rápida, Buffet, Gourmet.
- Sabores del plato: Amargo, Salado, Dulce, Agrio, Picante, Umami
- Temperatura del plato: Caliente, Frío

El proceso de evaluación de la recomendación es el siguiente:
- Primero se buscan los criterios de los restaurantes (categoría y concepto de comida) que cumplan con los criterios de entrada.
- A continuación se califica a los restaurantes según la cantidad de categorías y conceptos que puedan aplicar. Se suman cuantos criterios cumple el restaurante y se divide por el total de criterios solicitados.
- Después se buscan los platos por los sabores y la temperatura que cumplan con los criterios de entrada. Si ya se encontraron restaurantes con los primeros criterios, la comida también se filtrará por los restaurantes encontrados.
- Se califican los platos encontrados según el cumplimiento de los requerimientos de entrada. Se suman cuantos criterios cumple el plato y se divide por el total de criterios solicitados. Además, si se suministraron los restaurantes, se hace la multiplicación de la calificación del restaurante por la calificación del plato.
- Al final, se ordenan los restaurantes y los platos por la calificación obtenida, dejando en primer lugar los que tengan mayor calificación.
- Según la solicitud del usuario, se devolverá el mejor restaurante y el mejor plato, o solo el mejor restaurante, o solo el mejor plato.

Por defecto, siempre buscará el mejor plato, y se requerirá como mínimo un criterio de entrada.


## Notas de desarrollo
- Se usa el framework [NestJS](https://nestjs.com/) para el desarrollo de la API.
- Se puede ejecutar con [Docker](https://www.docker.com/). Se crea una configuración para Docker en el archivo [Dockerfile](./Dockerfile), y una configuración para Docker Compose en el archivo [docker-compose.yml](./docker-compose.yml) para lanzar el servicio y su base de datos.
- Se deja una copia de la base de datos de prueba en la carpeta [db](./db). Se puede usar para lanzar la base de datos en local, con el servicio de MongoDB registrado en el archivo [docker-compose.yml](./docker-compose.yml).
- El proyecto se puede ejecutar en local, en un contenedor de Docker o en un contenedor de Cloud Run.
- Se usa [MongoDB](https://www.mongodb.com/) como base de datos.
- Se usa NodeJS 14 o superior.
- Se usa el ORM [Mongoose](https://mongoosejs.com/) para la conexión con la base de datos. Se integra con NestJS a través del módulo [NestJS Mongoose](https://docs.nestjs.com/techniques/mongodb).
- Se usa el patrón de diseño Factory para la gestión de la base de datos.


## Base de datos
Se usa el motor Mongo DB por cuestiones de facilidad de integración.

Ahora bien, como las búsquedas se van a realizar por restaurantes y por platos, lo mejor que se puede hacer es tener dos colecciones separadas, similar a dos tablas en bases de datos relacionales.

## Recursos
- Se usa la guía de mejores prácticas para TS de AWS en este [documento](https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-cdk-typescript-iac/typescript-best-practices.html)
- Se usa esta [guía](https://www.tomray.dev/deploy-nestjs-cloud-run) para crear una integración continua con Cloud Run
- Se usa un [generador de JSON](https://app.json-generator.com/) para poblar la base de datos. Se puede usar el [modelo](./src/shared/mockups/jsonGeneratorModel.txt) para generar otro set de datos.
- Se usan los sabores de las comidas. [Guía](https://www.ceupe.mx/blog/tipos-de-sabores-en-la-comida.html)
- Se usa un listado de nombres imaginarios de restaurantes tomado de [aquí](https://digitalessen.com/nombres-de-restaurantes/).
- Se usa la clasificación de restaurantes de [este documento](https://www.cursosgastronomia.com.mx/blog/consejos/tipos-de-restaurante/).
- En la carpeta [requests](./requests) se encuentran los archivos del plugin [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de VSCode, para probar los servicios.

## License

Recipes tiene licencia [MIT](LICENSE).

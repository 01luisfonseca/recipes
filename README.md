# Proyecto "Recipes"

Es un proyecto para conectar La oferta de platos de restaurantes y su clase de servicio, con los deseos de los usuarios. El usuario ingresará los intereses de sabores, nivel del restaurante y tipo de comida que desea, y el sistema le devolverá una lista de restaurantes o platos que cumplen con sus deseos. El usuario podrá determinar si desea ver los restaurantes o los platos, o ambos.

## Definición de funcionalidad


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

## License

Recipes tiene licencia [MIT](LICENSE).

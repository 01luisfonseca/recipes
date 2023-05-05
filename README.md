# Proyecto "Recipes"

Es un proyecto para conectar La oferta de platos de restaurantes y su clase de servicio, con los deseos de los usuarios.

## Definición de funcionalidad


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

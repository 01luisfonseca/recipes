## Generación de restaurantes
```txt
JG.repeat(10, {
  name: JG.random(
    'Cantina y Tacos',
    'La Vida Miel',
    'Salsitas y Uno',
    'Taco on the Plaza',
    'La Cantina Azteca',
    'The Gourmet Shake',
    'Street Food',
	'Yummy on the Corner!',
    'Grab 1 and Go!',
    'Cantina Rápida',
    'Le Gros Luxe',
	'Bella Grande Restaurant',
    'Evalencia’s House',
    'Santorini Garden',
    'La Duquesa',
    'Bella Mia Italian',
    'Tres Rios Ristorante',
    'Cheese N Pasta',
    'Pasta La Rose!',
    'Olive Pasta Lounge',
    'Delicias Criollas',
    'Raíces',
    'Terra Viva',
    'Fusión y Tradición',
    'Avenida del Sabor',
    'Sunset Restaurant',
    'The Cucina',
    'The Sky Bar',
    'Glamour',
    'Nueva Bahía Gourmet'
  ),
  category: JG.random(1, 2, 3, 4, 5),
  concept: _.uniq(JG.repeat(1,3, JG.random("Gourmet", "Familiar", "Buffet", "Comida rápida", "Temático", "Para llevar"))),
});
```

## Generación de recetas
```txt
JG.repeat(500, {
  	name: JG.loremIpsum({ units: 'words', count: 2 }),
    taste:  _.uniq(JG.repeat(1,4, JG.random("Amargo", "Salado", "Dulce", "Agrio", "Picante", "Umami"))),
    temperature: JG.random('Caliente', 'Frío')
});
```
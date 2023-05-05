## Generación de restaurantes
```txt
JG.repeat(10, {
  _id: {
  $oid: JG.objectId()
  },
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
  category: {
    $numberLong: JG.random('1', '2', '3', '4', '5'),
  },
  concept: _.uniq(JG.repeat(1,3, JG.random("Gourmet", "Familiar", "Buffet", "Comida rápida", "Temático", "Para llevar"))),
});
```

## Generación de recetas
```txt
JG.repeat(200, {
  _id: {
  $oid: JG.objectId()
  },
  	restaurant_id: JG.random(
      '6455912b58c8536ab79ee2d9',
      '6455912be02e162738cc5aef',
      '6455912b30db33cd28e858ea',
      '6455912b8e84e0571916aeef',
      '6455912b70e43260e74f6b21',
      '6455912b2693f5c0e727b998',
      '6455912b55dc12a2e9174e99',
      '6455912b06417ad7de7fd393',
      '6455912b4a81e8a465cc9120',
      '6455912bfea79465ee222359'
   ),
  	name: JG.loremIpsum({ units: 'words', count: 2 }),
    taste:  _.uniq(JG.repeat(1,4, JG.random("Amargo", "Salado", "Dulce", "Agrio", "Picante", "Umami"))),
    temperature: JG.random('Caliente', 'Frío')
});
```
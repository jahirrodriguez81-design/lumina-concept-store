/* ═══════════════════════════════
   LUMINA — Catálogo de productos
   Imágenes generadas con IA (Pollinations.ai)
   ═══════════════════════════════ */

// Genera URL de imagen IA con prompt y semilla fija (siempre la misma imagen)
function aiImg(prompt, seed) {
  return `https://image.pollinations.ai/prompt/${prompt}?width=900&height=1100&nologo=true&seed=${seed}&model=flux`;
}

const LUMINA_PRODUCTS = [
  {
    id: 1,
    name: 'Vestido Lumina Floral',
    category: 'Mujer', sub: 'Vestidos',
    price: 65, oldPrice: null, badge: 'Nuevo',
    img: aiImg('elegant+floral+midi+dress+fashion+violet+red+colors+studio+photography+luxury', 101),
    imgs: [
      aiImg('elegant+floral+midi+dress+fashion+violet+red+colors+studio+photography+luxury', 101),
      aiImg('elegant+floral+midi+dress+side+view+violet+fashion+model+editorial', 102),
      aiImg('floral+midi+dress+detail+fabric+texture+violet+red+close+up+fashion', 103),
      aiImg('elegant+floral+dress+full+length+model+posing+studio+violet+fashion', 104),
    ],
    colors: [{name:'Violeta',hex:'#9b59b6'},{name:'Rojo',hex:'#e74c3c'},{name:'Negro',hex:'#111111'}],
    sizes: ['XS','S','M','L','XL'],
    description: 'Vestido de corte midi con estampado floral exclusivo de la colección Lumina 2026. Confeccionado en tela fluida de alta calidad que se adapta a la figura. Ideal para ocasiones especiales, eventos sociales y salidas nocturnas.',
    material: '95% Viscosa · 5% Elastano',
    care: 'Lavar a mano en agua fría · No usar secadora · Planchar a temperatura baja · No lavar en lavadora',
    related: [3, 6, 9],
  },
  {
    id: 2,
    name: 'Abrigo Oslo Premium',
    category: 'Hombre', sub: 'Abrigos',
    price: 120, oldPrice: 150, badge: '-20%',
    img: aiImg('premium+oversize+wool+coat+men+fashion+dark+blue+gray+scandinavian+editorial+luxury', 201),
    imgs: [
      aiImg('premium+oversize+wool+coat+men+fashion+dark+blue+gray+scandinavian+editorial+luxury', 201),
      aiImg('men+oversize+coat+dark+blue+side+view+fashion+editorial+clean+background', 202),
      aiImg('premium+wool+coat+texture+detail+lapel+close+up+dark+blue+fashion', 203),
      aiImg('men+wearing+oversize+coat+street+style+editorial+dark+blue+gray+urban', 204),
    ],
    colors: [{name:'Azul oscuro',hex:'#2c3e50'},{name:'Gris',hex:'#7f8c8d'}],
    sizes: ['S','M','L','XL','XXL'],
    description: 'Abrigo de corte oversize inspirado en la moda escandinava. Fabricado con lana de alta densidad que garantiza calidez sin perder elegancia. Un básico imprescindible para los meses fríos con estilo urbano contemporáneo.',
    material: '80% Lana · 20% Poliéster',
    care: 'Lavado en seco recomendado · Guardar colgado · No torcer ni estrujar · Cepillar suavemente',
    related: [5, 8, 11],
  },
  {
    id: 3,
    name: 'Look Editora Urban',
    category: 'Mujer', sub: 'Casual',
    price: 52, oldPrice: null, badge: null,
    img: aiImg('women+urban+chic+outfit+crop+top+high+waist+pants+black+white+editorial+fashion', 301),
    imgs: [
      aiImg('women+urban+chic+outfit+crop+top+high+waist+pants+black+white+editorial+fashion', 301),
      aiImg('women+casual+look+crop+top+wide+leg+pants+black+white+street+style+editorial', 302),
      aiImg('urban+casual+outfit+detail+texture+crop+top+black+close+up+fashion+photography', 303),
      aiImg('women+urban+look+full+length+pose+black+white+editorial+city+background', 304),
    ],
    colors: [{name:'Negro',hex:'#111111'},{name:'Blanco',hex:'#f5f5f5'}],
    sizes: ['XS','S','M','L','XL'],
    description: 'Conjunto casual de dos piezas pensado para la mujer urbana moderna. Top crop con pantalón de tiro alto en tela suave y de fácil movimiento. Versátil: lo puedes usar en el trabajo, salidas casuales o reuniones informales.',
    material: '70% Algodón · 30% Modal',
    care: 'Lavar en lavadora en ciclo delicado · Temperatura máx. 30°C · Tender a la sombra · Planchar a baja temperatura',
    related: [1, 6, 9],
  },
  {
    id: 4,
    name: 'Kit Accesorios Dorados',
    category: 'Unisex', sub: 'Accesorios',
    price: 32, oldPrice: null, badge: 'Top venta',
    img: aiImg('luxury+gold+jewelry+set+necklace+earrings+bracelet+elegant+dark+background+product+photography', 401),
    imgs: [
      aiImg('luxury+gold+jewelry+set+necklace+earrings+bracelet+elegant+dark+background+product+photography', 401),
      aiImg('close+up+gold+necklace+earrings+jewelry+detail+dark+background+luxury+product', 402),
      aiImg('gold+bracelet+jewelry+accessory+product+photography+dark+background+luxury+fashion', 403),
      aiImg('complete+gold+jewelry+set+flat+lay+dark+surface+luxury+accessories+fashion', 404),
    ],
    colors: [{name:'Dorado',hex:'#c9a84c'},{name:'Negro',hex:'#111111'}],
    sizes: ['Talla única'],
    description: 'Set de accesorios dorados de alto impacto visual. Incluye collar estructurado, aretes tipo aro y pulsera ajustable. Bañados en oro de 18k para mayor durabilidad y resistencia. Perfectos para elevar cualquier look al instante.',
    material: 'Aleación de zinc · Baño en oro 18k',
    care: 'Guardar en estuche · Evitar contacto con agua y perfumes · Limpiar con paño seco · No usar en piscina',
    related: [7, 12, 1],
  },
  {
    id: 5,
    name: 'Camisa Linen Executive',
    category: 'Hombre', sub: 'Camisas',
    price: 28, oldPrice: null, badge: null,
    img: aiImg('men+elegant+linen+dress+shirt+white+blue+executive+professional+fashion+clean+studio', 501),
    imgs: [
      aiImg('men+elegant+linen+dress+shirt+white+blue+executive+professional+fashion+clean+studio', 501),
      aiImg('men+linen+shirt+side+view+white+fashion+formal+editorial+clean+background', 502),
      aiImg('linen+shirt+fabric+texture+detail+close+up+white+natural+material+fashion', 503),
      aiImg('men+wearing+linen+shirt+blue+formal+office+style+editorial+photography', 504),
    ],
    colors: [{name:'Blanco',hex:'#ecf0f1'},{name:'Azul',hex:'#3498db'}],
    sizes: ['S','M','L','XL','XXL'],
    description: 'Camisa ejecutiva en lino natural de primera calidad. Corte slim fit que se adapta perfectamente al cuerpo masculino. La combinación de lino premium y confección italiana la hacen ideal tanto para entornos formales como negocios.',
    material: '100% Lino italiano',
    care: 'Lavar en lavadora a 30°C · Planchar ligeramente húmeda · Tender en percha · No usar secadora',
    related: [2, 8, 11],
  },
  {
    id: 6,
    name: 'Jumpsuit Sunset Coral',
    category: 'Mujer', sub: 'Outfits',
    price: 72, oldPrice: 95, badge: '-24%',
    img: aiImg('women+coral+orange+jumpsuit+one+piece+v+neck+fashion+photography+warm+sunset+elegant', 601),
    imgs: [
      aiImg('women+coral+orange+jumpsuit+one+piece+v+neck+fashion+photography+warm+sunset+elegant', 601),
      aiImg('women+coral+jumpsuit+side+view+fashion+editorial+warm+orange+tone+clean', 602),
      aiImg('jumpsuit+coral+fabric+texture+detail+close+up+v+neck+fashion+photography', 603),
      aiImg('women+wearing+orange+coral+jumpsuit+full+length+editorial+warm+light+fashion', 604),
    ],
    colors: [{name:'Coral',hex:'#e74c3c'},{name:'Naranja',hex:'#e67e22'}],
    sizes: ['XS','S','M','L'],
    description: 'Jumpsuit de una pieza con escote V y cintura marcada. Los tonos cálidos coral y naranja evocan los atardeceres ecuatorianos. Cierre con cremallera invisible en la espalda. Perfecto para eventos de día o tarde-noche.',
    material: '65% Poliéster · 35% Viscosa',
    care: 'Lavar a mano o ciclo delicado · Agua fría · No retorcer · Tender horizontal · Planchar del revés',
    related: [1, 3, 9],
  },
  {
    id: 7,
    name: 'Tote Bag Lumina',
    category: 'Unisex', sub: 'Bolsos',
    price: 85, oldPrice: null, badge: 'Nuevo',
    img: aiImg('luxury+vegan+leather+tote+bag+black+gold+details+fashion+accessory+product+photography', 701),
    imgs: [
      aiImg('luxury+vegan+leather+tote+bag+black+gold+details+fashion+accessory+product+photography', 701),
      aiImg('black+tote+bag+side+view+gold+handles+luxury+leather+product+dark+background', 702),
      aiImg('tote+bag+interior+detail+organizer+black+leather+fashion+accessory+close+up', 703),
      aiImg('women+holding+black+tote+bag+gold+logo+fashion+editorial+street+style', 704),
    ],
    colors: [{name:'Negro',hex:'#111111'},{name:'Dorado',hex:'#c9a84c'}],
    sizes: ['Talla única'],
    description: 'Bolso tote de cuero vegano con logo Lumina en relieve. Capacidad para laptop de 13", con compartimento interno organizador. Asas reforzadas de doble costura. El complemento perfecto para el día a día con estilo.',
    material: 'Cuero vegano de alta densidad · Forro interior en tela',
    care: 'Limpiar con paño húmedo · Guardar relleno en funda · Evitar exposición prolongada al sol · Hidratar con crema de cuero cada 3 meses',
    related: [4, 12, 3],
  },
  {
    id: 8,
    name: 'Look Editorial Noche',
    category: 'Hombre', sub: 'Formal',
    price: 150, oldPrice: null, badge: null,
    img: aiImg('men+formal+evening+slim+fit+blazer+suit+black+navy+elegant+editorial+fashion+luxury', 801),
    imgs: [
      aiImg('men+formal+evening+slim+fit+blazer+suit+black+navy+elegant+editorial+fashion+luxury', 801),
      aiImg('men+slim+fit+black+blazer+front+view+elegant+formal+fashion+clean+studio', 802),
      aiImg('black+suit+lapels+detail+close+up+satin+formal+menswear+luxury+fashion', 803),
      aiImg('man+wearing+navy+tuxedo+suit+formal+gala+editorial+full+length+elegant', 804),
    ],
    colors: [{name:'Negro',hex:'#111111'},{name:'Azul marino',hex:'#2c3e50'}],
    sizes: ['S','M','L','XL'],
    description: 'Conjunto formal de noche compuesto por blazer slim y pantalón de pinzas a juego. Corte europeo con solapas satinadas. Ideal para eventos formales, galas y cenas de negocios. El estilo que habla por ti antes de que abras la boca.',
    material: 'Blazer: 70% Lana · 30% Poliéster · Pantalón: 65% Lana · 35% Viscosa',
    care: 'Lavado en seco únicamente · Guardar en funda de tela · Descansar 24h entre usos · Cepillar con cepillo de ropa',
    related: [2, 5, 11],
  },
  {
    id: 9,
    name: 'Blusa Lumina Signature',
    category: 'Mujer', sub: 'Tops',
    price: 38, oldPrice: null, badge: 'Exclusivo',
    img: aiImg('women+elegant+signature+blouse+violet+pink+bell+sleeves+embroidery+sheer+fashion+luxury', 901),
    imgs: [
      aiImg('women+elegant+signature+blouse+violet+pink+bell+sleeves+embroidery+sheer+fashion+luxury', 901),
      aiImg('women+violet+blouse+side+view+bell+sleeves+elegant+fashion+editorial+clean', 902),
      aiImg('blouse+embroidery+detail+close+up+violet+sheer+fabric+fashion+photography', 903),
      aiImg('women+wearing+pink+blouse+bell+sleeves+fashion+editorial+soft+light+luxury', 904),
    ],
    colors: [{name:'Violeta',hex:'#9b59b6'},{name:'Rosa',hex:'#f8bbd0'}],
    sizes: ['XS','S','M','L','XL'],
    description: 'Blusa exclusiva de la línea Signature Lumina con mangas acampanadas y bordado artesanal en el pecho. Tela semitransparente en crepé de china que otorga ligereza y elegancia. Diseño único disponible en cantidades limitadas.',
    material: '100% Crepé de China',
    care: 'Lavado a mano únicamente · Agua fría con jabón suave · No centrifugar · Tender horizontal · Planchar a vapor',
    related: [1, 3, 6],
  },
  {
    id: 10,
    name: 'Set Casual Verano',
    category: 'Mujer', sub: 'Casual',
    price: 42, oldPrice: 58, badge: '-28%',
    img: aiImg('women+summer+beach+casual+matching+two+piece+set+shorts+bustier+top+coral+black+fashion', 1001),
    imgs: [
      aiImg('women+summer+beach+casual+matching+two+piece+set+shorts+bustier+top+coral+black+fashion', 1001),
      aiImg('women+coral+two+piece+set+beach+casual+front+view+summer+fashion+editorial', 1002),
      aiImg('matching+set+fabric+detail+close+up+coral+cotton+summer+fashion+photography', 1003),
      aiImg('women+wearing+casual+two+piece+shorts+top+black+summer+beach+editorial+fun', 1004),
    ],
    colors: [{name:'Coral',hex:'#e74c3c'},{name:'Negro',hex:'#111111'}],
    sizes: ['XS','S','M','L','XL'],
    description: 'Set de verano de dos piezas: short y top a juego. Tela fresca y ligera con tratamiento anti-UV. El corte favorecedor del short realza la figura y el top tipo bustier incluye soporte integrado sin necesidad de brasier.',
    material: '60% Algodón · 40% Poliamida',
    care: 'Lavar en lavadora a 30°C · No usar blanqueador · Tender a la sombra · No planchar el estampado',
    related: [3, 6, 1],
  },
  {
    id: 11,
    name: 'Jean Slim Vintage',
    category: 'Hombre', sub: 'Pantalones',
    price: 45, oldPrice: 58, badge: '-22%',
    img: aiImg('men+slim+vintage+denim+jeans+blue+gray+distressed+washed+casual+street+fashion', 1101),
    imgs: [
      aiImg('men+slim+vintage+denim+jeans+blue+gray+distressed+washed+casual+street+fashion', 1101),
      aiImg('men+vintage+jeans+side+view+slim+fit+blue+denim+street+style+editorial', 1102),
      aiImg('denim+jeans+texture+close+up+distressed+vintage+blue+gray+fashion+detail', 1103),
      aiImg('men+wearing+slim+jeans+vintage+wash+casual+urban+street+photography+editorial', 1104),
    ],
    colors: [{name:'Azul vintage',hex:'#1a5276'},{name:'Gris medio',hex:'#5d6d7e'}],
    sizes: ['28','30','32','34','36','38'],
    description: 'Jean de corte slim con efecto vintage desgastado a mano. Denim de alta calidad con 2% elastano para máxima comodidad y libertad de movimiento. El básico masculino que no puede faltar en ningún guardarropa moderno.',
    material: '98% Algodón · 2% Elastano · Denim 12 oz',
    care: 'Lavar del revés a 30°C · No usar secadora la primera vez · Tender boca abajo · Planchar del revés a temperatura media',
    related: [2, 5, 8],
  },
  {
    id: 12,
    name: 'Bolso Flame Edition',
    category: 'Unisex', sub: 'Bolsos',
    price: 98, oldPrice: null, badge: 'Nuevo',
    img: aiImg('luxury+leather+crossbody+bag+geometric+design+black+gold+chain+limited+edition+fashion', 1201),
    imgs: [
      aiImg('luxury+leather+crossbody+bag+geometric+design+black+gold+chain+limited+edition+fashion', 1201),
      aiImg('black+crossbody+bag+gold+chain+side+view+luxury+leather+fashion+dark+background', 1202),
      aiImg('crossbody+bag+geometric+pattern+detail+close+up+black+leather+gold+hardware', 1203),
      aiImg('women+holding+black+crossbody+bag+gold+chain+fashion+editorial+luxury+night', 1204),
    ],
    colors: [{name:'Negro',hex:'#111111'},{name:'Dorado',hex:'#c9a84c'}],
    sizes: ['Talla única'],
    description: 'Bolso crossbody edición especial Flame con diseño geométrico en relieve. Cadena dorada ajustable de triple eslabón. Cierre magnético seguro con forro interior en ante sintético. Piezas numeradas, disponibilidad muy limitada.',
    material: 'Cuero genuino vacuno · Forro en ante sintético · Cadena en zinc dorado',
    care: 'Limpiar con crema de cuero · Guardar relleno con papel de seda · Evitar rozaduras · No mojar',
    related: [4, 7, 9],
  },
  {
    id: 13,
    name: 'Polo Piqué Premium',
    category: 'Hombre', sub: 'Casual',
    price: 20, oldPrice: null, badge: 'Nuevo',
    img: aiImg('classic+premium+pique+polo+shirt+men+white+navy+black+embroidered+chest+clean+background', 1301),
    imgs: [
      aiImg('classic+premium+pique+polo+shirt+men+white+navy+black+embroidered+chest+clean+background', 1301),
      aiImg('men+polo+shirt+white+side+view+classic+clean+studio+fashion+editorial', 1302),
      aiImg('polo+shirt+pique+fabric+texture+collar+detail+close+up+white+fashion', 1303),
      aiImg('men+wearing+navy+polo+shirt+smart+casual+editorial+clean+background+fashion', 1304),
    ],
    colors: [{name:'Blanco',hex:'#ecf0f1'},{name:'Negro',hex:'#111111'},{name:'Azul marino',hex:'#2c3e50'}],
    sizes: ['S','M','L','XL','XXL'],
    description: 'Polo de piqué premium con bordado Lumina en el pecho. Tejido de algodón peinado de alta densidad con tratamiento anti-manchas y anti-arrugas. Ideal para uso casual o eventos semi-formales. El clásico reinventado con sello Lumina.',
    material: '100% Algodón peinado piqué',
    care: 'Lavar en lavadora a 30°C · No usar blanqueador · Tender a la sombra · Planchar a temperatura media',
    related: [2, 5, 8],
  },
  {
    id: 14,
    name: 'Gafas Lumina Signature',
    category: 'Unisex', sub: 'Accesorios',
    price: 55, oldPrice: null, badge: 'Exclusivo',
    img: aiImg('luxury+fashion+sunglasses+black+gold+tortoise+shell+frames+uv400+product+dark+background', 1401),
    imgs: [
      aiImg('luxury+fashion+sunglasses+black+gold+tortoise+shell+frames+uv400+product+dark+background', 1401),
      aiImg('sunglasses+black+gold+frames+side+view+product+photography+dark+background+luxury', 1402),
      aiImg('sunglasses+lens+detail+close+up+tortoise+shell+gold+frames+fashion+accessory', 1403),
      aiImg('woman+wearing+luxury+black+sunglasses+gold+frames+fashion+editorial+elegant', 1404),
    ],
    colors: [{name:'Negro',hex:'#111111'},{name:'Dorado',hex:'#c9a84c'},{name:'Carey',hex:'#8B4513'}],
    sizes: ['Talla única'],
    description: 'Gafas de sol de la línea Signature Lumina con protección UV400. Montura acetato de primera calidad con bisagras de metal reforzado. Lentes polarizadas que reducen el deslumbramiento y protegen la vista. Incluyen estuche rígido y paño de limpieza.',
    material: 'Montura acetato · Lentes CR-39 polarizadas · Bisagras acero inoxidable',
    care: 'Limpiar con paño suave y seco · Guardar en estuche · No dejar en superficies calientes · Evitar contacto con químicos',
    related: [4, 7, 12],
  },
  {
    id: 15,
    name: 'Mochila Urban Pro',
    category: 'Unisex', sub: 'Mochilas',
    price: 78, oldPrice: 99, badge: '-21%',
    img: aiImg('modern+urban+laptop+backpack+bag+black+graphite+usb+port+street+fashion+product+photography', 1501),
    imgs: [
      aiImg('modern+urban+laptop+backpack+bag+black+graphite+usb+port+street+fashion+product+photography', 1501),
      aiImg('black+backpack+side+view+urban+laptop+bag+graphite+clean+product+photography', 1502),
      aiImg('backpack+interior+laptop+compartment+detail+black+organized+pockets+fashion', 1503),
      aiImg('person+wearing+black+urban+backpack+street+style+editorial+city+fashion', 1504),
    ],
    colors: [{name:'Negro',hex:'#111111'},{name:'Gris grafito',hex:'#5d6d7e'}],
    sizes: ['Talla única'],
    description: 'Mochila urbana de uso diario con compartimento acolchado para laptop de hasta 15.6". Puerto USB externo integrado para cargar tu dispositivo en movimiento. Correas ergonómicas con espaldar ventilado. Materiales resistentes al agua.',
    material: 'Nylon 1000D resistente al agua · Forro interior Oxford · Cierres YKK',
    care: 'Limpiar con paño húmedo · No lavar en lavadora · Secar a la sombra · Guardar sin contenido en lugar seco',
    related: [7, 4, 12],
  },
];

// ── DATOS EXTENDIDOS: ratings, stock, reseñas, entrega ──
const LUMINA_EXTENDED = {
  1: { stock: 4,  rating: 4.8, reviewCount: 47, deliveryDays: '2-3',
       reviews: [
         { name: 'Camila R.',   rating: 5, date: '12 may 2025', verified: true,  comment: 'Increíble calidad, el corte es perfecto y la tela se siente premium. Me llegó en 2 días a Guayaquil.' },
         { name: 'Valentina M.',rating: 5, date: '3 may 2025',  verified: true,  comment: 'El vestido es exactamente como en las fotos. Los colores son vibrantes y el material muy cómodo.' },
         { name: 'Sofía G.',    rating: 4, date: '28 abr 2025', verified: false, comment: 'Muy bonito aunque talla un poco grande. Recomiendo pedir una talla menos. El empaque fue muy bonito.' },
       ]},
  2: { stock: 7,  rating: 4.6, reviewCount: 32, deliveryDays: '2-4',
       reviews: [
         { name: 'Diego P.',    rating: 5, date: '18 may 2026', verified: true,  comment: 'Abrigo de excelente calidad. El oversize queda perfecto y la lana es muy cálida sin ser pesada.' },
         { name: 'Mateo L.',    rating: 4, date: '10 may 2026', verified: true,  comment: 'Muy elegante, el azul oscuro es un tono precioso. Tardó 3 días en llegar pero valió la espera.' },
         { name: 'Andrés V.',   rating: 5, date: '2 may 2025',  verified: false, comment: 'Compré para un evento y recibí muchos elogios. Definitivamente vale cada centavo.' },
       ]},
  3: { stock: 12, rating: 4.5, reviewCount: 28, deliveryDays: '2-3',
       reviews: [
         { name: 'Paula N.',    rating: 5, date: '15 may 2025', verified: true,  comment: 'El conjunto es perfecto para el día a día. Cómodo, versátil y muy estiloso. 100% recomendado.' },
         { name: 'Isabella F.', rating: 4, date: '8 may 2026',  verified: true,  comment: 'Muy buena calidad. El negro queda perfecto con todo. La entrega fue súper rápida.' },
       ]},
  4: { stock: 3,  rating: 4.9, reviewCount: 63, deliveryDays: '1-2',
       reviews: [
         { name: 'Luciana B.',  rating: 5, date: '20 may 2026', verified: true,  comment: 'Los accesorios son preciosos, el baño dorado se ve muy lujoso. Perfectos para regalar.' },
         { name: 'Ana C.',      rating: 5, date: '14 may 2026', verified: true,  comment: 'Calidad increíble por el precio. El collar estructurado es mi favorito, llevo semanas usándolo.' },
         { name: 'Daniela H.',  rating: 5, date: '7 may 2026',  verified: false, comment: 'Me los regalaron y quedé enamorada. El estuche de presentación es muy elegante también.' },
       ]},
  5: { stock: 15, rating: 4.4, reviewCount: 19, deliveryDays: '2-3',
       reviews: [
         { name: 'Rodrigo E.',  rating: 4, date: '11 may 2026', verified: true,  comment: 'Camisa de excelente calidad en lino, perfecta para el clima de la Costa. Corte muy bien logrado.' },
         { name: 'Sebastián T.',rating: 5, date: '5 may 2025',  verified: true,  comment: 'Muy fresca para el verano. El blanco es puro y el lino no arruga tanto como esperaba.' },
       ]},
  6: { stock: 5,  rating: 4.7, reviewCount: 41, deliveryDays: '2-3',
       reviews: [
         { name: 'Mariana Q.',  rating: 5, date: '19 may 2026', verified: true,  comment: 'El color coral es hermoso y la tela cae perfecto. Me lo puse para una boda y quedé preciosa.' },
         { name: 'Xiomara P.',  rating: 5, date: '13 may 2025', verified: true,  comment: 'Súper cómodo y elegante. El cierre de la espalda funciona muy bien y la talla es exacta.' },
         { name: 'Renata A.',   rating: 4, date: '6 may 2025',  verified: false, comment: 'Muy bonito aunque el naranja es un poco más intenso que en la foto. Igual me encantó.' },
       ]},
  7: { stock: 2,  rating: 4.8, reviewCount: 35, deliveryDays: '2-4',
       reviews: [
         { name: 'Carolina J.', rating: 5, date: '17 may 2026', verified: true,  comment: 'El bolso es espectacular, el cuero vegano tiene una textura premium. Cabe laptop de 13" perfectamente.' },
         { name: 'Mónica S.',   rating: 5, date: '9 may 2026',  verified: true,  comment: 'Compra impulsiva que no me arrepiento. Las asas son muy resistentes y el logo es elegante.' },
       ]},
  8: { stock: 6,  rating: 4.5, reviewCount: 22, deliveryDays: '2-3',
       reviews: [
         { name: 'Fabricio O.', rating: 5, date: '16 may 2025', verified: true,  comment: 'El look completo es de una calidad impresionante. Ideal para eventos formales, impecable el corte.' },
         { name: 'Javier M.',   rating: 4, date: '8 may 2026',  verified: false, comment: 'Muy buen conjunto, el blazer tiene un caído perfecto. Recomiendo tomarse las medidas antes.' },
       ]},
  9: { stock: 3,  rating: 4.9, reviewCount: 18, deliveryDays: '2-3',
       reviews: [
         { name: 'Gabriela Z.', rating: 5, date: '21 may 2026', verified: true,  comment: 'El bordado artesanal es una obra de arte. Nunca había visto algo así en e-commerce ecuatoriano.' },
         { name: 'Natalia K.',  rating: 5, date: '15 may 2025', verified: true,  comment: 'Pieza única, el crepé de china cae perfectamente. Muchos me preguntaron dónde lo compré.' },
       ]},
  10:{ stock: 8,  rating: 4.6, reviewCount: 55, deliveryDays: '2-3',
       reviews: [
         { name: 'Priscila C.', rating: 5, date: '22 may 2025', verified: true,  comment: 'El set es ideal para el verano, la tela es muy fresca y el corte favorece muchísimo.' },
         { name: 'Fernanda R.', rating: 4, date: '16 may 2025', verified: true,  comment: 'Muy buen precio por la calidad. El rojo coral es precioso, llegó en excelentes condiciones.' },
         { name: 'Valeria N.',  rating: 5, date: '10 may 2026', verified: false, comment: 'Compré para la playa y fue un éxito total. El top con soporte integrado es muy cómodo.' },
       ]},
  11:{ stock: 9,  rating: 4.4, reviewCount: 44, deliveryDays: '2-4',
       reviews: [
         { name: 'Emilio T.',   rating: 4, date: '14 may 2026', verified: true,  comment: 'Jean de muy buena calidad, el efecto vintage se ve natural y el elastano le da mucha comodidad.' },
         { name: 'Cristian V.', rating: 5, date: '7 may 2026',  verified: true,  comment: 'El mejor jean que he comprado por internet. El corte slim es perfecto, no aprieta las piernas.' },
       ]},
  12:{ stock: 2,  rating: 4.8, reviewCount: 29, deliveryDays: '2-4',
       reviews: [
         { name: 'Alessandra P.',rating: 5, date: '23 may 2025', verified: true,  comment: 'Edición especial que vale la pena. El diseño geométrico es único y la cadena dorada es preciosa.' },
         { name: 'Renata V.',   rating: 5, date: '17 may 2026', verified: true,  comment: 'Bolso de piezas numeradas, llegó con certificado. El cuero genuino es de primera calidad.' },
       ]},
  13:{ stock: 15, rating: 4.7, reviewCount: 19, deliveryDays: '2-3',
       reviews: [
         { name: 'Rafael M.',   rating: 5, date: '15 jun 2026', verified: true,  comment: 'Calidad excelente, el tejido piqué es muy fino y el bordado está perfecto. Compré en negro y blanco.' },
         { name: 'Tomás P.',    rating: 4, date: '10 jun 2026', verified: true,  comment: 'Muy cómodo y fresco para el clima de Ecuador. El ajuste queda muy bien.' },
       ]},
  14:{ stock: 8,  rating: 4.9, reviewCount: 12, deliveryDays: '2-3',
       reviews: [
         { name: 'Andrea L.',   rating: 5, date: '18 jun 2026', verified: true,  comment: 'Las gafas son espectaculares, el estuche incluido es de primera calidad. Las lentes polarizadas son increíbles.' },
         { name: 'Marco A.',    rating: 5, date: '12 jun 2026', verified: true,  comment: 'Diseño muy elegante y cómodo. Protección UV excelente para la playa y la ciudad.' },
       ]},
  15:{ stock: 6,  rating: 4.6, reviewCount: 24, deliveryDays: '2-4',
       reviews: [
         { name: 'Karla R.',    rating: 5, date: '16 jun 2026', verified: true,  comment: 'La mochila es perfecta para la universidad. El puerto USB es muy práctico y el compartimento para laptop está bien acolchado.' },
         { name: 'Nicolás F.', rating: 4, date: '8 jun 2026',  verified: true,  comment: 'Muy resistente y espaciosa. Le cabe todo. El material repele muy bien el agua.' },
       ]},
};

LUMINA_PRODUCTS.forEach(p => Object.assign(p, LUMINA_EXTENDED[p.id] || {}));

function formatSku(id) {
  return 'LCS-' + String(id).padStart(3, '0');
}

function getProduct(id) {
  return LUMINA_PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

function getRelated(ids) {
  return ids.map(id => getProduct(id)).filter(Boolean);
}

function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const s = (type) => `<svg width="13" height="13" viewBox="0 0 24 24" fill="${type==='e'?'none':'#C4FF00'}" stroke="#C4FF00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${type==='h'?'<defs><linearGradient id="hg"><stop offset="50%" stop-color="#C4FF00"/><stop offset="50%" stop-color="none"/></linearGradient></defs>':''}<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" ${type==='h'?'fill="url(#hg)"':''}/></svg>`;
  return `${'<svg width="13" height="13" viewBox="0 0 24 24" fill="#C4FF00" stroke="#C4FF00" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'.repeat(full)}${half?'<svg width="13" height="13" viewBox="0 0 24 24" stroke="#C4FF00" stroke-width="1.5"><defs><linearGradient id="hg'+rating+'"><stop offset="50%" stop-color="#C4FF00"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#hg'+rating+')"/></svg>':''}${'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C4FF00" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'.repeat(empty)}`;
}

function stockBadgeHTML(stock) {
  if (stock <= 3) return `<span class="stock-urgent">Solo ${stock} disponibles</span>`;
  if (stock <= 8) return `<span class="stock-low">Pocas unidades</span>`;
  return '';
}

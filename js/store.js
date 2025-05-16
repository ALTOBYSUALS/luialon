// Datos de productos (simulando una base de datos o API)
const products = [
  // Colección Wesen (Ethereal Visions - Impresionismo Digital)
  {
    id: 1,
    title: "Wesen N.32",
    description: "Una pieza impresionista digital que captura la esencia del movimiento a través de pinceladas vibrantes. Originalmente creado con pluma, tinta y acrílico sobre papel.",
    price: 350.00,
    dimensions: "21 cm x 29 cm",
    materials: "Pluma, Tinta y Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/WhatsApp-Image-2025-02-11-at-14.10.19-3.jpeg",
    collection: "Ethereal Visions - Impresionismo Digital",
    sku: "LUI-EV-001",
    stock: 1,
    availableForSale: true,
    tags: ["wesen", "impresionismo", "acrílico"]
  },
  {
    id: 2,
    title: "Wesen N.67",
    description: "Expresión de color y forma que evoca emociones profundas mediante técnicas de pintura digital avanzadas, basada en un original de pluma, tinta y acrílico.",
    price: 380.00,
    dimensions: "29 cm x 21 cm",
    materials: "Pluma, Tinta y Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/WhatsApp-Image-2025-02-11-at-14.10.19.jpeg",
    collection: "Ethereal Visions - Impresionismo Digital",
    sku: "LUI-EV-002",
    stock: 1,
    availableForSale: true,
    tags: ["wesen", "colorido", "digital"]
  },
  {
    id: 3,
    title: "Wesen N.60",
    description: "Composición abstracta que juega con la percepción del espacio y la realidad a través del color, inspirada en una obra de pluma, tinta y acrílico.",
    price: 420.00,
    dimensions: "21 cm x 29 cm",
    materials: "Pluma, Tinta y Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/WhatsApp-Image-2025-02-11-at-14.10.19-5.jpeg",
    collection: "Ethereal Visions - Impresionismo Digital",
    sku: "LUI-EV-003",
    stock: 1,
    availableForSale: true,
    tags: ["wesen", "abstracto", "papel"]
  },
  {
    id: 4,
    title: "Wesen N.98",
    description: "Un estudio de luz y sombra que desafía las convenciones artísticas tradicionales, transformado digitalmente desde un original en acrílico sobre cartón.",
    price: 780.00,
    dimensions: "50 cm x 65 cm",
    materials: "Pluma, Tinta y Acrílico sobre Cartón",
    year: 2022,
    imageUrl: "images/WhatsApp-Image-2025-02-11-at-14.10.19-2.jpeg",
    collection: "Ethereal Visions - Impresionismo Digital",
    sku: "LUI-EV-004",
    stock: 1,
    availableForSale: true,
    tags: ["wesen", "luz y sombra", "cartón"]
  },
  {
    id: 5,
    title: "Wesen N.41",
    description: "Exploración de texturas y patrones inspirados en la naturaleza y transformados digitalmente, partiendo de una base de pluma, tinta y acrílico.",
    price: 370.00,
    dimensions: "21 cm x 29 cm",
    materials: "Pluma, Tinta y Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/WhatsApp-Image-2025-02-11-at-14.10.19-1.jpeg",
    collection: "Ethereal Visions - Impresionismo Digital",
    sku: "LUI-EV-005",
    stock: 1,
    availableForSale: true,
    tags: ["wesen", "texturas", "naturaleza"]
  },
  {
    id: 6,
    title: "Wesen N.58",
    description: "Fusión de técnicas clásicas y digitales que crea una experiencia visual única y envolvente. Original en pluma, tinta y acrílico.",
    price: 390.00,
    dimensions: "29 cm x 21 cm",
    materials: "Pluma, Tinta y Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/WhatsApp-Image-2025-02-11-at-14.10.19-4.jpeg",
    collection: "Ethereal Visions - Impresionismo Digital",
    sku: "LUI-EV-006",
    stock: 1,
    availableForSale: true,
    tags: ["wesen", "fusión", "clásico-digital"]
  },
  {
    id: 7,
    title: "Wesen N.94",
    description: "Obra creada en el límite entre la figuración y la abstracción, con trazos expresivos que dinamizan la composición y generan un diálogo visual intrigante.",
    price: 450.00,
    dimensions: "30 cm x 40 cm",
    materials: "Pluma, Tinta y Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/Wesen-N.94_1Wesen-N.94.webp",
    collection: "Ethereal Visions - Impresionismo Digital",
    sku: "LUI-EV-007",
    stock: 1,
    availableForSale: true,
    tags: ["wesen", "abstracción", "figuración"]
  },
  
  // Colección Köpfe (Retratos Expresionistas)
  {
    id: 8,
    title: "Kopf N.B01",
    description: "Retrato expresionista que revela las complejidades emocionales a través de intensas aplicaciones de color y trazos decididos, reflejando estados psicológicos profundos.",
    price: 680.00,
    dimensions: "65 cm x 50 cm",
    materials: "Acrílico sobre Papel",
    year: 2023,
    imageUrl: "images/Kopf-N.B01_1Kopf-N.B01.webp",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-001",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "retrato", "expresionismo"]
  },
  {
    id: 9,
    title: "Kopf N.B03",
    description: "Exploración profunda de la condición humana a través de un tratamiento audaz del color y la forma, desafiando las percepciones convencionales del retrato.",
    price: 680.00,
    dimensions: "65 cm x 50 cm",
    materials: "Acrílico sobre Papel",
    year: 2023,
    imageUrl: "images/2_Kopf-N.B03.jpg",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-002",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "retrato", "psicológico"]
  },
  {
    id: 10,
    title: "Kopf N.B07",
    description: "Una mirada introspectiva a las emociones humanas, donde las distorsiones formales y cromáticas reflejan la complejidad psicológica del sujeto representado.",
    price: 680.00,
    dimensions: "65 cm x 50 cm",
    materials: "Acrílico sobre Papel",
    year: 2023,
    imageUrl: "images/3_Kopf-N.B07.jpg",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-003",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "retrato", "distorsión"]
  },
  {
    id: 11,
    title: "Kopf N.B04",
    description: "Retrato que explora las dimensiones internas del ser humano, utilizando pinceladas enérgicas y una paleta cromática vibrante para transmitir intensidad emocional.",
    price: 680.00,
    dimensions: "65 cm x 50 cm",
    materials: "Acrílico sobre Papel",
    year: 2023,
    imageUrl: "images/4_Kopf-N.B04.jpg",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-004",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "retrato", "emociones"]
  },
  {
    id: 12,
    title: "Köpfe Composición A.1",
    description: "Primera pieza de una serie de retratos en formato pequeño que exploran la fragmentación de la identidad y las múltiples facetas de la expresión emocional.",
    price: 280.00,
    dimensions: "23 cm x 30 cm",
    materials: "Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/Kopfe_A_53Kopfe_A_1.webp",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-005",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "serie", "fragmentación"]
  },
  {
    id: 13,
    title: "Köpfe Composición A.2",
    description: "Segundo elemento de la serie de retratos que profundiza en la descomposición de la forma facial para revelar aspectos ocultos de la psique humana.",
    price: 280.00,
    dimensions: "23 cm x 30 cm",
    materials: "Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/Kopfe_A_37Kopfe_A_2.webp",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-006",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "serie", "psique"]
  },
  {
    id: 14,
    title: "Köpfe Composición A.5",
    description: "Parte de la serie Köpfe A, esta pieza utiliza gestos pictóricos audaces para transmitir estados emocionales extremos, desde la angustia hasta la reflexión introspectiva.",
    price: 280.00,
    dimensions: "23 cm x 30 cm",
    materials: "Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/Kopfe_A_32Kopfe_A_5.webp",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-007",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "serie", "emociones extremas"]
  },
  {
    id: 15,
    title: "Köpfe Composición A.8",
    description: "Representación expresionista que explora la disolución de la identidad individual en favor de una expresión más universal del sufrimiento y la experiencia humana.",
    price: 280.00,
    dimensions: "23 cm x 30 cm",
    materials: "Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/Kopfe_A_60Kopfe_A_8.webp",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-008",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "serie", "identidad"]
  },
  {
    id: 16,
    title: "Köpfe Composición A.10",
    description: "Obra que utiliza la representación facial como vehículo para explorar temas de alienación, trauma y resistencia humana frente a las adversidades.",
    price: 280.00,
    dimensions: "23 cm x 30 cm",
    materials: "Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/Kopfe_A_31Kopfe_A_10.webp",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-009",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "serie", "trauma"]
  },
  {
    id: 17,
    title: "Köpfe Composición A.15",
    description: "Pieza que confronta al espectador con una intensa expresión de vulnerabilidad humana, utilizando distorsiones formales para transmitir estados emocionales complejos.",
    price: 280.00,
    dimensions: "23 cm x 30 cm",
    materials: "Acrílico sobre Papel",
    year: 2022,
    imageUrl: "images/Kopfe_A_52Kopfe_A_15.webp",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-010",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "serie", "vulnerabilidad"]
  },
  {
    id: 18,
    title: "Köpfe Serie Completa",
    description: "Colección completa de 30 retratos expresionistas que exploran la condición humana, las emociones y estados psicológicos a través de una poderosa expresión visual.",
    price: 5800.00,
    dimensions: "50-53 cm x 37-53 cm (conjunto)",
    materials: "Acrílico sobre Papel de Embalaje/Papel",
    year: "2022-2023",
    imageUrl: "images/Gitterkopfe.png",
    collection: "Köpfe - Retratos Expresionistas",
    sku: "LUI-KO-FULL",
    stock: 1,
    availableForSale: true,
    tags: ["köpfe", "colección completa", "serie limitada"]
  }
];

// Función para renderizar los productos en la página
function renderProducts() {
  const productsContainer = document.getElementById('products-container');
  
  if (!productsContainer) {
    console.error('No se encontró el contenedor de productos');
    return;
  }
  
  // Limpiar el contenedor
  productsContainer.innerHTML = '';
  
  // Crear y añadir cada producto
  products.forEach(product => {
    if (!product.availableForSale) return; // No mostrar si no está a la venta

    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <a href="product-details.html?id=${product.id}" class="product-image-link">
        <img src="${product.imageUrl}" alt="${product.title}" class="product-image">
      </a>
      <div class="product-info">
        <a href="product-details.html?id=${product.id}" class="product-title-link">
          <h3 class="product-title">${product.title}</h3>
        </a>
        <p class="product-collection">${product.collection}</p>
        <p class="product-description">${product.description.substring(0, 80)}...</p>
        <div class="product-dimensions">${product.dimensions}</div>
        <div class="product-price">€${product.price.toFixed(2)}</div>
        <button class="add-to-cart-btn" data-product-id="${product.id}">Añadir al Carrito</button>
      </div>
    `;
    
    productsContainer.appendChild(productCard);
  });
  
  // Añadir event listeners a los botones de "Añadir al Carrito"
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToCart(productId);
    });
  });
}

// Función para obtener un producto por su ID
function getProductById(productId) {
  return products.find(product => product.id === productId);
}

// Cuando el DOM esté cargado, renderizar los productos
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('products-container')) { // Asegurarse que solo se ejecute en la página de tienda
    renderProducts();
  }
  updateCartCount(); // Actualizar contador en todas las páginas
}); 
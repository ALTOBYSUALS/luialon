// 🎨 SISTEMA DIRECTO PARA REEMPLAZAR IMÁGENES CON PRODUCTOS DE LA TIENDA 🎨
console.log('✅ home-dynamic.js cargado correctamente');

// 🎯 FUNCIÓN PRINCIPAL SIMPLIFICADA
function replaceWithStoreImages() {
  console.log('🔄 Iniciando reemplazo directo con imágenes de la tienda...');
  
  // Verificar si los productos están disponibles
  if (typeof products === 'undefined' || !products || products.length === 0) {
    console.warn('⚠️ Productos no disponibles, reintentando en 500ms...');
    setTimeout(replaceWithStoreImages, 500);
    return;
  }
  
  console.log(`🛒 Productos encontrados: ${products.length}`);
  
  // Seleccionar productos aleatorios
  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
  const selectedProducts = shuffledProducts.slice(0, 18);
  
  console.log('🎲 Productos seleccionados:', selectedProducts.map(p => p.title));
  
  // Mapear todas las imágenes del showcase
  const showcaseSelectors = [
    // Desktop
    '.img__showcase_1', '.img__showcase_2', '.img__showcase_3',
    '.img__showcase_4', '.img__showcase_5', '.img__showcase_6',
    // Tablet
    '.img__showcase_1_t', '.img__showcase_2_t', '.img__showcase_3_t',
    '.img__showcase_4_t', '.img__showcase_5_t', '.img__showcase_6_t',
    // Mobile
    '.img__showcase_1_m', '.img__showcase_2_m', '.img__showcase_3_m',
    '.img__showcase_4_m', '.img__showcase_5_m', '.img__showcase_6_m'
  ];
  
  // Reemplazar cada imagen
  showcaseSelectors.forEach((selector, index) => {
    const imageElement = document.querySelector(selector);
    
    if (!imageElement) {
      console.warn(`⚠️ Elemento no encontrado: ${selector}`);
      return;
    }
    
    // Usar producto cíclico
    const productIndex = index % selectedProducts.length;
    const product = selectedProducts[productIndex];
    
    console.log(`🖼️ Reemplazando ${selector} con ${product.title}`);
    
    // Reemplazar inmediatamente
    imageElement.src = product.imageUrl;
    imageElement.srcset = product.imageUrl;
    imageElement.alt = `${product.title} - ${product.collection}`;
    
    // Agregar datos para navegación
    imageElement.dataset.productId = product.id;
    imageElement.dataset.productTitle = product.title;
    imageElement.dataset.storeImage = 'true';
    
    // Agregar evento de click para ir a detalles del producto
    imageElement.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`🎯 Click en producto: ${product.title} (ID: ${product.id})`);
      window.location.href = `product-details.html?id=${product.id}`;
    });
    
    // Efectos hover
    imageElement.addEventListener('mouseenter', () => {
      imageElement.style.transform = 'scale(1.05)';
      imageElement.style.transition = 'transform 0.3s ease';
      imageElement.style.zIndex = '10';
    });
    
    imageElement.addEventListener('mouseleave', () => {
      imageElement.style.transform = 'scale(1)';
      imageElement.style.zIndex = '1';
    });
    
    console.log(`✅ ${selector} -> ${product.title} (${product.imageUrl})`);
  });
  
  console.log('🎉 Reemplazo de imágenes completado exitosamente!');
}

// 🔍 FUNCIÓN DE DEBUG
function debugImageStatus() {
  console.log('\n🔍 === ESTADO DE LAS IMÁGENES ===');
  
  const allImages = document.querySelectorAll('[class*="img__showcase"]');
  console.log(`📊 Total de imágenes encontradas: ${allImages.length}`);
  
  allImages.forEach((img, index) => {
    const isFromStore = img.dataset.storeImage === 'true';
    const productId = img.dataset.productId;
    const isLocal = img.src.includes('images/');
    const isCloudflare = img.src.includes('pub-acb752a1176b4e8d82e52d357e330c9f.r2.dev');
    
    console.log(`  ${index + 1}. ${img.className}:`);
    console.log(`     - Origen: ${isFromStore ? '✅ TIENDA' : '❌ LOCAL'}`);
    console.log(`     - Producto ID: ${productId || 'N/A'}`);
    console.log(`     - URL: ${isLocal ? '❌ LOCAL' : isCloudflare ? '✅ CLOUDFLARE' : '❓ OTRO'}`);
    console.log(`     - Src: ${img.src.substring(0, 80)}...`);
  });
  
  console.log('\n📦 Productos disponibles:', typeof products !== 'undefined' ? products.length : 'NO DISPONIBLES');
}

// 🚀 INICIALIZACIÓN MÚLTIPLE PARA ASEGURAR EJECUCIÓN
console.log('🎬 Configurando inicialización del sistema...');

// Método 1: DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM cargado, iniciando reemplazo...');
  setTimeout(replaceWithStoreImages, 100);
});

// Método 2: Window load
window.addEventListener('load', () => {
  console.log('🌐 Window cargado, iniciando reemplazo...');
  setTimeout(replaceWithStoreImages, 200);
});

// Método 3: Ejecución inmediata si DOM ya está listo
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  console.log('⚡ DOM ya listo, ejecutando inmediatamente...');
  setTimeout(replaceWithStoreImages, 50);
}

// Método 4: Reintento cada 2 segundos hasta que funcione
let retryCount = 0;
const maxRetries = 10;

function retryReplacement() {
  retryCount++;
  console.log(`🔄 Intento ${retryCount}/${maxRetries} de reemplazo de imágenes...`);
  
  const hasStoreImages = document.querySelectorAll('[data-store-image="true"]').length > 0;
  
  if (hasStoreImages) {
    console.log('✅ Imágenes de la tienda ya cargadas, deteniendo reintentos');
    return;
  }
  
  if (retryCount < maxRetries) {
    replaceWithStoreImages();
    setTimeout(retryReplacement, 2000);
  } else {
    console.warn('⚠️ Máximo de reintentos alcanzado');
  }
}

// Iniciar reintentos después de 1 segundo
setTimeout(retryReplacement, 1000);

// 🔧 FUNCIONES GLOBALES PARA DEBUG
window.forceReplaceImages = replaceWithStoreImages;
window.debugImages = debugImageStatus;

console.log('🎯 Sistema de reemplazo de imágenes configurado');
console.log('💡 Funciones disponibles en consola:');
console.log('   - window.forceReplaceImages() - Forzar reemplazo');
console.log('   - window.debugImages() - Ver estado actual'); 
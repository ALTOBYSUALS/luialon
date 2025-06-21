// 🎨 SISTEMA DINÁMICO PARA PÁGINA PRINCIPAL CON IMÁGENES DE LA TIENDA 🎨
// Sistema que reemplaza imágenes del showcase con las mismas de la tienda

console.log('✅ home-dynamic.js cargado correctamente');

// 🎯 VARIABLES GLOBALES
let storeProducts = [];
let selectedImages = [];

// 🔄 FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
async function initializeCloudflareShowcase() {
  try {
    console.log('📦 Cargando productos de la tienda...');
    
    // Verificar si los productos ya están disponibles globalmente
    if (typeof products !== 'undefined') {
      storeProducts = products;
      console.log(`🛒 Productos cargados desde variable global: ${storeProducts.length}`);
    } else {
      // Cargar store.js dinámicamente si no está disponible
      console.log('📥 Cargando store.js dinámicamente...');
      await loadStoreScript();
    }
    
    if (storeProducts.length === 0) {
      console.warn('⚠️ No se encontraron productos de la tienda');
      return;
    }
    
    console.log(`🖼️ Total de productos disponibles: ${storeProducts.length}`);
    
    // Mostrar algunos productos de ejemplo
    const sampleProducts = storeProducts.slice(0, 5);
    console.log('📸 Productos de ejemplo:', sampleProducts.map(p => ({
      id: p.id,
      title: p.title,
      imageUrl: p.imageUrl
    })));
    
    // Seleccionar 18 imágenes aleatorias de los productos
    selectedImages = selectRandomProducts(storeProducts, 18);
    console.log('🎲 Productos seleccionados:', selectedImages.map(p => p.title));
    
    // Reemplazar imágenes en el DOM
    await replaceShowcaseImages();
    
    // Configurar navegación
    setupImageNavigation();
    
    console.log('✅ Sistema de showcase con productos de la tienda inicializado correctamente');
    
  } catch (error) {
    console.error('❌ Error al inicializar el showcase:', error);
    console.log('🔄 Manteniendo imágenes locales como fallback');
  }
}

// 📥 FUNCIÓN PARA CARGAR STORE.JS DINÁMICAMENTE
async function loadStoreScript() {
  return new Promise((resolve, reject) => {
    // Verificar si ya existe el script
    if (document.querySelector('script[src*="store.js"]')) {
      // Si ya existe, esperar un poco para que se cargue
      setTimeout(() => {
        if (typeof products !== 'undefined') {
          storeProducts = products;
          resolve();
        } else {
          reject(new Error('Products no disponible después de cargar store.js'));
        }
      }, 100);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'js/store.js';
    script.onload = () => {
      // Esperar un poco para que las variables se inicialicen
      setTimeout(() => {
        if (typeof products !== 'undefined') {
          storeProducts = products;
          console.log(`📦 Store.js cargado dinámicamente: ${storeProducts.length} productos`);
          resolve();
        } else {
          reject(new Error('Products no disponible después de cargar store.js'));
        }
      }, 100);
    };
    script.onerror = () => {
      reject(new Error('Error cargando store.js'));
    };
    document.head.appendChild(script);
  });
}

// 🎲 FUNCIÓN PARA SELECCIONAR PRODUCTOS ALEATORIOS
function selectRandomProducts(products, count) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 🖼️ FUNCIÓN PARA REEMPLAZAR IMÁGENES EN EL DOM
async function replaceShowcaseImages() {
  console.log('🔄 Reemplazando imágenes del showcase con productos de la tienda...');
  console.log('📊 Productos seleccionados disponibles:', selectedImages.length);
  
  // Verificar que tenemos productos seleccionados
  if (selectedImages.length === 0) {
    console.error('❌ No hay productos seleccionados para reemplazar');
    return;
  }
  
  // Mapear las clases de las imágenes del showcase
  const showcaseSelectors = [
    // Desktop (6 imágenes)
    '.img__showcase_1',
    '.img__showcase_2', 
    '.img__showcase_3',
    '.img__showcase_4',
    '.img__showcase_5',
    '.img__showcase_6',
    // Tablet (6 imágenes)
    '.img__showcase_1_t',
    '.img__showcase_2_t',
    '.img__showcase_3_t', 
    '.img__showcase_4_t',
    '.img__showcase_5_t',
    '.img__showcase_6_t',
    // Mobile (6 imágenes)
    '.img__showcase_1_m',
    '.img__showcase_2_m',
    '.img__showcase_3_m',
    '.img__showcase_4_m',
    '.img__showcase_5_m',
    '.img__showcase_6_m'
  ];
  
  console.log(`🔍 Elementos a reemplazar: ${showcaseSelectors.length}`);
  
  // Reemplazar cada imagen
  for (let i = 0; i < showcaseSelectors.length; i++) {
    const selector = showcaseSelectors[i];
    const imageElement = document.querySelector(selector);
    
    console.log(`🔍 Buscando selector: ${selector}, encontrado:`, !!imageElement);
    
    if (!imageElement) {
      console.warn(`⚠️ Elemento no encontrado: ${selector}`);
      continue;
    }
    
    // Calcular qué producto usar (ciclar entre los productos seleccionados)
    const productIndex = i % selectedImages.length;
    const product = selectedImages[productIndex];
    
    console.log(`🖼️ Preparando imagen ${i}: ${selector} -> ${product.title}`);
    
    // Precargar la imagen
    const img = new Image();
    img.onload = () => {
      // Reemplazar src y srcset
      imageElement.src = product.imageUrl;
      imageElement.srcset = product.imageUrl;
      
      // Actualizar alt text
      imageElement.alt = `${product.title} - ${product.collection}`;
      
      // Agregar atributos de datos para navegación
      imageElement.dataset.cloudflareImage = 'true';
      imageElement.dataset.imageUrl = product.imageUrl;
      imageElement.dataset.imageName = product.title;
      imageElement.dataset.imageType = product.tags[0]; // primer tag
      imageElement.dataset.productId = product.id;
      
      // Añadir efecto de fade-in
      imageElement.style.opacity = '0';
      imageElement.style.transition = 'opacity 0.5s ease-in-out';
      setTimeout(() => {
        imageElement.style.opacity = '1';
      }, 100);
      
      console.log(`✅ Imagen reemplazada: ${selector} -> ${product.title}`);
      console.log(`   🔗 URL: ${product.imageUrl}`);
      console.log(`   📐 Elemento visible: ${imageElement.offsetWidth}x${imageElement.offsetHeight}`);
    };
    
    img.onerror = (error) => {
      console.error(`❌ Error al cargar imagen: ${product.imageUrl}`, error);
    };
    
    img.src = product.imageUrl;
  }
}

// 🧭 FUNCIÓN PARA CONFIGURAR NAVEGACIÓN DE IMÁGENES
function setupImageNavigation() {
  console.log('🧭 Configurando navegación de imágenes...');
  
  // Seleccionar todas las imágenes del showcase
  const showcaseImages = document.querySelectorAll('[class*="img__showcase"]');
  
  console.log(`🎯 Configurando navegación para ${showcaseImages.length} imágenes`);
  
  showcaseImages.forEach((img, index) => {
    // Remover event listeners existentes
    const newImg = img.cloneNode(true);
    img.parentNode.replaceChild(newImg, img);
    
    // Agregar nuevo event listener
    newImg.addEventListener('click', (e) => {
      e.preventDefault();
      
      const productId = newImg.dataset.productId;
      const imageName = newImg.dataset.imageName;
      const imageType = newImg.dataset.imageType;
      
      console.log(`🎯 Click en imagen: ${imageName} (${imageType}) - Producto ID: ${productId}`);
      
      // Navegar a la tienda o a los detalles del producto
      if (productId) {
        window.location.href = `product-details.html?id=${productId}`;
      } else if (imageType === 'köpfe' || imageType === 'kopfe') {
        window.location.href = 'de/gallery-kopfe.html';
      } else if (imageType === 'wesen') {
        window.location.href = 'de/gallery-wesen.html';
      } else {
        // Fallback a la tienda
        window.location.href = 'store.html';
      }
    });
    
    // Agregar efectos hover mejorados
    newImg.addEventListener('mouseenter', () => {
      newImg.style.transform = 'scale(1.05)';
      newImg.style.transition = 'transform 0.3s ease';
      newImg.style.zIndex = '10';
    });
    
    newImg.addEventListener('mouseleave', () => {
      newImg.style.transform = 'scale(1)';
      newImg.style.zIndex = '1';
    });
  });
}

// 🚀 FUNCIÓN DE DEBUG PARA VERIFICAR EL ESTADO
function debugShowcaseState() {
  console.log('🔍 ESTADO DEL SHOWCASE:');
  console.log('- Productos de la tienda cargados:', storeProducts.length);
  console.log('- Productos seleccionados:', selectedImages.length);
  console.log('- Elementos del showcase encontrados:', document.querySelectorAll('[class*="img__showcase"]').length);
  
  // Mostrar información de cada imagen
  document.querySelectorAll('[class*="img__showcase"]').forEach((img, index) => {
    const isFromStore = img.dataset.cloudflareImage === 'true';
    const productId = img.dataset.productId;
    console.log(`  ${index + 1}. ${img.className}: ${isFromStore ? '✅ Tienda' : '❌ Local'} - Producto ${productId} - ${img.src}`);
  });
}

// 🎬 INICIALIZACIÓN AUTOMÁTICA
// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco más para asegurar que store.js se cargue
    setTimeout(initializeCloudflareShowcase, 1000);
  });
} else {
  // El DOM ya está listo
  setTimeout(initializeCloudflareShowcase, 1000);
}

// También ejecutar cuando la página esté completamente cargada
window.addEventListener('load', () => {
  console.log('🌐 Página completamente cargada, verificando estado del showcase...');
  setTimeout(debugShowcaseState, 2000);
});

// Función global para debug (disponible en la consola)
window.debugShowcase = debugShowcaseState;
window.reloadShowcase = initializeCloudflareShowcase; 
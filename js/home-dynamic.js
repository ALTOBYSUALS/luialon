// 🎨 SISTEMA DINÁMICO PARA PÁGINA PRINCIPAL CON CLOUDFLARE R2 🎨
// Sistema que reemplaza imágenes del showcase con contenido aleatorio de Cloudflare

console.log('✅ home-dynamic.js cargado correctamente');

// 🌟 CONFIGURACIÓN CLOUDFLARE R2
const CLOUDFLARE_CONFIG = {
  baseUrl: 'https://pub-acb752a1176b4e8d82e52d357e330c9f.r2.dev',
  inventoryFile: '/cloudflare-fruits-inventory.json'
};

// 🎯 VARIABLES GLOBALES
let cloudflareImages = [];
let selectedImages = [];

// 🔄 FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
async function initializeCloudflareShowcase() {
  try {
    console.log('📦 Cargando inventario de Cloudflare R2...');
    console.log('📍 Ruta del archivo:', CLOUDFLARE_CONFIG.inventoryFile);
    
    // Cargar inventario
    const response = await fetch(CLOUDFLARE_CONFIG.inventoryFile);
    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const inventory = await response.json();
    console.log('📊 Inventario cargado:', inventory);
    
    // Combinar todas las imágenes disponibles
    const kopfeImages = inventory.baskets.kopfe.fruits || [];
    const wesenImages = inventory.baskets.wesen.fruits || [];
    cloudflareImages = [...kopfeImages, ...wesenImages];
    
    console.log(`🖼️ Total de imágenes disponibles: ${cloudflareImages.length}`);
    console.log('- Köpfe (retratos):', kopfeImages.length);
    console.log('- Wesen (seres):', wesenImages.length);
    
    if (cloudflareImages.length === 0) {
      console.warn('⚠️ No se encontraron imágenes en el inventario');
      return;
    }
    
    // Seleccionar 6 imágenes aleatorias
    selectedImages = selectRandomImages(cloudflareImages, 6);
    console.log('🎲 Imágenes seleccionadas:', selectedImages.map(img => img.name));
    
    // Reemplazar imágenes en el DOM
    await replaceShowcaseImages();
    
    // Configurar navegación
    setupImageNavigation();
    
    console.log('✅ Sistema de showcase con Cloudflare R2 inicializado correctamente');
    
  } catch (error) {
    console.error('❌ Error al inicializar el showcase de Cloudflare:', error);
    console.log('🔄 Manteniendo imágenes locales como fallback');
  }
}

// 🎲 FUNCIÓN PARA SELECCIONAR IMÁGENES ALEATORIAS
function selectRandomImages(images, count) {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 🖼️ FUNCIÓN PARA REEMPLAZAR IMÁGENES EN EL DOM
async function replaceShowcaseImages() {
  console.log('🔄 Reemplazando imágenes del showcase...');
  console.log('📊 Imágenes seleccionadas disponibles:', selectedImages.length);
  
  // Verificar que tenemos imágenes seleccionadas
  if (selectedImages.length === 0) {
    console.error('❌ No hay imágenes seleccionadas para reemplazar');
    return;
  }
  
  // Mapear las clases de las imágenes del showcase
  const showcaseSelectors = [
    // Desktop
    '.img__showcase_1',
    '.img__showcase_2', 
    '.img__showcase_3',
    '.img__showcase_4',
    '.img__showcase_5',
    '.img__showcase_6',
    // Tablet
    '.img__showcase_1_t',
    '.img__showcase_2_t',
    '.img__showcase_3_t', 
    '.img__showcase_4_t',
    '.img__showcase_5_t',
    '.img__showcase_6_t',
    // Mobile
    '.img__showcase_1_m',
    '.img__showcase_2_m',
    '.img__showcase_3_m',
    '.img__showcase_4_m',
    '.img__showcase_5_m',
    '.img__showcase_6_m'
  ];
  
  // Reemplazar cada imagen
  for (let i = 0; i < showcaseSelectors.length; i++) {
    const selector = showcaseSelectors[i];
    const imageElement = document.querySelector(selector);
    
    console.log(`🔍 Buscando selector: ${selector}, encontrado:`, !!imageElement);
    
    if (!imageElement) {
      console.warn(`⚠️ Elemento no encontrado: ${selector}`);
      continue;
    }
    
    if (selectedImages.length === 0) {
      console.warn(`⚠️ No hay imágenes seleccionadas disponibles`);
      continue;
    }
    
    if (imageElement && selectedImages.length > 0) {
      // Calcular qué imagen usar (ciclar entre las 6 seleccionadas)
      const imageIndex = i % selectedImages.length;
      const cloudflareImage = selectedImages[imageIndex];
      
      // Precargar la imagen
      const img = new Image();
      img.onload = () => {
        // Reemplazar src y srcset
        imageElement.src = cloudflareImage.url;
        imageElement.srcset = cloudflareImage.url;
        
        // Actualizar alt text
        imageElement.alt = `Obra de arte: ${cloudflareImage.name}`;
        
        // Agregar atributos de datos para navegación
        imageElement.dataset.cloudflareImage = 'true';
        imageElement.dataset.imageUrl = cloudflareImage.url;
        imageElement.dataset.imageName = cloudflareImage.name;
        imageElement.dataset.imageType = cloudflareImage.classification;
        
        console.log(`🖼️ Imagen reemplazada: ${selector} -> ${cloudflareImage.name}`);
        console.log(`   ✅ URL: ${cloudflareImage.url}`);
        console.log(`   📐 Elemento visible: ${imageElement.offsetWidth}x${imageElement.offsetHeight}`);
      };
      
      img.onerror = (error) => {
        console.error(`❌ Error al cargar imagen: ${cloudflareImage.url}`, error);
      };
      
      img.src = cloudflareImage.url;
    }
  }
}

// 🧭 FUNCIÓN PARA CONFIGURAR NAVEGACIÓN DE IMÁGENES
function setupImageNavigation() {
  console.log('🧭 Configurando navegación de imágenes...');
  
  // Seleccionar todas las imágenes del showcase
  const showcaseImages = document.querySelectorAll('[class*=\"img__showcase\"]');
  
  showcaseImages.forEach((img, index) => {
    // Remover event listeners existentes
    img.replaceWith(img.cloneNode(true));
    const newImg = document.querySelectorAll('[class*=\"img__showcase\"]')[index];
    
    // Agregar nuevo event listener
    newImg.addEventListener('click', (e) => {
      e.preventDefault();
      
      const imageType = newImg.dataset.imageType;
      const imageName = newImg.dataset.imageName;
      
      console.log(`🎯 Click en imagen: ${imageName} (${imageType})`);
      
      // Navegar a la galería correspondiente
      if (imageType === 'kopfe') {
        window.location.href = 'de/gallery-kopfe.html';
      } else if (imageType === 'wesen') {
        window.location.href = 'de/gallery-wesen.html';
      } else {
        // Fallback a galería general
        window.location.href = 'de/gallery-wesen.html';
      }
    });
    
    // Agregar efectos hover mejorados
    newImg.addEventListener('mouseenter', () => {
      newImg.style.transform = 'scale(1.05)';
      newImg.style.transition = 'transform 0.3s ease';
    });
    
    newImg.addEventListener('mouseleave', () => {
      newImg.style.transform = 'scale(1)';
    });
  });
}

// 🚀 INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM cargado, inicializando sistema de Cloudflare...');
  
  // Pequeño delay para asegurar que todo esté cargado
  setTimeout(() => {
    initializeCloudflareShowcase();
  }, 500);
});

// 🔄 FUNCIÓN PARA REFRESCAR IMÁGENES (OPCIONAL)
window.refreshShowcaseImages = async function() {
  console.log('🔄 Refrescando imágenes del showcase...');
  
  if (cloudflareImages.length > 0) {
    selectedImages = selectRandomImages(cloudflareImages, 6);
    await replaceShowcaseImages();
    setupImageNavigation();
    console.log('✅ Imágenes refrescadas');
  } else {
    console.warn('⚠️ No hay imágenes de Cloudflare cargadas');
  }
};

// 📊 FUNCIÓN DE DIAGNÓSTICO
window.diagnoseShowcase = function() {
  console.log('📊 DIAGNÓSTICO DEL SHOWCASE:');
  console.log('- Imágenes de Cloudflare cargadas:', cloudflareImages.length);
  console.log('- Imágenes seleccionadas:', selectedImages.length);
  console.log('- Elementos del showcase encontrados:', document.querySelectorAll('[class*=\"img__showcase\"]').length);
  console.log('- Imágenes reemplazadas:', document.querySelectorAll('[data-cloudflare-image=\"true\"]').length);
}; 
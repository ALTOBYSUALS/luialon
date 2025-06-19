// 🎨 SISTEMA DINÁMICO PARA PÁGINA PRINCIPAL 🎨
// Sistema de animaciones y comportamiento para la página principal

console.log('✅ home-dynamic.js cargado correctamente');

// 🧭 FUNCIÓN PARA CONFIGURAR NAVEGACIÓN DE IMÁGENES
function setupImageNavigation() {
  console.log('🧭 Configurando navegación de imágenes...');
  
  // Seleccionar todas las imágenes del showcase
  const showcaseImages = document.querySelectorAll('[class*="img__showcase"]');
  
  showcaseImages.forEach((img) => {
    // Agregar efectos hover mejorados
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
      img.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}

// Al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  // Configurar navegación
  setupImageNavigation();
  
  console.log('✅ Sistema de showcase inicializado correctamente');
}); 
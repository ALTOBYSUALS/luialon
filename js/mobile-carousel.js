// 🚀 NUEVA SECCIÓN MOBILE HERO - INTERACCIONES SIMPLES
console.log('🚀 Mobile Hero Section cargado');

class MobileHeroSection {
  constructor() {
    this.init();
  }

  init() {
    console.log('🚀 Inicializando Mobile Hero Section...');
    
    // Solo ejecutar en móvil
    if (window.innerWidth <= 767) {
      this.setupGalleryCards();
      this.setupFeaturedScroll();
      this.setupNavigation();
      console.log('✅ Mobile Hero Section inicializado');
    }
  }

  setupGalleryCards() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    galleryCards.forEach((card, index) => {
      // Efecto de hover/touch mejorado
      card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.98)';
      });
      
      card.addEventListener('touchend', () => {
        card.style.transform = '';
      });
      
      // Agregar ripple effect
      card.addEventListener('click', (e) => {
        this.createRipple(e, card);
      });
      
      console.log(`✅ Gallery card ${index + 1} configurada`);
    });
  }

  setupFeaturedScroll() {
    const featuredScroll = document.querySelector('.featured-scroll');
    
    if (featuredScroll) {
      // Smooth scrolling mejorado
      let isScrolling = false;
      
      featuredScroll.addEventListener('touchstart', () => {
        isScrolling = true;
      });
      
      featuredScroll.addEventListener('touchend', () => {
        setTimeout(() => {
          isScrolling = false;
        }, 150);
      });
      
      // Auto-scroll sutil (opcional)
      this.startFeaturedAutoScroll(featuredScroll);
      
      console.log('✅ Featured scroll configurado');
    }
  }

  setupNavigation() {
    // Mejorar la navegación móvil con feedback visual
    const navButtons = document.querySelectorAll('.div__nav_btn');
    
    navButtons.forEach((btn, index) => {
      btn.addEventListener('touchstart', () => {
        btn.style.transform = 'translateY(-2px) scale(0.95)';
        btn.style.background = 'rgba(0, 122, 255, 0.2)';
      });
      
      btn.addEventListener('touchend', () => {
        btn.style.transform = '';
        btn.style.background = '';
      });
      
      console.log(`✅ Nav button ${index + 1} configurado`);
    });
  }

  createRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(0, 122, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      z-index: 1;
    `;
    
    // Agregar keyframes si no existen
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  startFeaturedAutoScroll(container) {
    let scrollPosition = 0;
    const scrollStep = 1;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    const autoScroll = () => {
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      } else {
        scrollPosition += scrollStep;
      }
      
      container.scrollLeft = scrollPosition;
    };
    
    // Auto-scroll muy lento cada 50ms
    const scrollInterval = setInterval(autoScroll, 50);
    
    // Pausar en interacción
    container.addEventListener('touchstart', () => {
      clearInterval(scrollInterval);
    });
    
    // Reanudar después de 3 segundos
    container.addEventListener('touchend', () => {
      setTimeout(() => {
        if (container.scrollLeft === scrollPosition) {
          this.startFeaturedAutoScroll(container);
        }
      }, 3000);
    });
  }

  // Método para debug
  showInfo() {
    console.log('📱 Mobile Hero Section Info:');
    console.log('   - Gallery cards:', document.querySelectorAll('.gallery-card').length);
    console.log('   - Featured items:', document.querySelectorAll('.featured-item').length);
    console.log('   - Nav buttons:', document.querySelectorAll('.div__nav_btn').length);
    console.log('   - Hero section visible:', !!document.querySelector('.mobile-hero-section'));
  }
}

// Inicialización
let mobileHero = null;

function initMobileHero() {
  console.log('🚀 Intentando inicializar Mobile Hero...');
  
  const heroSection = document.querySelector('.mobile-hero-section');
  
  if (heroSection && window.innerWidth <= 767) {
    mobileHero = new MobileHeroSection();
    
    // Exponer métodos para debug
    window.mobileHeroInfo = () => mobileHero.showInfo();
    
    console.log('✅ Mobile Hero listo');
  } else {
    console.log('ℹ️ Mobile Hero no inicializado (desktop o no encontrado)');
  }
}

// Múltiples puntos de inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileHero);
} else {
  initMobileHero();
}

window.addEventListener('load', () => {
  console.log('🔄 Window load - verificando Mobile Hero...');
  if (!mobileHero && window.innerWidth <= 767) {
    initMobileHero();
  }
});

// Inicialización con timeout como backup
setTimeout(() => {
  console.log('⏰ Timeout backup - verificando Mobile Hero...');
  if (!mobileHero && window.innerWidth <= 767) {
    initMobileHero();
  }
}, 1000);

// Redimensionamiento
window.addEventListener('resize', () => {
  if (window.innerWidth <= 767 && !mobileHero) {
    initMobileHero();
  } else if (window.innerWidth > 767 && mobileHero) {
    mobileHero = null;
    console.log('📱 Mobile Hero desactivado (desktop)');
  }
});

console.log('🚀 Mobile Hero Script listo');

// ✨ NUEVO HOME SENCILLO - INTERACCIONES SIMPLES
console.log('✨ Nuevo Home cargado');

class SimpleHome {
  constructor() {
    this.init();
  }

  init() {
    console.log('✨ Inicializando Nuevo Home...');
    this.setupGalleryItems();
    this.setupStoreButton();
    this.setupSmoothScrolling();
    console.log('✅ Nuevo Home inicializado correctamente');
  }

  setupGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
      // Efecto hover mejorado
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
      
      // Efecto click con feedback visual
      item.addEventListener('click', (e) => {
        this.createClickEffect(e, item);
        
        // Pequeño delay para mostrar el efecto antes de navegar
        setTimeout(() => {
          // La navegación ya está manejada por el onclick en el HTML
        }, 200);
      });
      
      console.log(`✅ Gallery item ${index + 1} configurado`);
    });
  }

  setupStoreButton() {
    const storeButton = document.querySelector('.store-button');
    
    if (storeButton) {
      storeButton.addEventListener('mouseenter', () => {
        storeButton.style.transform = 'translateY(-2px)';
        storeButton.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      });
      
      storeButton.addEventListener('mouseleave', () => {
        storeButton.style.transform = '';
        storeButton.style.boxShadow = '';
      });
      
      storeButton.addEventListener('click', (e) => {
        this.createClickEffect(e, storeButton);
      });
      
      console.log('✅ Store button configurado');
    }
  }

  setupSmoothScrolling() {
    // Scroll suave para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    console.log('✅ Smooth scrolling configurado');
  }

  createClickEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(33, 37, 41, 0.2);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      z-index: 1;
    `;
    
    // Agregar keyframes si no existen
    if (!document.querySelector('#simple-home-styles')) {
      const style = document.createElement('style');
      style.id = 'simple-home-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Método para debug
  showInfo() {
    console.log('✨ Nuevo Home Info:');
    console.log('   - Gallery items:', document.querySelectorAll('.gallery-item').length);
    console.log('   - Store button:', !!document.querySelector('.store-button'));
    console.log('   - Hero section:', !!document.querySelector('.hero-container'));
    console.log('   - Home section visible:', !!document.querySelector('.new-home-section'));
  }
}

// Inicialización
let simpleHome = null;

function initSimpleHome() {
  console.log('✨ Intentando inicializar Nuevo Home...');
  
  const homeSection = document.querySelector('.new-home-section');
  
  if (homeSection) {
    simpleHome = new SimpleHome();
    
    // Exponer métodos para debug
    window.simpleHomeInfo = () => simpleHome.showInfo();
    
    console.log('✅ Nuevo Home listo');
  } else {
    console.log('ℹ️ Nuevo Home no encontrado');
  }
}

// Múltiples puntos de inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSimpleHome);
} else {
  initSimpleHome();
}

window.addEventListener('load', () => {
  console.log('🔄 Window load - verificando Nuevo Home...');
  if (!simpleHome) {
    initSimpleHome();
  }
});

// Inicialización con timeout como backup
setTimeout(() => {
  console.log('⏰ Timeout backup - verificando Nuevo Home...');
  if (!simpleHome) {
    initSimpleHome();
  }
}, 1000);

console.log('✨ Nuevo Home Script listo');

// Home Simple Interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ Home Simple Script cargado');
    
    // Smooth scroll para elementos del home
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll('.home-gallery-card, .home-store-content');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Actualizar contador del carrito
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            el.textContent = count;
        });
    }
    
    updateCartCount();
    
    // Efecto parallax suave en hero image
    const heroImage = document.querySelector('.home-hero-image img');
    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroImage.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Mobile fixes
    if (window.innerWidth <= 768) {
        // Asegurar que solo el home wrapper sea visible en móvil
        const wrapperHome = document.querySelector('.div__wrapper_home');
        const wrapperAbout = document.querySelector('.div__wrapper_about');
        const wrapperGallery = document.querySelector('.div__wrapper_gallery');
        
        if (wrapperHome) wrapperHome.style.display = 'block';
        if (wrapperAbout) wrapperAbout.style.display = 'none';
        if (wrapperGallery) wrapperGallery.style.display = 'none';
        
        // Deshabilitar animaciones GSAP en móvil
        if (typeof gsap !== 'undefined') {
            gsap.set('.div__wrappers', { x: 0 });
        }
    }
    
    console.log('✅ Home Simple inicializado correctamente');
}); 
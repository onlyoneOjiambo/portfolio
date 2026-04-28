// Advanced Interactive Animations

// Scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `slideInUp 0.6s ease-out forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe project cards, education cards, and experience items
document.querySelectorAll('.project-card, .edu-card, .exp-item, .skill-cat').forEach((el) => {
  observer.observe(el);
});

// Parallax effect on mouse move in hero section
document.addEventListener('mousemove', (e) => {
  const heroSection = document.getElementById('home');
  if (!heroSection) return;
  
  const rect = heroSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;
  
  if (isInView) {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    
    const heroAvatar = document.querySelector('.hero-avatar');
    if (heroAvatar) {
      heroAvatar.style.transform = `perspective(1000px) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg) scale(1.02)`;
    }
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateX(${x * 0.3}px)`;
    }
  }
});

// Reset transforms on mouse leave
document.addEventListener('mouseleave', () => {
  const heroAvatar = document.querySelector('.hero-avatar');
  const heroContent = document.querySelector('.hero-content');
  
  if (heroAvatar) {
    heroAvatar.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  }
  if (heroContent) {
    heroContent.style.transform = 'translateX(0px)';
  }
});

// Enhanced hover effects for cards
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
    this.style.transform = 'translateY(-12px) perspective(1000px) rotateX(8deg)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg)';
  });
});

// Gradient animation for section dividers
document.querySelectorAll('hr.gold-hr').forEach((hr) => {
  hr.style.backgroundImage = `
    linear-gradient(90deg, 
      #D4AF37 0%, 
      #D4AF37 40%, 
      transparent 60%, 
      transparent 100%)
  `;
  hr.style.animation = `shimmer 2s infinite`;
});

// Add shimmer keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% {
      background-image: linear-gradient(90deg, #D4AF37 0%, #D4AF37 40%, transparent 60%, transparent 100%);
    }
    50% {
      background-image: linear-gradient(90deg, transparent 0%, #D4AF37 20%, #D4AF37 60%, transparent 100%);
    }
    100% {
      background-image: linear-gradient(90deg, transparent 20%, transparent 60%, #D4AF37 80%, #D4AF37 100%);
    }
  }
`;
document.head.appendChild(style);

// Scroll-triggered text animations
const textElements = document.querySelectorAll('h2, h3');
textElements.forEach((el) => {
  const text = el.textContent;
  el.textContent = '';
  
  let char = 0;
  const typeWriter = setInterval(() => {
    if (char < text.length) {
      el.textContent += text.charAt(char);
      char++;
    } else {
      clearInterval(typeWriter);
    }
  }, 30);
});

// Button ripple effect
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const radius = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - radius / 2;
    const y = e.clientY - rect.top - radius / 2;
    
    ripple.style.width = ripple.style.height = radius + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Smooth scroll behavior for links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Add glow effect to tech badges on hover
document.querySelectorAll('.tech-badge').forEach((badge) => {
  badge.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.5)';
    this.style.transform = 'scale(1.1) translateY(-3px)';
  });
  
  badge.addEventListener('mouseleave', function() {
    this.style.boxShadow = 'none';
    this.style.transform = 'scale(1) translateY(0)';
  });
});

// Fade in elements on load
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.5s ease-in';
});

// Dynamic footer year with animation
const footerUpdate = () => {
  const footerText = document.querySelector('footer p:first-child');
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.innerHTML = `© ${year} Hillary Ojiambo`;
    footerText.style.animation = 'fadeIn 0.5s ease-in';
  }
};

const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(fadeInStyle);

footerUpdate();

// Background animations on scroll
let ticking = false;
document.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset;
      
      // Update sections with parallax
      document.querySelectorAll('section').forEach((section, index) => {
        const offset = section.offsetTop;
        const distance = scrollTop - offset;
        
        if (Math.abs(distance) < window.innerHeight * 1.5) {
          section.style.opacity = Math.max(0.5, 1 - Math.abs(distance) / window.innerHeight);
        }
      });
      
      ticking = false;
    });
    ticking = true;
  }
});

console.log('✨ Advanced animations loaded! Your portfolio is now fully animated with Three.js and enhanced CSS animations.');

document.addEventListener('DOMContentLoaded', function() {
  // Сначала удалим любые существующие частицы, если они есть
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
  
  // Функция для определения настроек в зависимости от устройства
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Настройки частиц
  let particlesConfig = {
    "particles": {
      "number": {
        "value": isMobile() ? 80 : 156,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#1eff00"
      },
      "shape": {
        "type": "circle", // Используем круги вместо edge для лучшей производительности
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false
        }
      },
      "size": {
        "value": isMobile() ? 2 : 3,
        "random": false,
        "anim": {
          "enable": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00842b",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": isMobile() ? 3 : 5,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false // Отключаем для большей стабильности
        }
      }
    },
    "interactivity": {
      "detect_on": "window", // Важно: используем window вместо canvas!
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse" // Меняем на repulse - отталкивание частиц
        },
        "onclick": {
          "enable": true,
          "mode": "push" // Push создает новые частицы
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": isMobile() ? 100 : 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 150,
          "size": 10,
          "duration": 2,
          "opacity": 0.8,
          "speed": 3
        },
        "repulse": {
          "distance": isMobile() ? 100 : 150,
          "duration": 0.4
        },
        "push": {
          "particles_nb": isMobile() ? 6 : 12  // Увеличиваем количество создаваемых частиц для более заметного эффекта
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };

  // Инициализация particles.js
  particlesJS('particles-js', particlesConfig);
  
  // Добавляем дополнительный код для обеспечения интерактивности на мобильных
  const particlesCanvas = document.querySelector('#particles-js canvas');
  if (particlesCanvas) {
    // Убедимся, что холст занимает всё доступное пространство
    particlesCanvas.style.width = '100%';
    particlesCanvas.style.height = '100%';
    
    // Добавляем обработчики touch-событий для мобильных
    particlesCanvas.addEventListener('touchstart', function(e) {
      e.preventDefault(); // Предотвращаем прокрутку страницы
      
      // Имитируем клик для particles.js
      const evt = new MouseEvent('click', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        bubbles: true,
        cancelable: true,
        view: window
      });
      particlesCanvas.dispatchEvent(evt);
    }, {passive: false});
    
    // Обработчик для touch-перемещения (имитация hover с repulse эффектом)
    particlesCanvas.addEventListener('touchmove', function(e) {
      e.preventDefault();
      
      // Имитируем mousemove для particles.js
      const evt = new MouseEvent('mousemove', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        bubbles: true,
        cancelable: true,
        view: window
      });
      particlesCanvas.dispatchEvent(evt);
      
      // Дополнительно можем усилить эффект repulse для мобильных
      if (window.pJSDom && window.pJSDom.length > 0) {
        const pJS = window.pJSDom[0].pJS;
        if (pJS && pJS.interactivity) {
          pJS.interactivity.mouse.pos_x = e.touches[0].clientX;
          pJS.interactivity.mouse.pos_y = e.touches[0].clientY;
          pJS.interactivity.status = 'mousemove';
        }
      }
    }, {passive: false});
  }
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    // Задержка для предотвращения слишком частого обновления
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(function() {
      // Перезапускаем particles.js с обновленной конфигурацией
      particlesConfig.particles.number.value = isMobile() ? 80 : 156;
      particlesConfig.particles.size.value = isMobile() ? 2 : 3;
      particlesConfig.particles.move.speed = isMobile() ? 3 : 5;
      particlesConfig.interactivity.modes.grab.distance = isMobile() ? 100 : 140;
      particlesConfig.interactivity.modes.push.particles_nb = isMobile() ? 4 : 8;
      
      // Уничтожаем и пересоздаем particles.js
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
      particlesJS('particles-js', particlesConfig);
      
      // Переинициализируем обработчики touch-событий
      const newCanvas = document.querySelector('#particles-js canvas');
      if (newCanvas) {
        newCanvas.style.width = '100%';
        newCanvas.style.height = '100%';
      }
    }, 500);
  });
});

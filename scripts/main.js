document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
            
            if (nav.classList.contains('active')) {
                burger.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });
});


const tabBtns = document.querySelectorAll('.tab__btn');
const tabContents = document.querySelectorAll('.tab__content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');

        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});


document.querySelector('.contact__form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: e.target.querySelector('input[type="text"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        phone: e.target.querySelector('input[type="tel"]').value,
        message: e.target.querySelector('textarea').value
    };

    try {
        const response = await fetch('https://pitonovich.pythonanywhere.com/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Запрос отправлен! Мы скоро свяжемся с вами.');
            e.target.reset();
        } else {
            throw new Error('Ошибка отправки');
        }
    } 
    catch (error) {
        alert('Ошибка: ' + error.message);
    }
    });

    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        reset: true
    });

    scrollReveal.reveal('.section__title, .about__content, .stats, .client__content, .projects__grid, .catalog__grid, .geography__content, .partners__grid, .social__content, .contacts__content', {
        interval: 200
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const modalTitle = modal.querySelector('.modal__title');
    const modalDesc = modal.querySelector('.modal__description');
    const closeBtn = modal.querySelector('.modal__close');

    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', function() {
        const title = this.dataset.title
        modalTitle.textContent = title;

        let description = '';

        switch(title) {
            case 'Комплектация образовательных учреждений':
                description = `
                    <p>ООО Компания «Юником» осуществляет комплектацию образовательных учреждений современным оборудованием:</p>
                    <ul>
                        <li>Мобильные мультимедийные комплексы с 3D-стереовизуализацией</li>
                        <li>VR-оборудование для обучения и профессиональной ориентации</li>
                        <li>Отечественные образовательные наборы по робототехнике</li>
                        <li>Комплексы для подготовки операторов БПЛА</li>
                    </ul>
                    <p>Пример реализованного проекта: поставка мобильных мультимедийных комплексов с 3D-стереовизуализацией «Свега» для образовательного учреждения "Классная школа" в г. Муравленко.</p>
                `;
                break;
                
            case 'Спортивные объекты':
                description = `
                    <p>Комплектация спортивных объектов оборудованием для фиджитал-спорта:</p>
                    <ul>
                        <li>Игровые приставки с предустановленными аккаунтами и играми</li>
                        <li>Игровые компьютеры, мониторы, кресла и столы</li>
                        <li>Оборудование для соревнований по управлению дронами</li>
                        <li>Видеостудии под ключ</li>
                    </ul>
                    <p>Пример проекта: комплектация центра подготовки по фиджитал спорту в направлениях: Фиджитал-футбол, Фиджитал-баскетбол, Фиджитал-хоккей на базе АУ Ханты-Мансийского автономного округа - Югры «ЮграМегаСпорт», г. Ханты-Мансийск. </p>
                `;
                break;
                
            case 'Нефтегазовые месторождения':
                description = `
                    <p>ООО Компания «Юником» осуществляет поставки оборудования для нефтегазодобывающих предприятий:</p>
                    <ul>
                        <li>Абразивы и аудиовизуальное оборудование</li>
                        <li>Вентиляционное оборудование и материалы</li>
                        <li>Грузоподъемное и газопламенное оборудование</li>
                        <li>Запорно-регулирующая арматура</li>
                        <li>Измерительное оборудование и инженерная сантехника</li>
                    </ul>
                `;
                break;
                
            case 'Фиджитал-спорт':
                description = `
                    <p>Комплектация центров фиджитал-спорта:</p>
                    <ul>
                        <li>VR-арены и трассы для гоночных дронов</li>
                        <li>Комплекты виртуальной реальности</li>
                        <li>Оборудование для киберспортивных соревнований</li>
                        <li>Стрим-станции и оборудование для трансляций</li>
                    </ul>
                    <p>Пример проекта: оснащение трёх кабинетов для подготовки киберспортсменов по дисциплинам фиджитал-спорт на базе МАУ "Пуровская районная спортивная школа олимпийского резерва "АВАНГАРД" в г. Тарко-Сале.</p>
                `;
                break;
            }

        modalDesc.innerHTML = description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        });
    });
    
    function closeModal() {
        modal.classList.add('closing');
        setTimeout(() => {
        modal.classList.remove('active', 'closing');
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
        }, 400);
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
        }
    });
});

document.querySelectorAll('.catalog__item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - item.getBoundingClientRect().left;
        const y = e.clientY - item.getBoundingClientRect().top;
        
        item.style.transform = `perspective(1000px) rotateX(${-(y-150)/20}deg) rotateY(${(x-150)/20}deg) scale(1.03)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.timeline__track');
    const items = document.querySelectorAll('.timeline__item');
    const prevBtn = document.querySelector('.social__nav--prev');
    const nextBtn = document.querySelector('.social__nav--next');
    const dotsContainer = document.querySelector('.social__dots');
    
    let currentIndex = 0;
    const itemWidth = 100;
    
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('social__dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.social__dot');
    
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Кнопка "Назад"
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        goToSlide(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        goToSlide(currentIndex);
    });
    
    let autoSlideInterval = setInterval(() => {
        nextBtn.click();
    }, 5000);
    
    const sliderContainer = document.querySelector('.timeline');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextBtn.click();
        }
        if (touchEndX > touchStartX + 50) {
            prevBtn.click();
        }
    }
});

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat__number');
  const duration = 2000;
  
  statNumbers.forEach(stat => {
    const target = +stat.textContent.replace('+', '');
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
      
      if (current >= target) {
        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
        clearInterval(timer);
      }
    }, 16);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.1});

observer.observe(document.querySelector('.stats'));

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `rgba(${Math.floor(Math.random() * 50 + 180)}, ${Math.floor(Math.random() * 50 + 180)}, ${Math.floor(Math.random() * 50 + 180)}, 0.5)`
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(230, 126, 34, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

window.addEventListener('scroll', () => {
  const logo = document.querySelector('.logo img');
  const scrollY = window.scrollY;
  
  if (scrollY > 50) {
    logo.style.transform = `rotate(${Math.min(5, scrollY/50)}deg)`;
  } else {
    logo.style.transform = 'scale(1) rotate(0)';
    logo.style.filter = 'none';
  }
});

function updateLogoProgress() {
    const scrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalHeight) * 100;
    
    document.querySelector('.logo-progress').style.width = `${progress}%`;
}

window.addEventListener('scroll', updateLogoProgress);
window.addEventListener('load', updateLogoProgress);


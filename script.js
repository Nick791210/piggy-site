document.addEventListener('DOMContentLoaded', () => {
    // 1. 導覽列捲動隱藏/顯示邏輯 (Scroll Direction Detection)
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // 向下捲動，且距離頂端 > 100px -> 隱藏
            navbar.classList.add('hidden');
        } else {
            // 向上捲動 -> 顯示
            navbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
        
        // 浮動按鈕在英雄區塊(hero)時稍微透明
        const floatingBtn = document.querySelector('.floating-cta');
        if (window.scrollY < 500) {
            floatingBtn.style.opacity = '0.5';
            floatingBtn.style.transform = 'scale(0.9)';
        } else {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.transform = 'scale(1)';
        }
    });

    // 2. Intersection Observer 入序動畫 (Fade In Up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 當元素露出 15% 時觸發
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 觸發後即取消觀察，確保動畫只播放一次
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => animateObserver.observe(el));
    
    // 初始化確保 hero 區塊即使沒有捲動也會呈現
    setTimeout(() => {
        const firstElements = document.querySelectorAll('#hero .animate-on-scroll');
        firstElements.forEach(el => el.classList.add('is-visible'));
    }, 100);
});

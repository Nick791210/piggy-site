document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化星空背景
    createStars();

    // 2. 初始化 Scroll Reveal (Intersection Observer)
    initScrollReveal();
});

/**
 * 創建宇宙星空背景
 */
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;

    const numStars = 150; // 星星數量

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 隨機位置
        const xy = getRandomPosition();
        star.style.left = `${xy[0]}vw`;
        star.style.top = `${xy[1]}vh`;
        
        // 隨機大小
        const size = Math.random() * 3 + 1; // 1px to 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 隨機閃爍延遲與週期
        const animationDelay = Math.random() * 5;
        const animationDuration = Math.random() * 3 + 2;
        star.style.animationDelay = `${animationDelay}s`;
        star.style.animationDuration = `${animationDuration}s`;

        starsContainer.appendChild(star);
    }
}

function getRandomPosition() {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    return [x, y];
}

/**
 * 滾動進場特效
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.fade-up, .fade-left, .fade-right, .fade-in, .animate-fade-in-up'
    );

    const revealOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // 在距離底部 100px 時觸發
        threshold: 0.1 // 至少 10% 進入畫面才觸發
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 可選：如果要元素只進場一次，可以加這行取消觀察
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

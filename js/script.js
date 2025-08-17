// تبديل القائمة المحمولة
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// التمرير السلس لروابط التنقل
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // إغلاق القائمة المحمولة إذا كانت مفتوحة
            mobileMenu.classList.add('hidden');
        }
    });
});

// معالجة إرسال النموذج
document.querySelector('form').addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // إظهار حالة التحميل
    submitBtn.innerHTML = 'جاري الإرسال...';
    submitBtn.disabled = true;
    
    // إعادة تعيين الزر بعد 3 ثوانٍ إذا لم يتم إعادة التوجيه
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// إضافة تأثير التمرير للشريط العلوي
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// تأثير العد للإحصائيات
function animateCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.querySelector('div').textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.querySelector('div').textContent = `+${Math.ceil(current)}`;
                setTimeout(updateCounter, 20);
            } else {
                counter.querySelector('div').textContent = `+${target}`;
            }
        };
        
        // بدء العد عند ظهور العنصر في الشاشة
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// تشغيل تأثير العد عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', animateCounters);

// تأثيرات إضافية للتفاعل
document.addEventListener('DOMContentLoaded', function() {
    // تأثير الظهور التدريجي للعناصر
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // مراقبة بطاقات الخدمات
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// تحسين الأداء - تأخير تحميل الصور
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// إضافة تأثيرات صوتية للأزرار (اختياري)
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// حفظ حالة القائمة المحمولة
let mobileMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // منع التمرير
    } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto'; // السماح بالتمرير
    }
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', (e) => {
    if (mobileMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuOpen = false;
        document.body.style.overflow = 'auto';
    }
});
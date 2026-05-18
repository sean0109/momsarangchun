// 엄마사랑 재가복지센터 - 메인 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 공통 헤더 삽입 후, 헤더에 의존하는 초기화 실행
    loadHeader();

    // 공통 푸터 삽입
    loadFooter();

    // 부드러운 스크롤
    initSmoothScroll();

    // 컨택트 폼 처리
    initContactForm();

    // 애니메이션 효과
    initScrollAnimations();
});

// 공통 헤더(/partials/header.html)를 비동기로 삽입
// 메뉴 수정은 partials/header.html 한 곳만 고치면 전 페이지에 반영됨
function loadHeader() {
    const mount = document.getElementById('site-header');

    // 헤더에 의존하는 초기화 (삽입 완료 후 호출해야 함)
    const initHeaderDependents = function() {
        setActiveNavigation();
        initMobileMenu();
        initScrollHeader();
    };

    // 플레이스홀더가 없으면(예외적으로 헤더가 인라인으로 존재) 바로 초기화
    if (!mount) {
        initHeaderDependents();
        return;
    }

    // 클린 URL(/partials/header)로 요청 → .htaccess 301 리다이렉트 회피
    fetch('/partials/header')
        .then(res => res.text())
        .then(html => {
            mount.outerHTML = html;
        })
        .catch(err => console.error('헤더 로드 실패:', err))
        .finally(initHeaderDependents);
}

// 공통 푸터(/partials/footer.html)를 비동기로 삽입
// 연락처/주소 수정은 partials/footer.html 한 곳만 고치면 전 페이지에 반영됨
function loadFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) {
        return;
    }

    // 클린 URL(/partials/footer)로 요청 → .htaccess 301 리다이렉트 회피
    fetch('/partials/footer')
        .then(res => res.text())
        .then(html => {
            mount.outerHTML = html;
        })
        .catch(err => console.error('푸터 로드 실패:', err));
}

// 현재 페이지 네비게이션 활성화 (클린 URL 대응)
function setActiveNavigation() {
    // 현재 경로 정규화: /index.html → /, 끝 슬래시 제거 (단 루트는 '/' 유지)
    let path = window.location.pathname.replace(/\/index\.html$/, '/');
    if (path.length > 1) {
        path = path.replace(/\/+$/, '');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        let href = (link.getAttribute('href') || '').replace(/\/+$/, '');
        if (href === '') {
            href = '/';
        }
        if (href === path) {
            link.classList.add('active');
        }
    });
}

// 모바일 메뉴 토글
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    const navMenu = document.querySelector('.nav-menu');

    if (toggle && navMenu) {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');

            // 햄버거 아이콘 애니메이션
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // 메뉴 항목 클릭 시 모바일 메뉴 닫기
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 921) {
                    toggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    const spans = toggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
}

// 스크롤 시 헤더 스타일 변경
function initScrollHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    });
}

// 부드러운 스크롤
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 컨택트 폼 처리
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // 유효성 검사
            if (!name || !email || !message) {
                alert('모든 필드를 입력해주세요.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                return;
            }

            console.log('Form submitted:', { name, email, message });

            // 성공 메시지
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.\n감사합니다!');

            // 폼 리셋
            contactForm.reset();
        });
    }
}

// 이메일 유효성 검사
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 스크롤 애니메이션
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션할 요소들
    const animatedElements = document.querySelectorAll(
        '.service-card, .program-card, .why-feature, .section-header'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 전화 번호 포맷팅
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2,3})(\d{3,4})(\d{4})$/);
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phone;
}

// 모바일 환경 감지
function isMobile() {
    return window.innerWidth <= 768;
}

// 디바운스 함수 (성능 최적화)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 윈도우 리사이즈 핸들러 (디바운스 적용)
window.addEventListener('resize', debounce(function() {
    // 리사이즈 시 필요한 작업
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (window.innerWidth > 921 && navMenu) {
        navMenu.classList.remove('active');
        if (toggle) {
            toggle.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}, 250));

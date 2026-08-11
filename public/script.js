// Minimalistic Portfolio Script
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('#burger');
    const mobileMenu = document.querySelector('#mobile-menu');
    const scrollToTopBtn = document.querySelector('#scroll-to-top');
    const preloader = document.querySelector('#preloader');
    const contactForm = document.querySelector('#contact form');

    // Mobile menu toggle
    burger?.addEventListener('click', toggleMobileMenu);

    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('h-auto') || mobileMenu.style.height !== '0px' && mobileMenu.style.height !== '';
        const lines = burger.querySelectorAll('div');

        if (mobileMenu.classList.contains('h-0') === false && mobileMenu.classList.contains('h-auto')) {
            closeMobileMenu();
        } else if (mobileMenu.classList.contains('h-0')) {
            mobileMenu.classList.remove('h-0');
            mobileMenu.classList.add('h-auto');
            mobileMenu.setAttribute('aria-hidden', 'false');
            burger.setAttribute('aria-expanded', 'true');

            lines[0]?.classList.add('rotate-45', 'translate-y-[7px]');
            lines[1]?.classList.add('opacity-0');
            lines[2]?.classList.add('-rotate-45', '-translate-y-[7px]');
        } else {
            closeMobileMenu();
        }
    }

    window.closeMobileMenu = () => {
        mobileMenu?.classList.add('h-0');
        mobileMenu?.classList.remove('h-auto');
        mobileMenu?.setAttribute('aria-hidden', 'true');
        burger?.setAttribute('aria-expanded', 'false');

        const lines = burger?.querySelectorAll('div');
        lines?.[0]?.classList.remove('rotate-45', 'translate-y-[7px]');
        lines?.[1]?.classList.remove('opacity-0');
        lines?.[2]?.classList.remove('-rotate-45', '-translate-y-[7px]');
    };

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
            if (mobileMenu.classList.contains('h-auto')) {
                closeMobileMenu();
            }
        }
    });

    // Scroll handler
    let isScrolling = false;

    function handleScroll() {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                updateActiveSection();
                updateScrollToTop();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    function updateActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href')?.slice(1) === current) {
                link.classList.add('text-primary');
            }
        });
    }

    function updateScrollToTop() {
        if (scrollToTopBtn) {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top
    scrollToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Simple Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        animationObserver.observe(el);
    });

    // Form handling
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            message: document.getElementById('message')
        };

        const button = contactForm.querySelector('button');
        const originalText = button.innerHTML;

        if (validateForm(formData)) {
            button.innerHTML = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                showFormSuccess(button, originalText);
                contactForm.reset();
                clearFormErrors();
            }, 1500);
        }
    }

    function validateForm(formData) {
        let isValid = true;

        // Name validation
        if (!formData.name.value.trim()) {
            showFieldError(formData.name, 'Please enter your name');
            isValid = false;
        } else {
            clearFieldError(formData.name);
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.value.trim()) {
            showFieldError(formData.email, 'Please enter your email');
            isValid = false;
        } else if (!emailPattern.test(formData.email.value)) {
            showFieldError(formData.email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearFieldError(formData.email);
        }

        // Message validation
        if (!formData.message.value.trim()) {
            showFieldError(formData.message, 'Please enter your message');
            isValid = false;
        } else if (formData.message.value.trim().length < 10) {
            showFieldError(formData.message, 'Message too short (min 10 characters)');
            isValid = false;
        } else {
            clearFieldError(formData.message);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('border-red-500');

        // Remove existing error
        const existingError = field.parentElement.querySelector('.error-message');
        existingError?.remove();

        // Add new error
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        field.parentElement.appendChild(errorElement);
    }

    function clearFieldError(field) {
        field.classList.remove('border-red-500');
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement?.remove();
    }

    function clearFormErrors() {
        contactForm.querySelectorAll('.border-red-500').forEach(field => {
            clearFieldError(field);
        });
    }

    function showFormSuccess(button, originalText) {
        button.innerHTML = 'Message Sent!';
        button.classList.add('bg-green-600');

        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-green-600');
            button.disabled = false;
        }, 3000);
    }

    // Preloader
    window.addEventListener('load', () => {
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('opacity-0');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 400);
            }, 300);
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (mobileMenu?.classList.contains('h-auto')) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Form validation
    ['name', 'email', 'message'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('input', function () {
                if (this.classList.contains('border-red-500') && this.value.trim()) {
                    clearFieldError(this);
                }
            });
        }
    });
});

// Project Modal Functionality
const projectData = {
    artifacts: {
        title: "ARtifacts Explorer",
        description: "A comprehensive AR museum project featuring both a dedicated museum website and an innovative AR mobile application. The platform brings historical artifacts to life through immersive augmented reality experiences, offering visitors interactive storytelling and seamless exploration of cultural heritage both online and through the AR app.",
        longDescription: "ARtifacts Explorer represents the cutting edge of museum technology, combining traditional web presence with groundbreaking augmented reality experiences. The project consists of two main components: a fully-featured museum website and a revolutionary AR mobile application. The website serves as the digital gateway to the museum, featuring detailed artifact catalogs, virtual tours, educational resources, and visitor information. The AR mobile app transforms the physical museum experience by overlaying digital information onto real artifacts, creating an interactive layer that tells stories, provides historical context, and engages visitors in ways never before possible.",
        technologies: ["Unity AR", "ARCore/ARKit", "Hostinger", "3D Modeling", "C#"],
        features: [
            "Real-time AR artifact recognition and overlay",
            "Interactive 3D models with detailed information",
            "Audio narration and visual storytelling",
            "Web promotion and mobile ar integration",
            "Content management system for museum staff",
            "Analytics dashboard for visitor engagement tracking"
        ],
        images: [
            {
                src: "Assets/Images/Unity/nakatayo head.jpg",
                alt: "AR Museum Interface",
                caption: "Main AR interface showing artifact recognition"
            },
            {
                src: "Assets/Images/Unity/sample1.jpg",
                alt: "3D Artifact Model",
                caption: "Interactive 3D artifact models"
            },
            {
                src: "Assets/Images/Unity/sample2.jpg",
                alt: "Museum Website",
                caption: "Responsive museum website design"
            },
            {
                src: "Assets/Images/Unity/sample3.jpg",
                alt: "AR Experience",
                caption: "Immersive AR storytelling experience"
            }
        ],
        link: "https://artifactsmalvar.com",
        status: "Completed"
    },
    artexpo: {
        title: "ArtExpo E-commerce Platform",
        description: "A sophisticated art e-commerce platform built with WordPress WooCommerce, featuring artist portfolios, secure payment processing, and inventory management for art galleries and collectors.",
        longDescription: "ArtExpo is a comprehensive e-commerce solution designed specifically for the art industry. Built on WordPress with WooCommerce integration, the platform provides galleries, artists, and collectors with a powerful tool for buying and selling artwork online. The system includes advanced features such as artist portfolio management, detailed artwork catalogs with high-resolution images, secure payment processing, and sophisticated inventory tracking. The platform also includes customer relationship management tools, sales analytics, and automated email marketing capabilities.",
        technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "PayPal API", "Stripe"],
        features: [
            "Artist portfolio management system",
            "High-resolution image galleries with zoom functionality",
            "Secure payment processing with multiple gateways",
            "Advanced search and filtering by style, medium, price",
            "Automated invoice generation and order tracking",
            "Customer wishlist and favorites functionality",
            "Admin dashboard with sales analytics",
            "Mobile-responsive design for all devices"
        ],
        images: [
            {
                src: "Assets/Images/ArtExpo/Sunset.png",
                alt: "ArtExpo Homepage",
                caption: "Modern and elegant homepage design"
            },
            {
                src: "Assets/Images/ArtExpo/artExpo1.png",
                alt: "Product Gallery",
                caption: "Interactive artwork gallery with filtering"
            },
            {
                src: "Assets/Images/ArtExpo/artExpo2.png",
                alt: "Artist Profile",
                caption: "Detailed artist portfolio pages"
            },
            {
                src: "Assets/Images/ArtExpo/artExpo3.png",
                alt: "Shopping Cart",
                caption: "Streamlined checkout process"
            }
        ],
        status: "Completed"
    },
    'arktech-web': {
        title: "Arktech Corporate Website",
        description: "A complete website renewal from WordPress to full-stack PHP solution with integrated backend CMS for managing potential employees, featuring application tracking and HR management capabilities.",
        longDescription: "The Arktech website project involved a complete technological transformation from a traditional WordPress site to a custom full-stack PHP solution. This rebuild was driven by the need for advanced HR management capabilities and better performance. The new system includes a sophisticated content management system specifically designed for HR operations, including application tracking, employee onboarding workflows, and comprehensive candidate management. The frontend provides an engaging corporate presence while the backend empowers HR teams with powerful tools for managing their recruitment pipeline.",
        technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap", "AJAX"],
        features: [
            "Custom-built HR management system",
            "Application tracking and candidate pipeline",
            "Automated email notifications for applicants",
            "Document upload and management system",
            "Employee onboarding workflow automation",
            "Role-based access control for different departments",
            "Analytics dashboard for recruitment metrics",
            "Mobile-responsive design for all devices"
        ],
        images: [
            {
                src: "Assets/Images/Arktech/arktech.png",
                alt: "Arktech Homepage",
                caption: "Modern corporate website design"
            },
            {
                src: "Assets/Images/Arktech/company.png",
                alt: "Company Profile",
                caption: "Company information and values section"
            },
            {
                src: "Assets/Images/Arktech/home.png",
                alt: "Services Overview",
                caption: "Services and capabilities showcase"
            }
        ],
        status: "Completed"
    },
    'sakto-space': {
        title: "SaktoSpace",
        description: "AR e-commerce platform built with Flutter and integrated with Laravel backend and MySQL database. Assisted in the development of AR visualization features and e-commerce functionality.",
        longDescription: "SaktoSpace is an innovative augmented reality e-commerce platform that combines mobile commerce with immersive AR experiences. Built with Flutter for the mobile frontend and Laravel for the robust backend API, the application allows users to visualize products in their physical space before purchase. The platform features a comprehensive product catalog, shopping cart, order management, and secure payment processing, all enhanced with AR capabilities that let customers see how items would look in their environment. As a development assistant on this project, I contributed to implementing AR features, API integration, and user interface components.",
        technologies: ["Flutter", "Dart", "Laravel", "PHP", "MySQL", "AR Flutter Plugin", "REST API"],
        features: [
            "AR product visualization in real environment",
            "Full e-commerce functionality with cart and checkout",
            "Laravel backend API with MySQL database",
            "User authentication and profile management",
            "Product catalog with categories and search",
            "Order tracking and history",
            "Secure payment integration",
            "Admin panel for product management"
        ],
        images: [
            {
                src: "Assets/Images/SaktoSpace/SaktoShopProducts.jpg",
                alt: "SaktoSpace Shopping Interface",
                caption: "Product browsing and shopping interface"
            },
            {
                src: "Assets/Images/SaktoSpace/SaktoProductInfo.jpg",
                alt: "Product Details",
                caption: "Detailed product information view"
            },
            {
                src: "Assets/Images/SaktoSpace/SaktoProductManage.jpg",
                alt: "Product Management",
                caption: "Product management interface"
            },
            {
                src: "Assets/Images/SaktoSpace/SaktoAdmin.jpg",
                alt: "Admin Dashboard",
                caption: "Administrative dashboard for store management"
            }
        ],
        status: "In Progress",
        role: "Development Assistant"
    },
    'sentrisafe': {
        title: "SentriSafe",
        description: "Crime reporting mobile application developed in Flutter with map integration, crime announcements, and community commenting features. Laravel backend handles data management and user interactions.",
        longDescription: "SentriSafe is a community-focused crime reporting application designed to enhance public safety through real-time information sharing. Developed with Flutter for a seamless cross-platform mobile experience, the app integrates mapping technology to display crime locations and incidents in an intuitive interface. Users can report crimes, view announcements from local authorities, and engage with the community through commenting features. The Laravel backend manages user data, crime reports, notifications, and community interactions, while ensuring data privacy and security. As a development assistant on this project, I helped implement the map integration, commenting system, and various frontend features.",
        technologies: ["Flutter", "Dart", "Laravel", "PHP", "MySQL", "Google Maps API", "Firebase"],
        features: [
            "Interactive map showing crime locations and incidents",
            "Crime reporting with photo and location capture",
            "Real-time crime announcements and alerts",
            "Community commenting and discussion features",
            "User authentication and verification",
            "Push notifications for nearby incidents",
            "Crime statistics and heat maps",
            "Admin dashboard for content moderation"
        ],
        images: [
            {
                src: "Assets/Images/SentriSafe/ssCrimeMap.jpg",
                alt: "Crime Map Interface",
                caption: "Interactive crime map with incident markers"
            },
            {
                src: "Assets/Images/SentriSafe/ssAppCall.jpg",
                alt: "Emergency Call Feature",
                caption: "In-app emergency call functionality"
            },
            {
                src: "Assets/Images/SentriSafe/ssProfile.jpg",
                alt: "User Profile",
                caption: "User profile and settings"
            },
            {
                src: "Assets/Images/SentriSafe/ssUserControl.jpg",
                alt: "User Controls",
                caption: "User management and control panel"
            },
            {
                src: "Assets/Images/SentriSafe/ssLoginWeb.jpg",
                alt: "Web Login Interface",
                caption: "Web-based login and authentication"
            }
        ],
        status: "Completed",
        role: "Development Assistant"
    },
    'sohocafe': {
        title: "SohoCafe",
        description: "Cafe e-commerce platform with mobile ordering system, menu management, and comprehensive admin dashboard. Laravel backend with Flutter mobile application.",
        longDescription: "SohoCafe is a complete cafe management and ordering platform that bridges the gap between customers and cafe operations. Built with Flutter for a smooth mobile experience and Laravel for robust backend operations, the application provides customers with an intuitive menu browsing and ordering interface while giving cafe administrators powerful tools to manage products, orders, and business operations. The system includes real-time order tracking, inventory management, and sales analytics. As a development assistant on this project, I contributed to building the ordering flow, admin dashboard features, and integrating the mobile app with the backend API.",
        technologies: ["Flutter", "Dart", "Laravel", "PHP", "MySQL", "REST API"],
        features: [
            "Mobile menu browsing with categories and search",
            "Shopping cart and checkout system",
            "Real-time order tracking and status updates",
            "Admin dashboard for order management",
            "Product and inventory management",
            "Sales analytics and reporting",
            "User authentication and profiles",
            "Order history and reordering"
        ],
        images: [
            {
                src: "Assets/Images/SohoCafe/SohoCafeHome.jpg",
                alt: "SohoCafe Home",
                caption: "Cafe homepage and featured items"
            },
            {
                src: "Assets/Images/SohoCafe/SohoMenu.jpg",
                alt: "Menu Browsing",
                caption: "Interactive menu with categories"
            },
            {
                src: "Assets/Images/SohoCafe/SohoCart.jpg",
                alt: "Shopping Cart",
                caption: "Cart and checkout interface"
            },
            {
                src: "Assets/Images/SohoCafe/SohoAdminDash.jpg",
                alt: "Admin Dashboard",
                caption: "Administrative dashboard overview"
            },
            {
                src: "Assets/Images/SohoCafe/SohoAdminOrderList.jpg",
                alt: "Order Management",
                caption: "Order list and management panel"
            }
        ],
        status: "Completed",
        role: "Development Assistant"
    }
};

// Modal functions
window.openProjectModal = function (projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = project.title; modalContent.innerHTML = `
            <div class="space-y-6 order-2 lg:order-1">
                <div class="project-gallery">
                    ${project.images.map((image, index) => `
                        <div class="gallery-image modal-image-container">
                            <img src="${image.src}" alt="${image.alt}" class="modal-image" loading="lazy" onclick="openImageModal('${image.src}', '${image.alt}', '${image.caption}')">
                            <div class="image-zoom-overlay">
                                <i class="fas fa-expand"></i> Click to enlarge
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        <div class="space-y-6 order-1 lg:order-2">
            <div>
                <div class="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
                    <h3 class="text-lg sm:text-xl font-bold">Project Overview</h3>
                    <span class="px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${project.status === 'Live' ? 'bg-green-100 text-green-800' :
            project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
        }">${project.status}</span>
                    ${project.role ? `<span class="px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">${project.role}</span>` : ''}
                </div>
                <p class="text-gray-600 leading-relaxed text-sm sm:text-base">${project.longDescription}</p>
            </div>
            
            <div>
                <h4 class="text-base sm:text-lg font-bold mb-3">Technologies Used</h4>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `
                        <span class="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h4 class="text-base sm:text-lg font-bold mb-3">Key Features</h4>
                <ul class="space-y-2">
                    ${project.features.map(feature => `
                        <li class="flex items-start gap-2 sm:gap-3">
                            <i class="fas fa-check-circle text-primary mt-0.5 sm:mt-1 flex-shrink-0 text-sm"></i>
                            <span class="text-gray-600 text-sm sm:text-base">${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            ${project.link ? `
                <div class="pt-4 border-t border-gray-200">
                    <a href="${project.link}" target="_blank" class="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-primary/90 transition-colors text-sm sm:text-base">
                        <i class="fas fa-external-link-alt"></i>
                        Visit Live Project
                    </a>
                </div>
            ` : ''}
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}; window.closeProjectModal = function () {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
};

// Image Modal Functions
window.openImageModal = function (src, alt, caption) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalImageCaption');

    modalImage.src = src;
    modalImage.alt = alt;
    modalCaption.textContent = caption || alt;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeImageModal = function () {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
};    // Close modal when clicking outside
document.getElementById('projectModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeProjectModal();
    }
});

// Close image modal when clicking outside
document.getElementById('imageModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeImageModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        if (!document.getElementById('imageModal').classList.contains('hidden')) {
            closeImageModal();
        } else if (!document.getElementById('projectModal').classList.contains('hidden')) {
            closeProjectModal();
        }
    }
});

// Minimalistic Portfolio Script

// ---------------------------------------------------------------------------
// Contact delivery
//
// This site is static (GitHub Pages), so there is no server to post a form to.
// By default the Transmission Request opens a pre-filled draft in the visitor's
// own mail client, addressed to the email in the form's data-contact-email.
//
// To have submissions delivered straight to the inbox instead, get a free
// access key from https://web3forms.com (no account needed, they email you the
// key, 250 submissions/month) and paste it between the quotes below. Nothing
// else needs to change.
// ---------------------------------------------------------------------------
const WEB3FORMS_ACCESS_KEY = '';

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('#burger');
    const mobileMenu = document.querySelector('#mobile-menu');
    const scrollToTopBtn = document.querySelector('#scroll-to-top');
    const preloader = document.querySelector('#preloader');
    const contactForm = document.querySelector('#contactForm');
    const formStatus = document.querySelector('#formStatus');

    // Mobile menu toggle
    burger?.addEventListener('click', toggleMobileMenu);

    function toggleMobileMenu() {
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
            if (window.scrollY >= sectionTop - 200) {
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

    initRedactions();

    // Redaction bars. Each one is a <button>, so Enter and Space already fire
    // click; only the aria state and the declassify-all switches need wiring.
    function initRedactions() {
        const bars = Array.from(document.querySelectorAll('.redact'));
        const switches = Array.from(document.querySelectorAll('.declassify-toggle'));

        if (!bars.length) return;

        function setBar(bar, revealed) {
            bar.classList.toggle('revealed', revealed);
            bar.setAttribute('aria-expanded', String(revealed));
        }

        function syncSwitches() {
            const allRevealed = bars.every(bar => bar.classList.contains('revealed'));
            switches.forEach(button => {
                button.setAttribute('aria-pressed', String(allRevealed));
                button.textContent = allRevealed
                    ? button.dataset.labelOn || 'Reclassify All'
                    : button.dataset.labelOff || 'Declassify All';
            });
        }

        bars.forEach(bar => {
            bar.addEventListener('click', () => {
                setBar(bar, !bar.classList.contains('revealed'));
                syncSwitches();
            });
        });

        switches.forEach(button => {
            button.addEventListener('click', () => {
                const reveal = button.getAttribute('aria-pressed') !== 'true';
                bars.forEach(bar => setBar(bar, reveal));
                syncSwitches();
            });
        });
    }

    // ----------------------------------------------------------------------
    // Contact form
    // ----------------------------------------------------------------------
    contactForm?.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(e) {
        e.preventDefault();

        const fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            message: document.getElementById('message')
        };

        if (!validateForm(fields)) return;

        // Honeypot: only automated submissions tick a hidden checkbox.
        if (contactForm.querySelector('[name="botcheck"]')?.checked) return;

        const payload = {
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            message: fields.message.value.trim()
        };

        const button = contactForm.querySelector('button[type="submit"]');

        if (WEB3FORMS_ACCESS_KEY) {
            sendDirect(payload, button);
        } else {
            openMailDraft(payload, button);
        }
    }

    /** Default path: hand the message to the visitor's own mail client. */
    function openMailDraft(payload, button) {
        const recipient = contactForm.dataset.contactEmail;
        const subject = `Portfolio transmission from ${payload.name}`;
        const body = [
            `Name: ${payload.name}`,
            `Return address: ${payload.email}`,
            '',
            payload.message
        ].join('\n');

        window.location.href =
            `mailto:${recipient}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        setStatus(
            `Draft opened in your mail app — send it from there to complete the transmission. ` +
            `If nothing opened, write to ${recipient} directly.`
        );

        flashButton(button, 'Draft Opened');
    }

    /** Used once a Web3Forms access key is configured above. */
    async function sendDirect(payload, button) {
        const original = button.innerHTML;
        button.innerHTML = 'Transmitting...';
        button.disabled = true;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `Portfolio transmission from ${payload.name}`,
                    from_name: 'Portfolio Transmission Request',
                    ...payload
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus('Transmission received. Expect a reply shortly.');
                contactForm.reset();
                clearFormErrors();
                button.innerHTML = 'Transmission Received';
                button.classList.add('bg-stamp', 'border-stamp');
                setTimeout(() => {
                    button.innerHTML = original;
                    button.classList.remove('bg-stamp', 'border-stamp');
                    button.disabled = false;
                }, 3000);
                return;
            }

            throw new Error(result.message || 'Delivery refused');
        } catch (error) {
            setStatus(
                `Transmission failed (${error.message}). Falling back to a mail draft.`
            );
            button.innerHTML = original;
            button.disabled = false;
            openMailDraft(payload, button);
        }
    }

    function flashButton(button, label) {
        const original = button.innerHTML;
        button.innerHTML = label;
        button.classList.add('bg-stamp', 'border-stamp');

        setTimeout(() => {
            button.innerHTML = original;
            button.classList.remove('bg-stamp', 'border-stamp');
        }, 2500);
    }

    function setStatus(message) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.classList.remove('hidden');
    }

    function validateForm(fields) {
        let isValid = true;

        if (!fields.name.value.trim()) {
            showFieldError(fields.name, 'Please enter your name');
            isValid = false;
        } else {
            clearFieldError(fields.name);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fields.email.value.trim()) {
            showFieldError(fields.email, 'Please enter your email');
            isValid = false;
        } else if (!emailPattern.test(fields.email.value)) {
            showFieldError(fields.email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearFieldError(fields.email);
        }

        if (!fields.message.value.trim()) {
            showFieldError(fields.message, 'Please enter your message');
            isValid = false;
        } else if (fields.message.value.trim().length < 10) {
            showFieldError(fields.message, 'Message too short (min 10 characters)');
            isValid = false;
        } else {
            clearFieldError(fields.message);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('border-red-500');

        const existingError = field.parentElement.querySelector('.error-message');
        existingError?.remove();

        const errorElement = document.createElement('p');
        errorElement.className = 'error-message file-meta file-meta--stamp mt-1';
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

    // Clear a field's error as soon as the visitor starts fixing it
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

    // Card buttons open their file
    document.querySelectorAll('.project-open').forEach(button => {
        button.addEventListener('click', () => openProjectModal(button.dataset.project));
    });

    document.querySelectorAll('[data-close-project]').forEach(button => {
        button.addEventListener('click', closeProjectModal);
    });

    document.querySelectorAll('[data-close-image]').forEach(button => {
        button.addEventListener('click', closeImageModal);
    });

    // Close either modal by clicking its backdrop
    document.getElementById('projectModal')?.addEventListener('click', function (e) {
        if (e.target === this) closeProjectModal();
    });

    document.getElementById('imageModal')?.addEventListener('click', function (e) {
        if (e.target === this) closeImageModal();
    });
});

// ---------------------------------------------------------------------------
// Project files
//
// The copy lives in src/data/projects.ts and is serialised into the page as a
// JSON script tag, so the cards and this modal can never drift apart.
// ---------------------------------------------------------------------------
let projectData = null;

function getProjectData() {
    if (projectData) return projectData;

    const node = document.getElementById('project-data');
    try {
        projectData = node ? JSON.parse(node.textContent) : {};
    } catch (error) {
        console.error('Could not read project data', error);
        projectData = {};
    }
    return projectData;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Exhibits for the file currently on screen, looked up by index on click. */
let activeExhibits = [];

/** Matches the folder open/close choreography in dossier.css. */
const FOLDER_CLOSE_MS = 480;
let folderTimer = null;

window.openProjectModal = function (projectId) {
    const project = getProjectData()[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const folder = document.getElementById('dossierFolder');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    activeExhibits = project.images;

    const statusChip = project.status === 'Completed' ? 'chip-ink' : 'chip-stamp';

    modalTitle.textContent = project.title;
    modalContent.innerHTML = `
        <div class="space-y-4 order-2 lg:order-1">
            <div class="flex items-center gap-3">
                <span class="chip-ink">Evidence Log</span>
                <span class="file-meta">${project.images.length} Exhibits Attached</span>
            </div>
            <div class="project-gallery">
                ${project.images.map((image, index) => `
                    <button type="button" class="gallery-image modal-image-container" data-exhibit="${index}">
                        <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" class="modal-image" loading="lazy">
                        <span class="image-zoom-overlay">Enlarge Exhibit</span>
                    </button>
                `).join('')}
            </div>
        </div>

        <div class="space-y-6 order-1 lg:order-2">
            <div>
                <div class="flex items-center gap-2 mb-3 flex-wrap">
                    <span class="chip-ink">Clearance</span>
                    <span class="${statusChip}">${escapeHtml(project.status)}</span>
                    ${project.role ? `<span class="tag-code">${escapeHtml(project.role)}</span>` : ''}
                </div>
                <hr class="rule-stamp mb-4">
                <p class="text-accent leading-relaxed text-sm sm:text-base">${escapeHtml(project.longDescription)}</p>
            </div>

            <div>
                <h4 class="font-stencil uppercase text-ink mb-3 pb-2 border-b border-ink">Technology Manifest</h4>
                <div class="flex flex-wrap gap-1.5">
                    ${project.technologies.map(tech => `<span class="tag-code">${escapeHtml(tech)}</span>`).join('')}
                </div>
            </div>

            <div>
                <h4 class="font-stencil uppercase text-ink mb-3 pb-2 border-b border-ink">Operational Capabilities</h4>
                <ul class="space-y-1.5">
                    ${project.features.map(feature => `
                        <li class="flex items-start gap-2">
                            <span class="file-meta file-meta--stamp flex-shrink-0 mt-0.5">&#9642;</span>
                            <span class="text-accent text-sm">${escapeHtml(feature)}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            ${project.link ? `
                <div class="pt-4 border-t-2 border-ink">
                    <a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer" class="btn-dossier">
                        Access Live Site &rarr;
                    </a>
                </div>
            ` : ''}
        </div>
    `;

    modalContent.querySelectorAll('[data-exhibit]').forEach(button => {
        button.addEventListener('click', () => {
            const exhibit = activeExhibits[Number(button.dataset.exhibit)];
            if (exhibit) openImageModal(exhibit.src, exhibit.alt, exhibit.caption);
        });
    });

    clearTimeout(folderTimer);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    folder.classList.remove('is-closing');
    folder.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    // Commit the closed state before flipping to open, otherwise the browser
    // collapses both into one frame and the folder never appears to unfold.
    void folder.offsetWidth;
    requestAnimationFrame(() => folder.classList.add('is-open'));
};

window.closeProjectModal = function () {
    const modal = document.getElementById('projectModal');
    const folder = document.getElementById('dossierFolder');

    if (modal.classList.contains('hidden')) return;

    clearTimeout(folderTimer);
    folder.classList.add('is-closing');
    folder.classList.remove('is-open');

    folderTimer = setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        folder.classList.remove('is-closing');
        document.body.style.overflow = 'auto';
    }, prefersReducedMotion() ? 0 : FOLDER_CLOSE_MS);
};

// ---------------------------------------------------------------------------
// Exhibit lightbox
// ---------------------------------------------------------------------------
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

    // The case folder may still be open underneath, so only release the page
    // scroll once nothing is layered on top of it.
    const projectModal = document.getElementById('projectModal');
    if (projectModal?.classList.contains('hidden')) {
        document.body.style.overflow = 'auto';
    }
};

// Escape closes the topmost layer first
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    if (!document.getElementById('imageModal').classList.contains('hidden')) {
        closeImageModal();
    } else if (!document.getElementById('projectModal').classList.contains('hidden')) {
        closeProjectModal();
    }
});

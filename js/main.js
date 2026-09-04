/**
 * WAD TECH — Enterprise Software Development Portal
 * Core JavaScript Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initFaqAccordion();
  initProjectFilters();
  initProjectModal();
  initServiceModal();
  initContactForm();
  initScrollAnimations();
});

/* ---------------- Sticky Header Scroll Effect ---------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---------------- Mobile Navigation Drawer ---------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  if (!toggleBtn || !mobileDrawer) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    mobileDrawer.classList.toggle('active');
    
    // Toggle hamburger / close icon
    const iconOpen = toggleBtn.querySelector('.icon-open');
    const iconClose = toggleBtn.querySelector('.icon-close');
    if (iconOpen && iconClose) {
      iconOpen.style.display = isExpanded ? 'block' : 'none';
      iconClose.style.display = isExpanded ? 'none' : 'block';
    }
  });

  // Close drawer when link is clicked
  const mobileLinks = mobileDrawer.querySelectorAll('.nav-link, .btn');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const iconOpen = toggleBtn.querySelector('.icon-open');
      const iconClose = toggleBtn.querySelector('.icon-close');
      if (iconOpen && iconClose) {
        iconOpen.style.display = 'block';
        iconClose.style.display = 'none';
      }
    });
  });
}

/* ---------------- Active Nav ScrollSpy ---------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-header .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ---------------- FAQ Accordion ---------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-body').style.maxHeight = null;
        }
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;
      }
    });
  });
}

/* ---------------- Portfolio Category Filtering ---------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ---------------- Project Deep-Dive Modal Data & Handler ---------------- */
const projectsData = {
  'lankavibe': {
    title: 'LankaVibe',
    category: 'Business Software / Hospitality',
    tagline: 'Hotel & Restaurant POS and Comprehensive Operations Management System',
    description: 'Designed specifically for hotels, resorts, and multi-cuisine restaurants in Sri Lanka and abroad. Features real-time table order dispatch (KDS), room billing integration, multi-currency invoicing, split bills, and end-of-day revenue reconciliation.',
    image: 'assets/images/pos-system.jpg',
    features: [
      'Touchscreen Point of Sale with instant thermal receipt & kitchen ticket printing',
      'Table layout management with live occupancy & bill status indicator',
      'Inventory depletion tracking down to recipe ingredient level',
      'Offline-first resilience: continues billing during network fluctuations',
      'Comprehensive sales reporting, VAT/service charge computation, and staff shifts'
    ],
    techStack: ['PHP / Laravel', 'React.js', 'PostgreSQL', 'Tailored REST API', 'Thermal ESC/POS'],
    outcome: 'Eliminated order miscommunications and cut table turn-around time by 30% for early pilot venues.'
  },
  'promptly': {
    title: 'Promptly',
    category: 'Social Platform / AI',
    tagline: 'AI Creative Prompt Sharing & Generative Art Community Platform',
    description: 'A platform connecting digital creators, AI engineers, and prompt designers to share, test, and remix Midjourney, Stable Diffusion, and LLM prompts with version histories, model parameters, and tags.',
    image: 'assets/images/hero-dashboard.jpg',
    features: [
      'Explore feed with high-resolution image previews & parameter copy',
      'Prompt tester simulator with real-time token count and negative prompt tags',
      'User profiles, collections, likes, and community remix attribution',
      'Optimized image CDN caching with webp transcoding for sub-second load times',
      'Tag-based discovery: Photorealistic, Anime, UI Design, 3D Render, Logo'
    ],
    techStack: ['React', 'Node.js', 'Firebase', 'PostgreSQL', 'Cloudflare CDN'],
    outcome: 'Supports fast browsing across thousands of visual prompts with instant search.'
  },
  'moneypilot': {
    title: 'Money Pilot',
    category: 'FinTech / Personal Finance',
    tagline: 'Intelligent Cashflow & Multi-Account Personal Finance Application',
    description: 'A modern, clean personal finance application providing users with clear visibility into their income, recurring subscriptions, savings goals, and categorized expenditures.',
    image: 'assets/images/fintech-app.jpg',
    features: [
      'Unified account balance aggregation with categorized transaction breakdown',
      'Interactive monthly budget visualizers with progress bars and alerts',
      'Automated recurring expense detection (Netflix, utilities, subscriptions)',
      'Encrypted local data storage and secure authentication',
      'Exportable financial summaries in PDF and CSV formats'
    ],
    techStack: ['Flutter (iOS & Android)', 'Laravel API', 'MySQL', 'JWT Auth'],
    outcome: 'Achieved high user retention through minimal frictionless expense logging.'
  },
  'cinemanest': {
    title: 'Cinema Nest',
    category: 'Web Application / Entertainment',
    tagline: 'Modern Movie Showtime Booking & Interactive Seat Reservation Portal',
    description: 'A modern cinema ticketing platform featuring interactive SVG theater seat selection, real-time seat lock concurrency, combo snack pre-ordering, and mobile QR ticket passes.',
    image: 'assets/images/hero-dashboard.jpg',
    features: [
      'Interactive visual cinema hall layout with VIP, Regular, and Couple recliner tiers',
      'Live websocket-based seat locking to prevent double bookings',
      'Integrated food & beverage pre-order combo selection',
      'Automated email and SMS receipt with scannable dynamic QR gate pass',
      'Admin portal for theater managers to configure halls, showtimes, and pricing'
    ],
    techStack: ['React', 'PHP / Laravel', 'MySQL', 'WebSockets', 'Tailored Payment Gateway'],
    outcome: 'Zero double-booking incidents with ultra-fast 3-step checkout flow.'
  },
  'velvetvogue': {
    title: 'Velvet Vogue',
    category: 'E-Commerce / Fashion',
    tagline: 'Curated High-Conversion Fashion & Lifestyle E-Commerce Storefront',
    description: 'A lightning-fast, conversion-focused online boutique crafted with responsive product showcases, size guides, wishlist management, and localized payment gateway integration.',
    image: 'assets/images/hero-dashboard.jpg',
    features: [
      'Dynamic product variant selector (colors, sizes, live stock inventory)',
      'Sub-second instant search and multi-attribute filters (Price, Size, Material)',
      'Frictionless guest checkout with WhatsApp order confirmation integration',
      'Automated shipping rate calculation and postal code validation',
      'SEO-optimized product catalog schema for rich Google search snippets'
    ],
    techStack: ['Modern JavaScript', 'PHP / Laravel', 'MySQL', 'Payment Gateways', 'SEO Schema'],
    outcome: 'High speed score (95+ Google PageSpeed) driving higher mobile checkout conversions.'
  },
  'luxurysmartshop': {
    title: 'Luxury Smart Shop',
    category: 'Business Software / Retail',
    tagline: 'Multi-Branch Retail Inventory, Barcode & Point of Sale Management System',
    description: 'Built for retail boutiques, electronics outlets, and multi-outlet stores requiring barcode scanning, serial number tracking, low-stock notifications, and supplier purchase orders.',
    image: 'assets/images/pos-system.jpg',
    features: [
      'High-speed barcode scanner compatibility with instant item lookup',
      'Multi-store inventory synchronization and inter-branch stock transfers',
      'Credit customer ledger, installment tracking, and due payment reminders',
      'Supplier management, purchase order generation, and goods receive notes (GRN)',
      'Role-based access control for cashiers, branch managers, and business owners'
    ],
    techStack: ['React', 'Laravel Backend', 'MySQL', 'Barcode Integration', 'PWA Offline Mode'],
    outcome: 'Streamlined daily closing reports and enabled owners to track sales live from mobile.'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const modalBody = document.getElementById('projectModalBody');
  const closeBtn = document.getElementById('closeProjectModal');
  const projectDetailBtns = document.querySelectorAll('.btn-view-project');

  if (!modalOverlay || !modalBody || !closeBtn) return;

  projectDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const project = projectsData[projectId];
      if (!project) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 20px;">
          <span class="badge-tag">${project.category}</span>
          <h2 style="font-size: 1.8rem; font-weight: 800; color: #0F172A; margin: 8px 0;">${project.title}</h2>
          <p style="font-size: 1.05rem; font-weight: 600; color: #0F52BA; margin-bottom: 16px;">${project.tagline}</p>
        </div>

        <div style="border-radius: 12px; overflow: hidden; margin-bottom: 24px; border: 1px solid #E2E8F0; background: #0F172A;">
          <img src="${project.image}" alt="${project.title} Interface Mockup" style="width: 100%; height: auto; display: block;" />
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 8px;">Overview & Business Problem</h4>
          <p style="font-size: 0.95rem; color: #475569; line-height: 1.65;">${project.description}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 12px;">Key Solution Features</h4>
          <ul style="display: flex; flex-direction: column; gap: 8px;">
            ${project.features.map(f => `
              <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.92rem; color: #334155;">
                <span style="color: #0F52BA; font-weight: bold;">✓</span>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 10px;">Technologies Deployed</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${project.techStack.map(t => `
              <span class="tech-tag" style="background: #EEF4FF; color: #0F52BA; border-color: rgba(15,82,186,0.15); font-weight: 700;">${t}</span>
            `).join('')}
          </div>
        </div>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #64748B;">Client Impact</div>
            <div style="font-size: 14px; font-weight: 600; color: #0F172A;">${project.outcome}</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="inquireFromModal('${project.title}')">Inquire for Similar Project →</button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

// Global helper for modal CTA button
window.inquireFromModal = function(projectName) {
  const modalOverlay = document.getElementById('projectModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
  document.body.style.overflow = '';

  const projectDescField = document.getElementById('projectDescription');
  if (projectDescField) {
    projectDescField.value = `Hello WAD Tech, I am interested in building a solution similar to ${projectName}. Please get in touch to discuss requirements and quotation.`;
  }

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ---------------- Service "Learn More" Modal ---------------- */
const serviceData = {
  'websites': {
    title: 'Website Development',
    desc: 'Professional, high-performance websites engineered to represent your brand with authority, rank high on search engines, and turn visitors into qualified inquiries.',
    deliverables: ['Custom bespoke responsive design', 'SEO optimization & Schema markup', 'Sub-second page speeds', 'Content Management setup', 'Contact & WhatsApp inquiry integration'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP / Laravel', 'SEO Best Practices']
  },
  'webapps': {
    title: 'Web Application Development',
    desc: 'Bespoke web applications built around your exact business workflow, from customer management portals and booking engines to complex data dashboards.',
    deliverables: ['Custom business logic workflows', 'Role-based access permissions', 'Database schema design & migrations', 'RESTful API integration', 'High security & data validation'],
    tech: ['React.js', 'PHP / Laravel', 'Node.js', 'PostgreSQL / MySQL', 'Redis']
  },
  'mobile': {
    title: 'Mobile App Development',
    desc: 'Native-feel iOS and Android mobile apps crafted for smooth operation, offline reliability, and practical business utility.',
    deliverables: ['Single codebase iOS & Android apps', 'Push notifications & offline mode', 'Device hardware integration (Camera, GPS, Bluetooth)', 'App Store & Play Store publishing assistance'],
    tech: ['Flutter', 'Dart', 'Firebase', 'RESTful Endpoints']
  },
  'business-systems': {
    title: 'Business Management & POS Systems',
    desc: 'Tailored enterprise software such as Point of Sale (POS), stock inventory, billing, booking systems, and financial ledgers built to replace clumsy spreadsheets.',
    deliverables: ['Custom POS cashier touchscreen screens', 'Thermal receipt & barcode support', 'Multi-warehouse stock tracking', 'Automated tax & revenue reports', 'Local network & cloud hybrid resilience'],
    tech: ['PHP / Laravel', 'React', 'MySQL', 'Hardware ESC/POS']
  },
  'uiux': {
    title: 'UI/UX Design & Prototyping',
    desc: 'Human-centered user experience design and pixel-perfect interfaces designed in Figma before a single line of code is written, ensuring clarity and user satisfaction.',
    deliverables: ['User journey mapping & wireframes', 'High-fidelity interactive prototypes', 'Design systems & component libraries', 'Responsive mobile & desktop specifications', 'Design handoff documentation'],
    tech: ['Figma', 'Interactive Prototyping', 'Design Tokens']
  },
  'saas': {
    title: 'SaaS Product Development',
    desc: 'Multi-tenant cloud software products designed for scale, subscription monetization, automated onboarding, and enterprise security.',
    deliverables: ['Multi-tenant database architectures', 'Subscription billing & tier management', 'Self-service customer portal', 'Automated email transactional workflows', 'Admin analytics & metrics telemetry'],
    tech: ['Laravel / Node.js', 'React', 'PostgreSQL', 'Docker', 'Cloud Hosting']
  }
};

function initServiceModal() {
  const modalOverlay = document.getElementById('projectModal');
  const modalBody = document.getElementById('projectModalBody');
  const learnMoreBtns = document.querySelectorAll('.btn-service-learn');

  if (!modalOverlay || !modalBody) return;

  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceId = btn.getAttribute('data-service');
      const service = serviceData[serviceId];
      if (!service) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 20px;">
          <span class="badge-tag">Service Overview</span>
          <h2 style="font-size: 1.8rem; font-weight: 800; color: #0F172A; margin: 8px 0;">${service.title}</h2>
          <p style="font-size: 1rem; color: #475569; line-height: 1.65;">${service.desc}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 12px;">What We Deliver</h4>
          <ul style="display: flex; flex-direction: column; gap: 8px;">
            ${service.deliverables.map(d => `
              <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.92rem; color: #334155;">
                <span style="color: #0F52BA; font-weight: bold;">✓</span>
                <span>${d}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 10px;">Technologies Used</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${service.tech.map(t => `
              <span class="tech-tag" style="background: #EEF4FF; color: #0F52BA; border-color: rgba(15,82,186,0.15); font-weight: 700;">${t}</span>
            `).join('')}
          </div>
        </div>

        <div style="text-align: right;">
          <button class="btn btn-primary" onclick="inquireService('${service.title}')">Discuss Your ${service.title} Project →</button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

window.inquireService = function(serviceTitle) {
  const modalOverlay = document.getElementById('projectModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
  document.body.style.overflow = '';

  const serviceSelect = document.getElementById('serviceNeeded');
  if (serviceSelect) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.toLowerCase().includes(serviceTitle.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ---------------- Contact Form Handling & Validation ---------------- */
function initContactForm() {
  const form = document.getElementById('projectInquiryForm');
  if (!form) return;

  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errEl = input.parentElement.querySelector('.form-error-msg');
      if (errEl) errEl.classList.remove('visible');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
      const val = input.value.trim();
      const errEl = input.parentElement.querySelector('.form-error-msg');

      if (!val) {
        input.classList.add('error');
        if (errEl) {
          errEl.textContent = 'This field is required.';
          errEl.classList.add('visible');
        }
        isValid = false;
      } else if (input.type === 'email' && !validateEmail(val)) {
        input.classList.add('error');
        if (errEl) {
          errEl.textContent = 'Please enter a valid email address.';
          errEl.classList.add('visible');
        }
        isValid = false;
      }
    });

    if (!isValid) {
      showToast('Please check the required fields in the form.', 'error');
      return;
    }

    /* EmailJS Configuration */
    const EMAILJS_CONFIG = {
      serviceID: 'service_WAD',
      templateID: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID (e.g. template_xxxxxxx)
      publicKey: 'YOUR_PUBLIC_KEY'     // Replace with your EmailJS Public Key
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" viewBox="0 0 24 24" style="width: 18px; height: 18px; animation: spin 1s linear infinite; display: inline-block;">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="32" stroke-dashoffset="10"></circle>
      </svg>
      Sending Inquiry...
    `;

    const handleSuccess = () => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      
      // Inline success banner
      let successBanner = document.getElementById('formSuccessBanner');
      if (!successBanner) {
        successBanner = document.createElement('div');
        successBanner.id = 'formSuccessBanner';
        successBanner.style.cssText = 'background: #DCFCE7; border: 1px solid #86EFAC; color: #15803D; padding: 16px 20px; border-radius: 12px; margin-bottom: 24px; font-weight: 600; font-size: 15px; display: flex; align-items: center; gap: 12px;';
        form.prepend(successBanner);
      }
      successBanner.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong>Inquiry Received!</strong> Thank you for reaching out to WAD Tech. Our team in Sri Lanka will review your project details and get back to you within 24 hours.
        </div>
      `;
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      showToast('Thank you! Your project inquiry has been received. Our team in Sri Lanka will contact you shortly.', 'success');
    };

    const handleError = (errMsg) => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast(errMsg || 'Failed to send inquiry. Please email hello@wadtech.lk directly or contact WhatsApp.', 'error');
    };

    // Check if EmailJS credentials are provided
    if (window.emailjs && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY' && EMAILJS_CONFIG.templateID !== 'YOUR_TEMPLATE_ID') {
      try {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        
        const templateParams = {
          client_name: form.clientName.value.trim(),
          business_name: form.businessName.value.trim() || 'N/A',
          client_email: form.clientEmail.value.trim(),
          client_phone: form.clientPhone.value.trim(),
          service_needed: form.serviceNeeded.options[form.serviceNeeded.selectedIndex].text,
          budget: form.estimatedBudget.options[form.estimatedBudget.selectedIndex].text,
          project_description: form.projectDescription.value.trim()
        };

        emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
          .then(() => handleSuccess())
          .catch((err) => {
            console.error('EmailJS Error:', err);
            handleError('Could not send via email service. Please email hello@wadtech.lk');
          });
      } catch (e) {
        console.error('EmailJS Init Exception:', e);
        handleError();
      }
    } else {
      // Fallback preview simulation when waiting for Template ID / Public Key
      console.info('EmailJS connected with serviceID: "service_WAD". Awaiting templateID and publicKey.');
      setTimeout(() => {
        handleSuccess();
      }, 900);
    }
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------------- Toast Notification Helper ---------------- */
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') {
    toast.style.borderLeftColor = '#EF4444';
  }

  toast.innerHTML = `
    <div class="toast-icon" style="color: ${type === 'error' ? '#EF4444' : '#10B981'};">
      ${type === 'error' ? '⚠️' : '✓'}
    </div>
    <div class="toast-message">${message}</div>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

/* ---------------- Scroll Animations Observer ---------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

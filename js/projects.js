// Projects JavaScript - Handle projects, filtering, and pagination

// Projects data
const projectsData = [
    {
        id: 1,
        title: 'Tech Startup Landing Page',
        category: 'web',
        description: 'Landing page focused on lead generation for a productivity app.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        image: 'src/assets/ecommerce-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        date: '2024-03-15'
    },
    {
        id: 2,
        title: 'Urban Clothing E-commerce',
        category: 'web',
        description: 'Online store with shopping cart and payment integration.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        image: 'src/assets/saas-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        date: '2024-03-10'
    },
    {
        id: 3,
        title: 'Minimalist Personal Portfolio',
        category: 'web',
        description: 'Professional portfolio website with subtle animations.',
        tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
        image: 'src/assets/portfolio-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-03-05'
    },
    {
        id: 4,
        title: 'Gastronomy Blog',
        category: 'web',
        description: 'Recipe blog with search functionality and categories.',
        tags: ['WordPress', 'PHP', 'MySQL'],
        image: 'src/assets/ecommerce-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-02-28'
    },
    {
        id: 5,
        title: 'Task Manager Web App',
        category: 'web',
        description: 'To-do list app with CRUD features and cloud storage.',
        tags: ['React', 'Firebase'],
        image: 'src/assets/saas-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-02-20'
    },
    {
        id: 6,
        title: 'Fitness Mobile App',
        category: 'mobile',
        description: 'Responsive app with workout routines and progress tracking.',
        tags: ['React Native', 'Expo', 'Firebase'],
        image: 'src/assets/fitness-mockup.jpg',
        deviceType: 'mobile',
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        date: '2024-02-15'
    },
    {
        id: 7,
        title: 'Data Analytics Dashboard',
        category: 'web',
        description: 'Dashboard with metrics visualization and interactive reports.',
        tags: ['Vue.js', 'Chart.js', 'TailwindCSS'],
        image: 'src/assets/portfolio-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-02-10'
    },
    {
        id: 8,
        title: 'Netflix Clone',
        category: 'web',
        description: 'Streaming platform with categories and video player.',
        tags: ['React', 'Firebase', 'TMDB API'],
        image: 'src/assets/ecommerce-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        date: '2024-02-05'
    },
    {
        id: 9,
        title: 'Travel Agency Website',
        category: 'web',
        description: 'Website with catalog of travel packages and online booking.',
        tags: ['Next.js', 'TailwindCSS', 'Node.js'],
        image: 'src/assets/saas-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-01-30'
    },
    {
        id: 10,
        title: 'Digital Products Marketplace',
        category: 'web',
        description: 'Platform for selling templates, ebooks, and online courses.',
        tags: ['Laravel', 'MySQL', 'PayPal API'],
        image: 'src/assets/portfolio-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-01-25'
    },
    {
        id: 11,
        title: 'Recipe Mobile App',
        category: 'mobile',
        description: 'App with search by ingredients and illustrated steps.',
        tags: ['Flutter', 'Dart', 'SQLite'],
        image: 'src/assets/social-mockup.jpg',
        deviceType: 'mobile',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-01-20'
    },
    {
        id: 12,
        title: 'News Website',
        category: 'web',
        description: 'News portal with categories, highlights, and admin panel.',
        tags: ['WordPress', 'PHP', 'MySQL'],
        image: 'src/assets/ecommerce-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-01-15'
    },
    {
        id: 13,
        title: 'Online Learning Platform',
        category: 'saas',
        description: 'Educational site with video lessons, forums, and certification.',
        tags: ['React', 'Node.js', 'PostgreSQL'],
        image: 'src/assets/saas-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        date: '2024-01-10'
    },
    {
        id: 14,
        title: 'Real-time Chat App',
        category: 'web',
        description: 'Messaging app with authentication and live chat.',
        tags: ['Socket.io', 'Node.js', 'Express', 'MongoDB'],
        image: 'src/assets/portfolio-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2024-01-05'
    },
    {
        id: 15,
        title: '3D Creative Portfolio',
        category: 'ui-ux',
        description: 'Portfolio site with interactive 3D models and animations.',
        tags: ['Three.js', 'WebGL', 'React'],
        image: 'src/assets/ecommerce-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2023-12-30'
    },
    {
        id: 16,
        title: 'Food Delivery Mobile App',
        category: 'mobile',
        description: 'Ordering app with real-time tracking and map integration.',
        tags: ['React Native', 'Firebase', 'Google Maps API'],
        image: 'src/assets/banking-mockup.jpg',
        deviceType: 'mobile',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2023-12-25'
    },
    {
        id: 17,
        title: 'Crowdfunding Platform',
        category: 'saas',
        description: 'Fundraising website with project profiles and payments.',
        tags: ['Django', 'Python', 'PostgreSQL'],
        image: 'src/assets/saas-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2023-12-20'
    },
    {
        id: 18,
        title: 'Personal Finance Mobile App',
        category: 'mobile',
        description: 'App for tracking expenses and income with dynamic charts.',
        tags: ['Flutter', 'Firebase', 'Hive DB'],
        image: 'src/assets/fitness-mockup.jpg',
        deviceType: 'mobile',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2023-12-15'
    },
    {
        id: 19,
        title: 'Event Website',
        category: 'ui-ux',
        description: 'Conference site with tickets and interactive agenda.',
        tags: ['Angular', 'Firebase', 'Stripe'],
        image: 'src/assets/portfolio-mockup.jpg',
        deviceType: 'desktop',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2023-12-10'
    },
    {
        id: 20,
        title: 'AR Virtual Store',
        category: 'mobile',
        description: 'E-commerce with augmented reality product previews.',
        tags: ['React', 'AR.js', 'Node.js'],
        image: 'src/assets/social-mockup.jpg',
        deviceType: 'mobile',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        date: '2023-12-05'
    }
];

function initProjects() {
    app.projects = projectsData;
    app.filteredProjects = [...projectsData];
    
    setupFilters();
    setupSearch();
    renderProjects();
    setupPagination();
    setupProjectModal();
}

// Setup filter controls
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply filter
            app.currentFilter = filter;
            app.currentPage = 1;
            filterProjects();
        });
    });
    
    // Update filter counts
    updateFilterCounts();
}

// Update filter counts
function updateFilterCounts() {
    const counts = {
        all: app.projects.length,
        web: app.projects.filter(p => p.category === 'web').length,
        mobile: app.projects.filter(p => p.category === 'mobile').length,
        'ui-ux': app.projects.filter(p => p.category === 'ui-ux').length,
        saas: app.projects.filter(p => p.category === 'saas').length
    };
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filter = btn.dataset.filter;
        const countElement = btn.querySelector('.filter-count');
        if (countElement) {
            countElement.textContent = counts[filter] || 0;
        }
    });
}

// Setup search
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', window.utils.debounce((e) => {
            app.searchQuery = e.target.value.toLowerCase();
            app.currentPage = 1;
            filterProjects();
        }, 300));
    }
}

// Filter projects
function filterProjects() {
    let filtered = [...app.projects];
    
    // Apply category filter
    if (app.currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === app.currentFilter);
    }
    
    // Apply search filter
    if (app.searchQuery) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(app.searchQuery) ||
            p.description.toLowerCase().includes(app.searchQuery) ||
            p.tags.some(tag => tag.toLowerCase().includes(app.searchQuery))
        );
    }
    
    app.filteredProjects = filtered;
    renderProjects();
    setupPagination();
}

// Render projects
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    const start = (app.currentPage - 1) * app.itemsPerPage;
    const end = start + app.itemsPerPage;
    const projectsToShow = app.filteredProjects.slice(start, end);
    
    if (projectsToShow.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <h3 class="empty-state-title">No projects found</h3>
                <p class="empty-state-description">Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = projectsToShow.map(project => createProjectCard(project)).join('');
    
    // Add stagger animation
    setTimeout(() => {
        container.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 100);
        });
    }, 100);
}

// Create project card HTML
function createProjectCard(project) {
    const mockup = project.deviceType === 'mobile' 
        ? createIphoneMockup(project.image)
        : createMacbookMockup(project.image);
    
    return `
        <div class="project-card animate-on-scroll" data-id="${project.id}">
            ${project.featured ? '<span class="badge featured">Featured</span>' : ''}
            <div class="project-card-image">
                ${mockup}
            </div>
            <div class="project-card-content">
                <span class="project-category">${getCategoryLabel(project.category)}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link" target="_blank">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Live Demo
                    </a>
                    <a href="${project.githubUrl}" class="project-link" target="_blank">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Create MacBook mockup
function createMacbookMockup(image) {
    return `
        <div class="macbook-mockup">
            <div class="macbook-screen">
                <div class="macbook-notch"></div>
                <div class="macbook-display">
                    <img src="${image}" alt="Project screenshot" loading="lazy">
                </div>
            </div>
            <div class="macbook-base">
                <div class="macbook-notch-bottom"></div>
            </div>
        </div>
    `;
}

// Create iPhone mockup
function createIphoneMockup(image) {
    return `
        <div class="iphone-mockup">
            <div class="iphone-frame">
                <div class="iphone-screen">
                    <div class="iphone-notch"></div>
                    <div class="iphone-display">
                        <img src="${image}" alt="Mobile app screenshot" loading="lazy">
                    </div>
                </div>
                <div class="iphone-button iphone-power"></div>
                <div class="iphone-button iphone-volume-up"></div>
                <div class="iphone-button iphone-volume-down"></div>
                <div class="iphone-button iphone-mute"></div>
            </div>
        </div>
    `;
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'web': 'Web Development',
        'mobile': 'Mobile App',
        'ui-ux': 'UI/UX Design',
        'saas': 'SaaS Product'
    };
    return labels[category] || category;
}

// Setup pagination
function setupPagination() {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    const totalPages = Math.ceil(app.filteredProjects.length / app.itemsPerPage);
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Previous button
    html += `
        <button class="page-btn" ${app.currentPage === 1 ? 'disabled' : ''} data-page="${app.currentPage - 1}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <polyline points="15 18 9 12 15 6"/>
            </svg>
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= app.currentPage - 1 && i <= app.currentPage + 1)
        ) {
            html += `<button class="page-btn ${i === app.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        } else if (i === app.currentPage - 2 || i === app.currentPage + 2) {
            html += '<span>...</span>';
        }
    }
    
    // Next button
    html += `
        <button class="page-btn" ${app.currentPage === totalPages ? 'disabled' : ''} data-page="${app.currentPage + 1}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <polyline points="9 18 15 12 9 6"/>
            </svg>
        </button>
    `;
    
    container.innerHTML = html;
    
    // Add event listeners
    container.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
            app.currentPage = parseInt(btn.dataset.page);
            renderProjects();
            setupPagination();
            
            // Scroll to projects section
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Setup project modal
function setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = modal?.querySelector('.modal-close');
    const modalBody = modal?.querySelector('.modal-body');
    
    if (!modal) return;
    
    // Open modal on project click
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = parseInt(card.dataset.id);
            const project = app.projects.find(p => p.id === projectId);
            
            if (project) {
                openProjectModal(project, modalBody);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
    
    // Close modal
    modalClose?.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on outside click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Open project modal
function openProjectModal(project, modalBody) {
    const mockup = project.deviceType === 'mobile' 
        ? createIphoneMockup(project.image)
        : createMacbookMockup(project.image);
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <div class="modal-project-image">
                ${mockup}
            </div>
            <div class="modal-project-header">
                <div>
                    <h2 class="modal-project-title">${project.title}</h2>
                    <div class="modal-project-meta">
                        <span>${getCategoryLabel(project.category)}</span>
                        <span>•</span>
                        <span>${window.utils.formatDate(project.date)}</span>
                    </div>
                </div>
                ${project.featured ? '<span class="badge featured">Featured</span>' : ''}
            </div>
            <p class="modal-project-description">
                ${project.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="modal-project-tech">
                <h3>Technologies Used</h3>
                <div class="tech-list">
                    ${project.tags.map(tag => `<span class="tech-item">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="project-links">
                <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    View Live Demo
                </a>
                <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                </a>
            </div>
        </div>
    `;
}
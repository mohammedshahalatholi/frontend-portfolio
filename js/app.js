/**
 * app.js
 * Full, production-ready frontend script for Portfolio
 * Backend API: https://mohammedshahal.pythonanywhere.com/api
 *
 * Replace existing frontend/js/app.js with this file.
 */

// -----------------------------
// API BASE URL
// -----------------------------
const getApiBaseUrl = () => {
    // Manual override from index.html (recommended for production)
    if (window.API_BASE_URL) {
        return window.API_BASE_URL.replace(/\/$/, ''); // remove trailing slash if any
    }

    // Local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000/api';
    }

    // Production default (your PythonAnywhere backend)
    return 'https://mohammedshahal.pythonanywhere.com/api';
};

const API_BASE_URL = getApiBaseUrl();

// -----------------------------
// Helpers
// -----------------------------
const safeText = (value, fallback = '') => (value === null || value === undefined ? fallback : value);
const toArray = (data) => (Array.isArray(data) ? data : (data && data.results ? data.results : []));

// Quick fetch helper with JSON parsing and error messages
async function fetchJson(url, opts = {}) {
    try {
        const res = await fetch(url, Object.assign({ method: 'GET', headers: { 'Content-Type': 'application/json' }, mode: 'cors' }, opts));
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
        }
        return await res.json();
    } catch (err) {
        console.error(`fetchJson failed: ${url}`, err);
        throw err;
    }
}

// -----------------------------
// API FUNCTIONS
// -----------------------------
const api = {
    async fetchAbout() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/about/`);
            const arr = toArray(data);
            return arr.length ? arr[0] : null;
        } catch (err) {
            return null;
        }
    },

    async fetchExperiences() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/experiences/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchProjects() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/projects/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchSkills() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/skills/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchEducation() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/education/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchContact() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/contact/`);
            const arr = toArray(data);
            return arr.length ? arr[0] : null;
        } catch (err) {
            return null;
        }
    },

    async fetchSocialLinks() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/social-links/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchAwards() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/awards/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchHobbies() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/hobbies/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchStatistics() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/statistics/`);
            const arr = toArray(data);
            return arr.length ? arr[0] : null;
        } catch (err) {
            return null;
        }
    },

    async fetchTestimonials() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/testimonials/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchSkillAttributes() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/skill-attributes/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchNavigationItems() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/navigation-items/`);
            return toArray(data);
        } catch (err) {
            return [];
        }
    },

    async fetchSiteSettings() {
        try {
            const data = await fetchJson(`${API_BASE_URL}/site-settings/public/`);
            return data || null;
        } catch (err) {
            return null;
        }
    }
};

// -----------------------------
// RENDER FUNCTIONS (complete)
// -----------------------------
const render = {
    about(data) {
        const nameEl = document.getElementById('hero-name');
        const titleEl = document.getElementById('hero-title');
        const bioEl = document.getElementById('hero-bio');
        const navLogoEl = document.getElementById('nav-logo');
        const aboutWrapperEl = document.getElementById('about-wrapper');
        const profileImgEl = document.getElementById('profile-image');
        const footerNameEl = document.getElementById('footer-name');
        const aboutSection = document.getElementById('about');

        if (!data) {
            if (aboutSection) aboutSection.classList.add('hidden-section');
            if (nameEl) nameEl.textContent = 'Your Name';
            if (titleEl) titleEl.textContent = 'Developer • Traveler • Freelancer';
            if (bioEl) bioEl.textContent = 'Welcome to my portfolio';
            if (navLogoEl) navLogoEl.textContent = 'Portfolio';
            if (footerNameEl) footerNameEl.textContent = 'Portfolio';
            if (profileImgEl) {
                profileImgEl.style.display = 'block';
                profileImgEl.src = '';
                profileImgEl.alt = '';
            }
            const heroActionsEl = document.getElementById('hero-actions');
            if (heroActionsEl) heroActionsEl.innerHTML = '<a href="#about" class="btn btn-secondary">Learn More</a>';
            if (aboutWrapperEl) aboutWrapperEl.innerHTML = '<p>No content available. Please add your information in the admin panel.</p>';
            return;
        }

        // Update hero
        if (nameEl) nameEl.textContent = safeText(data.name, 'Your Name');
        if (navLogoEl) navLogoEl.textContent = safeText(data.name, 'Portfolio');
        if (footerNameEl) footerNameEl.textContent = safeText(data.name, 'Portfolio');
        if (titleEl) titleEl.textContent = safeText(data.tagline, 'Developer • Traveler • Freelancer');
        if (bioEl) bioEl.textContent = safeText(data.bio, 'Welcome to my portfolio');

        // Hero actions
        const heroActionsEl = document.getElementById('hero-actions');
        if (heroActionsEl) {
            if (data.show_hero_button === false) {
                heroActionsEl.innerHTML = '';
            } else {
                const buttonText = safeText(data.hero_button_text, 'Learn More');
                const buttonLink = safeText(data.hero_button_link, '#about');
                heroActionsEl.innerHTML = `<a href="${buttonLink}" class="btn btn-secondary">${buttonText}</a>`;
            }
        }

        // Profile image
        if (profileImgEl) {
            if (data.profile_image_url) {
                profileImgEl.src = data.profile_image_url;
                profileImgEl.alt = data.name || 'Profile image';
                profileImgEl.style.display = 'block';
            } else {
                profileImgEl.style.display = 'none';
            }
            const imageShape = data.image_shape || 'rounded';
            profileImgEl.className = `hero-profile-img img-shape-${imageShape}`;
        }

        // About wrapper layout
        if (aboutWrapperEl) {
            const showImage = data.show_about_image !== false;
            const imageShape = data.image_shape || 'rounded';
            const profileImageHtml = showImage && data.profile_image_url
                ? `<div class="about-profile-image"><img src="${data.profile_image_url}" alt="${data.name}" class="about-img img-shape-${imageShape}"></div>`
                : showImage && !data.profile_image_url
                ? `<div class="about-profile-image"><div class="about-img-placeholder img-shape-${imageShape}"></div></div>`
                : '';

            const personalDetailsHtml = `
                <div class="personal-details">
                    <div class="detail-item"><strong>Name:</strong> <span>${safeText(data.name, 'N/A')}</span></div>
                    ${data.age ? `<div class="detail-item"><strong>Age:</strong> <span>${data.age} Years</span></div>` : ''}
                    ${data.website ? `<div class="detail-item"><strong>Website:</strong> <a href="${data.website}" target="_blank" rel="noopener noreferrer">${data.website}</a></div>` : ''}
                    ${data.home_country ? `<div class="detail-item"><strong>Home Country:</strong> <span>${data.home_country}</span></div>` : ''}
                </div>
            `;
            const actionButtonsHtml = `
                <div class="about-actions">
                    <a href="#contact" class="btn-hire-me">Hire Me For Work.</a>
                    ${data.resume_url ? `<a href="${data.resume_url}" download class="btn-download-resume"><span class="download-icon">↓</span> Download Resume</a>` : ''}
                </div>
            `;
            const layoutClass = showImage ? 'about-layout' : 'about-layout about-layout-no-image';
            aboutWrapperEl.innerHTML = `
                <div class="${layoutClass}">
                    ${profileImageHtml}
                    <div class="about-content-right">
                        <div class="about-text"><p>${safeText(data.bio, 'No bio available.')}</p></div>
                        ${personalDetailsHtml}
                        ${actionButtonsHtml}
                    </div>
                </div>
            `;
        }
    },

    diamondLabels(hobbies, skills) {
        const labels = document.querySelectorAll('.diamond-label');
        if (!labels || labels.length === 0) return;
        const labelTexts = [];

        if (hobbies && hobbies.length) {
            labelTexts.push(hobbies[0].name.toLowerCase());
            if (hobbies[1]) labelTexts.push(hobbies[1].name.toLowerCase());
            if (hobbies[2]) labelTexts.push(hobbies[2].name.toLowerCase());
        } else if (skills && skills.length) {
            const categories = [...new Set(skills.map(s => s.category).filter(Boolean))];
            labelTexts.push(...categories.slice(0, 3).map(c => c.toLowerCase()));
        }

        if (!labelTexts.length) labelTexts.push('developer', 'traveler', 'freelancer');
        while (labelTexts.length < 3) {
            const defaults = ['developer', 'traveler', 'freelancer'];
            labelTexts.push(defaults[labelTexts.length]);
        }

        labels.forEach((label, i) => {
            if (labelTexts[i]) label.textContent = labelTexts[i];
        });
    },

    socialLinks(links) {
        if (!links || !links.length) return;
        const footerSocialEl = document.getElementById('footer-social');
        if (!footerSocialEl) return;

        footerSocialEl.innerHTML = '';
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'social-link';
            a.title = link.platform;
            a.innerHTML = link.icon ? link.icon : (link.platform ? link.platform.charAt(0).toUpperCase() : '');
            footerSocialEl.appendChild(a);
        });
    },

    skills(skills) {
        const section = document.getElementById('skills');
        if (!skills || !skills.length) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('skills-container');
        if (!container) return;

        const byCategory = {};
        skills.forEach(s => {
            const cat = s.category || 'Other';
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(s);
        });

        container.innerHTML = Object.keys(byCategory).map(cat => {
            const items = byCategory[cat].map(skill => `
                <div class="skill-item">
                    <div class="skill-name"><span>${skill.name}</span></div>
                </div>
            `).join('');
            return `<div class="skill-card"><div class="skill-category">${cat}</div>${items}</div>`;
        }).join('');
    },

    experiences(experiences) {
        const section = document.getElementById('experience');
        if (!experiences || !experiences.length) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('experience-container');
        if (!container) return;

        container.innerHTML = experiences.map(exp => {
            const endDate = exp.end_date || 'Present';
            return `
                <div class="timeline-item">
                    <div class="timeline-title">${safeText(exp.title)}</div>
                    <div class="timeline-company">${safeText(exp.company)}</div>
                    <div class="timeline-date">${safeText(exp.start_date)} - ${endDate}</div>
                    <div class="timeline-description">${safeText(exp.description, '')}</div>
                </div>
            `;
        }).join('');
    },

    projects(projects) {
        const section = document.getElementById('projects');
        if (!projects || !projects.length) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('projects-container');
        if (!container) return;

        container.innerHTML = projects.map(p => {
            const imageHtml = p.image_url ? `<img src="${p.image_url}" alt="${safeText(p.title)}" class="project-image">` : '';
            const linkHtml = p.link ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project →</a>` : '';
            const techs = p.technologies ? p.technologies.split(',').map(t => t.trim()).filter(Boolean) : [];
            const techHtml = techs.length ? `<div class="project-technologies">${techs.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>` : '';
            return `
                <div class="project-card">
                    ${imageHtml}
                    <div class="project-content">
                        <h3 class="project-title">${safeText(p.title)}</h3>
                        <p class="project-description">${safeText(p.description)}</p>
                        ${techHtml}
                        ${linkHtml}
                    </div>
                </div>
            `;
        }).join('');
    },

    education(education) {
        const section = document.getElementById('education');
        if (!education || !education.length) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('education-container');
        if (!container) return;

        container.innerHTML = education.map(e => {
            const end = e.end_date || 'Present';
            const description = e.description ? `<div class="timeline-description">${safeText(e.description)}</div>` : '';
            return `
                <div class="timeline-item">
                    <div class="timeline-title">${safeText(e.degree)}</div>
                    <div class="timeline-company">${safeText(e.institution)}</div>
                    <div class="timeline-date">${safeText(e.start_date)} - ${end}</div>
                    ${description}
                </div>
            `;
        }).join('');
    },

    awards(awards) {
        const section = document.getElementById('awards');
        if (!awards || !awards.length) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('awards-container');
        if (!container) return;

        container.innerHTML = awards.map(a => {
            const issuer = a.issuer ? `<div class="award-issuer">${safeText(a.issuer)}</div>` : '';
            const description = a.description ? `<p class="award-description">${safeText(a.description)}</p>` : '';
            return `
                <div class="award-card">
                    <h3 class="award-title">${safeText(a.title)}</h3>
                    ${issuer}
                    <div class="award-date">${safeText(a.date)}</div>
                    ${description}
                </div>
            `;
        }).join('');
    },

    hobbies(hobbies) {
        const section = document.getElementById('hobbies');
        if (!hobbies || !hobbies.length) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('hobbies-container');
        if (!container) return;

        container.innerHTML = hobbies.map(h => {
            const description = h.description ? `<p class="hobby-description">${safeText(h.description)}</p>` : '';
            const icon = h.icon || '🎯';
            return `
                <div class="hobby-card">
                    <div class="hobby-icon">${icon}</div>
                    <h3 class="hobby-name">${safeText(h.name)}</h3>
                    ${description}
                </div>
            `;
        }).join('');
    },

    contact(contact) {
        const section = document.getElementById('contact');
        if (!contact) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('contact-content');
        if (!container) return;

        const emailHtml = contact.email ? `<div class="contact-item"><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></div>` : '';
        const phoneHtml = contact.phone ? `<div class="contact-item"><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></div>` : '';
        const locationHtml = contact.location ? `<div class="contact-item"><strong>Location:</strong> <span>${contact.location}</span></div>` : '';

        container.innerHTML = `<div class="contact-info">${emailHtml}${phoneHtml}${locationHtml}</div>`;
    },

    skillAttributes(attributes) {
        const section = document.getElementById('skill-attributes');
        if (!attributes || !attributes.length) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('skill-attributes-container');
        if (!container) return;

        container.innerHTML = attributes.map(attr => {
            const icon = attr.icon || '⭐';
            return `
                <div class="skill-attribute-item">
                    <div class="skill-attribute-icon"><span class="icon-content">${icon}</span></div>
                    <div class="skill-attribute-name">${safeText(attr.name)}</div>
                </div>
            `;
        }).join('');
    },

    statistics(stats) {
        const section = document.getElementById('statistics');
        if (!stats) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('statistics-container');
        if (!container) return;

        container.innerHTML = `
            <div class="stat-item"><div class="stat-number">${safeText(stats.awards_won, 0)}</div><div class="stat-label">Awards Won</div></div>
            <div class="stat-separator">◆</div>
            <div class="stat-item"><div class="stat-number">${safeText(stats.happy_customers, 0)}+</div><div class="stat-label">Happy Customers</div></div>
            <div class="stat-separator">◆</div>
            <div class="stat-item"><div class="stat-number">${safeText(stats.projects_done, 0)}+</div><div class="stat-label">Projects Done</div></div>
            <div class="stat-separator">◆</div>
            <div class="stat-item"><div class="stat-number">${safeText(stats.games_played, '0hrs')}</div><div class="stat-label">Games Played</div></div>
        `;
    },

    testimonials(testimonials) {
        const section = document.getElementById('testimonials');
        if (!testimonials || !testimonials.length) {
            if (section) section.classList.add('hidden-section');
            return;
        }
        const container = document.getElementById('testimonials-container');
        if (!container) return;

        const t = testimonials[0];
        const authorInfo = (t.author_title ? t.author_title : '') + (t.author_company ? ` at ${t.author_company}` : '');
        container.innerHTML = `
            <div class="testimonial-item">
                <blockquote class="testimonial-quote">${safeText(t.quote)}</blockquote>
                <div class="testimonial-author">
                    <div class="author-name">${safeText(t.author_name)}</div>
                    ${authorInfo ? `<div class="author-title">${authorInfo}</div>` : ''}
                </div>
            </div>
        `;
    },

    navigation(navItems) {
        const navMenuEl = document.getElementById('nav-menu');
        if (!navMenuEl) return;
        if (!navItems || !navItems.length) return;

        // clear and render
        navMenuEl.innerHTML = '';
        navItems.forEach(item => {
            const a = document.createElement('a');
            a.href = item.link || '#';
            a.textContent = item.label || item.link || 'Link';
            a.className = 'nav-link';
            if (item.is_cta) a.classList.add('nav-link-cta');
            navMenuEl.appendChild(a);
        });
    },

    siteSettings(settings) {
        if (!settings) return;
        // Section titles mapping
        const map = {
            about: settings.about_title,
            skills: settings.skills_title,
            experience: settings.experience_title,
            projects: settings.projects_title,
            education: settings.education_title,
            awards: settings.awards_title,
            hobbies: settings.hobbies_title,
            contact: settings.contact_title,
            testimonials: settings.testimonials_title
        };
        Object.keys(map).forEach(id => {
            const sec = document.getElementById(id);
            if (!sec) return;
            const titleEl = sec.querySelector('.section-title');
            if (titleEl && map[id]) titleEl.textContent = map[id];
        });

        const footerTextEl = document.querySelector('.footer p');
        if (footerTextEl && settings.footer_text) {
            const year = settings.copyright_year || new Date().getFullYear();
            const footerName = document.getElementById('footer-name')?.textContent || 'Portfolio';
            footerTextEl.innerHTML = `&copy; ${year} ${footerName}. ${settings.footer_text}`;
        }
    }
};

// -----------------------------
// APP INITIALIZATION
// -----------------------------
async function initApp() {
    const loader = document.getElementById('loader');
    try {
        // Fetch all data in parallel
        const [
            about, experiences, projects, skills, education,
            contact, socialLinks, awards, hobbies, statistics,
            testimonials, skillAttributes, navigationItems, siteSettings
        ] = await Promise.all([
            api.fetchAbout(),
            api.fetchExperiences(),
            api.fetchProjects(),
            api.fetchSkills(),
            api.fetchEducation(),
            api.fetchContact(),
            api.fetchSocialLinks(),
            api.fetchAwards(),
            api.fetchHobbies(),
            api.fetchStatistics(),
            api.fetchTestimonials(),
            api.fetchSkillAttributes(),
            api.fetchNavigationItems(),
            api.fetchSiteSettings()
        ]);

        // Debug logs (remove in future if you want)
        console.log('Fetched data summary:', {
            about, experiencesCount: experiences.length, projectsCount: projects.length, skillsCount: skills.length
        });

        // Render in order
        render.about(about);
        render.navigation(navigationItems);
        render.siteSettings(siteSettings);
        render.socialLinks(socialLinks);
        render.skills(skills);
        render.experiences(experiences);
        render.projects(projects);
        render.education(education);
        render.awards(awards);
        render.hobbies(hobbies);
        render.contact(contact);
        render.skillAttributes(skillAttributes);
        render.statistics(statistics);
        render.testimonials(testimonials);
        render.diamondLabels(hobbies, skills);

        // Hide loader
        if (loader) loader.classList.add('hidden');

    } catch (error) {
        console.error('App init failed:', error);
        // Update UI to show error
        const nameEl = document.getElementById('hero-name');
        if (nameEl) nameEl.textContent = 'Error loading portfolio';
        if (loader) loader.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    initApp();
});

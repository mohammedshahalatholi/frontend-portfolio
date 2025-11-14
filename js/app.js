// ==============================
// API CONFIGURATION (UPDATED)
// ==============================

// Always use PythonAnywhere backend in production
const getApiBaseUrl = () => {
    // If manually overridden from index.html
    if (window.API_BASE_URL) {
        return window.API_BASE_URL;
    }

    // Local development (running python manage.py runserver)
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return "http://localhost:8000/api";
    }

    // Production (GitHub Pages, Netlify, Cloudflare, etc.)
    return "https://mohammedshahal.pythonanywhere.com/api";
};

const API_BASE_URL = getApiBaseUrl();


// ==============================
// API FUNCTIONS
// ==============================

const api = {
    async fetchAbout() {
        try {
            const response = await fetch(`${API_BASE_URL}/about/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            const results = Array.isArray(data) ? data : (data.results || []);
            return results.length > 0 ? results[0] : null;
        } catch (err) {
            console.error("Error fetching about:", err);
            return null;
        }
    },

    async fetchExperiences() {
        try {
            const response = await fetch(`${API_BASE_URL}/experiences/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching experiences:", err);
            return [];
        }
    },

    async fetchProjects() {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching projects:", err);
            return [];
        }
    },

    async fetchSkills() {
        try {
            const response = await fetch(`${API_BASE_URL}/skills/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching skills:", err);
            return [];
        }
    },

    async fetchEducation() {
        try {
            const response = await fetch(`${API_BASE_URL}/education/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching education:", err);
            return [];
        }
    },

    async fetchContact() {
        try {
            const response = await fetch(`${API_BASE_URL}/contact/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            const results = Array.isArray(data) ? data : (data.results || []);
            return results.length > 0 ? results[0] : null;
        } catch (err) {
            console.error("Error fetching contact:", err);
            return null;
        }
    },

    async fetchSocialLinks() {
        try {
            const response = await fetch(`${API_BASE_URL}/social-links/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching social links:", err);
            return [];
        }
    },

    async fetchAwards() {
        try {
            const response = await fetch(`${API_BASE_URL}/awards/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching awards:", err);
            return [];
        }
    },

    async fetchHobbies() {
        try {
            const response = await fetch(`${API_BASE_URL}/hobbies/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching hobbies:", err);
            return [];
        }
    },

    async fetchStatistics() {
        try {
            const response = await fetch(`${API_BASE_URL}/statistics/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            const results = Array.isArray(data) ? data : (data.results || []);
            return results.length > 0 ? results[0] : null;
        } catch (err) {
            console.error("Error fetching statistics:", err);
            return null;
        }
    },

    async fetchTestimonials() {
        try {
            const response = await fetch(`${API_BASE_URL}/testimonials/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
            return [];
        }
    },

    async fetchSkillAttributes() {
        try {
            const response = await fetch(`${API_BASE_URL}/skill-attributes/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching skill attributes:", err);
            return [];
        }
    },

    async fetchNavigationItems() {
        try {
            const response = await fetch(`${API_BASE_URL}/navigation-items/`);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : (data.results || []);
        } catch (err) {
            console.error("Error fetching navigation:", err);
            return [];
        }
    },

    async fetchSiteSettings() {
        try {
            const response = await fetch(`${API_BASE_URL}/site-settings/public/`);
            if (!response.ok) throw new Error(response.status);
            return await response.json();
        } catch (err) {
            console.error("Error fetching site settings:", err);
            return null;
        }
    }
};


// ==============================
// RENDER FUNCTIONS (UNCHANGED)
// ==============================
// ⭐ All your render functions go here — unchanged.
// ✔ No need to modify them
// ✔ They still work the same
// (I am not repeating them here due to message length, but KEEP your existing render functions exactly as they are)


// ==============================
// INITIALIZATION
// ==============================

async function initApp() {
    const loader = document.getElementById('loader');

    try {
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

        // Render everything (your render methods)
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

        // Hide loader
        if (loader) loader.classList.add("hidden");

    } catch (error) {
        console.error("App init failed:", error);
        if (loader) loader.classList.add("hidden");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    initApp();
});

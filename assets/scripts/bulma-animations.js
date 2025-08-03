/**
 * Bulma Elements Animation Controller
 * Handles entrance animations for div.box, div.tags, and footer.footer elements
 */

class BulmaAnimationController {
    constructor() {
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        this.setupIntersectionObserver();
        this.setupTagStaggering();
        this.addScrollClasses();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.triggerAnimation(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);

        // Observe all target elements
        const targetElements = document.querySelectorAll('div.box, div.tags, footer.footer');
        targetElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupTagStaggering() {
        // Set up staggered animations for individual tags
        const tagContainers = document.querySelectorAll('div.tags');
        
        tagContainers.forEach(container => {
            const tags = container.querySelectorAll('.tag');
            tags.forEach((tag, index) => {
                tag.style.setProperty('--tag-index', index);
            });
        });
    }

    addScrollClasses() {
        // Add scroll animation classes to all target elements
        const targetElements = document.querySelectorAll('div.box, div.tags, footer.footer');
        targetElements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    }

    triggerAnimation(element) {
        // Add animation trigger class
        element.classList.add('animate-in');
        
        // Add a subtle delay based on element type for better visual flow
        const delay = this.getAnimationDelay(element);
        if (delay > 0) {
            element.style.animationDelay = `${delay}ms`;
        }

        // Dispatch custom event for additional controls
        element.dispatchEvent(new CustomEvent('bulma-animation-start', {
            detail: { element, type: this.getElementType(element) }
        }));
    }

    getAnimationDelay(element) {
        if (element.matches('div.box')) return 0;
        if (element.matches('div.tags')) return 100;
        if (element.matches('footer.footer')) return 200;
        return 0;
    }

    getElementType(element) {
        if (element.matches('div.box')) return 'box';
        if (element.matches('div.tags')) return 'tags';
        if (element.matches('footer.footer')) return 'footer';
        return 'unknown';
    }

    // Public method to manually trigger animations
    triggerElementAnimation(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => this.triggerAnimation(element));
    }

    // Public method to reset animations
    resetAnimations() {
        this.animatedElements.clear();
        const targetElements = document.querySelectorAll('div.box, div.tags, footer.footer');
        targetElements.forEach(element => {
            element.classList.remove('animate-in');
            element.style.animationDelay = '';
        });
    }
}

// Initialize the animation controller
const bulmaAnimations = new BulmaAnimationController();

// Make it globally available for manual control
window.BulmaAnimations = bulmaAnimations;

// Custom event listeners for advanced control
document.addEventListener('bulma-animation-start', (event) => {
    console.log(`Animation started for ${event.detail.type} element:`, event.detail.element);
});

// Utility functions for manual animation control
window.animateBulmaElement = (selector) => {
    bulmaAnimations.triggerElementAnimation(selector);
};

window.resetBulmaAnimations = () => {
    bulmaAnimations.resetAnimations();
};

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BulmaAnimationController;
}
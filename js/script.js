'use strict';

document.addEventListener('DOMContentLoaded', () => {

const header = document.querySelector('.header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const heroVideo = document.getElementById('heroVideo');

/* ================================
   MOBILE NAVIGATION
================================= */

if (navToggle && navMenu) {

    const navIcon = navToggle.querySelector('i');

    const openMenu = () => {
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');

        if (navIcon) {
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-times');
        }
    };

    const closeMenu = () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');

        if (navIcon) {
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
        }
    };

    navToggle.addEventListener('click', (event) => {
        event.preventDefault();

        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.classList.contains('active')) return;

        if (
            !navMenu.contains(event.target) &&
            !navToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            navMenu.classList.contains('active')
        ) {
            closeMenu();
            navToggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

/* ================================
   HEADER SCROLL
================================= */

if (header) {

    const updateHeader = () => {

        if (window.scrollY > 30) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };

    window.addEventListener(
        'scroll',
        updateHeader,
        { passive: true }
    );

    updateHeader();
}

/* ================================
   SMOOTH ANCHOR SCROLL
================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', event => {

        const selector = link.getAttribute('href');

        if (!selector || selector === '#') return;

        const target = document.querySelector(selector);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            header ? header.offsetHeight : 0;

        const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            10;

        window.scrollTo({
            top: Math.max(0, position),
            behavior: 'smooth'
        });
    });
});

/* ================================
   HERO VIDEO
================================= */

if (heroVideo) {

    heroVideo.muted = true;
    heroVideo.playsInline = true;

    const startVideo = () => {

        const promise = heroVideo.play();

        if (promise && promise.catch) {
            promise.catch(() => {});
        }
    };

    startVideo();

    document.addEventListener(
        'visibilitychange',
        () => {
            if (!document.hidden) {
                startVideo();
            }
        }
    );
}

/* ================================
   EXTERNAL LINKS
================================= */

document
    .querySelectorAll('a[target="_blank"]')
    .forEach(link => {
        link.setAttribute(
            'rel',
            'noopener noreferrer'
        );
    });

/* ================================
   CURRENT YEAR
================================= */

document
    .querySelectorAll('[data-current-year]')
    .forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });

});

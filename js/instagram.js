'use strict';

document.addEventListener('DOMContentLoaded', () => {

const instagramContainers =
    document.querySelectorAll(
        '[data-instagram]'
    );

/*
 * Instagram does not provide a simple public
 * client-side feed API for arbitrary profiles.
 *
 * Therefore this file intentionally does not
 * attempt to scrape Instagram or inject fake posts.
 *
 * If later we add an official embed/widget,
 * it can be initialized here.
 */

if (!instagramContainers.length) {
    return;
}

instagramContainers.forEach(container => {

    const profile =
        container.dataset.instagram;

    if (!profile) return;

    const link =
        container.querySelector(
            'a'
        );

    if (link) {

        link.href =
            `https://www.instagram.com/${profile.replace(/^@/, '')}`;

        link.target =
            '_blank';

        link.rel =
            'noopener noreferrer';

    }

});

});

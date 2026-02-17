document.documentElement.classList.add('js');

const navToggle = document.querySelector('.nav-toggle');
const navLinks = Array.from(document.querySelectorAll('.nav-list a'));
const header = document.querySelector('.site-header');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const closeMobileNav = () => {
  document.body.classList.remove('nav-open');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }
};

navLinks.forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

const samePageLinks = document.querySelectorAll('a[href^="#"]');

if (!reduceMotion) {
  samePageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const headerOffset = header ? header.offsetHeight + 8 : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', href);
    });
  });
}

const revealTargets = document.querySelectorAll('.reveal');

if (reduceMotion) {
  revealTargets.forEach((section) => section.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  revealTargets.forEach((section) => observer.observe(section));
}

const progressBar = document.querySelector('.scroll-progress-bar');
const updateScrollProgress = () => {
  if (!progressBar) {
    return;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${percentage.toFixed(2)}%`;
};

updateScrollProgress();
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);

const navSectionLinks = navLinks
  .map((link) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) {
      return null;
    }

    const section = document.querySelector(href);
    if (!section) {
      return null;
    }

    return { link, section };
  })
  .filter(Boolean);

const navSectionOrder = [...navSectionLinks].sort(
  (a, b) => a.section.offsetTop - b.section.offsetTop
);

let activeSectionId = '';
const setActiveNavLink = (id) => {
  if (!id || activeSectionId === id) {
    return;
  }

  activeSectionId = id;
  navSectionLinks.forEach(({ link, section }) => {
    link.classList.toggle('is-active', section.id === id);
  });
};

if (navSectionLinks.length > 0) {
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNavLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0.12,
      }
    );

    navSectionLinks.forEach(({ section }) => {
      sectionObserver.observe(section);
    });
  } else {
    const onScroll = () => {
      const scrollProbe = window.scrollY + (header ? header.offsetHeight + 40 : 40);
      let current = navSectionOrder[0];

      navSectionOrder.forEach((item) => {
        if (item.section.offsetTop <= scrollProbe) {
          current = item;
        }
      });

      if (current) {
        setActiveNavLink(current.section.id);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const firstSectionByPosition = navSectionOrder[0];
  if (firstSectionByPosition) {
    setActiveNavLink(firstSectionByPosition.section.id);
  }
}

const focusLine = document.getElementById('focus-line');
const focusMessages = [
  'Web development and secure coding foundations',
  'Cybersecurity fundamentals in practical labs',
  'Learning pentesting and networking step by step',
  'Improving through projects, labs, and certifications',
];

if (focusLine) {
  if (reduceMotion) {
    focusLine.textContent = focusMessages[0];
  } else {
    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const message = focusMessages[messageIndex];

      if (!deleting) {
        charIndex += 1;
        focusLine.textContent = message.slice(0, charIndex);

        if (charIndex === message.length) {
          deleting = true;
          setTimeout(tick, 1300);
          return;
        }

        setTimeout(tick, 38);
        return;
      }

      charIndex -= 1;
      focusLine.textContent = message.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        messageIndex = (messageIndex + 1) % focusMessages.length;
        setTimeout(tick, 220);
        return;
      }

      setTimeout(tick, 22);
    };

    focusLine.textContent = '';
    setTimeout(tick, 380);
  }
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const cards = document.querySelectorAll('.card');
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
const rootStyles = document.documentElement.style;

if (!reduceMotion && hasFinePointer) {
  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const xPct = clamp(x / rect.width, 0, 1);
      const yPct = clamp(y / rect.height, 0, 1);
      const rotateY = (xPct - 0.5) * 4.2;
      const rotateX = (0.5 - yPct) * 4.2;

      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--spot-x', `${(xPct * 100).toFixed(2)}%`);
      card.style.setProperty('--spot-y', `${(yPct * 100).toFixed(2)}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--spot-x', '50%');
      card.style.setProperty('--spot-y', '50%');
    });
  });
}

const hero = document.querySelector('.hero');
if (hero && !reduceMotion && hasFinePointer) {
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    const shiftX = (x - 0.5) * 12;
    const shiftY = (y - 0.5) * 10;

    rootStyles.setProperty('--hero-shift-x', `${shiftX.toFixed(2)}px`);
    rootStyles.setProperty('--hero-shift-y', `${shiftY.toFixed(2)}px`);
  });

  hero.addEventListener('pointerleave', () => {
    rootStyles.setProperty('--hero-shift-x', '0px');
    rootStyles.setProperty('--hero-shift-y', '0px');
  });
}

if (!reduceMotion) {
  const touchTargets = document.querySelectorAll('.btn, .contact-icon, .kit-block');
  touchTargets.forEach((target) => {
    target.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse') {
        return;
      }

      target.classList.remove('tap-burst');
      // Force reflow so rapid taps can replay the animation.
      void target.offsetWidth;
      target.classList.add('tap-burst');
    });

    target.addEventListener('animationend', () => {
      target.classList.remove('tap-burst');
    });
  });
}

const emailTrigger = document.getElementById('email-trigger');
const emailReveal = document.getElementById('email-reveal');
const emailAddress = document.getElementById('email-address');
const copyEmailButton = document.getElementById('copy-email-btn');
const composeEmailButton = document.getElementById('compose-email-btn');

if (emailTrigger && emailReveal) {
  const hideEmailReveal = () => {
    emailReveal.classList.remove('is-visible');
    emailTrigger.setAttribute('aria-expanded', 'false');
    window.setTimeout(() => {
      if (!emailReveal.classList.contains('is-visible')) {
        emailReveal.hidden = true;
      }
    }, 220);
  };

  const showEmailReveal = () => {
    emailReveal.hidden = false;
    window.requestAnimationFrame(() => {
      emailReveal.classList.add('is-visible');
    });
    emailTrigger.setAttribute('aria-expanded', 'true');
  };

  emailTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = emailTrigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      hideEmailReveal();
    } else {
      showEmailReveal();
    }
  });

  document.addEventListener('click', (event) => {
    const clickedInsideContactTile = Boolean(event.target.closest('.tile-contact'));
    const isOpen = emailTrigger.getAttribute('aria-expanded') === 'true';
    if (isOpen && !clickedInsideContactTile) {
      hideEmailReveal();
    }
  });

  emailReveal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideEmailReveal();
    }
  });
}

if (copyEmailButton && emailAddress) {
  const defaultCopyText = copyEmailButton.textContent;
  copyEmailButton.addEventListener('click', async () => {
    const rawEmail = emailAddress.textContent ? emailAddress.textContent.trim() : '';
    if (!rawEmail) {
      return;
    }

    try {
      await navigator.clipboard.writeText(rawEmail);
      copyEmailButton.textContent = 'Copied!';
      copyEmailButton.classList.add('copied');
    } catch {
      copyEmailButton.textContent = 'Copy manually';
    }

    window.setTimeout(() => {
      copyEmailButton.textContent = defaultCopyText;
      copyEmailButton.classList.remove('copied');
    }, 1400);
  });
}

if (composeEmailButton) {
  composeEmailButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = composeEmailButton.getAttribute('data-email');
    if (!email) {
      return;
    }

    window.location.href = `mailto:${email}`;
  });
}

const year = document.getElementById('year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}

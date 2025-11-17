// Basic interactivity: mobile menu, form handling, year, fake download
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  toggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
  });

  // contact form (fake submission)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    // Basic client validation
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      alert('Please fill name, email and message.');
      return;
    }
    // Simulate sending
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Sending...';

    setTimeout(() => {
      alert('Thanks — your request has been received. We will contact you shortly.');
      submit.disabled = false;
      submit.textContent = 'Send Request';
      form.reset();
    }, 900);
  });

  // Download sample checklist (simulated)
  document.getElementById('downloadChecklist').addEventListener('click', function () {
    const blob = new Blob(
      [
`Security Checklist for Startups

1. Inventory assets (apps, APIs, infra)
2. Enforce MFA on all admin accounts
3. Encrypt data at rest and in transit
4. Regular backups and tested DR
5. Patch management & SCA
6. Run pen tests and fix high-risk items
7. Implement logging and monitoring
8. Train staff, run phishing simulation
`
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-checklist.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

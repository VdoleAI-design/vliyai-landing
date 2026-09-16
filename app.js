(() => {
  const progress = document.querySelector('.progress span');
  let scheduled = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`;
    scheduled = false;
  }
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  addEventListener('resize', updateProgress);
  document.querySelectorAll('details').forEach(item => item.addEventListener('toggle', updateProgress));
  updateProgress();
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('main > .section, .dark .section, .honest .section').forEach(section => {
      section.classList.add('reveal'); observer.observe(section);
    });
    document.documentElement.classList.add('can-reveal');
  }
})();

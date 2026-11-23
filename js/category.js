/*category*/

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const catSlug = urlParams.get('cat') || 'vong-ban';

  const category = JADE_DATA.categories.find(c => c.slug === catSlug) || JADE_DATA.categories[0];

  // Update Page Metadata and Banner
  document.title = `${category.name} | JADE – Natural Gemstone Jewelry`;
  
  const titleEl = document.getElementById('category-hero-title');
  const descEl = document.getElementById('category-hero-desc');
  const bannerEl = document.getElementById('category-banner-section');
  const breadcrumbEl = document.getElementById('category-breadcrumb-current');

  if (titleEl) titleEl.textContent = category.name.toUpperCase();
  if (descEl) descEl.textContent = category.desc;
  if (breadcrumbEl) breadcrumbEl.textContent = category.name;
  if (bannerEl) {
    bannerEl.style.backgroundImage = `url('${category.image}')`;
  }

  // Pre-select the category filter radio in the sidebar
  const catRadio = document.querySelector(`input[name="catFilter"][value="${catSlug}"]`);
  if (catRadio) catRadio.checked = true;

  // Let products.js handle filtering & rendering
  if (typeof currentFilters !== 'undefined') {
    currentFilters.category = catSlug;
    applyFiltersAndRender();
  }
});

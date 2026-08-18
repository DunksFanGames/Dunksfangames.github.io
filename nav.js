const dropdowns = [...document.querySelectorAll('.nav-dropdown')];

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('toggle', () => {
    if (!dropdown.open) return;
    dropdowns.forEach((other) => {
      if (other !== dropdown) other.removeAttribute('open');
    });
  });
});

document.addEventListener('click', (event) => {
  dropdowns.forEach((dropdown) => {
    if (dropdown.open && !dropdown.contains(event.target)) {
      dropdown.removeAttribute('open');
    }
  });
});

document.querySelectorAll('.managed-image').forEach((image) => {
  const slot = image.closest('.managed-image-slot');
  if (!slot) return;

  const showImage = () => slot.classList.remove('image-missing');
  const showFallback = () => slot.classList.add('image-missing');

  image.addEventListener('load', showImage);
  image.addEventListener('error', showFallback);

  if (image.complete) {
    if (image.naturalWidth > 0) showImage();
    else showFallback();
  }
});

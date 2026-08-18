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

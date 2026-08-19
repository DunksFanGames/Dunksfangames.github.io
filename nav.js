const dropdowns = [...document.querySelectorAll('.nav-dropdown')];

const kspDropdown = dropdowns.find((dropdown) => {
  const summary = dropdown.querySelector(':scope > summary');
  return summary && summary.textContent.trim() === 'KSP';
});

if (kspDropdown) {
  const menuLinks = [...kspDropdown.querySelectorAll('.dropdown-menu > a')];
  const mainHref = menuLinks[0]?.getAttribute('href') || 'ksp.html';
  const prefix = mainHref.endsWith('ksp.html') ? mainHref.slice(0, -'ksp.html'.length) : '';
  const kspSections = [
    { index: 1, label: 'Playstyles', href: `${prefix}ksp-playstyles.html` },
    { index: 2, label: 'Mods', href: `${prefix}ksp-mods.html` }
  ];

  kspSections.forEach(({ index, label, href }) => {
    const link = menuLinks[index];
    if (!link) return;
    link.classList.remove('placeholder-link');
    link.removeAttribute('aria-disabled');
    link.href = href;
    link.textContent = label;
  });
}

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

const managedImageExtensions = ['png', 'jpg', 'jpeg', 'webp'];

function imageVersion(response) {
  const marker = [
    response.headers.get('etag'),
    response.headers.get('last-modified'),
    response.headers.get('content-length')
  ].filter(Boolean).join('-');

  return marker ? encodeURIComponent(marker) : Date.now().toString();
}

function loadImageSource(image, url) {
  return new Promise((resolve) => {
    const handleLoad = () => {
      cleanup();
      resolve(true);
    };
    const handleError = () => {
      cleanup();
      resolve(false);
    };
    const cleanup = () => {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };

    image.addEventListener('load', handleLoad, { once: true });
    image.addEventListener('error', handleError, { once: true });
    image.src = url;
  });
}

async function resolveManagedImage(image) {
  const slot = image.closest('.managed-image-slot');
  if (!slot) return;

  const base = image.dataset.imageBase;
  const showImage = () => {
    slot.classList.remove('image-missing');
    slot.classList.add('image-ready');
  };
  const showFallback = () => {
    slot.classList.remove('image-ready');
    slot.classList.add('image-missing');
  };

  if (!base) {
    image.addEventListener('load', showImage);
    image.addEventListener('error', showFallback);
    if (image.complete) {
      if (image.naturalWidth > 0) showImage();
      else showFallback();
    }
    return;
  }

  for (const extension of managedImageExtensions) {
    const candidate = `${base}.${extension}`;

    try {
      const response = await fetch(candidate, { method: 'HEAD', cache: 'no-store' });
      if (!response.ok) continue;

      const versionedCandidate = `${candidate}?v=${imageVersion(response)}`;
      if (await loadImageSource(image, versionedCandidate)) {
        showImage();
        return;
      }
    } catch (error) {
      // Try the next supported image format.
    }
  }

  showFallback();
}

document.querySelectorAll('.managed-image').forEach((image) => {
  resolveManagedImage(image);
});

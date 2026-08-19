# DunksFanGames image folders

Use predictable base filenames so replacing a picture does not require editing HTML.

## Image quality rule

Upload the original image you want to show. The website does not resize, recompress, or convert the source file. CSS only scales large images down visually to fit the page and does not deliberately upscale small source images.

Supported formats for managed image slots:

1. `.png`
2. `.jpg`
3. `.jpeg`
4. `.webp`

If more than one format exists with the same base name, the website uses the first one in that order. Normally keep only one file for each slot.

PNG is a good default for game screenshots with UI text and fine detail. JPG/JPEG is appropriate when the original is already a high-quality JPG or for photographic images. WebP is fine when you intentionally export a high-quality WebP.

## Game Main pages

Use these base names with any one supported extension:

- `images/ksp/main-1`
- `images/ksp/main-2`
- `images/long-dark/main-1`
- `images/long-dark/main-2`
- `images/factorio/main-1`
- `images/factorio/main-2`
- `images/software-inc/main-1`
- `images/software-inc/main-2`

Examples: `images/ksp/main-1.png` or `images/ksp/main-1.jpg`.

The loader checks the available file type and uses file metadata to refresh a replaced image instead of relying on an old cached copy. If no supported image exists, the normal screenshot placeholder is shown.

## Other images

Use `images/general/` for General images and `images/articles/` for article images. For future managed article image slots, use base names such as `article-10-1`, `article-10-2`, and so on, with one supported extension.

There is no fixed 1600-pixel limit. Normal screenshots can stay at their original resolution. Only optimise an image deliberately when the file is unusually large and the quality trade-off is worthwhile.

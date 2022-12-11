import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");
const galleryImgEl = document.querySelector(".gallery__image");

function createGalleryMarkup(galleryItems) {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
  return markup;
}

const galleryMarkup = createGalleryMarkup(galleryItems);

gallery.insertAdjacentHTML("beforeend", galleryMarkup);

gallery.addEventListener("click", openOriginalImg);

function openOriginalImg(evt) {
  evt.preventDefault();
  const isGalleryImg = evt.target.classList.contains("gallery__image");
  if (!isGalleryImg) {
    return;
  }
  console.log(evt.target);

  const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
`);

  instance.show();

  window.addEventListener("keydown", onEscClose);

  function onEscClose(evt) {
    console.log(evt);
    if (evt.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onEscClose);
    }
  }
}

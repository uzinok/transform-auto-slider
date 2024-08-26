const galleryItems = document.querySelectorAll('.gallery__item');
const prevButton = document.querySelector('.gallery__prev');
const nextButton = document.querySelector('.gallery__next');
const gallery = document.querySelector('.gallery');
let currentItem = 0;
let isStart;
var isHover = true;
const widthClose = gallery.querySelector('.gallery__item:not(.show)').clientWidth;

const showItem = index => {
  galleryItems.forEach((item, idx) => {
    item.classList.toggle('show', idx === index);
  });
  updateNavButtons();
  shiftGallery();
};

const shiftGallery = () => {
  if (window.innerWidth <= 990) {
    const gap = parseInt(window.getComputedStyle(gallery).gap);
    const shift = currentItem === 0 ? 0 : (gap + widthClose) * (currentItem - 1);

    gallery.style.transform = `translateX(-${shift}px)`;
  }
}

const updateNavButtons = () => {
  prevButton.classList.toggle('disable', currentItem === 0);
  nextButton.classList.toggle('disable', currentItem === galleryItems.length - 1);
};

const nextItem = () => {
  if (currentItem < galleryItems.length - 1) {
    currentItem++;
    showItem(currentItem);
  }
};

const prevItem = () => {
  if (currentItem > 0) {
    currentItem--;
    showItem(currentItem);
  }
};

const startAutoPlay = () => {
  nextButton.removeEventListener('mouseleave', startAutoPlay);
  prevButton.removeEventListener('mouseleave', startAutoPlay);

  isStart = setInterval(() => {
    if (currentItem < galleryItems.length - 1) {
      nextItem();
    } else {
      currentItem = 0;
      showItem(currentItem);
    }
  }, 2000);
};

const stopAutoPlay = () => {
  clearInterval(isStart);
};

const onMousChangeGalery = (evt) => {
  stopAutoPlay();

  if (!isHover && evt.target.dataset.galeryId !== currentItem) {
    return;
  }
  currentItem = parseInt(evt.target.dataset.galeryId ? evt.target.dataset.galeryId : currentItem);

  showItem(currentItem);
  updateNavButtons();

  isHover = false;
  window.setTimeout(() => {
    isHover = true;
  }, 500);
}

galleryItems.forEach((item, idx) => {
  item.dataset.galeryId = idx;

  item.addEventListener('mouseenter', onMousChangeGalery);
  item.addEventListener('mouseleave', startAutoPlay);
});

nextButton.addEventListener('click', () => {
  stopAutoPlay();
  nextItem();
  nextButton.addEventListener('mouseleave', startAutoPlay);
});

prevButton.addEventListener('click', () => {
  stopAutoPlay();
  prevItem();
  prevButton.addEventListener('mouseleave', startAutoPlay);
});

startAutoPlay();
updateNavButtons();
shiftGallery();

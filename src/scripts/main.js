const galleryItems = document.querySelectorAll('.gallery__item');
const prevButton = document.querySelector('.gallery__prev');
const nextButton = document.querySelector('.gallery__next');
const gallery = document.querySelector('.gallery');
let currentItem = 0;
let isStart;

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
		const widthClose = gallery.querySelector('.gallery__item:not(.show)').clientWidth;
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

nextButton.addEventListener('click', () => {
	stopAutoPlay();
	nextItem();
});

prevButton.addEventListener('click', () => {
	stopAutoPlay();
	prevItem();
});

nextButton.addEventListener('mouseleave', startAutoPlay);
prevButton.addEventListener('mouseleave', startAutoPlay);

gallery.addEventListener('mouseenter', stopAutoPlay);
gallery.addEventListener('mouseleave', startAutoPlay);

startAutoPlay();
updateNavButtons();
shiftGallery();

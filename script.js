let currentIndex = 0;

const carouselImages = document.querySelector(".carousel-images");
const totalImages = carouselImages.children.length;

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotsContainer = document.querySelector(".carousel-dots");


for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
    });
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".carousel-dots span");

prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalImages - 1; 
    }
    updateCarousel();
});

nextButton.addEventListener("click", () => {
    if (currentIndex < totalImages - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; 
    }
    updateCarousel();
});

function updateCarousel() {
    const offset = -currentIndex * 100; 
    carouselImages.style.transform = `translateX(${offset}%)`;

    
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}



const buttonContainer = document.querySelector(".button-container");
const leftButton = document.querySelector(".scroll-button.left");
const rightButton = document.querySelector(".scroll-button.right");


const scrollAmount = 150;


leftButton.addEventListener("click", () => {
    buttonContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
    });
});


rightButton.addEventListener("click", () => {
    buttonContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
    });
});




























const products = [
    { image: "./imgs/whey.avif", name: "Produto 1", price: 240.50, discountedPrice: 180.38, discountTag: "25% OFF" },
    { image: "./imgs/whey2.jpg", name: "Produto 2", price: 150.00, discountedPrice: 120.00, discountTag: "20% OFF" },
    { image: "./imgs/whey3.jpg", name: "Produto 3", price: 150.00, discountedPrice: 120.00, discountTag: "20% OFF" },
    { image: "./imgs/whey4.jpg", name: "Produto 4", price: 150.00, discountedPrice: 120.00, discountTag: "20% OFF" },
    { image: "./imgs/whey5.jpg", name: "Produto 5", price: 150.00, discountedPrice: 132.00, discountTag: "20% OFF" },
    { image: "./imgs/whey6.jpg", name: "Produto 6", price: 150.00, discountedPrice: 120.00, discountTag: "20% OFF" },
    { image: "./imgs/whey7.jpg", name: "Produto 7", price: 150.00, discountedPrice: 120.00, discountTag: "20% OFF" },
    { image: "./imgs/whey8.jpg", name: "Produto 8", price: 150.00, discountedPrice: 120.00, discountTag: "20% OFF" },
    { image: "./imgs/whey9.jpg", name: "Produto 9", price: 150.00, discountedPrice: 177.00, discountTag: "20% OFF" },
    { image: "./imgs/whey10.jpg", name: "Produto 10", price: 150.00, discountedPrice: 120.00, discountTag: "20% OFF" }
];

let productIndex = 0;
const productsPerPage = 5;


function renderProductCarousel(carouselElement) {
    const productCarousel = carouselElement.querySelector(".product-carousel");
    productCarousel.innerHTML = ""; 
    
    const start = productIndex * productsPerPage;
    const end = start + productsPerPage;
    const visibleProducts = products.slice(start, end);  

    visibleProducts.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        productItem.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
                ${product.discountTag ? `<span class="discount-tag">${product.discountTag}</span>` : ""}
            </div>
            <p class="product-name">${product.name}</p>
            <p class="product-price">
                ${product.discountedPrice ? `<span class="original-price">R$ ${product.price.toFixed(2)}</span>` : ""}
                <span class="discounted-price">R$ ${product.discountedPrice || product.price.toFixed(2)}</span>
            </p>
            <button class="add-to-cart">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 1a1 1 0 0 1 1-1h1.276a1 1 0 0 1 .94.658L3.23 3H14a1 1 0 0 1 .961 1.276l-1.5 6A1 1 0 0 1 12.5 11H4.118l-.405 2H13a1 1 0 1 1 0 2H3.461a1 1 0 0 1-.961-1.276L3.12 11H1a1 1 0 1 1 0-2h1.118l.405-2H1a1 1 0 1 1 0-2z"/>
            </svg>
                Adicionar ao Carrinho
            </button>
        `;
        
        productCarousel.appendChild(productItem);
    });
}


function moveToNext(carouselElement) {
    const totalPages = Math.ceil(products.length / productsPerPage);
    productIndex = (productIndex + 1) % totalPages;
    renderProductCarousel(carouselElement);
}


function moveToPrevious(carouselElement) {
    const totalPages = Math.ceil(products.length / productsPerPage);
    productIndex = (productIndex - 1 + totalPages) % totalPages;
    renderProductCarousel(carouselElement);
}


document.querySelectorAll(".product-carousel-container").forEach((carouselElement) => {
    renderProductCarousel(carouselElement);
    
    
    carouselElement.querySelector(".product-prev").addEventListener("click", () => moveToPrevious(carouselElement));
    carouselElement.querySelector(".product-next").addEventListener("click", () => moveToNext(carouselElement));
});
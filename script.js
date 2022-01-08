const previewImages = document.querySelectorAll(".main-image, .thumbnail");
const iconCart = document.querySelector(".menu-image1");
const addCart = document.querySelector(".button");
const minus = document.getElementsByClassName("minus");
const plus = document.getElementsByClassName("plus");
const numberOfProducts = document.querySelector(".modify-number span");
const bodyOfPage = document.querySelector("body");

const blackModal = document.createElement("div");
document.body.appendChild(blackModal);

let width = window.innerWidth;

const previousImage = document.createElement("img");
const nextImage = document.createElement("img");

previousImage.src = "icon-previous.svg";
nextImage.src = "icon-next.svg";

previewImages.forEach((image) => {
  if (width > 376)
    image.addEventListener("click", () => {
      blackModal.classList.add("black-modal");
      blackModal.classList.add("black-modal-active");

      const img = document.createElement("img");
      img.src = image.src;

      while (blackModal.firstChild) {
        blackModal.removeChild(blackModal.firstChild);
      }

      img.classList.add("black-modal-main-image");
      document.body.appendChild(img);

      const secImages = document.createElement("div");
      secImages.classList.add("black-modal-inline-images");
      document.body.appendChild(secImages);

      previewImages.forEach((imageS) => {
        const img2 = document.createElement("img");
        if (!imageS.classList.contains("main-image")) {
          img2.src = imageS.src;
          img2.classList.add("black-modal-secondary-image");
          secImages.appendChild(img2);

          img2.addEventListener("click", () => {
            img.src = img2.src;
          });
        }
      });

      blackModal.addEventListener("click", (e) => {
        if (!(img && secImages && nextImage && previousImage).target)
          blackModal.classList.remove("black-modal-active");
        secImages.remove();
        img.remove();

        nextImage.classList.remove("visible-cart");
        previousImage.classList.remove("visible-cart");

        nextImage.classList.add("hidden-cart");
        previousImage.classList.add("hidden-cart");
      });

      if (blackModal.classList.contains("black-modal-active")) {
        document.body.insertAdjacentElement("beforeend", nextImage);
        document.body.insertAdjacentElement("beforeend", previousImage);
        nextImage.classList.add("move-image", "visible-cart", "next");
        previousImage.classList.add("move-image", "visible-cart", "previous");
      }

      nextImage.addEventListener("click", () => {
        let i;

        for (i = 0; i < previewImages.length - 1; i++) {
          if (previewImages[i].src == img.src) {
            i++;
            img.src = previewImages[i].src;
          }
        }
      });

      previousImage.addEventListener("click", () => {
        let i;

        for (i = previewImages.length - 1; i > 0; i--) {
          if (previewImages[i].src == img.src) {
            i--;
            img.src = previewImages[i].src;
          }
        }
      });
    });
});

const cart = document.createElement("div");
cart.innerHTML =
  "<div class = titluCart>Cart</div><hr><div class = cartproducts>Your cart is empty</div>";

iconCart.addEventListener("click", () => {
  iconCart.classList.add("cart");
  if (cart.classList.contains("visible-cart")) {
    cart.classList.remove("visible-cart");
    cart.classList.add("hidden-cart");
  } else {
    cart.classList.add("cart-content", "cart-active", "visible-cart");
    cart.classList.remove("hidden-cart");
    cart.setAttribute("style", "background-color:white;");
    document.body.insertAdjacentElement("afterbegin", cart);
  }
  if (width < 376) {
    cart.setAttribute(
      "style",
      "height:215px;width:250px;margin-left:40px;z-index:500;background-color:white;"
    );
  }
});

numberOfProducts.value = 0;

plus[0].addEventListener("click", () => {
  numberOfProducts.value += 1;
  numberOfProducts.innerHTML = numberOfProducts.value;
});

minus[0].addEventListener("click", () => {
  if (numberOfProducts.value > 0) {
    numberOfProducts.value = numberOfProducts.value - 1;
    numberOfProducts.innerHTML = numberOfProducts.value;
  }
});

x = 0;

addCart.addEventListener("click", (e) => {
  let sum;
  x += numberOfProducts.value;
  sum = x * 125;
  if (x > 0) {
    cart.innerHTML = `<div class = titluCart>Cart</div>
    <hr><div class = cartproducts>
    <img class = cartImage src = image-product-1.jpg>
    <span class = small-span>Fall Limited Edition Sneakers</span>
    <div class = price-cart>$125.00 x ${x} <span class = "sum">$${sum}</span></div><img class = "delete" src = icon-delete.svg></div>
    <button class = "button special">Checkout</button>`;
  }

  numberOfProducts.value = 0;
  numberOfProducts.innerHTML = numberOfProducts.value;

  const deleteImage = cart.querySelector(".delete");

  deleteImage.addEventListener("click", () => {
    cart.innerHTML =
      "<div class = titluCart>Cart</div><hr><div class = cartproducts>Your cart is empty</div>";
    x = 0;
  });
});

const menuImage = document.createElement("img");
menuImage.src = "icon-menu.svg";
menuImage.classList.add("menu-image");

const nav = document.getElementsByClassName("top-menu");

if (width < 375) {
  nav[0].insertAdjacentElement("afterbegin", menuImage);
}

menuImage.addEventListener("click", () => {
  cart.style.zIndex = "50";
  const miniMenu = document.createElement("div");
  miniMenu.classList.add("mini-menu");

  miniMenu.innerHTML = `
  <img class = "mini-Close" src = "icon-close.svg">
  <ul class = "menu-list">
  <li>Collections</li>
  <li>Men</li>
  <li>Women</li>
  <li>About</li>
  <li>Contact</li>
  </ul>
  `;

  miniMenu.classList.add("mini-menu-active");

  document.body.insertAdjacentElement("afterbegin", miniMenu);
  document.body.appendChild(blackModal);
  blackModal.classList.add("black-modal");
  blackModal.classList.add("black-modal-active");
  const closeButton = document.querySelector(".mini-Close");
  closeButton.addEventListener("click", (e) => {
    if (closeButton.target) blackModal.classList.remove("black-modal-active");
    blackModal.classList.remove("black-modal");
    miniMenu.remove();
  });
});

const mobileNext = document.getElementById("mobile-next");
const mobilePrevious = document.getElementById("mobile-previous");

if (width < 376) {
  let i = 0;
  mobileNext.addEventListener("click", () => {
    if (i == 0) i = 2;
    previewImages[0].src = previewImages[i].src;
    i++;
  });

  mobilePrevious.addEventListener("click", () => {
    previewImages[0].src = previewImages[i - 1].src;
    i--;
  });
}

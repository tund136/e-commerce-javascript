// Variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// Cart
let cart = [];

// Getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('./json/products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const {title, price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title, price, id, image}
            });

            return products;
        } catch (e) {
            console.log(e);
        }
    }
}

// Display products
class UI {
    displayProducts(products) {
        let result = [];
        products.forEach(product => {
            result.push(
                `
                <!--Start Single Product-->
                <article class="product">
                    <div class="img-container">
                        <img src="${product.image}" alt="Product" class="product-img">
                        <button class="bag-btn" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Bag
                        </button>
                    </div>
                    <h3>${product.title}</h3>
                    <h4>$${product.price}</h4>
                </article>
                <!--End Single Product-->
                `
            )
        });
        productsDOM.innerHTML = result.join("");
    }
}

// Local storage
class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // Get all products
    products.getProducts().then(products => ui.displayProducts(products));
});

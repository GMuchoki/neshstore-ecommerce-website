const itemsContainer = document.getElementById('items-container');

fetch('https://dummyjson.com/products')
.then(response => response.json())
.then(data => {
  data.products.map((product) => {
    const item = `<div class="item-container">
    <img src=${product.thumbnail} alt=${product.title} />
    <p>${product.title}</p>
    <p>
    <span class="price">$${product.price}</span>
    <span class="discountPercentage">-${product.discountPercentage}%</span>
    </p>
    <p>⭐${product.rating} | ${product.stock} inStock</p>
    <ul>
      <li><a class="primary" href="#">See preview</a></li>
      <li><a class="secondary" href="#">Similar items</a></li>
    </ul>
    </div>`;
    itemsContainer.innerHTML += item;
  });
});

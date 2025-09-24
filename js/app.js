const itemsContainer = document.getElementById('items-container');

fetch('https://dummyjson.com/products')
.then(response => response.json())
.then(data => {
  data.products.forEach((product) => {
    const item = document.createElement("div");
    item.classList.add("item-container");
    item.setAttribute("data-id", product.id);

    // Calculate discount percentage for display
    const discountPercent = Math.round(product.discountPercentage || 0);
    const originalPrice = (product.price / (1 - (product.discountPercentage || 0) / 100)).toFixed(2);

    // Generate stars dynamically
    const starsHTML = generateStars(product.rating);

    item.innerHTML = `
      <div class="image-container">
        <img src=${product.thumbnail} alt=${product.title} />
        ${discountPercent > 0 ? `<div class="discount-badge">-${discountPercent}%</div>` : `<div class="discount-badge">-${discountPercent}%</div>`}
        <button class="wishlist-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div class="item-content">
        <h3 class="item-title">${product.title}</h3>

        <div class="price-section">
          <span class="current-price">$${product.price}</span>
          ${discountPercent > 0 ? `<span class="original-price">$${originalPrice}</span>` : ''}
        </div>
        <div class="rating-section">
            <span class="stars">${starsHTML}</span>
            <span>${Math.floor(product.rating * 10) / 10 || 'N/A'}</span>
            <span class="stock-info">${product.stock || 0} in stock</span>
        </div>
        <div class="action-buttons">
            <a class="btn btn-primary" href="#">See preview</a>
            <a class="btn btn-secondary" href="#">Similar items</a>
        </div>
      </div>
    `;

    // make the whole card clickable
    item.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    itemsContainer.appendChild(item);
  });
});

/**
 * Generate star rating HTML
 * @param {number} rating
 */
function generateStars(rating) {
  const fullStar = '★';
  const halfStar = '⯨'; // Unicode symbol for half star
  const emptyStar = '☆';

  const isWhole = Number.isInteger(rating);

  if (isWhole) {
    // Whole number rating
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
  } else {
    // Decimal rating
    const fullCount = Math.floor(rating); // Count of full stars
    return fullStar.repeat(fullCount) + halfStar + emptyStar.repeat(5 - (fullCount + 1));
  }
}
const productDetails = document.getElementById('product-details');

//Get the product ID from the URL (?id=5).
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
console.log(productId);

//Fetch product data from the API (https://dummyjson.com/products/5).
fetch(`https://dummyjson.com/products/${productId}`)
.then(response => response.json())
.then(data => {
  console.log(data);

  const whatsappNumber = "254700127598";
  const message = `Hi, I want to order the ${data.title} for Ksh ${data.price}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


  //Insert the details into your HTML.
  const detailContainer = document.createElement('div');
  detailContainer.classList.add("detail-container");
  detailContainer.innerHTML = `
  <img src=${data.thumbnail} />
  <h3>${data.title}</h3>
  <p>${data.description}</p>
  <ul>
    <li>
      <a class="buyNowBtn" href="${whatsappLink}" target="_blank">
        <img src="https://ik.imagekit.io/aaugzuprk/whatsapp-svgrepo-com%20(1).png?updatedAt=1758664354208" alt="WhatsApp" class="icon">
        Buy now
      </a>
    </li>
    <li>
    <a class="cartBtn" href="./cart.html">Add to cart</a>
    </li>
  </ul>
  `;

  productDetails.appendChild(detailContainer);
});


//Add functionality for "Add to Cart" (store in localStorage).



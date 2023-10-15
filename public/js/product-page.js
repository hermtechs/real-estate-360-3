//product page and slider
const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
  imgItem.addEventListener("click", (event) => {
    event.preventDefault();
    imgId = imgItem.dataset.id;
    slideImage();
  });
});

function slideImage() {
  const displayWidth = document.querySelector(
    ".img-showcase img:first-child"
  ).clientWidth;

  document.querySelector(".img-showcase").style.transform = `translateX(${
    -(imgId - 1) * displayWidth
  }px)`;
}

window.addEventListener("resize", slideImage);

//contentful api

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "jm4bpx0pu3ep",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "bMmA_soXsOoFeFEKZPAD3vdHl0bgejSUc4DoJQgDUQ4",
});

client.getEntry("3dO1rzc4IwInXbbWszvmrx").then((res) => {
  const clickedProperty = res.fields;
  //   console.log(clickedProperty);
  const {
    propertyName,
    priceInFigures,
    propertyType,
    propertSize,
    propertyLocation,
    propertyDistrict,
    otherFiles,
    forRentSaleOrBoth,
    propertyDescription,
  } = clickedProperty;
  console.log(propertyName);

  //getting multiple assests aka images based on their ID
  const allOherPhotos = (function getMultiplePhotoFiles(imagesMarkUp) {
    const otherPhotos = otherFiles.map((asset) => {
      // console.log(asset);
      client.getAsset(`${asset.sys.id}`).then((item) => {
        // console.log(item);
        const imageUrl = `https:${item.fields.file.url}`;
        // console.log(imageUrl);
        return (imagesMarkUp = `
    <img src = "${imageUrl}" alt = "${propertyName}">
    `);
      });
    });
    return otherPhotos;
  })();
  console.log(allOherPhotos);

  const productMarkUp = `  <!-- card left -->
  <div class = "product-imgs">
    <div class = "img-display">
      <div class = "img-showcase">
     

      </div>
    </div>
    <div class = "img-select">
      <div class = "img-item">
        <a href = "#" data-id = "1">
          <img src = "/public/img/customary-img.jpg" alt = "shoe image">
        </a>
      </div>
      <div class = "img-item">
        <a href = "#" data-id = "2">
          <img src = "/public/img/customary-img.jpg" alt = "shoe image">
        </a>
      </div>
      <div class = "img-item">
        <a href = "#" data-id = "3">
          <img src = "/public/img/customary-img.jpg" alt = "shoe image">
        </a>
      </div>
      <div class = "img-item">
        <a href = "#" data-id = "4">
          <img src = "/public/img/customary-img.jpg" alt = "shoe image">
        </a>
      </div>
    </div>
  </div>
  <!-- card right -->
  <div class = "product-content">
    <!-- <h5 class = "product-title">nike shoes</h5> -->
    <p class = "product-link">FOR ${forRentSaleOrBoth}</p>
    <div class = "product-price">
      <!-- <p class = "new-price">Price: <span>UGX 200M</span></p> -->
    </div>

    <div class = "product-detail">
      <h2>about this Property: </h2>
      <div class="p-4 pb-0">
        <h5 class="text-primary mb-3">UGX ${priceInFigures.toLocaleString()}</h5>
        <p class="-block h5 mb-2 text-primary">${propertyName}</p>
        <p><i class="fa fa-map-marker-alt text-primary me-2"></i> ${propertyDistrict}</p>
        <p class="me-2"> <i class="text-primary fa fa-ruler-combined me-2"></i><span> ${propertSize}</span></p>
    </div>
      <p>${productDescription}</p>
      <ul>
      </ul>
    </div>

    <div class = "purchase-info">
      <a class = "btn">
        Purchase Now
      </a>
    </div>

    <div class = "social-links">
      <p>Share At: </p>
      <a href = "#">
        <i class = "fab fa-facebook-f"></i>
      </a>
      <a href = "#">
        <i class = "fab fa-twitter"></i>
      </a>
      <a href = "#">
        <i class = "fab fa-instagram"></i>
      </a>
      <a href = "#">
        <i class = "fab fa-whatsapp"></i>
      </a>
    </div>
  </div>
</div> `;
});

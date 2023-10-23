//product page and slider
const currentImage = document.querySelector(".current-img");
const purchaseBtn = document.querySelector(".purchase-btn");

const saleRentTag = document.querySelector(".sale-rent");
const priceElement = document.querySelector(".price-element");
const productName = document.querySelector(".property-name");
const propertyDistrict = document.querySelector(".district");
const productSize = document.querySelector(".property-size");
const propertyDescriptionText = document.querySelector(".property-description");

//getting product id from path

const productID = window.location.pathname.split("/")[2];
// console.log(productID);

function changeImage() {
  const imgThumb = document.querySelectorAll(".img-thumb");
  changeImage.src =
    "https://community.upwork.com/t5/image/serverpage/image-id/34347i4B54E5EE7FE856D1/image-size/medium?v=v2";
  imgThumb.forEach((img) => img.addEventListener("click", changeCurrentImgSrc));
}

function changeCurrentImgSrc(event) {
  const clickedImgSrc = event.currentTarget.src;
  //   console.log(clickedImgSrc);
  currentImage.innerHTML = `<img src = '${clickedImgSrc}' alt = 'property for sale in Uganda'>`;
}

//contentful api

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "jm4bpx0pu3ep",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "bMmA_soXsOoFeFEKZPAD3vdHl0bgejSUc4DoJQgDUQ4",
});

client.getEntry(`${productID}`).then((res) => {
  const clickedProperty = res.fields;
  //   console.log(clickedProperty);
  const {
    propertyName,
    priceInFigures,
    propertyType,
    propertSize,
    propertyLocation,
    district,
    otherFiles,
    forRentSaleOrBoth,
    propertyDescription,
  } = clickedProperty;

  saleRentTag.innerText = "For " + forRentSaleOrBoth;
  priceElement.innerText = "UGX " + priceInFigures.toLocaleString();
  productName.innerText = propertyName;
  propertyDistrict.innerText = district;
  productSize.innerText = propertSize;
  propertyDescriptionText.innerText = propertyDescription;

  otherFiles.forEach((asset) => {
    // console.log(asset);
    let counter = 0;
    counter++;
    client.getAsset(`${asset.sys.id}`).then((item) => {
      // console.log(item)
      imageUrl = `https:${item.fields.file.url}`;
      //   console.log(imageUrl);
      const imageElements = `<img src = '${imageUrl}' alt = 'property for sale in Uganda'>`;
      const imageSelectHTML = `
      <div class = "img-item">
      <a href = "#" data-id = "${counter}">
        <img src = "${imageUrl}" class='img-thumb' alt = "property for sale in Uganda">
      </a>
    </div> `;
      //   markUp.push(imageElements);
      const imgShowCase = document.querySelector(".img-showcase");
      const imgSelect = document.querySelector(".img-select");

      imgShowCase.innerHTML = imageElements;
      imgSelect.innerHTML += imageSelectHTML;
      //   console.log(imgShowCase.innerHTML);
      //   console.log(imgSelect.innerHTML);
      changeImage();
    });
  });
  purchaseBtn.href = `https://wa.me/256765220922?text=Hello,%20I%20would%20like%20to%20${
    forRentSaleOrBoth.toLowerCase() === "rent" ? "rent" : "buy"
  }%20this%20property%20https://realestate360.com/view-property/${productID}`;
});

// var numbers = '0,1,2,3,4,5,6,7,8,9';
const title = document.title;
const url = document.location.href;
const shareBtn = document.querySelector(".share-btn");
shareBtn.addEventListener("click", shareLink);
function shareLink(event) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    // navigator.clipboard.writeText(url);
    navigator.clipboard.writeText(url).then(function (x) {
      alert("Link copied to clipboard");
    });
  }
}

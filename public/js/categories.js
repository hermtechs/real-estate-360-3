//contentful api

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "jm4bpx0pu3ep",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "bMmA_soXsOoFeFEKZPAD3vdHl0bgejSUc4DoJQgDUQ4",
});

//getting product id from path
const urlPath = window.location.pathname.split("/")[2];

const clickedCategory = urlPath;
console.log(clickedCategory);
itemsInCategory = [];
document.addEventListener("DOMContentLoaded", () => {
  getCategoryName();
});

const getCategoryName = async () => {
  const propertyCategories = await client
    .getEntry(clickedCategory)
    .then((res) => {
      return res.fields.propertType;
    });
  console.log(propertyCategories);
  const allProperties = await client
    .getEntries({ content_type: "properties" })
    .then((res) => {
      return res.items;
    })
    .catch((err) => {
      console.log(err);
    });

  //   categoryTitle.innerText = propertyCategories;
  //   console.log(propertyCategories, allProperties);
  getCorrespondingProducts(allProperties, propertyCategories);
};
// get Products With Same Product Category name as clicked category link
const getCorrespondingProducts = (allProperties, propertyCategories) => {
  console.log(allProperties, propertyCategories);
  const correspondingProducts = allProperties.filter((prod) => {
    // return prod.fields.propertyType;
    return (
      prod.fields.propertyType.toLowerCase() == propertyCategories.toLowerCase()
    );
  });
  //   console.log(correspondingProducts);

  updateDOM(correspondingProducts);
};
//updating dom with products in clicked category
function updateDOM(correspondingProducts) {
  const propertiesInClickedCategory = correspondingProducts
    .map((item) => {
      const {
        propertyName,
        priceInWords,
        priceInFigures,
        propertyType,
        propertSize,
        forRentSaleOrBoth,
        propertyPhoto,
        district,
        propertyLocation,
      } = item.fields;

      const entryID = item.sys.id;

      const photo = propertyPhoto.fields.file.url;
      const photoUrl = `https:${photo}`;

      return `
<div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
<div class="property-item rounded overflow-hidden">
    <div class="position-relative overflow-hidden">
        <a class="capitalize" href="/view-property/${entryID}"><img class="img-fluid" src="${photoUrl}" alt="${propertyName}"></a>
        <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For ${forRentSaleOrBoth}</div>
        <div class="capitalize bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${propertyType}</div>
    </div>
    <div class="p-4 pb-0">
        <h5 class="text-primary mb-3">UGX ${priceInFigures.toLocaleString()}</h5>
        <a class="d-block h5 mb-2" href="view-property/${entryID}">${propertyName}</a>
        <p><i class="fa fa-map-marker-alt text-primary me-2"></i> ${propertyLocation}</p>
    </div>
    <div class="d-flex border-top">
        <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${propertSize}</small>
        <small class="flex-fill text-center border-end py-2"><i class="fa fa-dollar-sign text-primary me-2"></i>${priceInWords}</small>
        <small class="flex-fill text-center py-2"><i class="fa fa-map-marker-alt text-primary me-2"></i>${district}</small>
    </div>
</div>
</div>

`;
    })
    .join("");

  const categoriesContainer = document.querySelector(".properties-container");
  categoriesContainer.innerHTML = propertiesInClickedCategory;
}

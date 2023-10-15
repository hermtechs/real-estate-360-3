//contentful api

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "jm4bpx0pu3ep",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "bMmA_soXsOoFeFEKZPAD3vdHl0bgejSUc4DoJQgDUQ4",
});

const tabBtns = document.querySelectorAll(".tab-btn");
const tab1Content = document.querySelector(".tab-1-content");
const tab2Content = document.querySelector(".tab-2-content");
const tab3Content = document.querySelector(".tab-3-content");
const mainTabContainer = document.querySelector(".tab-content");
const allTabContentContainers = document.querySelectorAll(
  ".tab-content-container"
);

//switching between tabs upon click
tabBtns.forEach((btn) => btn.addEventListener("click", toggleTabs));

function toggleTabs(e) {
  const clickedTab = e.currentTarget;

  //hiding all content of tabs
  allTabContentContainers.forEach((contentContainer) => {
    contentContainer.style.display = "none";
    // console.log(contentContainer.id);
  });
  //displaying the content corresponding to clicked Tab
  mainTabContainer.querySelector(`#${clickedTab.id}`).style.display = "block";
}

const allProperties = [];
// const allProperties = [];
const forSaleProperties = [];
const forRentProperties = [];

const getEntryItems = async () => {
  const getproperties = await client.getEntries({ content_type: "properties" });
  // console.log(properties.items);
  const propertiesArray = getproperties.items;
  allProperties.push(propertiesArray);

  const allPropertiesInCMS = propertiesArray.map((property) => {
    return property;
  });

  const filterPropertiesforSale = propertiesArray.filter((property) => {
    return property.fields.forRentSaleOrBoth.toLowerCase() === "sale";
  });
  const filterPropertiesforRent = propertiesArray.filter((property) => {
    return property.fields.forRentSaleOrBoth.toLowerCase() === "rent";
  });

  allProperties.push(allPropertiesInCMS);
  forSaleProperties.push(filterPropertiesforSale);
  forRentProperties.push(filterPropertiesforRent);
  allItemsDOM();
  forSaleItemsDOM();
  forRentItemsDOM();
};

getEntryItems();
// console.log(allProperties, allProperties);

const allItemsDOM = () => {
  //mapping through each featuredItems array items
  const allItems = allProperties[0]
    .map((item) => {
      const {
        propertyName,
        priceInWords,
        priceInFigures,
        propertyType,
        propertSize,
        forRentSaleOrBoth,
        featuredProperty,
        propertyPhoto,
        district,
        propertyLocation,
      } = item.fields;
      const photo = propertyPhoto.fields.file.url;
      const photoUrl = `https:${photo}`;

      return `
  <div class="col-lg-4 col-md-6 wow fadeInUp featured-item" data-wow-delay="0.1s">
  <div class="property-item rounded overflow-hidden">
      <div class="position-relative overflow-hidden">
          <a class="capitalize"><img class="img-fluid" src="${photoUrl}" alt="${propertyName}"></a>
          <div class="capitalize bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For ${forRentSaleOrBoth}</div>
          <div class="capitalize bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${propertyType}</div>
      </div>
      <div class="p-4 pb-0">
          <h5 class="text-primary mb-3">UGX ${priceInFigures.toLocaleString()}</h5>
          <a class="capitalize d-block h5 mb-2">${propertyName}</a>
          <p><i class="capitalize fa fa-map-marker-alt text-primary me-2"></i> ${propertyLocation}</p>
      </div>
      <div class="d-flex border-top">
          <small capitalize class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${propertSize}</small>
          <small capitalize class="flex-fill text-center border-end py-2"><i class="fa fa-dollar-sign text-primary me-2"></i>${priceInWords}</small>
          <small capitalize class="flex-fill text-center py-2"><i class="fa fa-map-marker-alt text-primary me-2"></i>${district}</small>
      </div>
  </div>
  </div>
  
  `;
    })
    .join("");
  // console.log(allItems);
  const featuredItemsContainer = document.querySelector(
    ".featured-items-container"
  );
  featuredItemsContainer.innerHTML = allItems;

  const browseMoreLink = document.createElement("div");
  browseMoreLink.classList.add("col-12,text-center,wow,fadeInUp");
  browseMoreLink.innerHTML = `
    <a class="btn btn-primary py-3 px-5 btn-more-properties" href="">Browse More Property</a>
    `;

  featuredItemsContainer.appendChild(browseMoreLink);
};

//for sale properties
const forSaleItemsDOM = () => {
  //mapping through each featuredItems array items
  const eachItemsForSale = forSaleProperties[0]
    .map((item) => {
      const {
        propertyName,
        priceInWords,
        priceInFigures,
        propertyType,
        propertSize,
        forRentSaleOrBoth,
        featuredProperty,
        propertyPhoto,
        district,
        propertyLocation,
      } = item.fields;
      const photo = propertyPhoto.fields.file.url;
      const photoUrl = `https:${photo}`;

      return `
  <div class="col-lg-4 col-md-6 wow fadeInUp for-sale-item" data-wow-delay="0.1s">
  <div class="property-item rounded overflow-hidden">
      <div class="position-relative overflow-hidden">
          <a class="capitalize"><img class="img-fluid" src="${photoUrl}" alt="${propertyName}"></a>
          <div class="capitalize bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For ${forRentSaleOrBoth}</div>
          <div class="capitalize bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${propertyType}</div>
      </div>
      <div class="p-4 pb-0">
          <h5 class="text-primary mb-3">UGX ${priceInFigures.toLocaleString()}</h5>
          <a class="capitalize d-block h5 mb-2" href="">${propertyName}</a>
          <p><i class="fa fa-map-marker-alt text-primary me-2"></i> ${propertyLocation}</p>
      </div>
      <div class="d-flex border-top">
          <small class="capitalize flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${propertSize}</small>
          <small class="capitalize flex-fill text-center border-end py-2"><i class="fa fa-dollar-sign text-primary me-2"></i>${priceInWords}</small>
          <small class="capitalize flex-fill text-center py-2"><i class="fa fa-map-marker-alt text-primary me-2"></i>${district}</small>
      </div>
  </div>
  </div>
  
  `;
    })
    .join("");

  const forSaleItemsContainer = document.querySelector(
    ".for-sale-items-container"
  );
  forSaleItemsContainer.innerHTML = eachItemsForSale;
};

//for rent properties
const forRentItemsDOM = () => {
  //mapping through each featuredItems array items

  const eachItemsForRent = forRentProperties[0]
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

      const photo = propertyPhoto.fields.file.url;
      const photoUrl = `https:${photo}`;

      return `
  <div class="col-lg-4 col-md-6 wow fadeInUp for-rent-item" data-wow-delay="0.1s">
  <div class="property-item rounded overflow-hidden">
      <div class="position-relative overflow-hidden">
          <a class="capitalize"><img class="img-fluid" src="${photoUrl}" alt="${propertyName}"></a>
          <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For ${forRentSaleOrBoth}</div>
          <div class="capitalize bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${propertyType}</div>
      </div>
      <div class="p-4 pb-0">
          <h5 class="text-primary mb-3">UGX ${priceInFigures.toLocaleString()}</h5>
          <a class="d-block h5 mb-2" href="">${propertyName}</a>
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

  // console.log(eachItemsForRent);
  const forRentItemsElement = document.querySelector(
    ".for-rent-items-container"
  );
  forRentItemsElement.innerHTML = eachItemsForRent;
};

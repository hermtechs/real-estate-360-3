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

const featuredProperties = [];
const allProperties = [];
const forSaleProperties = [];
const forRentProperties = [];

const getEntryItems = async () => {
  const getproperties = await client.getEntries({ content_type: "properties" });
  // console.log(properties.items);
  const propertiesArray = getproperties.items;
  allProperties.push(propertiesArray);

  const filterfeaturedProperties = propertiesArray.filter((property) => {
    return property.fields.featuredProperty === true;
  });

  const filterPropertiesforSale = propertiesArray.filter((property) => {
    return property.fields.forRentSaleOrBoth.toLowerCase() === "sale";
  });
  const filterPropertiesforRent = propertiesArray.filter((property) => {
    return property.fields.forRentSaleOrBoth.toLowerCase() === "rent";
  });

  featuredProperties.push(filterfeaturedProperties);
  forSaleProperties.push(filterPropertiesforSale);
  forRentProperties.push(filterPropertiesforRent);
  featuredItemsDOM();
  forSaleItemsDOM();
  forRentItemsDOM();
};

getEntryItems();
// console.log(allProperties, featuredProperties);

const featuredItemsDOM = () => {
  //mapping through each featuredItems array items
  const eachFeaturedItems = featuredProperties[0]
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
      const entryID = item.sys.id;

      return `
<div class="col-lg-4 col-md-6 wow fadeInUp featured-item" data-wow-delay="0.1s">
<div class="property-item rounded overflow-hidden">
    <div class="position-relative overflow-hidden">
        <a class="capitalize" href="view-property/${entryID}"><img class="img-fluid" src="${photoUrl}" alt="${propertyName}"></a>
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
  // console.log(eachFeaturedItems);
  const featuredItemsContainer = document.querySelector(
    ".featured-items-container"
  );
  featuredItemsContainer.innerHTML = eachFeaturedItems;

  const browseMoreLink = document.createElement("div");
  browseMoreLink.classList.add("col-12,text-center,wow,fadeInUp");
  browseMoreLink.innerHTML = `
  <a class="btn btn-primary py-3 px-5 btn-more-properties" href="/properties.html">Browse More Property</a>
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
      const entryID = item.sys.id;

      return `
<div class="col-lg-4 col-md-6 wow fadeInUp for-sale-item" data-wow-delay="0.1s">
<div class="property-item rounded overflow-hidden">
    <div class="position-relative overflow-hidden">
        <a class="capitalize" href="view-property/${entryID}"><img class="img-fluid" src="${photoUrl}" alt="${propertyName}"></a>
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

  const browseMoreLink = document.createElement("div");
  browseMoreLink.classList.add("col-12,text-center,wow,fadeInUp");
  browseMoreLink.innerHTML = `
  <a class="btn btn-primary py-3 px-5 btn-more-properties" href="/properties.html">Browse More Property</a>
  `;
  forSaleItemsContainer.appendChild(browseMoreLink);
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

      const entryID = item.sys.id;

      const photo = propertyPhoto.fields.file.url;
      const photoUrl = `https:${photo}`;

      return `
<div class="col-lg-4 col-md-6 wow fadeInUp for-rent-item" data-wow-delay="0.1s">
<div class="property-item rounded overflow-hidden">
    <div class="position-relative overflow-hidden">
        <a class="capitalize" href="view-property/${entryID}"><img class="img-fluid" src="${photoUrl}" alt="${propertyName}"></a>
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

  const browseMoreLink = document.createElement("div");
  browseMoreLink.classList.add("col-12,text-center,wow,fadeInUp");
  browseMoreLink.innerHTML = `
  <a class="btn btn-primary py-3 px-5 btn-more-properties" href="/properties.html">Browse More Property</a>
  `;
  forRentItemsElement.appendChild(browseMoreLink);
};

//property categrories lists
const getPropertyCategories = async () => {
  const allPropertyCategories = await client.getEntries({
    content_type: "propertyCategories",
  });
  // console.log(allPropertyCategories.items);
  const allPropertyHTML = allPropertyCategories.items
    .map((item) => {
      // return item;
      const {
        propertType,
        noOfPropertiesAvailable,
        representationalIconphoto,
      } = item.fields;
      const imageUrl = `https:${representationalIconphoto.fields.file.url}`;

      // return imageUrl;
      return `<div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
    <a class="cat-item d-block bg-light text-center rounded p-3" href="">
        <div class="rounded p-4">
            <div class="icon mb-3">
                <img class="img-fluid" src="${imageUrl}" alt="Icon">
            </div>
            <h6 class="capitalize">${propertType}</h6>
            <span>${noOfPropertiesAvailable} Properties</span>
        </div>
    </a>
</div>  `;
    })
    .join("");

  const propertyCategoryContainer = document.querySelector(
    ".category-container"
  );
  propertyCategoryContainer.innerHTML = allPropertyHTML;
};
getPropertyCategories();

//SEARCH / FILTER PROPERTIES
const searchButton = document.querySelector(".search-properties");
const forSaleOption = document.querySelector(".select-sale-or-rent");
const propertyCategoryOption = document.querySelector(
  ".select-property-category"
);
const propertyDistrict = document.querySelector(".select-district");

// console.log(forSaleOption.value);
// console.log(propertyCategoryOption.value);
// console.log(propertyDistrict.value);

//searching through properties by their keywords
async function filterPropertiesByKeyWord() {
  const allProperties = await client.getEntries({
    content_type: "properties",
  });

  const searchedItems = allProperties.items.filter((property) => {
    return (
      property.fields.forRentSaleOrBoth.toLowerCase() ===
        forSaleOption.value.toLowerCase() ||
      property.fields.propertyType.toLowerCase() ===
        propertyCategoryOption.value.toLowerCase() ||
      property.fields.district.toLowerCase() ===
        propertyDistrict.value.toLowerCase()
    );
  });

  //map through filtered objects and return HTML render to DOM
  const searchedPropertiesHTML = searchedItems
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

      return `<div class="col-lg-4 col-md-6 wow fadeInUp for-rent-item" data-wow-delay="0.1s">
    <div class="property-item rounded overflow-hidden">
        <div class="position-relative overflow-hidden">
            <a><img class="img-fluid" src="${photoUrl}" alt="${propertyName}"></a>
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
            <small class="flex-fill text-center border-end py-2"><i>UGX</i>${priceInWords}</small>
            <small class="flex-fill text-center py-2"><i class="fa fa-map-marker-alt text-primary me-2"></i>${district}</small>
        </div>
    </div>
    </div> `;
    })
    .join("");
  // console.log(propertiesHTML);
  const searchedItemsContainer = document.querySelector(".searched-items");
  console.log(searchedPropertiesHTML);
  searchedItemsContainer.innerHTML = searchedPropertiesHTML;

  searchedPropertiesHTML === ""
    ? (searchedItemsContainer.innerHTML = `<p style="border:solid 1px #5555; 
    color:red; border-style: dotted; text-align:center;">
    No results Found, Please select at least one option and search again</p>`)
    : (searchedItemsContainer.innerHTML = searchedPropertiesHTML);
}

// filterPropertiesByKeyWord();

searchButton.addEventListener("click", filterPropertiesByKeyWord);

/*generating options values from contentful for SEARCH PROPERTIES section*/
//cities or districts
async function getCities() {
  const allCities = await client.getEntries({ content_type: "citiesOptions" });

  const optionsHTML = allCities.items
    .map((item) => {
      const city = item.fields.cityName;
      return `
    <option value="${city}">${city}</option>
    `;
    })
    .join("");
  const selectCityElement = document.querySelector(".select-district");
  selectCityElement.innerHTML =
    `<option selected value="select city">Select City</option>` + optionsHTML;
}
getCities();

//property Types options
async function getPropertyTypes() {
  const allPropertyTypes = await client.getEntries({
    content_type: "propertyCategories",
  });
  const optionsHTML = allPropertyTypes.items
    .map((item) => {
      const propertyType = item.fields.propertType;
      // console.log(item);
      return `
    <option value="${propertyType}">${propertyType}</option>
    `;
    })
    .join("");
  const selectPropertyTypeElement = document.querySelector(
    ".select-property-category"
  );
  selectPropertyTypeElement.innerHTML =
    `<option selected value="property type">Property Type</option>` +
    optionsHTML;
}
getPropertyTypes();

// var numbers = '0,1,2,3,4,5,6,7,8,9';

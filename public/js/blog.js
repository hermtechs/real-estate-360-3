//contentful api

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "jm4bpx0pu3ep",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "bMmA_soXsOoFeFEKZPAD3vdHl0bgejSUc4DoJQgDUQ4",
});

const blogPhoto = document.querySelector(".main-blog-photo");
const blogDate = document.querySelector(".published-date");
const blogTitleElement = document.querySelector(".main-blog-title");
const mainContent = document.querySelector(".blog-content-body");
const recentBlogsElement = document.querySelector(".recent-blogs-container");
const blogPostID = window.location.pathname.split("/")[2];
// const blogPostID = "4PjE3Lk9wCCbCiUIakUar4";

//Getting and filling blog post content from contentful
client.getEntry(`${blogPostID}`).then((res) => {
  const clickedBlogPost = res.fields;
  //   console.log(clickedBlogPost);
  const { blogTitle, publicationDate, blogPostPhoto } = clickedBlogPost;

  const imgAsset = client.getAsset(`${blogPostPhoto.sys.id}`).then((item) => {
    const imgUrl = `https:${item.fields.file.url}`;
    blogPhoto.src = imgUrl;
  });

  blogDate.innerText = publicationDate;
  blogTitleElement.innerText = blogTitle;
});

//rendering rich text
client
  .getEntry(`${blogPostID}`)
  .then((entry) => {
    // console.log(entry);
    const rawRichTextField = entry.fields.blogPostContent;
    return documentToHtmlString(rawRichTextField);
  })
  .then((renderedHtml) => {
    // do something with html, like write to a file
    // console.log(renderedHtml);
    mainContent.innerHTML = renderedHtml;
  })
  .catch((error) => console.log(error));

//getting recent blogs from contentful
const getRecentBlogs = async () => {
  await client.getEntries({ content_type: "blogposts" }).then((res) => {
    const blogPosts = JSON.parse(JSON.stringify(res.items)).slice(1, 7);
    /*We're parsing our object as JSON to call all getters. 
    We're using slice(0,6) to limit length to only 5 blogs starting from the second blog
    */

    const blogPostHTML = blogPosts
      .map((blog) => {
        //   console.log(blog);

        const { blogTitle, publicationDate, blogPostPhoto } = blog.fields;

        const imgUrl = `https:${blogPostPhoto.fields.file.url}`;

        const blogPostID = blog.sys.id;

        return `
    <div class="d-flex align-items-center bg-white mb-3" style="height: 110px;">
    <img class="img-fluid" src="${imgUrl}" style="width: 110px; height: 110px;" alt="${blogTitle}">
    <div class="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
        <div class="mb-2">
            <a class="text-body" href="blog/${blogPostID}"><small>${publicationDate}}</small></a>
        </div>
        <a class="h6 m-0 text-secondary text-uppercase font-weight-bold" href="blog/${blogPostID}">${blogTitle}.</a>
    </div>
</div> 
    `;
      })
      .join("");

    recentBlogsElement.innerHTML = blogPostHTML;
  });
};
getRecentBlogs();

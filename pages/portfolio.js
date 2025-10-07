import { header, footer, spaceId, accessToken } from "./index.js";

const contentTypePort = "portfolio";

async function fetchPortfolio() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=${contentTypePort}&include=1`
    );
    const data = await res.json();
    const portfolio = data.items;
    const assets = data.includes.Asset;
    const portfolioContainer = document.querySelector(
      ".app-portfolio__container"
    );

    portfolio.forEach((portfolio) => {
      const { title, description, image } = portfolio.fields;
      const imageId = image.sys.id;
      const imageAsset = assets.find((asset) => imageId === asset.sys.id);
      const imageUrl = `https:${imageAsset.fields.file.url}`;
      portfolioContainer.innerHTML += `<div class="app-portfolio__portfolio">
          <img src="${imageUrl}" alt="portfolio" class="app-portfolio__image" />
          <h3>${title}</h3>
          <p>${description}</p>
        </div>`;
    });
  } catch (error) {
    console.error("Error al cargar portfolio:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  header();
  fetchPortfolio();
  footer();
});

import { menu } from "../components/header.js";
import { sendForm } from "../components/form.js";

export const spaceId = "mf6of4zcdbus";
export const accessToken = "IaYG4iOfkmPJ13OG9kjnf54L5MPRyHuB45SIwuhTBmM";
const contentType = "bienvenida";
const contentTypePres = "presentacion";
const contentTypeSer = "servicios";

export async function fetchBienvenida() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=${contentType}`
    );
    const data = await res.json();
    const bienvenida = data.items[0].fields;

    const imageId = bienvenida.welcomeImage.sys.id;
    const imageRes = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/assets/${imageId}?access_token=${accessToken}`
    );
    const imageData = await imageRes.json();
    const imageUrl = `https:${imageData.fields.file.url}`;

    const bienvenidaSection = document.querySelector(".welcome");
    bienvenidaSection.innerHTML = `<div class="welcome__name">
        <h2 class="welcome__greeting">${bienvenida.title}</h2>
        <h2 class="welcome__greeting">${bienvenida.description}</h2>
      </div>
      <div class="welcome__container-image">
        <img src="${imageUrl}" alt="${imageData.fields.title}" class="welcome__image" />
      </div>`;
  } catch (error) {
    console.error("Error al cargar bienvenida:", error);
  }
}

export async function fetchPresentacion() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=${contentTypePres}`
    );
    const data = await res.json();
    const presentacion = data.items[0].fields;

    const imageId = presentacion.image.sys.id;
    const imageRes = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/assets/${imageId}?access_token=${accessToken}`
    );
    const imageData = await imageRes.json();
    const imageUrl = `https:${imageData.fields.file.url}`;

    const presentacionSection = document.querySelector(".about-me");
    presentacionSection.innerHTML = `<div class="about-me__container-name-description">
        <h2 class="about-me__name">${presentacion.title}</h2>
        <p class="about-me__description">
          ${presentacion.description}
        </p>
      </div>
      <div class="about-me__container-image">
        <img
          src="${imageUrl}"
          alt="${imageData.fields.title}"
          class="about-me__image"
        />
      </div>`;
  } catch (error) {
    console.error("Error al cargar presentación:", error);
  }
}

export async function fetchServicios() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=${contentTypeSer}&include=1`
    );
    const data = await res.json();
    const servicios = data.items;
    const assets = data.includes.Asset;
    const serviciosContainer = document.querySelector(
      ".my-services__container"
    );

    servicios.forEach((servicio) => {
      const { title, description, image } = servicio.fields;
      const imageId = image.sys.id;
      const imageAsset = assets.find((asset) => imageId === asset.sys.id);

      const imageUrl = `https:${imageAsset.fields.file.url}`;
      serviciosContainer.innerHTML += ` <div class="my-services__service">
          <img
            src="${imageUrl}"
            alt="service"
            class="my-services__image"
          />
          <h3>${title}</h3>
          <p>
            ${description}
          </p>
        </div>
        `;
    });
  } catch (error) {
    console.error("Error al cargar servicios:", error);
  }
}

export function header() {
  const divEl = document.createElement("div");

  divEl.innerHTML = ` <header class="header">
      <nav class="header__nav">
        <div>
          <img src="assets/Jessie-logo.png" alt="logo-Jessie" class="logo" />
        </div>
        <div>
          <img
            src="assets/hamburguer-menu.png"
            alt="menu"
            class="header__nav-menu-icon"
          />
        </div>
        <ul class="header__nav-menu">
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
      </nav>
      <div class="window">
        <img
          src="assets/circulo.png"
          alt="close-window"
          class="window__close-window"
        />
        <div class="window__content">
          <a href="portfolio.html">Portfolio</a>
          <a href="servicios.html">Servicios</a>
          <a href="contacto.html">Contacto</a>
        </div>
      </div>
    </header>`;

  const app = document.querySelector(".app-header");

  app.appendChild(divEl);

  menu();
}

export function form() {
  const divEl = document.createElement("div");

  divEl.innerHTML = ` <section class="form">
      <div class="form__title">
        <h3>Escríbeme</h3>
      </div>
      <form class="form__container">
        <div class="form__email-name-container">
          <div>
            <label for="name" class="form__label">Nombre</label>
            <div class="form__input-container">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Tu nombre"
                class="form__input"
              />
            </div>
          </div>
          <div class="form__email-container">
            <label for="email" class="form__label">Email</label>
            <div class="form__email-container">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="tu@mail.com"
                class="form__input"
              />
            </div>
          </div>
        </div>
        <div class="form__message-container">
          <label for="message" class="form__label">Mensaje</label>
          <div>
            <textarea
              name="message"
              id="message"
              class="form__text-area"
            ></textarea>
          </div>
        </div>
        <div class="form__button-container">
          <button class="form__button">
            Enviar<img
              src="assets/enviar.png"
              alt="send"
              class="form__button-send"
            />
          </button>
        </div>
      </form>
    </section>`;

  const app = document.querySelector(".app-form");

  app.appendChild(divEl);

  sendForm();
}

export function footer() {
  const divEl = document.createElement("div");

  divEl.innerHTML = `<section class="footer">
      <div>
        <img src="assets/Jessie-logo.png" alt="logo" class="footer__logo" />
      </div>
      <div class="footer__icons">
        <div>
          <img
            src="assets/house-solid-full.svg"
            alt="home"
            class="footer__icon"
          />
          <span class="footer__icon-title"><a href="index.html" class="footer__home">Home</a></span>
        </div>
        <div>
          <img
            src="assets/user-solid-full.svg"
            alt="user"
            class="footer__icon"
          />
          <span class="footer__icon-title"><a href="servicios.html" class="footer__services">Servicios</a></span>
        </div>
        <div>
          <img
            src="assets/phone-solid-full.svg"
            alt="contact"
            class="footer__icon"
          />
          <span class="footer__icon-title"><a href="contacto.html" class="footer__contact">Contacto</a></span>
        </div>
      </div>
      <div class="footer__social-networks">
        <div>
          <img
            src="assets/linkedin.png"
            alt="linkedin"
            class="footer__icon"
          />
        </div>
        <div>
          <img src="assets/github.png" alt="github" class="footer__icon" />
        </div>
        <div>
          <img
            src="assets/instagram.png"
            alt="instagram"
            class="footer__icon"
          />
        </div>
      </div>
      <div class="footer__year">
        <p>© 2025 Jessie</p>
      </div>
    </section>`;

  const app = document.querySelector(".app-footer");

  app.appendChild(divEl);
}

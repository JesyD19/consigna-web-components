import { header, form, footer } from "./index.js";
import { fetchBienvenida, fetchPresentacion, fetchServicios } from "./index.js";

document.addEventListener("DOMContentLoaded", () => {
  header();
  fetchBienvenida();
  fetchPresentacion();
  fetchServicios();
  form();
  footer();
});

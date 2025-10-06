import { header, footer, fetchServicios } from "./index.js";

document.addEventListener("DOMContentLoaded", () => {
  header();
  fetchServicios();
  footer();
});

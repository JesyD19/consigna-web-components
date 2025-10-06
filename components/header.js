export function menu() {
  const hamburguerMenu = document.querySelector(".header__nav-menu-icon");

  const window = document.querySelector(".window");

  const closeWindow = document.querySelector(".window__close-window");

  hamburguerMenu.addEventListener(
    "click",
    () => (window.style.display = "block")
  );

  closeWindow.addEventListener("click", () => (window.style.display = "none"));
}

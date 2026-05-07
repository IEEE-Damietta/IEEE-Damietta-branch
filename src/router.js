import {
  hideAllPages,
  showActivePage,
  setActiveLink,
  closeMenu
} from "./utils/dom.js";


const routes = {
  home: "home",
  events: "events",
  blog: "blogs",
  join: "join",
};

function navigateTo(pageId) {
  if (!Object.values(routes).includes(pageId)) return;

  hideAllPages();
  setActiveLink(pageId);
  showActivePage(pageId);
  closeMenu();

  // Animate the incoming page
  // const page = document.getElementById(pageId);
//   if (page) slideIn(page);

  // Update the URL
  history.pushState({ pageId }, "", `/${pageId}`);
  window.scrollTo(0, 0);
}

function bindNavLinks() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("data-page");
      navigateTo(pageId);
    });
  });
}

function handleBackButton() {
  // Handle browser back/forward arrows
  window.addEventListener("popstate", (e) => {
    const pageId = e.state?.pageId ?? "home";
    navigateTo(pageId);
  });
}

export function initRouter() {
  bindNavLinks();
  handleBackButton();

  // Show the correct page on first load based on current URL
  const initialPage = window.location.pathname.replace("/", "");
  navigateTo(initialPage);
}

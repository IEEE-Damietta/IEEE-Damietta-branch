export function hideAllPages() {
  document.querySelectorAll(".page-section").forEach((page) => {
    page.classList.remove("active");
  });
}

export function showActivePage(pageId) {
  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.classList.add("active");
}

export function setActiveLink(pageId) {
  // remove all active linkes
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  // set active link
  const activeLink = document.querySelector(`[data-page="${pageId}"]`);
  if (activeLink) activeLink.classList.add("active");
}

export function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  if (menu) menu.classList.toggle("active");
}

export function closeMenu() {
  const menu = document.getElementById("nav-menu");
  if (menu) menu.classList.remove("active");
}
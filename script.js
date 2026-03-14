const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const filterButtons = document.querySelectorAll("[data-filter]");
const postPreviews = document.querySelectorAll(".post-preview");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (filterButtons.length > 0 && postPreviews.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      postPreviews.forEach((post) => {
        if (filter === "all") {
          post.classList.remove("is-hidden");
          return;
        }

        const tags = (post.dataset.tags || "").split(" ");
        post.classList.toggle("is-hidden", !tags.includes(filter));
      });
    });
  });
}

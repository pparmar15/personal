const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const filterButtons = document.querySelectorAll("[data-filter]");
const postPreviews = document.querySelectorAll(".post-preview");
const tocLinks = document.querySelectorAll(".post-toc a[href^='#']");

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

if (tocLinks.length > 0) {
  const tocEntries = Array.from(tocLinks)
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) {
        return null;
      }

      const target = document.getElementById(id);
      if (!target) {
        return null;
      }

      return { link, target };
    })
    .filter(Boolean);

  const setActiveToc = (activeId) => {
    tocEntries.forEach(({ link }) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isActive);
      link.setAttribute("aria-current", isActive ? "location" : "false");
    });

    const activeLink = tocEntries.find(
      ({ link }) => link.getAttribute("href") === `#${activeId}`,
    )?.link;

    const groups = document.querySelectorAll(".post-toc-group");
    groups.forEach((group) => group.classList.remove("is-expanded"));

    if (!activeLink) {
      return;
    }

    const activeGroup = activeLink.closest(".post-toc-group");
    if (activeGroup) {
      activeGroup.classList.add("is-expanded");
    }
  };

  const updateActiveHeading = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
    ) {
      const lastEntry = tocEntries[tocEntries.length - 1];
      if (lastEntry) {
        setActiveToc(lastEntry.target.id);
      }
      return;
    }

    let activeId = tocEntries[0]?.target.id;

    tocEntries.forEach(({ target }) => {
      const rect = target.getBoundingClientRect();
      if (rect.top <= 160) {
        activeId = target.id;
      }
    });

    if (activeId) {
      setActiveToc(activeId);
    }
  };

  updateActiveHeading();
  document.addEventListener("scroll", updateActiveHeading, { passive: true });
}

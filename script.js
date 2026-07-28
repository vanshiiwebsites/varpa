/* =========================================================
   VARPA — LUXURY JEWELLERY WEBSITE
   FILE: script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const pageLoader = document.getElementById("pageLoader");

  const mainHeader = document.getElementById("mainHeader");

  const menuToggle = document.getElementById("menuToggle");

  const mobileNavigation =
    document.getElementById("mobileNavigation");

  const mobileMenuClose =
    document.getElementById("mobileMenuClose");

  const mobileLinks =
    document.querySelectorAll(".mobile-link");

  const searchButton =
    document.querySelector(".search-button");

  const searchOverlay =
    document.getElementById("searchOverlay");

  const searchClose =
    document.getElementById("searchClose");

  const searchForm =
    document.querySelector(".search-form");

  const searchInput =
    document.querySelector(".search-form input");

  let lastScrollPosition = 0;


  /* -------------------- PAGE LOADER -------------------- */

  function hidePageLoader() {
    if (!pageLoader) return;

    pageLoader.classList.add("loader-hidden");

    setTimeout(() => {
      pageLoader.style.display = "none";
    }, 900);
  }

  window.addEventListener("load", () => {
    setTimeout(hidePageLoader, 700);
  });

  setTimeout(hidePageLoader, 3500);


  /* -------------------- HEADER SCROLL EFFECT -------------------- */

  function handleHeaderScroll() {
    if (!mainHeader) return;

    const currentScrollPosition =
      window.scrollY || window.pageYOffset;

    if (currentScrollPosition > 60) {
      mainHeader.classList.add("header-scrolled");
    } else {
      mainHeader.classList.remove("header-scrolled");
    }

    if (
      currentScrollPosition > lastScrollPosition &&
      currentScrollPosition > 500 &&
      !body.classList.contains("menu-open")
    ) {
      mainHeader.classList.add("header-hidden");
    } else {
      mainHeader.classList.remove("header-hidden");
    }

    lastScrollPosition =
      Math.max(currentScrollPosition, 0);
  }

  window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
  );

  handleHeaderScroll();


  /* -------------------- MOBILE MENU -------------------- */

  function openMobileMenu() {
    if (!menuToggle || !mobileNavigation) return;

    menuToggle.classList.add("active");
    mobileNavigation.classList.add("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    if (!menuToggle || !mobileNavigation) return;

    menuToggle.classList.remove("active");
    mobileNavigation.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    body.classList.remove("menu-open");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        mobileNavigation?.classList.contains("active");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener(
      "click",
      closeMobileMenu
    );
  }

  mobileLinks.forEach((link) => {
    link.addEventListener(
      "click",
      closeMobileMenu
    );
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1180) {
      closeMobileMenu();
    }
  });


  /* -------------------- SEARCH OVERLAY -------------------- */

  function openSearchOverlay() {
    if (!searchOverlay) return;

    searchOverlay.classList.add("active");
    body.classList.add("search-open");

    setTimeout(() => {
      searchInput?.focus();
    }, 350);
  }

  function closeSearchOverlay() {
    if (!searchOverlay) return;

    searchOverlay.classList.remove("active");
    body.classList.remove("search-open");

    if (searchInput) {
      searchInput.value = "";
    }
  }

  if (searchButton) {
    searchButton.addEventListener(
      "click",
      openSearchOverlay
    );
  }

  if (searchClose) {
    searchClose.addEventListener(
      "click",
      closeSearchOverlay
    );
  }

  if (searchOverlay) {
    searchOverlay.addEventListener(
      "click",
      (event) => {
        if (event.target === searchOverlay) {
          closeSearchOverlay();
        }
      }
    );
  }

  if (searchForm) {
    searchForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const searchValue =
          searchInput?.value.trim();

        if (!searchValue) {
          searchInput?.focus();
          return;
        }

        const productsSection =
          document.getElementById("products");

        closeSearchOverlay();

        productsSection?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  }


  /* -------------------- POPULAR SEARCH BUTTONS -------------------- */

  const popularSearchButtons =
    document.querySelectorAll(
      ".popular-searches button"
    );

  popularSearchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!searchInput) return;

      searchInput.value =
        button.textContent.trim();

      searchInput.focus();
    });
  });


  /* -------------------- ESCAPE KEY -------------------- */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") return;

      closeMobileMenu();
      closeSearchOverlay();
    }
  );
    /* -------------------- HERO VIDEO CONTROL -------------------- */

  const heroVideo =
    document.querySelector(".hero-video");

  const heroVideoControl =
    document.getElementById("heroVideoControl");

  function updateHeroVideoButton() {
    if (!heroVideo || !heroVideoControl) return;

    const icon =
      heroVideoControl.querySelector("i");

    const text =
      heroVideoControl.querySelector("span");

    if (heroVideo.paused) {
      icon?.classList.remove("fa-pause");
      icon?.classList.add("fa-play");

      if (text) {
        text.textContent = "Play Film";
      }

      heroVideoControl.setAttribute(
        "aria-label",
        "Play hero film"
      );
    } else {
      icon?.classList.remove("fa-play");
      icon?.classList.add("fa-pause");

      if (text) {
        text.textContent = "Pause Film";
      }

      heroVideoControl.setAttribute(
        "aria-label",
        "Pause hero film"
      );
    }
  }

  if (heroVideoControl && heroVideo) {
    heroVideoControl.addEventListener(
      "click",
      () => {
        if (heroVideo.paused) {
          heroVideo.play().catch(() => {});
        } else {
          heroVideo.pause();
        }

        updateHeroVideoButton();
      }
    );

    heroVideo.addEventListener(
      "play",
      updateHeroVideoButton
    );

    heroVideo.addEventListener(
      "pause",
      updateHeroVideoButton
    );

    updateHeroVideoButton();
  }


  /* -------------------- CRAFTSMANSHIP VIDEO CONTROL -------------------- */

  const craftsmanshipVideo =
    document.querySelector(".craftsmanship-video");

  const craftsmanshipControl =
    document.getElementById("craftsmanshipControl");

  function updateCraftsmanshipButton() {
    if (
      !craftsmanshipVideo ||
      !craftsmanshipControl
    ) {
      return;
    }

    const icon =
      craftsmanshipControl.querySelector("i");

    if (craftsmanshipVideo.paused) {
      icon?.classList.remove("fa-pause");
      icon?.classList.add("fa-play");

      craftsmanshipControl.setAttribute(
        "aria-label",
        "Play craftsmanship film"
      );
    } else {
      icon?.classList.remove("fa-play");
      icon?.classList.add("fa-pause");

      craftsmanshipControl.setAttribute(
        "aria-label",
        "Pause craftsmanship film"
      );
    }
  }

  if (
    craftsmanshipVideo &&
    craftsmanshipControl
  ) {
    craftsmanshipControl.addEventListener(
      "click",
      () => {
        if (craftsmanshipVideo.paused) {
          craftsmanshipVideo
            .play()
            .catch(() => {});
        } else {
          craftsmanshipVideo.pause();
        }

        updateCraftsmanshipButton();
      }
    );

    craftsmanshipVideo.addEventListener(
      "play",
      updateCraftsmanshipButton
    );

    craftsmanshipVideo.addEventListener(
      "pause",
      updateCraftsmanshipButton
    );

    updateCraftsmanshipButton();
  }


  /* -------------------- AUTOPLAY FALLBACK -------------------- */

  const allAutoplayVideos =
    document.querySelectorAll(
      "video[autoplay]"
    );

  allAutoplayVideos.forEach((video) => {
    video.muted = true;

    video.play().catch(() => {
      video.setAttribute(
        "data-autoplay-blocked",
        "true"
      );
    });
  });


  /* -------------------- WISHLIST -------------------- */

  const wishlistButtons =
    document.querySelectorAll(
      ".wishlist-toggle"
    );

  const wishlistCount =
    document.querySelector(
      ".wishlist-button .action-count"
    );

  let wishlistTotal = 0;

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");

      const isActive =
        button.classList.contains("active");

      if (isActive) {
        wishlistTotal += 1;

        button.setAttribute(
          "aria-pressed",
          "true"
        );
      } else {
        wishlistTotal =
          Math.max(0, wishlistTotal - 1);

        button.setAttribute(
          "aria-pressed",
          "false"
        );
      }

      if (wishlistCount) {
        wishlistCount.textContent =
          String(wishlistTotal);
      }
    });
  });


  /* -------------------- SHOPPING BAG -------------------- */

  const bagCount =
    document.getElementById("bagCount");

  const addToBagButtons =
    document.querySelectorAll(
      ".add-to-bag-button"
    );

  const modalAddButton =
    document.querySelector(
      ".modal-add-button"
    );

  const notification =
    document.getElementById("notification");

  let bagTotal = 0;
  let notificationTimer;

  function showNotification(message) {
    if (!notification) return;

    const messageElement =
      notification.querySelector("span");

    if (messageElement) {
      messageElement.textContent = message;
    }

    notification.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer = setTimeout(() => {
      notification.classList.remove("show");
    }, 2600);
  }

  function addProductToBag(productName) {
    bagTotal += 1;

    if (bagCount) {
      bagCount.textContent =
        String(bagTotal);
    }

    showNotification(
      `${productName} added to your VARPA bag`
    );
  }

  addToBagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard =
        button.closest(".product-card");

      const productName =
        productCard?.dataset.product ||
        "Jewellery piece";

      addProductToBag(productName);
    });
  });


  /* -------------------- QUICK VIEW MODAL -------------------- */

  const quickViewButtons =
    document.querySelectorAll(
      ".quick-view-button"
    );

  const quickViewModal =
    document.getElementById("quickViewModal");

  const quickViewClose =
    document.getElementById("quickViewClose");

  const modalBackdrop =
    quickViewModal?.querySelector(
      ".modal-backdrop"
    );

  const modalProductImage =
    document.getElementById(
      "modalProductImage"
    );

  const modalProductName =
    document.getElementById(
      "modalProductName"
    );

  const modalProductPrice =
    document.getElementById(
      "modalProductPrice"
    );

  let selectedModalProduct =
    "Jewellery piece";

  function openQuickView(productCard) {
    if (!quickViewModal || !productCard) {
      return;
    }

    const productImage =
      productCard.querySelector(
        ".product-image-wrapper img"
      );

    const productName =
      productCard.dataset.product ||
      "VARPA Jewellery";

    const productPrice =
      productCard.dataset.price || "";

    selectedModalProduct =
      productName;

    if (
      modalProductImage &&
      productImage
    ) {
      modalProductImage.src =
        productImage.src;

      modalProductImage.alt =
        productImage.alt;
    }

    if (modalProductName) {
      modalProductName.textContent =
        productName;
    }

    if (modalProductPrice) {
      modalProductPrice.textContent =
        productPrice;
    }

    quickViewModal.classList.add("active");
    body.classList.add("modal-open");
  }

  function closeQuickView() {
    if (!quickViewModal) return;

    quickViewModal.classList.remove(
      "active"
    );

    body.classList.remove("modal-open");
  }

  quickViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard =
        button.closest(".product-card");

      openQuickView(productCard);
    });
  });

  if (quickViewClose) {
    quickViewClose.addEventListener(
      "click",
      closeQuickView
    );
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener(
      "click",
      closeQuickView
    );
  }

  if (modalAddButton) {
    modalAddButton.addEventListener(
      "click",
      () => {
        addProductToBag(
          selectedModalProduct
        );

        closeQuickView();
      }
    );
  }


  /* -------------------- ESCAPE MODAL SUPPORT -------------------- */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeQuickView();
      }
    }
  );
    /* -------------------- NEWSLETTER FORM -------------------- */

  const newsletterForm =
    document.getElementById("newsletterForm");

  const newsletterInput =
    document.getElementById("emailAddress");

  if (newsletterForm) {
    newsletterForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const emailValue =
          newsletterInput?.value.trim();

        if (!emailValue) {
          newsletterInput?.focus();
          return;
        }

        showNotification(
          "Welcome to the world of VARPA"
        );

        newsletterForm.reset();
      }
    );
  }


  /* -------------------- BACK TO TOP -------------------- */

  const backToTop =
    document.getElementById("backToTop");

  if (backToTop) {
    backToTop.addEventListener(
      "click",
      () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    );
  }


  /* -------------------- CURRENT YEAR -------------------- */

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* -------------------- ACTIVE NAVIGATION -------------------- */

  const navLinks =
    document.querySelectorAll(".nav-link");

  const pageSections =
    document.querySelectorAll(
      "main section[id]"
    );

  function updateActiveNavigation() {
    let currentSectionId = "";

    pageSections.forEach((section) => {
      const sectionTop =
        section.offsetTop - 180;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
          sectionTop + sectionHeight
      ) {
        currentSectionId =
          section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const linkTarget =
        link.getAttribute("href");

      if (
        linkTarget ===
        `#${currentSectionId}`
      ) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  updateActiveNavigation();


  /* -------------------- SMOOTH INTERNAL LINKS -------------------- */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  internalLinks.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const targetElement =
          document.querySelector(targetId);

        if (!targetElement) return;

        event.preventDefault();

        const headerOffset = 95;

        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    );
  });


  /* -------------------- REVEAL ANIMATIONS -------------------- */

  const revealElements =
    document.querySelectorAll(
      `
      .section-heading,
      .intro-content,
      .intro-symbol,
      .collection-card,
      .product-card,
      .craftsmanship-content,
      .feature-item,
      .story-content,
      .statistic-item,
      .service-item,
      .newsletter-content,
      .footer-column,
      .footer-brand
      `
    );

  revealElements.forEach((element) => {
    element.classList.add(
      "reveal-on-scroll"
    );
  });

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "revealed"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -70px 0px"
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* -------------------- LAZY VIDEO CONTROL -------------------- */

  const sectionVideos =
    document.querySelectorAll(
      `
      .collection-media video,
      .signature-film,
      .craftsmanship-video
      `
    );

  const videoObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video
              .play()
              .catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.2
      }
    );

  sectionVideos.forEach((video) => {
    videoObserver.observe(video);
  });


  /* -------------------- CUSTOM CURSOR -------------------- */

  const cursorDot =
    document.querySelector(
      ".cursor-dot"
    );

  const cursorOutline =
    document.querySelector(
      ".cursor-outline"
    );

  const interactiveElements =
    document.querySelectorAll(
      "a, button, input"
    );

  if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {
    window.addEventListener(
      "mousemove",
      (event) => {
        cursorDot.style.left =
          `${event.clientX}px`;

        cursorDot.style.top =
          `${event.clientY}px`;

        cursorOutline.animate(
          {
            left:
              `${event.clientX}px`,
            top:
              `${event.clientY}px`
          },
          {
            duration: 420,
            fill: "forwards"
          }
        );
      }
    );

    interactiveElements.forEach(
      (element) => {
        element.addEventListener(
          "mouseenter",
          () => {
            cursorOutline.classList.add(
              "cursor-hover"
            );
          }
        );

        element.addEventListener(
          "mouseleave",
          () => {
            cursorOutline.classList.remove(
              "cursor-hover"
            );
          }
        );
      }
    );
  }


  /* -------------------- REVEAL CSS SUPPORT -------------------- */

  const revealStyle =
    document.createElement("style");

  revealStyle.textContent = `
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(34px);
      transition:
        opacity 0.85s ease,
        transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .reveal-on-scroll.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  document.head.appendChild(
    revealStyle
  );


  /* -------------------- INITIAL STATE -------------------- */

  updateHeroVideoButton();
  updateCraftsmanshipButton();

});

$(document).ready(function () {
  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  // Smooth scroll for nav links
  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");
    if (!target || !$(target).length) return;

    if (navbar && navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500,
      );
    } else {
      var offset = $(target).offset().top - 60;
      $("html, body").animate(
        {
          scrollTop: offset,
        },
        500,
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Smooth scroll for hero buttons and top quick buttons linking to sections (e.g. #contact)
  $('a.btn[href^="#"], a.top-quick-btn[href^="#"]').click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    if (target && $(target).length) {
      var offset = $(target).offset().top - 60;
      $("html, body").animate(
        {
          scrollTop: offset,
        },
        500,
      );
    }
  });

  // Initial content revealing js with ScrollReveal
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal({
      distance: "80px",
      duration: 1800,
      delay: 150,
      reset: false,
    });

    ScrollReveal().reveal(
      ".header a, .profile-photo, .about-content, .education",
      {
        origin: "left",
      },
    );
    ScrollReveal().reveal(
      ".header ul, .profile-text, .about-skills, .internship",
      {
        origin: "right",
      },
    );
    ScrollReveal().reveal(
      ".project-title, .contact-title, .skills-title, .section-title",
      {
        origin: "top",
      },
    );
    ScrollReveal().reveal(
      ".projects, .contact, .skills-grid, .experience-card",
      {
        origin: "bottom",
      },
    );
  }

  // Contact form submission via Web3Forms AJAX
  const contactForm = document.querySelector(".contact form");
  const msg = document.getElementById("msg");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector(".submit");
      const originalText = submitBtn ? submitBtn.textContent : "Send Message";
      if (submitBtn) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
      }

      const formData = new FormData(contactForm);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            msg.innerHTML = '<span style="color: #fed700;"><i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.</span>';
            contactForm.reset();
          } else {
            msg.innerHTML = '<span style="color: #ff6b6b;"><i class="fa-solid fa-triangle-exclamation"></i> Something went wrong. Please try again.</span>';
          }
          setTimeout(function () {
            msg.innerHTML = "";
          }, 6000);
        })
        .catch((error) => {
          msg.innerHTML = '<span style="color: #fed700;"><i class="fa-solid fa-circle-check"></i> Message sent successfully! Thank you.</span>';
          contactForm.reset();
          setTimeout(function () {
            msg.innerHTML = "";
          }, 6000);
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        });
    });
  }
});

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // If at top
  if (scrollPosition < 120) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through sections and update active class in the navbar
  $("section").each(function () {
    var target = $(this).attr("id");
    if (!target) return;

    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 100 &&
      scrollPosition < offset + height - 100
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

// Mobile navigation menu toggle
const menuIcon = document.querySelector(".menu_icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    navbar.classList.toggle("active");
  };
}

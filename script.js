const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");
const navItems = navLinks.querySelectorAll("a");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("open");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const sections = ["bemutatkozas", "szolgaltatasok", "arlista", "projektek", "kapcsolat"];

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section && window.scrollY >= section.offsetTop - 140) {
      current = id;
    }
  });
  navItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});


const modalOverlay = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = modalOverlay.querySelector(".modal-close");
const serviceButtons = document.querySelectorAll(".service-btn");

const serviceDetails = {
  arculat: {
    title: "Arculat & dizájn",
    intro:
      "Egyedi vizuális irányt adunk az esküvőtöknek, hogy a weboldal már első pillantásra hozzátok szóljon.",
    bullets: [
      "Színpaletta, tipográfia és hangulat finomhangolása",
      "Egyedi hero szekció és arculati elemek",
      "Mobilon is elegáns, letisztult megjelenés",
    ],
  },
  info: {
    title: "Információs blokkok",
    intro:
      "Az összes fontos részletet átláthatóan rendezzük, hogy a vendégek gyorsan megtaláljanak mindent.",
    bullets: [
      "Teljes menetrend",
      "Helyszínek, térképek és parkolási infók",
      "Szállás és ajándék információk",
    ],
  },
  visszajelzes: {
    title: "Visszajelzés kezelés",
    intro:
      "Egyszerű, személyre szabott kapcsolatfelvétel a vendégeknek, hogy mindig tudd, ki jön.",
    bullets: [
      "RSVP űrlap és egyedi kérdések",
      "Automatikus visszaigazolás",
      "Részletes összesítés e-mailben",
    ],
  },
  frissites: {
    title: "Gyors frissítések",
    intro:
      "Ha változik a menetrend, percek alatt frissítjük az oldalt, hogy mindenki naprakész legyen.",
    bullets: [
      "Menetrend és helyszín módosítások",
      "Utólagos kiegészítések, új blokkok",
      "Rugalmas, gyors kommunikáció",
    ],
  },
  fotoalbum: {
    title: "Fotóalbum az esküvő ideje alatt",
    intro:
      "A vendégek által készített képek egy közös, online albumban gyűlnek össze.",
    bullets: [
      "Egyedi feltöltési link a vendégeknek",
      "Közös album élőben frissül",
      "Letöltési lehetőség az esemény után",
    ],
  },
  app: {
    title: "Telefonos alkalmazás",
    intro:
      "A weboldalatok egyetlen érintéssel elérhető, alkalmazás-szerű élményt kap.",
    bullets: [
      "Ikon az asztalon, gyors megnyitás",
      "Offline elérés az alapinfókhoz"
    ],
  },
  nyelv: {
    title: "Nyelvi modul",
    intro:
      "Ha nemzetközi vendégeitek vannak, több nyelven is elérhetővé tesszük az oldalt.",
    bullets: [
      "Két vagy több nyelv kezelése",
      "Nyelvválasztó a menüben",
      "Fordítás finomhangolása stílus szerint",
    ],
  },
  onlinemMeghivo: {
    title: "Meghívó modul",
    intro:
      "Egy másik kisebb weboldal, ami meghívó jellegű kinézetet kap, és személyesen a meghívott személyeknek szól.",
    bullets: [
      "Minden meghívottnak személyes meghívó",
      "Digitálisan elküldhető linkkel",
      "Elegáns animációkkal tarkítva",
    ],
  }, 
   fizikaiMeghivo: {
    title: "Fizikai meghívó tervezés",
    intro:
      "Amennyiben szeretnétek a fizikai meghívótokat is megtervezzük teljes mértékben illeszkedve a weboldal hangulatához.",
    bullets: [
      "Akár meghívottanként egyedi meghívó dizájn",
      "Teljesen egységes hangulat",
      "A meghívón elhelyezhett QR kód irányít a weboldalra",
    ],
  },
};

const renderModalContent = (content) => {
  const listItems = content.bullets.map((item) => `<li>${item}</li>`).join("");
  modalTitle.textContent = content.title;
  modalBody.innerHTML = `
    <p>${content.intro}</p>
    <ul>${listItems}</ul>
  `;
};

const openModal = (key) => {
  const content = serviceDetails[key];
  if (!content) {
    return;
  }
  renderModalContent(content);
  modalOverlay.classList.add("open");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  modalOverlay.classList.remove("open");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.service));
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay.classList.contains("open")) {
    closeModal();
  }
});

const dateInput = document.querySelector("[data-date-input]");
const dateToggle = document.querySelector("[data-date-toggle]");
const datePicker = document.getElementById("datePicker");

if (dateInput && dateToggle && datePicker) {
  const dateTitle = datePicker.querySelector("[data-date-title]");
  const dateGrid = datePicker.querySelector("[data-date-grid]");
  const prevButton = datePicker.querySelector("[data-date-prev]");
  const nextButton = datePicker.querySelector("[data-date-next]");
  const monthNames = [
    "január",
    "február",
    "március",
    "április",
    "május",
    "június",
    "július",
    "augusztus",
    "szeptember",
    "október",
    "november",
    "december",
  ];

  const today = new Date();
  let selectedDate = null;
  let viewDate = new Date();

  const pad = (value) => String(value).padStart(2, "0");
  const toDisplayDate = (date) =>
    `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;

  const parseDisplayDate = (value) => {
    const match = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(value || "");
    if (!match) {
      return null;
    }
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const parsed = new Date(year, month, day);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }
    return parsed;
  };

  const openDatePicker = () => {
    datePicker.classList.add("open");
    datePicker.setAttribute("aria-hidden", "false");
  };

  const closeDatePicker = () => {
    datePicker.classList.remove("open");
    datePicker.setAttribute("aria-hidden", "true");
  };

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstOfMonth.getDay() + 6) % 7;

    dateTitle.textContent = `${year}. ${monthNames[month]}`;
    dateGrid.innerHTML = "";

    for (let i = 0; i < 42; i += 1) {
      const dayNumber = i - startOffset + 1;
      const cell = document.createElement("button");
      cell.type = "button";
      cell.classList.add("date-cell");
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        cell.textContent = "";
        cell.classList.add("is-outside");
        cell.disabled = true;
        dateGrid.appendChild(cell);
        continue;
      }

      const cellDate = new Date(year, month, dayNumber);
      cell.textContent = dayNumber;

      if (
        cellDate.getFullYear() === today.getFullYear() &&
        cellDate.getMonth() === today.getMonth() &&
        cellDate.getDate() === today.getDate()
      ) {
        cell.classList.add("is-today");
      }

      if (
        selectedDate &&
        cellDate.getFullYear() === selectedDate.getFullYear() &&
        cellDate.getMonth() === selectedDate.getMonth() &&
        cellDate.getDate() === selectedDate.getDate()
      ) {
        cell.classList.add("is-selected");
      }

      cell.addEventListener("click", () => {
        selectedDate = cellDate;
        dateInput.value = toDisplayDate(cellDate);
        closeDatePicker();
        renderCalendar();
      });

      dateGrid.appendChild(cell);
    }
  };

  const initialDate = parseDisplayDate(dateInput.value);
  if (initialDate) {
    selectedDate = initialDate;
    viewDate = new Date(initialDate);
  }

  renderCalendar();

  dateInput.addEventListener("click", () => {
    openDatePicker();
  });

  dateToggle.addEventListener("click", () => {
    openDatePicker();
  });

  prevButton.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    renderCalendar();
  });

  nextButton.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderCalendar();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (
      datePicker.contains(target) ||
      dateInput.contains(target) ||
      dateToggle.contains(target)
    ) {
      return;
    }
    closeDatePicker();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDatePicker();
    }
  });
}

const contactForm = document.querySelector("#kapcsolat form");
const contactCard = document.getElementById("contactCard");
const contactSuccess = document.querySelector("[data-contact-success]");

const handleContactSubmit = (event) => {
  event.preventDefault();
  const submitButton = event.target.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.classList.add("is-loading");
    submitButton.disabled = true;
  }
  const formData = new FormData(event.target);
  const templateParams = Object.fromEntries(formData.entries());

  const sendPromise = emailjs.send('service_40qxp7l', 'template_13o5ud2', templateParams);

  sendPromise.then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        if (contactCard) {
          contactCard.classList.add("is-sent");
        }
        if (contactSuccess) {
          contactSuccess.setAttribute("aria-hidden", "false");
        }
      },
      (error) => {
        console.log('FAILED...', error);
      },
    ).finally(() => {
      if (submitButton) {
        submitButton.classList.remove("is-loading");
        submitButton.disabled = false;
      }
    });
};

if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}

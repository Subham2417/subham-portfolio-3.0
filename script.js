document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });

  // Filter the case-file library.
  const filterButtons = document.querySelectorAll(".filter");
  const caseCards = document.querySelectorAll(".case-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const selected = button.dataset.filter;
    caseCards.forEach(card => {
      card.hidden = selected !== "all" && !card.dataset.category.split(" ").includes(selected);
    });
  }));

  // Case notes modal: representative approach notes, not confidential deliverables.
  const caseNotes = {
    case1: {
      kicker: "CASE FILE 001 / REPORTING",
      title: "Make performance easier to read.",
      body: "<p><strong>Objective</strong><br>Give stakeholders a structured view of current workload and service health.</p><p><strong>Approach</strong></p><ul><li>Organize data by status, age, priority, and ownership where the source data supports it.</li><li>Highlight trends and exceptions rather than relying on raw activity counts alone.</li><li>Keep reporting cadence and definitions consistent so changes are easier to interpret.</li></ul><p><strong>Value</strong><br>Clearer operational visibility and more focused follow-up. No unverified impact figures are claimed.</p>"
    },
    case2: {
      kicker: "CASE FILE 002 / PROCESS",
      title: "Make handoffs more predictable.",
      body: "<p><strong>Objective</strong><br>Reduce avoidable friction in repeatable workflows.</p><p><strong>Approach</strong></p><ul><li>Document key steps, ownership, expected timelines, and exception paths.</li><li>Identify repeated manual actions that may be suitable for automation support.</li><li>Keep a human review step for exceptions and sensitive decisions.</li></ul><p><strong>Value</strong><br>A more consistent workflow, clearer ownership, and better opportunities for continuous improvement.</p>"
    },
    case3: {
      kicker: "CASE FILE 003 / DATA QUALITY",
      title: "Make the numbers trustworthy.",
      body: "<p><strong>Objective</strong><br>Improve confidence in transaction-level information used for reporting.</p><p><strong>Approach</strong></p><ul><li>Compare relevant records and check completeness, consistency, and expected values.</li><li>Flag mismatches and maintain a clear trail of exceptions for follow-up.</li><li>Coordinate with the appropriate business teams to resolve discrepancies.</li></ul><p><strong>Value</strong><br>More reliable operational records and reporting summaries, supported by traceable validation.</p>"
    }
  };
  const modal = document.querySelector("#case-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalContent = document.querySelector("#modal-content");
  const modalKicker = document.querySelector("#modal-kicker");
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  document.querySelectorAll("[data-modal]").forEach(button => button.addEventListener("click", () => {
    const item = caseNotes[button.dataset.modal];
    if (!item || !modal) return;
    modalKicker.textContent = item.kicker;
    modalTitle.textContent = item.title;
    modalContent.innerHTML = item.body;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();
  }));
  if (modal) {
    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
  }

  const form = document.querySelector("#contact-form");
  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const topic = form.elements.topic.value;
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent(`${topic} — Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Hi Subham,\n\n${message}\n\nRegards,\n${name}\n${email}`);
    document.querySelector("#form-status").textContent = "Opening your email app with a prepared draft…";
    window.location.href = `mailto:hclsubham@gmail.com?subject=${subject}&body=${body}`;
  });
});
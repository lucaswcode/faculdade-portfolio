// ===== DADOS COMPARTILHADOS =====
const initialSkills = [
  {
    id: "s1",
    name: "React.js",
    category: "frontend",
    level: "Avançado",
    percentage: 82,
    description: "Componentes funcionais, Custom Hooks e gestão de estado.",
  },
  {
    id: "s3",
    name: "Tailwind CSS",
    category: "frontend",
    level: "Avançado",
    percentage: 90,
    description: "Estilização utilitária, design responsivo.",
  },
  {
    id: "s5",
    name: "JavaScript (ES6+)",
    category: "frontend",
    level: "Avançado",
    percentage: 88,
    description: "Manipulação de DOM, ES Modules.",
  },
  {
    id: "s6",
    name: "Node.js & Express",
    category: "backend",
    level: "Avançado",
    percentage: 75,
    description: "Criação de APIs RESTful, middlewares.",
  },
  {
    id: "s8",
    name: "PostgreSQL & MySQL",
    category: "database",
    level: "Intermediário",
    percentage: 80,
    description: "Modelagem relacional (DER), normalização.",
  },
  {
    id: "s10",
    name: "Git & GitHub",
    category: "tools",
    level: "Avançado",
    percentage: 88,
    description: "Fluxo de trabalho com branches e PRs.",
  },
];

// Store estado de seções inicializadas para evitar duplicação
const initializedSections = new Set();

const initialProjects = [
  {
    id: "p1",
    title: "Refund",
    description:
      "Aplicação front-end para gerenciamento de reembolsos empresariais. Funcionários podem submeter solicitações com comprovantes; gerentes visualizam, aprovam ou rejeitam pedidos. Implementa autenticação, upload de arquivos, validação de formulários e um dashboard com paginação.",
    longDescription:
      "Aplicação feita para solicitar e acompanhar reembolsos de forma simples e rápida.",
    category: "frontend",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/lucaswcode/web-refund",
    image: "https://i.ibb.co/LXfknWxg/refundimg.jpg",
    highlights: [
      "React: UI declarativa.",
      "TypeScript: tipagem estática e segurança em tempo de compilação.",
      "Axios: cliente HTTP usado em src/services/api.ts para chamadas à API.",
      "Zod: validação e parsing de dados de formulários antes de enviar para a API.",
      "Tailwind CSS: estilização utilitária.",
    ],
  },
  {
    id: "p2",
    title: "API Refund",
    description:
      "Sistema de API REST desenvolvido em Node.js que permite aos usuários solicitarem reembolsos de despesas. A aplicação gerencia usuários com diferentes níveis de acesso (funcionário e gerente), autenticação via JWT, upload de comprovantes e categorização de despesas.",
    longDescription:
      "API para gerenciamento de solicitações de reembolso com sistema de autenticação e upload de comprovantes.",
    category: "backend",
    tags: ["Express ", "Prisma", "JWT", "Zod", "TypeScript"],
    githubUrl: "https://github.com/lucaswcode/api-refund",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "Express - Framework web para Node.js",
      "Prisma - ORM para gerenciamento do banco de dados SQLite",
      "JWT (jsonwebtoken) - Autenticação baseada em tokens",
      "bcrypt - Criptografia de senhas",
      "Multer - Upload de arquivos",
      "Zod - Validação de dados e schemas",
      "CORS - Configuração de políticas de origem cruzada",
      "TypeScript - Tipagem estática para JavaScript",
    ],
  },
];

const academicTimeline = [
  {
    semesterNumber: 4,
    title: "5º Semestre - Em Andamento",
    year: "2026.2",
    status: "Atual",
    subjects: [
      {
        name: "Fundamentos da Programação Web",
        description:
          "Fundamentos de desenvolvimento web, HTTP, HTML, CSS e JavaScript.",
      },
      {
        name: "Sistemas Distribuídos",
        description:
          "Estudo de comunicação entre serviços e arquiteturas distribuídas.",
      },
    ],
  },
];

// ===== GERENCIADOR DE SEÇÕES (SPA) =====
function showSection(sectionId) {
  // Ocultar todas as seções
  document.querySelectorAll(".section-container").forEach((section) => {
    section.style.display = "none";
  });

  // Mostrar seção específica
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "block";
    initializeSection(sectionId);
  }

  // Atualizar navegação
  updateNavigation(sectionId);

  // Fechar menu mobile
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
  }

  // Scroll para topo
  window.scrollTo(0, 0);
}

function updateNavigation(sectionId) {
  // Remover classe 'active' de todos os links
  document.querySelectorAll("a[data-section]").forEach((link) => {
    link.classList.remove("active");
  });

  // Adicionar classe 'active' ao link correspondente
  document
    .querySelectorAll(`a[data-section="${sectionId}"]`)
    .forEach((link) => {
      link.classList.add("active");
    });
}

function initializeSection(sectionId) {
  // Evitar inicializar múltiplas vezes
  if (initializedSections.has(sectionId)) {
    return;
  }
  initializedSections.add(sectionId);

  if (sectionId === "formacao") {
    initializeFormacaoSection();
  } else if (sectionId === "portfolio") {
    initializePortfolioSection();
  } else if (sectionId === "contato") {
    initializeContatoSection();
  }
}

function initializeFormacaoSection() {
  if (document.getElementById("timeline-tabs")) {
    renderTimeline();
    renderSkills();

    // Filtros de Habilidades
    document.querySelectorAll("#skills-categories .tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll("#skills-categories .tab-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderSkills(
          btn.dataset.category,
          document.getElementById("skills-search").value,
        );
      });
    });
    document.getElementById("skills-search").addEventListener("input", (e) => {
      const activeCat = document.querySelector(
        "#skills-categories .tab-btn.active",
      ).dataset.category;
      renderSkills(activeCat, e.target.value);
    });
  }
}

function initializePortfolioSection() {
  if (document.getElementById("projects-grid")) {
    renderProjects();

    // Fechar Modais
    document.querySelectorAll("[data-close-modal]").forEach((el) => {
      el.addEventListener("click", () =>
        document.getElementById("project-modal").classList.add("hidden"),
      );
    });

    // Filtros de Projetos
    document
      .querySelectorAll("#projects-categories .tab-btn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll("#projects-categories .tab-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          renderProjects(
            btn.dataset.category,
            document.getElementById("projects-search").value,
          );
        });
      });
    document
      .getElementById("projects-search")
      .addEventListener("input", (e) => {
        const activeCat = document.querySelector(
          "#projects-categories .tab-btn.active",
        ).dataset.category;
        renderProjects(activeCat, e.target.value);
      });
  }
}

function initializeContatoSection() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    // Remover listener anterior se existir
    contactForm.onsubmit = null;

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      const inputs = {
        nome: document.getElementById("nome"),
        email: document.getElementById("email"),
        mensagem: document.getElementById("mensagem"),
      };
      const errors = {
        nome: document.getElementById("error-nome"),
        email: document.getElementById("error-email"),
        mensagem: document.getElementById("error-mensagem"),
      };
      const feedback = document.getElementById("form-feedback");

      // Limpar erros anteriores
      Object.values(inputs).forEach((input) =>
        input.classList.remove("input-error"),
      );
      Object.values(errors).forEach((err) => (err.textContent = ""));
      feedback.className = "form-feedback hidden";

      // Validar Nome
      if (inputs.nome.value.trim().length < 3) {
        inputs.nome.classList.add("input-error");
        errors.nome.textContent =
          "Informe seu nome completo (mín 3 caracteres).";
        isValid = false;
      }

      // Validar E-mail
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value.trim())) {
        inputs.email.classList.add("input-error");
        errors.email.textContent = "Informe um e-mail válido.";
        isValid = false;
      }

      // Validar Mensagem
      if (inputs.mensagem.value.trim().length < 10) {
        inputs.mensagem.classList.add("input-error");
        errors.mensagem.textContent =
          "A mensagem deve conter pelo menos 10 caracteres.";
        isValid = false;
      }

      // Enviar formulário via AJAX em vez de redirecionar
      if (isValid) {
        const btn = document.getElementById("submitBtn");
        btn.textContent = "Enviando...";
        btn.disabled = true;
        feedback.textContent = "Enviando sua mensagem...";
        feedback.classList.remove("hidden");
        feedback.classList.add("success");

        // Enviar formulário via fetch
        const formData = new FormData(contactForm);
        fetch("https://formsubmit.co/lucaswcode@gmail.com", {
          method: "POST",
          body: formData,
        })
          .then(() => {
            // Mostrar modal de confirmação em vez de redirecionar
            document
              .getElementById("contact-confirmation-modal")
              .classList.remove("hidden");

            // Resetar formulário
            contactForm.reset();
            btn.textContent = "Enviar Mensagem";
            btn.disabled = false;
            feedback.className = "form-feedback hidden";
          })
          .catch((error) => {
            feedback.textContent = "Erro ao enviar mensagem. Tente novamente.";
            feedback.classList.remove("success");
            btn.textContent = "Enviar Mensagem";
            btn.disabled = false;
          });
      }
    });
  }

  // Fechar modal de confirmação
  document.querySelectorAll("[data-close-confirmation]").forEach((el) => {
    el.addEventListener("click", () =>
      document
        .getElementById("contact-confirmation-modal")
        .classList.add("hidden"),
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. TEMA CLARO / ESCURO
  const themeToggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("bsi_portfolio_theme");
  if (savedTheme === "light") {
    document.body.classList.remove("dark-mode");
    themeToggleBtn.textContent = "🌙";
  } else {
    document.body.classList.add("dark-mode");
    themeToggleBtn.textContent = "☀️";
  }
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("bsi_portfolio_theme", isDark ? "dark" : "light");
  });

  // 2. MENU MOBILE
  const mobileToggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileToggleBtn && mobileMenu) {
    mobileToggleBtn.addEventListener("click", () =>
      mobileMenu.classList.toggle("hidden"),
    );
  }

  // 3. GERENCIAMENTO DE ROTAS (HASH NAVIGATION)
  function handleRouteChange() {
    const hash = window.location.hash.slice(1) || "sobre";
    showSection(hash);
  }

  // Navegar para seção ao clicar em links
  document.querySelectorAll("a[data-section]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      window.location.hash = sectionId;
    });
  });

  // Listening para mudanças de hash
  window.addEventListener("hashchange", handleRouteChange);

  // Inicializar com rota atual
  handleRouteChange();
});

function renderTimeline() {
  const tabsContainer = document.getElementById("timeline-tabs");
  tabsContainer.innerHTML = "";
  const initialIndex = 0;

  academicTimeline.forEach((sem, index) => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${index === initialIndex ? "active" : ""}`;
    btn.textContent = `${sem.semesterNumber}º Semestre`;
    btn.addEventListener("click", () => {
      document
        .querySelectorAll("#timeline-tabs .tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSemesterDetails(sem);
    });
    tabsContainer.appendChild(btn);
  });

  if (academicTimeline.length > 0) {
    renderSemesterDetails(academicTimeline[initialIndex]);
  }
}

function renderSemesterDetails(sem) {
  const content = document.getElementById("timeline-content");
  const subsHtml = sem.subjects
    .map(
      (sub) => `
    <div class="subject-card">
      <div class="subject-header">
        ${sub.grade ? `<span class="subject-grade">Nota: ${sub.grade}</span>` : ""}
      </div>
      <h4>${sub.name}</h4>
      <p style="font-size: 0.8rem; color: var(--text-secondary);">${sub.description}</p>
    </div>
  `,
    )
    .join("");

  content.innerHTML = `
    <div class="flex-between" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
      <div>
        <h3>${sem.title}</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">Ano: <strong style="color: var(--primary);">${sem.year}</strong></p>
      </div>
      <span class="tag-badge">${sem.status}</span>
    </div>
    <div class="subject-grid">${subsHtml}</div>
  `;
}

function renderSkills(category = "all", query = "") {
  const grid = document.getElementById("skills-grid");
  grid.innerHTML = "";
  const filtered = initialSkills.filter((skill) => {
    return (
      (category === "all" || skill.category === category) &&
      skill.name.toLowerCase().includes(query.toLowerCase())
    );
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Nenhuma habilidade encontrada.</p>`;
    return;
  }

  filtered.forEach((skill) => {
    grid.innerHTML += `
      <div class="skill-card">
        <div class="skill-header">
          <div>
            <h3>${skill.name}</h3>
            <span class="font-mono" style="font-size: 0.75rem; color: var(--primary); text-transform: capitalize;">${skill.category}</span>
          </div>
          <span class="skill-level">${skill.level}</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); min-height: 40px;">${skill.description}</p>
        <div class="skill-progress-bar"><div class="skill-progress-fill" style="width: ${skill.percentage}%;"></div></div>
      </div>
    `;
  });
}

function renderProjects(category = "all", query = "") {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";
  const filtered = initialProjects.filter((p) => {
    return (
      (category === "all" || p.category === category) &&
      (p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
    );
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Nenhum projeto encontrado.</p>`;
    return;
  }

  filtered.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "project-card artistic-card";
    card.innerHTML = `
      <div class="project-img-wrapper">
        <img src="${proj.image}" alt="${proj.title}" class="project-img" />
        <span class="project-category-badge">${proj.category}</span>
      </div>
      <div class="project-body">
        <div>
          <h3 class="project-title">${proj.title}</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">${proj.description}</p>
        </div>
        <div>
          <div class="tech-tags mt-2">
            ${proj.tags.map((t) => `<span class="tech-badge">#${t}</span>`).join("")}
          </div>
          <div class="project-footer">
            <button class="btn-primary btn-sm" onclick="openModal('${proj.id}')">Ver Detalhes</button>
            <a href="${proj.githubUrl}" target="_blank" class="btn-outline btn-sm">GitHub</a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.openModal = function (id) {
  const proj = initialProjects.find((p) => p.id === id);
  if (!proj) return;
  document.getElementById("modal-category").textContent = proj.category;
  document.getElementById("modal-image").src = proj.image;
  document.getElementById("modal-title").textContent = proj.title;
  document.getElementById("modal-description").textContent =
    proj.longDescription;
  document.getElementById("modal-github-link").href = proj.githubUrl;

  if (proj.liveUrl) {
    document.getElementById("modal-live-link").href = proj.liveUrl;
    document.getElementById("modal-live-link").classList.remove("hidden");
  } else {
    document.getElementById("modal-live-link").classList.add("hidden");
  }

  document.getElementById("modal-tags").innerHTML = proj.tags
    .map((t) => `<span class="tech-badge">#${t}</span>`)
    .join("");

  if (proj.highlights && proj.highlights.length) {
    document.getElementById("modal-highlights-list").innerHTML = proj.highlights
      .map((h) => `<li>${h}</li>`)
      .join("");
    document.getElementById("modal-highlights").classList.remove("hidden");
  } else {
    document.getElementById("modal-highlights").classList.add("hidden");
  }

  document.getElementById("project-modal").classList.remove("hidden");
};

/**
 * MD-102 Interactive Study Portal Application Logic
 * Pure vanilla JS, zero dependencies, localStorage persistence, live tenant substitution.
 */

// Application State
const STATE_STORAGE_KEY = "md102_portal_state_v1";

const state = {
  tenant: "contoso",
  checkedTasks: {},
  quizAnswers: {},
  activeDomain: "all",
  activePhase: "all",
  searchQuery: "",
  activeLabId: LABS_DATA[0].id,
  activeTab: "checklist",
  theme: "dark",
  activeScheduleTrack: "sprint" // sprint or modular
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  applyTheme(state.theme);
  initEventListeners();
  renderApp();
});

// Load / Save State
function loadStateFromStorage() {
  try {
    const saved = localStorage.getItem(STATE_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.tenant) state.tenant = parsed.tenant;
      if (parsed.checkedTasks) state.checkedTasks = parsed.checkedTasks;
      if (parsed.quizAnswers) state.quizAnswers = parsed.quizAnswers;
      if (parsed.theme) state.theme = parsed.theme;
      if (parsed.activeLabId) state.activeLabId = parsed.activeLabId;
    }
  } catch (e) {
    console.error("Error loading state from storage", e);
  }
}

function saveStateToStorage() {
  try {
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify({
      tenant: state.tenant,
      checkedTasks: state.checkedTasks,
      quizAnswers: state.quizAnswers,
      theme: state.theme,
      activeLabId: state.activeLabId
    }));
  } catch (e) {
    console.error("Error saving state to storage", e);
  }
}

// Live Tenant Variable Replacer
function formatTenant(text) {
  if (!text) return "";
  const prefix = state.tenant.trim() || "contoso";
  return text
    .replace(/<tenant>/g, prefix)
    .replace(/<Your-Tenant-ID>/g, `${prefix}-tenant-guid-102`)
    .replace(/<TenantID>/g, `${prefix}-tenant-guid-102`);
}

// Progress Calculations
function getProgressStats() {
  let totalTasks = 0;
  let completedTasks = 0;

  LABS_DATA.forEach(lab => {
    lab.checklist.forEach(item => {
      totalTasks++;
      if (state.checkedTasks[item.id]) {
        completedTasks++;
      }
    });
  });

  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Total quiz stats
  let totalQuestions = 0;
  let correctAnswers = 0;
  LABS_DATA.forEach(lab => {
    if (lab.quiz) {
      lab.quiz.forEach((q, idx) => {
        totalQuestions++;
        const answerKey = `${lab.id}-${idx}`;
        if (state.quizAnswers[answerKey] === q.correctIndex) {
          correctAnswers++;
        }
      });
    }
  });

  return {
    totalTasks,
    completedTasks,
    percentage,
    totalQuestions,
    correctAnswers,
    totalLabs: LABS_DATA.length
  };
}

function getLabProgress(lab) {
  if (!lab.checklist || lab.checklist.length === 0) return 0;
  const completed = lab.checklist.filter(item => state.checkedTasks[item.id]).length;
  return Math.round((completed / lab.checklist.length) * 100);
}

function getPhaseProgress(phaseId) {
  const phaseLabs = LABS_DATA.filter(l => l.phaseId === phaseId);
  let total = 0;
  let completed = 0;
  phaseLabs.forEach(lab => {
    lab.checklist.forEach(item => {
      total++;
      if (state.checkedTasks[item.id]) completed++;
    });
  });
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

// Theme Switcher
function applyTheme(theme) {
  state.theme = theme;
  const root = document.documentElement;
  const body = document.body;
  if (theme === "dark") {
    root.classList.add("dark");
    body.classList.add("bg-slate-950", "text-slate-100");
    body.classList.remove("bg-slate-50", "text-slate-900");
    document.getElementById("themeIcon")?.setAttribute("data-lucide", "sun");
  } else {
    root.classList.remove("dark");
    body.classList.remove("bg-slate-950", "text-slate-100");
    body.classList.add("bg-slate-50", "text-slate-900");
    document.getElementById("themeIcon")?.setAttribute("data-lucide", "moon");
  }
  saveStateToStorage();
  if (window.lucide) lucide.createIcons();
}

function toggleTheme() {
  applyTheme(state.theme === "dark" ? "light" : "dark");
}

// Event Listeners
function initEventListeners() {
  // Tenant Input
  const tenantInput = document.getElementById("tenantInput");
  if (tenantInput) {
    tenantInput.value = state.tenant;
    tenantInput.addEventListener("input", (e) => {
      state.tenant = e.target.value || "contoso";
      saveStateToStorage();
      renderLabDetail();
    });
  }

  // Search Input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.toLowerCase();
      renderLabList();
    });
  }

  // Domain Filter Click Delegation
  document.getElementById("domainFilters")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-domain]");
    if (btn) {
      state.activeDomain = btn.getAttribute("data-domain");
      document.querySelectorAll("#domainFilters [data-domain]").forEach(b => {
        b.classList.toggle("bg-sky-600", b.getAttribute("data-domain") === state.activeDomain);
        b.classList.toggle("text-white", b.getAttribute("data-domain") === state.activeDomain);
        b.classList.toggle("bg-slate-800", b.getAttribute("data-domain") !== state.activeDomain);
        b.classList.toggle("text-slate-300", b.getAttribute("data-domain") !== state.activeDomain);
      });
      renderLabList();
    }
  });

  // Modal Open/Close Buttons
  document.getElementById("btnInfra")?.addEventListener("click", () => openModal("infraModal"));
  document.getElementById("btnBudget")?.addEventListener("click", () => openModal("budgetModal"));
  document.getElementById("btnErrors")?.addEventListener("click", () => openModal("errorsModal"));
  document.getElementById("btnSchedule")?.addEventListener("click", () => openModal("scheduleModal"));
  document.getElementById("btnProgressExport")?.addEventListener("click", () => openModal("progressModal"));
  document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);

  // Close modals on escape or click outside
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop.id);
    });
  });
}

// Render Functions
function renderApp() {
  renderStatsBanner();
  renderDomainPills();
  renderLabList();
  renderLabDetail();
  renderInfraModal();
  renderBudgetModal();
  renderErrorsModal();
  renderScheduleModal();
  if (window.lucide) lucide.createIcons();
}

function renderStatsBanner() {
  const stats = getProgressStats();
  const progressText = document.getElementById("overallProgressText");
  const progressBar = document.getElementById("overallProgressBar");
  const taskCount = document.getElementById("overallTaskCount");
  const quizCount = document.getElementById("overallQuizCount");
  const labCount = document.getElementById("overallLabCount");

  if (progressText) progressText.innerText = `${stats.percentage}%`;
  if (progressBar) progressBar.style.width = `${stats.percentage}%`;
  if (taskCount) taskCount.innerText = `${stats.completedTasks}/${stats.totalTasks} Tasks`;
  if (quizCount) quizCount.innerText = `${stats.correctAnswers}/${stats.totalQuestions} Passed`;
  if (labCount) labCount.innerText = `${LABS_DATA.length} Labs`;
}

function renderDomainPills() {
  const container = document.getElementById("domainFilters");
  if (!container) return;

  const domains = [
    { id: "all", name: "All Domains", count: LABS_DATA.length },
    ...EXAM_DOMAINS.map(d => ({
      id: d.id,
      name: d.name.split(":")[0],
      weight: d.weight,
      count: LABS_DATA.filter(l => l.domainId === d.id).length
    }))
  ];

  container.innerHTML = domains.map(d => {
    const isActive = state.activeDomain === d.id;
    return `
      <button data-domain="${d.id}" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
        isActive
          ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
          : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
      }">
        <span>${d.name}</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-sky-700 text-white' : 'bg-slate-900 text-slate-400'}">${d.count}</span>
      </button>
    `;
  }).join("");
}

function renderLabList() {
  const container = document.getElementById("labListContainer");
  if (!container) return;

  let filtered = LABS_DATA;

  if (state.activeDomain !== "all") {
    filtered = filtered.filter(l => l.domainId === state.activeDomain);
  }

  if (state.activePhase !== "all") {
    filtered = filtered.filter(l => l.phaseId === state.activePhase);
  }

  if (state.searchQuery) {
    const q = state.searchQuery;
    filtered = filtered.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.summary.toLowerCase().includes(q) ||
      l.keyConcepts.some(c => c.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
        <p class="text-sm font-medium">No labs match your filter criteria.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  // Group by Phase
  const groupedByPhase = {};
  filtered.forEach(lab => {
    if (!groupedByPhase[lab.phaseId]) groupedByPhase[lab.phaseId] = [];
    groupedByPhase[lab.phaseId].push(lab);
  });

  let html = "";
  Object.keys(groupedByPhase).forEach(phaseId => {
    const phaseObj = PHASES.find(p => p.id === phaseId) || { name: phaseId };
    const phaseProgress = getPhaseProgress(phaseId);

    html += `
      <div class="mb-4">
        <div class="flex items-center justify-between px-2 py-1 mb-1.5">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">${phaseObj.name}</span>
          <span class="text-[11px] font-semibold text-slate-400">${phaseProgress}%</span>
        </div>
        <div class="space-y-1.5">
    `;

    groupedByPhase[phaseId].forEach(lab => {
      const isSelected = lab.id === state.activeLabId;
      const progress = getLabProgress(lab);
      const isComplete = progress === 100;

      html += `
        <div onclick="selectLab('${lab.id}')" class="group cursor-pointer p-2.5 rounded-xl border transition-all ${
          isSelected
            ? "bg-slate-800/90 border-sky-500 shadow-md shadow-sky-500/10 text-white"
            : "bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 text-slate-300"
        }">
          <div class="flex items-start justify-between gap-2 mb-1">
            <div class="flex items-center gap-1.5">
              <span class="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                isComplete ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }">Lab ${lab.number}</span>
              <h4 class="text-xs font-semibold truncate max-w-[190px] ${isSelected ? 'text-sky-300' : 'text-slate-200 group-hover:text-white'}">${lab.title}</h4>
            </div>
            ${
              isComplete
                ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>'
                : `<span class="text-[10px] font-mono text-slate-400">${progress}%</span>`
            }
          </div>
          <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div class="h-full ${isComplete ? 'bg-emerald-500' : 'bg-sky-500'} transition-all duration-300" style="width: ${progress}%"></div>
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;
  if (window.lucide) lucide.createIcons();
}

function selectLab(labId) {
  state.activeLabId = labId;
  saveStateToStorage();
  renderLabList();
  renderLabDetail();
}

function switchTab(tabName) {
  state.activeTab = tabName;
  renderLabDetail();
}

function renderLabDetail() {
  const container = document.getElementById("labDetailContainer");
  if (!container) return;

  const lab = LABS_DATA.find(l => l.id === state.activeLabId) || LABS_DATA[0];
  const progress = getLabProgress(lab);
  const domainObj = EXAM_DOMAINS.find(d => d.id === lab.domainId) || { name: "MD-102 Core", weight: "" };

  const tabs = [
    { id: "checklist", label: "Checklist", icon: "list-checks", count: lab.checklist.length },
    { id: "steps", label: "Step-by-Step", icon: "file-text", count: lab.steps?.length },
    { id: "scripts", label: "Script Sandbox", icon: "terminal", count: lab.scripts?.length },
    { id: "troubleshooting", label: "Failure Simulator", icon: "alert-triangle", count: lab.troubleshooting?.length },
    { id: "quiz", label: "Exam Practice", icon: "help-circle", count: lab.quiz?.length }
  ];

  let tabContentHtml = "";
  if (state.activeTab === "checklist") {
    tabContentHtml = renderChecklistTab(lab);
  } else if (state.activeTab === "steps") {
    tabContentHtml = renderStepsTab(lab);
  } else if (state.activeTab === "scripts") {
    tabContentHtml = renderScriptsTab(lab);
  } else if (state.activeTab === "troubleshooting") {
    tabContentHtml = renderTroubleshootingTab(lab);
  } else if (state.activeTab === "quiz") {
    tabContentHtml = renderQuizTab(lab);
  }

  container.innerHTML = `
    <!-- Lab Header -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 mb-5 shadow-lg relative overflow-hidden">
      <div class="absolute -right-10 -top-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
            Lab ${lab.number}
          </span>
          <span class="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
            ${domainObj.name} (${domainObj.weight})
          </span>
          <span class="text-xs px-2 py-1 rounded-lg bg-slate-800/60 text-slate-400 flex items-center gap-1">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${lab.duration}
          </span>
          <span class="text-xs px-2 py-1 rounded-lg bg-slate-800/60 text-slate-400 flex items-center gap-1">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-indigo-400"></i> ${lab.difficulty}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-slate-400">Progress:</span>
          <span class="text-sm font-bold font-mono ${progress === 100 ? 'text-emerald-400' : 'text-sky-400'}">${progress}%</span>
        </div>
      </div>

      <h2 class="text-xl md:text-2xl font-bold text-white mb-2">${lab.title}</h2>
      <p class="text-sm text-slate-300 leading-relaxed mb-4">${formatTenant(lab.summary)}</p>

      <!-- Key Concepts Pills -->
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="text-xs font-medium text-slate-400 mr-1">Key Concepts:</span>
        ${lab.keyConcepts.map(c => `
          <span class="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 font-mono">
            ${c}
          </span>
        `).join("")}
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="flex border-b border-slate-800 mb-5 overflow-x-auto no-scrollbar gap-1">
      ${tabs.map(t => {
        const isActive = state.activeTab === t.id;
        return `
          <button onclick="switchTab('${t.id}')" class="px-4 py-2.5 text-xs font-semibold rounded-t-xl transition flex items-center gap-2 whitespace-nowrap ${
            isActive
              ? "bg-slate-900 text-sky-400 border-t-2 border-sky-400 border-x border-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }">
            <i data-lucide="${t.icon}" class="w-4 h-4"></i>
            <span>${t.label}</span>
            ${t.count ? `<span class="text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'}">${t.count}</span>` : ''}
          </button>
        `;
      }).join("")}
    </div>

    <!-- Tab Content -->
    <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-sm">
      ${tabContentHtml}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

function renderChecklistTab(lab) {
  return `
    <div class="space-y-3">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 class="text-sm font-bold text-white">Hands-On Checklist & Validation Tasks</h3>
          <p class="text-xs text-slate-400">Complete all items in your lab tenant to achieve mastery.</p>
        </div>
        <button onclick="toggleAllTasks('${lab.id}')" class="text-xs text-sky-400 hover:text-sky-300 font-medium transition">
          Toggle All
        </button>
      </div>

      <div class="space-y-2.5 pt-1">
        ${lab.checklist.map((item, index) => {
          const isChecked = !!state.checkedTasks[item.id];
          return `
            <label class="flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer ${
              isChecked
                ? "bg-emerald-950/20 border-emerald-500/30 text-slate-300"
                : "bg-slate-900/90 hover:bg-slate-800/80 border-slate-800 text-slate-200"
            }">
              <input type="checkbox" ${isChecked ? "checked" : ""} onchange="toggleTask('${item.id}')" class="custom-checkbox mt-0.5" />
              <div class="flex-1 text-xs leading-relaxed select-none">
                <span class="${isChecked ? 'line-through text-slate-400' : 'font-medium text-white'}">
                  ${formatTenant(item.text)}
                </span>
              </div>
            </label>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderStepsTab(lab) {
  if (!lab.steps || lab.steps.length === 0) {
    return `<p class="text-sm text-slate-400">No step breakdown specified. Refer to the checklist tab.</p>`;
  }

  return `
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="list-ordered" class="w-4 h-4 text-sky-400"></i>
            Official MD-102 Step-by-Step Hands-On Exercises
          </h3>
          <p class="text-xs text-slate-400 mt-0.5">Follow these exact portal clicks, setting paths, and configuration parameters in your tenant.</p>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-sky-300 border border-slate-700/60">
          ${lab.steps.length} Exercises
        </span>
      </div>

      <div class="space-y-3.5">
        ${lab.steps.map(s => `
          <div class="p-4.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition shadow-sm">
            <div class="flex items-center gap-3 mb-2.5">
              <span class="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-sky-500/30 shrink-0">
                ${s.step}
              </span>
              <h4 class="text-sm font-bold text-white tracking-tight">${formatTenant(s.title)}</h4>
            </div>
            <div class="step-content text-[13px] text-slate-300 leading-relaxed pl-9 space-y-1.5">
              ${formatTenant(s.desc)}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderScriptsTab(lab) {
  if (!lab.scripts || lab.scripts.length === 0) {
    return `<p class="text-xs text-slate-400">No standalone scripts for this lab. Direct portal configuration required.</p>`;
  }

  return `
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-bold text-white">Interactive Script & Command Sandbox</h3>
          <p class="text-xs text-slate-400">All scripts dynamically reflect your tenant: <span class="font-mono text-sky-400 font-bold">${state.tenant}</span></p>
        </div>
      </div>

      <div class="space-y-4">
        ${lab.scripts.map((script, idx) => {
          const formattedCode = formatTenant(script.code);
          const blockId = `code-block-${lab.id}-${idx}`;
          return `
            <div class="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
              <div class="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800">
                <div class="flex items-center gap-2">
                  <i data-lucide="code" class="w-3.5 h-3.5 text-sky-400"></i>
                  <span class="text-xs font-semibold text-slate-200">${script.title}</span>
                  <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">${script.lang}</span>
                </div>
                <button onclick="copyCode('${blockId}')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition flex items-center gap-1">
                  <i data-lucide="copy" class="w-3 h-3 text-sky-400"></i> Copy
                </button>
              </div>
              <pre class="p-4 overflow-x-auto text-xs text-emerald-400 font-mono leading-relaxed"><code id="${blockId}">${escapeHtml(formattedCode)}</code></pre>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderTroubleshootingTab(lab) {
  if (!lab.troubleshooting || lab.troubleshooting.length === 0) {
    return `<p class="text-xs text-slate-400">No specific troubleshooting scenarios registered for this lab.</p>`;
  }

  return `
    <div class="space-y-4">
      <div>
        <h3 class="text-sm font-bold text-white">Failure Injection & Troubleshooting Simulator</h3>
        <p class="text-xs text-slate-400">Master the exact root cause analysis and diagnostic commands required in production.</p>
      </div>

      <div class="space-y-4">
        ${lab.troubleshooting.map(item => `
          <div class="rounded-xl border border-amber-500/30 bg-amber-950/10 p-4 space-y-3">
            <div class="flex items-start gap-2 text-amber-400">
              <i data-lucide="alert-octagon" class="w-4 h-4 mt-0.5 flex-shrink-0"></i>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider">Injected Failure Scenario / Symptom:</span>
                <p class="text-xs font-semibold text-white mt-0.5">${formatTenant(item.scenario)}</p>
              </div>
            </div>

            <div class="pl-6 space-y-2 text-xs border-l-2 border-amber-500/20 ml-2">
              <div>
                <span class="text-slate-400 font-bold">Root Cause Analysis:</span>
                <p class="text-slate-300 mt-0.5">${formatTenant(item.rootCause)}</p>
              </div>

              <div>
                <span class="text-slate-400 font-bold">Diagnostic / Telemetry Command:</span>
                <div class="mt-1 p-2 rounded bg-slate-950 text-sky-300 font-mono text-[11px] border border-slate-800">
                  ${formatTenant(item.diagnosticCommand)}
                </div>
              </div>

              <div>
                <span class="text-emerald-400 font-bold">Remediation & Resolution:</span>
                <p class="text-emerald-300/90 mt-0.5">${formatTenant(item.resolution)}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderQuizTab(lab) {
  if (!lab.quiz || lab.quiz.length === 0) {
    return `<p class="text-xs text-slate-400">No practice questions available for this lab.</p>`;
  }

  return `
    <div class="space-y-5">
      <div>
        <h3 class="text-sm font-bold text-white">MD-102 Exam Knowledge Check</h3>
        <p class="text-xs text-slate-400">Real exam-style scenarios with instant answer feedback and rationales.</p>
      </div>

      <div class="space-y-6">
        ${lab.quiz.map((q, qIndex) => {
          const answerKey = `${lab.id}-${qIndex}`;
          const selectedAnswer = state.quizAnswers[answerKey];
          const hasAnswered = selectedAnswer !== undefined;
          const isCorrect = hasAnswered && selectedAnswer === q.correctIndex;

          return `
            <div class="p-4 rounded-xl border ${hasAnswered ? (isCorrect ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-rose-500/40 bg-rose-950/10') : 'border-slate-800 bg-slate-900'} space-y-3">
              <div class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-slate-800 text-sky-400 font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                  Q${qIndex + 1}
                </span>
                <p class="text-xs font-semibold text-white leading-relaxed">${formatTenant(q.question)}</p>
              </div>

              <div class="space-y-2 pt-1 pl-7">
                ${q.options.map((option, optIdx) => {
                  let optStyle = "bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300";
                  if (hasAnswered) {
                    if (optIdx === q.correctIndex) {
                      optStyle = "bg-emerald-900/30 border-emerald-500 text-emerald-200 font-semibold";
                    } else if (optIdx === selectedAnswer) {
                      optStyle = "bg-rose-900/30 border-rose-500 text-rose-200";
                    } else {
                      optStyle = "opacity-40 border-slate-800 text-slate-500";
                    }
                  }

                  return `
                    <div onclick="answerQuiz('${lab.id}', ${qIndex}, ${optIdx})" class="p-2.5 rounded-lg border text-xs cursor-pointer transition flex items-center justify-between ${optStyle}">
                      <span>${option}</span>
                      ${
                        hasAnswered && optIdx === q.correctIndex
                          ? '<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>'
                          : hasAnswered && optIdx === selectedAnswer
                          ? '<i data-lucide="x" class="w-4 h-4 text-rose-400"></i>'
                          : ''
                      }
                    </div>
                  `;
                }).join("")}
              </div>

              ${
                hasAnswered
                  ? `
                    <div class="pl-7 pt-2 space-y-1.5">
                      <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                        <span class="font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
                          ${isCorrect ? '✓ Correct!' : '✗ Incorrect.'}
                        </span>
                        <p class="text-slate-300 mt-1">${formatTenant(q.rationale)}</p>
                      </div>
                      ${
                        q.examTip
                          ? `
                            <div class="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/30 text-[11px] text-indigo-300 flex items-start gap-1.5">
                              <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0"></i>
                              <span><strong>MD-102 Exam Pro-Tip:</strong> ${formatTenant(q.examTip)}</span>
                            </div>
                          `
                          : ''
                      }
                    </div>
                  `
                  : ''
              }
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// User Actions
function toggleTask(taskId) {
  state.checkedTasks[taskId] = !state.checkedTasks[taskId];
  saveStateToStorage();
  renderStatsBanner();
  renderLabList();
  renderLabDetail();
}

function toggleAllTasks(labId) {
  const lab = LABS_DATA.find(l => l.id === labId);
  if (!lab) return;

  const allChecked = lab.checklist.every(item => state.checkedTasks[item.id]);
  lab.checklist.forEach(item => {
    state.checkedTasks[item.id] = !allChecked;
  });

  saveStateToStorage();
  renderStatsBanner();
  renderLabList();
  renderLabDetail();
  showToast(allChecked ? "All tasks unchecked" : "All tasks completed! 🎉");
}

function answerQuiz(labId, qIndex, optionIndex) {
  const answerKey = `${labId}-${qIndex}`;
  if (state.quizAnswers[answerKey] !== undefined) return; // Prevent changing answer

  state.quizAnswers[answerKey] = optionIndex;
  saveStateToStorage();
  renderStatsBanner();
  renderLabDetail();
}

function copyCode(elementId) {
  const codeEl = document.getElementById(elementId);
  if (!codeEl) return;
  const text = codeEl.innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Command copied to clipboard!");
  }).catch(e => {
    console.error("Clipboard error", e);
  });
}

function showToast(message) {
  const toast = document.getElementById("toastNotification");
  if (!toast) return;
  toast.innerText = message;
  toast.classList.remove("opacity-0", "translate-y-8");
  toast.classList.add("opacity-100", "translate-y-0");
  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-8");
  }, 2500);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Modal Renders
function openModal(modalId) {
  document.getElementById(modalId)?.classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.add("hidden");
}

function renderInfraModal() {
  const container = document.getElementById("infraTableBody");
  if (!container) return;

  container.innerHTML = VM_INFRASTRUCTURE.map(vm => `
    <div class="p-4 rounded-xl border border-slate-800 bg-slate-900/90 space-y-2 text-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div class="flex items-center gap-2">
          <i data-lucide="monitor" class="w-4 h-4 text-sky-400"></i>
          <span class="font-bold text-white text-sm">${vm.name}</span>
        </div>
        <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono text-[11px]">${formatTenant(vm.persona)}</span>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-[11px]">
        <div><strong class="text-slate-400 block">Generation:</strong> <span class="text-slate-200">${vm.gen}</span></div>
        <div><strong class="text-slate-400 block">vTPM / Security:</strong> <span class="text-emerald-400 font-semibold">${vm.vtpm}</span></div>
        <div><strong class="text-slate-400 block">Hardware Specs:</strong> <span class="text-slate-200">${vm.specs}</span></div>
        <div><strong class="text-slate-400 block">OS Base:</strong> <span class="text-slate-200">${vm.os}</span></div>
      </div>
      <div class="pt-1 text-[11px]">
        <strong class="text-slate-400">Primary Testing Focus:</strong>
        <span class="text-slate-300 ml-1">${vm.purpose}</span>
      </div>
    </div>
  `).join("");
}

function renderBudgetModal() {
  const container = document.getElementById("budgetTableBody");
  if (!container) return;

  container.innerHTML = LICENSE_BUDGET.map(row => `
    <tr class="border-b border-slate-800/80 hover:bg-slate-800/40 text-xs">
      <td class="py-2.5 px-3 font-semibold text-slate-200">${row.category}</td>
      <td class="py-2.5 px-3 text-slate-300">${row.persona}</td>
      <td class="py-2.5 px-3 font-mono text-sky-400 text-[11px]">${formatTenant(row.upn)}</td>
      <td class="py-2.5 px-3 text-slate-400">${row.context}</td>
      <td class="py-2.5 px-3 text-center font-bold font-mono ${row.category === 'SAFETY RESERVE' ? 'text-amber-400' : 'text-emerald-400'}">${row.seats}</td>
    </tr>
  `).join("");
}

function renderErrorsModal() {
  const container = document.getElementById("errorDictionaryBody");
  if (!container) return;

  container.innerHTML = ERROR_CODES.map(err => `
    <div class="p-3.5 rounded-xl border border-slate-800 bg-slate-900/90 space-y-1.5 text-xs">
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono font-bold">${err.code}</span>
        <span class="font-mono text-slate-300 font-semibold">${err.hex}</span>
      </div>
      <p class="text-slate-300"><strong class="text-slate-400">Root Cause:</strong> ${err.rootCause}</p>
      <p class="text-emerald-400"><strong class="text-emerald-500">Resolution:</strong> ${err.resolution}</p>
    </div>
  `).join("");
}

function renderScheduleModal() {
  const sprintContainer = document.getElementById("sprintScheduleList");
  if (!sprintContainer) return;

  const scheduleDays = [
    { day: "Day 1", focus: "Tenant & Identity Foundation", labs: "Lab 1, Lab 2, Lab 2B", time: "2.5 hrs" },
    { day: "Day 2", focus: "Device Identity & Enrollment", labs: "Lab 3, Lab 4", time: "2.0 hrs" },
    { day: "Day 3", focus: "Modern Provisioning & Autopilot", labs: "Lab 5, Lab 5B", time: "3.0 hrs" },
    { day: "Day 4", focus: "Device Configuration & GPO Migration", labs: "Lab 6, Lab 6B", time: "2.5 hrs" },
    { day: "Day 5", focus: "Enterprise PKI, WHfB & Cloud LAPS", labs: "Lab 6C, Lab 7", time: "2.5 hrs" },
    { day: "Day 6", focus: "Compliance & Zero Trust Access", labs: "Lab 8, Lab 8B, Lab 9", time: "3.0 hrs" },
    { day: "Day 7", focus: "Application Lifecycle & MAM", labs: "Lab 10, Lab 11, Lab 11B", time: "3.0 hrs" },
    { day: "Day 8", focus: "Endpoint Security & Defender EDR", labs: "Lab 12, Lab 13, Lab 14, Lab 15", time: "3.5 hrs" },
    { day: "Day 9", focus: "Windows Updates & Diagnostics", labs: "Lab 16, Lab 17, Lab 18", time: "2.5 hrs" },
    { day: "Day 10", focus: "Automation, Cross-Platform & Capstone", labs: "Lab 19, Lab 20, Lab 22, Lab 23, Capstone", time: "4.0 hrs" }
  ];

  sprintContainer.innerHTML = scheduleDays.map(item => `
    <div class="p-3 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-between text-xs">
      <div>
        <span class="font-mono font-bold text-sky-400 mr-2">${item.day}</span>
        <strong class="text-white">${item.focus}</strong>
        <p class="text-slate-400 mt-0.5 font-mono text-[11px]">${item.labs}</p>
      </div>
      <span class="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">${item.time}</span>
    </div>
  `).join("");
}

// Progress Export / Import
function exportProgressJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
    tenant: state.tenant,
    checkedTasks: state.checkedTasks,
    quizAnswers: state.quizAnswers,
    exportedAt: new Date().toISOString()
  }, null, 2));

  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `MD102_Progress_${state.tenant}_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Progress exported successfully!");
}

function importProgressJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.checkedTasks) state.checkedTasks = imported.checkedTasks;
      if (imported.quizAnswers) state.quizAnswers = imported.quizAnswers;
      if (imported.tenant) state.tenant = imported.tenant;
      saveStateToStorage();
      renderApp();
      closeModal("progressModal");
      showToast("Progress imported successfully! 🚀");
    } catch (err) {
      alert("Invalid JSON progress file.");
    }
  };
  reader.readAsText(file);
}

function resetAllProgress() {
  if (confirm("Are you sure you want to reset all checklist tasks and quiz results?")) {
    state.checkedTasks = {};
    state.quizAnswers = {};
    saveStateToStorage();
    renderApp();
    closeModal("progressModal");
    showToast("All progress has been reset.");
  }
}

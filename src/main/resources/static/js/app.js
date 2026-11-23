// =============================================
//  Smart Campus Management System — app.js
//  Full-stack Java Spring Boot + MariaDB
//  Authentication + Role-Based Access Control
// =============================================

const $ = id => document.getElementById(id);

let currentUser = null;

// ── Toast notification ──────────────────────
function toast(msg, error = false) {
  const el = $('toast');
  el.textContent = msg;
  el.style.background = error ? '#482638' : '#1a3d38';
  el.style.borderColor = error ? '#884357' : '#347a68';
  el.classList.remove('hidden');
  clearTimeout(window._toast);
  window._toast = setTimeout(() => el.classList.add('hidden'), 3200);
}

// ── Helpers ──────────────────────────────────
function esc(v = '') {
  return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function initials(name = 'U') {
  return name.trim().split(/\s+/).slice(0,2).map(x => x[0]||'').join('').toUpperCase() || 'U';
}
function statusPill(status = '') {
  const cls = (status || '').toLowerCase().replace(/\s+/g,'-');
  return `<span class="status-pill status-${cls}">${esc(status || 'Active')}</span>`;
}
function modalState(modalId, open) {
  const el = $(modalId);
  if (el) el.classList.toggle('hidden', !open);
}

// ══════════════════════════════════════════════
//  AUTHENTICATION & ROLE-BASED ACCESS
// ══════════════════════════════════════════════

function checkAuth() {
  const stored = localStorage.getItem('sc_user');
  if (stored) {
    try {
      currentUser = JSON.parse(stored);
      applyUserRole(currentUser);
      $('authOverlay').classList.add('hidden');
      loadDashboard();
      return true;
    } catch (e) {
      localStorage.removeItem('sc_user');
    }
  }
  currentUser = null;
  $('authOverlay').classList.remove('hidden');
  return false;
}

function applyUserRole(user) {
  const role = (user.role || 'STUDENT').toUpperCase();
  document.body.className = `role-${role.toLowerCase()}`;

  // Update Topbar
  const topRolePill = $('topRolePill');
  topRolePill.className = `role-pill ${role.toLowerCase()}`;
  if (role === 'ADMIN') {
    topRolePill.textContent = 'Admin Control Panel';
  } else if (role === 'TEACHER') {
    topRolePill.textContent = 'Faculty Portal';
  } else {
    topRolePill.textContent = 'Student Portal';
  }

  $('topUserName').textContent = user.fullName || user.username || 'User';
  $('topAvatar').textContent = initials(user.fullName || user.username);

  // Update Sidebar
  $('sidebarUserName').textContent = user.fullName || user.username;
  const roleBadge = $('sidebarUserRole');
  roleBadge.textContent = role;
  roleBadge.className = `role-badge ${role.toLowerCase()}`;
  $('sidebarAvatar').textContent = initials(user.fullName || user.username);
  
  if (role === 'ADMIN') {
    $('brandRoleSubtitle').textContent = 'ADMIN CONTROL PANEL';
    $('navWorkspaceLabel').textContent = 'ADMIN WORKSPACE';
    $('sidebarCardTitle').textContent = 'Admin Control Hub';
    $('sidebarCardDesc').textContent = 'You have full CRUD master access across all campus tables.';
    $('dashEyebrow').textContent = 'CAMPUS CONTROL PANEL';
    $('dashGreeting').innerHTML = `Good day, ${esc(user.fullName || user.username)} <span class="wave">✦</span>`;
    $('dashSubtext').textContent = "Here's what's happening across your campus today.";
    $('portalNoticeTitle').textContent = "Administrator Control Panel";
    $('portalNoticeText').textContent = "You have full administrative privileges to add, edit, or delete student records, faculty profiles, course schedules, exams, tuition fees, library inventory, and campus job listings.";
  } else {
    $('brandRoleSubtitle').textContent = 'STUDENT PORTAL';
    $('navWorkspaceLabel').textContent = 'STUDENT WORKSPACE';
    $('sidebarCardTitle').textContent = 'Student Hub';
    $('sidebarCardDesc').textContent = `Enrolled in ${esc(user.department || 'Campus Department')}.`;
    $('dashEyebrow').textContent = 'STUDENT WORKSPACE';
    $('dashGreeting').innerHTML = `Welcome back, ${esc(user.fullName || user.username)} <span class="wave">✦</span>`;
    $('dashSubtext').textContent = `Department: ${esc(user.department || 'General')} · ID: #${esc(user.studentId || 'STUDENT')}`;
    $('portalNoticeTitle').textContent = "Student Self-Service Portal";
    $('portalNoticeText').textContent = "Welcome to your student workspace! You can view active course offerings, verify semester attendance, check exam grades, monitor fee payment dues, explore library books, and submit applications for campus jobs.";
  }
}

function switchAuthTab(tab) {
  $('tabLogin').classList.toggle('active', tab === 'login');
  $('tabRegister').classList.toggle('active', tab === 'register');
  $('loginForm').classList.toggle('hidden', tab !== 'login');
  $('registerForm').classList.toggle('hidden', tab !== 'register');
  $('loginError').classList.add('hidden');
  $('regError').classList.add('hidden');
}

function fillLogin(u, p) {
  $('loginUsername').value = u;
  $('loginPassword').value = p;
}

// Login form submit
$('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const username = $('loginUsername').value.trim();
  const password = $('loginPassword').value.trim();
  const btn = $('loginBtn');
  const errEl = $('loginError');

  errEl.classList.add('hidden');
  btn.disabled = true;
  btn.textContent = 'Signing in...';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Invalid username or password');
    }

    localStorage.setItem('sc_user', JSON.stringify(data.user));
    currentUser = data.user;
    applyUserRole(currentUser);
    $('authOverlay').classList.add('hidden');
    toast(`Welcome, ${currentUser.fullName || currentUser.username}!`);
    showPage('dashboard');
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign In to Campus';
  }
});

// Register form submit
$('registerForm').addEventListener('submit', async e => {
  e.preventDefault();
  const fullName = $('regFullName').value.trim();
  const username = $('regUsername').value.trim();
  const email = $('regEmail').value.trim();
  const department = $('regDepartment').value.trim();
  const role = $('regRole').value;
  const studentId = $('regStudentId').value.trim();
  const password = $('regPassword').value.trim();
  const btn = $('registerBtn');
  const errEl = $('regError');

  errEl.classList.add('hidden');
  btn.disabled = true;
  btn.textContent = 'Creating account...';

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, username, email, department, role, studentId, password })
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    toast('Account created successfully! Please sign in.');
    switchAuthTab('login');
    fillLogin(username, password);
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Create My Account';
  }
});

function logout() {
  if (confirm('Are you sure you want to sign out?')) {
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('sc_user');
    currentUser = null;
    $('authOverlay').classList.remove('hidden');
    toast('Signed out successfully.');
  }
}

function openRegisterFromAdmin() {
  switchAuthTab('register');
  $('authOverlay').classList.remove('hidden');
}

// ══════════════════════════════════════════════
//  PAGE NAVIGATION
// ══════════════════════════════════════════════
const pages = {
  dashboard: 'dashboardPage',
  students: 'studentsPage',
  teachers: 'teachersPage',
  courses: 'coursesPage',
  attendance: 'attendancePage',
  exams: 'examsPage',
  fees: 'feesPage',
  library: 'libraryPage',
  jobs: 'jobsPage',
  users: 'usersPage',
};
const pageLoaders = {};

function showPage(page) {
  Object.values(pages).forEach(id => $(id)?.classList.add('hidden'));
  $(pages[page])?.classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(a =>
    a.classList.toggle('active', a.dataset.page === page)
  );
  $('crumb').textContent = page.charAt(0).toUpperCase() + page.slice(1);
  $('sidebar').classList.remove('open');
  if (pageLoaders[page]) pageLoaders[page]();
}

document.querySelectorAll('.nav-item').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); showPage(a.dataset.page); });
});
$('mobileMenu').onclick = () => $('sidebar').classList.toggle('open');

// ══════════════════════════════════════════════
//  GENERIC CRUD FACTORY
// ══════════════════════════════════════════════
function makeCRUD(config) {
  let data = [];

  async function load() {
    $(config.tbody).innerHTML = `<tr><td colspan="${config.cols}" class="empty-cell">Loading...</td></tr>`;
    try {
      const r = await fetch(config.api);
      if (!r.ok) throw new Error(`Server error ${r.status}`);
      data = await r.json();
      if (!Array.isArray(data)) data = [];
      if (config.onLoad) config.onLoad(data);
      render();
    } catch (err) {
      $(config.tbody).innerHTML = `<tr><td colspan="${config.cols}" class="empty-cell">Could not connect. Make sure Spring Boot &amp; MariaDB are running.</td></tr>`;
      $(config.summary).textContent = 'Connection error';
      toast('Could not load data: ' + err.message, true);
    }
  }

  function render() {
    const q = $(config.searchId)?.value.trim().toLowerCase() || '';
    const filtered = data.filter(item => config.searchFields(item).toLowerCase().includes(q));
    $(config.summary).textContent = `Showing ${filtered.length} of ${data.length} record${data.length !== 1 ? 's' : ''}`;
    if (!filtered.length) {
      $(config.tbody).innerHTML = `<tr><td colspan="${config.cols}" class="empty-cell">${data.length ? 'No records match your search.' : 'No records yet. Click the add button to create one.'}</td></tr>`;
      return;
    }
    const isAdmin = currentUser && currentUser.role === 'ADMIN';
    $(config.tbody).innerHTML = filtered.map(item => config.rowTemplate(item, isAdmin)).join('');
  }

  function openAdd() {
    $(config.form).reset();
    if (config.hiddenId) $(config.hiddenId).value = '';
    if (config.eyebrow) $(config.eyebrow).textContent = 'NEW RECORD';
    if (config.modalTitle) $(config.modalTitle).textContent = config.addTitle || 'Add Record';
    if (config.saveBtn) $(config.saveBtn).textContent = config.addTitle || 'Save';
    $(config.formError)?.classList.add('hidden');
    modalState(config.modal, true);
  }

  function openEdit(id) {
    const item = data.find(d => String(d.id) === String(id));
    if (!item) return;
    $(config.form).reset();
    if (config.hiddenId) $(config.hiddenId).value = item.id;
    if (config.eyebrow) $(config.eyebrow).textContent = 'EDIT RECORD';
    if (config.modalTitle) $(config.modalTitle).textContent = config.editTitle || 'Edit Record';
    if (config.saveBtn) $(config.saveBtn).textContent = config.editTitle || 'Update';
    $(config.formError)?.classList.add('hidden');
    config.fillForm(item);
    modalState(config.modal, true);
  }

  async function save(e) {
    e.preventDefault();
    const id = config.hiddenId ? $(config.hiddenId).value : null;
    const payload = config.getPayload();
    const btn = $(config.saveBtn);
    btn.disabled = true; btn.textContent = 'Saving...';
    try {
      const url = id ? `${config.api}/${id}` : config.api;
      const method = id ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(await r.text() || `Error ${r.status}`);
      modalState(config.modal, false);
      await load();
      toast(id ? 'Record updated successfully.' : 'Record added successfully.');
    } catch (err) {
      $(config.formError).textContent = err.message;
      $(config.formError).classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.textContent = id ? (config.editTitle || 'Update') : (config.addTitle || 'Save');
    }
  }

  async function del(id) {
    const item = data.find(d => String(d.id) === String(id));
    const label = item ? (item.name || item.title || item.studentName || item.code || '#' + id) : 'this record';
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      const r = await fetch(`${config.api}/${id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error(`Error ${r.status}`);
      await load();
      toast('Record deleted successfully.');
    } catch (err) {
      toast('Could not delete: ' + err.message, true);
    }
  }

  // Wire up events
  $(config.tbody).addEventListener('click', e => {
    const editBtn = e.target.closest('[data-edit]');
    const delBtn  = e.target.closest('[data-delete]');
    if (editBtn) openEdit(editBtn.dataset.edit);
    if (delBtn)  del(delBtn.dataset.delete);
  });
  if (config.addBtn)  $(config.addBtn).onclick = openAdd;
  if (config.closeBtn) $(config.closeBtn).onclick = () => modalState(config.modal, false);
  if (config.cancelBtn) $(config.cancelBtn).onclick = () => modalState(config.modal, false);
  if (config.refreshBtn) $(config.refreshBtn).onclick = load;
  $(config.form).addEventListener('submit', save);
  $(config.searchId)?.addEventListener('input', render);

  pageLoaders[config.page] = load;
  return { load, render, getData: () => data };
}

// ══════════════════════════════════════════════
//  STUDENTS
// ══════════════════════════════════════════════
const students = makeCRUD({
  api: '/api/students', page: 'students',
  tbody: 'studentRows', summary: 'studentSummary', cols: 5,
  searchId: 'studentSearch',
  modal: 'studentModal', form: 'studentForm',
  hiddenId: 'studentId', formError: 'studentFormError',
  eyebrow: 'studentModalEyebrow', modalTitle: 'studentModalTitle',
  addBtn: 'addStudentBtn', closeBtn: 'closeStudentModal',
  cancelBtn: 'cancelStudentModal', refreshBtn: 'studentRefresh',
  saveBtn: 'saveStudentBtn', addTitle: 'Save Student', editTitle: 'Update Student',
  searchFields: s => [s.name, s.email, s.department, s.phone, s.id].join(' '),
  onLoad: data => {
    $('dashStudents').textContent = data.length;
    $('navStudentCount').textContent = data.length;
    const sel = $('studentDeptFilter');
    const cur = sel.value;
    const deps = [...new Set(data.map(s => s.department || '').filter(Boolean))].sort();
    sel.innerHTML = '<option value="">All departments</option>' + deps.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join('');
    if (deps.includes(cur)) sel.value = cur;
  },
  rowTemplate: (s, isAdmin) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar">${esc(initials(s.name))}</div><div><div class="student-name">${esc(s.name||'Unnamed')}</div><div class="student-email">${esc(s.email||'—')}</div></div></div></td>
      <td><span class="dept-pill">${esc(s.department||'—')}</span></td>
      <td>${esc(s.phone||'—')}</td>
      <td>#${esc(s.id)}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${s.id}">Edit</button><button class="action-btn delete" data-delete="${s.id}">Delete</button>` : `<span style="color:#71829f;font-size:10px">Enrolled</span>`}
        </div>
      </td>
    </tr>`,
  fillForm: s => { $('studentName').value=s.name||'';$('studentEmail').value=s.email||'';$('studentDept').value=s.department||'';$('studentPhone').value=s.phone||''; },
  getPayload: () => ({ name:$('studentName').value.trim(), email:$('studentEmail').value.trim(), department:$('studentDept').value.trim(), phone:$('studentPhone').value.trim() }),
});
$('studentDeptFilter').addEventListener('change', () => students.render());

// ══════════════════════════════════════════════
//  TEACHERS
// ══════════════════════════════════════════════
makeCRUD({
  api: '/api/teachers', page: 'teachers',
  tbody: 'teacherRows', summary: 'teacherSummary', cols: 5,
  searchId: 'teacherSearch',
  modal: 'teacherModal', form: 'teacherForm',
  hiddenId: 'teacherId', formError: 'teacherFormError',
  eyebrow: 'teacherModalEyebrow', modalTitle: 'teacherModalTitle',
  addBtn: 'addTeacherBtn', closeBtn: 'closeTeacherModal',
  cancelBtn: 'cancelTeacherModal', refreshBtn: 'teacherRefresh',
  saveBtn: 'saveTeacherBtn', addTitle: 'Save Teacher', editTitle: 'Update Teacher',
  searchFields: t => [t.name, t.email, t.department, t.designation, t.phone].join(' '),
  onLoad: data => { $('dashTeachers').textContent = data.length; $('navTeacherCount').textContent = data.length; },
  rowTemplate: (t, isAdmin) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#1d3657;color:#83bcff">${esc(initials(t.name))}</div><div><div class="student-name">${esc(t.name||'Unnamed')}</div><div class="student-email">${esc(t.email||'—')}</div></div></div></td>
      <td><span class="dept-pill">${esc(t.department||'—')}</span></td>
      <td>${esc(t.designation||'—')}</td>
      <td>${esc(t.phone||'—')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${t.id}">Edit</button><button class="action-btn delete" data-delete="${t.id}">Delete</button>` : `<span style="color:#71829f;font-size:10px">Faculty</span>`}
        </div>
      </td>
    </tr>`,
  fillForm: t => { $('teacherName').value=t.name||'';$('teacherEmail').value=t.email||'';$('teacherDept').value=t.department||'';$('teacherPhone').value=t.phone||'';$('teacherDesignation').value=t.designation||'';$('teacherQualification').value=t.qualification||'';$('teacherJoinDate').value=t.joinDate||''; },
  getPayload: () => ({ name:$('teacherName').value.trim(), email:$('teacherEmail').value.trim(), department:$('teacherDept').value.trim(), phone:$('teacherPhone').value.trim(), designation:$('teacherDesignation').value.trim(), qualification:$('teacherQualification').value.trim(), joinDate:$('teacherJoinDate').value }),
});

// ══════════════════════════════════════════════
//  COURSES
// ══════════════════════════════════════════════
makeCRUD({
  api: '/api/courses', page: 'courses',
  tbody: 'courseRows', summary: 'courseSummary', cols: 6,
  searchId: 'courseSearch',
  modal: 'courseModal', form: 'courseForm',
  hiddenId: 'courseId', formError: 'courseFormError',
  eyebrow: 'courseModalEyebrow', modalTitle: 'courseModalTitle',
  addBtn: 'addCourseBtn', closeBtn: 'closeCourseModal',
  cancelBtn: 'cancelCourseModal', refreshBtn: 'courseRefresh',
  saveBtn: 'saveCourseBtn', addTitle: 'Save Course', editTitle: 'Update Course',
  searchFields: c => [c.code, c.name, c.department, c.teacherName, c.semester].join(' '),
  onLoad: data => { $('dashCourses').textContent = data.length; $('navCourseCount').textContent = data.length; },
  rowTemplate: (c, isAdmin) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#1d3657;color:#83bcff;font-size:9px">${esc(c.code||'?')}</div><div><div class="student-name">${esc(c.name||'Unnamed')}</div><div class="student-email">${esc(c.semester||'—')} · ${esc(c.schedule||'')}</div></div></div></td>
      <td><span class="dept-pill">${esc(c.department||'—')}</span></td>
      <td>${esc(c.teacherName||'—')}</td>
      <td>${esc(c.creditHours||'3.0')}</td>
      <td>${statusPill(c.status||'Active')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${c.id}">Edit</button><button class="action-btn delete" data-delete="${c.id}">Delete</button>` : `<span style="color:#6be0b9;font-size:10px">Enrolled</span>`}
        </div>
      </td>
    </tr>`,
  fillForm: c => { $('courseCode').value=c.code||'';$('courseName').value=c.name||'';$('courseDept').value=c.department||'';$('courseTeacher').value=c.teacherName||'';$('courseCredits').value=c.creditHours||'';$('courseSemester').value=c.semester||'';$('courseSchedule').value=c.schedule||'';$('courseStatus').value=c.status||'Active'; },
  getPayload: () => ({ code:$('courseCode').value.trim(), name:$('courseName').value.trim(), department:$('courseDept').value.trim(), teacherName:$('courseTeacher').value.trim(), creditHours:$('courseCredits').value.trim(), semester:$('courseSemester').value.trim(), schedule:$('courseSchedule').value.trim(), status:$('courseStatus').value }),
});

// ══════════════════════════════════════════════
//  ATTENDANCE
// ══════════════════════════════════════════════
makeCRUD({
  api: '/api/attendance', page: 'attendance',
  tbody: 'attendanceRows', summary: 'attendanceSummary', cols: 5,
  searchId: 'attendanceSearch',
  modal: 'attendanceModal', form: 'attendanceForm',
  hiddenId: 'attId', formError: 'attFormError',
  eyebrow: 'attModalEyebrow', modalTitle: 'attModalTitle',
  addBtn: 'addAttendanceBtn', closeBtn: 'closeAttModal',
  cancelBtn: 'cancelAttModal', refreshBtn: 'attendanceRefresh',
  saveBtn: 'saveAttBtn', addTitle: 'Save Record', editTitle: 'Update Record',
  searchFields: a => [a.studentName, a.studentId, a.course, a.date, a.status].join(' '),
  onLoad: data => { $('dashAttendance').textContent = data.length; $('navAttendanceCount').textContent = data.length; },
  rowTemplate: (a, isAdmin) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar">${esc(initials(a.studentName))}</div><div><div class="student-name">${esc(a.studentName||'—')}</div><div class="student-email">ID: ${esc(a.studentId||'—')}</div></div></div></td>
      <td>${esc(a.course||'—')}</td>
      <td>${esc(a.date||'—')}</td>
      <td>${statusPill(a.status||'—')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${a.id}">Edit</button><button class="action-btn delete" data-delete="${a.id}">Delete</button>` : `<span style="color:#71829f;font-size:10px">Logged</span>`}
        </div>
      </td>
    </tr>`,
  fillForm: a => { $('attStudentName').value=a.studentName||'';$('attStudentId').value=a.studentId||'';$('attCourse').value=a.course||'';$('attDate').value=a.date||'';$('attStatus').value=a.status||'Present'; },
  getPayload: () => ({ studentName:$('attStudentName').value.trim(), studentId:$('attStudentId').value.trim(), course:$('attCourse').value.trim(), date:$('attDate').value, status:$('attStatus').value }),
});

// ══════════════════════════════════════════════
//  EXAMS
// ══════════════════════════════════════════════
makeCRUD({
  api: '/api/exams', page: 'exams',
  tbody: 'examRows', summary: 'examSummary', cols: 6,
  searchId: 'examSearch',
  modal: 'examModal', form: 'examForm',
  hiddenId: 'examId', formError: 'examFormError',
  eyebrow: 'examModalEyebrow', modalTitle: 'examModalTitle',
  addBtn: 'addExamBtn', closeBtn: 'closeExamModal',
  cancelBtn: 'cancelExamModal', refreshBtn: 'examRefresh',
  saveBtn: 'saveExamBtn', addTitle: 'Save Result', editTitle: 'Update Result',
  searchFields: e => [e.studentName, e.studentId, e.course, e.examType, e.grade, e.semester].join(' '),
  onLoad: data => { $('dashExams').textContent = data.length; $('navExamCount').textContent = data.length; },
  rowTemplate: (e, isAdmin) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar">${esc(initials(e.studentName))}</div><div><div class="student-name">${esc(e.studentName||'—')}</div><div class="student-email">ID: ${esc(e.studentId||'—')}</div></div></div></td>
      <td>${esc(e.course||'—')}</td>
      <td><span class="dept-pill">${esc(e.examType||'—')}</span></td>
      <td>${esc(e.obtainedMarks||'—')} / ${esc(e.totalMarks||'—')}</td>
      <td><b style="color:#8b7cff">${esc(e.grade||'—')}</b></td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${e.id}">Edit</button><button class="action-btn delete" data-delete="${e.id}">Delete</button>` : `<span style="color:#8b7cff;font-size:10px">Published</span>`}
        </div>
      </td>
    </tr>`,
  fillForm: e => { $('examStudentName').value=e.studentName||'';$('examStudentId').value=e.studentId||'';$('examCourse').value=e.course||'';$('examType').value=e.examType||'Midterm';$('examTotal').value=e.totalMarks||'';$('examObtained').value=e.obtainedMarks||'';$('examGrade').value=e.grade||'';$('examSemester').value=e.semester||'';$('examDate').value=e.examDate||''; },
  getPayload: () => ({ studentName:$('examStudentName').value.trim(), studentId:$('examStudentId').value.trim(), course:$('examCourse').value.trim(), examType:$('examType').value, totalMarks:$('examTotal').value.trim(), obtainedMarks:$('examObtained').value.trim(), grade:$('examGrade').value.trim(), semester:$('examSemester').value.trim(), examDate:$('examDate').value }),
});

// ══════════════════════════════════════════════
//  FEES
// ══════════════════════════════════════════════
makeCRUD({
  api: '/api/fees', page: 'fees',
  tbody: 'feeRows', summary: 'feeSummary', cols: 6,
  searchId: 'feeSearch',
  modal: 'feeModal', form: 'feeForm',
  hiddenId: 'feeId', formError: 'feeFormError',
  eyebrow: 'feeModalEyebrow', modalTitle: 'feeModalTitle',
  addBtn: 'addFeeBtn', closeBtn: 'closeFeeModal',
  cancelBtn: 'cancelFeeModal', refreshBtn: 'feeRefresh',
  saveBtn: 'saveFeeBtn', addTitle: 'Save Fee', editTitle: 'Update Fee',
  searchFields: f => [f.studentName, f.studentId, f.feeType, f.status].join(' '),
  onLoad: data => { $('dashFees').textContent = data.length; $('navFeeCount').textContent = data.length; },
  rowTemplate: (f, isAdmin) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar">${esc(initials(f.studentName))}</div><div><div class="student-name">${esc(f.studentName||'—')}</div><div class="student-email">ID: ${esc(f.studentId||'—')}</div></div></div></td>
      <td><span class="dept-pill">${esc(f.feeType||'—')}</span></td>
      <td><b style="color:#ffb86b">৳ ${esc(f.amount||'0')}</b></td>
      <td>${esc(f.dueDate||'—')}</td>
      <td>${statusPill(f.status||'—')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${f.id}">Edit</button><button class="action-btn delete" data-delete="${f.id}">Delete</button>` : `<span style="color:#ffb86b;font-size:10px">${esc(f.status||'Pending')}</span>`}
        </div>
      </td>
    </tr>`,
  fillForm: f => { $('feeStudentName').value=f.studentName||'';$('feeStudentId').value=f.studentId||'';$('feeType').value=f.feeType||'Tuition';$('feeAmount').value=f.amount||'';$('feeDueDate').value=f.dueDate||'';$('feePaidDate').value=f.paidDate||'';$('feeStatus').value=f.status||'Unpaid'; },
  getPayload: () => ({ studentName:$('feeStudentName').value.trim(), studentId:$('feeStudentId').value.trim(), feeType:$('feeType').value, amount:$('feeAmount').value.trim(), dueDate:$('feeDueDate').value, paidDate:$('feePaidDate').value, status:$('feeStatus').value }),
});

// ══════════════════════════════════════════════
//  LIBRARY
// ══════════════════════════════════════════════
makeCRUD({
  api: '/api/library', page: 'library',
  tbody: 'libraryRows', summary: 'librarySummary', cols: 6,
  searchId: 'librarySearch',
  modal: 'libraryModal', form: 'libraryForm',
  hiddenId: 'bookId', formError: 'libFormError',
  eyebrow: 'libModalEyebrow', modalTitle: 'libModalTitle',
  addBtn: 'addBookBtn', closeBtn: 'closeLibModal',
  cancelBtn: 'cancelLibModal', refreshBtn: 'libraryRefresh',
  saveBtn: 'saveBookBtn', addTitle: 'Save Book', editTitle: 'Update Book',
  searchFields: b => [b.title, b.author, b.category, b.isbn, b.publisher].join(' '),
  onLoad: data => { $('dashLibrary').textContent = data.length; $('navLibraryCount').textContent = data.length; },
  rowTemplate: (b, isAdmin) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#173f3b;color:#6ce3bd;font-size:11px">▣</div><div><div class="student-name">${esc(b.title||'Untitled')}</div><div class="student-email">ISBN: ${esc(b.isbn||'—')} · ${esc(b.publisher||'')}</div></div></div></td>
      <td>${esc(b.author||'—')}</td>
      <td><span class="dept-pill">${esc(b.category||'—')}</span></td>
      <td>${esc(b.totalCopies||'—')}</td>
      <td>${statusPill(b.availableCopies > 0 ? 'Available' : 'Out of Stock')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${b.id}">Edit</button><button class="action-btn delete" data-delete="${b.id}">Delete</button>` : `<button class="action-btn apply" onclick="toast('Book requested successfully from Campus Library!')">Reserve</button>`}
        </div>
      </td>
    </tr>`,
  fillForm: b => { $('bookTitle').value=b.title||'';$('bookAuthor').value=b.author||'';$('bookIsbn').value=b.isbn||'';$('bookCategory').value=b.category||'';$('bookPublisher').value=b.publisher||'';$('bookYear').value=b.publishYear||'';$('bookTotal').value=b.totalCopies||'';$('bookAvailable').value=b.availableCopies||'';$('bookStatus').value=b.status||'Available'; },
  getPayload: () => ({ title:$('bookTitle').value.trim(), author:$('bookAuthor').value.trim(), isbn:$('bookIsbn').value.trim(), category:$('bookCategory').value.trim(), publisher:$('bookPublisher').value.trim(), publishYear:$('bookYear').value.trim(), totalCopies:$('bookTotal').value.trim(), availableCopies:$('bookAvailable').value.trim(), status:$('bookStatus').value }),
});

// ══════════════════════════════════════════════
//  JOBS
// ══════════════════════════════════════════════
const jobs = makeCRUD({
  api: '/api/jobs', page: 'jobs',
  tbody: 'jobRows', summary: 'jobSummary', cols: 7,
  searchId: 'jobSearch',
  modal: 'jobModal', form: 'jobForm',
  hiddenId: 'jobId', formError: 'jobFormError',
  eyebrow: 'jobModalEyebrow', modalTitle: 'jobModalTitle',
  addBtn: 'addJobBtn', closeBtn: 'closeJobModal',
  cancelBtn: 'cancelJobModal', refreshBtn: 'jobRefresh',
  saveBtn: 'saveJobBtn', addTitle: 'Post Job', editTitle: 'Update Job',
  searchFields: j => [j.title, j.company, j.location, j.type, j.status].join(' '),
  onLoad: data => {
    const open = data.filter(j => j.status === 'Open').length;
    $('dashJobs').textContent = open;
    $('navJobCount').textContent = data.length;
  },
  rowTemplate: (j, isAdmin) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#493525;color:#ffc58d;font-size:12px">⚑</div><div><div class="student-name">${esc(j.title||'Untitled')}</div><div class="student-email">${esc(j.salary||'Salary negotiable')}</div></div></div></td>
      <td>${esc(j.company||'—')}</td>
      <td>${esc(j.location||'—')}</td>
      <td><span class="dept-pill">${esc(j.type||'—')}</span></td>
      <td>${esc(j.deadline||'—')}</td>
      <td>${statusPill(j.status||'Open')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${j.id}">Edit</button><button class="action-btn delete" data-delete="${j.id}">Delete</button>` : `<button class="action-btn apply" onclick="openApplyJob(${j.id})">Apply Now</button>`}
        </div>
      </td>
    </tr>`,
  fillForm: j => { $('jobTitle').value=j.title||'';$('jobCompany').value=j.company||'';$('jobLocation').value=j.location||'';$('jobType').value=j.type||'Full-time';$('jobSalary').value=j.salary||'';$('jobDeadline').value=j.deadline||'';$('jobStatus').value=j.status||'Open';$('jobDescription').value=j.description||''; },
  getPayload: () => ({ title:$('jobTitle').value.trim(), company:$('jobCompany').value.trim(), location:$('jobLocation').value.trim(), type:$('jobType').value, salary:$('jobSalary').value.trim(), deadline:$('jobDeadline').value, status:$('jobStatus').value, description:$('jobDescription').value.trim() }),
});

// Student Job Application
function openApplyJob(jobId) {
  const jobList = jobs.getData();
  const j = jobList.find(x => x.id === jobId);
  $('applyJobTitle').textContent = `Apply: ${j?.title || 'Job'}`;
  $('applyJobDetails').textContent = `Company: ${j?.company || 'N/A'} · Location: ${j?.location || 'N/A'} · Type: ${j?.type || 'N/A'}`;
  $('applicantName').value = currentUser?.fullName || '';
  $('applicantEmail').value = currentUser?.email || '';
  $('applicantStudentId').value = currentUser?.studentId || '';
  modalState('applyJobModal', true);
}

function submitJobApplication(e) {
  e.preventDefault();
  modalState('applyJobModal', false);
  toast('Application submitted successfully! Recruiter will contact you.');
}

// ══════════════════════════════════════════════
//  USER ACCOUNTS MANAGEMENT (ADMIN ONLY)
// ══════════════════════════════════════════════
let usersList = [];

async function loadUsers() {
  const tbody = $('userRows');
  tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">Loading registered users...</td></tr>';
  try {
    const res = await fetch('/api/auth/users');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    usersList = await res.json();
    renderUsers();
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">Could not load users.</td></tr>';
    toast('Could not load user accounts: ' + err.message, true);
  }
}

function renderUsers() {
  const q = $('userSearch')?.value.trim().toLowerCase() || '';
  const filtered = usersList.filter(u => 
    [u.username, u.fullName, u.email, u.role, u.department].join(' ').toLowerCase().includes(q)
  );

  $('userSummary').textContent = `Showing ${filtered.length} of ${usersList.length} user account${usersList.length !== 1 ? 's' : ''}`;
  const tbody = $('userRows');
  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">No users found.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(u => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#27264d;color:#c7c0ff">${esc(initials(u.fullName || u.username))}</div><div><div class="student-name">${esc(u.fullName || u.username)}</div><div class="student-email">ID: ${esc(u.studentId || 'N/A')}</div></div></div></td>
      <td><code>${esc(u.username)}</code></td>
      <td>${esc(u.email || '—')}</td>
      <td><span class="dept-pill">${esc(u.department || 'General')}</span></td>
      <td><span class="role-badge ${(u.role||'student').toLowerCase()}">${esc(u.role || 'STUDENT')}</span></td>
      <td>
        <div class="row-actions">
          ${currentUser && currentUser.username === u.username ? `<span style="color:#6be0b9;font-size:10px">Current User</span>` : `<button class="action-btn delete" onclick="deleteUser(${u.id})">Remove</button>`}
        </div>
      </td>
    </tr>
  `).join('');
}

async function deleteUser(id) {
  if (!confirm('Are you sure you want to delete this user account?')) return;
  try {
    const res = await fetch(`/api/auth/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Could not delete user');
    toast('User account removed successfully.');
    await loadUsers();
  } catch (err) {
    toast('Error: ' + err.message, true);
  }
}

$('userSearch')?.addEventListener('input', renderUsers);
pageLoaders['users'] = loadUsers;

// ══════════════════════════════════════════════
//  DASHBOARD COUNTS
// ══════════════════════════════════════════════
async function loadDashboard() {
  const apis = [
    ['/api/students',  'dashStudents',   'navStudentCount'],
    ['/api/teachers',  'dashTeachers',   'navTeacherCount'],
    ['/api/courses',   'dashCourses',    'navCourseCount'],
    ['/api/fees',      'dashFees',       'navFeeCount'],
    ['/api/library',   'dashLibrary',    'navLibraryCount'],
    ['/api/attendance','dashAttendance', 'navAttendanceCount'],
    ['/api/exams',     'dashExams',      'navExamCount'],
  ];
  for (const [url, dashId, navId] of apis) {
    try {
      const r = await fetch(url);
      if (r.ok) {
        const d = await r.json();
        if (Array.isArray(d)) {
          if (dashId) $(dashId).textContent = d.length;
          if (navId)  $(navId).textContent  = d.length;
        }
      }
    } catch {}
  }
  try {
    const r = await fetch('/api/jobs');
    if (r.ok) {
      const d = await r.json();
      if (Array.isArray(d)) {
        $('dashJobs').textContent = d.filter(j => j.status === 'Open').length;
        $('navJobCount').textContent = d.length;
      }
    }
  } catch {}
}

pageLoaders['dashboard'] = loadDashboard;

// ── Startup ──────────────────────────────────
checkAuth();

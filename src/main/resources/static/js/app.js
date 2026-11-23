// =============================================
//  Smart Campus Management System — app.js
//  Full-stack Java Spring Boot + MariaDB
//  Multi-University Bangladesh Architecture
//  Master Admin: omi / Omi@2026
// =============================================

const $ = id => document.getElementById(id);

let currentUser = null;
let currentUniversity = localStorage.getItem('sc_university') || 'Metropolitan University';

// University Registry
const UNIVERSITIES = {
  'Metropolitan University': { code: 'MU', city: 'Sylhet', campus: 'Bateshwar, Sylhet', title: 'Metropolitan University' },
  'Shahjalal University of Science and Technology': { code: 'SUST', city: 'Sylhet', campus: 'Kumargaon, Sylhet', title: 'Shahjalal University of Science & Tech' },
  'University of Dhaka': { code: 'DU', city: 'Dhaka', campus: 'Nilkhet, Dhaka', title: 'University of Dhaka' },
  'Bangladesh University of Engineering and Technology': { code: 'BUET', city: 'Dhaka', campus: 'Palashi, Dhaka', title: 'BUET' },
  'Leading University': { code: 'LU', city: 'Sylhet', campus: 'Ragibnagar, Sylhet', title: 'Leading University' },
  'Sylhet Agricultural University': { code: 'SAU', city: 'Sylhet', campus: 'Tilagarh, Sylhet', title: 'Sylhet Agricultural University' },
  'North South University': { code: 'NSU', city: 'Dhaka', campus: 'Bashundhara, Dhaka', title: 'North South University' },
  'BRAC University': { code: 'BRACU', city: 'Dhaka', campus: 'Merul Badda, Dhaka', title: 'BRAC University' },
  'AIUB': { code: 'AIUB', city: 'Dhaka', campus: 'Kuratoli, Dhaka', title: 'American International University-BD' },
  'Chittagong University of Engineering & Technology': { code: 'CUET', city: 'Chittagong', campus: 'Raozan, Chittagong', title: 'CUET' },
  'Rajshahi University': { code: 'RU', city: 'Rajshahi', campus: 'Motihar, Rajshahi', title: 'Rajshahi University' },
  'Khulna University of Engineering & Technology': { code: 'KUET', city: 'Khulna', campus: 'Teligati, Khulna', title: 'KUET' },
  'Jahangirnagar University': { code: 'JU', city: 'Savar', campus: 'Savar, Dhaka', title: 'Jahangirnagar University' },
  'East West University': { code: 'EWU', city: 'Dhaka', campus: 'Aftabnagar, Dhaka', title: 'East West University' },
  'United International University': { code: 'UIU', city: 'Dhaka', campus: 'Madani Avenue, Dhaka', title: 'United International University' },
  'Daffodil International University': { code: 'DIU', city: 'Dhaka', campus: 'Ashulia, Dhaka', title: 'Daffodil International University' }
};

// Base Mock Data for Metropolitan University and others
function buildInitialData(uniName) {
  const uni = UNIVERSITIES[uniName] || UNIVERSITIES['Metropolitan University'];
  const pfx = uni.code;

  return {
    users: [
      { id: 1, username: 'omi', fullName: 'Omi (Master Administrator)', email: 'halimaomi2002@gmail.com', role: 'ADMIN', department: 'Administration', studentId: 'ADM-OMI-01', university: uniName },
      { id: 2, username: 'student', fullName: 'Tanvir Ahmed', email: 'tanvir.student@gmail.com', role: 'STUDENT', department: 'Computer Science & Engineering', studentId: `${pfx}-2024-001`, university: uniName },
      { id: 3, username: 'teacher', fullName: 'Dr. Ayesha Siddiqa', email: 'ayesha.teacher@gmail.com', role: 'TEACHER', department: 'Computer Science & Engineering', studentId: `FAC-${pfx}-005`, university: uniName },
      { id: 4, username: 'staff', fullName: 'Md. Karim Uddin', email: 'karim.staff@gmail.com', role: 'STAFF', department: 'Campus Operations', studentId: `STF-${pfx}-102`, university: uniName },
    ],
    students: [
      { id: 1, name: 'Ayesha Rahman', email: 'ayesha.student@gmail.com', department: 'Computer Science & Engineering', phone: '+880 1711-000111', university: uniName },
      { id: 2, name: 'Tanvir Ahmed', email: 'tanvir.student@gmail.com', department: 'Computer Science & Engineering', phone: '+880 1812-222333', university: uniName },
      { id: 3, name: 'Nusrat Jahan', email: 'nusrat.student@gmail.com', department: 'Software Engineering', phone: '+880 1913-444555', university: uniName },
      { id: 4, name: 'Mahmudul Hasan', email: 'mahmud.student@gmail.com', department: 'Business Administration (BBA)', phone: '+880 1514-666777', university: uniName },
    ],
    teachers: [
      { id: 1, name: 'Dr. Ayesha Siddiqa', email: 'ayesha.teacher@gmail.com', department: 'Computer Science & Engineering', designation: 'Professor & Head', phone: '+880 1712-345678', qualification: 'Ph.D in Computer Science', joinDate: '2019-01-15', university: uniName },
      { id: 2, name: 'Prof. Kamal Hossain', email: 'kamal.teacher@gmail.com', department: 'Computer Science & Engineering', designation: 'Associate Professor', phone: '+880 1813-987654', qualification: 'M.Sc in Software Systems', joinDate: '2021-08-01', university: uniName },
      { id: 3, name: 'Dr. Mahbubur Rahman', email: 'mahbub.teacher@gmail.com', department: 'Business Administration', designation: 'Assistant Professor', phone: '+880 1612-445566', qualification: 'Ph.D in Finance', joinDate: '2022-03-10', university: uniName },
    ],
    courses: [
      { id: 1, code: 'CSE-301', name: 'Object Oriented Programming with Java', department: 'Computer Science & Engineering', teacherName: 'Dr. Ayesha Siddiqa', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 10:00 AM (Academic Bldg)', status: 'Active', university: uniName },
      { id: 2, code: 'CSE-305', name: 'Database Management Systems', department: 'Computer Science & Engineering', teacherName: 'Prof. Kamal Hossain', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Wed 11:30 AM (Computer Lab 2)', status: 'Active', university: uniName },
      { id: 3, code: 'SWE-201', name: 'Software Engineering & Design Patterns', department: 'Software Engineering', teacherName: 'Dr. Ayesha Siddiqa', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 02:00 PM', status: 'Active', university: uniName },
      { id: 4, code: 'BBA-101', name: 'Principles of Management', department: 'Business Administration', teacherName: 'Dr. Mahbubur Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 09:00 AM', status: 'Active', university: uniName },
    ],
    attendance: [
      { id: 1, studentName: 'Tanvir Ahmed', studentId: `${pfx}-2024-001`, course: 'CSE-301', date: '2026-11-20', status: 'Present', university: uniName },
      { id: 2, studentName: 'Ayesha Rahman', studentId: `${pfx}-2024-002`, course: 'CSE-301', date: '2026-11-20', status: 'Present', university: uniName },
      { id: 3, studentName: 'Nusrat Jahan', studentId: `${pfx}-2024-003`, course: 'SWE-201', date: '2026-11-21', status: 'Late', university: uniName },
    ],
    exams: [
      { id: 1, studentName: 'Tanvir Ahmed', studentId: `${pfx}-2024-001`, course: 'CSE-301', examType: 'Midterm', totalMarks: '100', obtainedMarks: '94', grade: 'A+', semester: 'Fall 2026', examDate: '2026-10-15', university: uniName },
      { id: 2, studentName: 'Ayesha Rahman', studentId: `${pfx}-2024-002`, course: 'CSE-301', examType: 'Midterm', totalMarks: '100', obtainedMarks: '89', grade: 'A', semester: 'Fall 2026', examDate: '2026-10-15', university: uniName },
    ],
    fees: [
      { id: 1, studentName: 'Tanvir Ahmed', studentId: `${pfx}-2024-001`, feeType: 'Tuition Fee', amount: '28,000', dueDate: '2026-12-01', paidDate: '2026-11-10', status: 'Paid', university: uniName },
      { id: 2, studentName: 'Ayesha Rahman', studentId: `${pfx}-2024-002`, feeType: 'Semester Exam Fee', amount: '4,000', dueDate: '2026-12-15', paidDate: '', status: 'Unpaid', university: uniName },
    ],
    library: [
      { id: 1, title: 'Clean Code: A Handbook of Agile Software', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Software Engineering', publisher: 'Prentice Hall', publishYear: '2020', totalCopies: '8', availableCopies: '5', status: 'Available', university: uniName },
      { id: 2, title: 'Core Java Volume I — Fundamentals (12th Ed)', author: 'Cay S. Horstmann', isbn: '978-0135166307', category: 'Computer Science', publisher: 'Pearson', publishYear: '2023', totalCopies: '6', availableCopies: '3', status: 'Available', university: uniName },
      { id: 3, title: 'Spring Boot in Action', author: 'Craig Walls', isbn: '978-1617297571', category: 'Java Frameworks', publisher: 'Manning', publishYear: '2023', totalCopies: '5', availableCopies: '4', status: 'Available', university: uniName },
      { id: 4, title: 'Database System Concepts (7th Edition)', author: 'Silberschatz & Korth', isbn: '978-0078022159', category: 'Database Systems', publisher: 'McGraw-Hill', publishYear: '2021', totalCopies: '7', availableCopies: '2', status: 'Available', university: uniName },
    ],
    jobs: [
      { id: 1, title: 'Junior Java & Spring Boot Developer', company: 'Brain Station 23', location: `${uni.city} / Dhaka, Bangladesh`, type: 'Full-time', salary: '38,000 - 48,000 BDT', deadline: '2026-12-30', status: 'Open', description: `Exclusive campus recruitment for ${uni.title} graduating seniors with Java & Spring Boot proficiency.`, university: uniName },
      { id: 2, title: `${uni.code} Campus IT Support Assistant`, company: `${uni.title} IT Center`, location: `${uni.campus}`, type: 'Internship', salary: '16,000 BDT / month', deadline: '2026-12-15', status: 'Open', description: `Hands-on student internship maintaining campus network and computer labs at ${uni.title}.`, university: uniName },
      { id: 3, title: 'Associate Software QA Engineer', company: 'Therap BD', location: 'Dhaka / Hybrid', type: 'Full-time', salary: '32,000 - 42,000 BDT', deadline: '2026-12-25', status: 'Open', description: 'API test case preparation and automated test scripting.', university: uniName },
    ]
  };
}

// Initialize Data Store for current university
function initUniversityStore(uniName) {
  const store = buildInitialData(uniName);
  Object.keys(store).forEach(key => {
    const storageKey = `sc_${uniName}_${key}`;
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(store[key]));
    }
  });
}

function getStore(key) {
  const storageKey = `sc_${currentUniversity}_${key}`;
  const data = localStorage.getItem(storageKey);
  if (data) return JSON.parse(data);
  const store = buildInitialData(currentUniversity);
  return store[key] || [];
}

function setStore(key, data) {
  const storageKey = `sc_${currentUniversity}_${key}`;
  localStorage.setItem(storageKey, JSON.stringify(data));
}

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

// Password Eye Toggle
function togglePasswordVisibility(inputId, btn) {
  const inp = $(inputId);
  if (!inp) return;
  if (inp.type === 'password') {
    inp.type = 'text';
    btn.textContent = '🙈';
    btn.title = 'Hide password';
  } else {
    inp.type = 'password';
    btn.textContent = '👁';
    btn.title = 'Show password';
  }
}

// ══════════════════════════════════════════════
//  UNIVERSITY SWITCHER
// ══════════════════════════════════════════════
function onUniversityChange(newUni) {
  currentUniversity = newUni;
  localStorage.setItem('sc_university', newUni);
  initUniversityStore(newUni);
  updateUniversityUI();
  reloadAllData();
  toast(`🏛️ Switched to ${newUni} campus database!`);
}

function updateUniversityUI() {
  const uni = UNIVERSITIES[currentUniversity] || UNIVERSITIES['Metropolitan University'];
  
  if ($('universitySelector')) $('universitySelector').value = currentUniversity;
  if ($('guestBarUni')) $('guestBarUni').textContent = `${currentUniversity} (${uni.city})`;
  if ($('brandMarkBadge')) $('brandMarkBadge').textContent = uni.code;
  if ($('brandRoleSubtitle')) $('brandRoleSubtitle').textContent = currentUniversity.toUpperCase();
  if ($('sidebarCardTitle')) $('sidebarCardTitle').textContent = currentUniversity;
  if ($('sidebarCardDesc')) $('sidebarCardDesc').textContent = `${uni.campus}. Smart Academic & Research Suite.`;
  if ($('authModalUniTitle')) $('authModalUniTitle').textContent = uni.code + ' Smart Campus';
  if ($('uniNoticeEyebrow')) $('uniNoticeEyebrow').textContent = currentUniversity.toUpperCase();

  // Notice text
  if ($('portalNoticeText')) {
    $('portalNoticeText').textContent = `Currently viewing academic database for ${currentUniversity} (${uni.city}, Bangladesh). Students, faculty and staff can login using their credentials or Gmail. Admin Omi holds exclusive Master Control Panel access.`;
  }

  // Update table university indicators
  const tags = ['courseTableUniNotice', 'jobsTableUniNotice', 'libraryTableUniNotice', 'teachersTableUniNotice', 'studentsTableUniNotice'];
  tags.forEach(t => {
    if ($(t)) $(t).textContent = currentUniversity;
  });
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
      return true;
    } catch (e) {
      localStorage.removeItem('sc_user');
    }
  }
  // If not logged in -> Start in GUEST VIEWER mode!
  currentUser = null;
  applyUserRole(null);
  return false;
}

function applyUserRole(user) {
  if (!user) {
    // Guest Viewer Mode
    document.body.className = 'role-guest';
    const topRolePill = $('topRolePill');
    topRolePill.className = 'role-pill guest';
    topRolePill.textContent = 'Guest Viewer';
    $('topUserName').textContent = 'Guest';
    $('topAvatar').textContent = 'G';

    $('sidebarUserName').textContent = 'Guest Viewer';
    const roleBadge = $('sidebarUserRole');
    roleBadge.textContent = 'VIEWER';
    roleBadge.className = 'role-badge guest';
    $('sidebarAvatar').textContent = 'G';

    $('dashEyebrow').textContent = `${currentUniversity.toUpperCase()} PUBLIC PORTAL`;
    $('dashGreeting').innerHTML = `Welcome to ${esc(currentUniversity)} <span class="wave">✦</span>`;
    $('dashSubtext').textContent = 'Explore academic courses, career opportunities and library resources in Bangladesh.';
    $('portalNoticeTitle').textContent = 'Public Viewer Mode';
    return;
  }

  const role = (user.role || 'STUDENT').toUpperCase();
  document.body.className = `role-${role.toLowerCase()}`;

  // Update Topbar
  const topRolePill = $('topRolePill');
  topRolePill.className = `role-pill ${role.toLowerCase()}`;
  if (role === 'ADMIN') {
    topRolePill.textContent = 'Master Admin Control Panel';
  } else if (role === 'TEACHER') {
    topRolePill.textContent = 'Faculty Portal';
  } else if (role === 'STAFF') {
    topRolePill.textContent = 'Staff Workspace';
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
    $('sidebarCardTitle').textContent = 'Master Control Hub';
    $('sidebarCardDesc').textContent = 'Exclusive administrator access for Omi to control all campus databases.';
    $('dashEyebrow').textContent = 'MASTER ADMIN CONTROL PANEL';
    $('dashGreeting').innerHTML = `Welcome back, Omi <span class="wave">✦</span>`;
    $('dashSubtext').textContent = `Full administrative privileges active for ${esc(currentUniversity)} and all universities.`;
    $('portalNoticeTitle').textContent = "Administrator Control Center";
    $('portalNoticeText').textContent = "You are logged in as Master Admin Omi. You have exclusive authorization to add, edit, or delete student records, faculty profiles, course schedules, exams, tuition fees, library inventory, and manage registered users.";
  } else {
    const roleTitle = role === 'TEACHER' ? 'Faculty Portal' : (role === 'STAFF' ? 'Staff Portal' : 'Student Portal');
    $('brandRoleSubtitle').textContent = roleTitle.toUpperCase();
    $('navWorkspaceLabel').textContent = 'USER WORKSPACE';
    $('sidebarCardTitle').textContent = `${user.fullName || 'User'} Workspace`;
    $('sidebarCardDesc').textContent = `University: ${esc(user.university || currentUniversity)}`;
    $('dashEyebrow').textContent = roleTitle.toUpperCase();
    $('dashGreeting').innerHTML = `Welcome back, ${esc(user.fullName || user.username)} <span class="wave">✦</span>`;
    $('dashSubtext').textContent = `Gmail: ${esc(user.email || 'Registered User')} · Campus: ${esc(user.university || currentUniversity)}`;
    $('portalNoticeTitle').textContent = `${roleTitle} Workspace`;
  }
}

function openAuthModal(tab = 'login') {
  switchAuthTab(tab);
  if ($('regUniversity')) $('regUniversity').value = currentUniversity;
  $('authOverlay').classList.remove('hidden');
}

function closeAuthModal() {
  $('authOverlay').classList.add('hidden');
}

function switchAuthTab(tab) {
  $('tabLogin').classList.toggle('active', tab === 'login');
  $('tabRegister').classList.toggle('active', tab === 'register');
  $('loginForm').classList.toggle('hidden', tab !== 'login');
  $('registerForm').classList.toggle('hidden', tab !== 'register');
  $('loginError').classList.add('hidden');
  $('regError').classList.add('hidden');
}

// Login form submit (Accepts Username or Gmail)
// Master Admin: omi / Omi@2026
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
    let authUser = null;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) authUser = data.user;
      }
    } catch (netErr) {}

    if (!authUser) {
      // Local fallback for offline / Vercel preview
      const localUsers = getStore('users');
      const searchKey = username.toLowerCase();

      // Check for Master Admin: omi / Omi@2026
      if ((searchKey === 'omi' || searchKey === 'admin' || searchKey === 'halimaomi2002@gmail.com') && password === 'Omi@2026') {
        authUser = {
          id: 1,
          username: 'omi',
          fullName: 'Omi (Master Administrator)',
          email: 'halimaomi2002@gmail.com',
          role: 'ADMIN',
          department: 'Administration',
          university: currentUniversity
        };
      } else {
        const found = localUsers.find(u => 
          (u.username && u.username.toLowerCase() === searchKey) || 
          (u.email && u.email.toLowerCase() === searchKey)
        );
        if (found && (password === 'student123' || password === 'teacher123' || password === 'staff123' || password.length >= 3)) {
          authUser = found;
        }
      }
    }

    if (!authUser) {
      throw new Error('Invalid Gmail/Username or Password. For Admin, use omi / Omi@2026.');
    }

    localStorage.setItem('sc_user', JSON.stringify(authUser));
    currentUser = authUser;
    if (currentUser.university && currentUser.university !== currentUniversity) {
      currentUniversity = currentUser.university;
      localStorage.setItem('sc_university', currentUniversity);
      updateUniversityUI();
    }
    applyUserRole(currentUser);
    closeAuthModal();
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

// Register form submit (Students, Teachers, Staff with University)
$('registerForm').addEventListener('submit', async e => {
  e.preventDefault();
  const university = $('regUniversity').value;
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
    let registered = false;
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, email, department, role, studentId, password, university })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) registered = true;
      }
    } catch (netErr) {}

    // Store in university data
    const localUsers = getStore('users');
    const newUser = { id: Date.now(), fullName, username, email, department, role: (role === 'ADMIN' ? 'STUDENT' : role), studentId, university };
    localUsers.push(newUser);
    setStore('users', localUsers);

    toast(`Account created for ${university}! You can now sign in.`);
    switchAuthTab('login');
    $('loginUsername').value = email; // prefill Gmail
    $('loginPassword').value = password;
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
    applyUserRole(null);
    toast('Signed out. You are now browsing as Guest Viewer.');
    showPage('dashboard');
  }
}

// ══════════════════════════════════════════════
//  PAGE NAVIGATION
// ══════════════════════════════════════════════
const pages = {
  dashboard: 'dashboardPage',
  courses: 'coursesPage',
  jobs: 'jobsPage',
  library: 'libraryPage',
  teachers: 'teachersPage',
  students: 'studentsPage',
  attendance: 'attendancePage',
  exams: 'examsPage',
  fees: 'feesPage',
  users: 'usersPage',
};
const pageLoaders = {};

function showPage(page) {
  if (page === 'users' && (!currentUser || currentUser.role !== 'ADMIN')) {
    toast('Access denied. Control Panel is reserved exclusively for Master Admin Omi.', true);
    openAuthModal('login');
    return;
  }

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
//  GENERIC CRUD FACTORY (Dual-Mode: API + Local)
// ══════════════════════════════════════════════
function makeCRUD(config) {
  let data = [];
  const storeKey = config.page;

  async function load() {
    $(config.tbody).innerHTML = `<tr><td colspan="${config.cols}" class="empty-cell">Loading...</td></tr>`;
    try {
      const r = await fetch(config.api);
      if (r.ok) {
        data = await r.json();
      } else {
        throw new Error();
      }
    } catch (err) {
      data = getStore(storeKey);
    }
    if (!Array.isArray(data)) data = [];
    if (config.onLoad) config.onLoad(data);
    render();
  }

  function render() {
    const q = $(config.searchId)?.value.trim().toLowerCase() || '';
    const filtered = data.filter(item => config.searchFields(item).toLowerCase().includes(q));
    $(config.summary).textContent = `Showing ${filtered.length} of ${data.length} records (${currentUniversity})`;
    if (!filtered.length) {
      $(config.tbody).innerHTML = `<tr><td colspan="${config.cols}" class="empty-cell">${data.length ? 'No records match search.' : `No records yet for ${currentUniversity}.`}</td></tr>`;
      return;
    }
    const isAdmin = currentUser && currentUser.role === 'ADMIN';
    const isGuest = !currentUser;
    $(config.tbody).innerHTML = filtered.map(item => config.rowTemplate(item, isAdmin, isGuest)).join('');
  }

  function openAdd() {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      toast('Permission denied: Only Master Admin Omi can add records.', true);
      return;
    }
    $(config.form).reset();
    if (config.hiddenId) $(config.hiddenId).value = '';
    if (config.eyebrow) $(config.eyebrow).textContent = 'NEW RECORD';
    if (config.modalTitle) $(config.modalTitle).textContent = config.addTitle || 'Add Record';
    if (config.saveBtn) $(config.saveBtn).textContent = config.addTitle || 'Save';
    $(config.formError)?.classList.add('hidden');
    modalState(config.modal, true);
  }

  function openEdit(id) {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      toast('Permission denied: Only Master Admin Omi can edit records.', true);
      return;
    }
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
    if (!currentUser || currentUser.role !== 'ADMIN') {
      toast('Permission denied: Only Master Admin Omi can save modifications.', true);
      return;
    }
    const id = config.hiddenId ? $(config.hiddenId).value : null;
    const payload = config.getPayload();
    payload.university = currentUniversity;
    const btn = $(config.saveBtn);
    btn.disabled = true; btn.textContent = 'Saving...';
    try {
      let savedViaApi = false;
      try {
        const url = id ? `${config.api}/${id}` : config.api;
        const method = id ? 'PUT' : 'POST';
        const r = await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
        if (r.ok) savedViaApi = true;
      } catch (e) {}

      if (!savedViaApi) {
        const items = getStore(storeKey);
        if (id) {
          const idx = items.findIndex(x => String(x.id) === String(id));
          if (idx !== -1) items[idx] = { ...items[idx], ...payload };
        } else {
          payload.id = Date.now();
          items.push(payload);
        }
        setStore(storeKey, items);
      }

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
    if (!currentUser || currentUser.role !== 'ADMIN') {
      toast('Permission denied: Only Master Admin Omi can delete records.', true);
      return;
    }
    const item = data.find(d => String(d.id) === String(id));
    const label = item ? (item.name || item.title || item.studentName || item.code || '#' + id) : 'this record';
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      let deletedViaApi = false;
      try {
        const r = await fetch(`${config.api}/${id}`, { method: 'DELETE' });
        if (r.ok) deletedViaApi = true;
      } catch (e) {}

      if (!deletedViaApi) {
        let items = getStore(storeKey);
        items = items.filter(x => String(x.id) !== String(id));
        setStore(storeKey, items);
      }

      await load();
      toast('Record deleted successfully.');
    } catch (err) {
      toast('Could not delete: ' + err.message, true);
    }
  }

  // Events
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
//  COURSES
// ══════════════════════════════════════════════
const coursesCRUD = makeCRUD({
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
  rowTemplate: (c, isAdmin, isGuest) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#1d3657;color:#83bcff;font-size:9px">${esc(c.code||'?')}</div><div><div class="student-name">${esc(c.name||'Unnamed')}</div><div class="student-email">${esc(c.semester||'—')} · ${esc(c.schedule||'')}</div></div></div></td>
      <td><span class="dept-pill">${esc(c.department||'—')}</span></td>
      <td>${esc(c.teacherName||'—')}</td>
      <td>${esc(c.creditHours||'3.0')}</td>
      <td>${statusPill(c.status||'Active')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${c.id}">Edit</button><button class="action-btn delete" data-delete="${c.id}">Delete</button>` : `<span style="color:#6be0b9;font-size:10px">${isGuest ? 'Available' : 'Enrolled'}</span>`}
        </div>
      </td>
    </tr>`,
  fillForm: c => { $('courseCode').value=c.code||'';$('courseName').value=c.name||'';$('courseDept').value=c.department||'';$('courseTeacher').value=c.teacherName||'';$('courseCredits').value=c.creditHours||'';$('courseSemester').value=c.semester||'';$('courseSchedule').value=c.schedule||'';$('courseStatus').value=c.status||'Active'; },
  getPayload: () => ({ code:$('courseCode').value.trim(), name:$('courseName').value.trim(), department:$('courseDept').value.trim(), teacherName:$('courseTeacher').value.trim(), creditHours:$('courseCredits').value.trim(), semester:$('courseSemester').value.trim(), schedule:$('courseSchedule').value.trim(), status:$('courseStatus').value }),
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
  rowTemplate: (j, isAdmin, isGuest) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#493525;color:#ffc58d;font-size:12px">⚑</div><div><div class="student-name">${esc(j.title||'Untitled')}</div><div class="student-email">${esc(j.salary||'Salary negotiable')}</div></div></div></td>
      <td>${esc(j.company||'—')}</td>
      <td>${esc(j.location||'—')}</td>
      <td><span class="dept-pill">${esc(j.type||'—')}</span></td>
      <td>${esc(j.deadline||'—')}</td>
      <td>${statusPill(j.status||'Open')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${j.id}">Edit</button><button class="action-btn delete" data-delete="${j.id}">Delete</button>` : `<button class="action-btn apply" onclick="handleJobApplyClick(${j.id})">Apply Now</button>`}
        </div>
      </td>
    </tr>`,
  fillForm: j => { $('jobTitle').value=j.title||'';$('jobCompany').value=j.company||'';$('jobLocation').value=j.location||'';$('jobType').value=j.type||'Full-time';$('jobSalary').value=j.salary||'';$('jobDeadline').value=j.deadline||'';$('jobStatus').value=j.status||'Open';$('jobDescription').value=j.description||''; },
  getPayload: () => ({ title:$('jobTitle').value.trim(), company:$('jobCompany').value.trim(), location:$('jobLocation').value.trim(), type:$('jobType').value, salary:$('jobSalary').value.trim(), deadline:$('jobDeadline').value, status:$('jobStatus').value, description:$('jobDescription').value.trim() }),
});

function handleJobApplyClick(jobId) {
  if (!currentUser) {
    toast(`Please Sign In to apply for campus jobs at ${currentUniversity}.`);
    openAuthModal('login');
    return;
  }
  const jobList = jobs.getData();
  const j = jobList.find(x => x.id === jobId);
  $('applyJobTitle').textContent = `Apply: ${j?.title || 'Job'}`;
  $('applyJobDetails').textContent = `Company: ${j?.company || 'N/A'} · Location: ${j?.location || 'N/A'} · Campus: ${currentUniversity}`;
  $('applicantName').value = currentUser?.fullName || '';
  $('applicantEmail').value = currentUser?.email || '';
  $('applicantStudentId').value = currentUser?.studentId || '';
  modalState('applyJobModal', true);
}

function submitJobApplication(e) {
  e.preventDefault();
  modalState('applyJobModal', false);
  toast(`Application submitted successfully to ${currentUniversity} placement office!`);
}

// ══════════════════════════════════════════════
//  LIBRARY
// ══════════════════════════════════════════════
const libraryCRUD = makeCRUD({
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
  rowTemplate: (b, isAdmin, isGuest) => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#173f3b;color:#6ce3bd;font-size:11px">▣</div><div><div class="student-name">${esc(b.title||'Untitled')}</div><div class="student-email">ISBN: ${esc(b.isbn||'—')} · ${esc(b.publisher||'')}</div></div></div></td>
      <td>${esc(b.author||'—')}</td>
      <td><span class="dept-pill">${esc(b.category||'—')}</span></td>
      <td>${esc(b.totalCopies||'—')}</td>
      <td>${statusPill(b.availableCopies > 0 ? 'Available' : 'Out of Stock')}</td>
      <td>
        <div class="row-actions">
          ${isAdmin ? `<button class="action-btn" data-edit="${b.id}">Edit</button><button class="action-btn delete" data-delete="${b.id}">Delete</button>` : `<button class="action-btn apply" onclick="handleReserveBookClick()">Reserve</button>`}
        </div>
      </td>
    </tr>`,
  fillForm: b => { $('bookTitle').value=b.title||'';$('bookAuthor').value=b.author||'';$('bookIsbn').value=b.isbn||'';$('bookCategory').value=b.category||'';$('bookPublisher').value=b.publisher||'';$('bookYear').value=b.publishYear||'';$('bookTotal').value=b.totalCopies||'';$('bookAvailable').value=b.availableCopies||'';$('bookStatus').value=b.status||'Available'; },
  getPayload: () => ({ title:$('bookTitle').value.trim(), author:$('bookAuthor').value.trim(), isbn:$('bookIsbn').value.trim(), category:$('bookCategory').value.trim(), publisher:$('bookPublisher').value.trim(), publishYear:$('bookYear').value.trim(), totalCopies:$('bookTotal').value.trim(), availableCopies:$('bookAvailable').value.trim(), status:$('bookStatus').value }),
});

function handleReserveBookClick() {
  if (!currentUser) {
    toast(`Please Sign In to reserve books from ${currentUniversity} Central Library.`);
    openAuthModal('login');
    return;
  }
  toast(`Book reserved from ${currentUniversity} Central Library!`);
}

// ══════════════════════════════════════════════
//  TEACHERS
// ══════════════════════════════════════════════
const teachersCRUD = makeCRUD({
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
//  STUDENTS (User & Admin View)
// ══════════════════════════════════════════════
const studentsCRUD = makeCRUD({
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
$('studentDeptFilter').addEventListener('change', () => studentsCRUD.render());

// ══════════════════════════════════════════════
//  ATTENDANCE
// ══════════════════════════════════════════════
const attendanceCRUD = makeCRUD({
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
const examsCRUD = makeCRUD({
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
const feesCRUD = makeCRUD({
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
//  USER ACCOUNTS CONTROL PANEL (MASTER ADMIN OMI ONLY)
// ══════════════════════════════════════════════
let usersList = [];

async function loadUsers() {
  if (!currentUser || currentUser.role !== 'ADMIN') return;
  const tbody = $('userRows');
  tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">Loading registered users...</td></tr>';
  try {
    const res = await fetch('/api/auth/users');
    if (res.ok) {
      usersList = await res.json();
    } else {
      throw new Error();
    }
  } catch (err) {
    usersList = getStore('users');
  }
  renderUsers();
}

function renderUsers() {
  const q = $('userSearch')?.value.trim().toLowerCase() || '';
  const filtered = usersList.filter(u => 
    [u.username, u.fullName, u.email, u.role, u.department, u.university].join(' ').toLowerCase().includes(q)
  );

  $('userSummary').textContent = `Showing ${filtered.length} of ${usersList.length} accounts`;
  const tbody = $('userRows');
  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">No users found.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(u => `
    <tr>
      <td><div class="student-cell"><div class="student-avatar" style="background:#27264d;color:#c7c0ff">${esc(initials(u.fullName || u.username))}</div><div><div class="student-name">${esc(u.fullName || u.username)}</div><div class="student-email">${esc(u.email || 'No email')}</div></div></div></td>
      <td><code>${esc(u.username)}</code></td>
      <td><span class="dept-pill">${esc(u.university || currentUniversity)}</span></td>
      <td><span class="role-badge ${(u.role||'student').toLowerCase()}">${esc(u.role || 'STUDENT')}</span></td>
      <td><span class="dept-pill">${esc(u.department || 'General')}</span></td>
      <td>
        <div class="row-actions">
          ${u.username === 'omi' ? `<span style="color:#ff96ba;font-size:10px;font-weight:700">Master Admin Omi</span>` : `<button class="action-btn delete" onclick="deleteUserAccount(${u.id})">Delete User</button>`}
        </div>
      </td>
    </tr>
  `).join('');
}

async function deleteUserAccount(id) {
  if (!currentUser || currentUser.role !== 'ADMIN') {
    toast('Permission denied.', true);
    return;
  }
  if (!confirm('Are you sure you want to delete this user account from the system?')) return;
  try {
    let deleted = false;
    try {
      const res = await fetch(`/api/auth/users/${id}`, { method: 'DELETE' });
      if (res.ok) deleted = true;
    } catch (e) {}

    if (!deleted) {
      usersList = usersList.filter(u => u.id !== id);
      setStore('users', usersList);
    }

    toast('User account deleted.');
    await loadUsers();
  } catch (err) {
    toast('Error: ' + err.message, true);
  }
}

$('userSearch')?.addEventListener('input', renderUsers);
pageLoaders['users'] = loadUsers;

// ══════════════════════════════════════════════
//  DASHBOARD COUNTS & RELOAD
// ══════════════════════════════════════════════
function reloadAllData() {
  coursesCRUD.load();
  jobs.load();
  libraryCRUD.load();
  teachersCRUD.load();
  studentsCRUD.load();
  attendanceCRUD.load();
  examsCRUD.load();
  feesCRUD.load();
  loadDashboard();
}

async function loadDashboard() {
  const modules = ['courses', 'jobs', 'library', 'teachers', 'students', 'fees', 'attendance', 'exams'];
  for (const mod of modules) {
    let list = [];
    try {
      const r = await fetch(`/api/${mod}`);
      if (r.ok) list = await r.json();
      else throw new Error();
    } catch (e) {
      list = getStore(mod);
    }
    const cap = mod.charAt(0).toUpperCase() + mod.slice(1);
    if ($(`dash${cap}`)) $(`dash${cap}`).textContent = list.length;
    if ($(`nav${cap.slice(0, -1)}Count`)) $(`nav${cap.slice(0, -1)}Count`).textContent = list.length;
    if (mod === 'students' && $('navStudentCount')) $('navStudentCount').textContent = list.length;
    if (mod === 'fees' && $('navFeeCount')) $('navFeeCount').textContent = list.length;
  }
}

pageLoaders['dashboard'] = loadDashboard;

// ── Startup ──────────────────────────────────
initUniversityStore(currentUniversity);
updateUniversityUI();
checkAuth();
showPage('dashboard');

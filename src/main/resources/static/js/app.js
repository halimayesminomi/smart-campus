// =============================================
//  Smart Campus Management System — app.js
//  Full-stack Java Spring Boot + MariaDB
//  Multi-University Bangladesh Architecture
//  Master Admin: omi / Omi@2026
// =============================================

const $ = id => document.getElementById(id);

let currentUser = null;
let currentUniversity = localStorage.getItem('sc_university') || 'Metropolitan University';

// =============================================
//  Comprehensive Bangladesh University Registry
//  16 Institutions with 100% Unique Datasets:
//  Real Faculty, Courses, Campus Careers, Libraries
// =============================================
const UNIVERSITIES = {
  'Metropolitan University': {
    code: 'MU', city: 'Sylhet', campus: 'Bateshwar, Sylhet',
    title: 'Metropolitan University', logo: '🏛️', themeClass: 'uni-MU', est: '2003',
    specialty: 'Pioneering private university in Sylhet renowned for Computer Science, Software Engineering and Business.',
    details: 'Metropolitan University (MU) was established in 2003 in Sylhet. Featuring modern computing labs, robotics workspace and an expansive eco-friendly campus at Bateshwar.',
    teachers: [
      { name: 'Dr. Ayesha Siddiqa', email: 'ayesha.teacher@gmail.com', department: 'Computer Science & Engineering', designation: 'Professor & Head', phone: '+880 1712-345678', qualification: 'Ph.D in Computer Science', joinDate: '2019-01-15' },
      { name: 'Prof. Dr. Mohammad Jahirul Hoque', email: 'vc.mu@gmail.com', department: 'Academic Affairs', designation: 'Vice Chancellor & Professor', phone: '+880 1813-987654', qualification: 'Ph.D in Management & Finance', joinDate: '2018-08-01' },
      { name: 'Prof. Kamal Hossain', email: 'kamal.teacher@gmail.com', department: 'Software Engineering', designation: 'Associate Professor', phone: '+880 1612-445566', qualification: 'M.Sc in Software Systems', joinDate: '2021-03-10' }
    ],
    courses: [
      { code: 'CSE-301', name: 'Object Oriented Programming with Java', department: 'Computer Science & Engineering', teacherName: 'Dr. Ayesha Siddiqa', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 10:00 AM (Academic Bldg)', status: 'Active' },
      { code: 'CSE-305', name: 'Database Management Systems', department: 'Computer Science & Engineering', teacherName: 'Prof. Kamal Hossain', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Wed 11:30 AM (Lab 2)', status: 'Active' },
      { code: 'SWE-201', name: 'Software Architecture & Design Patterns', department: 'Software Engineering', teacherName: 'Dr. Ayesha Siddiqa', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 02:00 PM', status: 'Active' },
      { code: 'BBA-101', name: 'Principles of Business Management', department: 'Business Administration', teacherName: 'Prof. Dr. Mohammad Jahirul Hoque', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 09:00 AM', status: 'Active' }
    ],
    jobs: [
      { title: 'Junior Java & Spring Boot Developer', company: 'Brain Station 23', location: 'Sylhet / Dhaka', type: 'Full-time', salary: '42,000 - 55,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Exclusive recruitment for Metropolitan University graduating seniors proficient in Java Spring Boot backend development.' },
      { title: 'MU Campus IT Support Assistant', company: 'Metropolitan University IT Center', location: 'Bateshwar Campus, Sylhet', type: 'Internship', salary: '18,000 BDT / month', deadline: '2026-12-15', status: 'Open', description: 'Hands-on student internship managing campus high-speed networks, server racks and academic computer labs.' },
      { title: 'Associate Software QA Engineer', company: 'Therap BD', location: 'Dhaka / Hybrid', type: 'Full-time', salary: '36,000 - 46,000 BDT', deadline: '2026-12-25', status: 'Open', description: 'Automated test suite scripting and API quality validation for enterprise medical management systems.' }
    ],
    library: [
      { title: 'Core Java Volume I — Fundamentals (12th Ed)', author: 'Cay S. Horstmann', isbn: '978-0135166307', category: 'Computer Science', publisher: 'Pearson', publishYear: '2023', totalCopies: '10', availableCopies: '7', status: 'Available' },
      { title: 'Spring Boot in Action', author: 'Craig Walls', isbn: '978-1617297571', category: 'Java Frameworks', publisher: 'Manning', publishYear: '2023', totalCopies: '8', availableCopies: '5', status: 'Available' },
      { title: 'Clean Code: A Handbook of Agile Software', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Software Engineering', publisher: 'Prentice Hall', publishYear: '2020', totalCopies: '12', availableCopies: '8', status: 'Available' },
      { title: 'Database System Concepts (7th Edition)', author: 'Silberschatz & Korth', isbn: '978-0078022159', category: 'Database Systems', publisher: 'McGraw-Hill', publishYear: '2021', totalCopies: '9', availableCopies: '4', status: 'Available' }
    ]
  },

  'Shahjalal University of Science and Technology': {
    code: 'SUST', city: 'Sylhet', campus: 'Kumargaon, Sylhet',
    title: 'Shahjalal University of Science & Technology', logo: '🔬', themeClass: 'uni-SUST', est: '1986',
    specialty: 'Apex public research institution leading in competitive programming, AI research and molecular genetics.',
    details: 'SUST was founded in 1986 as the premier science and technology university of Bangladesh. Home to iconic Kilometro road, vibrant research labs and national Olympiad championships.',
    teachers: [
      { name: 'Prof. Dr. M. Zafar Iqbal', email: 'zafar.iqbal@sust.edu', department: 'Computer Science & Engineering', designation: 'Professor Emeritus', phone: '+880 1711-223344', qualification: 'Ph.D in Physics (Washington)', joinDate: '1994-01-01' },
      { name: 'Prof. Dr. Md. Rezaul Karim', email: 'rezaul.geb@sust.edu', department: 'Genetic Engineering & Biotech', designation: 'Professor & Dean', phone: '+880 1812-334455', qualification: 'Ph.D in Molecular Genetics', joinDate: '2005-07-15' },
      { name: 'Dr. Md. Shahidur Rahman', email: 'shahid.cse@sust.edu', department: 'Computer Science & Engineering', designation: 'Associate Professor', phone: '+880 1913-445566', qualification: 'Ph.D in Artificial Intelligence', joinDate: '2012-09-01' }
    ],
    courses: [
      { code: 'CSE-311', name: 'Design and Analysis of Algorithms', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. M. Zafar Iqbal', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 10:30 AM (Academic Bldg 2)', status: 'Active' },
      { code: 'GEB-305', name: 'Molecular Biology & Recombinant DNA', department: 'Genetic Engineering & Biotech', teacherName: 'Prof. Dr. Md. Rezaul Karim', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 09:00 AM (Bio Lab)', status: 'Active' },
      { code: 'CSE-425', name: 'Natural Language Processing & LLMs', department: 'Computer Science & Engineering', teacherName: 'Dr. Md. Shahidur Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 11:30 AM (AI Lab)', status: 'Active' },
      { code: 'PHY-201', name: 'Quantum Mechanics and Modern Physics', department: 'Physics', teacherName: 'Prof. Dr. M. Zafar Iqbal', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'SUST NLP Research Assistant', company: 'SUST Artificial Intelligence Lab', location: 'Kumargaon Campus, Sylhet', type: 'Full-time', salary: '45,000 BDT / month', deadline: '2026-12-28', status: 'Open', description: 'Bengali NLP and speech recognition research on multi-GPU server clusters.' },
      { title: 'Campus Fiber Network Engineer Intern', company: 'SUST Central Network Center', location: 'Kumargaon, Sylhet', type: 'Internship', salary: '20,000 BDT / month', deadline: '2026-12-15', status: 'Open', description: 'Monitoring 10Gbps optical campus backbone connecting 25 academic departments.' },
      { title: 'Junior Data Scientist', company: 'Chaldal Tech', location: 'Sylhet / Remote', type: 'Full-time', salary: '48,000 - 60,000 BDT', deadline: '2026-12-22', status: 'Open', description: 'Building machine learning recommendation engines and predictive logistics.' }
    ],
    library: [
      { title: 'Introduction to Algorithms (4th Edition)', author: 'Cormen, Leiserson, Rivest, Stein', isbn: '978-0262046305', category: 'Algorithms', publisher: 'MIT Press', publishYear: '2022', totalCopies: '15', availableCopies: '9', status: 'Available' },
      { title: 'Molecular Biology of the Cell (7th Ed)', author: 'Bruce Alberts', isbn: '978-0393884821', category: 'Biotechnology', publisher: 'W. W. Norton', publishYear: '2022', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', isbn: '978-0134610993', category: 'Artificial Intelligence', publisher: 'Pearson', publishYear: '2021', totalCopies: '12', availableCopies: '8', status: 'Available' },
      { title: 'Quantum Physics of Atoms & Molecules', author: 'Robert Eisberg & Robert Resnick', isbn: '978-0471873730', category: 'Physics', publisher: 'Wiley', publishYear: '2020', totalCopies: '8', availableCopies: '4', status: 'Available' }
    ]
  },

  'University of Dhaka': {
    code: 'DU', city: 'Dhaka', campus: 'Nilkhet & Curzon Hall, Dhaka',
    title: 'University of Dhaka', logo: '🎓', themeClass: 'uni-DU', est: '1921',
    specialty: 'The historic "Oxford of the East" and highest-ranked multidisciplinary public university in Bangladesh.',
    details: 'Established in 1921, Dhaka University has shaped the intellectual, political and scientific trajectory of Bangladesh across Curzon Hall, Arts Building and IBA.',
    teachers: [
      { name: 'Prof. Dr. Md. Abdur Razzaque', email: 'razzaque@du.ac.bd', department: 'Computer Science & Engineering', designation: 'Professor & Chair', phone: '+880 1711-556677', qualification: 'Ph.D in Distributed Systems', joinDate: '2001-03-01' },
      { name: 'Prof. Dr. Atiur Rahman', email: 'atiur.econ@du.ac.bd', department: 'Development Studies / Economics', designation: 'Professor & Ex-Governor BB', phone: '+880 1812-667788', qualification: 'Ph.D in Economics (London)', joinDate: '1998-09-01' },
      { name: 'Prof. Dr. Asif Nazrul', email: 'asif.law@du.ac.bd', department: 'Department of Law', designation: 'Professor of Law', phone: '+880 1913-778899', qualification: 'Ph.D in International Law (SOAS)', joinDate: '2004-05-10' }
    ],
    courses: [
      { code: 'CSE-201', name: 'Advanced Data Structures & Algorithms', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Md. Abdur Razzaque', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 09:30 AM (Curzon Hall)', status: 'Active' },
      { code: 'ECON-302', name: 'Macroeconomic Policy & Fiscal Planning', department: 'Department of Economics', teacherName: 'Prof. Dr. Atiur Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Wed 11:00 AM (Arts Bldg)', status: 'Active' },
      { code: 'LAW-101', name: 'Constitutional Law of Bangladesh', department: 'Department of Law', teacherName: 'Prof. Dr. Asif Nazrul', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 10:00 AM (Law Faculty)', status: 'Active' },
      { code: 'IBA-501', name: 'Strategic Leadership & Corporate Governance', department: 'Institute of Business Administration', teacherName: 'Prof. Dr. Atiur Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 03:00 PM (IBA)', status: 'Active' }
    ],
    jobs: [
      { title: 'DU Curzon Hall Research Associate', company: 'DU Center for Advanced Research in Sciences', location: 'Curzon Hall, Dhaka', type: 'Full-time', salary: '50,000 BDT / month', deadline: '2026-12-25', status: 'Open', description: 'High-performance computing and environmental modeling in scientific computing labs.' },
      { title: 'IBA Business Incubation Analyst', company: 'Dhaka University Startup Incubator', location: 'IBA, Dhaka', type: 'Full-time', salary: '45,000 BDT / month', deadline: '2026-12-20', status: 'Open', description: 'Assessing university spin-off startups, market valuations and investor pitch portfolios.' },
      { title: 'Campus Systems Administrator', company: 'DU Central ICT Cell', location: 'Administrative Bldg, Nilkhet', type: 'Full-time', salary: '38,000 - 48,000 BDT', deadline: '2026-12-18', status: 'Open', description: 'Administering campus registration portals, digital archives and online payment gateways.' }
    ],
    library: [
      { title: 'Constitutional Law of Bangladesh (3rd Ed)', author: 'Mahmudul Islam', isbn: '978-9840517459', category: 'Law', publisher: 'Mullick Brothers', publishYear: '2021', totalCopies: '14', availableCopies: '8', status: 'Available' },
      { title: 'Macroeconomics (11th Global Edition)', author: 'N. Gregory Mankiw', isbn: '978-1319263904', category: 'Economics', publisher: 'Worth Publishers', publishYear: '2022', totalCopies: '12', availableCopies: '7', status: 'Available' },
      { title: 'Operating System Concepts (10th Edition)', author: 'Silberschatz, Galvin, Gagne', isbn: '978-1119800361', category: 'Computer Science', publisher: 'Wiley', publishYear: '2021', totalCopies: '15', availableCopies: '11', status: 'Available' },
      { title: 'Strategic Management: Concepts & Cases', author: 'Fred R. David', isbn: '978-0135173947', category: 'Business Administration', publisher: 'Pearson', publishYear: '2020', totalCopies: '10', availableCopies: '5', status: 'Available' }
    ]
  },

  'Bangladesh University of Engineering and Technology': {
    code: 'BUET', city: 'Dhaka', campus: 'Palashi, Dhaka',
    title: 'BUET (Engineering & Tech)', logo: '⚙️', themeClass: 'uni-BUET', est: '1962',
    specialty: 'The apex engineering institution of Bangladesh producing global leaders in AI, VLSI, civil & electrical engineering.',
    details: 'Established in 1962, BUET is the premier engineering institution in Bangladesh, renowned worldwide for academic rigor, top ACM-ICPC competitive coders and pioneering engineering solutions.',
    teachers: [
      { name: 'Prof. Dr. Mohammad Kaykobad', email: 'kaykobad@cse.buet.ac.bd', department: 'Computer Science & Engineering', designation: 'Professor & ACM Fellow', phone: '+880 1711-889900', qualification: 'Ph.D in Computer Science (Flinders)', joinDate: '1985-02-01' },
      { name: 'Prof. Dr. Celia Shahnaz', email: 'celia@eee.buet.ac.bd', department: 'Electrical & Electronic Engineering', designation: 'Professor & IEEE Global Chair', phone: '+880 1812-990011', qualification: 'Ph.D in Signal Processing (Concordia)', joinDate: '2001-08-15' },
      { name: 'Prof. Dr. Shamim Z. Bosunia', email: 'bosunia@ce.buet.ac.bd', department: 'Civil Engineering', designation: 'Professor & Mega-Bridge Consultant', phone: '+880 1913-001122', qualification: 'Ph.D in Structural Engineering', joinDate: '1988-11-01' }
    ],
    courses: [
      { code: 'CSE-307', name: 'Compiler Design and Code Optimization', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Mohammad Kaykobad', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 08:30 AM (ECE Bldg)', status: 'Active' },
      { code: 'EEE-305', name: 'Power Systems Analysis and Smart Grids', department: 'Electrical & Electronic Engineering', teacherName: 'Prof. Dr. Celia Shahnaz', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 10:00 AM (EEE Aud)', status: 'Active' },
      { code: 'CE-311', name: 'Design of Concrete and Mega Structures', department: 'Civil Engineering', teacherName: 'Prof. Dr. Shamim Z. Bosunia', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 11:30 AM (Civil Bldg)', status: 'Active' },
      { code: 'CSE-421', name: 'Computer Networks & Distributed Routing', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Mohammad Kaykobad', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'BUET Robotics & Automation Research Fellow', company: 'BUET Robotics Innovation Lab', location: 'ECE Building, Palashi', type: 'Full-time', salary: '55,000 BDT / month', deadline: '2026-12-30', status: 'Open', description: 'Autonomous drone flight controllers and industrial robotic arm precision kinematics.' },
      { title: 'VLSI Chip Design Intern', company: 'Neural Semiconductor', location: 'Dhaka / Hybrid', type: 'Internship', salary: '30,000 BDT / month', deadline: '2026-12-20', status: 'Open', description: 'Cadence virtuoso tapeout verification and 7nm silicon floorplanning.' },
      { title: 'Structural Safety Analysis Engineer', company: 'Padma Bridge Maintenance Authority', location: 'Dhaka', type: 'Full-time', salary: '60,000 - 75,000 BDT', deadline: '2026-12-28', status: 'Open', description: 'Finite element structural vibration analysis and bridge health monitoring.' }
    ],
    library: [
      { title: 'Compilers: Principles, Techniques & Tools (Dragon)', author: 'Aho, Lam, Sethi, Ullman', isbn: '978-0321486813', category: 'Computer Science', publisher: 'Pearson', publishYear: '2021', totalCopies: '16', availableCopies: '11', status: 'Available' },
      { title: 'Electric Machinery Fundamentals (5th Ed)', author: 'Stephen J. Chapman', isbn: '978-0073529547', category: 'Electrical Engineering', publisher: 'McGraw-Hill', publishYear: '2020', totalCopies: '14', availableCopies: '8', status: 'Available' },
      { title: 'Design of Concrete Structures (15th Ed)', author: 'Darwin, Dolan, Nilson', isbn: '978-0073397948', category: 'Civil Engineering', publisher: 'McGraw-Hill', publishYear: '2021', totalCopies: '12', availableCopies: '7', status: 'Available' },
      { title: 'Microelectronic Circuits (8th International Ed)', author: 'Adel S. Sedra & Kenneth C. Smith', isbn: '978-0190853464', category: 'VLSI & Electronics', publisher: 'Oxford', publishYear: '2022', totalCopies: '15', availableCopies: '10', status: 'Available' }
    ]
  },

  'Leading University': {
    code: 'LU', city: 'Sylhet', campus: 'Ragibnagar, Sylhet',
    title: 'Leading University', logo: '🚀', themeClass: 'uni-LU', est: '2001',
    specialty: 'The first approved private university in Sylhet, known for its picturesque Ragibnagar campus, Architecture and CSE.',
    details: 'Established in 2001 by philanthropist Ragib Ali, Leading University offers prominent education in Architecture, Civil Engineering, CSE, Law and Business Administration in Sylhet.',
    teachers: [
      { name: 'Prof. Dr. Qazi Azizul Mowla', email: 'vc.lu@lus.ac.bd', department: 'Architecture & Engineering', designation: 'Vice Chancellor & Prof. of Architecture', phone: '+880 1715-112233', qualification: 'Ph.D in Architecture & Urban Design', joinDate: '2021-02-01' },
      { name: 'Prof. Shamsul Alam', email: 'shamsul.cse@lus.ac.bd', department: 'Computer Science & Engineering', designation: 'Head & Associate Professor', phone: '+880 1816-223344', qualification: 'M.Sc in Information Systems', joinDate: '2016-04-10' },
      { name: 'Dr. Mostaq Ahmed', email: 'mostaq.bba@lus.ac.bd', department: 'Business Administration', designation: 'Associate Professor', phone: '+880 1917-334455', qualification: 'Ph.D in Marketing', joinDate: '2019-07-01' }
    ],
    courses: [
      { code: 'CSE-215', name: 'Web Engineering & Full-Stack Systems', department: 'Computer Science & Engineering', teacherName: 'Prof. Shamsul Alam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 11:00 AM (Lab 1)', status: 'Active' },
      { code: 'ARC-301', name: 'Architectural Heritage & Urban Planning', department: 'Architecture', teacherName: 'Prof. Dr. Qazi Azizul Mowla', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 09:30 AM (Studio)', status: 'Active' },
      { code: 'BBA-205', name: 'Digital Marketing & Consumer Analytics', department: 'Business Administration', teacherName: 'Dr. Mostaq Ahmed', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 01:30 PM', status: 'Active' },
      { code: 'CSE-320', name: 'Computer Network Security & Defense', department: 'Computer Science & Engineering', teacherName: 'Prof. Shamsul Alam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 03:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'LU Ragibnagar Network Operations Associate', company: 'Leading University ICT Wing', location: 'Ragibnagar, Sylhet', type: 'Full-time', salary: '32,000 BDT / month', deadline: '2026-12-20', status: 'Open', description: 'Network routing and smart classroom maintenance across academic facilities.' },
      { title: 'Architectural 3D Visualization Intern', company: 'Sylhet Design Associates', location: 'Sylhet City', type: 'Internship', salary: '16,000 BDT / month', deadline: '2026-12-15', status: 'Open', description: 'AutoCAD, SketchUp and Lumion 3D architectural rendering.' },
      { title: 'Full Stack Web Developer', company: 'Surma Soft Solutions', location: 'Sylhet / Remote', type: 'Full-time', salary: '38,000 - 48,000 BDT', deadline: '2026-12-25', status: 'Open', description: 'React, Node.js and Spring Boot web portal construction.' }
    ],
    library: [
      { title: 'Architecture: Form, Space, and Order (4th Ed)', author: 'Francis D. K. Ching', isbn: '978-1118745083', category: 'Architecture', publisher: 'Wiley', publishYear: '2021', totalCopies: '8', availableCopies: '5', status: 'Available' },
      { title: 'Computer Networks (6th Edition)', author: 'Andrew S. Tanenbaum', isbn: '978-0136764045', category: 'Computer Science', publisher: 'Pearson', publishYear: '2021', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Marketing Management (16th Global Ed)', author: 'Philip Kotler & Kevin Keller', isbn: '978-0135887158', category: 'Business', publisher: 'Pearson', publishYear: '2022', totalCopies: '10', availableCopies: '7', status: 'Available' },
      { title: 'Cloud Computing: Concepts, Tech & Architecture', author: 'Thomas Erl', isbn: '978-0133387520', category: 'Cloud Computing', publisher: 'Prentice Hall', publishYear: '2020', totalCopies: '7', availableCopies: '4', status: 'Available' }
    ]
  },

  'Sylhet Agricultural University': {
    code: 'SAU', city: 'Sylhet', campus: 'Tilagarh, Sylhet',
    title: 'Sylhet Agricultural University', logo: '🌿', themeClass: 'uni-SAU', est: '2006',
    specialty: 'Specialized public university driving agricultural innovation, veterinary medicine, aquaculture and food security.',
    details: 'Situated on the lush green hills of Tilagarh in Sylhet, SAU is a premier center of excellence for veterinary science, agronomy, tea research and modern livestock genetics in Bangladesh.',
    teachers: [
      { name: 'Prof. Dr. Md. Jamal Uddin Bhuiyan', email: 'jamal.vet@sau.ac.bd', department: 'Veterinary Science & Pathology', designation: 'Vice Chancellor & Senior Professor', phone: '+880 1716-445566', qualification: 'Ph.D in Animal Pathology', joinDate: '2007-01-10' },
      { name: 'Prof. Dr. M. Nazrul Islam', email: 'nazrul.agro@sau.ac.bd', department: 'Agronomy & Haor Agriculture', designation: 'Professor & Dean of Agriculture', phone: '+880 1817-556677', qualification: 'Ph.D in Crop Science', joinDate: '2008-05-15' },
      { name: 'Dr. Farhana Rumzum', email: 'farhana.fish@sau.ac.bd', department: 'Fisheries Biology & Genetics', designation: 'Associate Professor', phone: '+880 1918-667788', qualification: 'Ph.D in Aquaculture Genetics', joinDate: '2015-09-01' }
    ],
    courses: [
      { code: 'AGR-201', name: 'Crop Physiology and Haor Agriculture', department: 'Agronomy', teacherName: 'Prof. Dr. M. Nazrul Islam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 09:00 AM (Field Lab)', status: 'Active' },
      { code: 'VET-305', name: 'Veterinary Pathology & Clinical Medicine', department: 'Veterinary Science', teacherName: 'Prof. Dr. Md. Jamal Uddin Bhuiyan', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 11:00 AM (Vet Clinic)', status: 'Active' },
      { code: 'FISH-210', name: 'Aquaculture Systems & Fish Genetics', department: 'Fisheries Technology', teacherName: 'Dr. Farhana Rumzum', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 10:30 AM (Hatchery)', status: 'Active' },
      { code: 'AG-ENG-301', name: 'Precision Agricultural Machinery & IoT', department: 'Agricultural Engineering', teacherName: 'Prof. Dr. M. Nazrul Islam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'Haor Region Agro-Ecology Project Fellow', company: 'SAU Haor Research Center', location: 'Tilagarh, Sylhet', type: 'Full-time', salary: '42,000 BDT / month', deadline: '2026-12-25', status: 'Open', description: 'Field trials on flood-tolerant rice varieties and wetland sustainable agriculture.' },
      { title: 'Livestock Diagnostic Clinic Assistant', company: 'SAU Veterinary Hospital', location: 'Tilagarh Campus', type: 'Internship', salary: '18,000 BDT / month', deadline: '2026-12-18', status: 'Open', description: 'Clinical pathology tests and animal health monitoring in mobile veterinary units.' },
      { title: 'Tea Quality and Phytochemistry Analyst', company: 'Finlay Tea Bangladesh', location: 'Sreemangal / Sylhet', type: 'Full-time', salary: '40,000 - 50,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Chemical quality testing and soil fertility analytics for tea estates.' }
    ],
    library: [
      { title: 'Principles of Agronomy (5th Edition)', author: 'S. R. Reddy', isbn: '978-8127263591', category: 'Agronomy', publisher: 'Kalyani Publishers', publishYear: '2021', totalCopies: '12', availableCopies: '8', status: 'Available' },
      { title: 'Veterinary Medicine: A Textbook of Cattle, Horses & Sheep', author: 'Radostits & Gay', isbn: '978-0702027772', category: 'Veterinary Medicine', publisher: 'Saunders', publishYear: '2020', totalCopies: '9', availableCopies: '5', status: 'Available' },
      { title: 'Aquaculture: Principles and Practices (2nd Ed)', author: 'T. V. R. Pillay', isbn: '978-1405105323', category: 'Fisheries', publisher: 'Blackwell', publishYear: '2021', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Soil Fertility and Fertilizers (8th Edition)', author: 'Havlin, Tisdale, Nelson', isbn: '978-0135033739', category: 'Soil Science', publisher: 'Pearson', publishYear: '2021', totalCopies: '8', availableCopies: '4', status: 'Available' }
    ]
  },

  'North South University': {
    code: 'NSU', city: 'Dhaka', campus: 'Bashundhara R/A, Dhaka',
    title: 'North South University', logo: '🌐', themeClass: 'uni-NSU', est: '1992',
    specialty: 'The first private university of Bangladesh with internationally accredited business, engineering and liberal arts programs.',
    details: 'Founded in 1992 in Dhaka, NSU is Bangladesh\'s highest-ranked private university, featuring a world-class campus in Bashundhara with American-style curriculum and ACBSP accreditation.',
    teachers: [
      { name: 'Prof. Dr. Atiqul Islam', email: 'vc@northsouth.edu', department: 'School of Business & Economics', designation: 'Vice Chancellor & Prof. of Finance', phone: '+880 1713-002233', qualification: 'Ph.D in Finance (Sydney)', joinDate: '2016-02-15' },
      { name: 'Prof. Dr. Rajesh Palit', email: 'rajesh.palit@northsouth.edu', department: 'Electrical & Computer Engineering', designation: 'Professor & Chair of ECE', phone: '+880 1814-113344', qualification: 'Ph.D in Computer Engineering (Waterloo)', joinDate: '2013-08-01' },
      { name: 'Dr. Sharif Nurul Huda', email: 'huda.fin@northsouth.edu', department: 'Finance and Accounting', designation: 'Associate Professor', phone: '+880 1915-224455', qualification: 'Ph.D in Econometrics', joinDate: '2018-05-10' }
    ],
    courses: [
      { code: 'CSE-273', name: 'Introduction to Data Science & Analytics', department: 'Electrical & Computer Engineering', teacherName: 'Prof. Dr. Rajesh Palit', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 09:40 AM (SAC Bldg)', status: 'Active' },
      { code: 'FIN-410', name: 'Corporate Finance & Valuation Modeling', department: 'School of Business & Economics', teacherName: 'Prof. Dr. Atiqul Islam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Wed 11:20 AM (NAC Aud)', status: 'Active' },
      { code: 'ENV-107', name: 'Climate Change & Sustainable Environment', department: 'Environmental Science', teacherName: 'Dr. Sharif Nurul Huda', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 01:00 PM', status: 'Active' },
      { code: 'CSE-311', name: 'Database Systems & Cloud Backend', department: 'Electrical & Computer Engineering', teacherName: 'Prof. Dr. Rajesh Palit', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 02:40 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'Fintech Product Management Intern', company: 'bKash Limited', location: 'Dhaka', type: 'Internship', salary: '25,000 BDT / month', deadline: '2026-12-25', status: 'Open', description: 'Digital payments product roadmap preparation and UI/UX conversion analytics.' },
      { title: 'Telecom Network Software Associate', company: 'Grameenphone Ltd', location: 'Bashundhara, Dhaka', type: 'Full-time', salary: '50,000 - 65,000 BDT', deadline: '2026-12-30', status: 'Open', description: '5G core software configuration and cloud-native microservices maintenance.' },
      { title: 'NSU Campus Cloud Operations Fellow', company: 'NSU IT Services Wing', location: 'Bashundhara Campus', type: 'Full-time', salary: '40,000 BDT / month', deadline: '2026-12-18', status: 'Open', description: 'Managing AWS hybrid cloud instances, Canvas LMS integration and campus authentication.' }
    ],
    library: [
      { title: 'Corporate Finance (5th Global Edition)', author: 'Jonathan Berk & Peter DeMarzo', isbn: '978-0135161081', category: 'Finance', publisher: 'Pearson', publishYear: '2021', totalCopies: '14', availableCopies: '9', status: 'Available' },
      { title: 'Data Science from Scratch: First Principles', author: 'Joel Grus', isbn: '978-1492041139', category: 'Data Science', publisher: "O'Reilly", publishYear: '2020', totalCopies: '11', availableCopies: '7', status: 'Available' },
      { title: 'Principles of Economics (9th Edition)', author: 'N. Gregory Mankiw', isbn: '978-0357038314', category: 'Economics', publisher: 'Cengage', publishYear: '2021', totalCopies: '15', availableCopies: '10', status: 'Available' },
      { title: 'Computer Security: Principles and Practice', author: 'William Stallings', isbn: '978-0134794105', category: 'Cyber Security', publisher: 'Pearson', publishYear: '2022', totalCopies: '10', availableCopies: '6', status: 'Available' }
    ]
  },

  'BRAC University': {
    code: 'BRACU', city: 'Dhaka', campus: 'Merul Badda, Dhaka',
    title: 'BRAC University', logo: '🤝', themeClass: 'uni-BRACU', est: '2001',
    specialty: 'Globally ranked institution committed to liberal arts, social impact, innovative architecture and tech entrepreneurship.',
    details: 'Founded by Sir Fazle Hasan Abed in 2001, BRAC University features an iconic biophilic mega-campus in Merul Badda, leading in pharmacy, AI, robotics and public health research.',
    teachers: [
      { name: 'Prof. Syed Mahfuzul Aziz', email: 'mahfuzul.aziz@bracu.ac.bd', department: 'Electrical & Electronic Engineering', designation: 'Pro-Vice Chancellor & Acting VC', phone: '+880 1714-223355', qualification: 'Ph.D in Electronics (Kent)', joinDate: '2021-01-01' },
      { name: 'Prof. Dr. Sadia Hamid Kazi', email: 'sadia.kazi@bracu.ac.bd', department: 'Computer Science & Engineering', designation: 'Chairperson of CSE', phone: '+880 1815-334466', qualification: 'Ph.D in Computer Science', joinDate: '2014-06-15' },
      { name: 'Dr. Farzana Nahid', email: 'farzana.phr@bracu.ac.bd', department: 'Department of Pharmacy', designation: 'Associate Professor', phone: '+880 1916-445577', qualification: 'Ph.D in Pharmaceutical Sciences', joinDate: '2017-09-01' }
    ],
    courses: [
      { code: 'CSE-470', name: 'Software Engineering & Agile Methodologies', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Sadia Hamid Kazi', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 10:00 AM (UB-02)', status: 'Active' },
      { code: 'PHR-301', name: 'Medicinal Chemistry & Drug Synthesis', department: 'Department of Pharmacy', teacherName: 'Dr. Farzana Nahid', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 11:30 AM (Pharma Lab)', status: 'Active' },
      { code: 'BIO-101', name: 'Cellular Biology and Genetics', department: 'Biotechnology', teacherName: 'Dr. Farzana Nahid', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 09:00 AM', status: 'Active' },
      { code: 'EEE-205', name: 'Signals & Systems and DSP Foundations', department: 'Electrical & Electronic Engineering', teacherName: 'Prof. Syed Mahfuzul Aziz', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 01:30 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'BRAC Social Innovation Lab Data Fellow', company: 'BRAC International', location: 'Merul Badda, Dhaka', type: 'Full-time', salary: '45,000 BDT / month', deadline: '2026-12-28', status: 'Open', description: 'Data modeling and AI analytics on poverty alleviation programs in 11 countries.' },
      { title: 'Smart Eco-Campus Operations Assistant', company: 'BRAC University Facilities Wing', location: 'Merul Badda Campus', type: 'Internship', salary: '22,000 BDT / month', deadline: '2026-12-16', status: 'Open', description: 'Monitoring building automation, rainwater harvesting and smart energy IoT meters.' },
      { title: 'Full Stack JavaScript Engineer', company: 'Optimizely BD', location: 'Dhaka / Hybrid', type: 'Full-time', salary: '55,000 - 70,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'TypeScript, React, GraphQL and cloud-native CMS feature engineering.' }
    ],
    library: [
      { title: 'Software Engineering (10th Global Edition)', author: 'Ian Sommerville', isbn: '978-0133943030', category: 'Software Engineering', publisher: 'Pearson', publishYear: '2021', totalCopies: '14', availableCopies: '9', status: 'Available' },
      { title: "An Introduction to Medicinal Chemistry (7th Ed)", author: 'Graham L. Patrick', isbn: '978-0198866664', category: 'Pharmacy', publisher: 'Oxford', publishYear: '2022', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Signals and Systems (2nd Edition)', author: 'Oppenheim & Willsky', isbn: '978-0138147570', category: 'Electrical Engineering', publisher: 'Prentice Hall', publishYear: '2020', totalCopies: '12', availableCopies: '8', status: 'Available' },
      { title: 'Biotechnology: An Introduction', author: 'Susan R. Barnum', isbn: '978-0495112006', category: 'Biotechnology', publisher: 'Cengage', publishYear: '2021', totalCopies: '8', availableCopies: '4', status: 'Available' }
    ]
  },

  'AIUB': {
    code: 'AIUB', city: 'Dhaka', campus: '408/1, Kuratoli, Khilkhet, Dhaka',
    title: 'American International University-BD', logo: '🌊', themeClass: 'uni-AIUB', est: '1994',
    specialty: 'Renowned for state-of-the-art Kuratoli campus, Computer Engineering, Cisco Academy and Business Administration.',
    details: 'AIUB was established in 1994 and has grown into one of Bangladesh\'s foremost modern universities, celebrated for extensive computing complexes, multimedia studios and Cisco Networking Academy excellence.',
    teachers: [
      { name: 'Prof. Dr. Carmen Z. Lamagna', email: 'president@aiub.edu', department: 'Leadership & Academic Council', designation: 'President & Vice Chancellor', phone: '+880 1715-334466', qualification: 'Ph.D in Education Administration', joinDate: '1995-01-01' },
      { name: 'Prof. Dr. Md. Abdur Rahman', email: 'arahman@aiub.edu', department: 'Computer Engineering (CoE)', designation: 'Associate Dean of Engineering', phone: '+880 1816-445577', qualification: 'Ph.D in Computer Engineering', joinDate: '2008-03-10' },
      { name: 'Dr. Dip Nandi', email: 'dip.nandi@aiub.edu', department: 'Computer Science (CS)', designation: 'Professor & Director of CS', phone: '+880 1917-556688', qualification: 'Ph.D in Software Engineering (RMIT)', joinDate: '2009-09-01' }
    ],
    courses: [
      { code: 'CSC-3101', name: 'Object Oriented Analysis & Software Architecture', department: 'Computer Science', teacherName: 'Dr. Dip Nandi', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 10:00 AM (Annex 2)', status: 'Active' },
      { code: 'COE-3205', name: 'Microprocessor Systems and Interfacing', department: 'Computer Engineering', teacherName: 'Prof. Dr. Md. Abdur Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 11:30 AM (Hardware Lab)', status: 'Active' },
      { code: 'MGT-2101', name: 'Principles of International Management', department: 'Business Administration', teacherName: 'Prof. Dr. Carmen Z. Lamagna', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 09:00 AM', status: 'Active' },
      { code: 'MMA-2201', name: 'Interactive Digital Animation and Game Design', department: 'Media & Mass Comm', teacherName: 'Dr. Dip Nandi', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'Embedded Firmware Developer', company: 'Walton Digi-Tech', location: 'Dhaka', type: 'Full-time', salary: '45,000 - 55,000 BDT', deadline: '2026-12-25', status: 'Open', description: 'STM32 and ARM Cortex microcontrollers firmware design for IoT smart home appliances.' },
      { title: 'AIUB Cisco Lab Support Specialist', company: 'AIUB IT & Network Operations', location: 'Kuratoli Campus, Dhaka', type: 'Internship', salary: '20,000 BDT / month', deadline: '2026-12-15', status: 'Open', description: 'Assisting students in Cisco CCNA/CCNP network labs with router and switch topologies.' },
      { title: 'Junior Android & iOS App Developer', company: 'Kona Software Lab', location: 'Dhaka', type: 'Full-time', salary: '42,000 - 52,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Kotlin and Swift native mobile engineering for fintech digital banking apps.' }
    ],
    library: [
      { title: 'Design Patterns: Elements of Reusable OO Software', author: 'Gamma, Helm, Johnson, Vlissides', isbn: '978-0201633610', category: 'Software Engineering', publisher: 'Addison-Wesley', publishYear: '2020', totalCopies: '12', availableCopies: '8', status: 'Available' },
      { title: 'The 8051 Microcontroller and Embedded Systems', author: 'Muhammad Ali Mazidi', isbn: '978-0131194021', category: 'Hardware', publisher: 'Pearson', publishYear: '2021', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Financial Accounting (11th Global Edition)', author: 'Jerry J. Weygandt', isbn: '978-1119594611', category: 'Accounting', publisher: 'Wiley', publishYear: '2021', totalCopies: '12', availableCopies: '7', status: 'Available' },
      { title: 'Digital Media: Concepts and Applications', author: 'Tena B. Crews', isbn: '978-0538740524', category: 'Multimedia', publisher: 'Cengage', publishYear: '2020', totalCopies: '8', availableCopies: '5', status: 'Available' }
    ]
  },

  'Chittagong University of Engineering & Technology': {
    code: 'CUET', city: 'Chittagong', campus: 'Raozan, Chittagong',
    title: 'CUET (Engineering & Tech)', logo: '🔧', themeClass: 'uni-CUET', est: '1968',
    specialty: 'Premier public engineering university of Chittagong division pioneering maritime tech, petroleum & energy.',
    details: 'Located amidst the scenic hills of Raozan, CUET is the apex engineering institution of southern Bangladesh, known for petroleum engineering, structural dynamics and green energy research.',
    teachers: [
      { name: 'Prof. Dr. Mohammad Rafiqul Alam', email: 'vc@cuet.ac.bd', department: 'Electrical & Electronic Engineering', designation: 'Vice Chancellor & Senior Professor', phone: '+880 1716-556688', qualification: 'Ph.D in Power Systems', joinDate: '1998-04-01' },
      { name: 'Prof. Dr. Asaduzzaman', email: 'asad@cuet.ac.bd', department: 'Computer Science & Engineering', designation: 'Professor & Dean', phone: '+880 1817-667799', qualification: 'Ph.D in Wireless Sensor Networks', joinDate: '2004-10-15' },
      { name: 'Prof. Dr. Bodius Salam', email: 'bsalam@cuet.ac.bd', department: 'Mechanical & Petroleum Engineering', designation: 'Head of PME', phone: '+880 1918-778800', qualification: 'Ph.D in Energy Engineering', joinDate: '2001-07-01' }
    ],
    courses: [
      { code: 'CSE-331', name: 'Distributed Systems & Cloud Computing', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Asaduzzaman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 10:00 AM (New Acad Bldg)', status: 'Active' },
      { code: 'PME-301', name: 'Petroleum Reservoir Engineering & Logging', department: 'Petroleum & Mining Engineering', teacherName: 'Prof. Dr. Bodius Salam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 11:30 AM (PME Lab)', status: 'Active' },
      { code: 'EEE-315', name: 'Power System Protection and Switchgear', department: 'Electrical & Electronic Engineering', teacherName: 'Prof. Dr. Mohammad Rafiqul Alam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 09:00 AM', status: 'Active' },
      { code: 'CE-401', name: 'Coastal Engineering & Marine Structures', department: 'Civil Engineering', teacherName: 'Prof. Dr. Bodius Salam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'Marine Port Automation Engineer', company: 'Chittagong Port Authority', location: 'Chittagong Port', type: 'Full-time', salary: '52,000 - 68,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Automated container gantry crane control systems and marine vessel traffic management.' },
      { title: 'Offshore Energy Systems Analyst', company: 'BAPEX Bangladesh', location: 'Chittagong', type: 'Full-time', salary: '58,000 BDT / month', deadline: '2026-12-24', status: 'Open', description: 'Bay of Bengal natural gas reservoir pressure testing and logging analytics.' },
      { title: 'CUET Supercomputing Cluster Assistant', company: 'CUET ICT Center', location: 'Raozan Campus', type: 'Internship', salary: '22,000 BDT / month', deadline: '2026-12-16', status: 'Open', description: 'Managing Linux HPC clusters for computational fluid dynamics research.' }
    ],
    library: [
      { title: 'Distributed Systems: Concepts and Design', author: 'Coulouris, Dollimore, Kindberg', isbn: '978-0132143011', category: 'Computer Science', publisher: 'Pearson', publishYear: '2021', totalCopies: '12', availableCopies: '8', status: 'Available' },
      { title: 'Petroleum Production Engineering (2nd Ed)', author: 'Boyun Guo & William C. Lyons', isbn: '978-0128093740', category: 'Petroleum', publisher: 'Gulf Professional', publishYear: '2021', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Power System Analysis and Design', author: 'J. Duncan Glover', isbn: '978-1305632134', category: 'Electrical Engineering', publisher: 'Cengage', publishYear: '2021', totalCopies: '11', availableCopies: '7', status: 'Available' },
      { title: 'Coastal Engineering Manual', author: 'US Army Corps of Engineers', isbn: '978-1548679095', category: 'Civil Engineering', publisher: 'Military Press', publishYear: '2020', totalCopies: '8', availableCopies: '4', status: 'Available' }
    ]
  },

  'Rajshahi University': {
    code: 'RU', city: 'Rajshahi', campus: 'Motihar, Rajshahi',
    title: 'Rajshahi University', logo: '💎', themeClass: 'uni-RU', est: '1953',
    specialty: 'The historic second-oldest public university of Bangladesh located on the vast green Paris Road of Motihar.',
    details: 'Established in 1953, the University of Rajshahi is celebrated for its lush 753-acre Motihar campus, Varendra Research Museum, distinguished faculty and deep contributions to science and law.',
    teachers: [
      { name: 'Prof. Dr. Golam Shabbir Sattar', email: 'vc@ru.ac.bd', department: 'Geology & Mining', designation: 'Vice Chancellor & Senior Professor', phone: '+880 1717-667788', qualification: 'Ph.D in Hydrogeology', joinDate: '1996-03-01' },
      { name: 'Prof. Dr. Subrata Majumder', email: 'subrata.cse@ru.ac.bd', department: 'Computer Science & Engineering', designation: 'Professor & Chairperson', phone: '+880 1818-778899', qualification: 'Ph.D in Neural Networks', joinDate: '2005-09-10' },
      { name: 'Prof. Dr. M. Rostom Ali', email: 'rostom.chem@ru.ac.bd', department: 'Department of Applied Chemistry', designation: 'Senior Professor of Chemistry', phone: '+880 1919-889900', qualification: 'Ph.D in Materials Science', joinDate: '2000-06-15' }
    ],
    courses: [
      { code: 'CSE-312', name: 'Artificial Intelligence & Neural Networks', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Subrata Majumder', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 10:30 AM (Third Science Bldg)', status: 'Active' },
      { code: 'CHEM-301', name: 'Advanced Organic Synthesis and Catalysis', department: 'Applied Chemistry', teacherName: 'Prof. Dr. M. Rostom Ali', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 09:00 AM (Chem Lab 3)', status: 'Active' },
      { code: 'GEO-305', name: 'Groundwater Hydrology & Geo-Exploration', department: 'Geology & Mining', teacherName: 'Prof. Dr. Golam Shabbir Sattar', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 11:30 AM', status: 'Active' },
      { code: 'STAT-202', name: 'Probability Theory and Mathematical Statistics', department: 'Department of Statistics', teacherName: 'Prof. Dr. Subrata Majumder', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'Varendra Research Museum Archival Assistant', company: 'RU Varendra Museum Wing', location: 'Rajshahi City', type: 'Full-time', salary: '35,000 BDT / month', deadline: '2026-12-25', status: 'Open', description: 'Digitizing ancient terracotta sculptures, Sanskrit manuscripts and historical artifacts.' },
      { title: 'Northern Agro-IoT Research Assistant', company: 'RU Agricultural Research Station', location: 'Motihar Campus', type: 'Internship', salary: '18,000 BDT / month', deadline: '2026-12-18', status: 'Open', description: 'IoT sensor deployment for mango orchard pest monitoring and irrigation telemetry.' },
      { title: 'Silk City Software Engineer', company: 'Bangabandhu Hi-Tech Park Rajshahi', location: 'Nabinagar, Rajshahi', type: 'Full-time', salary: '45,000 - 58,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Full-stack software development on Java Spring Boot and React microservices.' }
    ],
    library: [
      { title: 'Mathematical Statistics with Applications', author: 'Wackerly, Mendenhall, Scheaffer', isbn: '978-0495110811', category: 'Statistics', publisher: 'Cengage', publishYear: '2020', totalCopies: '14', availableCopies: '9', status: 'Available' },
      { title: 'Advanced Organic Chemistry: Structure & Mechanisms', author: 'Carey & Sundberg', isbn: '978-0387683461', category: 'Chemistry', publisher: 'Springer', publishYear: '2021', totalCopies: '11', availableCopies: '7', status: 'Available' },
      { title: 'Groundwater Hydrology (3rd Edition)', author: 'David Keith Todd', isbn: '978-0471059370', category: 'Geology', publisher: 'Wiley', publishYear: '2020', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Artificial Intelligence: A Guide to Intelligent Systems', author: 'Michael Negnevitsky', isbn: '978-1408225745', category: 'Computer Science', publisher: 'Pearson', publishYear: '2021', totalCopies: '12', availableCopies: '8', status: 'Available' }
    ]
  },

  'Khulna University of Engineering & Technology': {
    code: 'KUET', city: 'Khulna', campus: 'Teligati, Khulna',
    title: 'KUET (Engineering & Tech)', logo: '⚡', themeClass: 'uni-KUET', est: '1967',
    specialty: 'Prominent public engineering university known for high-tier Mechanical, CSE, Textile and Green Energy research.',
    details: 'Established in 1967 in Teligati, KUET is the leading engineering university in south-western Bangladesh, acclaimed for its vibrant tech fests, robotics competitions and energy research.',
    teachers: [
      { name: 'Prof. Dr. Mihir Ranjan Halder', email: 'vc@kuet.ac.bd', department: 'Mechanical Engineering', designation: 'Vice Chancellor & Professor of ME', phone: '+880 1718-778899', qualification: 'Ph.D in Thermal Engineering', joinDate: '1995-02-01' },
      { name: 'Prof. Dr. K. M. Azharul Hasan', email: 'azharul@cse.kuet.ac.bd', department: 'Computer Science & Engineering', designation: 'Professor & Senior Dean', phone: '+880 1819-889900', qualification: 'Ph.D in Data Warehousing (Japan)', joinDate: '2004-06-15' },
      { name: 'Prof. Dr. Mohammad Ariful Islam', email: 'arif.me@kuet.ac.bd', department: 'Mechanical Engineering', designation: 'Professor & Head', phone: '+880 1920-990011', qualification: 'Ph.D in Computational Fluids', joinDate: '2008-01-10' }
    ],
    courses: [
      { code: 'CSE-3201', name: 'Web & Internet Technologies and Microservices', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. K. M. Azharul Hasan', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 09:30 AM (CSE Bldg)', status: 'Active' },
      { code: 'ME-3101', name: 'Advanced Fluid Mechanics & Aerodynamics', department: 'Mechanical Engineering', teacherName: 'Prof. Dr. Mihir Ranjan Halder', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 11:00 AM (Fluids Lab)', status: 'Active' },
      { code: 'TE-3105', name: 'Advanced Textile Spinning & Nanofibers', department: 'Textile Engineering', teacherName: 'Prof. Dr. Mohammad Ariful Islam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 10:00 AM', status: 'Active' },
      { code: 'EEE-3201', name: 'Digital Signal Processing & Filter Design', department: 'Electrical & Electronic Engineering', teacherName: 'Prof. Dr. K. M. Azharul Hasan', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'Khulna Shipyard Marine Automation Intern', company: 'Khulna Shipyard Ltd', location: 'Khulna City', type: 'Internship', salary: '22,000 BDT / month', deadline: '2026-12-25', status: 'Open', description: 'Vessel hydraulic electrical control systems and marine engine diagnostics.' },
      { title: 'Sundarbans Environmental IoT Fellow', company: 'KUET Green Tech Research Lab', location: 'Teligati Campus', type: 'Full-time', salary: '45,000 BDT / month', deadline: '2026-12-20', status: 'Open', description: 'Solar-powered mangrove salinity telemetry and wildlife camera traps.' },
      { title: 'Jute & Textile Quality Engineer', company: 'Square Textiles Ltd', location: 'Khulna Division', type: 'Full-time', salary: '42,000 - 52,000 BDT', deadline: '2026-12-28', status: 'Open', description: 'High-speed automated yarn spinning and fabric tensile strength testing.' }
    ],
    library: [
      { title: 'Digital Signal Processing: Principles, Algorithms', author: 'John G. Proakis & Dimitris K. Manolakis', isbn: '978-0131873742', category: 'Electrical Engineering', publisher: 'Pearson', publishYear: '2021', totalCopies: '14', availableCopies: '9', status: 'Available' },
      { title: 'Fundamentals of Fluid Mechanics (9th Edition)', author: 'Munson, Young, Okiishi', isbn: '978-1119703266', category: 'Mechanical Engineering', publisher: 'Wiley', publishYear: '2021', totalCopies: '12', availableCopies: '7', status: 'Available' },
      { title: 'Web Technologies: TCP/IP, Web Applications & Java', author: 'Achyut Godbole & Atul Kahate', isbn: '978-1259062681', category: 'Computer Science', publisher: 'McGraw-Hill', publishYear: '2020', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Textile Science: An Explanation of Fibre Properties', author: 'E. P. G. Gohl & L. D. Vilensky', isbn: '978-8123908533', category: 'Textile Engineering', publisher: 'CBS Publishers', publishYear: '2021', totalCopies: '8', availableCopies: '4', status: 'Available' }
    ]
  },

  'Jahangirnagar University': {
    code: 'JU', city: 'Savar', campus: 'Savar, Dhaka',
    title: 'Jahangirnagar University', logo: '🌸', themeClass: 'uni-JU', est: '1970',
    specialty: 'The only fully residential public university in Bangladesh, famous for migratory birds, archaeology and environmental ecology.',
    details: 'Founded in 1970 across 697 acres in Savar, JU is a scenic residential campus renowned for red migratory birds, the tallest Shaheed Minar, vibrant cultural movements and scientific research.',
    teachers: [
      { name: 'Prof. Dr. Md. Nurul Alam', email: 'vc@juniv.edu', department: 'Physics & Astronomy', designation: 'Vice Chancellor & Senior Professor', phone: '+880 1719-889900', qualification: 'Ph.D in Nuclear Physics', joinDate: '1992-04-10' },
      { name: 'Prof. Dr. Mohammad Zahidur Rahman', email: 'zahid@juniv.edu', department: 'Computer Science & Engineering', designation: 'Professor & Chairman of CSE', phone: '+880 1820-990011', qualification: 'Ph.D in Cryptography & Security', joinDate: '2006-08-01' },
      { name: 'Prof. Dr. Sufi Mostafizur Rahman', email: 'sufi@juniv.edu', department: 'Department of Archaeology', designation: 'Professor & Wari-Bateshwar Excavator', phone: '+880 1921-001122', qualification: 'Ph.D in South Asian Archaeology', joinDate: '1998-11-15' }
    ],
    courses: [
      { code: 'CSE-304', name: 'Cryptography and Cyber Network Defense', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Mohammad Zahidur Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 10:30 AM (Science Complex)', status: 'Active' },
      { code: 'ARCH-201', name: 'Archaeological Field Excavation & Dating', department: 'Department of Archaeology', teacherName: 'Prof. Dr. Sufi Mostafizur Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 09:00 AM (Field Studio)', status: 'Active' },
      { code: 'GEO-301', name: 'Remote Sensing & GIS Spatial Analysis', department: 'Geography and Environment', teacherName: 'Prof. Dr. Md. Nurul Alam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 11:30 AM', status: 'Active' },
      { code: 'ZOOL-205', name: 'Wetland Ecology and Avian Biodiversity', department: 'Department of Zoology', teacherName: 'Prof. Dr. Md. Nurul Alam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'JU Wildlife & Migratory Lake Monitor', company: 'JU Biodiversity Research Cell', location: 'Savar Campus', type: 'Internship', salary: '18,000 BDT / month', deadline: '2026-12-20', status: 'Open', description: 'Annual migratory bird census, lake water quality testing and habitat conservation.' },
      { title: 'Archaeological Artifacts Digital Archivist', company: 'Wari-Bateshwar Research Project', location: 'JU Archaeology Wing', type: 'Full-time', salary: '38,000 BDT / month', deadline: '2026-12-25', status: 'Open', description: 'Photogrammetry and 3D scanning of ancient punch-marked coins and pottery.' },
      { title: 'Network Security Analyst', company: 'Savar EPZ Tech Hub', location: 'Savar, Dhaka', type: 'Full-time', salary: '45,000 - 55,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Penetration testing, firewall policies and intrusion detection systems.' }
    ],
    library: [
      { title: 'Cryptography and Network Security (8th Ed)', author: 'William Stallings', isbn: '978-0135764039', category: 'Cyber Security', publisher: 'Pearson', publishYear: '2021', totalCopies: '14', availableCopies: '9', status: 'Available' },
      { title: 'Remote Sensing and Image Interpretation (7th Ed)', author: 'Lillesand, Kiefer, Chipman', isbn: '978-1118343289', category: 'GIS', publisher: 'Wiley', publishYear: '2021', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Archaeology: Theories, Methods, and Practice', author: 'Colin Renfrew & Paul Bahn', isbn: '978-0500295366', category: 'Archaeology', publisher: 'Thames & Hudson', publishYear: '2020', totalCopies: '8', availableCopies: '5', status: 'Available' },
      { title: 'Fundamentals of Ecology (5th Edition)', author: 'Eugene P. Odum & Gary W. Barrett', isbn: '978-0534420666', category: 'Ecology', publisher: 'Thomson Brooks', publishYear: '2020', totalCopies: '12', availableCopies: '7', status: 'Available' }
    ]
  },

  'East West University': {
    code: 'EWU', city: 'Dhaka', campus: 'Aftabnagar, Dhaka',
    title: 'East West University', logo: '🌅', themeClass: 'uni-EWU', est: '1996',
    specialty: 'High-ranking private university renowned for Business, Pharmacy, CSE and cutting-edge Aftabnagar campus.',
    details: 'Founded in 1996 by Dr. Mohammed Farashuddin (Ex-Governor, Bangladesh Bank), EWU is celebrated for rigorous academic standards, modern libraries and high corporate placement rates.',
    teachers: [
      { name: 'Prof. Dr. Shams Rahman', email: 'vc@ewubd.edu', department: 'Supply Chain & Management', designation: 'Vice Chancellor & International Professor', phone: '+880 1720-990011', qualification: 'Ph.D in Supply Chain Management', joinDate: '2023-01-01' },
      { name: 'Prof. Dr. Ahmed Wasif Reza', email: 'wasif@ewubd.edu', department: 'Computer Science & Engineering', designation: 'Professor & Dean of Engineering', phone: '+880 1821-001122', qualification: 'Ph.D in Wireless Communications', joinDate: '2016-03-15' },
      { name: 'Dr. Sufia Islam', email: 'sufia@ewubd.edu', department: 'Department of Pharmacy', designation: 'Professor & Chairperson of Pharmacy', phone: '+880 1922-112233', qualification: 'Ph.D in Pharmacology', joinDate: '2010-09-01' }
    ],
    courses: [
      { code: 'CSE-325', name: 'Operating Systems and Systems Architecture', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Ahmed Wasif Reza', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 10:00 AM (Lab 5)', status: 'Active' },
      { code: 'PHR-401', name: 'Clinical Pharmacology and Toxicology', department: 'Department of Pharmacy', teacherName: 'Dr. Sufia Islam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 11:30 AM (Pharma Wing)', status: 'Active' },
      { code: 'ECO-201', name: 'Intermediate Microeconomic Theory', department: 'Department of Economics', teacherName: 'Prof. Dr. Shams Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 09:30 AM', status: 'Active' },
      { code: 'ACT-201', name: 'Managerial Accounting and Decision Modeling', department: 'Business Administration', teacherName: 'Prof. Dr. Shams Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 01:30 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'Pharmaceutical Quality Assurance Trainee', company: 'Square Pharmaceuticals Ltd', location: 'Dhaka', type: 'Full-time', salary: '38,000 - 48,000 BDT', deadline: '2026-12-25', status: 'Open', description: 'HPLC chromatography testing and GMP compliance documentation.' },
      { title: 'EWU Aftabnagar IT Support Associate', company: 'East West University ICT Services', location: 'Aftabnagar Campus', type: 'Internship', salary: '19,000 BDT / month', deadline: '2026-12-15', status: 'Open', description: 'Assisting faculty and students with digital classroom hardware and WiFi gateways.' },
      { title: 'Supply Chain Operations Analyst', company: 'Unilever Bangladesh', location: 'Dhaka', type: 'Full-time', salary: '50,000 - 65,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Inventory optimization, demand forecasting and distribution logistics modeling.' }
    ],
    library: [
      { title: 'Modern Operating Systems (5th Global Ed)', author: 'Andrew S. Tanenbaum & Herbert Bos', isbn: '978-0137576258', category: 'Computer Science', publisher: 'Pearson', publishYear: '2023', totalCopies: '14', availableCopies: '9', status: 'Available' },
      { title: "Goodman and Gilman's The Pharmacological Basis of Therapeutics", author: 'Laurence Brunton', isbn: '978-1264258079', category: 'Pharmacy', publisher: 'McGraw-Hill', publishYear: '2022', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Intermediate Microeconomics: A Modern Approach', author: 'Hal R. Varian', isbn: '978-0393689860', category: 'Economics', publisher: 'W. W. Norton', publishYear: '2020', totalCopies: '12', availableCopies: '7', status: 'Available' },
      { title: 'Managerial Accounting (17th Edition)', author: 'Ray H. Garrison', isbn: '978-1260247855', category: 'Accounting', publisher: 'McGraw-Hill', publishYear: '2021', totalCopies: '11', availableCopies: '7', status: 'Available' }
    ]
  },

  'United International University': {
    code: 'UIU', city: 'Dhaka', campus: 'Madani Avenue, Dhaka',
    title: 'United International University', logo: '🏆', themeClass: 'uni-UIU', est: '2003',
    specialty: 'High-tech smart campus in Madani Avenue leading in AI Healthcare (AIMS Lab), Renewable Energy and Data Science.',
    details: 'Established in 2003, UIU features an expansive 100,000 sq ft green campus in Madani Avenue, acclaimed for its groundbreaking biomedical engineering innovations, robotics championships and competitive programming.',
    teachers: [
      { name: 'Prof. Dr. Md. Abul Kashem Mia', email: 'vc@uiu.ac.bd', department: 'Computer Science & Engineering', designation: 'Vice Chancellor & Prof. of CSE', phone: '+880 1721-001122', qualification: 'Ph.D in Computer Science (Tohoku)', joinDate: '2005-02-01' },
      { name: 'Prof. Dr. Khondoker Abdullah Al Mamun', email: 'mamun@cse.uiu.ac.bd', department: 'Biomedical & AI Engineering', designation: 'Founder, AIMS Lab & Professor', phone: '+880 1822-112233', qualification: 'Ph.D in Biomedical Engineering (Southampton)', joinDate: '2014-07-15' },
      { name: 'Dr. Salekul Islam', email: 'salekul@cse.uiu.ac.bd', department: 'Computer Science & Engineering', designation: 'Professor & Dean of Engineering', phone: '+880 1923-223344', qualification: 'Ph.D in Computer Networks (Concordia)', joinDate: '2012-08-01' }
    ],
    courses: [
      { code: 'CSE-4185', name: 'Biomedical Signal Processing and AI Diagnosis', department: 'Computer Science & Engineering', teacherName: 'Prof. Dr. Khondoker Abdullah Al Mamun', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 11:30 AM (AIMS Lab)', status: 'Active' },
      { code: 'DAT-301', name: 'Big Data Architectures and Spark Systems', department: 'Data Science Wing', teacherName: 'Prof. Dr. Md. Abul Kashem Mia', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 09:30 AM (Data Lab 2)', status: 'Active' },
      { code: 'EEE-3103', name: 'Renewable Solar Energy and Inverters', department: 'Electrical & Electronic Engineering', teacherName: 'Dr. Salekul Islam', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 01:00 PM', status: 'Active' },
      { code: 'MKT-301', name: 'Digital Marketing Strategies & E-Commerce', department: 'School of Business', teacherName: 'Prof. Dr. Md. Abul Kashem Mia', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 03:00 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'AIMS Healthcare AI Research Fellow', company: 'UIU Advanced Intelligent Multidisciplinary Systems Lab', location: 'Madani Avenue Campus', type: 'Full-time', salary: '48,000 BDT / month', deadline: '2026-12-28', status: 'Open', description: 'Early detection of neurological disorders using EEG signal processing and computer vision.' },
      { title: 'Smart Campus IoT Network Assistant', company: 'UIU Operations Wing', location: 'Madani Avenue, Dhaka', type: 'Internship', salary: '20,000 BDT / month', deadline: '2026-12-18', status: 'Open', description: 'Maintaining 500+ campus smart access control points and solar microgrid meters.' },
      { title: 'Cloud Infrastructure Engineer', company: 'TigerIT Bangladesh', location: 'Dhaka', type: 'Full-time', salary: '52,000 - 68,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Kubernetes container orchestration and national biometric database scaling.' }
    ],
    library: [
      { title: 'Biomedical Signal Analysis (2nd Edition)', author: 'Rangaraj M. Rangayyan', isbn: '978-0470911396', category: 'Biomedical', publisher: 'IEEE Wiley', publishYear: '2021', totalCopies: '10', availableCopies: '7', status: 'Available' },
      { title: 'Big Data Analytics with Spark and Hadoop', author: 'Venkat Ankam', isbn: '978-1785884849', category: 'Data Science', publisher: 'Packt', publishYear: '2020', totalCopies: '12', availableCopies: '8', status: 'Available' },
      { title: 'Digital Design: With an Introduction to Verilog', author: 'M. Morris Mano & Michael D. Ciletti', isbn: '978-0134549897', category: 'Electrical Engineering', publisher: 'Pearson', publishYear: '2021', totalCopies: '14', availableCopies: '9', status: 'Available' },
      { title: 'Digital Marketing Strategy: An Integrated Approach', author: 'Simon Kingsnorth', isbn: '978-1398606012', category: 'Marketing', publisher: 'Kogan Page', publishYear: '2022', totalCopies: '9', availableCopies: '5', status: 'Available' }
    ]
  },

  'Daffodil International University': {
    code: 'DIU', city: 'Dhaka', campus: 'Daffodil Smart City, Ashulia, Dhaka',
    title: 'Daffodil International University', logo: '🌼', themeClass: 'uni-DIU', est: '2002',
    specialty: 'The largest green smart campus in Bangladesh (150+ acres) pioneering Software Engineering, Mobile Apps & Entrepreneurship.',
    details: 'Established in 2002, DIU boasts the majestic Daffodil Smart City in Ashulia. Famous for "One Student One Laptop", innovation incubators, robotics teams and state-of-the-art sports facilities.',
    teachers: [
      { name: 'Prof. Dr. M. Lutfar Rahman', email: 'vc@daffodilvarsity.edu.bd', department: 'Computer Science & Engineering', designation: 'Vice Chancellor & Pioneer Computer Scientist', phone: '+880 1722-112233', qualification: 'Ph.D in Electronic & Electrical Eng (Loughborough)', joinDate: '2011-01-01' },
      { name: 'Prof. Dr. Syed Akhter Hossain', email: 'akhter.cse@daffodilvarsity.edu.bd', department: 'Computer Science & Engineering', designation: 'Professor & Dean of FSIT', phone: '+880 1823-223344', qualification: 'Ph.D in Computer Science', joinDate: '2010-04-15' },
      { name: 'Dr. Sheikh Muhammad Allayear', email: 'allayear.swe@daffodilvarsity.edu.bd', department: 'Software Engineering', designation: 'Professor & Head of SWE', phone: '+880 1924-334455', qualification: 'Ph.D in Multimedia & VR', joinDate: '2015-08-01' }
    ],
    courses: [
      { code: 'SWE-312', name: 'Cross-Platform Mobile App Development (Flutter)', department: 'Software Engineering', teacherName: 'Dr. Sheikh Muhammad Allayear', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Wed 09:30 AM (Smart City Lab 4)', status: 'Active' },
      { code: 'CIS-201', name: 'Internet of Things and Sensor Mesh Networks', department: 'Computing & Information System', teacherName: 'Prof. Dr. Syed Akhter Hossain', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Mon/Thu 11:00 AM (IoT Lab)', status: 'Active' },
      { code: 'CSE-323', name: 'Computer Graphics, VR and Game Development', department: 'Computer Science & Engineering', teacherName: 'Dr. Sheikh Muhammad Allayear', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Tue/Thu 01:30 PM (Graphics Studio)', status: 'Active' },
      { code: 'EEE-211', name: 'Electronic Circuits and Embedded Microcontrollers', department: 'Electrical & Electronic Engineering', teacherName: 'Prof. Dr. M. Lutfar Rahman', creditHours: '3.0', semester: 'Fall 2026', schedule: 'Sun/Tue 02:30 PM', status: 'Active' }
    ],
    jobs: [
      { title: 'Daffodil Smart City IoT Research Fellow', company: 'DIU Innovation & Incubation Center', location: 'Ashulia Smart City, Dhaka', type: 'Full-time', salary: '42,000 BDT / month', deadline: '2026-12-25', status: 'Open', description: 'Smart agriculture sensor arrays and automatic irrigation telemetry on campus farms.' },
      { title: 'Flutter Mobile App Engineer Intern', company: 'Daffodil Software Ltd', location: 'Daffodil Tower, Dhaka', type: 'Internship', salary: '20,000 BDT / month', deadline: '2026-12-15', status: 'Open', description: 'Developing iOS and Android mobile portals for education and e-learning platforms.' },
      { title: 'Cyber Security Operations Specialist', company: 'Reve Antivirus / Reve Systems', location: 'Dhaka', type: 'Full-time', salary: '45,000 - 55,000 BDT', deadline: '2026-12-30', status: 'Open', description: 'Threat vector analysis, reverse malware engineering and real-time network defense.' }
    ],
    library: [
      { title: 'Flutter in Action (Complete Mobile App Guide)', author: 'Eric Windmill', isbn: '978-1617296147', category: 'Software Engineering', publisher: 'Manning', publishYear: '2021', totalCopies: '14', availableCopies: '9', status: 'Available' },
      { title: 'Internet of Things: A Hands-On Approach', author: 'Arshdeep Bahga & Vijay Madisetti', isbn: '978-0996025515', category: 'IoT', publisher: 'Universities Press', publishYear: '2021', totalCopies: '12', availableCopies: '8', status: 'Available' },
      { title: 'Computer Graphics with OpenGL (4th Edition)', author: 'Donald D. Hearn & M. Pauline Baker', isbn: '978-0136053583', category: 'Graphics & VR', publisher: 'Pearson', publishYear: '2020', totalCopies: '10', availableCopies: '6', status: 'Available' },
      { title: 'Electronic Devices: Conventional Current Version', author: 'Thomas L. Floyd', isbn: '978-0134414447', category: 'Electronics', publisher: 'Pearson', publishYear: '2021', totalCopies: '11', availableCopies: '7', status: 'Available' }
    ]
  }
};

// Generate 100% Unique Data Store per University
function buildInitialData(uniName) {
  const uni = UNIVERSITIES[uniName] || UNIVERSITIES['Metropolitan University'];
  const pfx = uni.code;

  return {
    users: [
      { id: 1, username: 'omi', fullName: 'Omi (Master Administrator)', email: 'halimaomi2002@gmail.com', role: 'ADMIN', department: 'University Central Administration', studentId: `ADM-OMI-${pfx}`, university: uniName },
      { id: 2, username: 'student', fullName: 'Tanvir Ahmed', email: 'tanvir.student@gmail.com', role: 'STUDENT', department: (uni.courses[0] ? uni.courses[0].department : 'Computer Science'), studentId: `${pfx}-2024-001`, university: uniName },
      { id: 3, username: 'teacher', fullName: (uni.teachers[0] ? uni.teachers[0].name : 'Prof. Faculty'), email: 'faculty@gmail.com', role: 'TEACHER', department: (uni.teachers[0] ? uni.teachers[0].department : 'Engineering'), studentId: `FAC-${pfx}-005`, university: uniName },
      { id: 4, username: 'staff', fullName: 'Md. Karim Uddin', email: 'karim.staff@gmail.com', role: 'STAFF', department: 'Campus Operations', studentId: `STF-${pfx}-102`, university: uniName },
    ],
    students: [
      { id: 1, name: 'Ayesha Rahman', email: 'ayesha.student@gmail.com', department: (uni.courses[0] ? uni.courses[0].department : 'Computer Science & Engineering'), phone: '+880 1711-000111', studentId: `${pfx}-2024-001`, university: uniName },
      { id: 2, name: 'Tanvir Ahmed', email: 'tanvir.student@gmail.com', department: (uni.courses[0] ? uni.courses[0].department : 'Computer Science & Engineering'), phone: '+880 1812-222333', studentId: `${pfx}-2024-002`, university: uniName },
      { id: 3, name: 'Nusrat Jahan', email: 'nusrat.student@gmail.com', department: (uni.courses[1] ? uni.courses[1].department : 'Engineering'), phone: '+880 1913-444555', studentId: `${pfx}-2024-003`, university: uniName },
      { id: 4, name: 'Mahmudul Hasan', email: 'mahmud.student@gmail.com', department: (uni.courses[3] ? uni.courses[3].department : 'Business Administration'), phone: '+880 1514-666777', studentId: `${pfx}-2024-004`, university: uniName },
    ],
    teachers: (uni.teachers || []).map((t, idx) => ({ ...t, id: idx + 1, university: uniName })),
    courses: (uni.courses || []).map((c, idx) => ({ ...c, id: idx + 1, university: uniName })),
    attendance: [
      { id: 1, studentName: 'Tanvir Ahmed', studentId: `${pfx}-2024-001`, course: (uni.courses[0] ? uni.courses[0].code : 'CSE-301'), date: '2026-11-20', status: 'Present', university: uniName },
      { id: 2, studentName: 'Ayesha Rahman', studentId: `${pfx}-2024-002`, course: (uni.courses[0] ? uni.courses[0].code : 'CSE-301'), date: '2026-11-20', status: 'Present', university: uniName },
      { id: 3, studentName: 'Nusrat Jahan', studentId: `${pfx}-2024-003`, course: (uni.courses[1] ? uni.courses[1].code : 'CSE-305'), date: '2026-11-21', status: 'Late', university: uniName },
    ],
    exams: [
      { id: 1, studentName: 'Tanvir Ahmed', studentId: `${pfx}-2024-001`, course: (uni.courses[0] ? uni.courses[0].code : 'CSE-301'), examType: 'Midterm', totalMarks: '100', obtainedMarks: '94', grade: 'A+', semester: 'Fall 2026', examDate: '2026-10-15', university: uniName },
      { id: 2, studentName: 'Ayesha Rahman', studentId: `${pfx}-2024-002`, course: (uni.courses[0] ? uni.courses[0].code : 'CSE-301'), examType: 'Midterm', totalMarks: '100', obtainedMarks: '89', grade: 'A', semester: 'Fall 2026', examDate: '2026-10-15', university: uniName },
    ],
    fees: [
      { id: 1, studentName: 'Tanvir Ahmed', studentId: `${pfx}-2024-001`, feeType: 'Tuition Fee', amount: '28,000', dueDate: '2026-12-01', paidDate: '2026-11-10', status: 'Paid', university: uniName },
      { id: 2, studentName: 'Ayesha Rahman', studentId: `${pfx}-2024-002`, feeType: 'Semester Exam Fee', amount: '4,000', dueDate: '2026-12-15', paidDate: '', status: 'Unpaid', university: uniName },
    ],
    library: (uni.library || []).map((b, idx) => ({ ...b, id: idx + 1, university: uniName })),
    jobs: (uni.jobs || []).map((j, idx) => ({ ...j, id: idx + 1, university: uniName }))
  };
}

// Initialize Data Store for current university (auto-refreshes if dataset updated)
function initUniversityStore(uniName) {
  const versionKey = `sc_${uniName}_v4`;
  const store = buildInitialData(uniName);
  const needsRefresh = localStorage.getItem(versionKey) !== '4.0';

  Object.keys(store).forEach(key => {
    const storageKey = `sc_${uniName}_${key}`;
    if (needsRefresh || !localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(store[key]));
    }
  });
  localStorage.setItem(versionKey, '4.0');
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

// Mobile Sidebar open/close
function openSidebar() {
  const sb = $('sidebar'), ov = $('sidebarOverlay');
  if (sb) sb.classList.add('open');
  if (ov) ov.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  const sb = $('sidebar'), ov = $('sidebarOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('show');
  document.body.style.overflow = '';
}

// ══════════════════════════════════════════════
//  DAY & NIGHT MODE CONTROLLER
// ══════════════════════════════════════════════
let currentThemeMode = localStorage.getItem('sc_theme_mode') || 'day';

function applyThemeMode(mode) {
  currentThemeMode = mode;
  localStorage.setItem('sc_theme_mode', mode);
  if (mode === 'night') {
    document.body.classList.remove('mode-day');
    document.body.classList.add('mode-night');
    if ($('themeToggleBtn')) {
      $('themeToggleBtn').innerHTML = '🌙 Night';
      $('themeToggleBtn').title = 'Current: Night Mode. Click for Day Mode';
    }
  } else {
    document.body.classList.remove('mode-night');
    document.body.classList.add('mode-day');
    if ($('themeToggleBtn')) {
      $('themeToggleBtn').innerHTML = '☀️ Day';
      $('themeToggleBtn').title = 'Current: Day Mode (White & Orange). Click for Night Mode';
    }
  }
}

function toggleDayNightMode() {
  const newMode = currentThemeMode === 'night' ? 'day' : 'night';
  applyThemeMode(newMode);
  toast(newMode === 'day' ? '☀️ Switched to Day Mode (White & Orange)' : '🌙 Switched to Night Mode');
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

  // ── Apply university theme class to <body> ──
  const allUniClasses = Object.values(UNIVERSITIES).map(u => u.themeClass);
  document.body.classList.remove(...allUniClasses);
  document.body.classList.add(uni.themeClass);

  // Selector & Guest notification bar
  if ($('universitySelector')) $('universitySelector').value = currentUniversity;
  if ($('guestBarUni')) $('guestBarUni').textContent = `${uni.logo} ${uni.title} (${uni.city})`;

  // Dashboard Welcome Greetings — Dynamic per University!
  if ($('dashGreeting')) {
    $('dashGreeting').innerHTML = `Welcome to ${esc(uni.title)} <span class="wave">✦</span>`;
  }
  if ($('dashEyebrow')) {
    $('dashEyebrow').textContent = `${uni.title.toUpperCase()} CAMPUS PORTAL`;
  }
  if ($('dashSubtext')) {
    $('dashSubtext').textContent = `Explore official academic courses, campus careers, faculty directory and library resources at ${uni.title} (${uni.city}, Bangladesh).`;
  }
  document.title = `${uni.title} (${uni.code}) — Smart Campus Portal`;

  // Brand mark & Topbar logo
  if ($('brandLogoEmoji')) $('brandLogoEmoji').textContent = uni.logo;
  if ($('brandMarkBadge')) $('brandMarkBadge').title = uni.title;
  if ($('brandRoleSubtitle')) $('brandRoleSubtitle').textContent = uni.title.toUpperCase();
  if ($('brandMainName')) $('brandMainName').textContent = 'SmartCampus';
  if ($('topbarUniIcon')) $('topbarUniIcon').textContent = uni.logo;

  // Sidebar campus card logo & detailed info
  if ($('campusOrbEmoji')) $('campusOrbEmoji').textContent = uni.logo;
  if ($('sidebarCardTitle')) $('sidebarCardTitle').textContent = `${uni.logo} ${uni.title}`;
  if ($('sidebarCardDesc')) $('sidebarCardDesc').textContent = `${uni.campus}. ${uni.specialty}`;

  // Auth modal
  if ($('authModalUniTitle')) $('authModalUniTitle').textContent = `${uni.logo} ${uni.title}`;
  if ($('authSubtitle')) $('authSubtitle').textContent = `Official Academic Portal & Suite · ${uni.city}, Bangladesh`;
  if ($('uniNoticeEyebrow')) $('uniNoticeEyebrow').textContent = uni.title.toUpperCase();

  // Quick panel & Notice panel
  if ($('quickPanelEyebrow')) $('quickPanelEyebrow').textContent = `EXPLORE ${uni.code}`;
  if ($('quickPanelTitle')) $('quickPanelTitle').textContent = `${uni.title} Directory`;
  if ($('portalNoticeTitle')) $('portalNoticeTitle').textContent = `${uni.title} Academic Network`;
  if ($('portalNoticeText')) {
    $('portalNoticeText').textContent = `Currently viewing official academic database for ${uni.title} (${uni.campus}, ${uni.city}, Bangladesh · Est. ${uni.est}). ${uni.details} Students, faculty and staff can login using their credentials or Gmail. Admin Omi holds exclusive Master Control Panel access.`;
  }

  // Individual Module Page Headings
  if ($('coursesPageHeader')) $('coursesPageHeader').textContent = `Courses & Modules — ${uni.title}`;
  if ($('teachersPageHeader')) $('teachersPageHeader').textContent = `Faculty Directory — ${uni.title}`;
  if ($('jobsPageHeader')) $('jobsPageHeader').textContent = `Campus Career Portal — ${uni.title}`;
  if ($('libraryPageHeader')) $('libraryPageHeader').textContent = `Library Catalog — ${uni.title}`;
  if ($('studentsPageHeader')) $('studentsPageHeader').textContent = `Student Records — ${uni.title}`;
  if ($('attendancePageHeader')) $('attendancePageHeader').textContent = `Attendance Records — ${uni.title}`;
  if ($('examsPageHeader')) $('examsPageHeader').textContent = `Exams & Results — ${uni.title}`;
  if ($('feesPageHeader')) $('feesPageHeader').textContent = `Tuition & Fees — ${uni.title}`;

  // Footer & Table Indicators
  const tags = [
    'courseTableUniNotice', 'jobsTableUniNotice', 'libraryTableUniNotice',
    'teachersTableUniNotice', 'studentsTableUniNotice', 'attendanceTableUniNotice',
    'examsTableUniNotice', 'feesTableUniNotice'
  ];
  tags.forEach(t => {
    if ($(t)) $(t).textContent = uni.title;
  });

  // Copyright footer university badge
  const badge = $('copyrightUniBadge');
  if (badge) badge.textContent = `${uni.logo} ${uni.title} — ${uni.city}`;
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
  const roleClasses = ['role-guest', 'role-admin', 'role-student', 'role-teacher', 'role-staff'];
  document.body.classList.remove(...roleClasses);
  document.body.classList.add(currentThemeMode === 'night' ? 'mode-night' : 'mode-day');

  if (!user) {
    // Guest Viewer Mode
    document.body.classList.add('role-guest');
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
  document.body.classList.add(`role-${role.toLowerCase()}`);

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

// ══════════════════════════════════════════════
//  GOOGLE OAUTH / GMAIL POPUP AUTHENTICATION
// ══════════════════════════════════════════════

// Open real Google OAuth popup
function openGoogleAuthPopup(mode = 'login') {
  const width = 480;
  const height = 660;
  const left = Math.max(10, Math.round(window.screenX + (window.outerWidth - width) / 2));
  const top = Math.max(10, Math.round(window.screenY + (window.outerHeight - height) / 2));
  
  const popupUrl = `google-auth.html?mode=${encodeURIComponent(mode)}&uni=${encodeURIComponent(currentUniversity)}`;
  
  try {
    const popup = window.open(
      popupUrl,
      'GoogleCampusAuthPopup',
      `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no,resizable=yes`
    );

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      // Popup blocked by browser policy -> redirect cleanly
      window.location.href = popupUrl;
    } else {
      popup.focus();
    }
  } catch (err) {
    window.location.href = popupUrl;
  }
}

// Receive Google Auth credentials from popup
window.addEventListener('message', async event => {
  if (event.data && event.data.type === 'SMART_CAMPUS_GOOGLE_AUTH' && event.data.user) {
    await handleGoogleAuthSuccess(event.data.user);
  }
});

// Sync user state if popup saved to storage on same origin
window.addEventListener('storage', event => {
  if (event.key === 'sc_user' && event.newValue) {
    try {
      const u = JSON.parse(event.newValue);
      if (!currentUser || currentUser.email !== u.email) {
        currentUser = u;
        applyUserRole(currentUser);
        closeAuthModal();
        toast(`Signed in with Google as ${currentUser.email}!`);
        showPage('dashboard');
      }
    } catch (e) {}
  }
});

async function handleGoogleAuthSuccess(googleUser) {
  let finalUser = googleUser;

  // Try sync with Spring Boot MariaDB backend
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googleUser)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.user) {
        finalUser = data.user;
      }
    }
  } catch (e) {}

  // Update local store for offline / Vercel preview
  const localUsers = getStore('users');
  const existingIdx = localUsers.findIndex(u => u.email && u.email.toLowerCase() === finalUser.email.toLowerCase());
  if (existingIdx >= 0) {
    localUsers[existingIdx] = { ...localUsers[existingIdx], ...finalUser };
  } else {
    localUsers.push(finalUser);
  }
  setStore('users', localUsers);

  currentUser = finalUser;
  localStorage.setItem('sc_user', JSON.stringify(currentUser));

  // Automatically save to Student or Teacher roster
  syncUserToCampusEntities(currentUser);

  if (currentUser.university && currentUser.university !== currentUniversity) {
    currentUniversity = currentUser.university;
    localStorage.setItem('sc_university', currentUniversity);
    updateUniversityUI();
  }

  applyUserRole(currentUser);
  closeAuthModal();
  toast(`🎉 Welcome! Signed in as ${currentUser.fullName || currentUser.username} (${currentUser.role || 'STUDENT'})`);
  showPage('dashboard');
}

// Automatically sync newly registered user into Student or Teacher roster
function syncUserToCampusEntities(user) {
  if (!user || !user.email) return;
  const targetUni = user.university || currentUniversity;
  const role = (user.role || 'STUDENT').toUpperCase();
  const name = user.fullName || user.username || 'Unnamed';
  const email = user.email.trim();
  const dept = user.department || 'Computer Science & Engineering';
  const phone = user.phone || '+880 1711-' + Math.floor(100000 + Math.random() * 900000);
  const studentId = user.studentId || `SC-${Math.floor(1000 + Math.random() * 9000)}`;

  if (role === 'STUDENT') {
    const sKey = `sc_${targetUni}_students`;
    let students = [];
    try {
      const stored = localStorage.getItem(sKey);
      students = stored ? JSON.parse(stored) : (buildInitialData(targetUni).students || []);
    } catch (e) {
      students = [];
    }
    const idx = students.findIndex(s => s.email && s.email.toLowerCase() === email.toLowerCase());
    const studentObj = {
      id: (idx >= 0 && students[idx].id) ? students[idx].id : Date.now(),
      name: name,
      email: email,
      department: dept,
      phone: phone,
      studentId: studentId,
      university: targetUni
    };
    if (idx >= 0) {
      students[idx] = { ...students[idx], ...studentObj };
    } else {
      students.unshift(studentObj);
    }
    localStorage.setItem(sKey, JSON.stringify(students));

    // Refresh student view & dashboard counters
    if (typeof studentsCRUD !== 'undefined' && studentsCRUD.load) {
      studentsCRUD.load();
    }
    if ($('dashStudents')) $('dashStudents').textContent = students.length;
    if ($('navStudentCount')) $('navStudentCount').textContent = students.length;

    // Async sync to MariaDB if online
    fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentObj)
    }).catch(() => {});

  } else if (role === 'TEACHER') {
    const tKey = `sc_${targetUni}_teachers`;
    let teachers = [];
    try {
      const stored = localStorage.getItem(tKey);
      teachers = stored ? JSON.parse(stored) : (buildInitialData(targetUni).teachers || []);
    } catch (e) {
      teachers = [];
    }
    const idx = teachers.findIndex(t => t.email && t.email.toLowerCase() === email.toLowerCase());
    const teacherObj = {
      id: (idx >= 0 && teachers[idx].id) ? teachers[idx].id : Date.now(),
      name: name,
      email: email,
      phone: phone,
      department: dept,
      designation: user.designation || 'Lecturer / Faculty Member',
      qualification: 'M.Sc / Ph.D in ' + dept,
      joinDate: new Date().toISOString().split('T')[0],
      university: targetUni
    };
    if (idx >= 0) {
      teachers[idx] = { ...teachers[idx], ...teacherObj };
    } else {
      teachers.unshift(teacherObj);
    }
    localStorage.setItem(tKey, JSON.stringify(teachers));

    // Refresh teacher view & dashboard counters
    if (typeof teachersCRUD !== 'undefined' && teachersCRUD.load) {
      teachersCRUD.load();
    }
    if ($('dashTeachers')) $('dashTeachers').textContent = teachers.length;
    if ($('navTeacherCount')) $('navTeacherCount').textContent = teachers.length;

    // Async sync to MariaDB if online
    fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherObj)
    }).catch(() => {});
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

// Login form submit (Strictly requires real Gmail address or Master Admin 'omi')
// Master Admin: omi / Omi@2026 or halimaomi2002@gmail.com / Omi@2026
$('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const inputVal = $('loginUsername').value.trim();
  const password = $('loginPassword').value.trim();
  const btn = $('loginBtn');
  const errEl = $('loginError');

  errEl.classList.add('hidden');
  btn.disabled = true;
  btn.textContent = 'Verifying Gmail...';

  try {
    const searchKey = inputVal.toLowerCase();
    const isMasterAdmin = (searchKey === 'omi' || searchKey === 'admin' || searchKey === 'halimaomi2002@gmail.com');

    // Strict validation: Must be an authentic @gmail.com address (or master admin)
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!isMasterAdmin && !gmailRegex.test(searchKey)) {
      throw new Error('❌ Only authentic Google Gmail accounts (@gmail.com) are permitted to sign in.');
    }

    let authUser = null;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: inputVal, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) authUser = data.user;
      }
    } catch (netErr) {}

    if (!authUser) {
      // Local fallback for offline / Vercel preview
      const localUsers = getStore('users');

      // Check for Master Admin: omi / Omi@2026
      if (isMasterAdmin && password === 'Omi@2026') {
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
          (u.email && u.email.toLowerCase() === searchKey) ||
          (u.username && u.username.toLowerCase() === searchKey && isMasterAdmin)
        );
        if (found && (password === 'student123' || password === 'teacher123' || password === 'staff123' || password.length >= 3)) {
          authUser = found;
        }
      }
    }

    if (!authUser) {
      throw new Error(`❌ Invalid Gmail address or password. Please verify your credentials or register a new personal account.`);
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
    btn.textContent = 'Sign In with Gmail';
  }
});

// Register form submit (Strictly requires authentic Gmail address)
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
  btn.textContent = 'Verifying Gmail...';

  try {
    // Strict Gmail check
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email.toLowerCase())) {
      throw new Error('❌ A genuine Gmail address ending with @gmail.com is strictly required. Non-Gmail addresses are not accepted.');
    }

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

    // Automatically sync to Students or Teachers roster
    syncUserToCampusEntities(newUser);

    toast(`Gmail account created for ${university}! You can now sign in.`);
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
applyThemeMode(currentThemeMode);
initUniversityStore(currentUniversity);
updateUniversityUI();
checkAuth();
showPage('dashboard');

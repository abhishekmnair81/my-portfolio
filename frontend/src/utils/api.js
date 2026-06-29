import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const MOCK_ABOUT = {
  name: "Abhishek M Nair",
  role: "Full Stack Developer | AI & ML Enthusiast",
  tagline: "Building intelligent web apps with Django, React & Machine Learning",
  location: "Bengaluru, Karnataka, India",
  email: "abhishekmnair81@gmail.com",
  phone: "9072906348",
  github: "https://github.com/abhishekmnair81",
  linkedin: "https://linkedin.com/in/abhishekmnair81",
  instagram: "https://instagram.com/abhishek__muralidharan",
  twitter: "https://x.com/abhishekm_nair",
  class_name: "Full Stack Developer",
  server: "Bengaluru, India",
  status: "Open to Opportunities",
  bio: [
    "I'm a motivated MCA student specializing in Artificial Intelligence and Machine Learning at Jain (Deemed-to-be University), Bengaluru. I have hands-on experience as a Python Django Full Stack Developer Intern, where I built real-world web applications and REST APIs.",
    "I enjoy solving real problems with technology — from building accessible telemedicine systems for rural areas to creating interactive e-learning platforms. My approach combines strong backend engineering with clean frontend interfaces.",
    "Currently focused on AI-integrated full-stack systems and deepening my Machine Learning skills through advanced coursework."
  ],
  stats: {
    years_experience: "1+",
    projects_built: "6+",
    technologies_known: "15+"
  }
};

export const MOCK_SKILLS = [
  // Frontend
  { id: 1, name: "React.js", category: "frontend", proficiency: 90, is_hotbar: true },
  { id: 2, name: "React Native", category: "frontend", proficiency: 80, is_hotbar: false },
  { id: 3, name: "React Router", category: "frontend", proficiency: 85, is_hotbar: false },
  { id: 4, name: "React Hook Form", category: "frontend", proficiency: 85, is_hotbar: false },
  { id: 5, name: "HTML5", category: "frontend", proficiency: 95, is_hotbar: false },
  { id: 6, name: "CSS3", category: "frontend", proficiency: 90, is_hotbar: false },
  { id: 7, name: "Bootstrap", category: "frontend", proficiency: 88, is_hotbar: false },
  { id: 8, name: "JavaScript", category: "frontend", proficiency: 90, is_hotbar: false },

  // Backend
  { id: 9, name: "Python", category: "backend", proficiency: 95, is_hotbar: true },
  { id: 10, name: "Django", category: "backend", proficiency: 92, is_hotbar: true },
  { id: 11, name: "Django REST Framework", category: "backend", proficiency: 90, is_hotbar: true },
  { id: 12, name: "Flask", category: "backend", proficiency: 80, is_hotbar: false },
  { id: 13, name: "REST APIs", category: "backend", proficiency: 90, is_hotbar: false },
  { id: 14, name: "Authentication (JWT)", category: "backend", proficiency: 85, is_hotbar: false },

  // Database & Tools
  { id: 15, name: "PostgreSQL", category: "devops", proficiency: 88, is_hotbar: true },
  { id: 16, name: "MySQL", category: "devops", proficiency: 85, is_hotbar: false },
  { id: 17, name: "SQLite", category: "devops", proficiency: 90, is_hotbar: false },
  { id: 18, name: "Git & GitHub", category: "devops", proficiency: 92, is_hotbar: false },

  // AI / ML Arsenal
  { id: 19, name: "Machine Learning", category: "aiml", proficiency: 90, is_hotbar: false },
  { id: 20, name: "Deep Learning", category: "aiml", proficiency: 85, is_hotbar: false },
  { id: 21, name: "Natural Language Processing", category: "aiml", proficiency: 82, is_hotbar: false },
  { id: 22, name: "Data Analysis", category: "aiml", proficiency: 88, is_hotbar: false },
  { id: 23, name: "Data Visualization", category: "aiml", proficiency: 85, is_hotbar: false },
  { id: 24, name: "NumPy", category: "aiml", proficiency: 90, is_hotbar: false },
  { id: 25, name: "Pandas", category: "aiml", proficiency: 92, is_hotbar: false },
  { id: 26, name: "Scikit-Learn", category: "aiml", proficiency: 88, is_hotbar: false },
  { id: 27, name: "TensorFlow", category: "aiml", proficiency: 80, is_hotbar: false },
  { id: 28, name: "Keras", category: "aiml", proficiency: 80, is_hotbar: false },
  { id: 29, name: "PyTorch", category: "aiml", proficiency: 75, is_hotbar: false },
  { id: 30, name: "Matplotlib", category: "aiml", proficiency: 85, is_hotbar: false },
  { id: 31, name: "Seaborn", category: "aiml", proficiency: 85, is_hotbar: false },
  { id: 32, name: "Plotly", category: "aiml", proficiency: 80, is_hotbar: false }
];

export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "AI-Integrated Telemedicine System",
    description: "An intelligent telemedicine system combining AI and ML to enhance healthcare accessibility in rural areas. Features AI-based medical chatbot support, medication prediction, offline-compatible medicine reminders, and patient-doctor-pharmacist interaction.",
    tech_stack: ["Python", "Django", "Django REST Framework", "React.js (PWA)", "Machine Learning", "Generative AI", "GROQ API", "IndexedDB", "Service Workers", "PostgreSQL"],
    github_url: "https://github.com/abhishekmnair81/TELEMEDICINE-ACCESS",
    live_url: null, // Hidden
    is_featured: true,
    order: 1
  },
  {
    id: 2,
    title: "LearnNova — E-Learning Web Application",
    description: "A full-stack e-learning web application with dynamic student dashboards, course management, and progress tracking. Built with RESTful API integration and responsive UI design for an interactive digital learning environment.",
    tech_stack: ["React.js", "CSS", "Python", "REST API", "SQLite"],
    github_url: "https://github.com/abhishekmnair81/LearnNova",
    live_url: null, // Hidden
    is_featured: false,
    order: 2
  },
  {
    id: 3,
    title: "Credit Card Fraud Detection",
    description: "Machine learning model to detect fraudulent credit card transactions using classification algorithms and data analysis techniques.",
    tech_stack: ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "NumPy", "Jupyter Notebook"],
    github_url: "https://github.com/abhishekmnair81/Credit-Card-Fraud-Detection",
    live_url: null, // Hidden
    is_featured: false,
    order: 3
  },
  {
    id: 4,
    title: "Plant Disease Detection",
    description: "Deep learning model that detects plant diseases from leaf images using image classification techniques.",
    tech_stack: ["Python", "Deep Learning", "TensorFlow", "Keras", "Jupyter Notebook"],
    github_url: "https://github.com/abhishekmnair81/Plant-Disease-Detection",
    live_url: null, // Hidden
    is_featured: false,
    order: 4
  },
  {
    id: 5,
    title: "Safety Helmet Detection — YOLOv8",
    description: "Real-time object detection system to identify whether workers are wearing safety helmets using the YOLOv8 model for workplace safety compliance.",
    tech_stack: ["Python", "YOLOv8", "Deep Learning", "Computer Vision", "Jupyter Notebook"],
    github_url: "https://github.com/abhishekmnair81/Safety-Helmet-Detection-YOLOv8",
    live_url: null, // Hidden
    is_featured: false,
    order: 5
  },
  {
    id: 6,
    title: "Sentiment Analysis of Reviews",
    description: "NLP-based sentiment analysis system that classifies customer reviews as positive, negative, or neutral using text processing and machine learning.",
    tech_stack: ["Python", "NLP", "Scikit-Learn", "Pandas", "NLTK", "Jupyter Notebook"],
    github_url: "https://github.com/abhishekmnair81/Sentiment-Analysis-of-Reviews",
    live_url: null, // Hidden
    is_featured: false,
    order: 6
  }
];

export const MOCK_EXPERIENCE = [
  {
    id: 1,
    company_or_school: "Luminar Technolab",
    role_or_degree: "Python Django Full Stack Developer Intern",
    start_date: "July 2024",
    end_date: "February 2025",
    is_current: false,
    description: "Developed full-stack web applications using Python, Django, and React.js\nBuilt and integrated REST APIs using Django REST Framework\nDesigned responsive frontend interfaces using React\nImplemented authentication and API-based data communication\nWorked on real-world project development and deployment workflows",
    type: "work",
    order: 1
  },
  {
    id: 2,
    company_or_school: "Jain (Deemed-to-be University), Bengaluru, Karnataka",
    role_or_degree: "MCA – Artificial Intelligence and Machine Learning",
    start_date: "August 2025",
    end_date: "Present",
    is_current: true,
    description: "Focused on Advanced Artificial Intelligence, Machine Learning Models, and neural architectures.",
    type: "education",
    order: 2
  }
];

export const MOCK_CERTIFICATIONS = [
  {
    id: 1,
    title: "Complete Data Science, ML, Deep Learning & NLP Bootcamp",
    platform: "Udemy",
    status: "Ongoing",
    is_certified: false
  },
  {
    id: 2,
    title: "Fundamentals to Become a Machine Learning Engineer",
    platform: "LinkedIn Learning",
    status: "Ongoing",
    is_certified: false
  },
  {
    id: 3,
    title: "Programming Generative AI: From Variational Autoencoders to Stable Diffusion with PyTorch and Hugging Face",
    platform: "LinkedIn Learning",
    status: "Certified ✓",
    is_certified: true
  }
];

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export default client;

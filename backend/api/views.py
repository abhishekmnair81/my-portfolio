from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import EmailMessage
from django.conf import settings
from .models import About, Skill, Project, Experience, Contact, Certification
from .serializers import AboutSerializer, SkillSerializer, ProjectSerializer, ExperienceSerializer, ContactSerializer, CertificationSerializer

@api_view(['GET'])
def about_view(request):
    about = About.objects.first()
    if not about:
        about = About.objects.create(
            name="Abhishek M Nair",
            role="Full Stack Developer | AI & ML Enthusiast",
            tagline="Building intelligent web apps with Django, React & Machine Learning",
            email="abhishekmnair81@gmail.com",
            github="https://github.com/abhishekmnair81",
            linkedin="https://linkedin.com/in/abhishekmnair81",
            class_name="Full Stack Developer",
            server="Bengaluru, India",
            bio=[
                "I'm a motivated MCA student specializing in Artificial Intelligence and Machine Learning at Jain (Deemed-to-be University), Bengaluru. I have hands-on experience as a Python Django Full Stack Developer Intern, where I built real-world web applications and REST APIs.",
                "I enjoy solving real problems with technology — from building accessible telemedicine systems for rural areas to creating interactive e-learning platforms. My approach combines strong backend engineering with clean frontend interfaces.",
                "Currently focused on AI-integrated full-stack systems and deepening my Machine Learning skills through advanced coursework."
            ],
            years_experience=1,
            projects_built=6,
            technologies_known=15
        )
    serializer = AboutSerializer(about)
    return Response(serializer.data)


@api_view(['GET'])
def skills_list(request):
    skills = Skill.objects.all()
    if not skills.exists():
        default_skills = [
            # Frontend
            {'name': 'React.js', 'category': 'frontend', 'proficiency': 90, 'is_hotbar': True},
            {'name': 'React Native', 'category': 'frontend', 'proficiency': 80, 'is_hotbar': False},
            {'name': 'React Router', 'category': 'frontend', 'proficiency': 85, 'is_hotbar': False},
            {'name': 'React Hook Form', 'category': 'frontend', 'proficiency': 85, 'is_hotbar': False},
            {'name': 'HTML5', 'category': 'frontend', 'proficiency': 95, 'is_hotbar': False},
            {'name': 'CSS3', 'category': 'frontend', 'proficiency': 90, 'is_hotbar': False},
            {'name': 'Bootstrap', 'category': 'frontend', 'proficiency': 88, 'is_hotbar': False},
            {'name': 'JavaScript', 'category': 'frontend', 'proficiency': 90, 'is_hotbar': False},
            # Backend
            {'name': 'Python', 'category': 'backend', 'proficiency': 95, 'is_hotbar': True},
            {'name': 'Django', 'category': 'backend', 'proficiency': 92, 'is_hotbar': True},
            {'name': 'Django REST Framework', 'category': 'backend', 'proficiency': 90, 'is_hotbar': True},
            {'name': 'Flask', 'category': 'backend', 'proficiency': 80, 'is_hotbar': False},
            {'name': 'REST APIs', 'category': 'backend', 'proficiency': 90, 'is_hotbar': False},
            {'name': 'Authentication (JWT)', 'category': 'backend', 'proficiency': 85, 'is_hotbar': False},
            # Database & Tools
            {'name': 'PostgreSQL', 'category': 'tools', 'proficiency': 88, 'is_hotbar': True},
            {'name': 'MySQL', 'category': 'tools', 'proficiency': 85, 'is_hotbar': False},
            {'name': 'SQLite', 'category': 'tools', 'proficiency': 90, 'is_hotbar': False},
            {'name': 'Git & GitHub', 'category': 'tools', 'proficiency': 92, 'is_hotbar': False},
            # AI / ML
            {'name': 'Machine Learning', 'category': 'aiml', 'proficiency': 90, 'is_hotbar': False},
            {'name': 'Deep Learning', 'category': 'aiml', 'proficiency': 85, 'is_hotbar': False},
            {'name': 'Natural Language Processing', 'category': 'aiml', 'proficiency': 82, 'is_hotbar': False},
            {'name': 'Data Analysis', 'category': 'aiml', 'proficiency': 88, 'is_hotbar': False},
            {'name': 'Data Visualization', 'category': 'aiml', 'proficiency': 85, 'is_hotbar': False},
            {'name': 'NumPy', 'category': 'aiml', 'proficiency': 90, 'is_hotbar': False},
            {'name': 'Pandas', 'category': 'aiml', 'proficiency': 92, 'is_hotbar': False},
            {'name': 'Scikit-Learn', 'category': 'aiml', 'proficiency': 88, 'is_hotbar': False},
            {'name': 'TensorFlow', 'category': 'aiml', 'proficiency': 80, 'is_hotbar': False},
            {'name': 'Keras', 'category': 'aiml', 'proficiency': 80, 'is_hotbar': False},
            {'name': 'PyTorch', 'category': 'aiml', 'proficiency': 75, 'is_hotbar': False},
            {'name': 'Matplotlib', 'category': 'aiml', 'proficiency': 85, 'is_hotbar': False},
            {'name': 'Seaborn', 'category': 'aiml', 'proficiency': 85, 'is_hotbar': False},
            {'name': 'Plotly', 'category': 'aiml', 'proficiency': 80, 'is_hotbar': False}
        ]
        for sk in default_skills:
            Skill.objects.create(
                name=sk['name'],
                category=sk['category'],
                proficiency=sk['proficiency'],
                is_hotbar=sk['is_hotbar']
            )
        skills = Skill.objects.all()
    
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def projects_list(request):
    projects = Project.objects.all()
    if not projects.exists():
        default_projects = [
            {
                'title': 'AI-Integrated Telemedicine System',
                'description': 'An intelligent telemedicine system combining AI and ML to enhance healthcare accessibility in rural areas. Features AI-based medical chatbot support, medication prediction, offline-compatible medicine reminders, and patient-doctor-pharmacist interaction.',
                'image_url': '',
                'tech_stack': ["Python", "Django", "Django REST Framework", "React.js (PWA)", "Machine Learning", "Generative AI", "GROQ API", "IndexedDB", "Service Workers", "PostgreSQL"],
                'github_url': 'https://github.com/abhishekmnair81/TELEMEDICINE-ACCESS',
                'live_url': None,
                'is_featured': True,
                'order': 1
            },
            {
                'title': 'LearnNova — E-Learning Web Application',
                'description': 'A full-stack e-learning web application with dynamic student dashboards, course management, and progress tracking. Built with RESTful API integration and responsive UI design for an interactive digital learning environment.',
                'image_url': '',
                'tech_stack': ["React.js", "CSS", "Python", "REST API", "SQLite"],
                'github_url': 'https://github.com/abhishekmnair81/LearnNova',
                'live_url': None,
                'is_featured': False,
                'order': 2
            },
            {
                'title': 'Credit Card Fraud Detection',
                'description': 'Machine learning model to detect fraudulent credit card transactions using classification algorithms and data analysis techniques.',
                'image_url': '',
                'tech_stack': ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "NumPy", "Jupyter Notebook"],
                'github_url': 'https://github.com/abhishekmnair81/Credit-Card-Fraud-Detection',
                'live_url': None,
                'is_featured': False,
                'order': 3
            },
            {
                'title': 'Plant Disease Detection',
                'description': 'Deep learning model that detects plant diseases from leaf images using image classification techniques.',
                'image_url': '',
                'tech_stack': ["Python", "Deep Learning", "TensorFlow", "Keras", "Jupyter Notebook"],
                'github_url': 'https://github.com/abhishekmnair81/Plant-Disease-Detection',
                'live_url': None,
                'is_featured': False,
                'order': 4
            },
            {
                'title': 'Safety Helmet Detection — YOLOv8',
                'description': 'Real-time object detection system to identify whether workers are wearing safety helmets using the YOLOv8 model for workplace safety compliance.',
                'image_url': '',
                'tech_stack': ["Python", "YOLOv8", "Deep Learning", "Computer Vision", "Jupyter Notebook"],
                'github_url': 'https://github.com/abhishekmnair81/Safety-Helmet-Detection-YOLOv8',
                'live_url': None,
                'is_featured': False,
                'order': 5
            },
            {
                'title': 'Sentiment Analysis of Reviews',
                'description': 'NLP-based sentiment analysis system that classifies customer reviews as positive, negative, or neutral using text processing and machine learning.',
                'image_url': '',
                'tech_stack': ["Python", "NLP", "Scikit-Learn", "Pandas", "NLTK", "Jupyter Notebook"],
                'github_url': 'https://github.com/abhishekmnair81/Sentiment-Analysis-of-Reviews',
                'live_url': None,
                'is_featured': False,
                'order': 6
            }
        ]
        for pr in default_projects:
            Project.objects.create(**pr)
        projects = Project.objects.all()
    
    # Sort projects: featured first, then by order
    sorted_projects = sorted(projects, key=lambda x: (not x.is_featured, x.order))
    serializer = ProjectSerializer(sorted_projects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def experience_list(request):
    experience = Experience.objects.all()
    if not experience.exists():
        default_experience = [
            {
                'company_or_school': 'Luminar Technolab',
                'role_or_degree': 'Python Django Full Stack Developer Intern',
                'start_date': 'July 2024',
                'end_date': 'February 2025',
                'is_current': False,
                'description': "Developed full-stack web applications using Python, Django, and React.js\nBuilt and integrated REST APIs using Django REST Framework\nDesigned responsive frontend interfaces using React\nImplemented authentication and API-based data communication\nWorked on real-world project development and deployment workflows",
                'type': 'work',
                'order': 1
            },
            {
                'company_or_school': 'Jain (Deemed-to-be University), Bengaluru, Karnataka',
                'role_or_degree': 'MCA – Artificial Intelligence and Machine Learning',
                'start_date': 'August 2025',
                'end_date': 'Present',
                'is_current': True,
                'description': "Focused on Advanced Artificial Intelligence, Machine Learning Models, and neural architectures.",
                'type': 'education',
                'order': 2
            }
        ]
        for exp in default_experience:
            Experience.objects.create(**exp)
        experience = Experience.objects.all()
    
    serializer = ExperienceSerializer(experience, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def contact_create(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        contact = serializer.save()
        
        # Email on contact
        try:
            subject = f"Portfolio Contact: {contact.name}"
            message_body = f"You received a new message from your portfolio contact form:\n\n" \
                           f"Name: {contact.name}\n" \
                           f"Email: {contact.email}\n\n" \
                           f"Message:\n{contact.message}"
            recipient = getattr(settings, 'CONTACT_EMAIL', 'abhishekmnair81@gmail.com')
            
            email = EmailMessage(
                subject=subject,
                body=message_body,
                from_email=f"{contact.name} via Portfolio <{settings.DEFAULT_FROM_EMAIL}>",
                to=[recipient],
                reply_to=[contact.email]
            )
            email.send(fail_silently=False)
        except Exception as e:
            print(f"Failed to send email notification: {e}")
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def certifications_list(request):
    certs = Certification.objects.all()
    if not certs.exists():
        default_certs = [
            {
                "title": "Complete Data Science, ML, Deep Learning & NLP Bootcamp",
                "platform": "Udemy",
                "status": "Ongoing",
                "is_certified": False,
                "order": 1
            },
            {
                "title": "Fundamentals to Become a Machine Learning Engineer",
                "platform": "LinkedIn Learning",
                "status": "Ongoing",
                "is_certified": False,
                "order": 2
            },
            {
                "title": "Programming Generative AI: From Variational Autoencoders to Stable Diffusion with PyTorch and Hugging Face",
                "platform": "LinkedIn Learning",
                "status": "Certified ✓",
                "is_certified": True,
                "order": 3
            }
        ]
        for ct in default_certs:
            Certification.objects.create(**ct)
        certs = Certification.objects.all()
    
    serializer = CertificationSerializer(certs, many=True)
    return Response(serializer.data)

from django.db import models

class About(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255)
    email = models.EmailField()
    github = models.URLField()
    linkedin = models.URLField()
    instagram = models.URLField(blank=True, default="https://instagram.com/abhishek__muralidharan")
    twitter = models.URLField(blank=True, default="https://x.com/abhishekm_nair")
    class_name = models.CharField(max_length=100, default="Full Stack Developer")
    server = models.CharField(max_length=100, default="Kerala, India")
    bio = models.JSONField(help_text="Array of paragraphs", default=list)
    years_experience = models.IntegerField(default=3)
    projects_built = models.IntegerField(default=12)
    technologies_known = models.IntegerField(default=10)

    class Meta:
        verbose_name = "About Me"
        verbose_name_plural = "About Me"

    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('tools', 'Tools & Weapons'),
    ]

    name = models.CharField(max_length=50)
    icon_name = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(help_text="1 to 100")
    is_hotbar = models.BooleanField(default=False, help_text="Highlight in top skills")

    def __str__(self):
        return f"{self.name} ({self.category})"


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.CharField(max_length=255, blank=True, null=True)
    tech_stack = models.JSONField(default=list, help_text="Array of technologies")
    github_url = models.URLField()
    live_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class Experience(models.Model):
    TYPE_CHOICES = [
        ('work', 'Work'),
        ('education', 'Education'),
    ]

    company_or_school = models.CharField(max_length=150)
    role_or_degree = models.CharField(max_length=150)
    start_date = models.CharField(max_length=30, help_text="e.g. 2021-08 or Aug 2021")
    end_date = models.CharField(max_length=30, blank=True, null=True, help_text="Leave blank if current")
    is_current = models.BooleanField(default=False)
    description = models.TextField(help_text="Newline separated bullet points")
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.role_or_degree} at {self.company_or_school}"


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email})"


class Certification(models.Model):
    title = models.CharField(max_length=200)
    platform = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default="Ongoing")
    is_certified = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.title} - {self.platform}"

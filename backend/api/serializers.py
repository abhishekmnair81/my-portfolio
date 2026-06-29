from rest_framework import serializers
from .models import About, Skill, Project, Experience, Contact, Certification

class AboutSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()

    class Meta:
        model = About
        fields = ['name', 'role', 'tagline', 'email', 'github', 'linkedin', 'instagram', 'twitter', 'class_name', 'server', 'bio', 'stats']

    def get_stats(self, obj):
        return {
            'years_experience': obj.years_experience,
            'projects_built': obj.projects_built,
            'technologies_known': obj.technologies_known,
        }


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'icon_name', 'category', 'proficiency', 'is_hotbar']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image_url', 'tech_stack', 'github_url', 'live_url', 'is_featured', 'order', 'created_at']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'company_or_school', 'role_or_degree', 'start_date', 'end_date', 'is_current', 'description', 'type', 'order']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'message', 'created_at', 'is_read']
        read_only_fields = ['id', 'created_at', 'is_read']


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'title', 'platform', 'status', 'is_certified', 'order']

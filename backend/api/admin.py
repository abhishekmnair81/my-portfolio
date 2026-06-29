from django.contrib import admin
from .models import About, Skill, Project, Experience, Contact, Certification

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'email', 'server')
    fieldsets = (
        ('General Info', {
            'fields': ('name', 'role', 'tagline', 'class_name', 'server')
        }),
        ('Social Links', {
            'fields': ('email', 'github', 'linkedin', 'instagram', 'twitter')
        }),
        ('Bio & Stats', {
            'fields': ('bio', 'years_experience', 'projects_built', 'technologies_known')
        }),
    )

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'is_hotbar')
    list_filter = ('category', 'is_hotbar')
    search_fields = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_featured', 'order', 'created_at')
    list_filter = ('is_featured',)
    search_fields = ('title', 'description')
    ordering = ('order', '-created_at')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role_or_degree', 'company_or_school', 'type', 'start_date', 'is_current', 'order')
    list_filter = ('type', 'is_current')
    search_fields = ('role_or_degree', 'company_or_school', 'description')
    ordering = ('order', '-id')

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'message', 'created_at')
    ordering = ('-created_at',)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'platform', 'status', 'is_certified', 'order')
    list_filter = ('is_certified', 'platform')
    search_fields = ('title', 'platform')
    ordering = ('order', 'id')

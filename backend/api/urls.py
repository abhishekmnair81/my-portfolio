from django.urls import path
from . import views

urlpatterns = [
    path('about/', views.about_view, name='about'),
    path('skills/', views.skills_list, name='skills'),
    path('projects/', views.projects_list, name='projects'),
    path('experience/', views.experience_list, name='experience'),
    path('certifications/', views.certifications_list, name='certifications'),
    path('contact/', views.contact_create, name='contact'),
]

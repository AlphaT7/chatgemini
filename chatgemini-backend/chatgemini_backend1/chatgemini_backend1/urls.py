from django.contrib import admin
from django.urls import path
from chatgemini_backend1.views import generate_content

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ai_request/', generate_content),  # API endpoint
]

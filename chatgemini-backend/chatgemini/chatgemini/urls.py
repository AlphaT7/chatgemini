from django.contrib import admin
from django.urls import path
from chatgemini.views import generate_content
from chatgemini.views import index

urlpatterns = [
    path("", index),
    path("admin/", admin.site.urls),
    path("ai_request/", generate_content),  # API endpoint
]

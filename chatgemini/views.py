from django.http import HttpResponse
from django.template import loader
from rest_framework.response import Response
from rest_framework.decorators import api_view
from google import genai
from chatgemini.settings import API_KEY


@api_view(["POST"])
def generate_content(request):
    client = client = genai.Client(api_key=API_KEY)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=request.body
    )
    return HttpResponse(response.text)


@api_view(["GET"])
def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

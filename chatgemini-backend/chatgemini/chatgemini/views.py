from django.http import HttpResponse
from django.template import loader
from rest_framework.response import Response
from rest_framework.decorators import api_view
from google import genai
from chatgemini.settings import API_KEY


@api_view(["GET"])
def generate_content(request):
    client = client = genai.Client(api_key=API_KEY)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="what is the capital of the usa"
    )
    print(response.text)
    return HttpResponse(response.text)


# def index(request):
#     return HttpResponse("Hello, world.")


def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

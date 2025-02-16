from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from google import genai
from settings import G_KEY

@api_view(['GET'])
def generate_content(request):
    client = client = genai.Client(api_key= G_KEY)
    response = client.models.generate_content(
    model="gemini-2.0-flash", contents="Explain how AI works"
    )
    print(response.text)
    return HttpResponse(response.text)



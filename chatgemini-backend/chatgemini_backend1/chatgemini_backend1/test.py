from google import genai

client = genai.Client(api_key="AIzaSyCQvA3xZDz5Qar0ss5WHyzV3AbPIuolzf0")
response = client.models.generate_content(
    model="gemini-2.0-flash", contents="Explain how AI works"
)
print(type(str(response.text)))
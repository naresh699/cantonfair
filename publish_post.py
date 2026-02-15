import requests
import json
import base64

url = "http://cantonfairindiacom.local/wp-json/wp/v2/posts"
user = "admin"
password = "gf7Y CBTc S0Qh UTlT q9uD XKrp"

# Must Visit Cities Post
with open("/Users/mac/.gemini/antigravity/brain/d12ae6b2-3426-4bdc-924d-413763b9a594/seo_post_draft.md", "r") as f:
    content = f.read()

# Simple markdown to HTML conversion (headings and tables)
html_content = content.replace("# ", "<h1>").replace("## ", "<h2>").replace("\n", "<br>")

payload = {
    "title": "The 2026 Blueprint: Must-Visit Chinese Cities for Trade and Sourcing",
    "content": html_content,
    "status": "publish",
    "slug": "top-china-business-cities",
    "categories": [1]  # Default category or 'China Business' if ID known
}

credentials = user + ":" + password
token = base64.b64encode(credentials.encode())
headers = {
    'Authorization': 'Basic ' + token.decode('utf-8'),
    'Content-Type': 'application/json'
}

response = requests.post(url, headers=headers, data=json.dumps(payload))

if response.status_code == 201:
    print("Post published successfully!")
    print(response.json().get('link'))
else:
    print(f"Failed to publish post: {response.status_code}")
    print(response.text)

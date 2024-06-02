from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/profiles', methods=['GET'])
def get_profiles():
    # Get the number of profiles requested, default to 10 if not specified
    n = int(request.args.get('n', 10))
    
    # Fetch profiles from RandomUser API
    response = requests.get(f'https://randomuser.me/api/?results={n}')
    data = response.json()
    
    profiles = []
    for user in data['results']:
        profile = {
            'name': f"{user['name']['first']} {user['name']['last']}",
            'age': user['dob']['age'],
            'city': user['location']['city'],
            'country': user['location']['country'],
            'photo': user['picture']['large'],
            'description': generate_description(user)
        }
        profiles.append(profile)
    
    return jsonify(profiles)

def generate_description(user):
    # Generate a profile description dynamically
    description_templates = [
        "{name} is a {age}-year-old from {city}, {country}. Enjoys hiking and outdoor adventures.",
        "{name}, {age} years old, hailing from {city}, {country}, loves reading and traveling.",
        "Meet {name}, a {age}-year-old who lives in {city}, {country}. Passionate about cooking and music."
    ]
    template = description_templates[len(user['name']['first']) % len(description_templates)]
    return template.format(
        name=f"{user['name']['first']} {user['name']['last']}",
        age=user['dob']['age'],
        city=user['location']['city'],
        country=user['location']['country']
    )

if __name__ == '__main__':
    app.run(debug=True)
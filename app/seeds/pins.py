import os
import requests #This import is for the api
import random
from app.models import db, Pin, environment, SCHEMA

# Gets key from .env
PEXELS_API_KEY = os.environ.get('PEXELS_API_KEY')

PEXELS_API_URL = 'https://api.pexels.com/v1/search'

def fetch_images_from_pexels(per_page=20):
    headers = {
        'Authorization': PEXELS_API_KEY
    }
    # per_page is fetching a number of imgs at a time
    # Setting to 20 for now
    # Should configure this later to fit our needs
    params = {
        'per_page': per_page
    }
    
    res = requests.get(PEXELS_API_URL, headers=headers, params=params)
    
    if res.status_code == 200:
        #This parses the response, and keys into the photos
        # photos is an array of photo obj
        return res.json()['photos'] 
    else:
        print(f"Error fetching images: {res.status_code}")
        return []
    
def seed_pins():
    imgs = fetch_images_from_pexels()
    
    for img in imgs:
        user_id = random.randint(1, 3)
        img_url = img['src']['medium']
        title = img['alt']
        description = f"Photo by {img['photographer']}"
        link= img['url']
        
        new_pin = Pin(
            user_id=user_id,
            img_url=img_url,
            title=title,
            description=description,
            link=link
        )
        
        db.session.add(new_pin)
        
    db.session.commit()

def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")
        
    db.session.commit()

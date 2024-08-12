import os
import requests #This import is for the api
import random
from app.models import db, Pin, environment, SCHEMA

# Gets key from .env
PEXELS_API_KEY = os.environ.get('PEXELS_API_KEY')

PEXELS_API_URL = 'https://api.pexels.com/v1/search'

def fetch_images_from_pexels(query,per_page):
    headers = {
        'Authorization': PEXELS_API_KEY
    }
    
    params = {
        'query':query,
        'per_page': per_page
    }
    
    res = requests.get(PEXELS_API_URL, headers=headers, params=params) 
    
    #! Checks remaining requests for api
    # remaining_requests = res.headers.get('X-Ratelimit-Remaining')
    # print(f"Remaining Pexels API requests: {remaining_requests}")
    
    if res.status_code == 200:
        #This parses the response, and keys into the photos
        # photos is an array of photo obj
        return res.json()['photos'] 
    else:
        print(f"Error fetching images: {res.status_code}")
        return []

    
def seed_pins():
    #*Each fetch is considered 1 request on the api side
    # All fetch requests, 50 imgs per query
    nature_imgs = fetch_images_from_pexels('nature',50)
    animals_imgs = fetch_images_from_pexels('animals',50)
    technology_imgs = fetch_images_from_pexels('technology',50)
    programming_imgs = fetch_images_from_pexels('programming',50)
    food_imgs = fetch_images_from_pexels('food',50)
    travel_imgs = fetch_images_from_pexels('travel',50)
    fashion_imgs = fetch_images_from_pexels('fashion',50)
    architecture_imgs = fetch_images_from_pexels('architecture',50)
    people_imgs = fetch_images_from_pexels('people',50)
    sports_imgs = fetch_images_from_pexels('sports',50)
    music_imgs = fetch_images_from_pexels('music',50)
    art_imgs = fetch_images_from_pexels('art',50)
    cities_imgs = fetch_images_from_pexels('cities',50)
    landscape_imgs = fetch_images_from_pexels('landscape',50)
    interior_imgs = fetch_images_from_pexels('interior design',50)
    crochet_imgs = fetch_images_from_pexels('crochet design',50)
    plants_imgs = fetch_images_from_pexels('plants',50)
    fantasy_imgs = fetch_images_from_pexels('fantasy',50)
    game_imgs = fetch_images_from_pexels('gaming',50)
    medieval_imgs = fetch_images_from_pexels('medieval',50)
    castles_imgs = fetch_images_from_pexels('castles',50)
    movies_imgs = fetch_images_from_pexels('movies',50)
    disney_imgs = fetch_images_from_pexels('disney',50)
    
    # combining all imgs into one array
    imgs = nature_imgs,animals_imgs+technology_imgs+programming_imgs+food_imgs+travel_imgs+fashion_imgs+architecture_imgs+people_imgs+sports_imgs+music_imgs+art_imgs+cities_imgs+landscape_imgs+interior_imgs+crochet_imgs+plants_imgs+fantasy_imgs+game_imgs+medieval_imgs+castles_imgs+movies_imgs+disney_imgs
    
    
    # Looping through the array to create pins
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

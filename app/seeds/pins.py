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

    # if res.status_code == 200:
    #     #This parses the response, and keys into the photos
    #     # photos is an array of photo obj
    #     return res.json()['photos']
    # else:
    #     print(f"Error fetching images: {res.status_code}")
    #     return []

    if res.status_code == 401:
        print(f"Unauthorized access. Please check your Pexels API key.")
    elif res.status_code == 200:
        return res.json().get('photos', [])
    else:
        print(f"Error fetching images: {res.status_code}")

    return []

def seed_pins():
    
    #   category_tags = {
    #     'nature': ['Nature', 'Plants'],
    #     'animals': ['Animals'],
    #     'technology': ['Technology', 'Programming'],
    #     'food': ['Food'],
    #     'travel': ['Travel'],
    #     'fashion': ['Fashion'],
    #     'architecture': ['Architecture'],
    #     'people': ['People'],
    #     'sports': ['Sports'],
    #     'music': ['Music'],
    #     'art': ['Art'],
    #     'cities': ['Cities'],
    #     'landscape': ['Landscape'],
    #     'interior design': ['Interior Design'],
    #     'crochet': ['Crochet'],
    #     'fantasy': ['Fantasy'],
    #     'gaming': ['Gaming'],
    #     'medieval': ['Medieval'],
    #     'castles': ['Castles'],
    #     'movies': ['Movies'],
    #     'disney': ['Disney'],
    #     'space': ['Space'],
    #     'stars': ['Stars']
    # }

    # # Loop through categories
    # for category, tags in category_tags.items():
    #     # Fetch images for the current category
    #     images = fetch_images_from_pexels(category, 20)
        
    #     # Ensure all tags are created in the database
    #     tag_objects = {}
    #     for tag_name in tags:
    #         tag = Tag.query.filter_by(name=tag_name).first()
    #         if not tag:
    #             tag = Tag(name=tag_name)
    #             db.session.add(tag)
    #             db.session.commit()
    #         tag_objects[tag_name] = tag.id

    #     # Create pins and assign tags
    #     for img in images:
    #         user_id = random.randint(1, 20)
    #         img_url = img['src']['large']
    #         title = img['alt']
    #         description = f"Photo by {img['photographer']}"
    #         link = img['url']

    #         new_pin = Pin(
    #             user_id=user_id,
    #             img_url=img_url,
    #             title=title,
    #             description=description,
    #             link=link
    #         )
    #         db.session.add(new_pin)
    #         db.session.commit()  # Commit to get the pin ID

    #         # Create pin_tags for the current pin based on the category tags
    #         for tag_name in tags:
    #             tag_id = tag_objects[tag_name]
    #             pin_tag = PinTag(pin_id=new_pin.id, tag_id=tag_id)
    #             db.session.add(pin_tag)

    #         db.session.commit()
    
    #*Each fetch is considered 1 request on the api side
    # All fetch requests, 50 imgs per query
    categories = [
        'nature', 'animals', 'technology', 'programming', 'food', 'travel',
        'fashion', 'architecture', 'people', 'sports', 'music', 'art', 'cities',
        'landscape', 'interior design', 'crochet', 'plants', 'fantasy',
        'gaming', 'medieval', 'castles', 'movies', 'disney','space','stars'
    ]

    all_imgs = []

    for category in categories:
        all_imgs.extend(fetch_images_from_pexels(category, 20))

    # Looping through the array to create pins
    for img in all_imgs:
        user_id = random.randint(1, 20)
        img_url = img['src']['large']
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

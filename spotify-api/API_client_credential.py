from dotenv import load_dotenv
import os
import base64
from requests import post, get
import json

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

def get_token():
    auth_string = client_id + ":" + client_secret 
    # concatenate client_id and client_secret with a colon in between
    auth_bytes = auth_string.encode("utf-8")
    # encode the concatenation with utf-8
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8") 
    # then encode using base64 as specified by the API
    # this return a base64 object that is cast into string
    # should the second parameter above be auth_bytes or auth_base64

    url = "https://accounts.spotify.com/api/token"
    # this is where we send in our authorizing data, verify everything
    # is correct, and then send back the token
    headers = { 
        "Authorization": "Basic " + auth_base64, 
        "Content-Type": "application/x-www-form-urlencoded" # given by the API
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    # post() is from the requests library
    # this will return a json object in a field known .content
    # so we want to convert the json object into a python library
    # in order to access the data inside it
    json_result = json.loads(result.content)
    # convert json object into python dictionary
    token = json_result["access_token"]
    return token

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}

def search_for_artist(token, artist_name):
    url = "https://api.spotify.com/v1/search" # this is the endpoint
    headers = get_auth_header(token)
    # everything after type is optional
    # for 'type', if you want to search for a list of item -> type=artist,track,album
    # in our case, we are only looking for artist
    query = f"q={artist_name}&type=artist&limit=1"
    # put keyword "&" to separate arguments

    query_url = url + "?" + query
    # we use post() above in the get_token() function, now we use get()
    result = get(query_url, headers=headers)
    # parsing the json object
    json_result = json.loads(result.content)['artists']['items']
    if len(json_result) == 0:
        print("No artist with this name exists.....")
        return None
    return json_result[0]

def get_songs_by_artist(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?country=US" # endpoint
    headers = get_auth_header(token)
    result = get(url, headers=headers)
    json_result = json.loads(result.content)['tracks']
    if len(json_result) == 0:
        print("No track found.....")
        return None
    return json_result

def get_albums_by_artists(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/albums"
    headers = get_auth_header(token)
    query = f"include_groups=album,single&market=US&limit=10&offset=0"
    query_url = url + "?" + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)['items']
    return json_result

def search_for_track(token, track_name):
    url = "https://api.spotify.com/v1/search"
    query = f"q={track_name}&type=track&market=US&limit=5"
    query_url = url + "?" + query
    headers = get_auth_header(token)
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)['tracks']['items'][0]['id']
    return json_result

def get_track(token, track_id):
    url = f"https://api.spotify.com/v1/tracks/{track_id}"
    headers = get_auth_header(token)
    result = get(url, headers=headers)
    json_result = json.loads(result.content)
    track_name = json_result['name']
    album_name = json_result['album']['name']
    artist_name = json_result['artists'][0]['name']
    track_popularity = json_result['popularity']
    return track_name, album_name, artist_name, track_popularity


# unauthorized
def get_user_profile(token):
    url = "https://api.spotify.com/v1/me"
    headers = get_auth_header(token)
    result = get(url, headers=headers)
    json_result = json.loads(result.content)['error']['message']
    print(json_result)


artist_name = input("Enter Artist Name: ")

token = get_token()
result = search_for_artist(token, artist_name)
artist_id = result['id']
result2 = get_songs_by_artist(token, artist_id)
print("\n" + result['name'] + "'s top tracks:")
for idx, song in enumerate(result2):
    print(f'{idx+1}. {song["name"]}')

top_10_albums = get_albums_by_artists(token, artist_id)
print("\n" + result['name'] + "'s top albums:")
for idx, album in enumerate(top_10_albums):
    print(f"{idx}. {album['name']}")

track_name = input("\nEnter track name: ")

track_id = search_for_track(token, track_name)
track_name, album_name, artist_name, track_popularity = get_track(token, track_id)
print(track_name)
print("Artists:", artist_name)
print("Album:", album_name)
print("Popularity", track_popularity)
















     



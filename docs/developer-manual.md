# Developer Manual

## Project Overview
This app is a simple full-stack party rental and decor website for Silvia's Decor and Rental. This system allows users to:
- Browse rental inventory
- Submit event inquires
- See upcoming holiday event suggestions
- Validate phone numbers before form submission
- Generates party pitch for upcoming holidays
- Dynamically load rental content from Supabase database

### This app uses:
- Node.js
- Express.js
- Supabase
- Open AI API
- Axios
- JavaScript
- HTML and CSS

## Installation Guide
1. Clone the Repository
 ```bash
git clone <this repository-url>
cd <your-project-folder>
```

2. Install Dependencies
    Install all the required packages using npm:
```bash
    npm install
```

3. Required Environment Variables
    Create a .env file for your api keys in your root directory
    ```bash
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    OPENAI_API_KEY=your_openai_key
    CALENDARIFIC_API_KEY=your_calendarific_key
    NUMVERIFY_API_KEY=your_numverify_key
    ```

## Running the Application
### Starting the Server
```bash
node server.js
```
### The application will run on:
http://localhost:3000


## Database Structure
### Supabase Table
**rentals**
This stores the rental inventory info

Columns:
- id (Auto gen by system)
- name (name of item)
- description (desc of item)
- price (price of item)
- available (If my client has this item available to rent)
- picture name (name of image of this item in rental folder)
- price daily (text listed on website for this item)

**Inquires**
Stores customer inquiry submissions.

Columns:
- id (Auto gen by system)
- full_name 
- email
- phone
- event_date
- event-type
- message

## API Documentation ## 

### Get / ###
Returns the homepage

**Response**
Serves:
```bash
public/index.html
```

### Get /api/rentals###
Gets all the rental items from the database

**Example Response**
```bash
[
    {
        "name": "Chiavari Chair",
        "description": "Elegant chairs for weddings, birthday...",
        "price": 4.50,
        "available": true,
        "picture_name": "chiavari_chair",
        "price_daily": "$4.50 each per day"
    }
]
```

### POST /api/inquiry ###
Stores customer inquiry into the database

**Request Body**
```bash
{
    "fullName": "John Brown",
    "email": "fake@gmail.com",
    "phone": "1234567890",
    "eventDate": "2026-05-20",
    "eventType": "Wedding",
    "message": "Interested in rentals"

}
```

### GET /api/holiday ###
Gets upcoming holiday information using Calendarific API
Response Example
```bash
{
  "name": "Memorial Day",
  "date": {
    "iso": "2026-05-25"
    }
}
```

### /api/validate-phone ###
Validate a phone number using the Numverify API

**Query Parameter**
```bash
/api/validate-phone?phone=3015551234
```

**Response Example**
```bash
{
    "valid": true
}
```
### POST /api/pitch ###
Generate a short holiday-themed party pitch using the OpenAI API

**Request Body**
```bash
{
    "holiday": "Halloween"
}
```
**Response Example**
{
    "pitch": "Celebrate Halloween..."
}

## Frontend Features ##
**Rental Loading**
On the rental page, each rental item is represented as a card and it gets dynamically loaded using JS after fetching from 
```bash
/api/rentals
```
**Inquiry Form Validation**
The inquiry form:
- Prevents default page from refreshing
- Validates phone numbers before submission
- Sends the inquiry data to the backend API

**Swiper Images/Slides**
Swiper.js is used for:
- Gallery page slideshows
- Service image on the homepage  

## Testing ##
I haven't really impletmented any testing other than using console.log(), browser built-in debugging tools, and implementing error codes. This is due to the fact that the project was pretty straightforward 

**HOWEVER:**
Future developers (probably me still) will add other test when this website in the near future will start scale up. 

Such as:
- API endpoint testing
- Frontend UI testing
- Database integration testing

## Known Bugs ## 
1. This really sucks on mobile device... 
- Unfortunately I am not well versed with media queries and didn't have enough time to work on this aspect
- Navigation bar can be small on certain mobile devices

2. API Limitation
- Since this is a school assignment, I didn't spend any money for api usage

If the request limit is reached, certain aspects of the website may stop working

## Future Development Roadmap ## 
1. Admin Dashboard as a way for other admin to make changes to the website
2. Better functionality on mobile devices
3. Allow users to search or filter through the rental catalog

## Technologies Used ##
**Backend:**
- Node.js
- Express.js
- Supabase
- OpenAI API 
- Axios

**Frontend:**
- HTML
- CSS
- Javascript
- Swiper.js
- AOS.js

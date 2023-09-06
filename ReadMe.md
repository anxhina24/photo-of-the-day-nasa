# Task

We want you to complete this small application. It should be a small Gallery which includes the Astronomy Pictures of the Day (APOD) 
which are published by NASA.

First: We want you to complete the backend:
- Finish the ToDos that are already there.
- Add a route to get the images and its information from the database.

Second: Complete the frontend (you can use whatever frontend framework you want to use. If you do, it is fine if you have
to restructure the already written code):
- Create a small website, where the pictures are displayed. By default the image itself, the date and the title of the image should be visible.
- There should be a button to download the Astronomy Picture of this day.
- By hovering over an image, the description or the explanation should also be displayed.
- By clicking on an image, the website should bring you to a new page, where the picture is shown and all the information 
- of the picture are displayed. There should als be a return button somewhere, to get back to the gallery.

### Links:
- NASA APIS Website: https://api.nasa.gov/
- APOD API: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

### Notes
- We used an sqlite database, to make it easier for you to set the project up. Please note that, sqlite has no date datatype. 
- But it has inbuild functions to convert date strings to integers (Unix Timestamps). Because of that we used integer to 
- store the dates in combination with the ```strftime```  function. 

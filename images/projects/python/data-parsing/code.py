# ## Step1: Import the required packages
import requests
from bs4 import BeautifulSoup  


"""Please Note:
To run the code, you must have installed the following two modules:
1) requests: (for pip, run ”pip install requests” in Terminal)
2) beautifulsoup4: (for pip, run ”pip install beautifulsoup4” in Terminal.)
"""

"""The Difference between bs4 and beautifulsoup4:
"bs4" is technically a different package; however, it is a dummy package designed 
to install the correct package: "beautifulsoup4".
"""
################
# Requests #####
################

"""The "requests" module allows us to send HTTP requests using Python.
The HTTP request returns a Response Object with all the response data 
(content, encoding, status, etc).
"""

######################
# BeautifulSoup ######
######################

"""Beautiful Soup is a Python package for parsing HTML and XML documents
(including having malformed markup, i.e., non-closed tags, so named after
tag soup). It creates a parse tree for parsed pages that can be used to
extract data from HTML, which is useful for web scraping.
"""

# ## Step2: Login Data
website_url = 'https://the-internet.herokuapp.com/'
login_url = "https://the-internet.herokuapp.com/authenticate"

login_data = { 
	'username' : 'tomsmith' ,
	'password' : 'SuperSecretPassword!'
}

# # Step3: Start a Session
with requests.session()as s:

   """For every request made, "requests.get()" generates a new Session object.
   By generating a session object upfront, you can reuse the session; this allows you 
   to store cookies, for example, and reuse settings that will be utilized for all 
   connections, such as headers and query parameters. Finally, sessions enable connection 
   pooling, which allows you to reuse connections to the same host.
   """

   # ## Step 4: Make a request to get a response
   response = s.post(login_url, data=login_data)  # <class 'requests.models.Response'>
   
   # ## Step 5: Call the BeautifulSoup() on the response to get the soup object and inspect the object
   soup = BeautifulSoup(response.content, "html.parser")  
   print("type(soup)=", type(soup))
   
   # Inspecting the HTML and text of the logged-in page

   print("###### soup.prettify() started ##################################################################")
   # print(soup.prettify())
   print("###### soup.prettify() ended ####################################################################")
   
   print("###### Soup.text started ######################################################################")
   # print(soup.text)
   print("###### Soup.text ended ########################################################################")
   
   # ## Step 6: Get the required data by inspecting the HTML tree 
   
   # Required data with "tag" + "class" search with find()
   required_data1 = soup.find("h4", class_="subheader").text
   print('Required Data=', required_data1)
   
   # Required data with "tag" + "class" search with find_all()
   required_data2 = soup.find_all("div", class_="row")  # To get the text, we can't write ".text" at the end of required_data3 because it is a result set.
   required_data2 = required_data2[1].find('h4', class_="subheader").text
   print("Required Data=", required_data2)
   
   # Required data with "attribute" search 
   required_data3 = soup.find(attrs={"class": "subheader"}).text
   print('Required Data=', required_data3)
   # Require data with "tag" + "attrs" search
   required_data4 = soup.find("h4", attrs={"class":"subheader"}).text
   print('Required Data=', required_data4)
   
   print(required_data1==required_data2==required_data3==required_data4)


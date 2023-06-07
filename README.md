# Movie Shop
![localhost_3000_ (1)](https://github.com/RamElias/Movie_Shop/assets/93216662/51af8253-7383-4420-a6a6-e8d8804f483e)


# Authors
*  Ram Elias       ramel@edu.hac.ac.il
*  Eliezer Seror   eliezerse@edu.hac.ac.il

# Explanations

# need to install: npm install react-icons

The codebase consists of three main components: Search Page, Cart Page, and Checkout Page. The Search Page allows users to search for movies based on different attributes such as query string, genre, and release year. It fetches movie data from the TMDB API using Axios and displays the search results. Users can add movies to their cart, which is handled by a Spring server on the backend. The Cart Page displays the items in the user's cart and provides options for managing the cart, such as removing items or proceeding to checkout. The Checkout Page allows users to enter their personal and payment information, which is then sent to the Spring server to be stored in the database. 

search attributes implemented in the code:

Search by Query: This attribute allows users to search for movies using a specific query string. Users can enter a keyword or a movie title in the search input field. The search is performed using the TMDB API's search/multi endpoint, which returns movies and other media related to the query.

Search by Filtering: This attribute enables users to refine their search results based on genre and release year. Users can select one or multiple genres from a list of options, and they can also choose one or multiple release years. The search is performed using the TMDB API's discover/movie endpoint, which allows filtering movies based on genre and release year criteria.

Search History: This feature keeps track of the user's search history and allows them to revisit previous searches. The search history is displayed as a list of search entries, including both query searches and discover searches. Users can click on a history item to perform the same search again.
To add an item to the history the user must click on search button.

The search results are 20 per page. Users can navigate through the pages of search results using the "Previous Page" and "Next Page" buttons.

---------------------


# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration "ex4" at the top right. Make sure the "Main class" is set to "hac.DemoApplication" and that Java is set

Everything ok?
1. Run the SQL server as shown in the video (week 6) and create a database named "ex4". The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.

## Using the provided code to store purchases in the DB

We provide you with ready-to-use code to store purchases in the DB, in order to give you a taste of what Spring can do for you.
Look at the DebugController class. It has a method called "addPurchase" that receives a Purchase object and stores it in the DB.
When you develop your own controller, you must declare the repository member exactly as it is declared in the DebugController class.
Then you can use it to store purchases in the DB (repository.save(purchase)).

## Still have problems? Come to class.

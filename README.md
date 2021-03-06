<!-- PROJECT LOGO -->
<br />
<div align="center" id="#top>
  <a href="https://github.com/abdulqshabbir/star-wars">
    <img src="https://cdn.mos.cms.futurecdn.net/HoV9PTARj4sSSKHq8ScVFB-1024-80.jpg.webp" alt="Logo" width="300px">
  </a>

  <h3 align="center">Star Wars Portal</h3>
  <br />
</div>


## Table of Contents
1. [About The Project](#about-the-project)
2. [Installation](#installation)
3. [Front End Overview](#front-end-overview)
4. [Back End Overview](#back-end-overview)
5. [Improvements](#improvements)
6. [License](#license)
7. [Contact](#contact)

<br />

<!-- ABOUT THE PROJECT -->
## About The Project

Learn more about your favourite Star Wars characters! The Star Wars Portal uses the SWAPI API to grab relevant information about your favorite Star Wars characters.

Main User functionalities:
- Users can search for Star Wars characters by name
- Users can click a Star Wars character to learn more about them
- If more than 10 characters match a search result, users can use the arrows at the bottom to move between the Star Wars characters 10 at a time. 

<br />

<!-- GETTING STARTED -->
## Installation

The following list provides the instructions needed to run this project locally.

Please ensure before running these steps that you have [node](https://nodejs.org/en/download/) installed on your computer.
1. Clone the repo 
    ```sh
    git clone https://github.com/abdulqshabbir/star-wars.git
    ````
2. Move into the server directory and install server dependencies
   ```sh
    cd star-wars/server
    npm install
   ```
    Note: on windows/linux you will need to run the command below if development dependencies do not get installed with `npm install`.

    ```sh
      npm install --only=dev
    ```

3. Run the server
   ```sh
    npm run start
   ```
4. Open a new terminal window and move into the client folder. Then install client dependencies
   ```sh
    cd star-wars/client
    npm install
   ```
5. Start the client React application
   ```sh
   npm run start
   ```
6. Go to `localhost:3000` to see the running application

<br />

## Running Tests
Move into the server directory and run
```sh
npm run test
```
The tests use the supertest library to make HTTP requests and Jest to validate if the response from our API matches the expected response from the SWAPI API.

<br />

<!-- OVERVIEW -->
## Front End Overview

- Routes

  The front end consists of a React application which uses
  react-router-dom for client-side routing. The two client
  routes are the `HomePage` and the `CharacterPage`.

  The `HomePage` is responsible for presenting Star Wars character cards
  and allowing the user to search for characters.

  The `CharacterPage` is responsible for presenting more detailed information
  on a single character.

- State

  The `HomePage` renders a `SearchBar` component and `StarWarsCharacters`
  component which both need access to the Star Wars characters. Here we lifted
  up the state into a `People` context using React's `useContext` hook to allow
  for easy access of our Star Wars characters deep in the react component tree without passing down props. Although useContext is not necessary now, as the application grows, the `People` context will greatly simplify access to Star Wars characters.

- Styling

  CSS modules are used to keep classes locally scoped to their component. Each component has its own CSS modules file and there is a global index.css file that includes styles shared by the entire application.

- Services

  To communicate with the back end of our appilcation we have two functions `getPerson`
  and `getPeople` which perform HTTP GET requests to grab one Star Wars character or
  many Star Wars characters from our back end.

- Extra Character
  
  The extra character is stored in a data folder in the src directory. Adding our extra character into our front end happens in our services. We modify the `getPerson` and `getPeople` functions to return our extra character in the event of a search string match for "Grogu".

<!-- ROADMAP -->
## Back End Overview

  - Routes

    - `/api/person/:name`

      A GET request to `/api/person/:name` returns information pertaining to a single Star Wars character (i.e. their name, gender, eyeColor, birthYear, homeworld, films). Note: this route is always called by the front end with the full name of a Star Wars character. However, if there are more than two Star Wars characters with matching full names it would be better to use an id to identify each character. This approach was taken only for ease of implementation. 

    - `/api/people/:searchParams`
      
      A GET request to `/api/people/:searchParams` returns all Star Wars characters that match the `searchParams`. The URL `searchParams` can include a page number and name in the form `name=Luke&pageNumber=1` and returns all Star Wars characters matching that criteria. Meta data such as the count of Star Wars characters is also returned from the SWAPI API.

  - Util Functions
    - Since the `homeworld` and `films` fields provided by SWAPI are URLs I created some asynchronous helper functions `getResource` and `getResources` which use the URL to fetch the corresponding resource with the fields that the client requests.

## Improvements
- Add the ability to search for characters fom the `CharacterPage` similar to how it is possible on the `HomePage`
- Add the ability to search for characters by other characteristics, such as thier homeworld planet
- Speed up the application by adding a cache for the `getPeople` and `getPerson` functions which populate our front end with data. We can use the URL being passed to the fetch function as a unique key in our hashmap
- Use an id instead of a full name to uniquely identify characters in our /api/person/:name route
- Use express.Router to create modular route handlers in our back end
- Create tests for our React application
- Lift up global CSS styles into a theme that can be reused throughout the application
- Add tests for our server util functions `getResource` and `getResources`
- Instead of testing our API against hard-coded values of the SWAPI API we should instead make a request to the SWAPI API to ensure that tests do not (incorrectly) fail if the SWAPI API changes
- Use async/await syntax for promises
- Improve error handling on the front end
- Use consistent variable naming: there are several occurences where the words "people" and "characters" are used interchangeably. It would be better to have a single variable name we use consistently throughout.
- Add linting

<!-- LICENSE -->
## License

Distributed under the MIT License.

<!-- CONTACT -->
## Contact

[Linked In](https://www.linkedin.com/in/abdul-shabbir-702881145/)

[Twitter](https://twitter.com/abdulshabbirdev)

[Project Link](https://github.com/abdulqshabbir/star-wars)
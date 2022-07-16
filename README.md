<!-- PROJECT LOGO -->
<br />
<div align="center" id="#top>
  <a href="https://github.com/abdulqshabbir/star-wars">
    <img src="https://cdn.mos.cms.futurecdn.net/HoV9PTARj4sSSKHq8ScVFB-1024-80.jpg.webp" alt="Logo" width="300px">
  </a>

  <h3 align="center">Star Wars Technical Documentation</h3>
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

This is a project that lets you learn more about your favourite Star Wars characters. It uses the SWAPI API to grab relevant information and present it to the user.

Main User functionalities:
- Users can search for Star Wars characters by name
- User can click a "person card" to learn more about a Star Wars character
- If more than 10 characters match a search result, users can use the arrows at the bottom to move between the Star Wars characters 10 at a time. 

<br />

<!-- GETTING STARTED -->
## Installation

The following list provides the instructions needed to run this project locally.

Please ensure before running these steps that you have [npm](https://nodejs.org/en/download/) installed on your computer.
1. Clone the repo 
    ```sh
    git clone https://github.com/abdulqshabbir/star-wars.git
    ````
2. Move into the server directory and install server dependencies
   ```sh
    cd star-wars/server
    npm install
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
Move into the server directory and use `npm run test` to run Jest tests.

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
- Use an id instead of a full name to uniquely identify characters in our /api/person/:name route
- Use express.Router to create modular route handlers
- Create tests for our React application
- Lift up global CSS styles into a theme that can be reused throughout the application
- Add tests for our server util functions `getResource` and `getResources`
- Instead of testing our API against hard-coded values of the SWAPI API we should instead make a 
request to the SWAPI API 
- Use async/await syntax for promises
- Improve error handling on the front ends
- Add linting

<!-- LICENSE -->
## License

Distributed under the MIT License.

<!-- CONTACT -->
## Contact

[Linked In](https://www.linkedin.com/in/abdul-shabbir-702881145/)

[Twitter](https://twitter.com/abdulshabbirdev)

[Project Link](https://github.com/abdulqshabbir/star-wars)
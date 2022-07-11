TODO:

- [X] Create GET route for `/people/`
    - example response when request made to `/people`
    ```
    {
        count: 82,
        nextURL: "https://swapi.dev/api/people/?page=2",
        previousURL: null,
        results: [
            {
                name: Luke Skywalker,
                gender: male,
                birthYear: 19BBY,
                eyeColor: blue,
                homeworld: planetName,
                appearedIn: listOfFilms
            },
            ...
        ] 
    }
    ```

- [X] Create GET route for `/people/id`
    - Should return a JSON response of the person with corresponding `id`
    - example response:
    ```
    {
        name: Luke Skywalker,
        gender: male,
        birthYear: 19BBY,
        eyeColor: blue,
        homeworld: planetName,
        appearedIn: listOfFilms
    }
    ```
    - Note: `planetName` will be provided as a URL by SWAPI so another request needs to be made to `/planets/id` to find the string name of planet
    - Note `appearedIn` will be provided as a list of URLs by SWAPI so for each URL we need to make a request to `/films/id` to get the corresponding film name

- [X] Create GET route for `/planets/id`
    - example response when `id === 1`
    ```
    {
        name: Tatooine
    }
    ```
- [X] Create GET route for `/films/id`
    - example response when `id === 1`:
    ```
    {
        title: A New Hope,
        episode_id: 4
    }
    ```
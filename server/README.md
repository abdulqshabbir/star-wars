TODO:

- [ ] Create GET route for `/people/`
    - Should accept an `options` object in request body
    - `options` object should allow for searching `people` by `page` and `name`
        - e.g. `/people/` with `req.body = {page: 2}` should return all people on page 2
        - e.g. `/people/` with `req.body = {name: r2-d2}` should return all people that match the `name` search string
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
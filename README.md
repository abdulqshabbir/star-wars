# TODO
[X] Let user search character by name
- [X] Store input field text in react state
- [X] On click of submit button (or Enter keypress), make a request to server to search for people with name
- [X] Once response is recieved, update the people context so that the star wars characters re-render


[X] Let users move to next (or previous) ten characters if enough results. Disable the right and left pointers if not enough results. 
- [X] Find icons for left and right pointers
- [X] On click of right pointer, grab the next pointer of the people context. Then update the people context with the next page.
- [X] On click of left pointer do the symmetric opposite of above.

## Wireframes
Below are three wireframes that I'll use (created myself using Figma) for prototyping the design of the home page, character page as well as the search feature. These wireframes will help me identify the necessary React components I need as well as think about the functionality in the backend needed to create each view.

## Wireframe for Home Page
![Wireframe for home page](./readme-assets/wireframe-home-page.png)

## Wireframe for Character Page
![Wireframe for character page](./readme-assets/wireframe-character-page.png)

## Wireframe for Search Feature
![Wireframe for search feature](./readme-assets/wireframe-search-feature.png)
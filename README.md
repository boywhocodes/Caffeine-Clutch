# Caffeine Clutch

## Background

There's only one thing in the world that is needed in order to become a great software developer...coffee!  The goal is to help your character, Coder, collect as many cups of coffee as you can in a given timeframe.  The more caffeine Coder intakes, the better developer he will become.  Be wary of warm cups of milk that also fall from the sky.  Accidentally running into one of those will put Coder to sleep for a few seconds, thus hurting the time you could be spent coding.
A player can generate more time by reaching a certain number of cups - thus potentially expanding gameplay.
The game will end when times up.

## Functionality & MVP  

Users will be able to:

- [ ] Start, pause, and restart the game.
- [ ] Use Coder to move right, left, or jump.
- [ ] Collect cups of coffee.
- [ ] Avoid the warm cups of milk.

## Architecture and Technologies

This project will be implemented with the following technologies:

- `Vanilla JavaScript` and `jquery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering.

In addition to the webpack entry file, there will be four scripts involved in this project:

`clutch.js`: this script will handle the logic for creating and updating the necessary background elements and rendering them to the DOM.

`moving_object.js`: this script will handle the logic of the behavior of any moving objects on the screen.

`coder.js`: this script will handle the logic of the behavior of Coder. i.e., move left, move right, jump, drink coffee, or drink milk.

`beverage_cloud.js`: this script will handle the logic of the behavior of the beverage cloud that makes it rain coffee and milk.

`coffee_cup.js`: extends moving_object.js.

`milk_glass.js`: extends moving_object.js.


## Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all scripts outlined above. Do some researches how to create animation with sprites. Goals for the day:

- Get a green bundle with `webpack`
- Learn enough animation with sprites and render an object to the `Canvas` element

**Day 2**: Create `moving_object` object and its logic. Extend `milk_glass`, `coffee_cup`, and `beverage_cloud` from `moving_object`. Goals for the day:

- Complete the `moving_object` and make sure the milk_glass and coffee_cup would fall.
- Update game logic when the collision happens.
- Complete the `beverage_cloud` and make sure it will move right and left in a random speed on the sky.

**Day 3**: Build out the `Coder` object and connect to the `Board` object. Goals for the day:

- Complete the `coder` module (constructor, update functions)
- Render a square grid to the `Canvas`.
- Make sure Coder can move left, right, and jump.

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend using CSS, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- Polish the game with better background images and CSS effects.


## Bonus features

 Extra features worth looking into down the line:

- [ ] Varying types of beverages besides the given two.
- [ ] The ability to set your desired time of game
- [ ] Choosing different characters
- [ ] A boost feature that allows Coder to drink coffee at a faster speed (i.e. possibly through slowing down the game clock)

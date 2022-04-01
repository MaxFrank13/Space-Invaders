# Space Invaders

# Description

Gameboy built in Blender and then imported using threeJS as well as a Space Invaders game built using the Canvas API. A fun way to explore 3D animations in the web browser. 

[Tour of the App](https://drive.google.com/file/d/1sj2ZZykjnb90RZKVueX0BeTUUVrHpNqb/view)

![Picture of Gameboy](https://drive.google.com/file/d/1sj2ZZykjnb90RZKVueX0BeTUUVrHpNqb/view)

## Installation

   - Clone this repository to receive all of the files
   - Run "npm install" in the command line of your terminal to set up all of the dependencies
   - There is no database for this app yet
   - Run "npm run dev" to start the application's connection
   - Go to the url of the application (http//:localhost:3000) and you'll see it running

## Usage

Orbit controls are provided that allow the user to move the position of the camera when clicking and dragging. Pressing the start button triggers an animation that zooms in on the Gameboy and then displays an interface representing the screen. Another UI appears and when you press start a Space Invaders game is rendered to the page.

![Picture of game UI](https://drive.google.com/file/d/1sj2ZZykjnb90RZKVueX0BeTUUVrHpNqb/view)
    
## Three.js

Three.js is an incredible tool for creating 3D scenes and rendering them to a webpage. Here a 3D object has been imported from Blender and orbit camera controls are provided to the user to scroll around and inspect. With the use of `dat.gui` it gets much easier to dial in the precise values needed for an animation. 

#### Button Listener in 3D

![Picture of start button](https://drive.google.com/file/d/1sj2ZZykjnb90RZKVueX0BeTUUVrHpNqb/view)

A button handler is created for the start button using the `raycaster` that is available in three.js. This tool takes in a parameter for your mouse position and another for the camera's position within the 3D space. Using these coordinates, we are able to pinpoint what the user is clicking on. Raycasters solve the issue of detecting where a user's pointer is positioned based on their current view of the 3D space. As the user scrolls and moves their camera position, we need to have a way of updating this event listener and that is precisely what the raycaster does.

## Canvas Games

![Picture of gameplay](https://drive.google.com/file/d/1sj2ZZykjnb90RZKVueX0BeTUUVrHpNqb/view)

The Canvas API is a fun and intuitive way to create animations in the web browser. It is utilized by many frameworks and libraries (including three.js) however here it is being used in its vanilla form to render a simple interactive animation. By utilizing OOP principles the game objects can effectively communicate with each other and be influenced by the user's input. The provided Space Invaders game is a take on a classic arcade game. The way this game is structured lends itself to be built out with more levels, enemies, and items.


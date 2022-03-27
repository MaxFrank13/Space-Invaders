# Space Invaders

# Description

Gameboy built in Blender and then imported it using threeJS. Pressing the start button triggers an animation that zooms in on the Gameboy and then displays an interface representing the screen. Another UI appears and when you press start a Space Invaders game is rendered to the page.

[Tour of the App](https://drive.google.com/file/d/1sj2ZZykjnb90RZKVueX0BeTUUVrHpNqb/view)

# Installation & Usage

After installing the necessary dependencies, you should be able to boot up the server and a gameboy will be displayed on the screen. This application is made of two larger parts: one is the 3D animation for the Gameboy, and the other is the 2D game animation for the actual game "inside" of the Gameboy.

## Three.js

Three.js is an incredible tool for creating 3D scenes and rendering them to a webpage. Here a 3D object has been imported from Blender and orbit camera controls are provided to the user to scroll around and inspect. With the use of `dat.gui` it gets much easier to dial in the precise values needed for an animation. 

#### Button Listener in 3D

A button handler is created for the start button using the `raycaster` that is available in three.js. This tool takes in a parameter for your mouse position and another for the camera's position within the 3D space. Using these coordinates, we are able to pinpoint what the user is clicking on. Raycasters solve the issue of detecting where a user's pointer is positioned based on their current view of the 3D space. As the user scrolls and moves their camera position, we need to have a way of updating this event listener and that is precisely what the raycaster does.

## Canvas Games

The Canvas API is a fun and intuitive way to create animations in the web browser. It is utilized by many frameworks and libraries (including three.js) however here it is being used in its vanilla form to render a simple interactive animation. By utilizing OOP principles the game objects can effectively communicate with each other and be influenced by the user's input. The provided Space Invaders game is a take on a classic arcade game. The way this game is structured lends itself to be built out with more levels, enemies, and items.


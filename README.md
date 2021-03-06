# linuxmouse

[![NPM](https://nodei.co/npm/linuxmouse.png)](https://www.npmjs.com/package/linuxmouse)

A node.js module that does virtual mouse input on Ubuntu/Linux distros. A sibling module of [macmouse](https://github.com/Loknar/node-macmouse). Implements the same functions, but works on X11 instead of Mac OS X Cocoa.

## Dependencies
Uses the command line tool `xdotool` to manipulate the mouse, you need to install it with the following command:

```
$ sudo apt-get install xdotool
```

## Installation

Install using `npm`,

``` bash
$ npm install linuxmouse
```

## Usage Example
``` javascript
var mouse = require('linuxmouse');

mouse.init();

var ptX = 800;
var ptY = 600;

var counter = 0;

var doThings = function() {
    mouse.Place(ptX, ptY);
    setTimeout(pressAndHold, 250);
}

var pressAndHold = function() {
    mouse.LeftButtonPress();
    setTimeout(doDragStuff, 250);
}

var doDragStuff = function() {
    ptX += 2;
    ptY += 2;
    mouse.DragPlace(ptX, ptY);
    if (counter < 15) {
        counter += 1;
        setTimeout(doDragStuff, 250);
    }
    else {
        mouse.LeftButtonRelease();
    }
}


doThings();

mouse.quit();

```

## List of functions

And a small description for each function.

``` javascript
// Desc:   Imports the linuxmouse module as mouse
// Before: nothing
// After:  mouse is an uninitialized linuxmouse
var mouse = require('linuxmouse');
```

### init

``` javascript
// Desc:   Initializes the linuxmouse module
// Before: mouse is an uninitialized linuxmouse
// After:  mouse is an initialized linuxmouse
mouse.init();
```

### getRealPos

``` javascript
// Desc:   Sends request for real mouse position, more expensive than getPos
// Before: mouse is an initialized linuxmouse
// After:  pos holds x and y numbers representing the system mouse position
var pos = mouse.getRealPos();
var x = pos.x;
var y = pos.y;
```

### getPos

``` javascript
// Desc:   Returns mouse position currently stored in the mouse module
// Before: mouse is an initialized linuxmouse
// After:  pos holds x and y numbers representing the system mouse position currently stored in the
//         mouse module
var pos = mouse.getPos();
var x = pos.x;
var y = pos.y;
```

### Place

``` javascript
// Desc:   Sends mouse event message to place the system mouse at a specific position
// Before: mouse is an initialized linuxmouse, x and y are numbers representing a specific position
// After:  mouse event has been sent to move the system mouse to position defined by x and y
mouse.Place(x, y);
```

### DragPlace

``` javascript
// Desc:   Sends mouse event message to place the system mouse at a specific position while in a 
//         dragging state
// Before: mouse is an initialized linuxmouse, x and y are numbers representing a specific position, the 
//         system mouse currently has (or thinks it has) the left mouse button pressed
// After:  mouse event has been sent to move the system mouse to position defined by x and y with left 
//         mouse button pressed
mouse.DragPlace(x, y);
```

### Move

``` javascript
// Desc:   Sends mouse event message to move the system mouse (from current stored position in the mouse 
//         module) by a vector defined by dx and dy
// Before: mouse is an initialized linuxmouse, dx and dy are numbers representing our moving vector 
// After:  mouse event has been sent to move the system mouse by a vector defined by the numbers dx and dy
mouse.Move(dx, dy);
```

### DragMove

``` javascript
// Desc:   Sends mouse event message to move the system mouse (from current stored position in the mouse 
//         module) by a vector defined by dx and dy while in a dragging state
// Before: mouse is an initialized linuxmouse, dx and dy are numbers representing our moving vector, the 
//         system mouse currently has (or thinks it has) the left mouse button pressed
// After:  mouse event has been sent to move the system mouse by a vector defined by the numbers dx and dy 
//         with left mouse button pressed
mouse.DragMove(dx, dy);
```

### LeftButtonPress

``` javascript
// Desc:   Sends mouse event message to press and hold down the left button of the system mouse
// Before: mouse is an initialized linuxmouse
// After:  mouse event has been sent to press and hold the left button on the system mouse
mouse.LeftButtonPress();
```

### LeftButtonRelease

``` javascript
// Desc:   Sends mouse event message to release a pressed left button of the system mouse
// Before: mouse is an initialized linuxmouse
// After:  mouse event has been sent to release a pressed left button on the system mouse
mouse.LeftButtonRelease();
```

### Click

``` javascript
// Desc:   Sends mouse event message to press and release left button of the system mouse
// Before: mouse is an initialized linuxmouse
// After:  mouse event has been sent to press and release left button on the system mouse
mouse.Click();
```

### RightButtonPress

``` javascript
// Desc:   Sends mouse event message to press and hold down the right button of the system mouse
// Before: mouse is an initialized linuxmouse
// After:  mouse event has been sent to press and hold the right button on the system mouse
mouse.RightButtonPress();
```

### RightButtonRelease

``` javascript
// Desc:   Sends mouse event message to release a pressed right button of the system mouse
// Before: mouse is an initialized linuxmouse
// After:  mouse event has been sent to release a pressed right button on the system mouse
mouse.RightButtonRelease();
```

### RightClick

``` javascript
// Desc:   Sends mouse event message to press and release right button of the system mouse
// Before: mouse is an initialized linuxmouse
// After:  mouse event has been sent to press and release right button on the system mouse
mouse.RightClick();
```

### DoubleClick

``` javascript
// Desc:   Sends mouse event message to double click the system mouse
// Before: mouse is an initialized linuxmouse
// After:  mouse event has been sent to double click the system mouse
mouse.DoubleClick();
```

### Scroll

``` javascript
// Desc:   Sends mouse scroll event message
// Before: mouse is an initialized linuxmouse, vertical and horizontal
//         are 'small signed integer values, typically in a range from -10 to +10',
//         in reality they can be any integer from -32768 to 32767,
//         if horizontal isn't provided it defaults to 0
// After:  scroll event has been sent to scroll by a vector defined by the
//         vertical and horizontal integers
mouse.Scroll(vertical);
mouse.Scroll(vertical, horizontal);
```

### quit

``` javascript
// Desc:   Does garbage collection on some objective c stuff, be a good lad and call this when 
//         you're done using the linuxmouse module
// Before: mouse is an initialized linuxmouse
// After:  mouse is an uninitialized linuxmouse
mouse.quit();
```

## License
(MIT License)
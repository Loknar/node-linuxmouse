'use strict'

var sys = require('sys');
var execSync = require('child_process').execSync;
var child;

var ptX;
var ptY;

/**
 * Usage:  mouse.init();
 * Desc:   Initializes the macmouse module
 * Before: mouse is an uninitialized macmouse
 * After:  mouse is an initialized macmouse
 */
var init = function() {
    // dummy function for compatability with macmouse
    // literally does nothing
    return
}

/**
 * Usage:  var pos = mouse.getRealPos();
 * Desc:   Sends request for real mouse position, more expensive than getPos
 * Before: mouse is an initialized macmouse
 * After:  pos holds x and y numbers representing the system mouse position
 */
var getRealPos = function() {
    var info = execSync('xdotool getmouselocation', { encoding: 'utf8' });
    var regexX = /x:([0-9]+)/
    var posX = parseInt(info.match(regexX)[1]);
    var regexY = /y:([0-9]+)/
    var posY = parseInt(info.match(regexY)[1]);
    return { x: posX, y: posY };
}

/**
 * Usage:  var pos = mouse.getPos();
 * Desc:   Returns mouse position currently stored in the mouse module
 * Before: mouse is an initialized macmouse
 * After:  pos holds x and y numbers representing the system mouse position currently stored in the
 *         mouse module
 */
var getPos = function() {
    return { x: ptX, y: ptY };
}

// simple private helper function
var setPos = function(x, y) {
    if (typeof x == 'number' || typeof y == 'number') {
        ptX = x;
        ptY = y;
    }
}

/**
 * Usage:  mouse.Place();
 * Desc:   Sends mouse event message to place the system mouse at a specific position
 * Before: mouse is an initialized macmouse, x and y are numbers representing a specific position
 * After:  mouse event has been sent to move the system mouse to position defined by x and y
 */
var Place = function(x, y) {
    if (typeof x == 'number' || typeof y == 'number') {
        setPos(x, y);
        execSync('xdotool mousemove '+x+' '+y, { encoding: 'utf8' });
    }
}

/**
 * Usage:  mouse.DragPlace(x, y);
 * Desc:   Sends mouse event message to place the system mouse at a specific position while in a 
 *         dragging state
 * Before: mouse is an initialized macmouse, x and y are numbers representing a specific position, the 
 *         system mouse currently has (or thinks it has) the left mouse button pressed
 * After:  mouse event has been sent to move the system mouse to position defined by x and y with left 
 *         mouse button pressed
 */
var DragPlace = function(x, y) {
    setPos(x, y);
    // in X11 there is no difference between moving and dragging like it seems to be on mac
    Place(x, y);
}

/**
 * Usage:  mouse.Move(dx, dy);
 * Desc:   Sends mouse event message to move the system mouse (from current stored position in the mouse 
 *         module) by a vector defined by dx and dy
 * Before: mouse is an initialized macmouse, dx and dy are numbers representing our moving vector 
 * After:  mouse event has been sent to move the system mouse by a vector defined by the numbers dx and dy
 */
var Move = function(dx, dy) {
    ptX += dx;
    ptY += dy;
    Place(ptX, ptY)
}

/**
 * Usage:  mouse.DragMove(dx, dy);
 * Desc:   Sends mouse event message to move the system mouse (from current stored position in the mouse 
 *         module) by a vector defined by dx and dy while in a dragging state
 * Before: mouse is an initialized macmouse, dx and dy are numbers representing our moving vector, the 
 *         system mouse currently has (or thinks it has) the left mouse button pressed
 * After:  mouse event has been sent to move the system mouse by a vector defined by the numbers dx and dy 
 *         with left mouse button pressed
 */
var DragMove = function(dx, dy) {
    // in X11 there is no difference between moving and dragging like it seems to be on mac
    Move(dx, dy);
}

/**
 * Usage:  mouse.LeftButtonPress();
 * Desc:   Sends mouse event message to press and hold down the left button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to press and hold the left button on the system mouse
 */
var LeftButtonPress = function() {
    execSync('xdotool mousedown 1', { encoding: 'utf8' });
}

/**
 * Usage:  mouse.LeftButtonRelease();
 * Desc:   Sends mouse event message to release a pressed left button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to release a pressed left button on the system mouse
 */
var LeftButtonRelease = function() {
    execSync('xdotool mouseup 1', { encoding: 'utf8' });
}

/**
 * Usage:  mouse.Click();
 * Desc:   Sends mouse event message to press and release left button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to press and release left button on the system mouse
 */
var Click = function() {
    LeftButtonPress();
    LeftButtonRelease();
}

/**
 * Usage:  mouse.RightButtonPress();
 * Desc:   Sends mouse event message to press and hold down the right button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to press and hold the right button on the system mouse
 */
var RightButtonPress = function() {
    execSync('xdotool mousedown 3', { encoding: 'utf8' });
}

/**
 * Usage:  mouse.RightButtonRelease();
 * Desc:   Sends mouse event message to release a pressed right button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to release a pressed right button on the system mouse
 */
var RightButtonRelease = function() {
    execSync('xdotool mouseup 3', { encoding: 'utf8' });
}

/**
 * Usage:  mouse.RightClick();
 * Desc:   Sends mouse event message to press and release right button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to press and release right button on the system mouse
 */
var RightClick = function() {
    RightButtonPress();
    RightButtonRelease();
}

/**
 * Usage:  mouse.DoubleClick();
 * Desc:   Sends mouse event message to double click the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to double click the system mouse
 */
var DoubleClick = function() {
    Click();
    Click();
}

/**
 * Usage:  mouse.Scroll(vertical, horizontal);
 * Desc:   Sends mouse scroll event message
 * Before: mouse is an initialized macmouse, vertical and horizontal
 *         are 'small signed integer values, typically in a range from -10 to +10',
 *         in reality they can be any integer from -32768 to 32767,
 *         if horizontal isn't provided it defaults to 0
 * After:  scroll event has been sent to scroll by a vector defined by the
 *         vertical and horizontal integers
 */
var Scroll = function(vertical, horizontal) {
    if (typeof vertical == 'number' || typeof horizontal == 'number') {
        if (0 < vertical) {
            for (i = 0; i < vertical; i++) {
                execSync('xdotool click 5', { encoding: 'utf8' });
            }
        }
        else {
            for (i = 0; i < -vertical; i++) {
                execSync('xdotool click 4', { encoding: 'utf8' });
            }
        }
        if (0 < horizontal) {
            for (i = 0; i < horizontal; i++) {
                execSync('xdotool click 7', { encoding: 'utf8' });
            }
        }
        else {
            for (i = 0; i < -horizontal; i++) {
                execSync('xdotool click 6', { encoding: 'utf8' });
            }
        }
    }
}

/**
 * Usage:  mouse.quit();
 * Desc:   Does garbage collection some on objective c stuff, be a good lad and call this when 
 *         you're done using the macmouse module
 * Before: mouse is an initialized macmouse
 * After:  mouse is an uninitialized macmouse
 */
var quit = function() {
    // dummy function for compatability with macmouse
    // literally does nothing
    return
}

module.exports = {
    init: init,
    getRealPos: getRealPos,
    getPos: getPos,
    Place: Place,
    DragPlace: DragPlace,
    Move: Move,
    DragMove: DragMove,
    LeftButtonPress: LeftButtonPress,
    LeftButtonRelease: LeftButtonRelease,
    Click: Click,
    RightButtonPress: RightButtonPress,
    RightButtonRelease: RightButtonRelease,
    RightClick: RightClick,
    DoubleClick: DoubleClick,
    Scroll: Scroll,
    quit: quit
}
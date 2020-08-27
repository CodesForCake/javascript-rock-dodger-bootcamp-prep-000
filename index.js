/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20;

    //implement me
    if ((rockLeftEdge<dodgerLeftEdge && rockRightEdge>dodgerLeftEdge)||(rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge)||(rockLeftEdge<dodgerRightEdge && rockRightEdge>dodgerRightEdge)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

  //Append rock to game + move it downwards
  var newRock = GAME.appendChild(rock);

  //move rock 2px at time
  function moveRock() {
    // implement me!
    if (top < 400){
      rock.style.top = `${top+=2}px` 
      window.requestAnimationFrame(moveRock)
    } else {
      if (checkCollision(rock)){
        endGame();
      } else {
        GAME.removeChild(rock);
      }
    }
  }

  window.requestAnimationFrame(moveRock)
  // We should kick off the animation of the rock around here.

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  
  for (let i = 0; i<ROCKS.length;i++){
    GAME.remove(ROCKS[i]);
  }
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) {
  // implement me!
  e.preventDefault();
  e.stopPropagation();
  
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  // implement me!
  var left = positionToInteger(DODGER.style.left);
 
  function move() {
    dodger.style.left = `${left - 4}px`;
  }
  
  if (left>0){
    window.requestAnimationFrame(move);
  }
  
}

function moveDodgerRight() {
  // implement me!
  var left = positionToInteger(DODGER.style.left);
  
  function move() {
    dodger.style.left = `${left + 4}px`;
  }
  
  if (left<360){
    window.requestAnimationFrame(move);
  }
  
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}

start()
/*
GAME RULES: "The Pig Game"

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// initializing these starting variables happens when loading the app as well as clicking the new game button. In order to upload DRY principles, we need to create a function for this, which is done in the init() function below. Everything that is used upon loading the app will be placed in the init function at the bottom. init() will be called at the top.
var scores, roundScore, activePlayer, gamePlaying, scoreToWin;

init();

//dice = Math.round(Math.random() * 6); // generates a random number between 1 and 6, he actually uses the formula Math.floor(Math.random() * 6) + 1, which will work, but mine works too, so I am keeping it. We have this declared and used elsewhere.
// *** what I found out later is that my solution creates a 0 when rounding down. This does not work with dice, so his solution is what is needed, which is used later.

//document.querySelector('#current-' + activePlayer).textContent = dice; // textContent places plain text, but not HTML. You can use .textContent for getting information and storing it in a variable as well. Setting activePlayer inside the query selector makes the player that is selected dynamic based on the 0 or 1 value of active player as compares to the #current, either 0 or 1
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>'; // if you wanted to add HTML, such as the emphasis tags here, you would need to specify innerHTML, not just textContent

// you can add an event listener to an element. This causes the element to listen for an event to happen. The first portion of the parenthesis is the type of event, which in this case is 'click'. The second portion is the function containing the action of the event. If you write the funcion directly into the event listener, this is called an anonymous function because it cannot be re-used. If you define the function outside of the event listener, this is a callback function. This is because we are not calling the function, another function, the event is. So, if you define the function elsewhere (ie. callback function), you only need to put in the name of the function without paranthesis, because you do not want to call it, you want the event to call it.
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    // the if statement makes sure gamePlaying is true, which is the default when not compared to anything with == or ===. If gamePlaying is true, then continue on the with the code.
    if (gamePlaying) {
        
        // remove set final score visibility if player does not score and just starts playing by rolling the dice
        setScore();
        
        // 1. Random number 
        var dice = Math.floor(Math.random() * 6) + 1; // this is not needed when the app loads, but only after someone clicks. We are defining the dice variable here because we do not need it outside of this event listener's function's scope.
        
        // 2. Display the result
        var diceDOM = document.querySelector('.dice'); // we declared a variable for this because we were beginning to use it multiple times, as seen below
        diceDOM.style.display = 'block'; // brings the dice back into view.
        diceDOM.src = 'dice-' + dice + '.png'; // changes the dice picture in accordance with the number. You only need to specify the attribute .src that needs to be changed because it is not a css style.
        
        // setup the second dice
        var diceTwo = Math.floor(Math.random() * 6) + 1;
        
        var diceTwoDOM = document.querySelector('.diceTwo'); // we declared a variable for this because we were beginning to use it multiple times, as seen below
        diceTwoDOM.style.display = 'block'; // brings the dice back into view.
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';
        
        // 3. Update the round score IF the rolled number is NOT a 1
        if (dice !== 1 && diceTwo !== 1) {
        // add score as dice is rolled
        roundScore += dice + diceTwo;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (dice === 1 || diceTwo === 1) {
        
        /* THIS WAS ALL REDUCED TO THE FUNCTION nextPlayer()
        // set player's score to 0 upon rolling a 1
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        // change active player if a 1 is rolled, this can be done with a nested if/else statement, or with a ternary operator, which is how we will do it.
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // this is ternary operator
        
        // these above can remove the class from an element, but we will not use that here
        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.remove('active');
        
        // toggle will remove the class 'active' if the element has it, but will add the class if it does not.
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        // hide the dice again when a 1 is rolled
        diceDOM.style.display = 'none';
        */
        
        nextPlayer();
        } // end dice if
        
    } // end gamePlaying if

}); // end listener


// setting up an event listener using an anonymous function for the hold button to store the accumulative points
document.querySelector('.btn-hold').addEventListener('click', function() {
    
    // if gamePlaying is true then continue having the ability to press the hold button
    if (gamePlaying) {
        
        // 1. add current score to global score
        scores[activePlayer] += roundScore; // this will take the score of the active player and add it to the global score in the form of an array based on which number the active player is
        
        // 2. update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
        /* THIS WAS ALL REDUCED TO THE FUNCTION nextPlayer()
        // change active player from 0 to 1 or vice versa
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // this is ternary operator
    
        // toggle will remove the class 'active' if the element has it, but will add the class if it does not.
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        // hide the dice again when a 1 is rolled
        diceDOM.style.display = 'none';
    
        // set round score back to 0
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        */
    
        // 3. check if the player won the game
        // if active player has scored 100 or more, they win, stop the game
        if (scores[activePlayer] >= scoreToWin) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // activate the winner class for styling the winner 
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // remove the styling that comes with the active class ie. the red dot.
        
            // set gamePlaying to false to reset it
            gamePlaying = false; // this will not allow the roll dice button to be used
        } else {
            nextPlayer(); // this has to be placed after the if statement otherwise the active user will not be correct from the function call. If you do not place the function in the else portion, it will be called and will cause the focus to go to the other player (ie. grey background, red dot).
        } // end winning if
        
    } // end gamePlaying if
    
}); // end event listener


// since we have to perform a similar action in both of these events, to avoid repeating ourtselves (DRY) we are going to create a function global to these listeners that can be called inside of the listeners

function nextPlayer() {
    
    // hide the dice again when a 1 is rolled
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';
    
    // set round score back to 0
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore; // this has to be kept above where active player is changed because it uses the current active player going into the event to set round score back to 0. If active player is changed prior, it will set the opposite player to 0, which is not what we want.
    
    // change active player from 0 to 1 or vice versa
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // this is ternary operator
    
    // toggle will remove the class 'active' if the element has it, but will add the class if it does not.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
} // end function


// create an event listener for the new game button
document.querySelector('.btn-new').addEventListener('click', init);


// reset game back to default, which will trigger upon loading the app and pressing the new game button
function init() {
    
    scoreToWin = 100; // initialize the score to win back to 100
    scores = [0, 0]; // set both player scores to 0 at the beginning
    roundScore = 0; // this is the player's score per round as they roll
    activePlayer = 0; // keeps track of the current player
    gamePlaying = true;
    
    //document.querySelector('.dice').style = 'display: none'; // this changes the css of the dice and hides it when the page first loads
    document.querySelector('.dice').style.display = 'none'; // you can also hide the dice and change the css like this
    document.querySelector('.diceTwo').style.display = 'none';

    // query selectors require specifying a dot for class and # for ID, but when you are specifying byID already, there is no need for the #. This section will set all of the values to 0 upon loading the app.
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    // set player's name back from Winner!
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    // remove winner class styling
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    // add active player styling back to player 1, you have to do it like this because in the case where player 2 is active prior to a winner and you select new game, it will display 2 active players
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    // make option to set final score displayed again
    document.querySelector('.finalScore').style.display = 'block';
    document.querySelector('.finalScore').value = 0;
    document.querySelector('.btn-set').style.display = 'block';
    
} // end function


// set final score to whatever player inputs
document.querySelector('.btn-set').addEventListener('click', setScore); // end listener


// function to set final score and remove visibility. created a function declaraton outside of the listener because I was repeating myself in code
function setScore() {
    
    // set the final score to what the user inputs
    scoreToWin = Number(document.querySelector('.finalScore').value);
    
    // remove the option to change final score once it has been set
    if (scoreToWin > 0) {
        document.querySelector('.finalScore').style.display = 'none';
        document.querySelector('.btn-set').style.display = 'none';
    } else {
        scoreToWin = 100;
        document.querySelector('.finalScore').style.display = 'none';
        document.querySelector('.btn-set').style.display = 'none';
    } // end if
} // end function

// ********* END CODE **********






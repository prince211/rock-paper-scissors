(function(){
	
	/*
	 * Rock, paper, scissors  
	 * 
	 * The classic game recreated in Javascript for playing in the browser.
	 * 
	 */
	
	// create the choices
	var choices = [
		'rock',
		'paper',
		'scissors'
	];
	
	var CHOICES_LENGTH = choices.length;
	
	// create the text for winning or drawing
	var USER_WINS = "You win!";
	var COMP_WINS = "Computer wins";
	var DRAW = "Draw"
	
	var MEH = '<i class="fa fa-meh-o" aria-hidden="true"></i>';
	var SMILE = '<i class="fa fa-smile-o" aria-hidden="true"></i>';
	var FROWN = '<i class="fa fa-frown-o" aria-hidden="true"></i>';
		
	var score = 0;
	var computer_score = 0;
	
	var gameType;
	
	// score elements
	var userScore = getById('score');
	var compScore = getById('computerScore');
	
	userScore.textContent = score;
	compScore.textContent = computer_score;
	
	// get the game area and get access to all the buttons
	var game = getById('game');
	var userChoices = game.getElementsByTagName('button');
		
	var comp = getById('computer');
	var compChoices = comp.getElementsByTagName('div');
		
	// get the results element and hide it initially
	var results = getById('results');
	hide(results);
	
	// the gameover screen and final results
	var gameOver = getById('gameOver');
	hide(gameOver);
	var gameResults = getById('gameResults');
	var finalResult = getById('finalResult');
	
		// get the intro element and the buttons for choosing a game type
	var intro = getById('intro');
	var bestOf3 = getById('bestOf3');
	var bestOf5 = getById('bestOf5');
	
	// start the best of 3 game
	bestOf3.onclick = function() {
		enableGame();
		gameType = 3;
	}
	
	bestOf5.onclick = function() {
		enableGame();
		gameType = 5;
	}
	
	function enableGame() {
		enable(userChoices);
		hide(intro);
		hide(gameOver);
		score = 0;
		computer_score = 0;
		userScore.textContent = score;
		compScore.textContent = computer_score;
	}
	
	// add an onclick event to each button and disable them initially
	for(var i = 0; i < userChoices.length; i++) {
		userChoices[i].onclick = selection;
		userChoices[i].disabled = true;
	}
		
	function computerSelection() {
		var randomIndex = Math.floor(Math.random() * CHOICES_LENGTH);
		var compChoice = choices[randomIndex];
		return compChoice;
	}
	
	function selection() {
		// get the user and computer choice 
		var chosen = this.id;
		var comp = computerSelection();
				
		// get the users chosen item
		var chosenItem = getById(chosen);
		
		// prepare the chosenCompItem so we can assign it to a dynamic id
		var chosenCompItem;
		
		if(comp === 'rock') {
			chosenCompItem = getById('computerRock');
		} 
		else if(comp === 'paper') {
			chosenCompItem = getById('computerPaper');
		}
		else if(comp === 'scissors') {
			chosenCompItem = getById('computerScissors');
		}

		// show results and disable all choices so no more can 
		// be made while waiting for the pop up to fade out	
		show(results);
		reappear(results);
		disable(userChoices);
		disable(compChoices);
		
		
		// make the selected item stand out from the rest
		chosenItem.classList.add('selected');
		chosenCompItem.classList.add('selected');
		
		// decide who wins	
		
		
		if(chosen === comp) {
			results.textContent = DRAW;
			results.innerHTML += MEH;
			timeout();
		} 
		else if(chosen === 'rock' && comp === 'scissors') {
			
			results.textContent = USER_WINS;
			results.innerHTML += SMILE;
			
			score += 1;
			userScore.textContent = score;
			timeout();
			
		}
		else if(chosen === 'paper' && comp === 'rock') {
			
			results.textContent = USER_WINS;
			results.innerHTML += SMILE;
			
			score += 1;
			userScore.textContent = score;
			timeout();
			
		}
		else if(chosen === 'scissors' && comp === 'paper') {
			results.textContent = USER_WINS;
			results.innerHTML += SMILE;
			
			score += 1;
			userScore.textContent = score;
			timeout();
		}
		else {
			results.textContent = COMP_WINS;
			results.innerHTML += FROWN;
			
			computer_score +=1;
			compScore.textContent = computer_score;
			timeout();
		}
		
	}
		

	// utilities
	function getById(id) {
		return document.getElementById(id);
	}	
	
	function hide(element) {
		element.style.display = 'none';
	}
	
	function show(element) {
		element.style.display = 'block';
	}
	
	function disappear(element) {
		element.className = 'disappear';
	}
	
	function reappear(element) {
		element.className = 'reappear';
	}
	
	function disable(elements) {
		for(var i = 0; i < elements.length; i++) {
			elements[i].disabled = true;
			elements[i].classList.add('unselected');
		}
	}
	
	function enable(elements) {
		for(var i = 0; i < elements.length; i++) {
			elements[i].disabled = false;
			elements[i].classList.add('default');
			elements[i].classList.remove('selected', 'unselected');
		}
	}
	
	function timeout() {
		setTimeout(function(){
		    disappear(results);
				enable(userChoices);
				enable(compChoices);
				if(score + computer_score == gameType) {
					show(gameOver);
					if(score > computer_score) {
						finalResult.textContent = "You won " + score + " - " + computer_score + "!";
					}
					else {
						finalResult.textContent = "You lost " + computer_score + " - " + score;
					}
					gameResults.appendChild(bestOf3);
					gameResults.appendChild(bestOf5);
				}

				
		}, 2000)
	}
})();
var nextQuestion = 1;

function scrollToTop(){
	window.scrollTo(0, 0);
}

function scrollToBottom(){
	window.scrollTo(0, document.body.scrollHeight);
}

function loadQuestions(){
	createScore();
	createScrollButton();
	randomQuestions();
	createSubmitButton();
	
	loadNextQuestion(0);
}

function createScore(){
	var div = document.createElement("div");
	div.setAttribute("class", "score");
	div.setAttribute("id", "score");
	div.style = "display: none;";
	
	var divLabel = document.createElement("div");
	divLabel.style = "display: inline-block";
	divLabel.innerHTML = "Total Score:&nbsp;";
	
	var divScore = document.createElement("div");
	divScore.id = "totalScore";
	divScore.style = "display: inline-block";
	divScore.innerHTML = "0";
	
	div.appendChild(divLabel);
	div.appendChild(divScore);
	
	document.body.appendChild(div);
}

function createScrollButton(){
	var div = document.createElement("div");
	div.setAttribute("class", "scrollTop");
	div.setAttribute("id", "scrollTop");
	div.innerHTML = '<button onclick="scrollToTop()">Scroll to top</button>';
	
	document.body.appendChild(div);
}

function randomQuestions(){
	var signs = [false, false, false, false, false,
				 false, false, false, false, false,
				 false, false, false, false, false];
				 
	var signTitles = ["Yield", "30 km/h", "50 km/h", "60 km/h", "80 km/h",
					  "120 km/h", "Clearway", "Crossroads", "Dangerous Bend", "Dangerous Corner",
					  "Merging/Diverging Traffic", "Merging Traffic", "Mini-roundabout ahead", "No Parking", "No Entry"];

	for(var i = 1; i <= 10; i++){
		var div = document.createElement("div");
		div.id = "q" + i;
		div.style = "display: none";
		div.setAttribute("class", "question");
	
		var title = document.createElement("h3");
		title.innerHTML = "Question " + i;
		div.appendChild(title);
		
		var question = document.createElement("h4");
		var number = Math.floor((Math.random() * 15));
		
		while(signs[number] == true){
			number = Math.floor((Math.random() * 15));
		}
		signs[number] = true;
		
		question.innerHTML = "Which sign is: " + signTitles[number] + "?"
		div.appendChild(question);
		
		var correctNumber = Math.floor((Math.random() * 4));
		var images = [false, false, false, false];
		var usedImages = [-1, -1, -1, -1];
		images[correctNumber] = true;
		usedImages[correctNumber] = number;
		
		var imageHolderDiv = document.createElement("div");
		imageHolderDiv.id = "ImageDivq" + i;
		var scoreCard = document.createElement("div");
		scoreCard.style = "display: none;";
		scoreCard.id = "scoreq" + i;
		imageHolderDiv.appendChild(scoreCard);
		
		for(var j = 0; j < 4; j++){			
			var imageDiv = document.createElement("div");
			imageDiv.style = "display: inline-block";
			var img = document.createElement("img");
			
			if(j == correctNumber){
				imageDiv.setAttribute("class", "correct");
				img.src="./signs/" + number + ".gif";				
			} else{
				var wrongNumber = Math.floor((Math.random() * 4));
				while(images[wrongNumber] == true){
					wrongNumber = Math.floor((Math.random() * 4));
				}
				images[wrongNumber] = true;
				
				imageDiv.setAttribute("class", "wrong");
				
				var wrongImage = Math.floor((Math.random() * 15));
				var valid = false;
				
				while(!valid){
					if(wrongImage == number){
						wrongImage = Math.floor((Math.random() * 15));
					}
					else if(usedImages.indexOf(wrongImage) > -1){
						wrongImage = Math.floor((Math.random() * 15));
					} else{
						usedImages[j] = wrongImage;
						valid = true;
					}
				}
				img.src="./signs/" + wrongImage + ".gif";
			}
			
			imageDiv.appendChild(img);
			imageHolderDiv.appendChild(imageDiv);
		}
		
		imageHolderDiv.appendChild(document.createElement("br"));
		imageHolderDiv.appendChild(document.createElement("br"));
		div.appendChild(imageHolderDiv);
		
		var radioForm = document.createElement("form");
		radioForm.id = "RadioDivq" + i;
		for(var j = 0; j < 4; j++){
			var radioInput = document.createElement("input");
			radioInput.setAttribute("type", "radio");
			radioInput.setAttribute('name', j);
			radioForm.appendChild(radioInput);
			radioInput.onclick = function() {
				var index = this.name;
				var buttons = this.parentNode.childNodes;
				
				for(var x = 0; x < buttons.length; x++){
					if(x != index){
						buttons[x].checked = false;
					}
				}
				disableRadioGroup(this.parentNode.id.charAt(this.parentNode.id.length-1));
				loadNextQuestion(this.parentNode.id.charAt(this.parentNode.id.length-1));
			};
		}
		div.appendChild(radioForm);
		
		document.body.appendChild(div);
	}
}

function disableRadioGroup(thisQuestion){
	setTimeout(function(){
		var buttons = document.getElementById("RadioDivq" + thisQuestion).childNodes;
		for(var j = 0; j < buttons.length; j++){
			buttons[j].disabled = true;
		}
	}, 30000);
}

function createSubmitButton(){
	var div = document.createElement("div");
	div.setAttribute("class", "submit");
	div.setAttribute("id", "submit");
	div.style = "display: none;";
	div.innerHTML = '<button onclick="submit()">Submit answers</button>';

	document.body.appendChild(div);
}

function submit(){
	var totalScore = 0;
	for(var i = 1; i <= 10; i++){
		var playerIndex;
		var correctIndex;
		
		var buttons = document.getElementById("RadioDivq" + i).childNodes;
		for(var j = 0; j < buttons.length; j++){
			buttons[j].style = "display: none;";
			if(buttons[j].checked){
				playerIndex = (j+1);
			}
		}
		
		var images = document.getElementById("ImageDivq" + i).childNodes;
		
		for(var j = 1; j <=4 ; j++){
			if(images[j].getAttribute("class") == "correct"){
				correctIndex = j;
				images[j].style.border = "10px";
				images[j].style.borderWidth = "2px";
				images[j].style.borderStyle = "solid";
				images[j].style.padding = "10px";
				images[j].style.borderColor="green";
			}
		}		
		
		if(correctIndex == playerIndex){
			totalScore++;
			images[0].innerHTML = "Score: 1";
			images[0].style.border="thick solid #0000FF";
		} else{
			images[0].innerHTML = "Score: 0";
			images[playerIndex].style.border = "10px";
			images[playerIndex].style.borderWidth = "2px";
			images[playerIndex].style.borderStyle = "solid";
			images[playerIndex].style.padding = "10px";
			images[playerIndex].style.borderColor="red";
		}
		images[0].setAttribute("style", "display: block");
	}
	document.getElementById("totalScore").innerHTML = totalScore;
	document.getElementById("score").setAttribute("style", "display: block");
	scrollToTop()
}

function loadNextQuestion(questionID){
	var index = +questionID + 1;
	if(nextQuestion < 11){
		document.getElementById("q" + index).setAttribute("style", "display: block");
	} else if(nextQuestion == 11){
		document.body.appendChild(document.createElement("br"));
		document.body.appendChild(document.createElement("br"));
		document.getElementById("submit").setAttribute("style", "display: block");
	}
	nextQuestion++;
	scrollToBottom();
}


















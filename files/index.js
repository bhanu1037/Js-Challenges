//challenge 1:Date

//either use addEventListener or onclick attribute

document.querySelector(".btn-primary").addEventListener("click",function(){
    var age=prompt("What's Your Age?");
    ageInDays(age);
});
function ageInDays(years){
    var answer=(2020-years)*365;
    document.querySelector("h2").innerHTML=answer+" days";
}

//challenge 2:cat generation

function generateCat(){
    var image=document.createElement("img");
    image.src="files/images/dice1.png";
    document.querySelector("#flex-cat-gen").appendChild(image);
}

//challenge 3:rock paper scissors
function rpsGame(yourChoice){
    var humanChoice,botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(randomInt());
    result=decideWinner(humanChoice,botChoice);


}
function numberToChoice(number){
    return ["rock","paper","scissors"][number];
}
function randomInt(){
    return Math.floor(Math.random()*3);
}
/*-------------Challenge 4----------------*/

//selecting all buttons
var allButtons=document.querySelectorAll(".btn");

//copying it to diff array for further use
var copyButtons=[];
for(var i=0;i<allButtons.length;i++){
    copyButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(pressed){
    
    if(pressed.value==='red'){
        colorRed();
    }
    else if(pressed.value==='green'){
        colorGreen();
    }
    else if(pressed.value==='reset'){
        resetColor();
    }
    else{
        randomColoring();
    }

}
function colorRed(){
    for(var i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-danger");
    }
}
function colorGreen(){
    for(var i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-success");
    }
}
function resetColor(){
    for(var i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyButtons[i]);
    }
}
function randomColoring(){
    for(var i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyButtons[Math.floor(Math.random()*4)]);
    }
}
/*------------------------------------------------------------------*/
/*--------------------Challenge-5 blackjack------------------------*/
/*-----------------------------------------------------------------*/

let blackjackGame={
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'you':{'scoreSpan':'#your-score','div':'#Your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-score','div':'#Dealer-box','score':0},
    'wins':0,
    'losses':0,
    'draw':0,
    'isStand':false,
    'turnOver':false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

const hitSound= new Audio("sounds/swish.m4a");
const winSound= new Audio("sounds/cash.mp3");
const lostSound= new Audio("sounds/aww.mp3");


document.querySelector("#hit-button").addEventListener('click',blackjackHit);
document.querySelector("#deal-button").addEventListener('click',blackjackDeal);
document.querySelector("#stand-button").addEventListener('click',dealerLogic);


function blackjackHit(){
    if(blackjackGame['isStand']===false){
        let card=randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);

    }
    
}

function randomCard(){
    let random= Math.floor(Math.random()*13);
    return blackjackGame['cards'][random];
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    var cardImage=document.createElement('img');
    cardImage.src="images/"+card+".png";
    cardImage.style.width='20%';
    cardImage.style.padding='10px';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }

}

function updateScore(card,activePlayer){
    if(card==='A'){
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score']+=blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent="BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color="red";
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
    
}

function blackjackDeal(){
    
    if(blackjackGame['turnOver']===true){
        blackjackGame['isStand']=false;
        let yourImages=document.querySelectorAll("#Your-box img");
        let dealerImage=document.querySelectorAll("#Dealer-box img");

        for(let i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(let i=0;i<dealerImage.length;i++){
            dealerImage[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector("#your-score").textContent="0";
        document.querySelector("#dealer-score").textContent="0";

        document.querySelector("#your-score").style.color="white";
        document.querySelector("#dealer-score").style.color="white";

        document.querySelector("#blackjack-result").textContent="Let's Play";
        document.querySelector("#blackjack-result").style.color="black";

        blackjackGame['turnOver']=false;

    }    
}

function dealerLogic(){
    blackjackGame['isStand']=true;
    let card=randomCard();
    //console.log(card);
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);

    if(DEALER['score']>15){
        blackjackGame['turnOver']=true;
        let winner=computeWinner();
        showResult(winner);

    }
}

function computeWinner(){
    let winner;

    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score']||DEALER['score']>21){
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score']){
            blackjackGame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score']){
            blackjackGame['draw']++;
        }
    }
    else if(YOU['score']>21){
        if(DEALER['score']<=21){
            blackjackGame['losses']++;
            winner=DEALER;
        }
        else if(DEALER['score']>21){
            blackjackGame['draw']++;
        }
    }
    return winner;

}

function showResult(winner){
    let msg,msgColor;

    if(winner===YOU){
        document.querySelector("#wins").textContent=blackjackGame['wins'];
        msg="You won!";
        msgColor="green";
        winSound.play();
    }
    else if(winner===DEALER){
        document.querySelector('#losses').textContent=blackjackGame['losses'];
        msg="You lost!";
        msgColor="red";
        lostSound.play();
    }
    else{
        document.querySelector('#draw').textContent=blackjackGame['draw'];
        msg="You drew";
        msgColor="black";

    }
    document.querySelector("#blackjack-result").textContent=msg;
    document.querySelector("#blackjack-result").style.color=msgColor;
}
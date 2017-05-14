/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var scores, roundScore, activePlayer, gamePlaying;

init();

// creo var del punteggio precedente del dado
var lastDice1, lastDice2;

// seleziono il bottone per tirare dado
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    // 1. Numero Random
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. Mostro il contenuto e la giusta immagine del dado
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    // cambio contenuto dell'attributo src del dado
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Aggiornare il ROUND SCORE se il numero che esce nn è 1
    // se il dado è diverso da 1
    // se esce per due volte di fila il sei
    if((dice1 === 6 || dice2 == 0) && (lastDice1 === 6 || lastDice2 === 6)) {
      // Il giocatore perde lo score
      scores[activePlayer] = 0;
      // anche visivamente azzero lo score
      document.querySelector("#score-" + activePlayer).textContent = "0";
      // passo turno al prossimo giocatore
      nextPlayer();
    } else if(dice1 !== 1 && dice2 !== 1) {
      // aggiungo il valore del dado al punteggio del turno
      roundScore += dice1 + dice2;
      // assegno al ele current del giocatore attivo il roundScore
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      // passo all'altro giocatore
      nextPlayer();
    }
    // aggiorno il valore di lastDice con quello di dice
    lastDice1 = dice1;
    lastDice2 = dice2;
  }
});

// Creo il listener al click del bottone hold per mantenere il punteggio
document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    // Aggiungere il CURRENT score a quello GLOBAL
    scores[activePlayer] += roundScore; 

    // Aggiornare la UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    
    // recupero il valore del punteggio massimo
    var input = document.querySelector(".final-score").value;
    // creo il punteggio di vincita
    var winningScore;
    // se undefined, 0, null o "" viene COERCIZZATO a false
    // altrimenti a true
    if(input) {
      // nel caso creo una var winningScore
      winningScore = input;
    } else {
      winningScore = 100;
    }
    
    
    // Controllare se l'utente HA VINTO
    if(scores[activePlayer] >= winningScore){
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      // setto la var di stato gamePlaying a false
      gamePlaying = false;
    } else {
      // Prossimo giocatore
      nextPlayer();    
    }    
  }
});

// definisco la funzione nextPlayer
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  // risetto a zero i current score
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // uso il metodo toggle per attivare o disattivare la classe active ai due giocatori
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // nascondo il dado
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

// creo il listener sul bottone btn-new
document.querySelector(".btn-new").addEventListener("click", init);


// creo una funzione init con cui inizializzo le mie var
function init() {
  // punteggi
  scores = [0,0];
  // punteggio del turno
  roundScore = 0;
  // utente attivo
  activePlayer = 0;
  // var di stato gamePlaying
  gamePlaying = true;
  // nascondiamo il dado
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  // setto tutti i valori degli score a 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // Resetto nomi giocatori
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  // rimuovo classe winner
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
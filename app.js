/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

init();

// seleziono il bottone per tirare dado
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    // 1. Numero Random
    var dice = Math.floor(Math.random() * 6) + 1;
    // 2. Mostro il contenuto e la giusta immagine del dado
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    // cambio contenuto dell'attributo src del dado
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Aggiornare il ROUND SCORE se il numero che esce nn è 1
    // se il dado è diverso da 1
    if(dice !== 1) {
      // aggiungo il valore del dado al punteggio del turno
      roundScore += dice;
      // assegno al ele current del giocatore attivo il roundScore
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      // passo all'altro giocatore
      nextPlayer();
    }    
  }
});

// Creo il listener al click del bottone hold per mantenere il punteggio
document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    // Aggiungere il CURRENT score a quello GLOBAL
    scores[activePlayer] += roundScore; 

    // Aggiornare la UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    // Controllare se l'utente HA VINTO
    if(scores[activePlayer] >= 100){
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector('.dice').style.display = 'none';
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
  document.querySelector(".dice").style.display = "none";
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
  document.querySelector('.dice').style.display = 'none';
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
/*
兩顆骰子
遊戲規則：
- 下方input欄位可輸入最終獲勝的分數
- 兩個玩家甩骰子，每一回合玩家可甩無數次，但如果連續兩次甩到6則全部分數歸零
- 如果點Hold，表示保留此回合的分數並換下個玩家
- 當玩家的分數累積到獲勝的分數即可獲勝
// state variable
*/



var scores, roundScore, activeplayer, gamePlaying, setScore;

// var newScore;

init();

//querySelector to change css

var lastDice;

//function btn() {   }
//document.querySelector('.btn-roll').addEventListener('click', btn)  //因為用listen摳

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. Random number
    var dice = (Math.floor(Math.random() *6 +1));
    //2. Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'

    //2. second dice
    //2. Display the result
    var dice2 = (Math.floor(Math.random() *6 +1));
    var diceDOM2 = document.querySelector('.dice2')
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png'

    // 3. Update the round score IF the rolled number was not a 1
    //if (dice ===6 && lastDice === 6) {
      if (dice === 1 || dice2 == 1) {
     // var scores[activePlayer] = 0
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer] = 0;
        nextPlayer();
    } //else if (dice !== 1){   // 當dice的值!= 1 時玩家繼續 (=1 換人)
      else if (dice !==1 && dice2 !== 1) {
        roundScore += dice + dice2;
        
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      //把roundscore加入current player中的html值中

    } else {
        //Next Player 切換玩家
      //  activePlayer === 0 ? activePlayer =1 : activePlayer = 0;  //ternary operator
        nextPlayer();
    }
      lastDice = dice;
  }
});

/*  challenge1 original
      roundScore += dice;
      if (dice !==6) {
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      //把roundscore加入current player中的html值中
    } else {
      newScore += dice
        if (newScore ==12) {
          document.querySelector('.player-' +activePlayer + '-panel') = 0;
          nextPlayer();
        } else {
          document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }

    }
*/


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {

        // Add Current Score to Global score
        scores[activePlayer] += roundScore;
        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore
        // Underfined, 0, null or "" are coerced to false
        // Anything else is coerced to true
        if(input) {
          var winningScore = input;
        } else {
          winningScore = 25;  //input為文字的時候讀取不到！
        }

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
          document.querySelector('#name-'+activePlayer).textContent = 'Winner:';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.dice2').style.display = 'none';
          document.querySelector('.player-' +activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
        } else {
          nextPlayer();
        }

    }
});

/*
function setscore() {
  var usrInput = document.getElementById("usrInput").value;
  document.write(usrInput);

}
*/


function nextPlayer(){
  if (activePlayer === 0 ) {
    activePlayer =1;
  } else {
    activePlayer=0;
  }
    roundScore =0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //切換active介面
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display ='none';
  document.querySelector('.dice2').style.display ='none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner'); //因為要改CSS的class所以要用.
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent= dice;  //textContent 轉換成text
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'  //italic text 用em要用innerHTML

//var x = document.querySelector('#score-0').textContent;



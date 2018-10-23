/*
單顆骰子
遊戲規則：
兩個玩家甩骰子，每一回合玩家可甩無數次，但如果甩到1則當回合的分數歸零
如果點Hold，表示保留此回合的分數並換下個玩家
當玩家的分數累積到20分，則獲勝
// state variable
*/

var scores, roundScore, activeplayer, gamePlaying;

init();

//querySelector to change css



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

    // 3. Update the round score IF the rolled number was not a 1
    if (dice !== 1 ){   // 當dice的值!= 1 時玩家繼續 (=1 換人)

      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      //把roundscore加入current player中的html值中
    } else {
        //Next Player 切換玩家
      //  activePlayer === 0 ? activePlayer =1 : activePlayer = 0;  //ternary operator
        nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {

        // Add Current Score to Global score
        scores[activePlayer] += roundScore;
        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check if player won the game

        if (scores[activePlayer] >=20) {
          document.querySelector('#name-'+activePlayer).textContent = 'Winner:';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.player-' +activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
        } else {
          nextPlayer();
        }

    }
});

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
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display ='none';

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

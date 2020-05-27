//function PressToStart() {
//    var T = document.getElementById("grid");
//    T.style.display = "block";  // <-- Set it to block
//}
var currentValue = 1;
var remainingColl = [];
var initialColl = [];
/* Reshuffule */
let timeout;

function funInitial() {
  document.querySelector('#start').style.display = "none";
  document.querySelector('#nextDiv').style.display = "none";
  document.querySelector('#clock').style.display = "none";
  document.getElementById("next").innerHTML = currentValue;

  for (let i = 0; i < 25; i++) {
    funGenerateRandomNumber(i);
  }

  funReshuffle();
}

function funShuffleArray() {

  for (var i = initialColl.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = initialColl[i];
    initialColl[i] = initialColl[j];
    initialColl[j] = temp;
  }

  for (let i = 0; i < 25; i++)
    document.getElementById("box" + (i + 1)).innerHTML = initialColl[i];

  funReshuffle();
}

function funReshuffle() {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    funShuffleArray();
  }, 5000);
}

function funGenerateRandomNumber(i) {
  let min = 1;
  let max = 25;

  while (1 == 1) {
    var rand = Math.floor(Math.random() * (max - min + 1)) + min;

    if (initialColl.indexOf(rand) === -1) {
      initialColl.push(rand);
      document.getElementById("box" + (i + 1)).innerHTML = rand;

      break;
    }
  }
}

function funChangeValue(id) {
  let val = document.getElementById(id).innerHTML;

  if (currentValue == val) {
    if (currentValue == 1) {
      startStop();
      document.querySelector('#start').style.display = "block";
      document.querySelector('#nextDiv').style.display = "block";
      document.querySelector('#clock').style.display = "block";
      document.querySelector('#clickTostart').style.display = "none";
    }

    if (currentValue <= 25) {
      let min = 26;
      let max = 50;

      while (1 == 1) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;

        if (remainingColl.indexOf(rand) === -1) {
          funReplaceValue(val, rand);
          remainingColl.push(rand);
          document.getElementById(id).innerHTML = rand;
          document.getElementById("next").innerHTML = ++currentValue;
          break;
        }
      }
    } else if (currentValue != 50) {
      document.getElementById(id).innerHTML = '';
      funReplaceValue(val, '');
      document.getElementById("next").innerHTML = ++currentValue;
    } else {
      document.getElementById(id).innerHTML = '';
      clearInterval(x);
      document.querySelector('#grid').style.display = "none";
    }
  }
}

function funReplaceValue(oldValue, newValue) {
  let index = initialColl.indexOf(parseInt(oldValue));
  if (index != -1)
    initialColl[index] = newValue;
}


/* Timer	*/
var x;
var startstop = 0;

function startStop() {
  /* Toggle StartStop */

  startstop = startstop + 1;

  if (startstop === 1) {
    start();
    document.getElementById("start").innerHTML = "Restart";
  } else if (startstop === 2) {
    document.getElementById("start").innerHTML = "Start";
    startstop = 0;
    stop();
  }

}


function start() {
  x = setInterval(timer, 10);
} /* Start */

function stop() {
  clearInterval(x);
  reset();

  currentValue = 1;
  initialColl = [];
  remainingColl = [];

  funInitial();

  document.querySelector('#grid').style.display = "block";
  document.querySelector('#clickTostart').style.display = "block";

} /* Stop */

var milisec = 0;
var sec = 0; /* holds incrementing value */
var min = 0;


/* Contains and outputs returned value of  function checkTime */

var miliSecOut = 0;
var secOut = 0;
var minOut = 0;


/* Output variable End */


function timer() {
  /* Main Timer */


  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  if (min == 60) {
    min = 0;
    hour = ++hour;

  }


  document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut;
  document.getElementById("min").innerHTML = minOut;
}


/* Adds 0 when value is <10 */


function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function reset() {
  /*Reset*/

  milisec = 0;
  sec = 0;
  min = 0

  document.getElementById("milisec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
}

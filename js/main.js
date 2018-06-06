fetch('./js/data.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(startStory);
    }
  )
  .catch(function(err) {
    console.log('Fetch Error', err);
  });

var map = document.querySelector('.Container__Map');
var textArea = document.querySelector('.Container__Map__Instructions__Txt');
var mapArea = document.querySelector('.Container__Map__sceneImg');
var firstChoice = document.querySelector('#firstChoice');
var secondChoice = document.querySelector('#secondChoice');
var screen = document.querySelector('#game-start');
var end = document.querySelector('#game-end');
var media = document.querySelector('.media');
var audio = document.createElement('audio');
var index = 0;

function typing(text) {
  if (text.length) {
    textArea.innerHTML += text[0];
    setTimeout(function() {
      text = text.substring(1);
      typing(text);
    }, 10);
  }
}

function displayItems(param1, param2, param3, param4) {
  textArea.innerHTML = "";
  typing(param1);
  firstChoice.innerHTML = param2;
  secondChoice.innerHTML = param3;
  mapArea.src = param4;
}

function setAudio(param) {
  media.appendChild(audio);
  audio.src = param;
  audio.setAttribute("autoplay", "");
  audio.setAttribute("loop", "");
  audio.setAttribute("controls", "");
}

function startStory(data) {
  var start = document.querySelector('#start');
  start.addEventListener('click', function() {
    screen.classList.remove('is-open');
    setAudio(data.steps[index].audio);
    displayItems(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description, data.steps[index].img_src);
    firstChoice.addEventListener('click', function() {
      media.innerHTML = "";
      index = data.steps[index].option1.next;
      setAudio(data.steps[index].audio);
      if (index <= 9) {
        displayItems(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description, data.steps[index].img_src);
      } else {
        displayEnd(data.steps[index].description);
        restartGame();
      }
    });
    secondChoice.addEventListener('click', function() {
      media.innerHTML = "";
      index = data.steps[index].option2.next;
      setAudio(data.steps[index].audio);
      if (index <= 9) {
        displayItems(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description, data.steps[index].img_src);
      } else {
        displayEnd(data.steps[index].description);
        restartGame();
      }
    });
  });
}

function displayEnd(msg) {
  var endStory = document.querySelector('#end-msg-story');
  var winLose = document.querySelector('#winLose');
  map.style.display = 'none';
  end.style.display = 'block';
  typing(msg);
  endStory.innerHTML = msg;
  console.log(index);
  if (index == 11) {
    winLose.innerHTML = "Vous avez gagné !"
  } else {
    winLose.innerHTML = "Vous avez perdu !"
  }
}

function restartGame() {
  var retry = document.querySelector('#retry');
  retry.addEventListener('click', function() {
    map.style.display = 'block';
    screen.classList.add('is-open');
    end.style.display = 'none';
    index = 0;
    startStory();
  })
}

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

var textArea = document.querySelector('.Container__Map__Instructions__Txt');
var mapArea = document.querySelector('.Container__Map__sceneImg');
var firstChoice = document.querySelector('#firstChoice');
var secondChoice = document.querySelector('#secondChoice');
var index = 0;

function typing(text) {
  if (text.length) {
    textArea.innerHTML += text[0];
    setTimeout(function() {
      text = text.substring(1);
      typing(text)
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

function startStory(data) {
  var start = document.querySelector('#start');
  var screen = document.querySelector('#game-start')
  start.addEventListener('click', function() {
    screen.classList.remove('is-open');
    displayItems(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description, data.steps[index].img_src);
    firstChoice.addEventListener('click', function() {
      index = data.steps[index].option1.next;
      if (index <= 9) {
        displayItems(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description, data.steps[index].img_src);
      } else {
        // textArea.innerHTML = data.steps[index].description;
        // firstChoice.innerHTML = data.steps[index].message;
        // secondChoice.remove();
        displayEnd(data.steps[index].description);
      }
    });
    secondChoice.addEventListener('click', function() {
      index = data.steps[index].option2.next;
      if (index <= 9) {
        displayItems(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description, data.steps[index].img_src);
      } else {
        // textArea.innerHTML = data.steps[index].description;
        // firstChoice.innerHTML = data.steps[index].message;
        // secondChoice.remove();
        displayEnd(data.steps[index].description);
      }
    });
  });
}

function displayEnd(msg) {
  var map = document.querySelector('.Container__Map');
  var end = document.querySelector('#game-end');
  var endStory = document.querySelector('#end-msg-story');
  var winLose = document.querySelector('#winLose');
  map.style.display = 'none';
  end.style.display = 'block';
  endStory.innerHTML = msg;
  if (index == 12) {
    winLose.innerHTML = "Vous avez gagné !"
  } else {
    winLose.innerHTML = "Vous avez perdu !"
  }
}
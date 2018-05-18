fetch('./js/data.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        var start = document.querySelector('#game-start');
        start.addEventListener('click', function () {
          start.classList.remove('is-open');
          displayText(data.steps[0].description);
          mapAppear(data.steps[0].img_src);
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error', err);
  });

function displayText(param) {
  var textArea = document.querySelector('.Map__instructionsTxt');
  var text = param;
  textArea.innerHTML = text;
  var index = 0;
  textArea.innerHTML = '';
  var interval = setInterval(function() {
    textArea.innerHTML += text[index++];
    if (index === text.length) {
      clearInterval(interval);
    }
  }, 20);
}

function mapAppear(param) {
  var mapArea = document.querySelector('.Map__mapItem');
  mapArea.src = param;
}

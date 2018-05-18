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
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function displayText(param) {
  var textArea = document.querySelector('.Map__instructionsTxt');
  let text = param;
  textArea.innerHTML = text;
  let index = 0;
  textArea.innerHTML = '';
  let interval = setInterval(function() {
    textArea.innerHTML += text[index++];
    if (index === text.length) {
      clearInterval(interval);
    }
  }, 20);
}

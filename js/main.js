fetch('./js/data.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function(data) {
        var start = document.querySelector('#game-start');
        start.addEventListener('click', function () {
          start.classList.remove('is-open');
          displayText(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description);
          mapAppear(data.steps[index].img_src);
          //firstChoice.innerHTML = data.steps[index].option1.description;
          firstChoice.addEventListener('click', function() {
            var text = data.steps[index].option1.description;
            index = data.steps[index].option1.next;
            console.log(index);
            if (index < 9) {
              displayText(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description);
              mapAppear(data.steps[index].img_src);
            } else {
              displayText(data.steps[index].message);
              mapAppear(data.steps[index].img_src);
            }
          });
          secondChoice.addEventListener('click', function() {
            var text = data.steps[index].option2.description;
            index = data.steps[index].option2.next;
            if (index < 9) {
              displayText(data.steps[index].description, data.steps[index].option1.description, data.steps[index].option2.description);
              mapAppear(data.steps[index].img_src);
            } else {
              displayText(data.steps[index].message);
              mapAppear(data.steps[index].img_src);
            }
          });
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error', err);
  });

var textArea = document.querySelector('.Container__Map__Instructions__Txt');
var mapArea = document.querySelector('.Container__Map__sceneImg');
var firstChoice = document.querySelector('#firstChoice');
var secondChoice = document.querySelector('#secondChoice');
var firstChoiceArea = document.querySelector('.Container__Map__Decison__firstChoiceTxt');
var secondChoiceArea = document.querySelector('.Container__Map__Decison__secondChoiceTxt');
var index = 0;

// function displayText(param) {
//   var text = param;
//   textArea.innerHTML = text;
//   var i = 0;
//   textArea.innerHTML = '';
//   var interval = setInterval(function() {
//     textArea.innerHTML += text[i++];
//     if (i === text.length) {
//       clearInterval(interval);
//     }
//   }, 20);
// }

function displayText(param1, param2, param3) {
  var text = param1;
  textArea.innerHTML = text;
  var text2 = param2;
  firstChoice.innerHTML = text2;
  var text3 = param3;
  secondChoice.innerHTML = text3;
}

function mapAppear(param) {
  mapArea.src = param;
}

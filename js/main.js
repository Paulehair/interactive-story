var data;

function ajaxRequest() {
  var query = new XMLHttpRequest();
  query.open("POST", "./js/data.json", true);
  query.onreadystatechange = function () {
    if (query.readyState != 4 || query.status != 200) return;
    data = JSON.parse(query.responseText);
    console.log(data.steps[0].name);
  };
  query.send();
}

ajaxRequest();

const domElem = {
  txtDisplay : document.querySelector('.Screen_dialog_txt'),
}

let text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

domElem.txtDisplay.innerHTML = text;

let index = 0;
domElem.txtDisplay.innerHTML = '';

let interval = setInterval(function() {
  domElem.txtDisplay.innerHTML += text[index++];
  if (index === text.length) {
    clearInterval(interval);
  }
}, 20);

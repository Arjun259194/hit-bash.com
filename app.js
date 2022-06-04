let commands = [];
let commandIterator;

function $(element) {
  return document.querySelector(element);
}

window.onload = () => {
  addToTerminal(starterTemplate);
  $("#input-text").focus();
  $("#time").innerHTML = currentTime();
  $("#date").innerHTML = currentDate();
};

function addToTerminal(content) {
  $("#terminal").innerHTML += content;
}

function runCommand(command) {
  switch (command.toLowerCase()) {
    case "help":
      addToTerminal(help);
      break;

    case "clear":
      clear();
      break;

    case "clear -a":
      clearA();
      break;

    case "clear -h":
      clearH();
      break;

    case "social":
      addToTerminal(social);
      break;

    case "git":
      addToTerminal(git);
      break;

    case "git-gt-0":
    case "git-gt-1":
    case "git-gt-2":
    case "git-gt-3":
    case "git-gt-4":
    case "git-gt-5":
      gitGt(command[command.length - 1]);
      break;

    case "social-v-0":
    case "social-v-1":
    case "social-v-2":
      socialVisit(command[command.length - 1]);
      break;

    case "who":
      addToTerminal(who);
      break;

    case "history":
      addToTerminal(history());
      break;

    default:
      addToTerminal(`<p>Error</p>`);
      break;
  }
}

function commandHistory() {
  $("#command").innerHTML = commands[commandIterator];
  $("#input-text").value = commands[commandIterator];
  if (commandIterator == 0) {
    commandIterator = commands.length - 1;
  } else {
    commandIterator--;
  }
}

function currentTime() {
  let date = new Date();
  const timeObj = {
    HH: date.getHours(),
    MM: date.getMinutes(),
  };
  return `${timeObj.HH}:${timeObj.MM}`;
}

function currentDate() {
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();

  return cDay + "-" + cMonth + "-" + cYear;
}

window.addEventListener("keyup", (e) => {
  if (e.keyCode == "38") {
    commandHistory();
  } else {
    if ($("#input-text").value.length == 10) {
      addToTerminal('<p class="comment-color">#limit is 10 characters</p>');
    }
    $("#command").innerHTML = $("#input-text").value;
  }
  $("#time").innerHTML = currentTime();
  $("#date").innerHTML = currentDate();
});

$("body").addEventListener("click", (e) => {
  e.preventDefault();
  $("#input-text").focus();
});

$(".input-section").addEventListener("click", () => {
  $("#input-text").focus();
});

$("#input-text").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    commandIterator = commands.length;
    if ($("#input-text").value.toLowerCase() != "history") {
      commands.push($("#input-text").value.toLowerCase());
    }
    runCommand($("#input-text").value);
    $("#input-text").value = "";
  }
});

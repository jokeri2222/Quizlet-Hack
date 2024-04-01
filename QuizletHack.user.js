// ==UserScript==
// @name         Quizlet Hack
// @version      1.0.3
// @namespace    https://github.com/jokeri2222
// @description  A hack for quizlet live
// @updateURL    https://github.com/jokeri2222/Quizlet-Hack/raw/main/QuizletHack.meta.js
// @downloadURL  https://github.com/jokeri2222/Quizlet-Hack/raw/main/QuizletHack.user.js
// @author       jokeri2222; https://github.com/jokeri2222
// @match        https://quizlet.com/live/*
// @match        https://quizlet.com/live
// @icon         https://www.google.com/s2/favicons?sz=64&domain=quizlet.com
// @grant        none
// ==/UserScript==
var Version = '1.0.3'

var autoAnswer = false;
var showAnswers = false;
var pairs = []
var gameCode = ""
var updateID = false
var lastAnswer = ""
var instantReload = false

let speedConfig = {
    speed: 1000.0,
    cbSetIntervalChecked: false,
    cbSetTimeoutChecked: false,
    cbPerformanceNowChecked: false,
    cbDateNowChecked: false,
    cbRequestAnimationFrameChecked: false,
};


const uiElement = document.createElement('div');
uiElement.className = 'floating-ui';
uiElement.style.position = 'absolute';
uiElement.style.top = '5%';
uiElement.style.left = '5%';
uiElement.style.width = '33vw';
uiElement.style.height = 'auto';
uiElement.style.backgroundColor = '#423ed8';
uiElement.style.borderRadius = '1vw';
uiElement.style.boxShadow = '0px 0px 10px 0px rgba(0, 0, 0, 0.5)';
uiElement.style.zIndex = '9999';

const handle = document.createElement('div');
handle.className = 'handle';
handle.style.fontSize = '1.5vw';
handle.textContent = 'Quizlet Hack';
handle.style.color = 'white';
handle.style.width = '97.5%';
handle.style.height = '2.5vw';
handle.style.backgroundColor = '#282e3e';
handle.style.borderRadius = '1vw 1vw 0 0';
handle.style.cursor = 'grab';
handle.style.textAlign = 'left';
handle.style.paddingLeft = '2.5%';
handle.style.lineHeight = '2vw';
uiElement.appendChild(handle);

const closeButton = document.createElement('div');
closeButton.className = 'close-button';
closeButton.textContent = '✕';
closeButton.style.position = 'absolute';
closeButton.style.top = '0';
closeButton.style.right = '0';
closeButton.style.width = '12.5%';
closeButton.style.height = '2.5vw';
closeButton.style.backgroundColor = 'red';
closeButton.style.color = 'white';
closeButton.style.borderRadius = '0 1vw 0 0';
closeButton.style.display = 'flex';
closeButton.style.justifyContent = 'center';
closeButton.style.alignItems = 'center';
closeButton.style.cursor = 'pointer';
handle.appendChild(closeButton);

const minimizeButton = document.createElement('div');
minimizeButton.className = 'minimize-button';
minimizeButton.textContent = '─';
minimizeButton.style.color = 'white';
minimizeButton.style.position = 'absolute';
minimizeButton.style.top = '0';
minimizeButton.style.right = '12.5%';
minimizeButton.style.width = '12.5%';
minimizeButton.style.height = '2.5vw';
minimizeButton.style.backgroundColor = 'gray';
minimizeButton.style.borderRadius = '0 0 0 0';
minimizeButton.style.display = 'flex';
minimizeButton.style.justifyContent = 'center';
minimizeButton.style.alignItems = 'center';
minimizeButton.style.cursor = 'pointer';
handle.appendChild(minimizeButton);

const header3 = document.createElement('h2');
header3.textContent = 'ANSWERING';
header3.style.display = 'block';
header3.style.margin = '1vw';
header3.style.textAlign = 'center';
header3.style.fontSize = '2vw';
header3.style.color = 'white';
header3.style.textShadow = `
  -1px -1px 0 rgb(47, 47, 47),
  1px -1px 0 rgb(47, 47, 47),
  -1px 1px 0 rgb(47, 47, 47),
  1px 1px 0 rgb(47, 47, 47)
`;

uiElement.appendChild(header3);

const autoAnswerSwitchContainer = document.createElement('div');
autoAnswerSwitchContainer.className = 'switch-container';
autoAnswerSwitchContainer.style.display = 'flex';
autoAnswerSwitchContainer.style.alignItems = 'center';
autoAnswerSwitchContainer.style.justifyContent = 'center';
uiElement.appendChild(autoAnswerSwitchContainer);

const autoAnswerLabel = document.createElement('span');
autoAnswerLabel.textContent = 'Auto Answer';
autoAnswerLabel.className = 'switch-label';
autoAnswerLabel.style.fontSize = '1.5vw';
autoAnswerLabel.style.color = 'white';
autoAnswerLabel.style.margin = '2.5vw'
autoAnswerSwitchContainer.appendChild(autoAnswerLabel);

const autoAnswerSwitch = document.createElement('label');
autoAnswerSwitch.className = 'switch';
autoAnswerSwitchContainer.appendChild(autoAnswerSwitch);

const autoAnswerInput = document.createElement('input');
autoAnswerInput.type = 'checkbox';
autoAnswerInput.addEventListener('change', function() {
    autoAnswer = this.checked;
});
autoAnswerSwitch.appendChild(autoAnswerInput);

const autoAnswerSlider = document.createElement('span');
autoAnswerSlider.className = 'slider';
autoAnswerSwitch.appendChild(autoAnswerSlider);

const showAnswersSwitchContainer = document.createElement('div');
showAnswersSwitchContainer.className = 'switch-container';
showAnswersSwitchContainer.style.display = 'flex';
showAnswersSwitchContainer.style.alignItems = 'center';
showAnswersSwitchContainer.style.justifyContent = 'center';
uiElement.appendChild(showAnswersSwitchContainer);

const showAnswersLabel = document.createElement('span');
showAnswersLabel.textContent = 'Show Answers';
showAnswersLabel.className = 'switch-label';
showAnswersLabel.style.fontSize = '1.5vw';
showAnswersLabel.style.color = 'white';
showAnswersLabel.style.margin = '2.5vw'
showAnswersSwitchContainer.appendChild(showAnswersLabel);

const showAnswersSwitch = document.createElement('label');
showAnswersSwitch.className = 'switch';
showAnswersSwitchContainer.appendChild(showAnswersSwitch);

const showAnswersInput = document.createElement('input');
showAnswersInput.type = 'checkbox';
showAnswersInput.addEventListener('change', function() {
    showAnswers = this.checked;
});
showAnswersSwitch.appendChild(showAnswersInput);

const showAnswersSlider = document.createElement('span');
showAnswersSlider.className = 'slider';
showAnswersSwitch.appendChild(showAnswersSlider);


const instantReloadSwitchContainer = document.createElement('div');
instantReloadSwitchContainer.className = 'switch-container';
instantReloadSwitchContainer.style.display = 'flex';
instantReloadSwitchContainer.style.alignItems = 'center';
instantReloadSwitchContainer.style.justifyContent = 'center';
uiElement.appendChild(instantReloadSwitchContainer);

const instantReloadLabel = document.createElement('span');
instantReloadLabel.textContent = 'Instant reload question';
instantReloadLabel.className = 'switch-label';
instantReloadLabel.style.fontSize = '1.5vw';
instantReloadLabel.style.color = 'white';
instantReloadLabel.style.margin = '2.5vw'
instantReloadSwitchContainer.appendChild(instantReloadLabel);

const instantReloadSwitch = document.createElement('label');
instantReloadSwitch.className = 'switch';
instantReloadSwitchContainer.appendChild(instantReloadSwitch);

const instantReloadInput = document.createElement('input');
instantReloadInput.type = 'checkbox';
instantReloadInput.addEventListener('change', function() {
    instantReload = this.checked;
});
instantReloadSwitch.appendChild(instantReloadInput);

const instantReloadSlider = document.createElement('span');
instantReloadSlider.className = 'slider';
instantReloadSwitch.appendChild(instantReloadSlider);


const style = document.createElement('style');
style.textContent = `
.custom-slider {
    background: white
    border: none;
    outline: none;
    cursor: ew-resize;
    appearance: none; /* Remove default appearance */
    height: 0; /* Set the height to match the thumb height */
}

.custom-slider::-webkit-slider-thumb {
    appearance: none; /* Remove default appearance */
    width: 1.75vw; /* Set width of the slider handle */
    height: 1.75vw; /* Set height of the slider handle */
    background-color: rgb(47, 47, 47); /* Set handle color to dark gray */
    border-radius: 50%; /* Create a circle for the handle */
    cursor: ew-resize; /* Horizontal resize cursor */
    margin-top: -0.5vw; /* Adjust margin-top to vertically center the thumb */
}

.custom-slider::-webkit-slider-runnable-track {
    width: 100%; /* Set track width to 100% */
    height: 0.75vw; /* Set track height to match the thumb height */
    background-color: white; /* Set track color to white */
    cursor: ew-resize; /* Horizontal resize cursor */
    border-radius: 1vw; /* Set rounded corners for the track */
    background: linear-gradient(to right, red, yellow, limegreen); /* Gradient from red to yellow to green */
}



:root {
  --switch-width: 5.9vw;
  --switch-height: 3.3vw;
  --slider-size: 2.5vw;
  --slider-thumb-size: 1.3vw;
}

.switch {
  position: relative;
  display: inline-block;
  width: var(--switch-width);
  height: var(--switch-height);
  margin: 2.5vw;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: red;
  transition: 0.8s;
  border-radius: .5vw
}

.slider:before {
  position: absolute;
  content: "";
  height: var(--slider-size);
  width: var(--slider-size);
  left: calc(var(--slider-thumb-size) / 3);
  bottom: calc(var(--slider-thumb-size) / 3);
  background-color: rgb(43, 43, 43);
  transition: 0.8s;
  border-radius: .5vw
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px green;
}

input:checked + .slider:before {
  transform: translateX(calc(var(--slider-size)));
}

`;
document.head.appendChild(style);

const versionLabel = document.createElement('h1');
versionLabel.textContent = 'Quizlet Hack V' + Version;
versionLabel.style.fontSize = '2.5vw';
versionLabel.style.display = 'block';
versionLabel.style.textAlign = 'center';
versionLabel.style.marginTop = '3.5vw';
versionLabel.style.marginLeft = '1vw';
versionLabel.style.marginRight = '1vw';
versionLabel.style.color = 'white';
uiElement.appendChild(versionLabel);

const githubContainer = document.createElement('div');
githubContainer.style.textAlign = 'center';
githubContainer.style.marginTop = '1vw';

const githubLabel = document.createElement('span');
githubLabel.textContent = 'GitHub: ';
githubLabel.style.fontSize = '1.5vw';
githubLabel.style.margin = '0 1vw';
githubLabel.style.color = 'white';
githubContainer.appendChild(githubLabel);

const githubUrl = document.createElement('a');
githubUrl.textContent = 'jokeri2222';
githubUrl.href = 'https://github.com/jokeri2222';
githubUrl.target = '_blank';
githubUrl.style.fontSize = '1.5vw';
githubUrl.style.margin = '0 1vw';
githubUrl.style.color = 'white';
githubContainer.appendChild(githubUrl);

const githubUrl2 = document.createElement('a');
githubUrl2.textContent = 'Epic0001';
githubUrl2.href = 'https://github.com/Epic0001';
githubUrl2.target = '_blank';
githubUrl2.style.fontSize = '1.5vw';
githubUrl2.style.margin = '0 1vw';
githubUrl2.style.color = 'white';
githubContainer.appendChild(githubUrl2);

uiElement.appendChild(githubContainer);

closeButton.addEventListener('click', () => {
    document.body.removeChild(uiElement);
    autoAnswer = false;
    showAnswers = false;
});

let isMinimized = false;

minimizeButton.addEventListener('click', () => {
    isMinimized = !isMinimized;

    if (isMinimized) {
        header3.style.display = 'none';
        versionLabel.style.display = 'none';
        githubContainer.style.display = 'none';

        autoAnswerSwitchContainer.style.display = 'none';
        showAnswersSwitchContainer.style.display = 'none';
        instantReloadSwitchContainer.style.display = 'none';

        uiElement.style.height = '2.5vw';
        handle.style.height = '100%';
        closeButton.style.height = '100%';
        minimizeButton.style.height = '100%';
    } else {
        header3.style.display = 'block';;
        versionLabel.style.display = 'block';
        githubContainer.style.display = 'block';

        handle.style.height = '2.5vw';
        uiElement.style.height = 'auto';
        closeButton.style.height = '2.5vw';
        minimizeButton.style.height = '2.5vw';

        autoAnswerSwitchContainer.style.display = 'flex';
        showAnswersSwitchContainer.style.display = 'flex';
        instantReloadSwitchContainer.style.display = 'flex';
    }
});

document.body.appendChild(uiElement);

let isDragging = false;
let offsetX, offsetY;

handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - uiElement.getBoundingClientRect().left;
    offsetY = e.clientY - uiElement.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        uiElement.style.left = x + 'px';
        uiElement.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

let isHidden = false;
document.addEventListener('keydown', (event)=> {
    if (event.key == "h"  && event.altKey)
    {
        isHidden = !isHidden
    }

    if (event.key == "x" && event.altKey){
        document.body.removeChild(uiElement);
        autoAnswer = false;
        showAnswers = false;
    }

    if (isHidden)
    {
        uiElement.style.display = 'none'
    }
    else
    {
        uiElement.style.display = 'block'
    }
})


function getPair(str) {
    result = undefined
    pairs.forEach(function(pair) {
        if (pair[0] == str) {
            result = pair[1]
        }
        if (pair[1] == str) {
            result = pair[0]
        }
    })
    return result
}

function getAnswerIndex(answer) {
    var resultIdx = undefined;

    document.querySelectorAll(".StudentAnswerOptions-optionCard").forEach(function(elem, idx) {
        var optionText = elem.textContent;
        if (optionText === answer) {
            resultIdx = idx;
        }
    });

    return resultIdx;
}


function highlight(index) {
    document.querySelectorAll(".StudentAnswerOptions-optionCard").forEach(function(elem, idx) {
        if (idx === index) {

            elem.style.color = 'rgb(152, 241, 209)';
        } else {
            elem.style.color = 'rgb(218, 69, 67)';
        }
    });
}


function answerQuestion(index) {
    try {
        document.querySelectorAll(".StudentAnswerOption")[index].firstChild.click();
    } catch { return false}
    return true
}


setInterval(function() {
    const gameCodeElem = document.querySelector('input[aria-label="Game code"]')
    if (gameCodeElem && gameCode.length != 6) {
        gameCode = gameCodeElem.value.replaceAll("-", "")
        if (gameCode.length == 6) updateID = true
    }


    if (updateID) {
        updateID = false
        element = document.getElementById('quiz')
        if (element) element.remove()

        fetch("https://quizlet.com/webapi/3.8/multiplayer/game-instance?gameCode=" + gameCode).then((r1) => {
            return r1.json().then((j) => {
                var id = j.gameInstance.itemId
                element = document.createElement('iframe')
                element.src = "https://quizlet.com/"+id
                element.id = 'quiz'
                element.style.display = 'none'
                document.body.appendChild(element)

                document.getElementById('quiz').onload = function() {
                    spans = document.getElementById('quiz').contentDocument.querySelectorAll(".TermText")
                    pairs = [...spans].flatMap((_, i, a) => i % 2 ? [] : [a.slice(i, i + 2)]).map((pair) => [pair[0].textContent, pair[1].textContent])
                };
            })
        })
    }

    if (document.querySelector(".StudentEndView")) lastAnswer = ""

    if (pairs.length != 0) {
        if (document.querySelector(".FormattedText")) {
            const answer = getPair(document.querySelector(".FormattedText").textContent)

            const answerIndex = getAnswerIndex(answer)

            if (!answer){
                pairs = []
                updateID = true
                return
            }
            
            if (autoAnswer && lastAnswer != answer) {
                if (answerQuestion(answerIndex, answer)) lastAnswer = answer
            }

            if (showAnswers) {
                highlight(answerIndex);
            } else {
                document.querySelectorAll(".StudentAnswerOptions-optionCard").forEach(function(elem) {
                    elem.style.color = '';
                });
            }

        }
    }

    speedConfig.cbSetTimeoutChecked = instantReload
    speedConfig.cbRequestAnimationFrameChecked = instantReload
}, 1)



const emptyFunction = () => {};

const originalClearInterval = window.clearInterval;
const originalclearTimeout = window.clearTimeout;

const originalSetInterval = window.setInterval;
const originalSetTimeout = window.setTimeout;

const originalPerformanceNow = window.performance.now.bind(
window.performance
);

const originalDateNow = Date.now;

const originalRequestAnimationFrame = window.requestAnimationFrame;

let timers = [];
const reloadTimers = () => {
const newtimers = [];
timers.forEach((timer) => {
  originalClearInterval(timer.id);
  if (timer.customTimerId) {
    originalClearInterval(timer.customTimerId);
  }
  if (!timer.finished) {
    const newTimerId = originalSetInterval(
      timer.handler,
      speedConfig.cbSetIntervalChecked
        ? timer.timeout / speedConfig.speed
        : timer.timeout,
      ...timer.args
    );
    timer.customTimerId = newTimerId;
    newtimers.push(timer);
  }
});
timers = newtimers;
};

window.addEventListener("message", (e) => {
if (e.data.command === "setSpeedConfig") {
  speedConfig = e.data.config;
  reloadTimers();
}
});

window.postMessage({ command: "getSpeedConfig" });

window.clearInterval = (id) => {
originalClearInterval(id);
timers.forEach((timer) => {
  if (timer.id == id) {
    timer.finished = true;
    if (timer.customTimerId) {
      originalClearInterval(timer.customTimerId);
    }
  }
});
};

window.clearTimeout = (id) => {
originalclearTimeout(id);
timers.forEach((timer) => {
  if (timer.id == id) {
    timer.finished = true;
    if (timer.customTimerId) {
      originalclearTimeout(timer.customTimerId);
    }
  }
});
};

window.setInterval = (handler, timeout, ...args) => {
if (!timeout) timeout = 0;
const id = originalSetInterval(
  handler,
  speedConfig.cbSetIntervalChecked ? timeout / speedConfig.speed : timeout,
  ...args
);
timers.push({
  id: id,
  handler: handler,
  timeout: timeout,
  args: args,
  finished: false,
  customTimerId: null,
});
return id;
};

window.setTimeout = (handler, timeout, ...args) => {
if (!timeout) timeout = 0;
return originalSetTimeout(
  handler,
  speedConfig.cbSetTimeoutChecked ? timeout / speedConfig.speed : timeout,
  ...args
);
};

// performance.now
(function () {
let performanceNowValue = null;
let previusPerformanceNowValue = null;
window.performance.now = () => {
  const originalValue = originalPerformanceNow();
  if (performanceNowValue) {
    performanceNowValue +=
      (originalValue - previusPerformanceNowValue) *
      (speedConfig.cbPerformanceNowChecked ? speedConfig.speed : 1);
  } else {
    performanceNowValue = originalValue;
  }
  previusPerformanceNowValue = originalValue;
  return Math.floor(performanceNowValue);
};
})();

// Date.now
(function () {
let dateNowValue = null;
let previusDateNowValue = null;
Date.now = () => {
  const originalValue = originalDateNow();
  if (dateNowValue) {
    dateNowValue +=
      (originalValue - previusDateNowValue) *
      (speedConfig.cbDateNowChecked ? speedConfig.speed : 1);
  } else {
    dateNowValue = originalValue;
  }
  previusDateNowValue = originalValue;
  return Math.floor(dateNowValue);
};
})();

// requestAnimationFrame
(function () {
let dateNowValue = null;
let previusDateNowValue = null;
const callbackFunctions = [];
const callbackTick = [];
const newRequestAnimationFrame = (callback) => {
  return originalRequestAnimationFrame((timestamp) => {
    const originalValue = originalDateNow();
    if (dateNowValue) {
      dateNowValue +=
        (originalValue - previusDateNowValue) *
        (speedConfig.cbRequestAnimationFrameChecked
          ? speedConfig.speed
          : 1);
    } else {
      dateNowValue = originalValue;
    }
    previusDateNowValue = originalValue;

    const dateNowValue_MathFloor = Math.floor(dateNowValue);

    const index = callbackFunctions.indexOf(callback);
    let tickFrame = null;
    if (index == -1) {
      callbackFunctions.push(callback);
      callbackTick.push(0);
      callback(dateNowValue_MathFloor);
    } else if (speedConfig.cbRequestAnimationFrameChecked) {
      tickFrame = callbackTick[index];
      tickFrame += speedConfig.speed;

      if (tickFrame >= 1) {
        while (tickFrame >= 1) {
          callback(dateNowValue_MathFloor);
          window.requestAnimationFrame = emptyFunction;
          tickFrame -= 1;
        }
        window.requestAnimationFrame = newRequestAnimationFrame;
      } else {
        window.requestAnimationFrame(callback);
      }
      callbackTick[index] = tickFrame;
    } else {
      callback(dateNowValue_MathFloor);
    }
  });
};
window.requestAnimationFrame = newRequestAnimationFrame;
})();

reloadTimers()

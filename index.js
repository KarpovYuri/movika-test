const startTimer = 5;
let timer = startTimer - 1;
const leftTimeLineWidth = 33;
const rightTimeLineWidth = 42;
const timeLineHeight = 280;
const counts = document.querySelectorAll('.timer');
const timeLines = document.querySelectorAll('.time-line__svg-img');
const button = document.querySelector('.button');
const video = document.querySelector('.video');
let mirror = 1;
let countDown = null;


function startCountDown() {
  countDown = setInterval(() => {
    if (timer < 1) {
      button.style.cursor = `default`;
      button.removeEventListener('click', handleClick);
    }
    if (timer < 0) {
      clearInterval(countDown);
    } else {
      counts.forEach((item) => {
        item.style.color = "#FF0059";
        item.textContent = timer;
      });
      const height = (startTimer - timer) * timeLineHeight / startTimer;
      timeLines.forEach(item => item.setAttribute('height', `${height}`));
      timeLines[0].setAttribute('viewBox', `0 ${(timeLineHeight - height) / 2} ${leftTimeLineWidth} ${height}`);
      timeLines[1].setAttribute('viewBox', `0 ${(timeLineHeight - height) / 2} ${rightTimeLineWidth} ${height}`);
    }
    timer -= 1;
  }, 1000);
}


function handleClick() {
  clearInterval(countDown);
  video.style.transform = `scale(${-mirror}, 1)`;
  mirror = -mirror;
  counts.forEach((item) => {
    item.style.color = "#fff";
    item.textContent = startTimer;
  });
  timer = startTimer - 1;
  timeLines.forEach(item => item.setAttribute('height', `0`));
  timeLines[0].setAttribute('viewBox', `0 0 0 0`);
  timeLines[1].setAttribute('viewBox', `0 0 0 0`);
  button.classList.remove('animation');
  void button.offsetWidth;
  button.classList.add('animation');
  startCountDown();
}


button.style.animationDuration = `${startTimer}s`;
button.addEventListener('click', handleClick);
counts.forEach(item => item.textContent = startTimer);
timeLines[0].setAttribute('width', `${leftTimeLineWidth}`);
timeLines[1].setAttribute('width', `${rightTimeLineWidth}`);
button.classList.add('animation');
startCountDown();

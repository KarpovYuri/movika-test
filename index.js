const startTimer = 100;
let timer = startTimer - 1;
const leftTimeLineWidth = 33;
const rightTimeLineWidth = 42;
const timeLineHeight = 280;
const counts = document.querySelectorAll('.timer');
const timeLines = document.querySelectorAll('.time-line__svg-img');

counts.forEach(item => item.textContent = startTimer);
timeLines[0].setAttribute('width', `${leftTimeLineWidth}`);
timeLines[1].setAttribute('width', `${rightTimeLineWidth}`);



const countDown = setInterval(() => {
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

// Установка начального значения счетчика
const startTimer = 20;
let timer = startTimer - 1;

// Устанавливаем размеры таймлайнов
const timeLineWidth = 33;
const timeLineHeight = 280;


const counts = document.querySelectorAll('.timer');
const timeLines = document.querySelectorAll('.time-line__svg-img');
const button = document.querySelector('.button');
const video = document.querySelector('.video');
let mirror = 1;
let countDown = null;


// Функция запуска обратного отсчета
function startCountDown() {
  countDown = setInterval(() => {

    // Деактивируем кнопку
    if (timer < 1) {
      button.style.cursor = `default`;
      button.removeEventListener('click', handleClick);
    }
    if (timer < 0) {
      clearInterval(countDown);
    } else {

      // Перерисовываем счетчик
      counts.forEach((item) => {
        item.style.color = "#FF0059";
        item.textContent = timer;
      });

      // Вычисляем текущую высоту красного таймлайна
      const height = (startTimer - timer) * timeLineHeight / startTimer;

      // Отрисовываем красный таймлайн
      timeLines.forEach(item => {
        item.setAttribute('height', `${height}`);
        item.setAttribute('viewBox', `0 ${(timeLineHeight - height) / 2} ${timeLineWidth} ${height}`);
      });
    }
    timer -= 1;
  }, 1000);
}


// Функция обработки события кнопки
function handleClick() {
  clearInterval(countDown);

  // Имитируем загрузку нового видео
  video.style.transform = `scale(${-mirror}, 1)`;
  mirror = -mirror;

  // Устанавливаем начальное значение и цвет счетчиков
  counts.forEach((item) => {
    item.style.color = "#fff";
    item.textContent = startTimer;
  });

  // Устанавливаем начальное значение таймлайнов
  timeLines.forEach(item => {
    item.setAttribute('height', `0`);
    item.setAttribute('viewBox', `0 0 0 0`);
  });

  // Перезапускаем анимацию кнопки
  button.classList.remove('animation');
  void button.offsetWidth;
  button.classList.add('animation');

  // Перезапускаем счетчик
  timer = startTimer - 1;
  startCountDown();
}


// Устанавливаем обработчик события на кнопку
button.addEventListener('click', handleClick);

// Устанавливаем начальное значение счетчиков
counts.forEach(item => item.textContent = startTimer);

// Устанавливаем ширину Тайм лайнов
timeLines.forEach(item => item.setAttribute('width', `${timeLineWidth}`));

// Запускаем анимацию кнопки
button.style.animationDuration = `${startTimer}s`;
button.classList.add('animation');

// Запускаем обратный отсчет
startCountDown();

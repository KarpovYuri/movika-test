// Установка начального значения счетчика
const startTimer = 100;
const timeLineHeight = 42;

const counts = document.querySelectorAll('.time-line__timer');
const timeLines = document.querySelectorAll('.time-line__img-wrapper');
const button = document.querySelector('.btn-container__button');
const video = document.querySelector('.app-container__video');
const btnContainer = document.querySelector('.btn-container');

let countDown = null;
let timer = startTimer - 1;
let mirror = 1;



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
      btnContainer.classList.add('btn-container__text');
      btnContainer.textContent = 'Интерактив не пройден!';
    } else {

      // Перерисовываем счетчик
      counts.forEach((item) => {
        item.style.color = "#FF0059";
        item.textContent = timer;
      });

      // Вычисляем текущую высоту красного таймлайна
      const height = (startTimer - timer) * timeLineHeight / startTimer;

      // Отрисовываем красный таймлайн
      timeLines.forEach(item => item.style.height = `${height}vw`);
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

// Запускаем анимацию кнопки
button.style.animationDuration = `${startTimer}s`;
button.classList.add('animation');

// Запускаем обратный отсчет
startCountDown();

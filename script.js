const time = document.querySelector('.time');
const date = document.querySelector('.date');
const nameInput = document.querySelector('.name');
const greeting = document.querySelector('.greeting')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const quoteText = document.querySelector('.quote')
const quoteAuthor = document.querySelector('.author')
const btnQuote = document.querySelector('.change-quote')
const audio = new Audio();
const play = document.querySelector('.play')
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')
const playList = ['./assets/sounds/Aqua Caelestis.mp3',
	'./assets/sounds/Ennio Morricone.mp3',
	'./assets/sounds/River Flows In You.mp3',
	'./assets/sounds/Summer Wind.mp3']


console.log(play, playPrev, playNext)
let dateTime, currentTime, currentDate, greetingText, timeOfDay, hours, numFoto, numQuote, numSing = 0;

const options = { weekday: 'long', month: 'long', day: 'numeric' };

const btnPrev = document.querySelector('.slide-prev');
const btnNext = document.querySelector('.slide-next');
const body = document.querySelector('body');



function showTime() {
	dateTime = new Date();
	currentTime = dateTime.toLocaleTimeString();
	time.textContent = currentTime
	setTimeout(showTime, 1000)
	showDate()
	showGreeting()
}
function showDate() {
	dateTime = new Date();
	currentDate = dateTime.toLocaleDateString('en-En', options);
	date.textContent = currentDate
}
function showGreeting() {
	timeOfDay = getTimeDay()
	greetingText = `Good ${timeOfDay}`
	greeting.textContent = greetingText
}
function getTimeDay() {
	hours = dateTime.getHours()

	if (hours >= 4 && hours <= 11) {
		return 'morning'
	}
	if (hours >= 12 && hours <= 16) {
		return 'afternoon'
	}
	if (hours >= 17 && hours <= 23) {
		return 'evening'
	} else {
		return 'night'
	}
}
showTime()
function nameUser() {
	nameInput.focus()
	if (nameInput.value == undefined || nameInput.value == null || nameInput.value == '') {
		nameInput.placeholder = '[Entering name]'
	}
}
nameUser()

function setLocalStorage() {
	localStorage.setItem('name', nameInput.value)
}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
	if (localStorage.getItem('name')) {
		nameInput.value = localStorage.getItem('name')
	}
}

window.addEventListener('load', () => {
	getLocalStorage()
	numberFoto()

})

function numberFoto() {
	numFoto = Math.floor(Math.random() * 20)
	appNumFoto()
}
function appNumFoto() {
	const img = new Image()
	img.src = `../img-pic/${getTimeDay()}/${numFoto}.jpg`
	img.onload = () => {
		body.style.backgroundImage = `url(../img-pic/${getTimeDay()}/${numFoto}.jpg)`
	}

}

btnPrev.addEventListener('click', () => {
	numFoto--
	if (numFoto == 0) {
		numFoto = 20
	}
	console.log('numFoto = ' + numFoto)
	appNumFoto()
})
btnNext.addEventListener('click', () => {
	numFoto++
	if (numFoto == 21) {
		numFoto = 1
	}
	console.log('numFoto = ' + numFoto)
	appNumFoto()
})

async function getWeather() {
	if (city.value == undefined || city.value == null || city.value == '') {
		city.value = 'Минск'
	}
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric;`
	const res = await fetch(url);
	const data = await res.json();
	console.log(data)
	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${(data.main.temp / 10).toFixed(1)}°C`;
	weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
	if (event.code === 'Enter') {
		getWeather();
		city.blur();
	}
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

async function getQuotes() {
	const res = await fetch('./assets/data.json');
	const data = await res.json();
	console.log(data);
	randomQuote(data)
}
getQuotes()

function randomQuote(data) {
	numQuote = Math.floor(Math.random() * 2)
	console.log(numQuote)
	quoteText.textContent = data[`${numQuote}`]['text']
	quoteAuthor.textContent = data[`${numQuote}`]['author']
}

btnQuote.addEventListener('click', getQuotes)

function playAudio(data = './assets/sounds/Aqua Caelestis.mp3') {

	audio.src = data
	console.log(audio.src)
	audio.currentTime = 0;
	audio.play();
}
function pauseAudio() {
	audio.pause()
}
play.addEventListener('click', () => {
	play.classList.toggle('pause')
	if (play.classList.contains('pause')) {
		playAudio()
	} else {
		pauseAudio()
	}

})
playPrev.addEventListener('click', () => {
	numSing--
	if (numSing == -1) {
		numSing = 3
	}
	console.log(numSing)
	playAudio(playList[`${numSing}`])
})
playNext.addEventListener('click', () => {
	numSing++
	if (numSing == 4) {
		numSing = 0
	}
	console.log(numSing)
	playAudio(playList[`${numSing}`])
})

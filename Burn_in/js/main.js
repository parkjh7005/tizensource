var deadline = new Date(Date.parse(new Date()) + 60 * 1000);

var timer1;
var timer2 = 1;
var addseconds = 0;

var audio;
var btnAudioPlay;
var btnAudioPause;
var bPlayFlag;
var textSetTime;

function getTimeRemaining(endtime) {
   var t;
   
  if(!bPlayFlag){
     t = Date.parse(endtime) - Date.parse(new Date()) + (addseconds*1000);
  }
  else {
	 addseconds++;
     t = Date.parse(endtime) - Date.parse(new Date());
     t = t + (addseconds*1000);
     
  }
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);

  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  if(timer1 == 1){
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  var timeValue = getTimeRemaining(endtime);
  timer1 = 0;
  var val = location.href.substr(location.href.lastIndexOf('n') + 1, 2);
  }

  function updateClock() {
    var t = getTimeRemaining(endtime);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      pauseAudio();
      if (val == 20){
    	  window.location.href = "result20.html?time=" + timeValue.total/(60*1000);
      }
      else if(val == 30){
    	  window.location.href = "result30.html?time=" + timeValue.total/(60*1000);
      }
    }
    if (audio.currentTime == 10){
    	audio.currentTime = 0;
    	audio.play();
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

function clockstart(){
   stop = 0;
   if(timer2 == 1){
   timer1 = 1;
   
   timer2 = 0;
   }
   var val = location.href.substr(location.href.lastIndexOf('=') + 1);
   deadline = new Date(Date.parse(new Date()) + val * 60 * 1000);
   initializeClock('clockdiv', deadline);

}

function nextPage(frequency) {
	var previousValue = parseInt(textSetTime.innerHTML);
	if(frequency == 20){
		window.location.href = "burn20.html?time=" + previousValue;
	}
	
	else if(frequency == 30){
		window.location.href = "burn30.html?time=" + previousValue;
	}
}
function resultPage() {
    var val = location.href.substr(location.href.lastIndexOf('=') + 1);
	document.getElementById("totalHour").innerHTML = parseInt(val/60);
	document.getElementById("totalMin").innerHTML = parseInt(val%60);
}

function playAudio() {
	audio.play();
	btnAudioPlay.src = "pause.png";
	bPlayFlag = false;
}

function pauseAudio() {
	audio.pause();
	btnAudioPlay.src = "play.png";
	bPlayFlag = true;
}

function setting_init() {
	textSetTime = document.getElementById('textTime');

		document.getElementById('btnTimeUp').addEventListener('click', function() {
		var timeValue = parseInt(textSetTime.innerHTML) + 30;
		if (parseInt(timeValue) > 720) {
			textSetTime.innerHTML = 720;
		} else {
			textSetTime.innerHTML = timeValue;
		}
	}, false);
	
	document.getElementById('btnTimeDown').addEventListener('click', function() {
			var timeValue = parseInt(textSetTime.innerHTML) - 30;
			if (parseInt(timeValue) < 30) {
				textSetTime.innerHTML = 30;
			} else {
				textSetTime.innerHTML = timeValue;
			}
		}, false);
}

function burn_init(frequency) {
	if(frequency == 20){
		audio = new Audio('freq20.wav');
	}
	
	else if(frequency == 30){
		audio = new Audio('freq30.wav');
	}

	audio.play();
	// true: playing
	// false: paused
	bPlayFlag = false;
	btnAudioPlay = document.getElementById('audioPlay');
	btnAudioPause = document.getElementById('audioPause');
	btnAudioPlay.addEventListener('click', function() {
		if(bPlayFlag) {
			// Play -> Pause
			playAudio();
		} else {
			// Pause -> Play
			pauseAudio();
		}
	}, false);
	// to do audio play
}

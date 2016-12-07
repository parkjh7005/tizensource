var audio;
var btnAudioPlay;
var btnAudioPause;
var bPlayFlag;

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
function checkPlayTime() {
	  function checkCurrentTime() {
		  //alert(audio.currentTime);//재생 시간 확인용
	    if (audio.currentTime > 93){//각 음원마다 길이를 정해주면 무한재생
	    	audio.currentTime = 1;
	    	audio.play();
	    }
	  }
	  checkCurrentTime();
	  var checkPlayTime = setInterval(checkCurrentTime, 1000);//1초마다 함수 호출
}

function play_init() {
	audio = new Audio('wave.mp3');//대상 음원 설정
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

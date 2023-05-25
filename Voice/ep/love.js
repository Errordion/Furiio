// btn //
var btn = $('.play');

// stop //
var stop01 =  function() {
	sample01.pause();
	sample01.currentTime = 0;
};
var stop02 =  function() {
	sample02.pause();
	sample02.currentTime = 0;
};
var stop03 =  function() {
	sample03.pause();
	sample03.currentTime = 0;
};
var stop04 =  function() {
	sample04.pause();
	sample04.currentTime = 0;
};
var stop05 =  function() {
	sample05.pause();
	sample05.currentTime = 0;
};
var stop06 =  function() {
	sample06.pause();
	sample06.currentTime = 0;
};
var stopAll = function() {
	stop01();
	stop02();
	stop03();
	stop04();
	stop05();
	stop06();
	btn.removeClass('on');
};
$('.btn-nav , .thumb .swiper-slide , .popup').on('click', function() {
	stopAll();
	btn.removeClass('on');
});

// sample01 //
var sample01 = new Audio('https://wataoshi-anime.com/mp3/chara_01.mp3');
$('.play01').on('click', function() {
	if(!sample01.paused) {
		stop01();
		$(this).removeClass('on');
	} else {
		stopAll();
		sample01.play();
		sample01.currentTime = 0;
		$(this).addClass('on');
	}
});
sample01.addEventListener('ended', function() {btn.removeClass('on');});

// sample02 //
var sample02 = new Audio('https://wataoshi-anime.com/mp3/chara_02.mp3');
$('.play02').on('click', function() {
	if(!sample02.paused) {
		stop02();
		$(this).removeClass('on');
	} else {
		stopAll();
		sample02.play();
		sample02.currentTime = 0;
		$(this).addClass('on');
	}
});
sample02.addEventListener('ended', function() {btn.removeClass('on');});

// sample03 //
var sample03 = new Audio('https://wataoshi-anime.com/mp3/chara_03.mp3');
$('.play03').on('click', function() {
	if(!sample03.paused) {
		stop03();
		$(this).removeClass('on');
	} else {
		stopAll();
		sample03.play();
		sample03.currentTime = 0;
		$(this).addClass('on');
	}
});
sample03.addEventListener('ended', function() {btn.removeClass('on');});

// sample04 //
var sample04 = new Audio('https://wataoshi-anime.com/mp3/chara_04.mp3');
$('.play04').on('click', function() {
	if(!sample04.paused) {
		stop04();
		$(this).removeClass('on');
	} else {
		stopAll();
		sample04.play();
		sample04.currentTime = 0;
		$(this).addClass('on');
	}
});
sample04.addEventListener('ended', function() {btn.removeClass('on');});

// sample05 //
var sample05 = new Audio('https://wataoshi-anime.com/mp3/chara_05.mp3');
$('.play05').on('click', function() {
	if(!sample05.paused) {
		stop05();
		$(this).removeClass('on');
	} else {
		stopAll();
		sample05.play();
		sample05.currentTime = 0;
		$(this).addClass('on');
	}
});
sample05.addEventListener('ended', function() {btn.removeClass('on');});

// sample06 //
var sample06 = new Audio('https://wataoshi-anime.com/mp3/chara_06.mp3');
$('.play06').on('click', function() {
	if(!sample06.paused) {
		stop06();
		$(this).removeClass('on');
	} else {
		stopAll();
		sample06.play();
		sample06.currentTime = 0;
		$(this).addClass('on');
	}
});
sample06.addEventListener('ended', function() {btn.removeClass('on');});

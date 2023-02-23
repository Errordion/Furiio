"use strict";

$(function(){
	$('.top_banner_list').slick({
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000
	});

	$('.top_news_list li').eq(0).addClass('news_current');
	var $news_current = $('.news_current');
	if($('.top_news_list li').length > 1){
		setInterval(function(){
			$news_current = $('.news_current');
			if($news_current.next().length){
				$news_current.next().addClass('news_current');
			}else{
				$('.top_news_list li').eq(0).addClass('news_current');
			}
			$news_current.removeClass('news_current');
		}, 5000);
	}
	$('[data-chara]').on('click', function(){
		$('body').addClass('modal_open_body');
		var $this = $(this);
		var html = '';
		html += '<div class="modal_chara" data-chara-modal="'+$this.attr('data-chara')+'">';
		html += '<div class="chara_img" style="background-image: url(/assets/img/pc/'+$this.attr('data-charaimg')+');"><img src="/assets/img/sp/'+$this.attr('data-charaimg')+'" alt="" class="sp"></div>';
		html += '<div class="chara_txt">';
		html += '	<p class="chara_name">'+$this.find('.chara_name').html()+'</p>';
		html += '	<p class="chara_cv">'+$this.find('.chara_cv').html()+'</p>';
		html += '	<p class="chara_disc">'+$this.attr('data-charatxt')+'</p>';
		if($this.attr('data-characomment')){
			html += '	<p class="chara_disc">ã€ˆCOMMENTã€‰<br>'+$this.attr('data-characomment')+'</p>';
		}
		html += '	<div class="chara_control">';
		//html += '		<p class="chara_prev"></p>';
		html += '		<p class="close_btn modal_close"><span></span></p>';
		//html += '		<p class="chara_next"></p>';
		html += '	</div>';
		html += '</div>';
		html += '</div>';
		$('.modal_wrap').attr({'data-modal':'chara'});
		$('.modal_wrap').append(html);
		$('.modal').stop().fadeIn(400);
		$('.modal').addClass('modal_open');
		$('.modal_wrap').scrollTop(0);
		$.scrollify.disable();
	});

	$('[data-comment]').on('click', function(){
		$('body').addClass('modal_open_body');
		var $this = $(this);
		var html = '';
		html += '<div class="modal_comment">';
		html += '	<p class="modal_comment_title">COMMENT</p>';
		html += '	<p class="modal_comment_chara">'+$this.attr('data-commentchara')+'å½¹</p>';
		html += '	<p class="modal_comment_name">'+$this.attr('data-commentname')+'</p>';
		html += '	<div class="modal_comment_txt">'+$this.attr('data-comment')+'</div>';
		html += '	<p class="close_btn modal_close"><span></span></p>';
		html += '</div>';
		$('.modal_wrap').attr({'data-modal':'comment'});
		$('.modal_wrap').append(html);
		$('.modal').stop().fadeIn(400);
		$('.modal').addClass('modal_open');
	});

	$('.modal').on('click', '.modal_back, .modal_close', function(){
		if($.scrollify.isDisabled()){
			$.scrollify.enable();
		}
	});

	$(document).on('click', '.chara_prev', function(){
		$('.modal_wrap').addClass('chara_change');
		var now_chara = $('.modal_chara').attr('data-chara-modal');
		setTimeout(function(){
			if($('[data-chara="'+now_chara+'"]').prev('li').length){
				$('[data-chara="'+now_chara+'"]').prev('li').trigger('click');
			}else{
				$('.chara_list li').eq($('.chara_list li').length-1).trigger('click');
			}
			$('[data-chara-modal="'+now_chara+'"]').remove();
		}, 500)
		setTimeout(function(){
			$('.modal_wrap').removeClass('chara_change');
		}, 1400)
	});
	$(document).on('click', '.chara_next', function(){
		$('.modal_wrap').addClass('chara_change');
		var now_chara = $('.modal_chara').attr('data-chara-modal');
		setTimeout(function(){
			if($('[data-chara="'+now_chara+'"]').next('li').length){
				$('[data-chara="'+now_chara+'"]').next('li').trigger('click');
			}else{
				$('.chara_list li').eq(0).trigger('click');
			}
			$('[data-chara-modal="'+now_chara+'"]').remove();
		}, 500)
		setTimeout(function(){
			$('.modal_wrap').removeClass('chara_change');
		}, 1500)
	});

	$('[data-trailer]').on('click', function(){
		var dataid = $(this).attr('data-trailer');
		$('.trailer_warp .youtube').remove();
		$('.trailer_warp').append('<div class="youtube"><iframe width="560" height="315" src="https://www.youtube.com/embed/'+dataid+'?rel=0&autoplay=1" frameborder="0"></iframe></div>');
		$('.now_play').removeClass('now_play');
		$(this).addClass('now_play');
	});

	$('[data-ticket]').on('click', function(){
		var dataid = $(this).attr('data-ticket');
		$('.ticket_disp').removeClass('ticket_disp');
		$('[data-tabcnt="'+dataid+'"]').addClass('ticket_disp');
		$.scrollify.update();
	});


});

var current;
var particleSystem = null;
var stage = null;
$(window).on('load', function(){
	var search = location.search;
	if(search){
		$('.opening').fadeOut(300);
		$('.scroll_block_top').addClass('fast_load');
	}else{
		$('.opening').addClass('load');
		$('.opening').delay(5000).fadeOut(200);
		$('.scroll_block_top').addClass('load');

		
	}

	if($(window).width()>750){
		var sc_elm = '.footer';
	}else{
		var sc_elm = '.footer, [data-section-name="special"], [data-section-name="introduction"], [data-section-name="story"], [data-section-name="character"], [data-section-name="ticket"]';
	}

	$.scrollify({
		section: '.scroll_block',
		updateHash: false,
		touchScroll: true,
		interstitialSection: '.footer',
		standardScrollElements: sc_elm,
		before: function(){
			current.addClass('current_next');
			if($.scrollify.current().attr('data-section-name') == 'introduction' || $.scrollify.current().attr('data-section-name') == 'special' || $.scrollify.current().attr('data-section-name') == 'ticket' || $.scrollify.current().attr('data-section-name') == 'story' || $.scrollify.current().attr('data-section-name') == 'banner'){
				$('.menu_btn').removeClass('color_change');
				$('.nav').removeClass('color_change');
			}else{
				$('.menu_btn').addClass('color_change');
				$('.nav').addClass('color_change');
			}
			if($.scrollify.current().attr('data-section-name') == 'top'){
				$('.illust').addClass('illusu_top');
			}else{
				$('.illust').removeClass('illusu_top');
			}
		},
		after: function(){
      
			$('.scroll_block').removeClass('current current_next');
			current = $.scrollify.current();
			$.scrollify.current().addClass('current');
		},
		afterRender: function(){
			$('.scroll_block').removeClass('current current_next');
			current = $.scrollify.current();
			$.scrollify.current().addClass('current');
			if($.scrollify.current().attr('data-section-name') == 'introduction' || $.scrollify.current().attr('data-section-name') == 'special' || $.scrollify.current().attr('data-section-name') == 'ticket' || $.scrollify.current().attr('data-section-name') == 'story' || $.scrollify.current().attr('data-section-name') == 'banner'){
				$('.menu_btn').removeClass('color_change');
				$('.nav').removeClass('color_change');
			}else{
				$('.menu_btn').addClass('color_change');
				$('.nav').addClass('color_change');
			}
			if($.scrollify.current().attr('data-section-name') == 'top'){
				$('.illust').addClass('illusu_top');
			}else{
				$('.illust').removeClass('illusu_top');
			}
		},
	});

	$('.nav a').on('click', function(){
		if($(this).parents('.nav_open').length){
			$('.menu_btn').trigger('click');
		}
		if($(this).attr('href').indexOf('/?c=') > -1){
			$.scrollify.move("#"+$(this).attr('href').split('/?c=')[1]);
			return false;
		}
	});
	$('[data-toplink]').on('click', function(){
		$.scrollify.move($(this).attr('href'));
		return false;
	});
	setTimeout(function(){
		if(search){
			search = search.split('?')[1];
			$.scrollify.move("#"+search.split('c=')[1]);
		}
	}, 500);

	stage = new createjs.Stage('stage');
	particleSystem = new particlejs.ParticleSystem();
	stage.addChild(particleSystem.container);
	particleSystem.importFromJson(
		{
			"bgColor": "#000000",
			"width": 1024,
			"height": 700,
			"emitFrequency": "30",
			"startX": 776,
			"startXVariance": "178",
			"startY": 684,
			"startYVariance": "111",
			"initialDirection": "102",
			"initialDirectionVariance": "360",
			"initialSpeed": 3.5,
			"initialSpeedVariance": 5.4,
			"friction": 0.027,
			"accelerationSpeed": 0.0175,
			"accelerationDirection": 222.7,
			"startScale": 0.17,
			"startScaleVariance": 0.29,
			"finishScale": "0",
			"finishScaleVariance": 0.14,
			"lifeSpan": 295,
			"lifeSpanVariance": 211,
			"startAlpha": 0.61,
			"startAlphaVariance": 0.7,
			"finishAlpha": "0",
			"finishAlphaVariance": 0.5,
			"shapeIdList": [
				"blur_circle"
			],
				"startColor": {
				"hue": "224",
				"hueVariance": 0,
				"saturation": 0,
				"saturationVariance": 7,
				"luminance": 62,
				"luminanceVariance": 69
			},
			"blendMode": true,
			"alphaCurveType": "1",
			"VERSION": "1.0.0"
		}
	);
	createjs.Ticker.framerate = 60;
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", handleTick);

	function handleTick() {
		particleSystem.update();
		stage.update();
	}
});

$(window).on('resize', function(){
	$.scrollify.update();
});
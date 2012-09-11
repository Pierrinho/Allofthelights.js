/*
* Allofthelights.js
* Version: 1.0
* http://www.megaptery.com/allofthelights/
*/

(function ($) {
    $.fn.allofthelights = function (options) {

        var defaults = {
            'color': '#000000',
            'opacity': '0.9',
            'switch_id': 'switch',
			'animation': 'fade',
			'delay_turn_on': 400,
			'delay_turn_off': 400,
			'scrolling': true,
			'clickable_bg': false,
			'is_responsive': true,
			'z_index': '10',
			'custom_player': null,
        };

	var options = $.extend(defaults, options);

        return this.each(function () {

			var $this		= $(this),
			first_click		= true,
			offset			= null,
			height			= null,
			width			= null,
			width_window	= null,
			height_window	= null,
			button			= null,
			switch_off		= '#'+options.switch_id+'_off';
				
			if (options.is_responsive) {
				var selectors = [
					"iframe[src*='player.vimeo.com']",
					"iframe[src*='www.youtube.com']",
					"iframe[src*='www.dailymotion.com']",
					"iframe[src*='www.kickstarter.com']",
					"object",
					"embed"
				];
				
				if (options.custom_player) {
					selectors.push(options.custom_player);
				}

				var $allVideos = $(this).parent().find(selectors.join(','));
				
				var style = '&shy;<style type="text/css">         \
				  .fluid_width_video_wrapper {        \
					 width: 100%;                     \
					 position: relative;              \
					 padding: 0;                      \
				  }                                   \
													  \
				  .fluid_width_video_wrapper iframe,  \
				  .ffluid_width_video_wrapper object,  \
				  .fluid_width_video_wrapper embed {  \
					 position: absolute;              \
					 top: 0;                          \
					 left: 0;                         \
					 width: 100%;                     \
					 height: 100%;                    \
				  }                                   \
				</style>';
				$('body').append(style);

				$allVideos.each(function(){
					var $this = $(this);
					if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid_width_video_wrapper').length) { return; }
					var height = ( this.tagName.toLowerCase() == 'object' || $this.attr('height') ) ? $this.attr('height') : $this.height(),
					width = $this.attr('width') ? $this.attr('width') : $this.width(),
					aspectRatio = height / width;
					if(!$this.attr('id')){
						var videoID = 'fitvid' + Math.floor(Math.random()*999999);
						$this.attr('id', videoID);
					}
					$this.wrap('<div class="fluid_width_video_wrapper"></div>').parent('.fluid_width_video_wrapper').css('padding-top', (aspectRatio * 100)+"%");
					$this.removeAttr('height').removeAttr('width');
				});
			}

			if (options.animation == 'none') {
				options.delay_turn_on = 0;
				options.delay_turn_off = 0;
			}

			if (options.clickable_bg) {
				switch_off += ', div.allofthelights_bg';
			}

			$('body').on('click', switch_off, function() {
				variables();
				update();
				$('div.allofthelights_bg').fadeOut(+options.delay_turn_off);
				$('#'+options.switch_id+'_off').fadeOut(0);
				if (!options.scrolling) {
					$('body').css('overflow', 'auto');
				}
			}).on('click', '#'+options.switch_id, function() {
				variables();
				if (first_click) {
					first_click = false;
					var html = "<style type='text/css'>.allofthelights_bg {display:none;position:absolute;background:"+options.color+";z-index:"+options.z_index+";}</style>" + "<div id='"+options.switch_id+"_off' style='display:none;position:absolute;top:"+button.top+"px;left:"+button.left+"px;'></div>";
					var i 	 = 0;
					for ( i = 1 ; i <= 4 ; ++i ) {
						html += "<div id='allofthelights_bg"+i+"' class='allofthelights_bg'></div>"
					}
					$('body').append(html);
					$('.allofthelights_bg').css('opacity',+options.opacity);
					update();
				}
				$('#'+options.switch_id+'_off').fadeIn(0);
				$('div.allofthelights_bg').fadeIn(+options.delay_turn_on);
				
				if (!options.scrolling) {
					$('body').css('overflow', 'hidden');
				}
			});
			$(window).on('resize', function() {
				var display = false;
				if ( $('div.allofthelights_bg').is(':visible') ) {
					display = true;
					$('div.allofthelights_bg').hide();
				}
				variables();
				update();
				if (display) {
					$('div.allofthelights_bg').show();
				}		
			});
			
			function variables() {            
				offset 		= $this.offset();
				height 		= $this.height();
				width 		= $this.width();
				width_window 	= $(document).width();
				height_window 	= $(document).height();
				button 		= $('#'+options.switch_id).offset();
			}
			
			function update() {
				$('#'+options.switch_id+'_off').css({
					'top': button.top,
					'left': button.left
				});
				$('#allofthelights_bg1').css({
					'top': '0px',
					'height': offset.top,
					'left': '0px',
					'right': '0px'
				});				
				$('#allofthelights_bg2').css({
					'height': height,
					'top': offset.top,
					'left': '0px',
					'right': (width_window - offset.left)
				});
				$('#allofthelights_bg3').css({
					'height': height,
					'top': offset.top,
					'right': '0px',
					'bottom': '0px',
					'left': (offset.left+width)
				});
				$('#allofthelights_bg4').css({
					'height': (height_window-(offset.top+height)),
					'top': (offset.top+height),
					'bottom': '0px',
					'left': '0px',
					'right': '0px'
				});	
			}
        });
    };
})(jQuery);

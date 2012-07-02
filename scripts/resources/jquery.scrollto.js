/**
 * @depends jquery
 * @name jquery.scrollto
 * @package jquery-scrollto {@link http://balupton.com/projects/jquery-scrollto}
 */

/**
 * jQuery Aliaser
 */
(function(window,undefined){
	// Prepare
	var jQuery, $, ScrollTo;
	jQuery = $ = window.jQuery;

	/**
	 * jQuery ScrollTo (balupton edition)
	 * @version 1.0.2
	 * @date July 2, 2012
	 * @since 0.1.0, August 27, 2010
	 * @package jquery-scrollto {@link http://balupton.com/projects/jquery-scrollto}
	 * @author Benjamin "balupton" Lupton {@link http://balupton.com}
	 * @copyright (c) 2010 Benjamin Arthur Lupton {@link http://balupton.com}
	 * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
	 */
	ScrollTo = $.ScrollTo = $.ScrollTo || {
		/**
		 * The Default Configuration
		 */
		config: {
			duration: 400,
			easing: 'swing',
			callback: undefined,
			durationMode: 'each'
		},

		/**
		 * Configure ScrollTo
		 */
		configure: function(options){
			// Apply Options to Config
			$.extend(ScrollTo.config, options||{});

			// Chain
			return this;
		},

		/**
		 * Perform the Scroll Animation for the Collections
		 * We use $inline here, so we can determine the actual offset start for each overflow:scroll item
		 * Each collection is for each overflow:scroll item
		 */
		scroll: function(collections, config){
			// Prepare
			var collection, $container, $target, $inline,
				position, startOffset, targetOffset, offsetDifference,
				callback;

			// Determine the Scroll
			collection = collections.pop();
			$container = collection.$container;
			$target = collection.$target;

			// Prepare the Inline Element of the Container
			$inline = $('<span/>').css({
				'position': 'absolute',
				'top': '0px',
				'left': '0px'
			});
			position = $container.css('position');

			// Insert the Inline Element of the Container
			$container.css('position','relative');
			$inline.appendTo($container);

			// Determine the Offsets
			startOffset = $inline.offset().top;
			targetOffset = $target.offset().top;
			offsetDifference = targetOffset - startOffset;

			// Reset the Inline Element of the Container
			$inline.remove();
			$container.css('position',position);

			// Prepare the callback
			callback = function(event){
				// Check
				if ( collections.length === 0 ) {
					// Callback
					if ( typeof config.callback === 'function' ) {
						config.callback.apply(this,[event]);
					}
				}
				else {
					// Recurse
					ScrollTo.scroll(collections,config);
				}
				// Return true
				return true;
			};

			// Perform the Scroll
			$container.animate({
				'scrollTop': offsetDifference+'px'
			}, config.duration, config.easing, callback);

			// Return true
			return true;
		},

		/**
		 * ScrollTo the Element using the Options
		 */
		fn: function(options){
			// Prepare
			var collections, config, $container;
			collections = [];

			// Prepare
			var	$target = $(this);
			if ( $target.length === 0 ) {
				// Chain
				return this;
			}

			// Handle Options
			config = $.extend({},ScrollTo.config,options);

			// Fetch
			$container = $target.parent();

			// Cycle through the containers
			while ( $container.length === 1 && $container.is('body') === false && ($container.get(0) === document) === false ) {
				// Check Container
				var container;
				container = $container.get(0);
				if ( $container.css('overflow-y') !== 'visible' && container.scrollHeight !== container.clientHeight ) {
					// Push the Collection
					collections.push({
						'$container': $container,
						'$target': $target
					});
					// Update the Target
					$target = $container;
				}
				// Update the Container
				$container = $container.parent();
			}

			// Add the final collection
			collections.push({
				'$container': $($.browser.msie ? 'html' : 'body'),
				'$target': $target
			});

			// Adjust the Config
			if ( config.durationMode === 'all' ) {
				config.duration /= collections.length;
			}

			// Handle
			ScrollTo.scroll(collections,config);

			// Chain
			return this;
		}
	};

	// Apply our jQuery Prototype Function
	$.fn.ScrollTo = $.ScrollTo.fn;

})(window);

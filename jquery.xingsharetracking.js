/**
 * jQuery xing share tracking Plugin
 * 
 * Listens for likely clicks on the xing share button and calls a user defined function with the clicked url as only argument.    
 *   
 * Licensed under The MIT License
 * 
 * @version     0.1
 * @since       22.12.2011
 * @author      Naden Badalgogtapeh <n.b@naden.de>
 * @link        http://www.naden.de/blog
 * @link        http://www.naden.de/blog/xing-share-tracking
 * @license     http://www.opensource.org/licenses/mit-license.php MIT 
 * @package     jQuery Plugins
 * @subpackage  xingsharetracking
 *  
 */

(function($) {
/**
 * Usage: $.xingsharetracking({options});
 *
 * @param options All possible attributes
 *
 * Options:
 * ---------------------------------------
 * NAME					DEFAULT						DESCRIPTION
 *
 * callback			function(url){}		callback function, gets called if the user clicken		           
 * delay				2000							wait "delay" milliseconds before init 
 *
 * Example:
 * ---------------------------------------
 *   
 * $.xingsharetracking({delay: 1500, callback: function(url) {$.post(url); });
 *     
 */
$.xingsharetracking = function() {  
	var settings = $.extend({}, $.xingsharetracking.defaults, arguments[0] || {});
	
	window.setTimeout(function() {
		$('iframe.XING').hover(function(){
			window.XingShareTrackingUrl = this.src;
		},
		function(){
			window.XingShareTrackingUrl = null;
		});
	
		$(window).blur(function() {		
			if(window.XingShareTrackingUrl) {
				$(window.XingShareTrackingUrl.split(';')).each(function(k, token) {
					if(/url=/.test(token)) {
						settings.callback(decodeURIComponent(token.substr(4)))
					}				
				});
			}
		});
	},
	settings.delay
	);
};

// default settings
$.xingsharetracking.defaults = {
  callback: function(url) {}, 
  delay: 2000
};

})(jQuery);
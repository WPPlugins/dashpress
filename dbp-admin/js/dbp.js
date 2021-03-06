var dbp = {
	init : function() {
		if (dbpL10n.can_edit == '1') dbp.set_options();

		jQuery('.dbp_widget').each(function() {
			var _this = this;
			var i = _this.id.replace('dbp_widget_','');
			var id = (1 == i) ? 'dashpress' : 'dashpress_' + i;

			var widget = jQuery('div#' + id);

			var w_data = {	action:	'dbp_ajax',
						i:  		i	
			};

			jQuery.ajax({
				data: w_data,
				type: "POST",
				url: dbpL10n.url,
				success: function(response) {
					jQuery(_this).parent().html(response);
				}
			});
		});

	},

	set_options : function() {

		jQuery('#dashboard-options-link-wrap').appendTo('#screen-meta-links');
		jQuery('#dashboard-options-wrap').prependTo('#screen-meta');

		jQuery('.widgets-prefs input[type="radio"]').click(function(){
			var w_data = {	action:	'dbp_count',
						count:  	jQuery(this).val()
			};

			jQuery.ajax({
				data: w_data,
				type: "POST",
				url: dbpL10n.url
			});
		});

		jQuery('.hide-dashbox-tog').click( function() {
			var box = jQuery(this).val();
			var w_data = {	action:	'dbp_metabox',
						checked:	( jQuery(this).attr('checked') ) ? 1 : 0,
						box:  	jQuery(this).val()
			};
			jQuery.ajax({
				data: w_data,
				type: "POST",
				url: dbpL10n.url
			});
		});

		// global settings
		jQuery('#dashpress-global-settings').click( function() {
			var w_data = {	action:	'dbp_globset' };
			jQuery.ajax({
				data: w_data,
				type: "POST",
				url: dbpL10n.url,
				success: function(response) {
					jQuery('#dashpress-global-settings').attr( 'value', (response == '1') ? dbpL10n.erase : dbpL10n.set );
				}
			});
		});
                
		jQuery('#dashboard-options-link').on( 'focus.scroll-into-view', function(e){
			if ( e.target.scrollIntoView ) e.target.scrollIntoView(false);
			});
        }
}
jQuery(document).ready( function() { dbp.init(); } );

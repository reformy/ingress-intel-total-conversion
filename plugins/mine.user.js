// ==UserScript==
// @id             iitc-plugin-uniques@3ch01c
// @name           IITC plugin: Mine
// @category       Misc
// @version        0.0.1.@@DATETIMEVERSION@@
// @namespace      https://github.com/3ch01c/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Show my portals.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

@@PLUGINSTART@@
//PLUGIN START ////////////////////////////////////////////////////////

//use own namespace for plugin
window.plugin.mine = function() {};

//delay in ms
window.plugin.mine.SYNC_DELAY = 5000;

// maps the JS property names to localStorage keys
/*
window.plugin.mine.FIELDS = {
	'uniques': 'plugin-uniques-data',
	'updateQueue': 'plugin-uniques-data-queue',
	'updatingQueue': 'plugin-uniques-data-updating-queue',
};
*/

window.plugin.mine.uniques = {};

window.plugin.mine.disabledMessage = null;

window.plugin.mine.isHighlightActive = false;

window.plugin.mine.onPortalDetailsUpdated = function() {

	var guid = window.selectedPortal,
		details = portalDetail.get(guid),
		nickname = window.PLAYER.nickname;
	if(details) {
		if(details.owner == nickname) {
			var uniqueInfo = plugin.mine.uniques[guid];
			if (!uniqueInfo) {
				plugin.mine.uniques[guid] = uniqueInfo = {
					mine: true,
				};
			}
		}
	}
}



/***************************************************************************************************************************************************************/
/** HIGHLIGHTER ************************************************************************************************************************************************/
/***************************************************************************************************************************************************************/
window.plugin.mine.highlighter = {
	highlight: function(data) {
		var guid = data.portal.options.ent[0];
		var uniqueInfo = window.plugin.mine.uniques[guid];

		var style = {};

		if (uniqueInfo) {
			if (uniqueInfo.mine) {
				style.fillColor = 'black';
				style.fillOpacity = 0.6;

			} 
		} else {
			style.fillColor = 'red';
			style.fillOpacity = 0.7;
		}

		data.portal.setStyle(style);
	},

	setSelected: function(active) {
		window.plugin.mine.isHighlightActive = active;
	}
}




var setup = function() {
	/*
	if($.inArray('pluginUniquesUpdateUniques', window.VALID_HOOKS) < 0)
		window.VALID_HOOKS.push('pluginUniquesUpdateUniques');
	if($.inArray('pluginUniquesRefreshAll', window.VALID_HOOKS) < 0)
		window.VALID_HOOKS.push('pluginUniquesRefreshAll');
		*/
	window.addHook('portalDetailsUpdated', window.plugin.mine.onPortalDetailsUpdated);
	window.addPortalHighlighter('Uniques', window.plugin.mine.highlighter);

}

//PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@

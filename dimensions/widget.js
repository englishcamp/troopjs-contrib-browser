/*
 * TroopJS contrib-browser/dimensions/widget
 * @license MIT http://troopjs.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
define([
	"troopjs-dom/component/widget",
	"../jquery/dimensions"
], function DimensionsModule(Widget) {
	"use strict";

	var UNDEFINED;
	var $ELEMENT = "$element";
	var DIMENSIONS = "dimensions";

	function onDimensions($event, w, h) {
		var me = $event.data;

		me.publish(me.displayName, w, h, $event);
	}

	/**
	 * A dimension-aware widget that publish dimension change event.
	 * @class browser.dimensions.widget
	 */
	return Widget.extend(function DimensionsWidget($element, displayName, dimensions) {
		if (dimensions === UNDEFINED) {
			throw new Error("No dimensions provided");
		}

		this[DIMENSIONS] = dimensions;
	}, {
		"displayName" : "contrib-browser/dimensions/widget",

		"sig/initialize" : function initialize() {
			var me = this;

			me[$ELEMENT].on(DIMENSIONS + "." + me[DIMENSIONS], me, onDimensions);
		},

		"sig/start" : function start() {
			this[$ELEMENT].trigger("resize." + DIMENSIONS);
		},

		"sig/finalize" : function finalize() {
			var me = this;

			me[$ELEMENT].off(DIMENSIONS + "." + me[DIMENSIONS], onDimensions);
		}
	});
});

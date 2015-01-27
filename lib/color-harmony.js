/*
 * color-harmony
 * https://github.com/skratchdot/color-harmony
 *
 * Copyright (c) 2014 skratchdot
 * Licensed under the MIT license.
 */

'use strict';

var onecolor = require('onecolor');

var Harmonizer = function () {
	var api = this;

	/* degree arrays taken from: https://github.com/brehaut/color-js/ */
	var harmonies = {
		complementary: [0,180],
		splitComplementary: [0,150,320],
		splitComplementaryCW: [0,150,300],
		splitComplementaryCCW: [0,60,210],
		triadic: [0,120,240],
		clash: [0,90,270],
		tetradic: [0,90,180,270],
		fourToneCW: [0,60,180,240],
		fourToneCCW: [0,120,180,300],
		fiveToneA: [0,115,155,205,245],
		fiveToneB: [0,40,90,130,245],
		fiveToneC: [0,50,90,205,320],
		fiveToneD: [0,40,155,270,310],
		fiveToneE: [0,115,230,270,320],
		sixToneCW: [0,30,120,150,240,270],
		sixToneCCW: [0,90,120,210,240,330],
		neutral: [0,15,30,45,60,75],
		analogous: [0,30,60,90,120,150]
	};

	var parseColor = function (colorString) {
		var color = onecolor(colorString);
		if (!color) {
			color = onecolor('#000000');
		}
		return color;
	};
	
	var harmonize = function (color, degrees) {
		var ret = [], hsl, h, s, l, a, i, degree;
		hsl = color.hsl();
		h = hsl._hue;
		s = hsl._saturation;
		l = hsl._lightness;
		a = hsl._alpha;
		for (i = 0; i < degrees.length; i++) {
			degree = degrees[i];
			if (isFinite(degree) && typeof degree === 'number') {
				ret.push(new onecolor.HSL((h + (1 / 360 * degree)) % 1, s, l, a).hex());
			}
		}
		return ret;
	};

	var scaleTo = function (color, size, scale) {
		var i, ret = [], r, g, b, a, scaleR, scaleG, scaleB;
		if (!isFinite(size) || typeof size !== 'number') {
			size = 10;
		}
		r = color.red();
		g = color.green();
		b = color.blue();
		a = color.alpha();
		scaleR = (scale - r) / size;
		scaleG = (scale - g) / size;
		scaleB = (scale - b) / size;
		for (i = 0; i < size; i++) {
			ret.push(new onecolor.RGB(r, g, b, a).hex());
			r += scaleR;
			g += scaleG;
			b += scaleB;
		}
		return ret;
	};

	api.add = function (harmonyName, degreeArray) {
		if (Array.isArray(degreeArray)) {
			harmonies[harmonyName] = degreeArray;
		}
	};

	api.harmonizeAll = function (colorString) {
		var ret = {};
		var color = parseColor(colorString);
		for (var harmonyName in harmonies) {
			if (harmonies.hasOwnProperty(harmonyName)) {
				ret[harmonyName] = harmonize(color, harmonies[harmonyName]);
			}
		}
		return ret;
	};

	api.harmonize = function (colorString, harmony) {
		var color = parseColor(colorString);
		if (harmonies.hasOwnProperty(harmony)) {
			harmony = harmonies[harmony];
		}
		if (Array.isArray(harmony)) {
			return harmonize(color, harmony);
		} else {
			return [];
		}
	};

	// mix with black (#000000)
	api.shades = function (colorString, size) {
		return scaleTo(parseColor(colorString), size, 0);
	};

	// mix with white (#ffffff)
	api.tints = function (colorString, size) {
		return scaleTo(parseColor(colorString), size, 1);
	};

	// mix with middle gray (#777777)
	api.tones = function (colorString, size) {
		return scaleTo(parseColor(colorString), size, 0.5);
	};

	return api;
};

exports.Harmonizer = function () {
	return new Harmonizer();
};

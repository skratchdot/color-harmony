'use strict';

var Harmonizer = require('../lib/color-harmony.js').Harmonizer;
var harmonizer;
var hex = '#c715f0';

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports['color-harmony'] = {
	setUp: function (done) {
		// setup here
		harmonizer = new Harmonizer();
		done();
	},
	'harmonizeAll()': function (test) {
		var harmonies;
		test.expect(1);
		harmonies = harmonizer.harmonizeAll(hex);
		test.equal(Object.keys(harmonies).length, 18);
		test.done();
	},
	'complementary': function (test) {
		test.expect(2);
		var result = harmonizer.harmonize(hex, 'complementary');
		test.equal(result[0], hex);
		test.equal(result[1], '#3ef015');
		test.done();
	},
	'harminize()': function (test) {
		test.expect(4);
		test.ok(harmonizer.harmonize(hex, 'complementary').length === 2);
		test.ok(harmonizer.harmonize(hex, [0,1,2,30,34,66,201,222,234,256,289,293,304,344]).length === 14);
		test.ok(harmonizer.harmonize(hex, 'XXXcomplementaryXXX').length === 0);
		harmonizer.add('XXXcomplementaryXXX', [0, 100]);
		test.ok(harmonizer.harmonize(hex, 'XXXcomplementaryXXX').length === 2);
		test.done();
	},
	'scales': function (test) {
		var iterations = 100;
		test.expect(iterations * 3);
		for (var i = 0; i < iterations; i++) {
			test.equal(harmonizer.shades(hex, i).length, i);
			test.equal(harmonizer.tints(hex, i).length, i);
			test.equal(harmonizer.tones(hex, i).length, i);
		}
		test.done();
	},
	'invalid input': function (test) {
		test.expect(7);
		test.ok(harmonizer.shades(hex).length === 10);
		test.ok(harmonizer.shades(hex, 4/0).length === 10);
		test.ok(harmonizer.shades(hex, null).length === 10);
		test.ok(harmonizer.shades(hex, 'wow').length === 10);
		test.ok(harmonizer.shades(hex, '40').length === 10);
		test.ok(harmonizer.shades().length === 10);
		test.ok(harmonizer.harmonize(hex, [null, {}, 45, undefined, Object, '23']).length === 1);
		test.done();
	},
};

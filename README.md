# color-harmony

[![NPM version](https://badge.fury.io/js/color-harmony.svg)](http://badge.fury.io/js/color-harmony)
[![Build Status](https://travis-ci.org/skratchdot/color-harmony.png?branch=master)](https://travis-ci.org/skratchdot/color-harmony)
[![Code Climate](https://codeclimate.com/github/skratchdot/color-harmony.png)](https://codeclimate.com/github/skratchdot/color-harmony)
[![Coverage Status](https://coveralls.io/repos/skratchdot/color-harmony/badge.png)](https://coveralls.io/r/skratchdot/color-harmony)
[![Dependency Status](https://david-dm.org/skratchdot/color-harmony.svg)](https://david-dm.org/skratchdot/color-harmony)
[![devDependency Status](https://david-dm.org/skratchdot/color-harmony/dev-status.svg)](https://david-dm.org/skratchdot/color-harmony#info=devDependencies)

[![NPM](https://nodei.co/npm/color-harmony.png)](https://npmjs.org/package/color-harmony)


## Description

A javascript library that creates color scales/harmonies by rotating the hue of the given color.

There are also helper methods to create shades (mixing w/ black), tints (mixing w/ white), and
tones (mixing w/ middle gray).


## Getting Started

Install the module with: `npm install color-harmony`

```javascript
var Harmonizer = require('color-harmony').Harmonizer;
var harmonizer = new Harmonizer();
harmonizer.harmonizeAll('#c820f1'); // returns a map of scales
harmonizer.harmonize('#000', 'complementary'); // returns ['#000000', '#ffffff']
```


## Documentation

This library uses the [onecolor](https://github.com/One-com/one-color) parser,
so colorString can in many different formats (i.e. #ff00cc, rgb(13,42,255), etc).

#### harmonizer.add(harmonyName, degreeArray)

Add a new named harmony. If the harmony name already exists, it will
be overwritten.  If degreeArray is not an array of numbers, then the
harmony will not be added.

#### harmonizer.harmonizeAll(colorString)

Return a map of all the harmonies for the given color string.

#### harmonizer.harmonize(colorString, harmony)

Return an array of hex codes based on the given color string and harmony.

The harmony argument can be a 'named harmony', or it can be a custom harmony
by passing in an array of numbers (degrees 0-360).

#### harmonizer.shades(colorString, size)

Return an array of hex codes container the shades of a given color (i.e. mix it with black - #000000).

If size is not a valid number, then the array will default to a size of 10.

#### harmonizer.tints(colorString, size)

Return an array of hex codes container the tints of a given color (i.e. mix it with white - #FFFFFF).

If size is not a valid number, then the array will default to a size of 10.

#### harmonizer.tones(colorString, size)

Return an array of hex codes container the tones of a given color (i.e. mix it with middle gray - #777777).

If size is not a valid number, then the array will default to a size of 10.

### Available Harmony Names (and their associated degrees of hue rotation)

- complementary: [0,180]
- splitComplementary: [0,150,320]
- splitComplementaryCW: [0,150,300]
- splitComplementaryCCW: [0,60,210]
- triadic: [0,120,240]
- clash: [0,90,270]
- tetradic: [0,90,180,270]
- fourToneCW: [0,60,180,240]
- fourToneCCW: [0,120,180,300]
- fiveToneA: [0,115,155,205,245]
- fiveToneB: [0,40,90,130,245]
- fiveToneC: [0,50,90,205,320]
- fiveToneD: [0,40,155,270,310]
- fiveToneE: [0,115,230,270,320]
- sixToneCW: [0,30,120,150,240,270]
- sixToneCCW: [0,90,120,210,240,330]
- neutral: [0,15,30,45,60,75]
- analogous: [0,30,60,90,120,150]

**NOTE:** This list was compiled based on the data in [color-js](https://github.com/brehaut/color-js)


## Examples

Get all the stored harmonies
```javascript
harmonizer.harmonizeAll('#c820f1'); // returns a map of scales
```

Get a named harmony
```javascript
harmonizer.harmonize('#000', 'complementary'); // returns ['#000000', '#ffffff']
```

Get a custom harmony
```javascript
harmonizer.harmonize('#000', [0, 10, 20, 30, 40]); // returns an array of colors
```

Add a custom harmony that can later be referenced by name
```javascript
harmonizer.add('foo', [0, 25, 45]);
harmonizer.harmonize('#00cc00', 'foo'); // returns your custom data
```

Return the shades of a given color (mix it with black - #000000)
```javascript
harmonizer.shades('#925719'); // returns 10 by default
harmonizer.shades('#925719', 14); // you can return a custom amount (an array of 14)
```

Return the tints of a given color (mix it with white - #FFFFFF)
```javascript
harmonizer.tints('#925719'); // returns 10 by default
harmonizer.tints('#925719', 14); // you can return a custom amount (an array of 14)
```

Return the tones of a given color (mix it with middle gray - #777777)
```javascript
harmonizer.tones('#925719'); // returns 10 by default
harmonizer.tones('#925719', 14); // you can return a custom amount (an array of 14)
```


## Release History

#### v0.2.0 - Released June 22, 2014

- fixing a bug with the saturation value that was being used

#### v0.1.0 - Released June 21, 2014

- initial release


## License

Copyright (c) 2014 skratchdot  
Licensed under the MIT license.

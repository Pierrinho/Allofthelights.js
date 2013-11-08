# Allofthelights.js
Allofthelights.js is a jQuery plugin to turn off the light and enjoy your videos, try it !

http://www.megaptery.com/allofthelights/ - Pierre VION

## Features
- Multiple videos iframe
- Responsive video
- Support of lot of players
- Switch button entirely customizable
- Lightweight (3.4Ko minified)
- Callback functions
- Control animation speed
- Custom background (color, opacity)
- Modern browsers support
- Requires jQuery 1.7+

## Examples

- [Sample demo](http://www.megaptery.com/allofthelights/demo/index.html)
- [Page plugin](http://www.megaptery.com/allofthelights/)


## Compatibility
- Chrome
- Firefox
- Opera
- Safari
- IE9+


## Options

### color: *'#000000'*
Defines the background color.

### opacity: *'0.9'*
Defines the background opacity.

### z_index: *'10'*
Defines the background z-index.

### switch_selector: *'switch'*
Defines the switch button CSS id or class.

### delay_turn_on: *400*
Defines animation time to turn on the light.

### delay_turn_off: *400*
Defines animation time to turn off the light.

### scrolling: *true*
Allows disable scrolling when the light is on if value is false.

### is_responsive: *true*
Enables responsive video.

### custom_player: *null*
Allows to apply responsive on a custom player. Specify your video vendor selector. Only available when `is_responsive = true`.

### callback_turn_on: *function(){}*
Callback function when the light goes on.

### callback_turn_off: *function(){}*
Callback function when the light goes off.

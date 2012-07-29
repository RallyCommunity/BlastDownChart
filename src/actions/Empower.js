var cocos = require('cocos2d');
var util = require('util');


function Empower() {
	Empower.superclass.constructor.call(this);
}

Empower.inherit(cocos.actions.ActionInstant, {
	startWithTarget: function(node) {
	}
});

module.exports = Empower;



var ExplosionAnimation = require('./ExplosionAnimation');

var Textures = require('../Textures');


function MotherExplosionAnimation() {
	var textures = [Textures.explosionSmall, Textures.explosionMed, Textures.explosionLarge, Textures.explosionSuper, Textures.explosionLarge, Textures.explosionMed, Textures.explosionSmall];
	MotherExplosionAnimation.superclass.constructor.call(this, textures);
}

MotherExplosionAnimation.inherit(ExplosionAnimation);


module.exports = MotherExplosionAnimation;


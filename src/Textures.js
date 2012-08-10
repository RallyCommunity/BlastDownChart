var cocos = require('cocos2d');
var Texture2D = cocos.Texture2D;

function determineRoot(callback) {
	var roots = [];

	if(window.bdcDeployed) {
		roots.push('http://aserver/hosting/our/images/');
	} else {
		roots.push('http://localhost:4000/__jah__/assets/resources/');
		roots.push('/bdc/assets/resources/');
		roots.push('/src/resources/');
	}

	roots.forEach(function(root) {
		var i = new Image();
		i.src = root + 'Bullet.png';
		i.onload = function() {
			callback(root);
		};
	});
}

var images = [ 'explosionSmall', 'explosionMed', 'explosionLarge', 'explosionSuper', 'titleOverlay', 'Bullet', 'Complete', 'Level', 'Level1', 'MotherShip', 'PIShipHigh', 'PIShipMid', 'PIShipLow', 'Player', 'sprites', 'Start', 'StoryShip', 'bg' ];

var Textures = {
	load: function(callback) {
		var me = this;
		var pending = images.length;
		determineRoot(function(root) {
			images.forEach(function(image) {
				var imgEl = new Image();
				imgEl.src = root + image + '.png';
				imgEl.onload = function() {
					me[image] = new Texture2D({
						data: imgEl
					});
					if(--pending === 0) {
						callback();
					}
				};
			});
		});
	}
};

module.exports = Textures;


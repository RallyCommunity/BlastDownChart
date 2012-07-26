"use strict" // Use strict JavaScript mode
var cocos = require('cocos2d');
var nodes = cocos.nodes;
var events = require('events');
var geom = require('geometry');
var ccp = geom.ccp;

var Layer = nodes.Layer;
var Scene = nodes.Scene;
var Label = nodes.Label;
var Director = cocos.Director;

var Player = require('/Player');

function Bdc() {
	Bdc.superclass.constructor.call(this);

	var s = Director.sharedDirector.winSize;

	var player = new Player();
	player.position = new geom.Point(50, 100);
	this.addChild(player);
	this.player = player;

	//var action = new cocos.actions.MoveTo({
		//duration: 7,
		//position: new geom.Point(s.width - 40, s.height - 40)
	//});
	//this.player.runAction(action);
}

Bdc.inherit(Layer);

function main() {
	var director = Director.sharedDirector;

	events.addListener(director, 'ready', function(director) {
		var scene = new Scene(),
		layer = new Bdc();

		scene.addChild(layer);
		director.replaceScene(scene);
	})

	director.runPreloadScene();
}

exports.main = main;


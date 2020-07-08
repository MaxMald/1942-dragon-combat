(function () {
  'use strict';

  requirejs.config({
    baseUrl: "/",

    paths: {
      'phaser':'../../externals/phaser/build/phaser',
      'phaser3-nineslice' : '../../externals/plugins/nineSlice/nineslice.min',
      'mxUtilities' : '../../externals/mxUtilities/mxUtilities',
      'game_init' : 'test/lib/ambienceGenerator/test_ambienceGenerator'
    },

    bundles: {
      'mxUtilities' : [
        "mxUtilitites", 
        "behaviour/mxActor", 
        "behaviour/components/cmpSprite"
      ]
    },

    shim: {
      'phaser': {
        exports: 'Phaser'
      }
    }
  });

  define(["require", "game_init", "phaser"],function(require, GameInit, Phaser) {   
    var game_init = new GameInit();
    game_init.start();
    return;
  });
}());

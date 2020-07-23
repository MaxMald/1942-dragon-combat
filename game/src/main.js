(function () {
  'use strict';

  requirejs.config({
    baseUrl: "/",

    paths: {
      'phaser':'../externals/phaser/build/phaser',
      'phaser3-nineslice' : '../externals/plugins/nineSlice/nineslice.min',
      'mxUtilities' : '../externals/mxUtilities/mxUtilities',
      'game_init' : 'game/lib/1942-dragon-combat'
    },

    bundles: {
      'mxUtilities' : [
        "mxUtilitites", 
        "behaviour/mxActor", 
        "behaviour/components/cmpSprite",
        "behaviour/components/cmpShader",
        "behaviour/components/cmpTransform",
        "commons/mxEnums"
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

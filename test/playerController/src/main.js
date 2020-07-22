(function () {
  'use strict';

  requirejs.config({
    baseUrl: "/",

    paths: {
      'phaser':'../../externals/phaser/build/phaser',
      'phaser3-nineslice' : '../../externals/plugins/nineSlice/nineslice.min',
      'mxUtilities' : '../../externals/mxUtilities/mxUtilities',
      'test/playerController/src/ts_src/game_init' : 'test/lib/playerController/test_playerController'
    },

    bundles: {
      'mxUtilities' : [
        "mxUtilitites", 
        "behaviour/mxActor", 
        "behaviour/components/cmpSprite",
        "behaviour/components/cmpShader",
        "commons/mxEnums",
        "pseudoRandom/mxHalton"
      ]
    },

    shim: {
      'phaser': {
        exports: 'Phaser'
      }
    }
  });

  define(["require", "test/playerController/src/ts_src/game_init", "phaser"],function(require, GameInit, Phaser) {   
    var game_init = new GameInit();
    game_init.start();
    return;
  });
}());

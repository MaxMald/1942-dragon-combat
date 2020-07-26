(function () {
  'use strict';

  requirejs.config({
    baseUrl: "/",

    paths: {
      'phaser':'1942-dragon-combat/externals/phaser/build/phaser.min',
      'phaser3-nineslice' : '1942-dragon-combat/externals/plugins/nineSlice/nineslice.min',
      'mxUtilities' : '1942-dragon-combat/externals/mxUtilities/mxUtilities',
      'test/playerController/src/ts_src/game_init' : '1942-dragon-combat/test/lib/playerController/test_playerController'
    },

    bundles: {
      'mxUtilities' : [
        "mxUtilitites",
        "commons/mxEnums"
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

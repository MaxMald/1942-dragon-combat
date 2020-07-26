(function () {
  'use strict';

  requirejs.config({
    baseUrl: "./1942-dragon-combat/",

    paths: {
      'phaser':'/externals/phaser/build/phaser.min',
      'phaser3-nineslice' : '/externals/plugins/nineSlice/nineslice.min',
      'mxUtilities' : '/externals/mxUtilities/mxUtilities',
      'test/playerController/src/ts_src/game_init' : '/test/lib/playerController/test_playerController'
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

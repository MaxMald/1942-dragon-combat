(function () {
  'use strict';

  let hostname = window.location.hostname;
  let pre = "";

  if(hostname === "maxmald.github.io")
  {
    pre = "/1942-dragon-combat";
  }

  requirejs.config({
    baseUrl: "/",

    paths: {
      'phaser': pre + '/externals/phaser/build/phaser.min',
      'phaser3-nineslice' : pre + '/externals/plugins/nineSlice/nineslice.min',
      'mxUtilities' : pre + '/externals/mxUtilities/mxUtilities',
      'test/balsaru/src/ts_src/game_init' : pre + '/test/lib/balsaru/test_balsaru'
    },

    bundles: {
      'mxUtilities' : [
        "mxUtilitites",
        "commons/mxEnums",
        "optimization/mxObjectPool",
        "optimization/mxPoolArgs",
        "MxTools",
        "listeners/mxListener",
        "listeners/mxListenerManager",
        "shaders/mxShader"
      ]
    },

    shim: {
      'phaser': {
        exports: 'Phaser'
      }
    }
  });

  define(["require", "test/balsaru/src/ts_src/game_init", "phaser", "mxUtilities"],function(require, GameInit, Phaser) {   
    var game_init = new GameInit();
    game_init.start();
    return;
  });
}());

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
      'phaser': pre + '/externals/phaser/build/phaser',
      'phaser3-nineslice' : pre + '/externals/plugins/nineSlice/nineslice.min',
      'mxUtilities' : pre + '/externals/mxUtilities/mxUtilities',
      'test/ambienceGenerator/src/ts_src/game_init' : pre + '/test/lib/ambienceGenerator/test_ambienceGenerator'
    },

    bundles: {
      'mxUtilities' : [
        "mxUtilitites",
        "shaders/mxShader",
        "commons/mxEnums",
        "pseudoRandom/mxHalton",
        "listeners/mxListenerManager",
        "optimization/mxObjectPool",
        "listeners/mxListener"
      ]
    },

    shim: {
      'phaser': {
        exports: 'Phaser'
      }
    }
  });

  define(["require", "test/ambienceGenerator/src/ts_src/game_init", "phaser"],function(require, GameInit, Phaser) {   
    var game_init = new GameInit();
    game_init.start();
    return;
  });
}());

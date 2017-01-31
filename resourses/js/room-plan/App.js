var PIXI = require("pixi.js");
var MainStageController = require("./MainStageController.js");


function App() {
}
module.exports = App;

App.prototype.init = function () {
    var app = new PIXI.Application(800, 600, {antialias: true, backgroundColor: 0xeeeeee});

    var $view = $(app.view);
    $(".app").replaceWith($view);
    $view.addClass("app");

    var controller = new MainStageController(app.stage, app.renderer.plugins.interaction);
    controller.init();
};

// Run `npm run room-plan-build` to regenerate room-plan-bundle.js

RoomPlanApp = require('./room-plan/App.js');

$(function () {
    var app = new RoomPlanApp();
    app.init();
});

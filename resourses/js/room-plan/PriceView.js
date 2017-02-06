function PriceView(model, interaction) {
    this.model = model;
    this.interaction = interaction;
}
module.exports = PriceView;

PriceView.prototype.init = function () {
    this.update();

    this.interaction.on("mousedown", function () {
        this.isMouseDown = true;
        this.update();
    }.bind(this));
    this.interaction.on("mousemove", function () {
        if (this.isMouseDown) {
            this.update();
        }
    }.bind(this));
    this.interaction.on("mouseup", function () {
        this.isMouseDown = false;
        this.update();
    }.bind(this));
};

PriceView.prototype.update = function () {
    var price = this.model.calculate();
    $("#room-plan-price").html(price);
};

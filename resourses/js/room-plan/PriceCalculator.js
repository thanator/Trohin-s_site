function PriceCalculator(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = PriceCalculator;

PriceCalculator.wallPrice = 100;
PriceCalculator.wirePrice = 100;
PriceCalculator.doorPrice = 100;
PriceCalculator.windowPrice = 100;

PriceCalculator.prototype.calculate = function () {
    var price = 0;

    for (var i = 0; i < this.wallsCollection.walls.length; i++) {
        var wall = this.wallsCollection.walls[i];

        for (var j = 0; j < wall.cells.length; j++) {
            var cell = wall.cells[j];

            price += PriceCalculator.wallPrice;

            cell.contents.forEach(function (content) {
                switch (content) {
                    case "wire":
                        price += PriceCalculator.wirePrice;
                        break;

                    case "door1":
                        price += PriceCalculator.doorPrice;
                        break;

                    case "window1":
                        price += PriceCalculator.windowPrice;
                        break;
                }
            });
        }
    }

    return price;
};

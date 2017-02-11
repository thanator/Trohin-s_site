function PriceCalculator(wallsCollection, worldObjectsCollection) {
    this.wallsCollection = wallsCollection;
    this.worldObjectsCollection = worldObjectsCollection;
}
module.exports = PriceCalculator;

PriceCalculator.wallPrice = 100;
PriceCalculator.wirePrice = 100;
PriceCalculator.doorPrice = 100;
PriceCalculator.windowPrice = 100;
PriceCalculator.sinkPrice = 100;
PriceCalculator.floorPrice = 100;

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

                    case "door":
                        price += PriceCalculator.doorPrice * cell.contentsData.get("door-size");
                        break;

                    case "window":
                        price += PriceCalculator.windowPrice * cell.contentsData.get("window-size");
                        break;
                }
            });
        }
    }

    for (var i = 0; i < this.worldObjectsCollection.cells.length; i++) {
        var cell = this.worldObjectsCollection.cells[i];

        cell.contents.forEach(function (content) {
            switch (content) {
                case "sink":
                    price += PriceCalculator.sinkPrice;
                    break;

                case "floor":
                    price += PriceCalculator.floorPrice;
                    break;
            }
        });
    }

    return price;
};

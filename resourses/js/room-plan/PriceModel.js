function PriceModel(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = PriceModel;

PriceModel.wallPrice = 100;
PriceModel.wirePrice = 100;
PriceModel.doorPrice = 100;
PriceModel.windowPrice = 100;

PriceModel.prototype.calculate = function () {
    var price = 0;

    for (var i = 0; i < this.wallsCollection.walls.length; i++) {
        var wall = this.wallsCollection.walls[i];

        for (var j = 0; j < wall.cells.length; j++) {
            var cell = wall.cells[j];

            price += PriceModel.wallPrice;

            cell.contents.forEach(function (content) {
                switch (content) {
                    case "wire":
                        price += PriceModel.wirePrice;
                        break;

                    case "door0":
                    case "door1":
                    case "door2":
                        price += PriceModel.doorPrice;
                        break;

                    case "window0":
                    case "window1":
                    case "window2":
                        price += PriceModel.windowPrice;
                        break;
                }
            });
        }
    }

    return price;
};

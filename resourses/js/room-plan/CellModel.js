function CellModel(x, y) {
    this.x = x;
    this.y = y;
    this.width = CellModel.defaultWidth;
    this.height = CellModel.defaultHeight;
}
module.exports = CellModel;

CellModel.defaultWidth = 32;
CellModel.defaultHeight = 32;

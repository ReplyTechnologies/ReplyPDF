const BaseContainerComponent = require("./base-container-component.js");
const { Layout } = require("./enums/index.js");
const Container = require('./container.js');
const StackHorizontal = require('./stack-horizontal.js');

module.exports = class GridLayout extends BaseContainerComponent {
    constructor(properties) {
        super(properties);

        this.columns = properties.columns || 1;
        this._content = undefined;
        this._index = properties._index || 0;
        this._renderNextPage = false;
    }

    initializeComponent(data) {
        super.initializeComponent(data);

        const dataSource = this.getBinding(data);

        for (let child of this.children) {
            child.initializeComponent(dataSource);
        }
    }

    layoutComponent(document) {
        if (!this._content) {
            const components = [];
            this._content = new Container({
                x: this.x,
                y: this.y,
                children: components
            });

            let offsetY = 0;

            let rowChildren = [];
            
            for (let index = this._index; index < this.children.length; index++) {
                this._index = index;

                const child = this.children[index];
                rowChildren.push(child);

                if (index == this.children.length - 1 && rowChildren.length != this.columns) {
                    for (var i = 0; i < this.columns - rowChildren.length; i++) {
                        rowChildren.push(new Container({}));
                    }
                }

                if (rowChildren.length == this.columns) {
                    const row = new StackHorizontal({
                        width: this.width - this.margin.horizontalTotal,
                        layout: Layout.sizeEvenly,
                        y: offsetY,
                        children: rowChildren
                    });
                    row.layoutComponent(document);
                    offsetY += row.height;

                    rowChildren = [];

                    if (offsetY > this.height - this.margin.verticalTotal) {
                        this._renderNextPage = true;
                        break;
                    }

                    components.push(row);                    
                }
            }
        }

        this._content._originX = this._originX;
        this._content._originY = this._originY;

        this._content.initializeComponent({});
        this._content.layoutComponent(document);

        this.width = this._content.width;
        this.height = this._content.height;
    }

    generateComponent(document, data) {
        super.generateComponent(document, data);

        this._content.generateComponent(document, data);

        document.renderNextPage = this._renderNextPage;
    }

    afterGenerateComponent(document) {
        super.afterGenerateComponent(document);
        this._content.afterGenerateComponent(document);
    }
}
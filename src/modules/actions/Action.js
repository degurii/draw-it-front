export default class {
    ctx = null;
    type = '';
    data = null;

    constructor(ctx, type, data) {
        this.ctx = ctx;
        this.type = type;
        if (data) {
            this.data = data;
        }
    }

    setup() {}

    onMove() {}

    finishMove() {}

    render() {}

    drawLine(from, to) {
        const { ctx } = this;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }

    toMessage() {
        return JSON.stringify({
            type: this.type,
            data: this.data,
        });
    }
}

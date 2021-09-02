export default class {
    type;
    // uuid;
    thickness;
    color;
    data;

    constructor(type, thickness, color, data = null) {
        this.type = type;
        this.thickness = thickness;
        this.color = color;
        this.data = data;
    }

    setup() {}
    onMove() {}
    finishMove() {}
    render() {}

    drawLine(ctx, from, to) {
        ctx.globalCompositeOperation =
            this.type === 'eraser' ? 'destination-out' : 'source-over';
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }

    stringify() {
        return JSON.stringify({
            type: this.type,
            // uuid: this.uuid,
            thickness: this.thickness,
            color: this.color,
            coordinates: this.data,
        });
    }
}

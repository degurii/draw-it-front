import Action from './Action';

export default class extends Action {
    constructor(type, thickness, color, data) {
        super(type, thickness, color, data);
        if (!this.data) {
            this.data = [];
        }
    }

    setup(ctx, currentPosition) {
        this.data.push(currentPosition);
        this.drawLine(ctx, currentPosition, currentPosition);
    }

    onMove(ctx, currentPosition) {
        const dataLen = this.data.length;
        const prevPosition = this.data[dataLen - 1];
        this.drawLine(ctx, prevPosition, currentPosition);
        this.data.push(currentPosition);
    }

    render(ctx) {
        this.data.forEach((point, i, data) => {
            const from = data[i && i - 1];
            this.drawLine(ctx, from, point);
        });
    }
}

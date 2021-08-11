import Action from './Action';

export default class extends Action {
    constructor(ctx, type, data) {
        super(ctx, type, data);
        if(!this.data) {
            this.data = [];
        }
        this.ctx.globalCompositeOperation = "destination-out";
    };

    setup(currentPosition) {
        this.data.push(currentPosition);
        this.drawLine(currentPosition, currentPosition);
    };

    onMove(currentPosition) {
        const dataLen = this.data.length;
        const prevPosition = this.data[dataLen - 1];
        this.drawLine(prevPosition, currentPosition);
        this.data.push(currentPosition);
    };
    render() {
        this.data.forEach((point, i, data) => {
            const from = i - 1 >= 0 ? data[i - 1] : point;
            this.drawLine(from, point);
        });
    };
}
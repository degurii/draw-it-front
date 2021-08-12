import ActionManager from './ActionManager';

export default (ctx, webSocket) => {
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;

    let newAction = null;

    const state = {
        currentActionType: 'pen',
        isDrawing: false,
    };
    const onMouseDownHandler = e => {
        if (e.button !== 0) {
            // 마우스 왼쪽 클릭이 아닌 경우
            return;
        }
        newAction = ActionManager.createNewAction(ctx, state.currentActionType);

        state.isDrawing = true;
        const currentPosition = {
            x: e.offsetX,
            y: e.offsetY,
        };
        console.log(currentPosition);
        newAction.setup(currentPosition);
    };
    const onMouseMoveHandler = e => {
        if (!state.isDrawing || !newAction) {
            return;
        }
        const currentPosition = {
            x: e.offsetX,
            y: e.offsetY,
        };
        newAction.onMove(currentPosition);
    };

    const onMouseUpHandler = () => {
        if (!state.isDrawing || !newAction) {
            return;
        }
        state.isDrawing = false;
        newAction.finishMove();

        ActionManager.addAction(newAction);
        webSocket.send(newAction.toMessage());

        newAction = null;
    };

    return {
        setAction: type => {
            state.currentActionType = type;
        },
        setWidth: width => {
            ctx.lineWidth = width;
        },
        setColor: color => {
            ctx.strokeStyle = color;
        },
        onMouseDownHandler,
        onMouseMoveHandler,
        onMouseUpHandler,
    };
};

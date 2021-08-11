import Drawer from './modules/Drawer';

import ActionManager from './modules/ActionManager';
import PenAction from './modules/actions/PenAction';
import EraserAction from './modules/actions/EraserAction';

const webSocketURL = 'ws://localhost:3000';
const webSocket = new WebSocket(webSocketURL);

const canvasContainer = document.querySelector('.drawer__canvas-container'),
    canvas = canvasContainer.querySelector('.drawer__canvas'),
    ctx = canvas.getContext('2d');

ActionManager.registry('pen', PenAction);
ActionManager.registry('eraser', EraserAction);

const drawer = Drawer(ctx, webSocket);

canvas.addEventListener('mousedown', drawer.onMouseDownHandler);
canvas.addEventListener('mousemove', drawer.onMouseMoveHandler);
canvas.addEventListener('mouseup', drawer.onMouseUpHandler);

const menuBar = document.querySelector('.menu-bar');

[...menuBar.children]
    .forEach(elem => elem.addEventListener('click', e => {
        const actionType = elem.dataset.actionType;
        drawer.setAction(actionType);
    }));

webSocket.onmessage = event => {
    const {type, data} = JSON.parse(event.data);
    const action = ActionManager.makeNewAction(ctx, type, data);
    action.render(canvas.getContext('2d'));
};


// 브라우저 너비별 캔버스 크기 조정 (test)
const rootElement = document.documentElement;
const FRAME_PADDING = 30;
const canvasWidth = 3840, canvasHeight = 2160;
const setCanvasScaleRatio = (frameHeight, frameWidth) => {
    const heightRatio = (frameHeight - 2 * FRAME_PADDING) / canvasHeight,
        widthRatio = (frameWidth - 2 * FRAME_PADDING) / canvasWidth;
    const newRatio = Math.min(heightRatio, widthRatio);
    rootElement.style.setProperty('--scale-ratio', newRatio.toString());
};
window.addEventListener('DOMContentLoaded', e => {
    setCanvasScaleRatio(canvasContainer.offsetHeight, canvasContainer.offsetWidth);
});
window.addEventListener('resize', e => {
    setCanvasScaleRatio(canvasContainer.offsetHeight, canvasContainer.offsetWidth);
});
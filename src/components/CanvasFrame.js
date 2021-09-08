import React, {
    useState,
    useEffect,
    useRef,
    useLayoutEffect,
    forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';

import {
    CANVAS_FRAME_PADDING,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
} from '../constants';

const CanvasContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 6rem);
    height: 100%;
    background-color: ${props => props.theme.color.backgroundGray};

    canvas {
        outline: 2px solid ${props => props.theme.color.lineGray};
        background-color: ${props => props.theme.color.white};
        transform: scale(${props => props.scale});
    }
`;

const CanvasFrame = forwardRef(
    ({ drawManager, currentAction, penWidth, penColor }, canvasRef) => {
        const [canvasScale, setCanvasScale] = useState(0.1);
        const [isDrawing, setIsDrawing] = useState(false);

        const theme = useTheme();
        const frameRef = useRef();
        const actionRef = useRef();

        const updateCanvasScale = () => {
            const { offsetHeight, offsetWidth } = frameRef.current;
            const heightScale =
                    (offsetHeight - 2 * CANVAS_FRAME_PADDING) / CANVAS_HEIGHT,
                widthScale =
                    (offsetWidth - 2 * CANVAS_FRAME_PADDING) / CANVAS_WIDTH;
            setCanvasScale(Math.min(widthScale, heightScale));
        };

        useLayoutEffect(() => {
            updateCanvasScale();
            const onResizeHandler = () => updateCanvasScale();
            window.addEventListener('resize', onResizeHandler);
            return () => window.removeEventListener('resize', onResizeHandler);
        }, []);

        useEffect(() => {
            const ctx = canvasRef.current.getContext('2d');
            ctx.lineWidth = penWidth;
            ctx.strokeStyle = theme.color[penColor];
            ctx.lineCap = 'round';
        }, [penWidth, penColor]);

        const onMouseDownHandler = e => {
            if (e.button !== 0) {
                return;
            }
            const ctx = canvasRef.current.getContext('2d');
            setIsDrawing(true);
            const newAction = drawManager.createAction(
                currentAction,
                penWidth,
                theme.color[penColor],
            );
            const currentPosition = {
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
            };
            newAction.setup(ctx, currentPosition);
            actionRef.current = newAction;
        };

        const onMouseMoveHandler = e => {
            const ctx = canvasRef.current.getContext('2d');
            if (!isDrawing || !actionRef.current) {
                return;
            }
            const currentPosition = {
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
            };
            actionRef.current.onMove(ctx, currentPosition);
        };
        const onMouseUpHandler = e => {
            const ctx = canvasRef.current.getContext('2d');
            if (!isDrawing || !actionRef.current) {
                return;
            }
            actionRef.current.finishMove();
            drawManager.addAction(actionRef.current);

            setIsDrawing(false);
            actionRef.current = null;
        };

        return (
            <CanvasContainer ref={frameRef} scale={canvasScale}>
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    onMouseDown={onMouseDownHandler}
                    onMouseMove={onMouseMoveHandler}
                    onMouseUp={onMouseUpHandler}
                >
                    지원되지 않는 브라우저입니다.
                </canvas>
            </CanvasContainer>
        );
    },
);

CanvasFrame.propTypes = {
    drawManager: PropTypes.object.isRequired,
    currentAction: PropTypes.string.isRequired,
    penWidth: PropTypes.number.isRequired,
    penColor: PropTypes.string.isRequired,
};

export default CanvasFrame;

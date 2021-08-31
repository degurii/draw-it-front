import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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

const CanvasFrame = ({ penWidth, penColor }) => {
    const [canvasScale, setCanvasScale] = useState(0.1);
    const [isDrawing, setIsDrawing] = useState(false);

    const frameRef = useRef();
    const canvasRef = useRef();
    const contextRef = useRef();
    const actionRef = useRef();

    const theme = useTheme();
    useEffect(() => {
        contextRef.current.lineWidth = penWidth;
        contextRef.current.strokeStyle = theme.color[penColor];
    }, [penWidth, penColor, theme]);
    const updateCanvasScale = () => {
        const { offsetHeight, offsetWidth } = frameRef.current;
        const heightScale =
                (offsetHeight - 2 * CANVAS_FRAME_PADDING) / CANVAS_HEIGHT,
            widthScale =
                (offsetWidth - 2 * CANVAS_FRAME_PADDING) / CANVAS_WIDTH;
        setCanvasScale(Math.min(widthScale, heightScale));
    };
    const drawLine = (from, to) => {
        const ctx = contextRef.current;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    };
    useLayoutEffect(() => {
        contextRef.current = canvasRef.current.getContext('2d');

        updateCanvasScale();
        const onResizeHandler = () => updateCanvasScale();
        window.addEventListener('resize', onResizeHandler);
        return () => window.removeEventListener('resize', onResizeHandler);
    }, []);
    const onMouseDownHandler = e => {
        if (e.button !== 0) {
            return;
        }
        setIsDrawing(true);
        actionRef.current = { data: [] };
        const currentCoord = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        };
        drawLine(currentCoord, currentCoord);
        actionRef.current.data.push(currentCoord);
    };

    const onMouseMoveHandler = e => {
        const action = actionRef.current;
        if (!isDrawing || !action) {
            return;
        }
        const currentCoord = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        };
        const dataLen = action.data.length;
        drawLine(action.data[dataLen - 1], currentCoord);
        action.data.push(currentCoord);
    };
    const onMouseUpHandler = e => {
        if (!isDrawing || !actionRef.current) {
            return;
        }
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
};

CanvasFrame.propTypes = {
    penWidth: PropTypes.number.isRequired,
    penColor: PropTypes.string.isRequired,
};

export default CanvasFrame;

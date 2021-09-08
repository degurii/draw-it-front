import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useDrawManager from '../hooks/useDrawManager';

import Toolbar from './Toolbar/Toolbar';
import Menubar from './Menubar';
import CanvasFrame from './CanvasFrame';

import { PEN_WIDTHS, PEN_COLORS } from '../constants';

const MainContainer = styled.main`
    display: flex;

    flex-flow: wrap column;
    width: 100%;
    height: calc(100% - 6rem);
`;
const DrawContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 4.4rem);
`;
const Main = props => {
    const [drawManager, canvasRef, canUndo, canRedo] = useDrawManager();
    const [currentAction, setCurrentAction] = useState('pen');
    const [penWidth, setPenWidth] = useState(PEN_WIDTHS[0]);
    const [penColor, setPenColor] = useState(PEN_COLORS[0]);

    const onSelectWidth = width => {
        setPenWidth(width);
    };
    const onSelectColor = color => {
        setPenColor(color);
    };
    const onSelectAction = action => {
        setCurrentAction(action);
    };
    const isSelectedMenu = action => action === currentAction;

    return (
        <MainContainer>
            <Toolbar
                drawManager={drawManager}
                canvasRef={canvasRef}
                penWidth={penWidth}
                penColor={penColor}
                canUndo={canUndo}
                canRedo={canRedo}
                onSelectWidth={onSelectWidth}
                onSelectColor={onSelectColor}
            />
            <DrawContainer>
                <Menubar
                    onSelectAction={onSelectAction}
                    isSelectedMenu={isSelectedMenu}
                />
                <CanvasFrame
                    drawManager={drawManager}
                    currentAction={currentAction}
                    penWidth={penWidth}
                    penColor={penColor}
                    ref={canvasRef}
                />
            </DrawContainer>
        </MainContainer>
    );
};

Main.propTypes = {};

export default Main;

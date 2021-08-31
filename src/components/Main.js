import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    const [penWidth, setPenWidth] = useState(PEN_WIDTHS[0]);
    const [penColor, setPenColor] = useState(PEN_COLORS[0]);
    const onSelectWidth = width => {
        setPenWidth(width);
    };
    const onSelectColor = color => {
        setPenColor(color);
    };
    return (
        <MainContainer>
            <Toolbar
                penWidth={penWidth}
                penColor={penColor}
                onSelectWidth={onSelectWidth}
                onSelectColor={onSelectColor}
            />
            <DrawContainer>
                <Menubar />
                <CanvasFrame penWidth={penWidth} penColor={penColor} />
            </DrawContainer>
        </MainContainer>
    );
};

Main.propTypes = {};

export default Main;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Toolbar from './Toolbar';
import Menubar from './Menubar';
import CanvasFrame from './CanvasFrame';

const MainContainer = styled.main`
    display: flex;

    //flex-wrap: wrap;
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
    return (
        <MainContainer>
            <Toolbar />
            <DrawContainer>
                <Menubar />
                <CanvasFrame />
            </DrawContainer>
        </MainContainer>
    );
};

Main.propTypes = {};

export default Main;

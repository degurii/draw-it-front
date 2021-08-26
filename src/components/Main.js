import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Toolbar from './Toolbar';
import Menubar from './Menubar';
import CanvasFrame from './CanvasFrame';

const MainStyled = styled.main`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100vh - 6rem);
`;
const Main = props => {
    return (
        <MainStyled>
            <Toolbar />
            <Menubar />
            <CanvasFrame />
        </MainStyled>
    );
};

Main.propTypes = {};

export default Main;

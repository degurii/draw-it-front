import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MenubarContainer = styled.div`
    width: 6rem;
    height: calc(100% - 5rem);
    border: 1px solid red;
`;
const Menubar = props => {
    return (
        <MenubarContainer>
            <div></div>
        </MenubarContainer>
    );
};

Menubar.propTypes = {};

export default Menubar;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderStyled = styled.header`
    display: flex;
    align-items: center;
    height: 6rem;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.color.lineGray};
    padding-left: 2.4rem;
`;
const Header = () => {
    return (
        <HeaderStyled>
            <h1>Draw It</h1>
        </HeaderStyled>
    );
};

Header.propTypes = {};

export default Header;

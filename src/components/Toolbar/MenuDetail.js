import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MenuDetailWrapper = styled.div`
    position: absolute;
    display: ${props => (props.active ? 'block' : 'none')};

    top: 4rem;
    left: 0;
    z-index: 99;
    box-shadow: 3px 3px 5px ${props => props.theme.color.lineGray};
`;

const MenuDetail = ({ active, children }) => {
    return <MenuDetailWrapper active={active}>{children}</MenuDetailWrapper>;
};

MenuDetail.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.element.isRequired,
};

export default MenuDetail;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FaPen, FaEraser, FaRegSquare } from 'react-icons/fa';

const MenubarContainer = styled.div`
    width: 6rem;
    height: 100%;
    border-right: 1px solid ${props => props.theme.color.lineGray};

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const MenubarItem = styled.li`
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.color.hoverGray};
    }

    &:active {
        background-color: ${props => props.theme.color.activeGray};
    }

    svg {
        font-size: 2.4rem;
    }
`;

const Menubar = props => {
    return (
        <MenubarContainer>
            <ul>
                <MenubarItem>
                    <FaPen />
                </MenubarItem>
                <MenubarItem>
                    <FaEraser />
                </MenubarItem>
                <MenubarItem>
                    <FaRegSquare />
                </MenubarItem>
            </ul>
        </MenubarContainer>
    );
};

Menubar.propTypes = {};

export default Menubar;

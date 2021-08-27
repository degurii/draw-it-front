import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FaPen, FaEraser, FaRegSquare } from 'react-icons/fa';

const MenubarContainer = styled.div`
    width: 6rem;
    height: calc(100% - 4.4rem);
    border-right: 1px solid ${({ theme }) => theme.colors.lineGray};

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
        background-color: ${({ theme }) => theme.colors.buttonHover};
    }
    &:active {
        background-color: ${({ theme }) => theme.colors.buttonActive};
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

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

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
    background-color: ${({ selected, theme }) =>
        selected ? theme.color.activeGray : theme.color.white};

    ${props =>
        !props.selected &&
        css`
            &:hover {
                background-color: ${props.theme.color.hoverGray};
            }
        `}
    &:hover {
        background-color: ${props =>
            props.selected || props.theme.color.hoverGray};
    }

    &:active {
        background-color: ${props => props.theme.color.activeGray};
    }

    svg {
        font-size: 2.4rem;
    }
`;

const Menubar = ({ onSelectAction, isSelectedMenu }) => {
    return (
        <MenubarContainer>
            <ul>
                <MenubarItem
                    selected={isSelectedMenu('pen')}
                    onClick={() => onSelectAction('pen')}
                >
                    <FaPen />
                </MenubarItem>
                <MenubarItem
                    selected={isSelectedMenu('eraser')}
                    onClick={() => onSelectAction('eraser')}
                >
                    <FaEraser />
                </MenubarItem>
                <MenubarItem>
                    <FaRegSquare />
                </MenubarItem>
            </ul>
        </MenubarContainer>
    );
};

Menubar.propTypes = {
    onSelectAction: PropTypes.func.isRequired,
    isSelectedMenu: PropTypes.func.isRequired,
};

export default Menubar;

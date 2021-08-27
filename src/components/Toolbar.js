import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaUndoAlt, FaRedoAlt, FaTrashAlt } from 'react-icons/fa';
import { MdLineWeight, MdBorderColor } from 'react-icons/md';

const ToolbarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.4rem;
    padding-left: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lineGray};
    ul {
        display: flex;
        align-items: center;
        height: 100%;
    }
`;

const ToolbarItem = styled.li`
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 4.8rem;
    height: 3.6rem;
    border-radius: 2px;
    font-size: 2rem;
    margin: 0 0.1rem;

    &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};
    }
    &:active {
        background-color: ${({ theme }) => theme.colors.buttonActive};
    }

    svg {
        font-size: 1.8rem;
    }
`;
const MdBorderColorIcon = styled(MdBorderColor)`
    path:last-child {
        fill-opacity: 1;
        fill: ${props => props.currentColor};
    }
`;
const MdLineWeightIcon = styled(MdLineWeight)`
    transform: rotate(180deg);
`;
const Separator = styled.li`
    width: 0;
    height: 80%;
    border-right: 1px solid ${({ theme }) => theme.colors.lineGray};
    margin: 0 0.6rem;
`;

const Toolbar = props => {
    return (
        <ToolbarContainer>
            <ul>
                <ToolbarItem>
                    <FaUndoAlt />
                </ToolbarItem>
                <ToolbarItem>
                    <FaRedoAlt />
                </ToolbarItem>
                <Separator />
                <ToolbarItem>
                    <MdLineWeightIcon />
                </ToolbarItem>
                <ToolbarItem>
                    <MdBorderColorIcon currentColor={'red'} />
                </ToolbarItem>
                <Separator />
                <ToolbarItem>
                    <FaTrashAlt />
                </ToolbarItem>
            </ul>
        </ToolbarContainer>
    );
};

Toolbar.propTypes = {};

export default Toolbar;

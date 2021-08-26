import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaUndoAlt, FaRedoAlt, FaTrashAlt } from 'react-icons/fa';
import { MdLineWeight, MdBorderColor } from 'react-icons/md';

const ToolbarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 5rem;
    border: 1px solid blue;

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
    width: 4rem;
    height: 3.2rem;
    border: 1px solid black;
    border-radius: 2px;
    margin: 0.2rem;
    font-size: 2rem;

    &:active {
        background-color: black;
    }
`;

const Separator = styled.li`
    width: 0;
    height: 100%;
    border-right: 1px solid black;
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
                    <MdLineWeight />
                </ToolbarItem>
                <ToolbarItem>
                    <MdBorderColor />
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

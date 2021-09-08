import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FaUndoAlt, FaRedoAlt, FaTrashAlt } from 'react-icons/fa';
import { MdLineWeight, MdBorderColor } from 'react-icons/md';

import PenWidthMenuDetail from './PenWidthMenuDetail';
import PenColorMenuDetail from './PenColorMenuDetail';
import useDeactivate from '../../hooks/useDeactivateComponent';

const ToolbarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.4rem;
    padding-left: 1rem;
    border-bottom: 1px solid ${props => props.theme.color.lineGray};

    ul {
        display: flex;
        align-items: center;
        height: 100%;
    }
`;

const ToolbarItem = styled.li`
    display: flex;
    position: relative;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 4.8rem;
    height: 3.6rem;
    border-radius: 2px;
    font-size: 2rem;
    margin: 0 0.1rem;
    background-color: ${({ active, theme }) =>
        active ? theme.color.activeGray : theme.color.white};

    ${props =>
        !props.active &&
        css`
            &:hover {
                background-color: ${props.theme.color.hoverGray};
            }
        `}
    &:active {
        background-color: ${props => props.theme.color.activeGray};
    }

    svg {
        font-size: 1.8rem;
    }
`;
const MdBorderColorIcon = styled(MdBorderColor)`
    path:last-child {
        fill-opacity: 1;
        fill: ${props => props.theme.color[props.pencolor]};
    }
`;
const MdLineWeightIcon = styled(MdLineWeight)`
    transform: rotate(180deg);
`;
const Separator = styled.li`
    width: 0;
    height: 80%;
    border-right: 1px solid ${props => props.theme.color.lineGray};
    margin: 0 0.6rem;
`;

const Toolbar = ({
    drawManager,
    penWidth,
    penColor,
    onSelectWidth,
    onSelectColor,
}) => {
    const [widthMenuRef, isWidthMenuActive] = useDeactivate(false);
    const [colorMenuRef, isColorMenuActive] = useDeactivate(false);

    const onUndo = () => {
        drawManager.undo();
    };
    const onRedo = () => {
        drawManager.redo();
    };
    const onClear = () => {
        drawManager.clear();
    };
    return (
        <ToolbarContainer>
            <ul>
                <ToolbarItem onClick={onUndo}>
                    <FaUndoAlt />
                </ToolbarItem>
                <ToolbarItem onClick={onRedo}>
                    <FaRedoAlt />
                </ToolbarItem>
                <Separator />
                <ToolbarItem ref={widthMenuRef} active={isWidthMenuActive}>
                    <MdLineWeightIcon />
                    <PenWidthMenuDetail
                        active={isWidthMenuActive}
                        penWidth={penWidth}
                        penColor={penColor}
                        onSelectWidth={onSelectWidth}
                    />
                </ToolbarItem>
                <ToolbarItem ref={colorMenuRef} active={isColorMenuActive}>
                    <MdBorderColorIcon pencolor={penColor} />
                    <PenColorMenuDetail
                        active={isColorMenuActive}
                        penColor={penColor}
                        onSelectColor={onSelectColor}
                    />
                </ToolbarItem>
                <Separator />
                <ToolbarItem onClick={onClear}>
                    <FaTrashAlt />
                </ToolbarItem>
            </ul>
        </ToolbarContainer>
    );
};

Toolbar.propTypes = {
    drawManager: PropTypes.object.isRequired,
    penWidth: PropTypes.number.isRequired,
    penColor: PropTypes.string.isRequired,
    onSelectWidth: PropTypes.func.isRequired,
    onSelectColor: PropTypes.func.isRequired,
    canUndo: PropTypes.bool,
    canRedo: PropTypes.bool,
};

export default Toolbar;

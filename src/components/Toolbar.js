import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FaUndoAlt, FaRedoAlt, FaTrashAlt } from 'react-icons/fa';
import { MdLineWeight, MdBorderColor } from 'react-icons/md';

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
        fill: ${props => props.currentColor};
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

const MenuDetailWrapper = styled.div`
    position: absolute;
    display: ${props => (props.active ? 'block' : 'none')};

    top: 4rem;
    left: 0;
`;
const PenWidthMenuDetailWrapper = styled.div`
    cursor: default;
    width: 16rem;
    height: 10rem;
    border-radius: 4px;
    background-color: ${props => props.theme.color.white};
    display: flex;
    flex-flow: row wrap;

    & > div {
        flex: 1 0 5rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        &:hover {
            background-color: ${props => props.theme.color.hoverGray};
        }

        &:active {
            background-color: ${props => props.theme.color.activeGray};
        }
    }

    div > div {
        display: flex;
        border-radius: 50%;
        background-color: ${({ color, theme }) => theme.color[color]};
    }
    div:nth-child(1) > div {
        width: 0.5rem;
        height: 0.5rem;
    }

    div:nth-child(2) > div {
        width: 1rem;
        height: 1rem;
    }

    div:nth-child(3) > div {
        width: 1.5rem;
        height: 1.5rem;
    }

    div:nth-child(4) > div {
        width: 2rem;
        height: 2rem;
    }

    div:nth-child(5) > div {
        width: 2.5rem;
        height: 2.5rem;
    }

    div:nth-child(6) > div {
        width: 3rem;
        height: 3rem;
    }
`;
const PenWidthMenuDetail = () => {
    return (
        <PenWidthMenuDetailWrapper color={'black'}>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
        </PenWidthMenuDetailWrapper>
    );
};
const PenColorMenuDetailWrapper = styled.div`
    cursor: default;
    width: 16rem;
    height: 10rem;
    border-radius: 4px;
    background-color: ${props => props.theme.color.white};
    display: flex;
    flex-flow: row wrap;

    & > div {
        flex: 1 0 5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        &:hover {
            background-color: ${props => props.theme.color.hoverGray};
        }

        &:active {
            background-color: ${props => props.theme.color.activeGray};
        }
    }

    div > div {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
    }

    div:nth-child(1) > div {
        background-color: ${props => props.theme.color.red};
    }

    div:nth-child(2) > div {
        background-color: ${props => props.theme.color.yellow};
    }

    div:nth-child(3) > div {
        background-color: ${props => props.theme.color.green};
    }

    div:nth-child(4) > div {
        background-color: ${props => props.theme.color.blue};
    }

    div:nth-child(5) > div {
        background-color: ${props => props.theme.color.purple};
    }

    div:nth-child(6) > div {
        background-color: ${props => props.theme.color.black};
    }
`;

const PenColorMenuDetail = () => {
    return (
        <PenColorMenuDetailWrapper>
            <div>
                <div />
            </div>
            <div>
                <div />
            </div>
            <div>
                <div />
            </div>
            <div>
                <div />
            </div>
            <div>
                <div />
            </div>
            <div>
                <div />
            </div>
        </PenColorMenuDetailWrapper>
    );
};
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
                    <MenuDetailWrapper>
                        <PenWidthMenuDetail />
                    </MenuDetailWrapper>
                </ToolbarItem>
                <ToolbarItem active>
                    <MdBorderColorIcon currentColor={'red'} />
                    <MenuDetailWrapper active>
                        <PenColorMenuDetail />
                    </MenuDetailWrapper>
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

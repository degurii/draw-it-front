import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuDetail from './MenuDetail';
import DetailItem from './DetailItem';
import { PEN_WIDTHS } from '../../constants';

const PenWidthMenuDetailWrapper = styled.div`
    cursor: default;
    width: 16rem;
    height: 10rem;
    border-radius: 4px;
    background-color: ${props => props.theme.color.white};
    display: flex;
    flex-flow: row wrap;
    ${DetailItem} {
        div {
            display: flex;
            border-radius: 50%;
        }

        &:nth-child(1) div {
            width: 0.5rem;
            height: 0.5rem;
        }

        &:nth-child(2) div {
            width: 1rem;
            height: 1rem;
        }

        &:nth-child(3) div {
            width: 1.5rem;
            height: 1.5rem;
        }

        &:nth-child(4) div {
            width: 2rem;
            height: 2rem;
        }

        &:nth-child(5) div {
            width: 2.5rem;
            height: 2.5rem;
        }

        &:nth-child(6) div {
            width: 3rem;
            height: 3rem;
        }
    }
`;

const PenWidthMenuDetail = ({ active, penWidth, penColor, onSelectWidth }) => {
    return (
        <MenuDetail active={active}>
            <PenWidthMenuDetailWrapper color={penColor}>
                {PEN_WIDTHS.map(width => (
                    <DetailItem
                        key={width}
                        color={penColor}
                        selected={width === penWidth}
                        onClick={() => onSelectWidth(width)}
                    >
                        <div />
                    </DetailItem>
                ))}
            </PenWidthMenuDetailWrapper>
        </MenuDetail>
    );
};

PenWidthMenuDetail.propTypes = {
    active: PropTypes.bool,
    penWidth: PropTypes.number.isRequired,
    penColor: PropTypes.string.isRequired,
    onSelectWidth: PropTypes.func.isRequired,
};

export default PenWidthMenuDetail;

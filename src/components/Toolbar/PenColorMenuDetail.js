import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuDetail from './MenuDetail';
import DetailItem from './DetailItem';
import { PEN_COLORS } from '../../constants';

const PenColorMenuDetailWrapper = styled.div`
    cursor: default;
    width: 16rem;
    height: 10rem;
    border-radius: 4px;
    background-color: ${props => props.theme.color.white};
    display: flex;
    flex-flow: row wrap;

    ${DetailItem} {
        div {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
        }
    }
`;

const PenColorMenuDetail = ({ active, penColor, onSelectColor }) => {
    return (
        <MenuDetail active={active}>
            <PenColorMenuDetailWrapper>
                {PEN_COLORS.map(color => (
                    <DetailItem
                        key={color}
                        color={color}
                        selected={color === penColor}
                        onClick={() => onSelectColor(color)}
                    >
                        <div />
                    </DetailItem>
                ))}
            </PenColorMenuDetailWrapper>
        </MenuDetail>
    );
};

PenColorMenuDetail.propTypes = {
    active: PropTypes.bool,
    penColor: PropTypes.string.isRequired,
    onSelectColor: PropTypes.func.isRequired,
};

export default PenColorMenuDetail;

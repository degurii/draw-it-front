import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CanvasContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.theme.color.backgroundGray};

    width: calc(100% - 6rem);

    canvas {
        outline: 2px solid gray;
    }
`;
const CanvasFrame = props => {
    return (
        <CanvasContainer>
            <canvas width={400} height={400}>
                지원되지 않는 브라우저입니다.
            </canvas>
        </CanvasContainer>
    );
};

CanvasFrame.propTypes = {};

export default CanvasFrame;

import styled from 'styled-components';

export default styled.div`
    flex: 1 0 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    background-color: ${props =>
        props.selected && props.theme.color.activeGray};

    &:hover {
        background-color: ${props => props.theme.color.hoverGray};
    }

    &:active {
        background-color: ${props => props.theme.color.activeGray};
    }

    div {
        background-color: ${({ theme, color }) => theme.color[color]};
    }
`;

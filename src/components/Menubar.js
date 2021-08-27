import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FaPen, FaEraser, FaRegSquare } from 'react-icons/fa';

const MenubarContainer = styled.div`
    width: 6rem;
    height: calc(100% - 4.4rem);
    border-right: 1px solid ${({ theme }) => theme.colors.lineGray};
`;

const MenubarItem = styled.li``;
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

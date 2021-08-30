import Header from './components/Header';
import Main from './components/Main';

import styled from 'styled-components';

const AppContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-flow: wrap column;
`;
function App() {
    return (
        <AppContainer>
            <Header />
            <Main />
        </AppContainer>
    );
}

export default App;

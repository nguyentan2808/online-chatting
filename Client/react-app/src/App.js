import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import { MainProvider } from './Contexts/MainContext';
import { SocketProvider } from './Contexts/socketContext';

function App() {
    return (
        <MainProvider>
            <SocketProvider>
                <div className="wrapper">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/chat" component={Chat} />
                        </Switch>
                    </Router>
                </div>
            </SocketProvider>
        </MainProvider>
    );
}

export default App;

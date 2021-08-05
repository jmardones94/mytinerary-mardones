import Home from './pages/Home'
import Cities from './pages/Cities';
import E404 from './pages/E404'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Home heroImg={require('./assets/travels.jpg')}/>}></Route>
        <Route path="/cities" render={() => <Cities heroImg={require('./assets/travels_pink.jpeg')}/>}></Route>
        <Route path="/404" render={() => <E404 heroImg={require('./assets/maletas.jpeg')}/>}></Route>
        <Redirect to="/404"></Redirect>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

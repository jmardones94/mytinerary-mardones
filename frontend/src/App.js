import Home from './pages/Home'
import Cities from './pages/Cities'
import E404 from './pages/E404'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/cities" render={() => <Cities heroImg={require('./assets/travels_pink.jpeg')}/>}></Route>
        <Route path="/signup" render={() => <SignUp heroImg={require('./assets/underconstruction.jpg')}></SignUp>} ></Route>
        <Route path="/login" render={() => <LogIn heroImg={require('./assets/underconstruction.jpg')}></LogIn>} ></Route>
        <Route path="/404" render={() => <E404 heroImg={require('./assets/e404.jpg')}/>}></Route>
        <Redirect to="/404"></Redirect>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

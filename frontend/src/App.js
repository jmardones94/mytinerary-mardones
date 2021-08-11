import Home from './pages/Home'
import Cities from './pages/Cities'
import E404 from './pages/E404'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import City from './components/City'

function App() {
//   const citiesData = [
//     {_id: 2, src:require('./assets/cities/toronto.jpg'),alt:'Toronto',name:'Toronto', country:'Canada'},
//     {_id: 1, src:require('./assets/cities/sydney.jpg'),alt:'Sydney',name:'Sydney', country:'Australia'},
//     {_id: 3, src:require('./assets/cities/london.jpg'),alt:'London',name:'London', country:'United Kingdom'},
//     {_id: 5, src:require('./assets/cities/venice.jpg'),alt:'Venice',name:'Venice', country:'Italy'},
//     {_id: 4, src:require('./assets/cities/berlin.jpg'),alt:'Berlin',name:'Berlin', country:'Germany'},
//     {_id: 7, src:require('./assets/cities/torresdelpaine.jpg'),alt:'Torres del Paine',name:'Torres del Paine', country:'Chile'},
//     {_id: 8, src:require('./assets/cities/buenosaires.jpg'),alt:'Buenos Aires',name:'Buenos Aires', country:'Argentina'},
//     {_id: 6, src:require('./assets/cities/madrid.jpg'),alt:'Madrid',name:'Madrid', country:'Spain'},
//     {_id: 9, src:require('./assets/cities/parislouvre.jpg'),alt:'Paris',name:'Paris', country:'France'},
//     {_id: 10, src:require('./assets/cities/rome.jpg'),alt:'Rome',name:'Rome', country:'Italy'},
//     {_id: 12, src:require('./assets/cities/tokyo.jpg'),alt:'Tokyo',name:'Tokyo', country:'Japan'},
//     {_id: 13, src:require('./assets/cities/newyork.jpg'),alt:'New York',name:'New York', country:'United States'},
//     {_id: 14, src:require('./assets/cities/moscow.jpg'),alt:'Moscow',name:'Moscow', country:'Russia'},
//     {_id: 15, src:require('./assets/cities/mexicocity.jpg'),alt:'Mexico name',name:'Mexico City', country:'Mexico'},
//     {_id: 11, src:require('./assets/cities/stockholm.jpg'),alt:'Stockholm',name:'Stockholm', country:'Sweden'},
// ]

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/cities" component={Cities}></Route>
        <Route path="/itineraries/:id" render={({ match }) => <City id={parseInt(match.params.id)} />} />
        <Route path="/signup" component={SignUp} ></Route>
        <Route path="/login" component={LogIn}></Route>
        <Route path="/404" component={E404}></Route>
        <Redirect to="/404"></Redirect>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import Home from "./pages/Home";
import Cities from "./pages/Cities";
import E404 from "./pages/E404";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import City from "./pages/City";
import Form from "./pages/Form/Form";
import FormUpdate from "./pages/Form/FormUpdate";
import FormDelete from "./pages/Form/FormDelete";
import FormAdd from "./pages/Form/FormAdd";

function App(props) {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/cities" component={Cities}></Route>
        <Route
          path="/itineraries/:id"
          render={(props) => <City {...props} id={props.match.params.id} />}
        />
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/login" component={LogIn}></Route>
        <Route exact path="/form" component={Form} />
        <Route path="/form/update" component={FormUpdate}></Route>
        <Route path="/form/delete" component={FormDelete}></Route>
        <Route path="/form/add" component={FormAdd}></Route>
        <Route path="/404" component={E404}></Route>
        <Redirect to="/404"></Redirect>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

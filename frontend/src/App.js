import Home from "./pages/Home"
import Cities from "./pages/Cities"
import E404 from "./pages/E404"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import City from "./pages/City"
import Form from "./pages/Form/Form"
import FormUpdate from "./pages/Form/FormUpdate"
import FormDelete from "./pages/Form/FormDelete"
import FormAdd from "./pages/Form/FormAdd"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import citiesActions from "./redux/actions/citiesActions"
import { useEffect } from "react"
import Loading from "./components/Loading"

function App({ getCities }) {
  useEffect(() => {
    const getData = async () => {
      try {
        await getCities()
      } catch (e) {
        console.error(e.message)
      }
    }
    getData()
    // eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/cities" component={Cities}></Route>
        <Route path="/itineraries/:id" component={City} />
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/login" component={LogIn}></Route>
        <Route exact path="/form" component={Form} />
        <Route path="/form/update" component={FormUpdate}></Route>
        <Route path="/form/delete" component={FormDelete}></Route>
        <Route path="/form/add" component={FormAdd}></Route>
        <Route path="/404" component={E404}></Route>
        <Route path="/loading" component={Loading} />
        <Redirect to="/404"></Redirect>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

const mapDispatchToProps = {
  getCities: citiesActions.getCities,
}

export default connect(null, mapDispatchToProps)(App)

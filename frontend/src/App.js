import Home from "./pages/Home"
import Cities from "./pages/Cities"
import E404 from "./pages/E404"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import City from "./pages/City"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import citiesActions from "./redux/actions/citiesActions"
import { useEffect, useState } from "react"
import Loading from "./components/Loading"
import Settings from "./pages/Settings"
import usersActions from "./redux/actions/usersActions"

function App({ getCities, logInLS, user }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user) {
          const { token, email } = user
          await logInLS(token, email)
        }
        await getCities()
      } catch (e) {
        console.error(e.message)
      }
    }
    getData().then(() => setLoading(false))
    // .catch(() => setLoading(false))
    // eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cities" component={Cities} />
          <Route path="/itineraries/:id" component={City} />
          <Route path="/signup" component={user ? Home : SignUp}></Route>
          <Route path="/login" component={user ? Home : LogIn} />
          <Route path="/404" component={E404} />
          <Route path="/settings" component={user ? Settings : Home} />
          <Redirect to="/404"></Redirect>
        </Switch>
      )}
      <Footer />
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}

const mapDispatchToProps = {
  getCities: citiesActions.getCities,
  logInLS: usersActions.logInLS,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

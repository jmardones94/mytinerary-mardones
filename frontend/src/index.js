import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./App"
import { applyMiddleware, createStore, compose } from "redux"
import { Provider } from "react-redux"
import rootReducer from "./redux/reducers/rootReducer"
import thunk from "redux-thunk"

let composeEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const globalStore = createStore(rootReducer, composeEnhancers)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

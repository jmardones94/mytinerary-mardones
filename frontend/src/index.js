import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./App"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import rootReducer from "./redux/reducers/rootReducer"
import thunk from "redux-thunk"

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

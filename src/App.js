import React from 'react';
import './App.css';

import reduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import AppReducer from './reducers/AppReducer';

import {BrowserRouter, Route, Switch} from "react-router-dom";

//screens
import Error from "./screens/error/Error";
import Home from './screens/home';
import HeroPage from "./screens/heroPage";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(AppReducer);

class App extends React.Component{
    render(){
      return (
        <BrowserRouter>
          <Switch>
            <Route path ="/" component={Home} exact />
            <Route path ="/heroPage/:id" component={HeroPage} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      );
    }
}

export default () =><Provider store={store}><App/></Provider>;

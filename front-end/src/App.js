import React, { lazy, Suspense, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// Components
import Navbar from './components/navbar';
import FallbackLoader from './components/fallbackLoader';

// Pages
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const Add = lazy(() => import('./pages/Add'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Recipe = lazy(() => import('./pages/Recipe'));
const Search = lazy(() => import('./pages/Search'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

class App extends Component {
  render() {
    return (
      <Router>
        <UserProvider>
          <Navbar />
          <Suspense fallback={<FallbackLoader />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile/:username" component={Profile} />
              <Route exact path="/add" component={Add} />
              <Route exact path="/recipes" component={Recipes} />
              <Route exact path="/recipes/:id" component={Recipe} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Suspense>
        </UserProvider>
      </Router>
    );
  }
}

export default App;

import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditPage from './pages/EditPage';
import CreatePage from './pages/CreatePage';
import IdeasPage from './pages/IdeasPage';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentUser,
  logout,
  login,
  loadingStart,
  getIdeasAsync,
} from './redux/session/sessionActions';
import LoginRequiredRoute from './routes/LoginRequiredRoute';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.session.loggedIn);
  const successMessage = useSelector((state) => state.session.successMessage);
  useEffect(() => {
    let unsubscribe = null;

    unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        loadingStart();
        const userRef = await createUserProfileDocument(authUser);
        userRef.onSnapshot((snapshot) => {
          const user = snapshot.data();
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...user,
            }),
          );
          dispatch(getIdeasAsync());
          dispatch(login());
        });
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div className="App">
      <ToastContainer autoClose={1800} />
      <Router>
        <Switch>
          <Route path="/" exact>
            {loggedIn ? (
              <Layout isIndexPage={true}>
                <IdeasPage />
              </Layout>
            ) : (
              <LoginPage />
            )}
          </Route>
          <LoginRequiredRoute path="/edit/:ideaId" component={EditPage} exact />
          <LoginRequiredRoute path="/create" exact component={CreatePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

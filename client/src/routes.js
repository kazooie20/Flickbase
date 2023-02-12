import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth } from './store/actions/users';
import { Loader } from './utils/tools';
import Home from './components/home'
import Header from './components/navigation/header';
import MainLayout from './hoc/main-layout';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import AuthGuard from './hoc/authGuard';

import AdminArticles from './components/dashboard/articles';
import AdminProfile from './components/dashboard/profile';
import DashboardMain from './components/dashboard/main';
import AddArticle from './components/dashboard/articles/edit_add/add';
import EditArticle from './components/dashboard/articles/edit_add/edit';
import Article from './components/articles/article';
import AccountVerify from './components/auth/verification';

const Router = () => {

  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  React.useEffect(() => {
    dispatch(isAuth());
  }, [])

  React.useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users])


  return (
    <BrowserRouter>
      {loading ? <Loader /> :
        <>
          <Header />
          <MainLayout>
            <Routes>
              
              <Route path='/dashboard' element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }>
              <Route index element={<DashboardMain />} />
                <Route path='profile' element={<AdminProfile />} />
                <Route path='articles' element={<AdminArticles />} />
                <Route path='articles/add' element={<AddArticle />} />
                <Route path='articles/edit/:articleId' element={<EditArticle/>}/>
              </Route>
              <Route path='/verification' element={<AccountVerify />} />
              <Route path='/articles/article/:id' element={<Article />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/' element={<Home />} />

            </Routes>
          </MainLayout>
        </>
      }
    </BrowserRouter>
  )
}

export default Router;

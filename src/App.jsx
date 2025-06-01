import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';


const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Search = lazy(() => import('./pages/Search'));
const Admin = lazy(() => import('./pages/Admin'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => {
  return (
    <Suspense fallback={<div className="text-center p-8 text-xl">Chargement...</div>}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;

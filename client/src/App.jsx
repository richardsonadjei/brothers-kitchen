import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import SignOut from './Pages/SignOut';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import SignUp from './pages/SignUp';
import MeatSales from './pages/MeatSales';






export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-out' element={<SignOut />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/add-meat-sale' element={<MeatSales/>} />
         
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
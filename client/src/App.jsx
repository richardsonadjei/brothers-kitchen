import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import SignOut from './pages/SignOut';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import MeatSales from './pages/MeatSales';
import PurchaseIngredients from './pages/PurchaseIngredient';
import DailySalesReport from './pages/reports/DailyMeatSalesReport';
import MeatSalesWithinAPeriodReport from './pages/reports/MeatSalesWithinAPeriodReport';
import GasPurchase from './pages/GasPurchase';
import PlatesAndBowlsPurchase from './pages/PlatesAndBowlPurchase';
import BusinessAssetsPurchase from './pages/BusinessAssetsPurchase';
import IngredientPurchaseReport from './pages/reports/IngredientPurchaseReport';
import GasPurchaseReport from './pages/reports/GasPurchaseReport';
import AssetsPurchaseReport from './pages/reports/AssetsPurchaseReport';
import PlatesAndBowlsPurchaseReport from './pages/reports/BowlsPurchaseReport';






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
          <Route path='/purchase-ingreident' element={<PurchaseIngredients/>} />
          <Route path='/daily-meat-sales-report' element={<DailySalesReport/>} />
          <Route path='/period-meat-sales-report' element={<MeatSalesWithinAPeriodReport/>} />
          <Route path='/gas-purchase' element={<GasPurchase/>} />
          <Route path='/plates-purchase' element={<PlatesAndBowlsPurchase/>} />
          <Route path='/business-assets-purchase' element={<BusinessAssetsPurchase/>} />
          <Route path='/ingedient-purchase-report' element={<IngredientPurchaseReport/>} />
          <Route path='/gas-purchase-report' element={<GasPurchaseReport/>} />
          <Route path='/assets-purchase-report' element={<AssetsPurchaseReport/>} />
          <Route path='/bowls-purchase-report' element={<PlatesAndBowlsPurchaseReport/>} />
         
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
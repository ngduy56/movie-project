import { initializeApp } from "firebase/app";
import { Route, Routes } from 'react-router-dom';
import 'swiper/swiper.min.css';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import Catalog from './components/pages/Catalog';
import Detail from './components/pages/detail/Detail';
import Home from './components/pages/Home';
import Onboarding from './components/pages/onboarding/Onboarding';
import Welcome from './components/welcome/Welcome';

const firebaseConfig = {
  apiKey: "AIzaSyDmjIPAVrQWEJNp2c6MNjfQSYTjgp0K1TI",
  authDomain: "the-movies-adb13.firebaseapp.com",
  projectId: "the-movies-adb13",
  storageBucket: "the-movies-adb13.appspot.com",
  messagingSenderId: "912741500794",
  appId: "1:912741500794:web:ad2ceb37e464b3f8f2b8c3"
};
const app = initializeApp(firebaseConfig);

function App() {
    return (
         <>
          <Routes>
               <Route path='/:category/search/:keyword' element={<Catalog />} />
               <Route path='/:category/:id' element={<Detail />} />
               <Route path='/:category' element={<Catalog />} />
               <Route path='/home' element={<Home />} />
               <Route path='/onboarding' element={<Onboarding />} />
               <Route path='/' exact element = {<Welcome />} />
          </Routes>
         </>
    );
}
export default App;

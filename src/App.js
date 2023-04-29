import './App.scss';
import { Header } from './components/Header/header';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HeaderBanner } from './components/Header-Banner/header-banner';
import { Categories } from './components/Categories/categories';


function App() {
  return (
    <div className="root-wrap">
      <Header />
      <HeaderBanner />
      <Categories />
    </div>
  );
}

export default App;

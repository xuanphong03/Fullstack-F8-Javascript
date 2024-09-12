import { Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import DefaultLayout from './layouts/DefaultLayout';
import Home from './pages/Home';

function App() {
  return (
    <div className="font-roboto">
      <Header />
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </DefaultLayout>
      <Footer />
    </div>
  );
}

export default App;

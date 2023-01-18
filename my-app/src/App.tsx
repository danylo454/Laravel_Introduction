import Home from './components/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/containers/default';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

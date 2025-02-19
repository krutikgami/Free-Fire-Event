import { createRoot } from 'react-dom/client';
import AdminTable from './AdminTable';
import ProtectedRoute from './protectedRoute';
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Home from './home';
import Day2Scores from './day2match';
import UserTable from './UserTable';
import './index.css';

createRoot(document.getElementById('root')).render(
<Router>
    <Routes>
    <Route path='/' element={<Home />} /> 
    <Route element={< ProtectedRoute/>}>
    <Route path='/admin' element={<AdminTable />} />
    </Route>
    <Route path='/day1-scores' element={<UserTable />} />
    <Route path='/day2-scores' element={<Day2Scores/>}/>
</Routes>
</Router>
);
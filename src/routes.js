import {
    Routes,
    Route
  } from "react-router-dom";
import Login from "./Login/login";
import { BrowserRouter, Link, Outlet, useRoutes } from 'react-router-dom';
function Router() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
         </BrowserRouter>  
    );

}
export default Router;
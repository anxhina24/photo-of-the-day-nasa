import {BrowserRouter, Routes, Route} from "react-router-dom";
import PhotoList from "../components/PhotoList";
import PhotoPage from "../components/PhotoPage";

const AppRouter = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PhotoList />} />
                <Route path={'/photo/:id'} element={<PhotoPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;

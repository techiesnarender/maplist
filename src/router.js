import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyList from "./clist";
import Header from './header';
import Registration from "./registration";
function MainRouter(){
    return(
        <>
         <Router>
            <Header/>
            <Routes>
                <Route path="/" element={ <Registration/>}/>
                <Route path="/companyList" element={<CompanyList/>}/>
            </Routes>
         </Router>
        </>
    )
}

export default MainRouter
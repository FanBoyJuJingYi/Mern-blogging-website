import { Routes,Route} from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthFrom from "./pages/userAuthForm.page";

const App = () => {
    return (
       <Routes>
            <Route path="/" element={<Navbar/>}>
                <Route path="/signin" element={<UserAuthFrom type="sign-in"/>}/>
                <Route path="/signup" element={<UserAuthFrom type="sign-up"/>}/>
                
            </Route>
       </Routes>
    );
}

export default App;
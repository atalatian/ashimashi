import { Route, Routes } from "react-router";
import Index from "./pages/index";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
        </Routes>
    );
}

export default App;

import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Mainpages from "./components/Mainpages/Page";
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Mainpages /> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Details from "./components/details";

import { Container, CssBaseline } from "@material-ui/core";
function App() {
  return (
    <Router>
      <CssBaseline />
      <Container className="main">
        <h2 className="main-header">StartUp Defenders</h2>
        <div>
          <Route exact path="/create" component={Create} />
        </div>
        <div>
          <Route exact path="/detail" component={Details} />
        </div>
        <div style={{ marginTop: 20, width: "85%" }}>
          <Route exact path="/" component={Read} />
        </div>

        <Route path="/update" component={Update} />
      </Container>
    </Router>
  );
}

export default App;

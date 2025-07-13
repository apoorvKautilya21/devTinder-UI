import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./views/Body";
import Login from "./views/Login";
import Profile from "./views/Profile";
import { Provider } from "react-redux";
import store from "./utils/appStore";
import Feed from "./views/Feed";
import Connections from "./views/Connections";
import Requests from "./views/Requests";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

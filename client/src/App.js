import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Ad from "./components/Ad";
import AdForm from "./components/AdForm";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import ChatLogin from "./pages/Login";
import ChatRegister from "./pages/Register";
import Chat from "./pages/Chat";
import SetAvatar from "./components/SetAvatar";
import NotFound from "./components/NotFound";
// Actions
import { loadUser } from "./actions/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import PurchaseList from "./components/PurchaseList";
import AdList from "./components/AdList";
import Checkout from "./components/Checkout";

function App() {
  // Load user
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ads/:adId" element={<Ad />} />
          <Route path="/postad" element={<AdForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchased" element={<PurchaseList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myads" element={<AdList/>} />
          <Route path="/purchaseList" element={<PurchaseList />} />
          <Route path="/chatregister" element={<ChatRegister />} />
          <Route path="/chatlogin" element={<ChatLogin />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/checkout/:adId" element={<Checkout/>}/>
        </Routes>

      </BrowserRouter>
    </Provider>
  );
}

export default App;

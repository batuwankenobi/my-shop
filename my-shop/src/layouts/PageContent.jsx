import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "../page/HomePage";
import ProductList from "../page/ProductList";
import AboutUs from "../page/AboutUs";
import Team from "../page/Team";
import Contact from "../page/Contact";
import ProductPage from "../page/ProductPage";
import SignUp from "../page/SignUp";
import Login from "../page/Login";
import ShoppingCart from "../page/ShoppingCart";
import ProtectedCreateOrder from "../components/ProtectedCreateOrder";
import OlderOrders from "../page/OlderOrders";

export default function PageContent() {
    return (
        <Switch>
            <Route path="/shop/:gender?/:category?">
                <ProductList />
            </Route>
            <Route path="/shoppingCart">
                <ShoppingCart />
            </Route>
            <Route path="/orderCompleted">
                <OlderOrders />
            </Route>
            <Route path="/createOrder">
                <ProtectedCreateOrder />
            </Route>
            <Route path="/about">
                <AboutUs />
            </Route>
            <Route path="/team">
                <Team />
            </Route>
            <Route path="/contact">
                <Contact />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route path="/:category?/:productId?/:productNameSlug?">
                <ProductPage />
            </Route>
        </Switch>
    )
}
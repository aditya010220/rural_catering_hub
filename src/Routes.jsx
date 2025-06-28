import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomeLandingPage from "pages/home-landing-page";
import ShoppingCartCheckout from "pages/shopping-cart-checkout";
import AuthenticationLoginRegister from "pages/authentication-login-register";
import CatererAdminDashboard from "pages/caterer-admin-dashboard";
import UserAccountDashboard from "pages/user-account-dashboard";
import ProductCatalogBrowse from "pages/product-catalog-browse";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeLandingPage />} />
        <Route path="/home-landing-page" element={<HomeLandingPage />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/caterer-admin-dashboard" element={<CatererAdminDashboard />} />
        <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
        <Route path="/product-catalog-browse" element={<ProductCatalogBrowse />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
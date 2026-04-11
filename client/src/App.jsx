import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./Layout/Layout"
import { RouteCategoriesAdd, RouteCategoriesDetails, RouteCategoriesEdit, RouteErrorPage, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from "./helpers/routeName"
import Index from "./pages/Index"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Error from "./pages/Error"
import Profile from "./pages/Profile"
import AddCategories from "./pages/categories/AddCategories"
import CategoriesDetails from "./pages/categories/CategoriesDetails"
import EditCategories from "./pages/categories/EditCategories"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteCategoriesAdd} element={<AddCategories />} />
          <Route path={RouteCategoriesDetails} element={<CategoriesDetails />} />
          <Route path={RouteCategoriesEdit} element={<EditCategories />} />

        </Route>

        {/* dont want Layout to be seen in signup & signin page that why creating route separately*/}
        <Route path={RouteSignUp} element={<SignUp />} />
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route />
        <Route path={RouteErrorPage} element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
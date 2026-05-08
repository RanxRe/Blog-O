import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./Layout/Layout"
import { RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoriesAdd, RouteCategoriesDetails, RouteCategoriesEdit, RouteComments, RouteErrorPage, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUsers } from "./helpers/routeName"
import Index from "./pages/Index"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Error from "./pages/Error"
import Profile from "./pages/Profile"
import AddCategories from "./pages/categories/AddCategories"
import CategoriesDetails from "./pages/categories/CategoriesDetails"
import EditCategories from "./pages/categories/EditCategories"
import AddBlog from "./pages/blog/AddBlog"
import BlogDetails from "./pages/blog/BlogDetails"
import EditBlog from "./pages/blog/EditBlog"
import BlogDetailSingle from "./pages/blog/BlogDetailSingle"
import BlogByCategory from "./pages/blog/BlogByCategory"
import SearchResult from "./pages/SearchResult"
import Comments from "./pages/Comments"
import Users from "./pages/Users"
import AuthRouteProtection from "./components/AuthRouteProtection"
import AuthRouteProtectionAdmin from "./components/AuthRouteProtectionAdmin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          {/* Blogs route */}
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteBlogDetails()} element={<BlogDetailSingle />} />
          <Route path={RouteSearch()} element={<SearchResult />} />

          {/* User Routes */}
          <Route element={<AuthRouteProtection />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            {/* Comment route */}
            <Route path={RouteComments} element={<Comments />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AuthRouteProtectionAdmin />}>
            {/* Users */}
            <Route path={RouteUsers} element={<Users />} />
            {/* Categories route */}
            <Route path={RouteCategoriesAdd} element={<AddCategories />} />
            <Route path={RouteCategoriesDetails} element={<CategoriesDetails />} />
            <Route path={RouteCategoriesEdit} element={<EditCategories />} />
          </Route>

        </Route>

        {/* dont want Layout to be seen in signup & signin page that why creating route separately*/}
        <Route path={RouteSignUp} element={<SignUp />} />
        <Route path={RouteSignIn} element={<SignIn />} />

        <Route path={RouteErrorPage} element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
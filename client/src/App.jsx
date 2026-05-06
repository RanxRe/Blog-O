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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

          {/* Categories route */}
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteCategoriesAdd} element={<AddCategories />} />
          <Route path={RouteCategoriesDetails} element={<CategoriesDetails />} />
          <Route path={RouteCategoriesEdit} element={<EditCategories />} />

          {/* Blogs route */}
          <Route path={RouteBlogAdd} element={<AddBlog />} />
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogEdit()} element={<EditBlog />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteBlogDetails()} element={<BlogDetailSingle />} />
          <Route path={RouteSearch()} element={<SearchResult />} />

          {/* Users */}
          <Route path={RouteUsers} element={<Users />} />

          {/* Comment route */}
          <Route path={RouteComments} element={<Comments />} />

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
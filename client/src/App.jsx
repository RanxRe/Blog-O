import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./Layout/Layout"
import { RouteErrorPage, RouteIndex, RouteSignIn, RouteSignUp } from "./helpers/routeName"
import Index from "./pages/Index"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Error from "./pages/Error"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
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
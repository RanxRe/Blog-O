import { Button } from "@/components/ui/button"
import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./Layout/Layout"
import { RouteIndex } from "./helpers/routeName"
import Index from "./pages/Index"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
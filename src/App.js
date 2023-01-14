import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Todo from "./pages/Todo";

function App() {

  let router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Todo" element={<Todo />}></Route>
    </Route>
  ));

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import UserPage from "./pages/User/UserPage";
import RootLayout from "./pages/RootLayout";
import SingleUserPage from "./pages/SingleUserPage";
import Useredits from "./components/Modals/Useredits";
import ProductList from "./pages/ProductList/ProductList";
import Transactions from "./pages/Transactions/Transactions";
import Agents from "./pages/Agents/Agents";
import PendingPayments from "./pages/PendingPayments/PendingPayments";
import JoinRequest from "./pages/JoinRequest/JoinRequest";
import NotJoined from "./pages/NotJoined/NotJoined";
import AddcategoryModal from "./components/Modals/AddCategoryModal/AddcategoryModel";
import AddUserModal from "./components/Modals/AddUserModal/AddUserModal";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/" ,
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/users", element: <UserPage /> },
      { path: "/users/singleuser/:id", element: <SingleUserPage /> },
      { path: "/users/singleuser/useredits", element: <Useredits /> },
      { path: "/agents", element: <Agents /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "/pendingpayments", element: <PendingPayments /> },
      { path: "/joinRequests", element: <JoinRequest /> },
      { path: "/productlist", element: <ProductList /> },
      { path: "/notjoined", element: <NotJoined /> },
      { path: "/productcategory", element: <AddcategoryModal /> },
      { path: "/passwordmodal", element: <AddUserModal /> },
    ],
  },
]);

function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated === true || token) {
    return <RouterProvider router={router} />;
  } else {
    return <LoginPage />;
  }
}

export default App;

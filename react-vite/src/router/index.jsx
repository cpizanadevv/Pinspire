import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import FileUpload from '../components/FileUpload/FileUpload';
import Layout from './Layout';
import Profile from '../components/Profile/ProfilePage'
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "upload",
        element: <FileUpload />,
      },
      {
        path:"/profile",
        element: <Profile />
      }
    ],
  },
]);

import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import FileUpload from '../components/FileUpload/FileUpload';
import Layout from './Layout';
import EditPin from '../components/EditPin/EditPin';
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
        path: "pins/:pinId/edit",
        element: <EditPin />,
      },
      {
        path:"/profile",
        element: <Profile />
      }
    ],
  },
]);

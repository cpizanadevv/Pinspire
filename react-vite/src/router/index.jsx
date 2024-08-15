import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import FileUpload from '../components/FileUpload/FileUpload';
import Layout from './Layout';
import EditPin from '../components/EditPin/EditPin';
import Profile from '../components/Profile/ProfilePage'
import Boards from '../components/Board/BoardPage'
import OneBoard from '../components/Board/OneBoard'
import CreateBoard from '../components/Board/CreateBoard'
import PutBoard from '../components/Board/EditBoard'

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
        path: "/:userId",
        element: <Profile />
      },
      {
        path: "/boards",
        element: <Boards />
      },
      {
        path: "/boards/:boardId",
        element: <OneBoard />
      },
      {
        path: "/boards/create",
        element: <CreateBoard />
      },
      {
        path: "/boards/:boardId/edit",
        element: <PutBoard />
      }
    ],
  },
]);

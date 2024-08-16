import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import CreatePin from '../components/CreatePin/CreatePin';
import ViewPin from '../components/ViewPin/ViewPin';
import Layout from './Layout';
import Profile from '../components/Profile/ProfilePage'
import Boards from '../components/Board/BoardPage'
import OneBoard from '../components/Board/OneBoard'
import CreateBoard from '../components/Board/CreateBoard'
import PutBoard from '../components/Board/EditBoard'
import LandingPage from '../components/LandingPage'
import SearchPins from '../components/LandingPage/SearchPins';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
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
        path: "create",
        element: <CreatePin />,
      },
      {
        path: "/pin/:pinId",
        element: <ViewPin />,
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
        path: "/pins/:keyword",
        element: <SearchPins />
      },
    ],
  },
]);

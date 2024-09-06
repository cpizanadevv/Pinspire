import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import CreatePin from '../components/CreatePin/CreatePin';
import ViewPin from '../components/ViewPin/ViewPin';
import Layout from './Layout';
// import Profile from '../components/Profile/ProfilePage'
import OneBoard from '../components/Board/OneBoard'
import CreateBoard from '../components/Board/CreateBoard'
// import PutBoard from '../components/Board/EditBoard'
import LandingPage from '../components/LandingPage'
import SearchPins from '../components/LandingPage/SearchPins';
import NewProfile from '../components/NewProfile/NewProfile';
import ProfileFavorites from '../components/ProfileFavorites/ProfileFavorites';
import ProfileCreated from '../components/ProfileCreated/ProfileCreated'
import ProfileSaved from '../components/ProfileSaved/ProfileSaved'
import Loader from '../components/Loader/Loader';
import AboutPage from '../components/AboutPage/AboutPage'

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
        element: <NewProfile />,
        children: [
          {
            index: true,
            element: <Navigate to="saved" />,
          },
          {
            path: "saved",
            element: <ProfileSaved />,
          },
          {
            path: "created",
            element: <ProfileCreated />,
          },
          {
            path: "favorites",
            element: <ProfileFavorites />,
          },
        ],
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
      {
        path: '/loader',
        element: <Loader/>
      },
      {
        path: '/about-page',
        element: <AboutPage />
      }
    ],
  },
]);

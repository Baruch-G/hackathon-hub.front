import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { tabs } from './components/footer/Tabs';
import { GoogleOAuthProvider } from '@react-oauth/google';


const router = createBrowserRouter(tabs);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId='882879992824-htguepm443q92lmg7b6ga421cnmlbm2k.apps.googleusercontent.com'>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>,
)

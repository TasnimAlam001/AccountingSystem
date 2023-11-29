import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
// import GroupEntry from './Components/Home/GroupEntry/GroupEntry';
// import GroupSelector from './Components/GroupSelector/GroupEntry';
import GroupEntry from './Components/GroupSelector/GroupEntry';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
    children:[
      {
        path:"/groupEntry",
        element:<GroupEntry></GroupEntry>

      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

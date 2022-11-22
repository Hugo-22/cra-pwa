import React from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import Form from './components/Form';
import Hack from './components/Hack';

import './App.css';


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Form />,
        },
        {
            path: "/hack",
            element: <Hack />,
        },
    ]);


  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;


import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout2 from '../components/ui/Layout2';

export default function Dashboard() {
  return (
    <Layout2>
      
      <Outlet />
    </Layout2>
  );
}
// ...imports

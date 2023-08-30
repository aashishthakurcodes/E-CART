import React from 'react';
import Layout from '../Components/Layout/Layout';
import UserMenu from '../Components/Layout/UserMenu';
import { useAuth } from '../Context/auth';
import '../CSS/dashboard.css';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard E-Commerce"} >
      <div className='dashboard'>
        <div>
          <h1>Welcome {auth?.user?.name}</h1>
        </div>
        <div className='dashboard_cont'>
          {/* Content of the container */}
        
        
          <div className='username'>
            <UserMenu />
          </div>
          <div className='userData'> 
            
              <div>
              <h3>Name: {auth?.user?.name}</h3>
              </div>
              <div>
              <h3>E-mail: {auth?.user?.email}</h3>
              </div>
              <div>
              <h3>Phone: {auth?.user?.phone}</h3>
              </div>
              <div>
              <h3>Address: {auth?.user?.address}</h3>
              </div>
            </div>
          </div>
        </div>
      
      
    </Layout>
  );
};

export default Dashboard;

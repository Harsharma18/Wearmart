import React from 'react'
import { useSelector } from 'react-redux'
import { useGetAdminStatsQuery } from '../../../../redux/Stats/statApi';
import AdminStats from './AdminStats';
import AdminStatsChart from './AdminStatsChart';
import UserDashboardLayout from '../../UserDashboardLayout';
import DashboardSkelton from '../../../../components/DashboardSkelton';

function AdminDMain() {
    const {user} = useSelector((state)=>state.auth);
    const {data:stats={},isLoading,isError} = useGetAdminStatsQuery();
    console.log("Admin main dashboard data",stats);
     if(isLoading) return   <div className="text-center text-gray-500"><DashboardSkelton/></div>
    if(!stats) return <div>No stats found</div>
    if(isError) return <div>Failed to load stats!</div>
  return (
    <div className='p-6'>
        <div>
            <h1 className='text-2xl font-semibold mb-4'>Admin Dashboard</h1>
            <p className='text-gray-500'>Hi, {user?.username}! Welcome to the Admin Dashboard.</p>
            
           <AdminStats stats={stats}/>
           <AdminStatsChart stats={stats}/>
        </div>
    </div>
  )
}

export default AdminDMain
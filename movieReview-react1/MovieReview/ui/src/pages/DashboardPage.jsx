
import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
 
      <aside className="w-64 bg-white text-black p-6">
        <h2 className="text-2xl font-bold mb-8">movie review Admin</h2>
        <nav className="space-y-4">
         
          <Link
  to="/addmovie"     
  className="block py-2 px-4 rounded "
>
  Add Movie  
</Link>          
                              

        </nav>
      </aside>

    
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
       
      </main>
    </div>
  );
};

export default DashboardPage;

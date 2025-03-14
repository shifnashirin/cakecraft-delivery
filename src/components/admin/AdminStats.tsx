
import { Cake, ShoppingBag, Users, Calendar } from "lucide-react";

interface AdminStatsProps {
  cakeCount: number;
  orderCount: number;
  pendingOrderCount: number;
}

const AdminStats = ({ cakeCount, orderCount, pendingOrderCount }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
        <div>
          <p className="text-cake-text/60 text-sm">Total Products</p>
          <p className="text-3xl font-bold text-cake-text">{cakeCount}</p>
        </div>
        <div className="bg-cake-primary/10 p-3 rounded-full">
          <Cake className="h-8 w-8 text-cake-primary" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
        <div>
          <p className="text-cake-text/60 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-cake-text">{orderCount}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <ShoppingBag className="h-8 w-8 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
        <div>
          <p className="text-cake-text/60 text-sm">Total Customers</p>
          <p className="text-3xl font-bold text-cake-text">158</p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <Users className="h-8 w-8 text-green-500" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
        <div>
          <p className="text-cake-text/60 text-sm">Pending Orders</p>
          <p className="text-3xl font-bold text-cake-text">{pendingOrderCount}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-full">
          <Calendar className="h-8 w-8 text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;

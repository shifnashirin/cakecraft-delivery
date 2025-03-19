import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

interface OrdersTabProps {
  orders: Order[];
  handleUpdateOrderStatus: (id: string, status: string) => void;
}

const OrdersTab = ({ orders, handleUpdateOrderStatus }: OrdersTabProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-cake-text">Recent Orders</h2>

        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search orders..." className="pl-10" />
          </div>

          <Button variant="outline" className="border-gray-200 text-cake-text">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-cake-text">
                    {order.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cake-text">
                    {order.customerName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cake-text">{order.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cake-text">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.items.length} items
                  </div>
                  {/* Show item details (Optional) */}
                  <ul className="text-xs text-gray-500">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} ({item.quantity}x)
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                    ${
                      order.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : ""
                    }
                    ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : ""
                    }
                    ${
                      order.status === "delivered"
                        ? "bg-purple-100 text-purple-800"
                        : ""
                    }
                  `}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    {order.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() =>
                          handleUpdateOrderStatus(order.id, "processing")
                        }
                      >
                        Process
                      </Button>
                    )}
                    {order.status === "processing" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() =>
                          handleUpdateOrderStatus(order.id, "completed")
                        }
                      >
                        Complete
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-cake-text border-gray-200 hover:bg-gray-50"
                    >
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTab;

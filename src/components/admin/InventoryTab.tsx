
import React from "react";
import { Search, Plus, Edit, XCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cake } from "@/lib/data";

interface InventoryTabProps {
  cakes: Cake[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleUpdateAvailability: (id: string, isAvailable: boolean) => void;
}

const InventoryTab = ({ 
  cakes, 
  searchTerm, 
  setSearchTerm, 
  handleUpdateAvailability 
}: InventoryTabProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-cake-text">Cake Inventory</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search cakes..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button className="bg-cake-primary hover:bg-cake-dark text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add New Cake
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cakes.map((cake) => (
              <tr key={cake.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img 
                        src={cake.image} 
                        alt={cake.name} 
                        className="h-10 w-10 rounded-md object-cover" 
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&w=800&h=600";
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-cake-text">{cake.name}</div>
                      <div className="text-xs text-gray-500">{cake.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cake-text">${cake.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cake-text">
                    {cake.category || "General"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-cake-text">
                    {cake.rating} 
                    <span className="ml-1 text-yellow-400">★</span>
                    <span className="ml-1 text-xs text-gray-500">({cake.reviews})</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {cake.isAvailable !== false ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {cake.isAvailable !== false ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleUpdateAvailability(cake.id, false)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2 text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleUpdateAvailability(cake.id, true)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {cakes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-cake-text/60">No cakes found</p>
        </div>
      )}
    </div>
  );
};

export default InventoryTab;

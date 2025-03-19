import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, XCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import CreateProduct from "../../pages/Createproduct"; // Import modal component

const InventoryTab = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Products from Firestore
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update product availability
  const handleUpdateAvailability = async (id, inStock) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { inStock });

      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, inStock } : product
        )
      );
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-cake-text">Product Inventory</h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="bg-cake-primary hover:bg-cake-dark text-white"
          >
           
            {!isModalOpen ? <span className="flex gap-2 items-center"> <Plus className="h-4 w-4 mr-2" />Add New Product</span> : 'Cancel'}
          </Button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="overflow-x-auto">
        {isModalOpen ? (
          <>
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition duration-300"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <CreateProduct
              onClose={() => {
                setIsModalOpen(false);
                fetchProducts(); // Refresh inventory after new product creation
              }}
            />
          </>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Availability
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.imageURL}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/100";
                        }}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-cake-text">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-cake-text">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-cake-text">
                      {product.category || "General"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {product.inStock ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Out of Stock
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
                      <Button
                        variant="outline"
                        size="sm"
                        className={`h-8 px-2 ${
                          product.inStock
                            ? "text-red-600 border-red-200 hover:bg-red-50"
                            : "text-green-600 border-green-200 hover:bg-green-50"
                        }`}
                        onClick={() =>
                          handleUpdateAvailability(product.id, !product.inStock)
                        }
                      >
                        {product.inStock ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InventoryTab;

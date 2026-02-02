import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { X } from "lucide-react";

const categories = ["All", "Tractor", "Implements", "Harvester", "Sowing"];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null); // modal data

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((item) =>
      activeCategory === "All" ? true : item.category === activeCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="relative pt-32 pb-20 min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold text-green-900 mb-4">
          Our Equipment Fleet
        </h1>
        <p className="text-green-700 max-w-2xl mx-auto text-lg">
          Explore our modern, well-maintained machinery available for rent.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mt-10 mb-8">
        <input
          type="text"
          placeholder="Search equipment..."
          className="w-full px-5 py-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mt-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm border
              ${activeCategory === cat
                ? "bg-green-600 text-white shadow-lg border-green-700"
                : "bg-white text-green-700 border-green-200 hover:bg-green-50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-green-700">No products found.</p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-green-200 shadow-md hover:shadow-2xl transition-all group"
              >
                {/* Image Section */}
                <div className="h-52 bg-green-50 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-100">
                      <span className="text-green-600 font-bold uppercase">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-green-700 uppercase bg-green-100 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <span className="text-lg font-extrabold text-green-700">
                      {product.price}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-green-700 transition-colors">
                    {product.name}
                  </h3>

                  {/* BUTTON → Opens Modal */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl border border-green-200"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-slate-600 hover:text-red-500"
              >
                <X size={26} />
              </button>

              {/* Image */}
              <div className="w-full h-56 bg-green-50 rounded-xl mb-5 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full object-contain p-3"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-extrabold text-green-800">
                {selectedProduct.name}
              </h2>

              {/* Category + Price */}
              <div className="flex justify-between mt-3 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs uppercase">
                  {selectedProduct.category}
                </span>
                <span className="text-xl font-extrabold text-green-700">
                  {selectedProduct.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed mb-6">
                {selectedProduct.description ||
                  "This equipment is well-maintained and ready for your farm operations."}
              </p>

              {/* CTA */}
              <button className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md">
                Rent Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;

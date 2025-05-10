import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const ProductCard = ({ crop, onClick }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(crop)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={crop.image || "/api/placeholder/400/300"} 
          alt={crop.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{crop.name}</h3>
            <p className="text-sm text-gray-500 italic">{crop.scientificName}</p>
          </div>
          <span className="text-lg font-semibold text-green-600">${crop.price.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {crop.category}
          </span>
          <span className="text-sm text-gray-600">
            {crop.stock} {t("marketplace.inStock", "in stock")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  crop: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    scientificName: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default ProductCard;
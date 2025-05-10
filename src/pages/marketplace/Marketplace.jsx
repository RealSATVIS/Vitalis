import React,{ useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Select } from "../../components/ui/select";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../../components/ui/dialog";

// importing the exotic crops images
import dragonFruitImg from "../../assets/marketplace/dragon-fruit.jpg";
import purpyam from "../../assets/marketplace/purple-yam.jpg";
import blackrice from "../../assets/marketplace/black-rice.jpeg";
import roman from "../../assets/marketplace/romanesco.jpeg";
import cher from "../../assets/marketplace/cherimoya.jpeg"
import rabi from "../../assets/marketplace/kohlrabi.jpeg"
import mango from "../../assets/marketplace/mangosteen.jpg";
import quinoa from "../../assets/marketplace/quinoa.jpeg";




const exoticCrops = [
  {
    id: 1,
    name: "Dragon Fruit",
    scientificName: "Hylocereus undatus",
    image: dragonFruitImg,
    price: 12.99,
    origin: "Asia",
    category: "Fruit",
    stock: 25,
    description: "This vibrant pink fruit with white flesh and black seeds has a subtle sweetness and is rich in antioxidants."
  },
  {
    id: 2,
    name: "Purple Yam",
    scientificName: "Dioscorea alata",
    image: purpyam,
    price: 8.50,
    origin: "Philippines",
    category: "Root",
    stock: 40,
    description: "Also known as Ube, this purple tuber has a mildly sweet, nutty flavor and is commonly used in desserts."
  },
  {
    id: 3,
    name: "Black Rice",
    scientificName: "Oryza sativa",
    image: blackrice,
    price: 9.99,
    origin: "China",
    category: "Grain",
    stock: 100,
    description: "Ancient grain with a deep black color and nutty flavor, rich in antioxidants and nutritional value."
  },
  {
    id: 4,
    name: "Romanesco Broccoli",
    scientificName: "Brassica oleracea",
    image: roman,
    price: 6.75,
    origin: "Italy",
    category: "Vegetable",
    stock: 15,
    description: "Fascinating vegetable with fractal-like spirals and a nutty, slightly sweet flavor."
  },
  {
    id: 5,
    name: "Cherimoya",
    scientificName: "Annona cherimola",
    image: cher,
    price: 14.50,
    origin: "South America",
    category: "Fruit",
    stock: 10,
    description: "Known as 'custard apple', features creamy white flesh with a blend of tropical flavors resembling banana, pineapple, and strawberry."
  },
  {
    id: 6,
    name: "Kohlrabi",
    scientificName: "Brassica oleracea gongylodes",
    image: rabi,
    price: 4.25,
    origin: "Europe",
    category: "Vegetable",
    stock: 30,
    description: "Bulbous vegetable with a mild, sweet flavor similar to broccoli stems and cabbage hearts."
  },
  {
    id: 7,
    name: "Mangosteen",
    scientificName: "Garcinia mangostana",
    image: mango,
    price: 18.99,
    origin: "Southeast Asia",
    category: "Fruit",
    stock: 12,
    description: "Purple fruit with sweet white segments inside. Known as the 'queen of fruits' for its delicate flavor."
  },
  {
    id: 8,
    name: "Quinoa",
    scientificName: "Chenopodium quinoa",
    image: quinoa,
    price: 7.50,
    origin: "Peru",
    category: "Grain",
    stock: 200,
    description: "Ancient grain celebrated for its complete protein content, with a fluffy texture when cooked."
  }
];

const Marketplace = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    let results = [...exoticCrops];

    if (searchQuery) {
      results = results.filter((crop) =>
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter((crop) => crop.category === selectedCategory);
    }

    switch (sortOption) {
      case "name-asc":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredCrops(results);
  }, [searchQuery, selectedCategory, sortOption]);

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    setIsDialogOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const categories = [...new Set(exoticCrops.map((crop) => crop.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {t("marketplace.title", "Exotic Crop Marketplace")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("marketplace.subtitle", "Discover rare and unique species for your garden")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t("marketplace.searchPlaceholder", "Search exotic crops...")}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="w-48">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">{t("marketplace.allCategories", "All Categories")}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {t(`marketplace.category.${category.toLowerCase()}`, category)}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-48">
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="name-asc">{t("marketplace.sort.nameAsc", "Name (A-Z)")}</option>
                <option value="name-desc">{t("marketplace.sort.nameDesc", "Name (Z-A)")}</option>
                <option value="price-asc">{t("marketplace.sort.priceLow", "Price (Low-High)")}</option>
                <option value="price-desc">{t("marketplace.sort.priceHigh", "Price (High-Low)")}</option>
              </Select>
            </div>
          </div>
        </div>

        <p className="mb-4 text-gray-600">
          {t("marketplace.resultsCount", "Showing {{count}} results", { count: filteredCrops.length })}
        </p>

        {filteredCrops.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCrops.map((crop) => (
              <motion.div
                key={crop.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCropSelect(crop)}
                variants={itemVariants}
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
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              {t("marketplace.noResults", "No crops found. Try adjusting your filters.")}
            </p>
          </div>
        )}
      </main>

      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedCrop && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCrop.name}</DialogTitle>
                <DialogDescription className="text-gray-500 italic">{selectedCrop.scientificName}</DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <div className="h-64 overflow-hidden rounded-lg mb-4">
                  <img
                    src={selectedCrop.image || "/api/placeholder/600/400"}
                    alt={selectedCrop.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm text-gray-500">{t("marketplace.product.price", "Price")}</h4>
                    <p className="text-xl font-semibold text-green-600">${selectedCrop.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">{t("marketplace.product.origin", "Origin")}</h4>
                    <p>{selectedCrop.origin}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">{t("marketplace.product.category", "Category")}</h4>
                    <p>{selectedCrop.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">{t("marketplace.product.stock", "Stock")}</h4>
                    <p>{selectedCrop.stock} {t("marketplace.units", "units")}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 mb-1">{t("marketplace.product.description", "Description")}</h4>
                  <p className="text-gray-700">{selectedCrop.description}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">{t("marketplace.product.quantity", "Quantity")}:</span>
                    <Select className="w-20">
                      {[...Array(Math.min(10, selectedCrop.stock)).keys()].map(i => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </Select>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    {t("marketplace.product.addToCart", "Add to Cart")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;

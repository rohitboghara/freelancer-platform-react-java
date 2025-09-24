import { Link } from "react-router-dom";


const categories = [
  { name: "Development & IT", icon: "https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/category1.svg", path: "/category/Development & IT" },
  { name: "Design & Creative", icon: "https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/category4.svg", path: "/category/Design & Creative" },
  { name: "Digital Marketing", icon: "https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/category2.svg", path: "/category/Digital Marketing" },
  { name: "Writing & Translation", icon: "https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/category3.svg", path: "/category/Writing & Translation" },
  { name: "Music & Audio", icon: "https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/category5.svg", path: "/category/Music & Audio" },
  { name: "Video & Animation", icon: "https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/category6.svg", path: "/category/Video & Animation" },
  { name: "Programming & Tech", icon: "https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/category7.svg", path: "/category/Programming & Tech" },
];

function Category() {


  const authToken = localStorage.getItem('token');

  return (
    <div className="w-full text-center">
      {/* Categories Container */}
      <div className="w-full text-center py-10 px-6">
        <div className="flex gap-6 overflow-x-auto no-scrollbar p-4 justify-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 w-[200px] h-[180px] rounded-xl shadow-sm border cursor-pointer transition-all duration-300 bg-white border-gray-200 hover:border-[#2E6F40] hover:shadow-lg group"
            >
              <Link
                className="flex flex-col items-center space-y-4 w-full h-full"
                to={`${!authToken ? "/login" : category.path}`}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#E5F3F2] group-hover:bg-[#2E6F40]/10 transition-colors duration-300">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-800 group-hover:text-[#2E6F40] transition-colors duration-300">
                  {category.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;

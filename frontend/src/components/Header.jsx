import { useState, useEffect } from "react";
import { Avatar, Button, Indicator } from "@mantine/core";
import { ChevronDown, ChevronRight, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function Header() {
  const [showHireDropdown, setShowHireDropdown] = useState(false);
  const [showFindWorkDropdown, setShowFindWorkDropdown] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showManageWorkDropdown, setShowManageWorkDropdown] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showHireDropdown || showFindWorkDropdown) {
      setActiveSubMenu("skill");
    } else {
      setActiveSubMenu(null);
    }
  }, [showHireDropdown, showFindWorkDropdown]);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000;

        if (Date.now() >= expirationTime) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);

          notifications.show({
            title: 'Session Expired',
            message: 'Your session has expired. Please login again.',
            color: 'yellow',
            // autoClose: 3000,
          });
        }
      } catch (error) {
        console.error('Error checking token:', error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);


    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);



  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Use navigate instead of Navigate
    notifications.show({
      title: 'Logout Successful',
      message: 'You have been logged out.',
      color: 'green',
      // autoClose: 3000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const getRoleFromToken = (authToken) => {
    try {
      const decoded = jwtDecode(authToken);
      return decoded.role; // Assuming role is in the payload
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };


  const authToken = localStorage.getItem('token');
  const role = getRoleFromToken(authToken);
  // console.log("User Role:", role);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/image`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfilePicture(response.data.imageUrl);
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    };

    // Add event listener for profile picture updates
    const handleProfilePictureUpdate = (event) => {
      setProfilePicture(event.detail.imageUrl);
    };

    window.addEventListener('profilePictureUpdate', handleProfilePictureUpdate);
    fetchProfilePicture();

    // Cleanup
    return () => {
      window.removeEventListener('profilePictureUpdate', handleProfilePictureUpdate);
    };
  }, [isLoggedIn]);

  const handleCategory = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative z-20 w-full">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 h-16 border-b border-gray-300 bg-[#253d2c] text-white w-full">
        <div className="flex items-center space-x-5 text-[15px]">
          <div className="text-xl font-semibold mr-10">
            <Link to="/">ProGigs</Link>
          </div>

          {/* Hire Freelancer Dropdown */}

          <div
            className={`relative flex items-center gap-1 font-normal ${role === 'FREELANCER' ? 'hidden' : ''
              } h-16 cursor-pointer`}
            onMouseEnter={() => setShowHireDropdown(true)}
            onMouseLeave={() => setShowHireDropdown(false)}
          >
            Hire freelancer <ChevronDown strokeWidth={2} size={16} />
          </div>

          {/* Find Work Dropdown */}
          <div
            className={`relative flex items-center gap-1 font-normal ${role === 'CLIENT' ? 'hidden' : ''
              } h-16 cursor-pointer`}
            onMouseEnter={() => setShowFindWorkDropdown(true)}
            onMouseLeave={() => setShowFindWorkDropdown(false)}
          >
            Find work <ChevronDown strokeWidth={2} size={16} />
          </div>

          {/* Manage Work Dropdown */}

          {authToken && (
            <div
              className={`relative flex items-center gap-1 font-normal hover:text-[#68BA7F] h-16 cursor-pointer ${isLoggedIn === true ? 'block' : 'hidden'}`}
              onMouseEnter={() => setShowManageWorkDropdown(true)}
              onMouseLeave={() => setShowManageWorkDropdown(false)}
            >
              Manage work <ChevronDown strokeWidth={2} size={16} />
            </div>
          )}


          {/* <span className="font-normal hover:text-[#68BA7F] cursor-pointer">Blogs</span> */}
        </div>

        <div className="flex items-center space-x-5">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button variant="transparent" color="#ffffff">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="filled" color="#2e6f40">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Button onClick={logout} variant="transparent" color="#ffffff">
                Logout
              </Button>
              <Indicator inline processing color="red" size={10}>
                <Link to="/messages">
                  <Bell />
                </Link>
              </Indicator>

              <Link to={"/my-profile"}>
                <Avatar
                  src={profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  size={45}
                  alt="user avatar"
                  className="border-3"
                />
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hire Freelancer Dropdown Content */}
      {showHireDropdown && (
        <div
          className="absolute top-16 right-0 w-full bg-white border-t border-gray-300 shadow-md flex"
          onMouseEnter={() => setShowHireDropdown(true)}
          onMouseLeave={() => setShowHireDropdown(false)}
        >
          {/* Left Panel */}
          <div className=" flex flex-col space-y-3 p-5"> {/* remove 40% width */}
            <div
              className="border-[#2E6F40] border h-24 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-[#2e6f400d]"
              onMouseEnter={() => setActiveSubMenu("skill")}
            >
              <div>
                <h1 className="font-semibold">By Skill</h1>
                <p className="text-sm">Looking for a freelancer with specific skills? Start here.</p>
              </div>
              <ChevronRight />
            </div>

            <div
              className="border-[#2E6F40] border h-24 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-[#2e6f400d]"
              onMouseEnter={() => setActiveSubMenu("location")}
            >
              <div>
                <h1 className="font-semibold">By Location</h1>
                <p className="text-sm">Search for freelancers  based on their location and timezone.</p>
              </div>
              <ChevronRight />
            </div>


            <div className="border-[#2E6F40] border h-24 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-[#2e6f400d]" onClick={handleCategory}>
              <div>
                <h1 className="font-semibold">By Category</h1>
                <p className="text-sm">Find freelancers that suit a certain project category.</p>
              </div>
            </div>
          </div>

          {/* Right Panel (Submenu) */}
          {activeSubMenu && (
            <div className="w-full p-5  border-l border-[#2E6F40]">
              {activeSubMenu === "skill" && (
                <div className="flex justify-start gap-10">
                  <div className="grid grid-cols-3 grid-rows-2 gap-5">

                    <Link to={`${!authToken ? "/login" : "/by-skill/Graphic Designers"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-skills/graphic-design.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold h-20 rounded-b-md flex justify-center items-center">Graphic designers</div>
                      </div>
                    </Link>

                    <Link to={`${!authToken ? "/login" : "/by-skill/website designers"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-skills/website.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold h-20 rounded-b-md flex justify-center items-center">Website designers</div>
                      </div>
                    </Link>
                    <Link to={`${!authToken ? "/login" : "/by-skill/mobile app developers"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-skills/mobile.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold h-20 rounded-b-md flex justify-center items-center">Mobile app developers</div>
                      </div>
                    </Link>

                    <Link to={`${!authToken ? "/login" : "/by-skill/software developers"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-skills/sd.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold h-20 rounded-b-md flex justify-center items-center">Softewar developers</div>
                      </div>
                    </Link>

                    <Link to={`${!authToken ? "/login" : "/by-skill/ux designers"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-skills/3d.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold h-20 rounded-b-md flex justify-center items-center">3D artists</div>
                      </div>
                    </Link>

                    <Link to={`${!authToken ? "/login" : "/by-skill/Illustration"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-skills/illustration.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold h-20 rounded-b-md flex justify-center items-center">Illustration</div>
                      </div>
                    </Link>

                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold mb-4">Other popular skills</h2>
                    <ul className="leading-8">
                      <Link to={`${!authToken ? "/login" : "by-skill/Web developers"}`}><li className="cursor-pointer">Web developers</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/java"}`}><li className="cursor-pointer">Java</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/spring boot"}`}><li className="cursor-pointer">Spring boot</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/SEO specialists"}`}><li className="cursor-pointer">SEO specialists</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/Data entry clerks"}`}><li className="cursor-pointer">Data entry clerks</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/Virtual assistants"}`}><li className="cursor-pointer">Virtual assistants</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/Translators"}`}><li className="cursor-pointer">Translators</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/Financial exports"}`}><li className="cursor-pointer">Financial exports</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/Manufacturers"}`}><li className="cursor-pointer">Manufacturers</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/Logistics experts"}`}><li className="cursor-pointer">Logistics experts</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-skill/Fashion designers"}`}><li className="cursor-pointer">Fashion designers</li></Link>
                    </ul>
                  </div>
                </div>
              )}

              {activeSubMenu === "location" && (
                <div className="flex">

                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold w-xs mb-4">Choose from millions of freelancers worldwide.</h2>
                    <ul className="leading-8">
                      <Link to={`${!authToken ? "/login" : "/by-location/USA"}`}><li className="cursor-pointer">United States</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/United Kingdom"}`}><li className="cursor-pointer">United Kingdom</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/Canada"}`}><li className="cursor-pointer">Canada</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/India"}`}><li className="cursor-pointer">India</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/Australia"}`}><li className="cursor-pointer">Australia</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/Paris"}`}><li className="cursor-pointer">Paris</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/Bangladesh"}`}><li className="cursor-pointer">Bangladesh</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/Indonesia"}`}><li className="cursor-pointer">Indonesia</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/Brazil"}`}><li className="cursor-pointer">Brazil</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/China"}`}><li className="cursor-pointer">China</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/Turkey"}`}><li className="cursor-pointer">Turkey</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-location/Philippines"}`}><li className="cursor-pointer">Philippines</li></Link>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <Link to={`${!authToken ? "/login" : "/international-freelancer" }`}>
                      <div className="flex flex-col border border-black rounded-md size-64">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-location/location-1.jpg" alt="" className="rounded-t-md" />
                        <div className="font-semibold rounded-b-md text-start pt-2 px-2">
                          <p>Working with international freelancers</p>
                        </div>
                      </div>
                    </Link>

                    <div className="flex flex-col border border-black rounded-md size-64">
                      <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-location/location-2.jpg" alt="" className="rounded-t-md" />
                      <div className="font-semibold rounded-b-md text-start pt-2 px-2">
                        <p>Where to find the best developers</p>
                      </div>
                    </div>


                    <div className="flex flex-col border border-black rounded-md size-64">
                      <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-location/location-3.jpg" alt="" className="rounded-t-md" />
                      <div className="font-semibold rounded-b-md text-start pt-2 px-2">
                        <p>Do you need a local freelancer?</p>
                      </div>
                    </div>
                    <Link to={`${!authToken ? "/login" : "/international-freelancer" }`}>
                      <div className="flex flex-col border border-black rounded-md size-64">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/hire-location/location-4.jpg" alt="" className="rounded-t-md" />
                        <div className="font-semibold rounded-b-md text-start pt-2 px-2">
                          <p>Building an international team</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* Find Work Dropdown Content */}
      {showFindWorkDropdown && (
        <div
          className="absolute top-16 right-0 w-full bg-white flex border-t border-gray-300 shadow-md"
          onMouseEnter={() => setShowFindWorkDropdown(true)}
          onMouseLeave={() => setShowFindWorkDropdown(false)}
        >
          {/* Left Panel */}
          <div className="flex flex-col space-y-3 p-4">
            <div
              className="border-[#2E6F40] border h-24 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-[#2e6f400d]"
              onMouseEnter={() => setActiveSubMenu("skill")}
            >
              <div>
                <h1 className="font-semibold">By Skill</h1>
                <p className="text-sm">Searching for work that requires a particular skill.</p>
              </div>
              <ChevronRight />
            </div>

            <div
              className="border-[#2E6F40] border h-24 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-[#2e6f400d]"
              onMouseEnter={() => setActiveSubMenu("location")}
            >
              <div>
                <h1 className="font-semibold">By Location</h1>
                <p className="text-sm">Search for freelancers  based on their location and timezone.</p>
              </div>
              <ChevronRight />
            </div>

            <div className="border-[#2E6F40] border h-24 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-[#2e6f400d]" onClick={handleCategory}>
              <div>
                <h1 className="font-semibold">By Category</h1>
                <p className="text-sm">Find freelancers that suit a certain project category.</p>
              </div>
            </div>
          </div>

          {/* Right Panel (Submenu) */}
          {activeSubMenu && (
            <div className="w-full p-5  border-l border-[#2E6F40]">
              {activeSubMenu === "skill" && (
                <div className="flex gap-10">
                  <div className="grid grid-cols-3 gap-5 ">
                    <Link to={`${!authToken ? "/login" : "/by-job/Website jobs"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/find-job/website.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold px-3 h-20 rounded-b-md flex justify-center items-center">Website jobs</div>
                      </div>
                    </Link>

                    <Link to={`${!authToken ? "/login" : "/by-job/Graphic design jobs"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/find-job/graphic-design.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold px-3 h-20 rounded-b-md flex justify-center items-center">Graphic design jobs</div>
                      </div>
                    </Link>


                    <Link to={`${!authToken ? "/login" : "/by-job/Data entry jobs"}`}><div className="flex flex-col border border-black rounded-md">
                      <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/find-job/data-entry.png" alt="" className="rounded-t-md" />
                      <div className="font-semibold px-3 h-20 rounded-b-md flex justify-center items-center">Data entry jobs</div>
                    </div>
                    </Link>


                    <Link to={`${!authToken ? "/login" : "/by-job/Mobile app development"}`}>
                      <div className="flex flex-col border border-black rounded-md">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/find-job/mobile.png" alt="" className="rounded-t-md" />
                        <div className="font-semibold px-3 h-20 rounded-b-md flex justify-center items-center text-center">Mobile app development</div>
                      </div>
                    </Link>


                    <Link to={`${!authToken ? "/login" : "/by-job/Internet marketing jobs"}`}><div className="flex flex-col border border-black rounded-md">
                      <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/find-job/internet-marketing.png" alt="" className="rounded-t-md" />
                      <div className="font-semibold px-3 h-20 rounded-b-md flex justify-center items-center text-center">Internet marketing jobs</div>
                    </div></Link>


                    <Link to={`${!authToken ? "/login" : "/by-job/Local jobs"}`}><div className="flex flex-col border border-black rounded-md">
                      <img src="https://www.f-cdn.com/assets/main/en/assets/logged-out-navigation/find-job/local.png" alt="" className="rounded-t-md" />
                      <div className="font-semibold px-3 h-20 rounded-b-md flex justify-center items-center">Local jobs</div>
                    </div></Link>


                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold mb-3">Other popular jobs</h2>
                    <ul className="leading-8">
                      <Link to={`${!authToken ? "/login" : "/by-job/Software development jobs"}`}><li className="cursor-pointer">Software development jobs</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-job/Internet marketing jobs"}`}><li className="cursor-pointer">Internet marketing jobs</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-job/Data entry jobs"}`}><li className="cursor-pointer">Data entry jobs</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-job/SEO jobs"}`}><li className="cursor-pointer">SEO jobs</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-job/Writing jobs"}`}><li className="cursor-pointer">Writing jobs</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-job/Legal jobs"}`}><li className="cursor-pointer">Legal jobs</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-job/Finance jobs"}`}><li className="cursor-pointer">Finance jobs</li></Link>
                    </ul>
                  </div>
                </div>
              )}

              {activeSubMenu === "location" && (
                <div className="flex">

                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold w-[350px] mb-4">Find work from different locations.</h2>
                    <ul className="leading-8">
                      <Link to={`${!authToken ? "/login" : "/by-country/USA"}`}><li className="cursor-pointer">United States</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/UK"}`}><li className="cursor-pointer">United Kingdom</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/Canada"}`}><li className="cursor-pointer">Canada</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/India"}`}><li className="cursor-pointer">India</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/Australia"}`}><li className="cursor-pointer">Australia</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/Paris"}`}><li className="cursor-pointer">Paris</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/Bangladesh"}`}><li className="cursor-pointer">Bangladesh</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/Indonesia"}`}><li className="cursor-pointer">Indonesia</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/Brazil"}`}><li className="cursor-pointer">Brazil</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/China"}`}><li className="cursor-pointer">China</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/Turkey"}`}><li className="cursor-pointer">Turkey</li></Link>
                      <Link to={`${!authToken ? "/login" : "/by-country/Philippines"}`}><li className="cursor-pointer">Philippines</li></Link>
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { country: "United States", image: "https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=600", path: "USA" },
                      { country: "United Kingdom", image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600", path: "UK" },
                      { country: "India", image: "https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg?auto=compress&cs=tinysrgb&w=600", path: "India" },
                      { country: "Canada", image: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=600", path: "Canada" },
                      { country: "Australia", image: "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=600", path: "Australia" },
                      { country: "Indonesia", image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600", path: "Indonesia" }
                    ].map((item, index) => (
                      <Link
                        key={index}
                        to={`${!authToken ? "/login" : `/by-country/${item.path}`}`}
                        className="transform transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex flex-col border border-[#2E6F40]/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:border-[#2E6F40]">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.country}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300"></div>
                          </div>
                          <div className="font-semibold px-4 py-3 bg-white text-center hover:text-[#2E6F40] transition-colors duration-300">
                            {item.country}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* Manage Work Dropdown Content */}
      {showManageWorkDropdown && (
        <div
          className="absolute top-16 left-[300px] py-5 px-6 bg-white flex border-t border-gray-300 shadow-md"
          onMouseEnter={() => setShowManageWorkDropdown(true)}
          onMouseLeave={() => setShowManageWorkDropdown(false)}
        >
          {(role === "FREELANCER") ? (
            <ul className="space-y-3">
              <li className="hover:text-[#68BA7F] cursor-pointer">
                <Link to="#" className="block">Saved jobs</Link>
              </li>
              <li className="hover:text-[#68BA7F] cursor-pointer">
                <Link to={`${!authToken ? "/login" : "/freelancer/my-jobs"}`} className="block">My jobs</Link>
              </li>
              <li className="hover:text-[#68BA7F] cursor-pointer">
                <Link to={`${!authToken ? "/login" : "/freelancer/contracts"}`} className="block">Manage contracts</Link>
              </li>
            </ul>
          ) : (
            <ul className="space-y-3">
              <li className="hover:text-[#68BA7F] cursor-pointer">
                <Link to={`${!authToken ? "/login" : "/employer/post-job"}`} className="block">Add job</Link>
              </li>
              <li className="hover:text-[#68BA7F] cursor-pointer">
                <Link to={`${!authToken ? "/login" : "/employer/manage-jobs"}`} className="block">Manage jobs</Link>
              </li>
              <li className="hover:text-[#68BA7F] cursor-pointer">
                <Link to={`${!authToken ? "/login" : "/employer/contracts"}`} className="block">Manage contracts</Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;

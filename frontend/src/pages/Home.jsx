import { useState, useEffect } from "react";
import { Avatar, Button } from "@mantine/core";
import { ArrowUp, CircleCheck, ShieldCheck, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


import Category from "../components/Home-components/Category";
import ExpertFreelancers from "../components/Home-components/ExpertFreelancers";
import Video from "../assets/Videos/4426378-uhd_3840_2160_25fps.mp4";
import TestimonialCarousel from "../components/Home-components/TestimonialCarousel";
import Projects from "../components/Home-components/Projects";
import { notifications } from "@mantine/notifications";


function Home() {

  const [isVisible, setIsVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token);
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error('Token decode error:', error);
      }
    }
  }, []);

  // Function to toggle button visibility based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handelUser = () =>{
    if(!isLoggedIn){
      navigate("/login")
    }
    else if(userRole === "FREELANCER"){
      notifications.show({
        title: "You are already a freelancer",
        message: "You can't browse freelancer",
        color: "red",
        autoClose: 3000,
      });
    } else {
      navigate("/talent")
    }
  }

  return (
    <div>
      <section className="px-16 py-10 flex justify-between items-center ">
        <div className="flex flex-col space-y-10 w-[40%]">
          <h1 className="text-5xl font-semibold leading-15">Find the perfect freelancer services for your business</h1>
          <p>Work with talented people at the most affordable price to get the most out of your time and cost</p>
          <div className="flex">
           
          <Link to={`${isLoggedIn ? "/job-list" : "/login" }`}>
              <Button 
                variant="filled" 
                color="#2e6f40" 
                size="lg"
                hidden={isLoggedIn && userRole === 'CLIENT'}
                className="mr-5"
              >
                Find Work
              </Button>
            </Link>
            
            <Link to={`${isLoggedIn ? "/talent" : "/login" }`}>
              <Button 
                variant="outline" 
                color="#2e6f40" 
                size="lg"
                hidden={isLoggedIn && userRole === 'FREELANCER'}
              >
                Find Talent
              </Button>
            </Link>
          </div>
          <div className="mt-10">
            <span>Trusted by</span>
            <div className="h-28 flex">
              <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/tag-heuer-3-logo.png" alt="tagheuer" />
              <img src="https://static.vecteezy.com/system/resources/previews/027/127/493/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png" alt="microsoft" />
              <img src="https://download.logo.wine/logo/Spotify/Spotify-Logo.wine.png" alt="spotify" />
              <img src="https://iconape.com/wp-content/png_logo_vector/new-youtube-logo.png" alt="youtube" />
              <img src="https://pnghunter.com/get-logo.php?id=32761" alt="amazon" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex space-x-3 justify-center items-center bg-white w-[325px] h-20 rounded-2xl shadow absolute -bottom-10 right-[350px]">
            <div className="bg-[#cfffdc] h-13 w-13 flex justify-center items-center rounded-full"><Star color="#2e6f40" size={35} strokeWidth={1} /></div>
            <div className="flex flex-col text-[15px]">
              <p className="font-semibold">Proof of quality</p>
              <p className="text-gray-600">Work with pre-vetted top talent</p>
            </div>
          </div>
          <div className="flex space-x-3 justify-center items-center bg-white w-xs h-20 rounded-2xl shadow absolute top-[450px] right-[10px]">
            <div className="bg-[#cfffdc] h-13 w-13 flex justify-center items-center rounded-full"><ShieldCheck color="#2e6f40" size={35} strokeWidth={1} /></div>
            <div className="flex flex-col text-[15px]">
              <p className="font-semibold">safe and secure</p>
              <p className="text-gray-600">Secure hiring for smart clients</p>
            </div>
          </div>
          <img src="https://demoapus1.com/freeio/wp-content/uploads/2023/07/h11.png" alt="image" />
        </div>
      </section>
      <section className="flex flex-col text-center bg-gray-50">
        <div className="leading-12 my-10">
          <h1 className="text-4xl font-semibold">Browse by Category</h1>
          <p>Explore a wide range of services organized by category</p>
        </div>
        <Category />
      </section>
      <section className="flex justify-between items-center px-16 py-16 ">
        <div>
          <div className="leading-12">
            <h1 className="text-4xl font-semibold">ProGigs! The best choice?</h1>
            <p>Streamline your hiring process with strategic channels to reach qualified candidates</p>
          </div>
          <div className="leading-12 my-5">
            <p className="flex items-center gap-3"><CircleCheck color="#2e6f40" />Access to millions of job seekers</p>
            <p className="flex items-center gap-3"><CircleCheck color="#2e6f40" />Only pay for the candidates you want to contact</p>
            <p className="flex items-center gap-3"><CircleCheck color="#2e6f40" />Post unlimited jobs for free—all from one place</p>
            <p className="flex items-center gap-3"><CircleCheck color="#2e6f40" />Hiring solutions & pricing that works with seasonal hiring changes</p>
          </div>
          <Link to={`${isLoggedIn  ? "/talent" : "/login" }`}>
          <Button variant="filled" color="#2e6f40" size="lg" hidden={isLoggedIn && userRole === 'FREELANCER'}>Browse Candidates</Button>
          </Link>
        </div>

        <div className="w-2xl">
          <video className="rounded-2xl" src={Video} autoPlay muted loop />
        </div>
      </section>
      <section className="flex flex-col text-center bg-gray-50">
        <div className="leading-12 my-10">
          <h1 className="text-4xl font-semibold">Expert Freelancers</h1>
          <p>Connect with top-rated professionals across various industries</p>
        </div>
        <ExpertFreelancers />
          <div onClick={handelUser} className="border-b-2 w-[120px] text-center mx-auto cursor-pointer border-[#2e6f40] my-10">
            <p className="text-[16px] font-medium">All Freelancers</p>
          </div>
      </section>
      <section className="flex justify-between items-center px-16 py-16 ">
        <div>
          <div className="flex flex-col space-y-5">
            <h1 className="text-4xl font-semibold leading-12">Experience a quicker, simpler, and more effective job search</h1>
            <p>Our platform offers intuitive tools, personalized job recommendations, and valuable resources to streamline your job search process.</p>
          </div>
          <div className="leading-12 my-5">
            <p className="flex items-center gap-3"><CircleCheck color="#2e6f40" />Easily browse job listings with smart search and filters</p>
            <p className="flex items-center gap-3"><CircleCheck color="#2e6f40" />Receive personalized job suggestions based on your preferences.</p>
            <p className="flex items-center gap-3"><CircleCheck color="#2e6f40" />Access resources to improve your resume, ace interviews, and advance your career.</p>
          </div>
          <Link to={`${isLoggedIn ? "/job-list" : "/login" }`}>
          <Button hidden={isLoggedIn && userRole === 'CLIENT'} variant="filled" color="#2e6f40" size="lg">Browse Jobs</Button>
          </Link>
        </div>

        <div className="w-4xl flex justify-center relative">
          <div className="flex flex-col justify-center items-center h-fit p-9 rounded-2xl shadow-sm absolute top-14 -right-5 bg-white">
            <h1 className="text-2xl font-semibold">986+</h1>
            <p>Candidates hired</p>
            <Avatar.Group>
              <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png" />
              <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" />
              <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png" />
              <Avatar>+5</Avatar>
            </Avatar.Group>
          </div>

          <img src="https://demoapus1.com/freeio/wp-content/uploads/2023/07/h11-5.png" alt="" />

          <div className="flex items-center bg-white px-5 h-20 rounded-2xl shadow-sm absolute -bottom-7 left-0">
            <div className="flex flex-col text-[15px] border-l-2 border-[#2e6f40] px-4">
              <h1 className="text-xl font-semibold">+846</h1>
              <p className="text-gray-600">Job position advertised</p>
            </div>
          </div>

        </div>
      </section>
      <section className="bg-gray-50">
        <TestimonialCarousel />
      </section>
      <section className="flex flex-col text-center">
        <div className="leading-12 my-10">
          <h1 className="text-4xl font-semibold">Latest Projects</h1>
          <p>Discover our latest project with cutting-edge features. Explore now!</p>
        </div>
        <Projects />
      </section>
      <section className="flex flex-col text-center py-14 bg-amber-100 m-10 rounded-3xl">
        <div className="leading-12 pb-10">
          <h1 className="text-4xl font-semibold">4 Steps to become a Seller</h1>
          <p>Recruitment Made Easy in 100 seconds</p>
        </div>
        <div className="flex justify-evenly items-center">
          <div className="w-2xs flex flex-col items-start">
            <img className="my-5" src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/featured1.svg" alt="" />
            <h1 className="text-xl font-semibold">Post Your Job.</h1>
            <p className="text-[14px] text-start">Create a job listing with details like requirements and budget.</p>
          </div>
          <div className="w-2xs flex flex-col items-start">
            <img className="my-5" src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/featured2.svg" alt="" />
            <h1 className="text-xl font-semibold">Review Applicants</h1>
            <p className="text-[14px] text-start">Receive and evaluate applications from freelancers.</p>
          </div>
          <div className="w-2xs flex flex-col items-start">
            <img className="my-5" src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/featured3.svg" alt="" />
            <h1 className="text-xl font-semibold">Choose a Freelancer</h1>
            <p className="text-[14px] text-start">Conduct interviews or discussions to choose the best candidate.</p>
          </div>
          <div className="w-2xs flex flex-col items-start">
            <img className="my-5" src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/featured4.svg" alt="" />
            <h1 className="text-xl font-semibold">Manage the Project</h1>
            <p className="text-[14px] text-start">Collaborate with the selected freelancer to complete the project.</p>
          </div>
        </div>
      </section>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-[#2e6f40] text-white rounded-full shadow-lg hover:bg-[#29643a] transition-all duration-300"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  )
}

export default Home;

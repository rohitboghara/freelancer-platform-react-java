import { Avatar, Loader } from "@mantine/core";
import { CalendarDays, MapPin, Star, Briefcase, Award, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FreelancerProfile = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancerProfile = async () => {
      try {
        
        const [profileResponse, statsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/profile/by-id/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/profile/success-rate/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);
  

        setFreelancer(profileResponse.data);
        console.log(profileResponse.data);
        setCounts(statsResponse.data);
        console.log(statsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };
  
    fetchFreelancerProfile();
  }, [id]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader color="#2E6F40" size={50} />
      </div>
    );
  }

  if (!freelancer || !counts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Profile not found.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (selectedTab) {
      case "portfolio":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Portfolio Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {freelancer.portfolio.map((project) => (
                <div key={project.portfolioId} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <img
                      src={project.portfolioImage}
                      alt={project.portfolioTitle}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h4 className="text-white font-bold text-lg">{project.portfolioTitle}</h4>
                      <p className="text-white/80 text-sm mt-2">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Client Reviews</h3>
            <div className="space-y-6">
              {freelancer.review.map((review) => (
                <div key={review.reviewId} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
                      <p className="text-sm text-gray-500">{freelancer.fieldOfWork}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(review.review))].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-500 fill-current" />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">Reviewed recently</span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600">{review.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Certifications</h3>
              <div className="space-y-4">
                {freelancer.certification.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">{cert.certificateName}</h4>
                      <p className="text-sm text-gray-500">{cert.certificateIssuer}</p>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(cert.issuedDate).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Education</h3>
              <div className="space-y-4">
                {freelancer.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">{edu.course}</h4>
                      <p className="text-sm text-gray-500">{edu.institute}</p>
                    </div>
                    <span className="text-sm text-gray-500">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar
              src={freelancer.imageUrl}
              size={120}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">{freelancer.fullName}</h1>
              <h2 className="text-xl text-gray-600 mt-2">{freelancer.fieldOfWork}</h2>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={20} />
                  <span>{freelancer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={20} />
                  <span>{freelancer.phone}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-2">
                  {freelancer.status === "VERIFIED" && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Verified
                    </span>
                  )}
                  {freelancer.status !== "VERIFIED" && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      Pending Verification
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500" size={20} fill="currentColor" />
                  <span className="font-semibold">{counts.rating}</span>
                  <span className="text-gray-500">({counts.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={20} />
                  <span>{freelancer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays size={20} />
                  <span>Member since {new Date(freelancer.user.joiningDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">{freelancer.hourlyRate}</div>
              <button className="mt-4 bg-[#2E6F40] text-white px-6 py-2 rounded-lg hover:bg-[#245332] transition-colors">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex gap-8">
            {["Overview", "Portfolio", "Reviews", "Certifications", "Education"].map((tab) => (
              <li
                key={tab}
                onClick={() => setSelectedTab(tab.toLowerCase())}
                className={`px-4 py-4 cursor-pointer border-b-2 transition-colors ${
                  selectedTab === tab.toLowerCase()
                    ? "border-[#2E6F40] text-[#2E6F40]"
                    : "border-transparent text-gray-600 hover:text-[#2E6F40]"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {selectedTab === "overview" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">About Me</h3>
                <p className="text-gray-600 leading-relaxed">{freelancer.description}</p>
              </div>
              {/* Portfolio Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Portfolio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {freelancer.portfolio.map((item) => (
                    <div key={item.portfolioId} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={item.portfolioImage}
                          alt={item.portfolioTitle}
                          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-semibold mt-3">{item.portfolioTitle}</h4>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Stats & Achievements</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="text-[#2E6F40]" size={20} />
                    <div>
                      <div className="font-semibold">{counts.completedProject}</div>
                      <div className="text-sm text-gray-500">Projects Completed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="text-[#2E6F40]" size={20} />
                    <div>
                      <div className="font-semibold">{counts.successRate}%</div>
                      <div className="text-sm text-gray-500">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Skills Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#E5F3F2] text-[#2E6F40] px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">{renderContent()}</div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
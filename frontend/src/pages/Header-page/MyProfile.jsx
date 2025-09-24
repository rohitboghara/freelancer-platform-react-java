import { useState, useEffect } from "react";
import { Avatar, Button, Loader, Modal, } from "@mantine/core";
import { Trash, Plus, Upload, CreditCard, Award, Briefcase, Mail, Phone, Building2, Star, MapPin, CalendarDays } from "lucide-react";
import axios from "axios";

const ProfileSection = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [counts, setCounts] = useState(null)
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/getProfile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/success-rate`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };
    fetchCounts();
    fetchProfileData();
  }, []);



  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/profile/edit`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setIsEditMode(false); // Exit edit mode after saving
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader color="#2E6F40" size="xl" type="bars" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#2E6F40] text-white px-6 py-2 rounded-lg hover:bg-[#245332] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No profile data available</p>
      </div>
    );
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/profile/image`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setProfileData(prev => ({
          ...prev,
          imageUrl: response.data.url
        }));

        // Dispatch custom event with new image URL
        window.dispatchEvent(new CustomEvent('profilePictureUpdate', {
          detail: { imageUrl: response.data.url }
        }));

        alert('Profile picture updated successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to update profile picture');
      }
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "portfolio":
        return (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Portfolio Projects</h3>
                <Button
                  leftIcon={<Plus size={16} />}
                  color="#2E6F40"
                  variant="filled"
                  onClick={() => setIsPortfolioModalOpen(true)}
                >
                  Add Project
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {profileData.portfolio.map((project) => (
                  <div key={project.portfolioId} className="group cursor-pointer relative">
                    <div className="relative overflow-hidden rounded-lg shadow-md">
                      <img
                        src={project.portfolioImage || "https://picsum.photos/400/300"}
                        alt={project.portfolioTitle}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h4 className="text-white font-bold text-lg">{project.portfolioTitle}</h4>
                        <p className="text-white/80 text-sm mt-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.skills && project.skills.map((skill, index) => (
                            <span key={index} className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (window.confirm('Are you sure you want to delete this project?')) {
                            try {
                              await axios.delete(
                                `${import.meta.env.VITE_API_URL}/profile/portfolio/${project.portfolioId}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                  },
                                }
                              );
                              setProfileData((prev) => ({
                                ...prev,
                                portfolio: prev.portfolio.filter((p) => p.portfolioId !== project.portfolioId),
                              }));
                              alert('Project deleted successfully');
                            } catch (error) {
                              console.error("Error deleting project:", error);
                              alert('Failed to delete project');
                            }
                          }
                        }}
                        color="red"
                        variant="filled"
                        size="sm"
                        className="absolute -top-35 -right-53 opacity-0 group-hover:opacity-100 transition-opacity"
                        leftIcon={<Trash size={16} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Modal
              opened={isPortfolioModalOpen}
              onClose={() => setIsPortfolioModalOpen(false)}
              title="Add New Portfolio Project"
              size="lg"
            >
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData();

                  // Create portfolio object
                  const portfolioData = {
                    portfolioTitle: e.target.portfolioTitle.value,
                    description: e.target.description.value,
                    skills: e.target.skills.value.split(',').map(skill => skill.trim())
                  };

                  // Append portfolio data as string
                  formData.append("portfolio", JSON.stringify(portfolioData));
                  // Append file separately
                  formData.append("file", e.target.portfolioImage.files[0]);

                  try {
                    const response = await axios.post(
                      `${import.meta.env.VITE_API_URL}/profile/portfolio`,
                      formData,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                          'Content-Type': 'multipart/form-data',
                        },
                      }
                    );
                    setProfileData((prev) => ({
                      ...prev,
                      portfolio: [...prev.portfolio, response.data],
                    }));
                    setIsPortfolioModalOpen(false);
                    e.target.reset();
                    alert('Project added successfully');
                  } catch (error) {
                    console.error("Error adding portfolio:", error);
                    alert("Failed to add portfolio project");
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    name="portfolioTitle"
                    type="text"
                    placeholder="Enter project title"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your project"
                    required
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills Used (comma-separated)
                  </label>
                  <input
                    name="skills"
                    type="text"
                    placeholder="React, Node.js, TypeScript"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Image
                  </label>
                  <div className="flex items-center gap-2 w-full p-2 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-[#2E6F40] focus-within:border-transparent">
                    <Upload size={20} />
                    <input
                      type="file"
                      name="portfolioImage"
                      accept="image/*"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  color="#2E6F40"
                  fullWidth
                >
                  Add Portfolio
                </Button>
              </form>
            </Modal>
          </>
        );

      case "education":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Education</h3>
                <Button
                  leftIcon={<Plus size={16} />}
                  color="#2E6F40"
                  variant="filled"
                  onClick={() => setIsEducationModalOpen(true)}
                >
                  Add Education
                </Button>
              </div>
              <div className="space-y-4">
                {profileData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex justify-between items-start p-4 border border-gray-100 rounded-lg group relative"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">{edu.course}</h4>
                      <p className="text-sm text-gray-500">{edu.institute}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                    <Button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this education?')) {
                          try {
                            await axios.delete(
                              `${import.meta.env.VITE_API_URL}/profile/education/${edu.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                              }
                            );
                            setProfileData((prev) => ({
                              ...prev,
                              education: prev.education.filter((e) => e.id !== edu.id),
                            }));
                            alert('Education deleted successfully');
                          } catch (error) {
                            console.error("Error deleting education:", error);
                            alert('Failed to delete education');
                          }
                        }
                      }}
                      color="red"
                      variant="filled"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      leftIcon={<Trash size={16} />}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Modal
              opened={isEducationModalOpen}
              onClose={() => setIsEducationModalOpen(false)}
              title="Add Education"
              size="lg"
            >
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const educationData = {
                    course: e.target.course.value,
                    institute: e.target.institute.value,
                    year: e.target.year.value,
                  };

                  try {
                    const response = await axios.post(
                      `${import.meta.env.VITE_API_URL}/profile/education`,
                      educationData,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                      }
                    );
                    setProfileData((prev) => ({
                      ...prev,
                      education: [...prev.education, response.data],
                    }));
                    setIsEducationModalOpen(false);
                    e.target.reset();
                    alert('Education added successfully');
                  } catch (error) {
                    console.error("Error adding education:", error);
                    alert("Failed to add education");
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course/Degree
                  </label>
                  <input
                    name="course"
                    type="text"
                    placeholder="Enter course or degree"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institute
                  </label>
                  <input
                    name="institute"
                    type="text"
                    placeholder="Enter institute name"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    name="year"
                    type="text"
                    placeholder="Enter year of completion"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  color="#2E6F40"
                  fullWidth
                >
                  Add Education
                </Button>
              </form>
            </Modal>
          </div>
        );

      case "reviews":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Client Reviews
            </h3>
            <p className="text-gray-600">No reviews available yet.</p>
          </div>
        );

      case "certification":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Certifications</h3>
                <Button
                  leftIcon={<Plus size={16} />}
                  color="#2E6F40"
                  variant="filled"
                  onClick={() => setIsCertificationModalOpen(true)}
                >
                  Add Certification
                </Button>
              </div>
              <div className="space-y-4">
                {profileData.certification.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex justify-between items-center p-4 border border-gray-100 rounded-lg group relative"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">{cert.certificateName}</h4>
                      <p className="text-sm text-gray-500">Issued by {cert.certificateIssuer}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(cert.issuedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    <Button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this certification?')) {
                          try {
                            await axios.delete(
                              `${import.meta.env.VITE_API_URL}/profile/certification/${cert.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                              }
                            );
                            setProfileData((prev) => ({
                              ...prev,
                              certification: prev.certification.filter((c) => c.id !== cert.id),
                            }));
                            alert('Certification deleted successfully');
                          } catch (error) {
                            console.error("Error deleting certification:", error);
                            alert('Failed to delete certification');
                          }
                        }
                      }}
                      color="red"
                      variant="filled"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      leftIcon={<Trash size={16} />}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Modal
              opened={isCertificationModalOpen}
              onClose={() => setIsCertificationModalOpen(false)}
              title="Add Certification"
              size="lg"
            >
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const certificationData = {
                    certificateName: e.target.certificateName.value,
                    certificateIssuer: e.target.certificateIssuer.value,
                    issuedDate: e.target.issuedDate.value,
                  };

                  try {
                    const response = await axios.post(
                      `${import.meta.env.VITE_API_URL}/profile/certification`,
                      certificationData,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                      }
                    );
                    setProfileData((prev) => ({
                      ...prev,
                      certification: [...prev.certification, response.data],
                    }));
                    setIsCertificationModalOpen(false);
                    e.target.reset();
                    alert('Certification added successfully');
                  } catch (error) {
                    console.error("Error adding certification:", error);
                    alert("Failed to add certification");
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Name
                  </label>
                  <input
                    name="certificateName"
                    type="text"
                    placeholder="Enter certificate name"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization
                  </label>
                  <input
                    name="certificateIssuer"
                    type="text"
                    placeholder="Enter issuing organization"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date
                  </label>
                  <input
                    name="issuedDate"
                    type="date"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  color="#2E6F40"
                  fullWidth
                >
                  Add Certification
                </Button>
              </form>
            </Modal>
          </div>
        );

      case "bankdetails":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Bank Details</h3>
              {profileData.bank ? (
                <Button
                  variant="filled"
                  color="#2E6F40"
                  onClick={async () => {
                    if (isEditMode) {
                      try {
                        await axios.put(
                          `${import.meta.env.VITE_API_URL}/profile/bank/${profileData.bank.id}`,
                          profileData.bank,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                          }
                        );
                        setIsEditMode(false);
                        alert('Bank details updated successfully');
                      } catch (error) {
                        console.error("Error updating bank details:", error);
                        alert('Failed to update bank details');
                      }
                    } else {
                      setIsEditMode(true);
                    }
                  }}
                >
                  {isEditMode ? "Save Changes" : "Edit Details"}
                </Button>
              ) : (
                <Button
                  variant="filled"
                  color="#2E6F40"
                  onClick={async () => {
                    try {
                      const response = await axios.post(
                        `${import.meta.env.VITE_API_URL}/profile/bank`,
                        {
                          bankName: "",
                          accountHolderName: "",
                          accountNumber: "",
                          ifscCode: "",
                          branch: ""
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                          },
                        }
                      );
                      setProfileData(prev => ({
                        ...prev,
                        bank: response.data
                      }));
                      setIsEditMode(true);
                    } catch (error) {
                      console.error("Error adding bank details:", error);
                      alert('Failed to add bank details');
                    }
                  }}
                >
                  Add Bank Details
                </Button>
              )}
            </div>
            {profileData.bank ? (
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-[#2E6F40]" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {isEditMode ? (
                          <input
                            value={profileData.bank.bankName}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                bank: { ...profileData.bank, bankName: e.target.value }
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter bank name"
                          />
                        ) : (
                          profileData.bank.bankName
                        )}
                      </div>
                      <div className="text-sm text-gray-500">Bank Name</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-[#2E6F40]" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {isEditMode ? (
                          <input
                            value={profileData.bank.accountHolderName}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                bank: { ...profileData.bank, accountHolderName: e.target.value }
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter account holder name"
                          />
                        ) : (
                          profileData.bank.accountHolderName
                        )}
                      </div>
                      <div className="text-sm text-gray-500">Account Holder Name</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-[#2E6F40]" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {isEditMode ? (
                          <input
                            value={profileData.bank.accountNumber}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                bank: { ...profileData.bank, accountNumber: e.target.value }
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter account number"
                          />
                        ) : (
                          profileData.bank.accountNumber
                        )}
                      </div>
                      <div className="text-sm text-gray-500">Account Number</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-[#2E6F40]" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {isEditMode ? (
                          <input
                            value={profileData.bank.ifscCode}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                bank: { ...profileData.bank, ifscCode: e.target.value }
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter IFSC code"
                          />
                        ) : (
                          profileData.bank.ifscCode
                        )}
                      </div>
                      <div className="text-sm text-gray-500">IFSC Code</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-[#2E6F40]" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {isEditMode ? (
                          <input
                            value={profileData.bank.branch}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                bank: { ...profileData.bank, branch: e.target.value }
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter branch name"
                          />
                        ) : (
                          profileData.bank.branch
                        )}
                      </div>
                      <div className="text-sm text-gray-500">Branch</div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No bank details added yet. Click the button above to add your bank details.
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  About Me
                </h3>
                {isEditMode ? (
                  <textarea
                    value={profileData.description}
                    placeholder="Enter your description"
                    onChange={(e) =>
                      setProfileData({ ...profileData, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {profileData.description}
                  </p>
                )}
              </div>
              {/* Portfolio Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Portfolio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileData.portfolio.map((item) => (
                    <div key={item.portfolioId} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={item.portfolioImage || "https://picsum.photos/400/300"}
                          alt={item.portfolioTitle}
                          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-semibold mt-3">
                        {item.portfolioTitle}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {profileData.skills && profileData.skills.map((skill, index) => (
                          <span key={index} className="bg-gray-300 px-2 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Stats & Achievements
                </h3>
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
                  {profileData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {isEditMode ? (
                        <>
                          <input
                            value={skill}
                            type="text"
                            placeholder="Enter skill"
                            onChange={(e) => {
                              const updatedSkills = [...profileData.skills];
                              updatedSkills[index] = e.target.value;
                              setProfileData({ ...profileData, skills: updatedSkills });
                            }}
                            className="p-2 border border-gray-300 rounded"
                          />
                          <Button
                            onClick={() => {
                              const updatedSkills = profileData.skills.filter(
                                (_, i) => i !== index
                              );
                              setProfileData({ ...profileData, skills: updatedSkills });
                            }}
                            variant="transparent"
                            color="red"
                          >
                            Remove
                          </Button>
                        </>
                      ) : (
                        <span className="bg-[#E5F3F2] text-[#2E6F40] px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      )}
                    </div>
                  ))}
                  {isEditMode && (
                    <Button
                      onClick={() => {
                        setProfileData({
                          ...profileData,
                          skills: [...profileData.skills, ""],
                        });
                      }}
                      variant="transparent"
                      color="dark"
                    >
                      + Add Skill
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar
                src={profileData.imageUrl}
                size={120}
                className="rounded-full border-4 border-white shadow-lg"
              />
              {isEditMode && (
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="profile-image" className="cursor-pointer">
                    <div className="bg-[#2E6F40] text-white p-2 rounded-full hover:bg-[#245332] transition-colors">
                      <Upload size={16} />
                    </div>
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
            <div className="flex-1">
              {/* Name */}
              <h1 className="text-3xl font-bold text-gray-800">
                {isEditMode ? (
                  <div className="flex gap-2">
                    <input
                      value={profileData.firstName}
                      placeholder="First Name"
                      onChange={(e) =>
                        setProfileData({ ...profileData, firstName: e.target.value })
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                    <input
                      value={profileData.lastName}
                      placeholder="Last Name"
                      onChange={(e) =>
                        setProfileData({ ...profileData, lastName: e.target.value })
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                  </div>
                ) : (
                  // profileData.fullName
                  `${profileData.firstName || ''} ${profileData.lastName || ''}`
                )}
              </h1>

              {/* Field of Work */}
              {isEditMode ? (
                <input
                  value={profileData.fieldOfWork}
                  placeholder="Field of Work"
                  onChange={(e) =>
                    setProfileData({ ...profileData, fieldOfWork: e.target.value })
                  }
                  className="p-2 h-11 border border-gray-300 rounded mt-2"
                />
              ) : (
                <h2 className="text-gray-600 leading-relaxed mt-2">
                  {profileData.fieldOfWork}
                </h2>
              )}

              {/* Additional Fields: Email, Phone, Company Name */}
              <div className="flex flex-wrap gap-6 mt-4">
                {/* Email */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={20} />
                  {isEditMode ? (
                    <input
                      value={profileData.email}
                      placeholder="Email"
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="p-2 border border-gray-300 rounded w-64"
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={20} />
                  {isEditMode ? (
                    <input
                      value={profileData.phone}
                      placeholder="Phone Number"
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      className="p-2 border border-gray-300 rounded w-48"
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>

                {/* Company Name */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 size={20} />
                  {isEditMode ? (
                    <input
                      value={profileData.companyName}
                      placeholder="Company Name"
                      onChange={(e) =>
                        setProfileData({ ...profileData, companyName: e.target.value })
                      }
                      className="p-2 border border-gray-300 rounded w-48"
                    />
                  ) : (
                    <span>{profileData.companyName}</span>
                  )}
                </div>
              </div>

              {/* Status, Location, Joining Date */}
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-2">
                  {profileData.status === "VERIFIED" && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Verified
                    </span>
                  )}
                  {profileData.status !== "VERIFIED" && (
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
                  {isEditMode ? (
                    <input
                      value={profileData.location}
                      placeholder="Enter location"
                      onChange={(e) =>
                        setProfileData({ ...profileData, location: e.target.value })
                      }
                      className="p-2 border border-gray-300 rounded w-48"
                    />
                  ) : (
                    <span>{profileData.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays size={20} />
                  <span>Member since {profileData.user.joiningDate}</span>
                </div>
              </div>
            </div>

            {/* Hourly Rate and Edit Buttons */}
            <div className="text-right">
              {isEditMode ? (
                <input
                  value={profileData.hourlyRate}
                  placeholder="Enter hourly rate"
                  onChange={(e) =>
                    setProfileData({ ...profileData, hourlyRate: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded w-full"
                />
              ) : (
                <div className="text-2xl font-bold text-gray-800">
                  ${profileData.hourlyRate}
                </div>
              )}
              <Button
                variant="filled"
                color="#2E6F40"
                className="mt-4 px-6 py-2 rounded-lg transition-colors"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? "Cancel" : "Edit Profile"}
              </Button>
              {isEditMode && (
                <Button
                  variant="outline"
                  color="#2E6F40"
                  className="mt-4 ml-4 px-6 py-2 rounded-lg transition-colors"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex gap-8">
            {[
              "Overview",
              "Portfolio",
              "Reviews",
              "Education",
              "Certification",
              "Bank Details",
            ].map((tab) => (
              <li
                key={tab}
                onClick={() =>
                  setSelectedTab(tab.toLowerCase().replace(/ /g, ""))
                }
                className={`px-4 py-4 cursor-pointer border-b-2 transition-colors ${selectedTab === tab.toLowerCase().replace(/ /g, "")
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
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileSection;

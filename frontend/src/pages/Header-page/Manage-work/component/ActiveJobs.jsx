import { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Loader } from "@mantine/core";


const ActiveJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/contract/activeJobs`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(error.response?.data?.message || 'Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader color="#2E6F40" size={50} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                

                {/* Active Jobs Grid */}
                <div className="grid gap-6">
                    {jobs.map((job) => (
                        <div 
                            key={job.id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-semibold text-gray-800 hover:text-[#2E6F40] transition-colors">
                                            {job.title}
                                        </h2>
                                        
                                    </div>
                                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                                        <span>Posted by {job.clientName}</span>
                                        • 
                                        <span>{job.location}</span>
                                    </p>
                                    <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                                    
                                    <div className="mt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {job.skillsRequired.map((skill, index) => (
                                                <Badge 
                                                    key={index}
                                                    color="#2E6F40"
                                                    variant="dot"
                                                    size="lg"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="md:text-right flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
                                    <p className="text-xl font-bold text-[#2E6F40]">${job.amount}</p>
                                    <button 
                                        className="px-4 py-2 bg-[#2E6F40] text-white rounded-lg hover:bg-[#235032] transition-colors"
                                        onClick={() => window.location.href = `/project/${job.id}`}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {jobs.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No active jobs found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveJobs;
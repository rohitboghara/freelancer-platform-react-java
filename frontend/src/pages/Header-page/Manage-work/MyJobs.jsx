import { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Loader, Tabs } from "@mantine/core";
import { Briefcase, Clock, Search } from "lucide-react";
import ActiveJobs from "./component/ActiveJobs";

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/appliedJobs`, {
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

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Work</h1>
                    <p className="text-gray-600 mt-2">Track and manage your job applications</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Tabs value={activeTab} onChange={setActiveTab} color="#2E6F40">
                        <Tabs.List>
                            <Tabs.Tab value="all" leftSection={<Briefcase size={16} />}>
                                All Jobs
                            </Tabs.Tab>
                            <Tabs.Tab value="active" leftSection={<Clock size={16} />}>
                                Active
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </div>

                {/* Jobs Grid */}
                <div className="grid gap-6">
                    {activeTab === 'active' ? (
                        <ActiveJobs />
                    ) : (
                        filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">

                                            <h2
                                                className="text-xl font-semibold text-gray-800 hover:text-[#2E6F40] transition-colors cursor-pointer"
                                            >
                                                {job.title}
                                            </h2>


                                            <Badge color="green" variant="light">{job.status}</Badge>
                                        </div>
                                        <p className="text-gray-500 mt-1 flex items-center gap-2">
                                            <span>Posted by {job.clientName}</span>
                                            •
                                            <span>{job.location}</span>
                                        </p>
                                        <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>

                                        <div className="mt-4 space-y-3">
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

                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-900">{job.proposalsCount}</span> proposals
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Empty State */}
                {filteredJobs.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No jobs found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyJobs;
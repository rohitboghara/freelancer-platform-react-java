import { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Loader, Paper, Text, Group, Button } from "@mantine/core";
import { Search, Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageJob = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/manage-jobs`, {
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

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setJobs(jobs.filter(job => job.id !== jobId));
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Jobs</h1>
                    <p className="text-gray-600 mt-2">View and manage your posted jobs</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E6F40] focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        color="#2E6F40"
                        onClick={() => navigator('/employer/post-job')}
                    >
                        Post New Job
                    </Button>
                </div>

                <div className="grid gap-6">
                    {filteredJobs.map((job) => (
                        <Paper
                            key={job.id}
                            shadow="sm"
                            p="lg"
                            className="hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h2 onClick={() => window.location.href = `/project/${job.id}`} className="text-xl font-semibold cursor-pointer">{job.title}</h2>
                                        <Badge 
                                            color={job.status === 'ACTIVE' ? 'green' : 'gray'}
                                            variant="dot"
                                            size="lg"
                                            className="px-3 py-1"
                                            styles={{
                                                root: {
                                                    textTransform: 'capitalize',
                                                    fontWeight: 600,
                                                },
                                                dot: {
                                                    backgroundColor: job.status === 'ACTIVE' ? '#2E6F40' : '#666',
                                                }
                                            }}
                                        >
                                            {job.status.toLowerCase()}
                                        </Badge>
                                    </div>
                                    <Text c="dimmed" size="sm">Posted by {job.clientName} • {job.location}</Text>
                                    <Text className="mt-2 line-clamp-2">{job.description}</Text>
                                    
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {job.skillsRequired.map((skill, index) => (
                                            <Badge key={index} variant="outline" color="#2E6F40">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-4">
                                    <Text className="text-xl font-bold text-[#2E6F40]">${job.amount}</Text>
                                    <Group>
                                        <Button
                                            variant="outline"
                                            color="#2E6F40"
                                            leftIcon={<Edit size={16} />}
                                            onClick={() => navigate(`/employer/edit-job/${job.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            color="red"
                                            leftIcon={<Trash size={16} />}
                                            onClick={() => handleDelete(job.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Group>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t">
                                <Text size="sm" c="dimmed">
                                    <span className="font-medium text-gray-900">{job.proposalsCount}</span> proposals received
                                </Text>
                            </div>
                        </Paper>
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                        <Text c="dimmed">No jobs found matching your search.</Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageJob;
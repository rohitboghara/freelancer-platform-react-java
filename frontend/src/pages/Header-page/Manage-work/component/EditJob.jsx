import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Loader, TextInput, Textarea, NumberInput, MultiSelect, Button, Paper, Title, Group, InputLabel, Select } from "@mantine/core";

const EditJob = () => {
    const { id } = useParams(); // Get job ID from URL
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setJob(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error);
                setError(error.response?.data?.message || 'Failed to fetch job details');
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/jobs/${id}`, job, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert('Job updated successfully!');
            navigate('/employer/manage-jobs'); // Redirect back to manage jobs
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <Paper shadow="sm" radius="md" p="xl" className="bg-white">
                    <Title order={2} className="mb-6">Edit Job</Title>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 mt-5">
                        <div className="flex flex-col">
                            <InputLabel>Job Title</InputLabel>
                            <TextInput
                            variant="unstyled"
                            value={job?.title || ''}
                            onChange={(e) => setJob({ ...job, title: e.target.value })}
                            
                            className="w-full border pl-3 border-gray-300 rounded-md"
                        />
                        </div>
                        
                        <div className="flex flex-col">
                            <InputLabel>Job Description</InputLabel>
                            <Textarea
                            variant="unstyled"
                            placeholder="Enter detailed job description"
                            value={job?.description || ''}
                            onChange={(e) => setJob({ ...job, description: e.target.value })}
                            className="w-full border pl-3 border-gray-300 rounded-md"
                            minRows={3}
                        />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel>Required Skills</InputLabel>
                            <MultiSelect
                            variant="unstyled"
                            placeholder="Select skills or type to add new"
                            data={["JavaScript", "React", "Node.js", "Express.js", "Angular", "Next.js", "Python", "Java", "HTML", "CSS"]}
                            value={job?.skillsRequired || []}
                            onChange={(value) => setJob({ ...job, skillsRequired: value })}
                            className="w-full border pl-3 border-gray-300 rounded-md"
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Add ${query}`}
                        />
                        </div>
                        

                        <Group grow>
                            <div className="flex flex-col">
                                <InputLabel>Duration</InputLabel>
                                <TextInput
                               variant="unstyled"
                                placeholder="e.g., 6 months"
                                value={job?.duration || ''}
                                onChange={(e) => setJob({ ...job, duration: e.target.value })}
                                className="w-full border pl-3 border-gray-300 rounded-md"
                            />
                            </div>
                            
                            <div className="flex flex-col">
                                <InputLabel>Amount</InputLabel>
                                <NumberInput
                                variant="unstyled"
                                placeholder="Enter amount"
                                value={job?.amount || 0}
                                onChange={(value) => setJob({ ...job, amount: value })}
                                className="w-full border pl-3 border-gray-300 rounded-md"
                                min={0}
                            />
                            </div>
                            
                        </Group>
                        <div className="flex flex-col">
                            <InputLabel>Payout Method</InputLabel>
                            <TextInput
                                variant="unstyled"
                                placeholder="e.g., Sprint based"
                                value={job?.payout_methods || ''}
                                onChange={(e) => setJob({ ...job, payout_methods: e.target.value })}
                                className="w-full border pl-3 border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel>Job Status</InputLabel>
                            <Select
                                variant="unstyled"
                                value={job?.status || 'ACTIVE'}
                                onChange={(value) => setJob({ ...job, status: value })}
                                data={[
                                    { value: 'ACTIVE', label: 'Active' },
                                    { value: 'CLOSED', label: 'Closed' },
                                    { value: 'COMPLETED', label: 'Completed' }
                                ]}
                                className="w-full border pl-3 border-gray-300 rounded-md"
                            />
                        </div>

                        <Group position="right" mt="xl">
                            <Button 
                                variant="outline" 
                                color="#2E6F40"
                                onClick={() => navigate("/employer/manage-jobs")}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                color="#2E6F40"
                            >
                                Save Changes
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </div>
        </div>
    );
};

export default EditJob;
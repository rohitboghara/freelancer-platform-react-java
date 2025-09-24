import { useState } from "react";
import axios from "axios";
import { TextInput, Textarea, NumberInput, MultiSelect, Button, Paper, Title, Group, ActionIcon, InputLabel } from "@mantine/core";
import { Plus, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

const AddJob = () => {
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        skillsRequired: [],
        duration: "",
        amount: 0,
        payout_methods: "",
        status: "ACTIVE",
        modules: [
            {
                title: "",
                description: "",
                amount: 0
            }
        ]
    });

    const handleModuleChange = (index, field, value) => {
        const updatedModules = [...jobData.modules];
        updatedModules[index] = {
            ...updatedModules[index],
            [field]: value
        };
        setJobData({ ...jobData, modules: updatedModules });
    };

    const addModule = () => {
        setJobData({
            ...jobData,
            modules: [...jobData.modules, { title: "", description: "", amount: 0 }]
        });
    };

    const removeModule = (index) => {
        const updatedModules = jobData.modules.filter((_, i) => i !== index);
        setJobData({ ...jobData, modules: updatedModules });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/jobs/addjob`, jobData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            // Reset form to initial state
            setJobData({
                title: "",
                description: "",
                skillsRequired: [],
                duration: "",
                amount: 0,
                payout_methods: "",
                status: "ACTIVE",
                modules: [
                    {
                        title: "",
                        description: "",
                        amount: 0
                    }
                ]
            });
            // Optional: Show success message or notification here
        } catch (error) {
            console.error("Error creating job:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <Paper shadow="sm" radius="md" p="xl" className="bg-white">
                    <Title order={2} className="mb-6">Create New Job</Title>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-5">
                        <div className="flex flex-col">
                            <InputLabel required>Job Title</InputLabel>
                            <TextInput
                                variant="unstyle"
                                placeholder="Enter job title"
                                value={jobData.title}
                                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                                className="w-full border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel required>Job Description</InputLabel>
                            <Textarea
                                placeholder="Enter detailed job description"
                                variant="unstyle"
                                minRows={3}
                                value={jobData.description}
                                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                                className="w-full border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel required>Required Skills</InputLabel>
                            <MultiSelect
                                placeholder="Select skills or type to add new"
                                data={["JavaScript", "React", "Node.js", "Express.js", "Angular", "Next.js", "Python", "Java", "HTML", "CSS", "Bootstrap", "Tailwindcss", "Springboot", "Django", "Flask", "Laravel", "MongoDB", "MySQL", "PostgreSQL", "SQLite", "Redis", "GraphQL", "REST API", "Docker", "Kubernetes", "AWS", "Azure", "GCP","php",".Net","Typescript"
                                ]}
                                value={jobData.skillsRequired}
                                onChange={(value) => setJobData({ ...jobData, skillsRequired: value })}
                                className="w-full border border-gray-300 rounded-md"
                                variant="unstyle"
                                searchable
                                creatable
                                getCreateLabel={(query) => `+ Add ${query}`}
                                onCreate={(query) => {
                                    const item = { value: query, label: query };
                                    return item;
                                }}
                            />
                        </div>


                        <Group grow>
                            <div className="flex flex-col">
                                <InputLabel required>Duration</InputLabel>
                                <TextInput
                                    variant="unstyle"
                                    placeholder="e.g., 6 months"
                                    value={jobData.duration}
                                    onChange={(e) => setJobData({ ...jobData, duration: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex flex-col">
                                <InputLabel required>Total Amount</InputLabel>
                                <NumberInput
                                    variant="unstyle"
                                    placeholder="Enter amount"
                                    value={jobData.amount}
                                    onChange={(value) => setJobData({ ...jobData, amount: value })}
                                    className="w-full border border-gray-300 rounded-md"
                                    min={0}
                                />
                            </div>

                        </Group>
                        <div className="flex flex-col">
                            <InputLabel required>Payout Method</InputLabel>
                            <TextInput
                                variant="unstyle"
                                placeholder="e.g., Sprint based"
                                value={jobData.payout_methods}
                                onChange={(e) => setJobData({ ...jobData, payout_methods: e.target.value })}
                                className="w-full border border-gray-300 rounded-md"
                            />
                        </div>


                        <div className="space-y-4">
                            <Group position="apart">
                                <Title order={4}>Modules</Title>
                                <Button
                                    leftIcon={<Plus size={16} />}
                                    variant="outline"
                                    onClick={addModule}
                                    color="#2E6F40"
                                >
                                    Add Module
                                </Button>
                            </Group>

                            {jobData.modules.map((module, index) => (
                                <Paper key={index} p="md" withBorder className="relative">
                                    <ActionIcon
                                        color="red"
                                        variant="subtle"
                                        onClick={() => removeModule(index)}
                                        className="absolute top-0 -right-152"
                                        disabled={jobData.modules.length === 1}
                                    >
                                        <X size={16} />
                                    </ActionIcon>

                                    <div className="space-y-4">
                                        <div className="flex flex-col">
                                            <InputLabel required>Module Title</InputLabel>
                                            <TextInput
                                                variant="unstyle"
                                                value={module.title}
                                                onChange={(e) => handleModuleChange(index, "title", e.target.value)}
                                                className="w-full border border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <InputLabel required>Module Description</InputLabel>
                                            <Textarea
                                                variant="unstyle"
                                                value={module.description}
                                                onChange={(e) => handleModuleChange(index, "description", e.target.value)}
                                                className="w-full border border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <InputLabel required>Module Amount</InputLabel>
                                            <NumberInput
                                                variant="unstyle"
                                                value={module.amount}
                                                onChange={(value) => handleModuleChange(index, "amount", value)}
                                                className="w-full border border-gray-300 rounded-md"
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                </Paper>
                            ))}
                        </div>

                            <Button
                                type="submit"
                                loading={loading}
                                color="#2E6F40"
                            >
                                Create Job
                            </Button>
                    </form>
                </Paper>
            </div>
        </div>
    );
};

export default AddJob;
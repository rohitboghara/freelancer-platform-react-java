import { Badge, Button, Card, Divider, Group, Loader, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ByJob = () => {
    const { job } = useParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/jobs-by-catogory/${job}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                setJobs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };
        fetchJobs();
    }, [job])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader color="#2E6F40" size="xl" />
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <Text size="xl" fw={600} color="dimmed">No Freelancers Found</Text>
                <Text size="md" color="gray" mt={2}>
                    We couldn't find any client with the job {job}
                </Text>
                <Link to="/job" className="mt-6">
                    <Button variant="light" color="#2E6F40">
                        Back to All Freelancers
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto p-6">
            {jobs.map((project, index) => (
                <Card
                    key={index}
                    padding="lg"
                    radius="md"
                    withBorder
                    className="relative text-start w-full min-h-[420px] flex flex-col shadow-lg"
                >
                    {/* Content Wrapper */}
                    <div className="flex-grow flex flex-col gap-5">

                        {/* Logo & Name */}
                        <div className="flex items-center gap-3">
                            <img src="https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer2.jpg" alt={project.clientName} className="w-12 h-12 rounded-full object-cover" />
                            <Text weight={700} size="md" color="#2e6f40" className="line-clamp-2">
                                {project.clientName}
                            </Text>
                        </div>

                        {/* Title */}
                        <Link to={`/project/${project.id}`}>
                            <Text size="lg" weight={500} className="line-clamp-2">
                                {project.title}
                            </Text>
                        </Link>

                        {/* Description */}
                        <Text size="sm" color="dimmed" className="line-clamp-3">
                            {project.description
                            }
                        </Text>

                        {/* Location and name */}
                        <Text size="sm" color="gray">
                            Location: {project.location}
                        </Text>

                        {/* Tags */}
                        <Group spacing="xs" className="my-2 flex-wrap">
                            {project.skillsRequired
                                .map((tag, idx) => (
                                    <Badge key={idx} variant="outline" color="#2e6f40" radius="sm">
                                        {tag}
                                    </Badge>
                                ))}
                            {project.skillsRequired?.length > 4 && (
                                <Badge size="md" color="gray" variant="light" className="hover:bg-gray-700 hover:text-white transition-colors">
                                    +{project.skillsRequired.length - 4} more
                                </Badge>
                            )}
                        </Group>
                    </div>

                    <Divider my="md" />

                    {/* Proposals and Rate */}
                    <div className="flex justify-between items-center">
                        <Text size="sm">Proposals: {project.proposalsCount
                        }</Text>
                        <Text size="sm" weight={500} className="text-[#2e6f40]">
                            {project.amount
                            }
                        </Text>
                    </div>

                    {/* Apply Now Button */}
                    <Link to={`/project/${project.id}`}>
                        <Button variant="filled" color="#2e6f40" fullWidth radius="md" className="mt-4">
                            Apply Now
                        </Button>
                    </Link>
                </Card>
            ))}
        </div>
    );
}

export default ByJob;
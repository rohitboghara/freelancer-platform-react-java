import { Avatar, Badge, Button, Card, Divider, Group, Loader, Text } from "@mantine/core";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ByCategory = () => {

    const { categorys } = useParams();
    const [category, setcategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRoleFromToken = (authToken) => {
        try {
          const decoded = jwtDecode(authToken);
          return decoded.role;
        } catch (error) {
          console.error("Invalid token:", error);
          return null;
        }
      };
    
    
      const authToken = localStorage.getItem('token');
      const role = getRoleFromToken(authToken);

    useEffect(() => {
        const fetchcategory = async () => {
            try {
                
                const response = await axios.get(`${role === "CLIENT" ? `${import.meta.env.VITE_API_URL}/user/bySkill/${categorys}` : `${import.meta.env.VITE_API_URL}/jobs/jobs-by-catogory/${categorys}`}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                setcategory(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category:', error);
                setLoading(false);
            }
        };
        fetchcategory();
    },[])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader color="#2E6F40" size="xl" />
            </div>
        );
    }

    if (category.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <Text size="xl" fw={600} color="dimmed">No Jobs Found</Text>
                <Text size="md" color="gray" mt={2}>
                    We couldn't find with this category {categorys}
                </Text>
            </div>
        );
    }

  return (
    role === "CLIENT" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-16 py-14">
            {category.map((talent, index) => (
                <Card
                    key={index}
                    padding="xl"
                    radius="md"
                    withBorder
                    className="hover:shadow-xl transition-all duration-300 hover:border-[#2E6F40] flex flex-col min-h-[450px] sm:min-h-[480px] lg:min-h-[500px]"
                >
                    <div className="flex flex-col items-center text-center h-full">
                        <div className="flex-grow space-y-6 w-full">
                            <Avatar
                                src={talent.profileDtoForCard.imageUrl}
                                size={90}
                                className="rounded-full border-4 border-[#2E6F40]/10 hover:border-[#2E6F40]/30 transition-colors mx-auto"
                            />
                            <div className="space-y-2 w-full">
                                <Text fw={600} size="xl" className="line-clamp-1">
                                    {talent.profileDtoForCard.fullName}
                                </Text>
                                <Text size="sm" color="dimmed" className="line-clamp-1">
                                    @{talent.username}
                                </Text>
                                <Text size="md" color="gray" className="font-medium line-clamp-2 px-2">
                                    {talent.profileDtoForCard.fieldOfWork}
                                </Text>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center min-h-[60px] max-h-28 overflow-y-auto px-2">
                                {talent.profileDtoForCard.skills &&
                                    Array.isArray(talent.profileDtoForCard.skills) &&
                                    talent.profileDtoForCard.skills.slice(0, 4).map((skill, i) => (
                                        <Badge
                                            key={i}
                                            size="md"
                                            color="#2E6F40"
                                            variant="light"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                {talent.profileDtoForCard.skills?.length > 4 && (
                                    <Badge size="md" color="gray" variant="light" className="hover:bg-gray-700 hover:text-white transition-colors">
                                        +{talent.profileDtoForCard.skills.length - 4} more
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="w-full mt-auto pt-6">
                            <Divider className="w-full mb-4" />

                            <div className="grid grid-cols-2 gap-4 text-start mb-4">
                                <div className="space-y-1">
                                    <Text size="sm" fw={500} color="dimmed">Location</Text>
                                    <Text size="sm" className="line-clamp-1">
                                        {talent.profileDtoForCard.location}
                                    </Text>
                                </div>
                                <div className="space-y-1 text-right">
                                    <Text size="sm" fw={500} color="dimmed">Rate</Text>
                                    <Text size="sm" className="text-[#2E6F40] font-medium">
                                        ${talent.profileDtoForCard.hourlyRate}/hr
                                    </Text>
                                </div>
                            </div>

                            <Link to={`/freelancer-profile/${talent.profileDtoForCard.id}`} className="w-full block">
                                <Button
                                    variant="filled"
                                    color="#2E6F40"
                                    size="md"
                                    fullWidth
                                    className="hover:bg-[#245332] transition-colors"
                                >
                                    View Profile
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto p-6">
            {category.map((project, index) => (
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
    )
  )
}

export default ByCategory

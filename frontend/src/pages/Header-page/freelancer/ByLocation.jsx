import { useEffect, useState } from "react";
import { Avatar, Badge, Button, Card, Divider, Loader, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const ByLocation = () => {

    const { location } = useParams();
    const [talents, setTalents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTalents = async () => {
            try {
                console.log('Fetching jobs for location:', location);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/byCountry/${location}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTalents(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching talents:', error);
                setLoading(false);
            }
        };
        fetchTalents();
    }, [location])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader color="#2E6F40" size="xl" />
            </div>
        );
    }

    if (talents.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <Text size="xl" fw={600} color="dimmed">No Freelancers Found</Text>
                <Text size="md" color="gray" mt={2}>
                    We couldn't find any freelancers with the location {location}
                </Text>
                <Link to="/talent" className="mt-6">
                    <Button variant="light" color="#2E6F40">
                        Back to All Freelancers
                    </Button>
                </Link>
            </div>
        );
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-16 py-14">
            {talents.map((talent, index) => (
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
  )
}

export default ByLocation



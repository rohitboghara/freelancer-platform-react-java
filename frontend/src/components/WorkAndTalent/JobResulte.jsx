import { Button, Card, Text, Group, Divider, Badge, Loader } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobResults = ({ searchQuery, searchTrigger }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleJobs, setVisibleJobs] = useState(8);

  useEffect(() => {
    const fetchJobs = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        setLoading(true);
        try {
            let endpoint = `${import.meta.env.VITE_API_URL}/jobs/alljobs`;
            let config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };

            if (searchQuery.trim() && searchTrigger > 0) {
                endpoint = `${import.meta.env.VITE_API_URL}/jobs/search-jobs`;
                config = {
                    ...config,
                    params: {
                        keyword: searchQuery.trim(),
                        fields: 'title,clientName,location,skillsRequired'
                    }
                };
            }

            const response = await axios.get(endpoint, config);
            setJobs(response.data);
            setVisibleJobs(8);
            setLoading(false);
        } catch (error) {
            if (error.response?.status === 403) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            console.error('Error fetching jobs:', error);
            setLoading(false);
        }
    };

    fetchJobs();
}, [searchQuery, searchTrigger]);

  const loadMore = () => {
    setVisibleJobs(prevVisible => prevVisible + 8);
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <Loader color="#2E6F40" size="xl" type="bars" />
                <Text className="mt-4 text-gray-600">Loading talents...</Text>
            </div>
        </div>
    );
}

  return (
    <div className="pb-10">
      {/* Header Section */}
      <div className="flex items-center justify-between px-16 mb-6">
        <p>Showing 1 &ndash; {Math.min(visibleJobs, jobs.length)} of {jobs.length} results</p>
      </div>

      {/* Job Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto p-6">
      {jobs.slice(0, visibleJobs).map((project, index) => (
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

      {/* View More Button */}
      {visibleJobs < jobs.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            variant="outline"
            color="#2e6f40"
            size="lg"
            className="hover:bg-[#2e6f40] hover:text-white transition-colors"
          >
            View More
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobResults;

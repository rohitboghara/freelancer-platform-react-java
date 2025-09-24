import { Card, Text, Button, Group, Skeleton } from '@mantine/core';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function ExpertFreelancers() {
  const scrollRef = useRef(null);
  const cardWidth = 300;
  const cardPadding = 20;

  const token = localStorage.getItem('token');

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = cardWidth + cardPadding;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const expertFreelancer = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/top-Freelancer`);
        setFreelancers(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    expertFreelancer();
  }, [])

  if (loading) {
    return (
      <div className="relative w-full flex items-center justify-center px-20">
        <button className="absolute left-5 p-3 bg-white rounded-full shadow-md">
          <ChevronLeft size={30} />
        </button>
        <div className="flex overflow-x-scroll no-scrollbar scroll-smooth">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div className='p-3' key={index}>
              <Card className='w-[248px] text-center' shadow="sm" padding="sm" radius="md" withBorder>
                <div className="relative flex justify-center p-5">
                  <Skeleton circle height={80} width={80} />
                  <Skeleton className="absolute top-0 right-0" circle height={40} />
                </div>
                <Skeleton height={20} width="70%" mx="auto" mb={8} />
                <Group justify="center" mt="xs">
                  <Skeleton height={14} width={14} />
                  <Skeleton height={14} width={30} />
                  <Skeleton height={14} width={60} />
                </Group>
                <Skeleton height={16} mt="xs" width="40%" mx="auto" />
                <Skeleton height={36} mt="md" radius="md" />
              </Card>
            </div>
          ))}
        </div>
        <button className="absolute right-5 bg-white p-3 rounded-full shadow-md">
          <ChevronRight size={30} />
        </button>
      </div>
    );
  }


  return (
    <div className="relative w-full flex items-center justify-center px-20">
      <button onClick={() => scroll("left")} className="absolute left-5 p-3 bg-white rounded-full shadow-md">
        <ChevronLeft size={30} />
      </button>
      <div ref={scrollRef} className="flex overflow-x-scroll no-scrollbar scroll-smooth">
        {freelancers.map((freelancer, index) => (
          <div className='p-3' key={index}>
            <Card className='w-[248px] text-center' shadow="sm" padding="sm" radius="md" withBorder>
              <div className="flex justify-center p-5">
                <img
                  src={freelancer.profileDtoForCard.imageUrl || "https://via.placeholder.com/80"}
                  alt="profile pic"
                  className='rounded-full h-24 w-24 object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <Text fw={600}>{freelancer.profileDtoForCard.fullName}</Text>
              <Group justify="center" mt="xs">
                <Star size={14} className="text-yellow-500" />
                <Text size="sm" fw={500}>{freelancer.profileDtoForCard.rating}</Text>
                <Text size="xs" c="dimmed">({freelancer.profileDtoForCard.reviewCount} Reviews)</Text>
              </Group>
              <Text size="sm" mt="xs" c="dimmed">{freelancer.profileDtoForCard.successRate}% Success Rate</Text>
              <Link to={`${!token ? "/login" : `/freelancer-profile/${freelancer.profileDtoForCard.id}`}`} className="w-full block mt-2">
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
            </Card>
          </div>
        ))}
      </div>
      <button onClick={() => scroll("right")} className="absolute right-5 bg-white p-3 rounded-full shadow-md">
        <ChevronRight size={30} />
      </button>
    </div>
  );
}

export default ExpertFreelancers;

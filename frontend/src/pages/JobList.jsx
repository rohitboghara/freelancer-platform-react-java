import { useEffect, useState } from "react";


import { Button } from "@mantine/core";
import { ArrowUp, Search } from "lucide-react";
import JobResulte from "../components/WorkAndTalent/JobResulte";

const JobList = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTrigger, setSearchTrigger] = useState(0);

    const handleSearch = () => {
        // Only trigger search if there's a query
        if (searchQuery.trim()) {
            setSearchTrigger(prev => prev + 1);
        }
    };


    const toggleVisibility = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Add scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <>
            <section className="flex justify-between my-16 px-16 py-5 bg-[#FEF1EC]">
                <div className="flex flex-col space-y-5 justify-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold">Job List</h1>
                        <p>Discover a variety of freelance jobs tailored to your skills.</p>
                    </div>

                    {/* Input Section */}
                    <div className="p-2.5 flex items-center justify-between rounded-sm bg-white shadow-md">
                        <div className="flex items-center w-xl px-4">
                            <Search className="text-black mr-2" size={20} />
                            <input
                                type="text"
                                placeholder="Service title, Skill, Location, Company name, etc."
                                className="w-full bg-transparent text-black placeholder:text-black placeholder:text-sm font-medium focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSearch();
                                    }
                                }}
                            />
                        </div>
                        <Button 
                            className="flex-shrink-0" 
                            size="xl" 
                            variant="filled" 
                            color="#2e6f40"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>
                </div>

                {/* Right-Side Image */}
                <div>
                    <img
                        src="https://demoapus1.com/freeio/wp-content/uploads/2023/07/h15.png"
                        alt="Job Search"
                        className="w-md"
                    />
                </div>
            </section>
            <JobResulte searchQuery={searchQuery} searchTrigger={searchTrigger} />
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-3 bg-[#2e6f40] text-white rounded-full shadow-lg hover:bg-[#29643a] transition-all duration-300"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </>
    );
};

export default JobList;

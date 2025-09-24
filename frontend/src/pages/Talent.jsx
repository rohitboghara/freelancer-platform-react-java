import { useEffect, useState } from "react";


import { Button } from "@mantine/core";
import { ArrowUp, Search } from "lucide-react";
import JobTalent from "../components/WorkAndTalent/JobTalent";

const Talent = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTrigger, setSearchTrigger] = useState(0);

    const handleSearch = () => {
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
            <section className="flex justify-between my-16 px-16 py-5 bg-purple-100">
                <div className="flex flex-col space-y-5 justify-center">
                    <div className="space-y-3 w-2xl">
                        <h1 className="text-3xl font-semibold">Discover Top Talent</h1>
                        <p>Explore a wide pool of skilled freelancers ready to bring your projects to life.</p>
                    </div>

                    {/* Input Section */}
                    <div className="p-2.5 flex items-center justify-between rounded-sm bg-white shadow-md">
                        <div className="flex items-center w-xl px-4">
                            <Search className="text-black mr-2" size={20} />
                            <input
                                type="text"
                                placeholder="Full Name, Username, Field of work, Skills, Location"
                                className="w-full bg-transparent text-black placeholder:text-black placeholder:text-sm font-medium focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
                        src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/slider5.png"
                        alt=""
                        className="w-md relative top-5"
                    />
                </div>
            </section>
            <section>
                <JobTalent searchQuery={searchQuery} searchTrigger={searchTrigger} />
            </section>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-3 bg-[#2e6f40] text-white rounded-full shadow-lg hover:bg-[#29643a] transition-all duration-300"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </>
    )
}

export default Talent

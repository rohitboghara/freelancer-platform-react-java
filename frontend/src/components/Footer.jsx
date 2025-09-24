import { Button, Input } from "@mantine/core"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"


const Footer = () => {
    return (
        <footer className="bg-[#253d2c] text-white/90">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-8 py-12 border-b border-white/10">
                    <div className="flex flex-col space-y-4">
                        <span className="font-semibold text-xl text-white mb-2">About</span>
                        <div className="flex flex-col space-y-3">
                            {['About Us', 'Become Seller', 'Jobs on Freeio', 'Pricing', 'Services Freeio', 'Terms of Service'].map((item) => (
                                <a key={item} href="#" className="hover:text-[#68BA7F] transition-colors duration-200 text-sm">{item}</a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <span className="font-semibold text-xl text-white mb-2">Categories</span>
                        <div className="flex flex-col space-y-3">
                            {['Design & Creative', 'Development & IT', 'Music & Audio', 'Programming & Tech', 'Digital Marketing', 'Finance & Accounting', 'Writing & Translation', 'Trending', 'Lifestyle'].map((item) => (
                                <a key={item} href="#" className="hover:text-[#68BA7F] transition-colors duration-200 text-sm">{item}</a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <span className="font-semibold text-xl text-white mb-2">Support</span>
                        <div className="flex flex-col space-y-3">
                            {['Help & Support', 'FAQ Freeio', 'Contact Us', 'Services', 'Terms of Service'].map((item) => (
                                <a key={item} href="#" className="hover:text-[#68BA7F] transition-colors duration-200 text-sm">{item}</a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-6">
                        <span className="font-semibold text-xl text-white">Subscribe</span>
                        <div className="flex bg-white/10 backdrop-blur-sm rounded-xl pl-4 py-2 w-full">
                            <Input 
                                variant="unstyled" 
                                placeholder="Your email address" 
                                className="flex-1 text-white placeholder:text-white/50"
                            />
                            <Button 
                                variant="transparent" 
                                color="white"
                            >
                                Send
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <span className="text-white text-md font-semibold">Follow Us</span>
                            <div className="flex items-center gap-3 mt-1.5">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                    <span key={index} className="h-10 w-10 hover:bg-[#29643a] rounded-full flex justify-center items-center transition-all duration-300 cursor-pointer hover:scale-110">
                                        <Icon size={20} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center px-6 lg:px-8 py-8">
                    <p className="text-white/60 text-sm">
                        &copy; {new Date().getFullYear()} Raj Aghera. All rights reserved.
                    </p>
                    <nav className="flex gap-6 mt-4 sm:mt-0">
                        <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Privacy</a>
                        <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Terms</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer

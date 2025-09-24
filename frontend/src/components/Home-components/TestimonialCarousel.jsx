import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


const testimonials = [
  {
    quote:
      "As a small business owner, finding the right talent used to be stressful and time-consuming. But this platform made it incredibly easy. I was able to post a job, review applications, and hire a top-rated designer all within 24 hours. What impressed me the most was the level of professionalism and the built-in review system that gave me confidence before hiring.",
    name: "Albert Flores",
    role: "Data Architect",
    rating: 4,
  },
  {
    quote:
      "We've worked with several freelancers through this platform—developers, UI/UX designers, and copywriters—and the quality has consistently been exceptional. The interface is intuitive, the communication tools are seamless, and the payment system is well thought out. What really sets this site apart is how seriously they take quality.",
    name: "Sarah Johnson",
    role: "Software Engineer",
    rating: 5,
  },
  {
    quote:
      "This site helped me scale my coaching business by connecting me with a virtual assistant and content writer who understood my brand perfectly. The hiring process was transparent and secure, and I loved being able to browse reviews and ratings before choosing who to work with. The entire experience—from job posting to project completion—was professional and smooth.",
    name: "Michael Brown",
    role: "Product Manager",
    rating: 4,
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="max-w-4xl mx-auto py-10 text-center">
      <div className="flex flex-col items-center justify-center space-y-4 mb-5">
        <img src="https://demoapus2.com/freelanhub/wp-content/uploads/2024/07/h51.png" alt="" />
        <h2 className="font-semibold text-4xl">Customer Reviews</h2>
      </div>

      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="w-full"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="pb-20">
            <blockquote className="text-xl italic">
              “{testimonial.quote}”
            </blockquote>
            <div className="mt-4 flex justify-center">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-xl text-[#2e6f40]">⭐</span>
              ))}

            </div>
            <p className="mt-2 font-semibold">
              {testimonial.name}{" "}
              <span className="text-gray-500">/ {testimonial.role}</span>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

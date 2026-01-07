import React, { useState, useEffect } from 'react';

const Banner = () => {
    // 1. Data: Hamare Banners ki list (Images)
    const banners = [
        {
            id: 1,
            image: "https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sale_23-2150852978.jpg?w=1380",
            title: "Super Sale - 50% Off",
            description: "On all latest mobile phones"
        },
        
        {
            id: 3,
            image: "https://img.freepik.com/free-vector/flat-design-shopping-center-social-media-cover-template_23-2149318182.jpg?w=1380",
            title: "Headphones Fest",
            description: "Noise cancelling headphones at best price"
        },
        {
            id: 4,
            image: "https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-2158.jpg?w=1380",
            title: "Smart Watches",
            description: "Track your fitness with style"
        }
    ];

    // 2. State: Abhi kaunsi slide dikhani hai? (0 se shuru)
    const [currentSlide, setCurrentSlide] = useState(0);

    // 3. Logic: Next Slide par jane ke liye
    const nextSlide = () => {
        // Agar last slide par hain, to wapas 0 (first) par aa jao, nahi to +1 karo
        setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    // 4. Logic: Previous Slide par jane ke liye
    const prevSlide = () => {
        // Agar 0 par hain, to last wale par chale jao, nahi to -1 karo
        setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    // 5. Auto Play: Har 3 second mein apne aap change hoga
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000); // 3000ms = 3 seconds

        // Safai abhiyan: Jab component hatega, timer band kar denge (Memory leak se bachne ke liye)
        return () => clearInterval(interval);
    }, [currentSlide]); // Jab slide badle, timer reset ho

    return (
        <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden bg-gray-200 mt-2">

            {/* --- SLIDES --- */}
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute w-full h-full transition-transform duration-700 ease-in-out flex items-center justify-center
            ${index === currentSlide ? "translate-x-0" : "translate-x-full hidden"}`}
                // Note: Hum sirf current slide ko dikha rahe hain
                >
                    {/* Background Image */}
                    <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover opacity-90"
                    />

                    {/* Text Overlay (Flipkart jaisa) */}
                    <div className="absolute left-10 bottom-10 md:left-20 md:bottom-20 text-white drop-shadow-lg">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">{banner.title}</h2>
                        <p className="text-lg md:text-xl bg-black bg-opacity-50 px-2 rounded inline-block">
                            {banner.description}
                        </p>
                    </div>
                </div>
            ))}

            {/* --- NAVIGATION BUTTONS (Arrows) --- */}

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-black/30 hover:bg-black/50 text-white border-none z-10"
            >
                ❮
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-black/30 hover:bg-black/50 text-white border-none z-10"
            >
                ❯
            </button>

            {/* --- DOTS INDICATORS (Niche wale chote bindu) --- */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-400"}`}
                    ></button>
                ))}
            </div>

        </div>
    );
};

export default Banner;
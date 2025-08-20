import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);
  const project4Ref = useRef(null);

  // State to track which cards are flipped on mobile
  const [flippedCards, setFlippedCards] = useState([false, false, false, false]);
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Consider devices below 1024px as mobile
    };

    // Check initially
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle card flip on mobile
  const handleCardClick = (index) => {
    if (isMobile) {
      const newFlippedCards = [...flippedCards];
      newFlippedCards[index] = !newFlippedCards[index];
      setFlippedCards(newFlippedCards);
    }
  };

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [project1Ref.current, project2Ref.current, project3Ref.current, project4Ref.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase pt-0 md:pt-10">
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">My Projects</h2>
        <div className="showcaselayout">
          <div className="projects-grid">
            <div ref={project1Ref} className="project-card">
              <div
                className="project-image-wrapper group perspective-1000"
                onClick={() => handleCardClick(0)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isMobile ? (flippedCards[0] ? 'rotate-y-180' : '') : 'group-hover:rotate-y-180'}`}>
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <img src="/images/Employee management system.png" alt="Employee Management System" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -translate-x-full group-hover:translate-x-[300%] pointer-events-none shine-effect"></div>
                    {isMobile && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tap for info
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-[#337D8D] to-[#1e3a8a] flex items-center justify-center rounded-xl">
                    {isMobile && (
                      <div className="absolute top-4 right-4">
                        <button
                          className="bg-white/20 text-white rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(0);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="text-center text-white p-4 md:p-6">
                      <p className="text-xs md:text-sm opacity-90">The Employee Management System is a comprehensive web application with dual authentication flows for managers/admins and employees, featuring role-based access control (admin, manager, employee) with distinct permission levels and dashboards for each role. The system includes robust task management with assignment, tracking, feedback, and file attachments, plus AI-powered features (using OpenAI) for task analysis, priority suggestions, deadline warnings, and a chatbot for employee assistance.</p>
                      <a
                        href="https://sourav-emp-ms.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
                      >
                        View Live Project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="project-title">Employee Management System</h2>
            </div>

            <div className="project-card" ref={project2Ref}>
              <div
                className="project-image-wrapper bg-[#FFEFDB] group perspective-1000"
                onClick={() => handleCardClick(1)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isMobile ? (flippedCards[1] ? 'rotate-y-180' : '') : 'group-hover:rotate-y-180'}`}>
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <img
                      src="/images/E-commerce.png"
                      alt="E-commerce Website"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -translate-x-full group-hover:translate-x-[300%] pointer-events-none shine-effect"></div>
                    {isMobile && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tap for info
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-[#0A122E] to-[#0a1a52] flex items-center justify-center rounded-xl">
                    {isMobile && (
                      <div className="absolute top-4 right-4">
                        <button
                          className="bg-white/20 text-white rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(1);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="text-center text-white p-4 md:p-6">
                      <p className="text-xs md:text-sm opacity-90">This project is a responsive E-Commerce Website developed using HTML, CSS, JavaScript, jQuery, and Bootstrap, designed to deliver a modern and user-friendly shopping experience. It features a robust multi-vendor system that allows multiple sellers to manage their products, along with an integrated shopping cart, advanced product filtration, and real-time search functionality for easy navigation. Additionally, the platform supports multi-role user access, enabling separate dashboards for admins, vendors, and customers, ensuring smooth operations, scalability, and efficient management of the marketplace.</p>
                      <a
                        href="https://sourav555.pythonanywhere.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
                      >
                        View Live Project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="project-title">Ecommerce Website</h2>
            </div>

            <div className="project-card" ref={project3Ref}>
              <div
                className="project-image-wrapper bg-[#FFEFDB] group perspective-1000"
                onClick={() => handleCardClick(2)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isMobile ? (flippedCards[2] ? 'rotate-y-180' : '') : 'group-hover:rotate-y-180'}`}>
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <img
                      src="/images/8-tile-puzzle.png"
                      alt="8-Tile Puzzle Game"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -translate-x-full group-hover:translate-x-[300%] pointer-events-none shine-effect"></div>
                    {isMobile && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tap for info
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-[#0A122E] to-[#001d88] flex items-center justify-center rounded-xl">
                    {isMobile && (
                      <div className="absolute top-4 right-4">
                        <button
                          className="bg-white/20 text-white rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(2);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="text-center text-white p-4 md:p-6">
                      <p className="text-xs md:text-sm opacity-90">An interactive 8-tile 3x3 sliding puzzle game built using only HTML, CSS, and JavaScript.
                        Players slide numbered tiles into the empty space to arrange them in the correct order.
                        The game runs fully on the browser with no backend or logging, offering a simple yet engaging puzzle experience.</p>
                      <a
                        href="/ProjectsFolder/TileSlide/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
                      >
                        Play Game
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="project-title">8-Tile Puzzle Game</h2>
            </div>

            <div className="project-card" ref={project4Ref}>
              <div
                className="project-image-wrapper bg-[#FFE7EB] group perspective-1000"
                onClick={() => handleCardClick(3)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isMobile ? (flippedCards[3] ? 'rotate-y-180' : '') : 'group-hover:rotate-y-180'}`}>
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <img
                      src="/images/School management system.png"
                      alt="School Management System"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -translate-x-full group-hover:translate-x-[300%] pointer-events-none shine-effect"></div>
                    {isMobile && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tap for info
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-[#001E3F] to-[#0e5fb7] flex items-center justify-center rounded-xl">
                    {isMobile && (
                      <div className="absolute top-4 right-4">
                        <button
                          className="bg-white/20 text-white rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(3);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="text-center text-white p-4 md:p-6">
                      <p className="text-xs md:text-sm opacity-90">This is a comprehensive Django-based School Management System with role-based access control featuring multiple user roles (Administrator, Sub-Admin, Teacher, Class Teacher, Parent) and extensive functionality including student management, attendance tracking, academic progress monitoring, event management, and parent notifications. The system implements robust user authentication with Django's built-in User model extended through OneToOneField relationships, and provides specialized dashboards for each user role with appropriate access controls and permissions.</p>
                      <a
                        href="https://sourav545.pythonanywhere.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
                      >
                        View Live Project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="project-title">School Management System</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;

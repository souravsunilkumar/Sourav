import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden pb-32 xl:pb-0">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout md:flex md:flex-row xl:px-10">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center xl:w-1/2 md:w-1/2 w-full md:px-10 px-5 z-20">
          {/* Profile Picture */}
          <div className="flex justify-start mb-8">
            <div className="relative">
              <img
                src="/images/Me BW.png"
                alt="Sourav Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-1 border-white-50 shadow-lg object-cover"
              />
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none max-w-xl">
              Hi, I'm Sourav, a Full-Stack Developer with expertise in React, FastAPI, Django, and MongoDB, and a strong passion for AI and AI-integrated applications. I adapt quickly to new challenges and enjoy exploring diverse tech stacks, fine-tuning performance, and designing scalable solutions.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure className="flex items-center justify-center h-full xl:w-1/2 md:w-1/2 w-full relative">
          <div className="xl:static md:static relative xl:h-full md:h-full h-[40vh] w-full flex items-center justify-center mt-10 md:mt-0">
            <HeroExperience />
          </div>
        </figure>
      </div>

      <div className="mt-[50vh] md:mt-[40vh] xl:mt-20">
        <AnimatedCounter />
      </div>
    </section>
  );
};

export default Hero;

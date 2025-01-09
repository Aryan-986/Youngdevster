import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SplitType from 'split-type';

const WorkCard = ({ title, description, image, link, tech }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.1
    });

    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5
    });
    
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.5
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-900 p-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
      whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          ref={imageRef}
          className="h-full w-full bg-cover bg-center transition-transform duration-500"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <motion.h3 
            className="text-3xl font-bold text-white"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="mt-2 max-w-md text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
        </div>
        
        <div>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {tech.map((item, index) => (
              <span 
                key={index}
                className="rounded-full bg-white/10 px-3 py-1 text-sm text-yellow-500"
              >
                {item}
              </span>
            ))}
          </motion.div>
          
          <motion.a
            href={link}
            className="mt-4 inline-flex items-center gap-2 text-white hover:text-yellow-400"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            View Project
            <svg 
              className="h-4 w-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Split text animation for main heading
    const text = new SplitType(headingRef.current, { types: 'chars' });
    gsap.from(text.chars, {
      opacity: 0,
      y: 100,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Paragraph animation
    gsap.from('.portfolio-description', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.portfolio-description',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  const projects = [
    {
      title: "Protofolio Website",
      description: "We build portfolio websites to showcase your skills and achievements, complete with contact options and fully customizable features tailored to your needs. ",
      image: "/img/protfolio.png",
      link: "#",
      tech: ["React", "Node.js", "Next", "GSAP", "Three"]
    },
    {
      title: "Agencie Protofolio Website",
      description: "We build portfolio websites to showcase your skills and achievements, complete with contact options and fully customizable features tailored to your needs. ",
      image: "/img/agencieprotfolio.png",
      link: "#",
      tech: ["React", "Node.js", "Next", "GSAP", "Three"]
    },
    {
      title: "Reparing Website",
      description: "We build full-stack repair and servicing websites with WhatsApp integration, offering seamless communication, service tracking, and customized features for your business.",
      image: "/img/repairshop.png",
      link: "#",
      tech: ["React", "Javascript", "Node", "MongoDB"]
    },
    {
      title: "Full Stack Ecommerce Website",
      description: "We create full-stack e-commerce websites with secure payment integration and a wide range of customizable features to enhance user experience and meet your business needs.",
      image: "/img/current.png",
      link: "#",
      tech: ["Next.js", "React", "MongoDB", "Javascript", "Node"]
    }
  ];

  return (
    <section className="portfolio-section bg-gray-950 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-24 text-center">
          <h2 
            ref={headingRef}
            className="relative mb-6 font-clash text-6xl font-bold text-yellow-500 md:text-7xl lg:text-8xl"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
              textShadow: '0 0 20px rgba(234, 179, 8, 0.3)'
            }}
          >
            Works We Have Done
          </h2>
          <p className="portfolio-description mx-auto max-w-3xl text-lg text-white">
            Transforming ideas into digital reality. Each project represents our commitment to excellence,
            combining cutting-edge technology with creative design to deliver exceptional user experiences.
            Browse through our carefully crafted solutions that have helped businesses achieve their digital goals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <WorkCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
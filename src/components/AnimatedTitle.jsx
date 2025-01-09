import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '100 bottom',
                    end: 'center bottom',
                    toggleActions: 'play none none reverse',
                }
            });

            titleAnimation.fromTo('.animated-word', 
                {
                    opacity: 0,
                    rotationY: 90,
                    rotationX: -45,
                    y: 50
                },
                {
                    opacity: 1,
                    rotationY: 0,
                    rotationX: 0,
                    y: 0,
                    ease: 'power2.out',
                    stagger: 0.03,
                    duration: 0.8
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const renderWord = (text) => {
        return text.split(/(<\/?b>)/).map((part, index) => {
            if (part === '<b>') return '';
            if (part === '</b>') return '';
            return part.split('').map((char, charIndex) => (
                <span 
                    key={`${index}-${charIndex}`} 
                    className="animated-word inline-block"
                >
                    {char}
                </span>
            ));
        });
    };

    return (
        <div className={`animated-title ${containerClass}`} ref={containerRef}>
            {title.split('<br />').map((line, index) => (
                <div 
                    key={index} 
                    className="flex max-w-full flex-wrap items-center justify-center gap-2 px-10 md:gap-3"
                >
                    {renderWord(line)}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;
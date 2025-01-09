import { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => {
      const newCount = prev + 1; // Calculate the new count inside the updater
      console.log(`Video loaded: ${newCount}/${totalVideos}`); // Log loaded count 
      return newCount; // Return the updated state
    });
  };
  

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // Effect to check if all videos are loaded
  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Effect for handling video transitions
  useEffect(() => {
    if (hasClicked) {
      gsap.set(nextVideoRef.current, { visibility: 'visible' });

      gsap.to(nextVideoRef.current, {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVideoRef.current.play(),
      });

      gsap.from(currentVideoRef.current, {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    }
    
    // Cleanup function to reset visibility after transition
    return () => {
      gsap.set(nextVideoRef.current, { visibility: 'hidden' });
    };
  }, [hasClicked, currentIndex]);

  // Effect for scroll-triggered animations
  useEffect(() => {
    gsap.set('#video-frame', {
      
      clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0% 0% 0% 0%',
    });

    gsap.from('#video-frame', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        borderRadius: '0 0 20% 10%',
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
    
    // Cleanup function for ScrollTrigger
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
  }, []);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className=""> 
          <div className="three-body">
            <div className="three-body__dot"/>
            <div className="three-body__dot"/>
            <div className="three-body__dot"/>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mack-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="next-video"
                className="size-64 origin-center scale-150 object-center"
                onLoadedData={handleVideoLoad}
                onError={() => console.error(`Failed to load video: ${getVideoSrc(currentIndex)}`)}
              />
            </div>
          </div>
          <video
            ref={currentVideoRef}
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          YOUNG <b>DEV</b>STER
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-yellow-600">
              Innovate
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 font-semibold">
              Empowering your vision with cutting-edge web solutions
              <br />
            </p>
            <Button
              id="watch-trailer"
              title="Call US NOW"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

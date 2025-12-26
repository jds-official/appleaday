// src/components/Intro.tsx
'use client';
import { useRef } from 'react';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
// import ScrollArrow from '@/components/ScrollArrow';
// import GrandFormat from '@/components/GrandFormat';

// gsap.registerPlugin(ScrollTrigger);

export default function TextHighlight() {
  // useGSAP(() => {
  //   gsap.fromTo(
  //     mountainRef.current,
  //     { backgroundPositionY: '0' },
  //     {
  //       backgroundPositionY: '-30vh',
  //       scrollTrigger: {
  //         trigger: mountainRef.current,
  //         start: 'top top',
  //         scrub: true,
  //       },
  //     },
  //   );
  //   gsap.fromTo(
  //     fadeRef.current,
  //     {
  //       yPercent: 200,
  //       autoAlpha: 0,
  //     },
  //     {
  //       yPercent: 0,
  //       autoAlpha: 1,
  //       duration: 2,
  //       delay: 3.5,
  //     },
  //   );
  //   gsap.fromTo(
  //     fadeRef.current,
  //     {
  //       autoAlpha: 1,
  //     },
  //     {
  //       autoAlpha: 0,
  //       scrollTrigger: {
  //         trigger: mountainRef.current,
  //         start: 'top top',
  //         end: '+300',
  //         scrub: true,
  //       },
  //     },
  //   );
  //   gsap.fromTo(
  //     typeRef.current,
  //     {
  //       width: '0',
  //     },
  //     {
  //       width: '100%',
  //       duration: 1.5,
  //       ease: 'steps(16)',
  //     },
  //   );
  // });
  const headline = `an apple a day for January`;
  const sub = `I'm a photographer and web developer in the Hudson Valley, NY.`;
  return (
    <div className="min-h-[100vh] pt-18 xs:pt-25 pl-4 pr-4 flex flex-col items-center font-sans relative bg-fixed will-change-[background-position-y] bg-size-[265%] md:bg-size-[180%] lg:bg-size-[100%]">
      <div className="hidden [@media(max-height:450px)]:block">
        <p className="text-xl relative -top-4">
          Hi! FYI your viewport is quite horizontally-oriented at the moment.
          Your results may vary if you do not turn your device or resize your
          screen.
        </p>
      </div>
      <h2 className="text-2xl xs:text-4xl font-bold whitespace-nowrap mt-4">
        <div className="relative overflow-hidden">{headline}</div>
      </h2>
      <div className="relative overflow-hidden text-center">
        <h3 className="inline-block animate-revealUp translate-y-full text-md xs:text-xl md:text-2xl">
          {sub}
        </h3>
      </div>
    </div>
  );
}

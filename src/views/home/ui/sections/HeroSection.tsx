'use client'

import { I18nLabel } from '@/shared/i18n'
import { routePaths } from '@/shared/routes'
import { BackgroundImageCarousel } from '@/shared/ui'
import Link from 'next/link'
import { Fade, Slide } from 'react-awesome-reveal'

const HeroSection = () => {
   return (
      <div className="w-full h-full relative overflow-hidden">
         <BackgroundImageCarousel
            images={[
               '/images/chicken.jpg',
               '/images/spaghetti.jpg',
               '/images/beer.jpg',
               '/images/rice.jpg',
            ]}
         />
         <div className="absolute z-20 top-0 left-0 right-0 bottom-0 bg-linear-to-b from-black/25 to-black/70 lg:py-24">
            <nav className="container text-white ">
               <ul className="flex justify-center items-center gap-12 xl:gap-24 xl:w-3/4 mx-auto p-2 rounded-lg bg-hite/20">
                  {[
                     {
                        label: 'A propos',
                        path: routePaths.ABOUTuS,
                     },
                     {
                        label: 'Le Chef',
                        path: routePaths.OURCHEF,
                     },
                     {
                        label: 'Services',
                        path: routePaths.SERVICES,
                     },
                  ].map(({ label, path }) => (
                     <li key={path}>
                        <a href={path} className="xl:text-xl font-plus-jakarta">
                           <I18nLabel label={label} />
                        </a>
                     </li>
                  ))}
               </ul>
            </nav>
            <section className="container xl:mt-10 xl:mb-6 3xl:mt-24">
               <Fade triggerOnce delay={300} duration={500}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="1300"
                     height="260"
                     viewBox="230 0 1300 260"
                     role="img"
                     aria-label="MAMA SARAH distressed text tuned 180px less scratches Bebas">
                     <defs>
                        <style>{`.bebas { font-family: var(--font-bebas), sans-serif; font-size: 250px; font-weight: 700; }`}</style>

                        <filter id="edgeRoughenTuned" x="-8%" y="-20%" width="116%" height="140%">
                           <feTurbulence
                              type="fractalNoise"
                              baseFrequency="0.62"
                              numOctaves="1"
                              seed="15"
                              result="edgeNoise"
                           />
                           <feDisplacementMap
                              in="SourceGraphic"
                              in2="edgeNoise"
                              scale="3.4"
                              xChannelSelector="R"
                              yChannelSelector="G"
                           />
                        </filter>

                        <filter
                           id="verticalScratchTuned"
                           x="-10%"
                           y="-10%"
                           width="120%"
                           height="120%">
                           <feTurbulence
                              type="fractalNoise"
                              baseFrequency="0.010 0.58"
                              numOctaves="2"
                              seed="48"
                              result="streaks"
                           />
                           <feColorMatrix
                              in="streaks"
                              type="matrix"
                              values="0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 26 -16.8"
                              result="scratchAlpha"
                           />
                        </filter>

                        <filter id="chipNoiseTuned" x="-10%" y="-10%" width="120%" height="120%">
                           <feTurbulence
                              type="fractalNoise"
                              baseFrequency="0.18"
                              numOctaves="2"
                              seed="73"
                              result="chips"
                           />
                           <feColorMatrix
                              in="chips"
                              type="matrix"
                              values="0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 20 -13.8"
                              result="chipAlpha"
                           />
                        </filter>

                        <linearGradient id="topBottomDamageBias" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="black" />
                           <stop offset="16%" stopColor="black" />
                           <stop offset="36%" stopColor="white" />
                           <stop offset="64%" stopColor="white" />
                           <stop offset="84%" stopColor="black" />
                           <stop offset="100%" stopColor="black" />
                        </linearGradient>

                        <clipPath id="textClipTuned">
                           <text
                              x="800"
                              y="218"
                              text-anchor="middle"
                              className="bebas"
                              fontSize="200"
                              fontWeight="500"
                              letterSpacing="6">
                              MAMA SARAH
                           </text>
                        </clipPath>

                        <mask
                           id="distressMaskTuned"
                           maskUnits="userSpaceOnUse"
                           x="0"
                           y="0"
                           width="1600"
                           height="320">
                           <rect x="0" y="0" width="1600" height="320" fill="black" />

                           <text
                              x="800"
                              y="218"
                              text-anchor="middle"
                              className="bebas"
                              fontSize="200"
                              fontWeight="500"
                              letterSpacing="6"
                              fill="white">
                              MAMA SARAH
                           </text>

                           <g clipPath="url(#textClipTuned)" mask="url(#damageBiasMask)">
                              <rect
                                 x="0"
                                 y="0"
                                 width="1600"
                                 height="320"
                                 fill="black"
                                 filter="url(#verticalScratchTuned)"
                                 opacity="0.42"
                              />
                           </g>

                           <g clipPath="url(#textClipTuned)" mask="url(#damageBiasMask)">
                              <rect
                                 x="0"
                                 y="0"
                                 width="1600"
                                 height="320"
                                 fill="black"
                                 filter="url(#chipNoiseTuned)"
                                 opacity="0.22"
                              />
                           </g>
                        </mask>

                        <mask
                           id="damageBiasMask"
                           maskUnits="userSpaceOnUse"
                           x="0"
                           y="0"
                           width="1600"
                           height="320">
                           <rect
                              x="0"
                              y="0"
                              width="1600"
                              height="320"
                              fill="url(#topBottomDamageBias)"
                           />
                        </mask>
                     </defs>

                     <g filter="url(#edgeRoughenTuned)" mask="url(#distressMaskTuned)">
                        <text
                           x="800"
                           y="218"
                           text-anchor="middle"
                           className="bebas"
                           fontSize="200"
                           fontWeight="500"
                           letterSpacing="6"
                           fill="#ffffff">
                           MAMA SARAH
                        </text>
                     </g>
                  </svg>
               </Fade>
            </section>
            <Slide direction="up" duration={1000}>
               <div className="flex justify-center lg:gap-x-6 xl:w-1/2 mx-auto">
                  <div className="h-40 w-2/5 bg-black rounded-xl content-center text-center">
                     <Link
                        href={routePaths.DAILY_MENU}
                        className="w-2/3 mx-auto text-white text-5xl uppercase font-bebas tracking-wide leading-[100%] block">
                        <p>Menu du</p>
                        <p>JOUR</p>
                     </Link>
                  </div>
                  <div className="h-40 w-2/5 bg-black rounded-xl content-center text-center">
                     <Link
                        href={routePaths.ORDER}
                        className="mx-auto text-[rgba(255,188,0,1)] hover:text-white/80 transition-colors delay-0 duration-500 tracking-wide text-5xl  uppercase font-bebas leading-[100%] block">
                        Commander
                     </Link>
                  </div>
               </div>
            </Slide>
         </div>
      </div>
   )
}

export default HeroSection

'use client'

export default function Loading() {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
         <div className="flex flex-col items-center gap-6">
            {/* Animated burger stack */}
            <div className="relative flex flex-col items-center">
               {/* Steam animation */}
               <div className="absolute -top-8 flex gap-2">
                  <div
                     className="h-4 w-1 animate-steam rounded-full bg-gray-300 opacity-60"
                     style={{ animationDelay: '0s' }}
                  />
                  <div
                     className="h-5 w-1 animate-steam rounded-full bg-gray-300 opacity-60"
                     style={{ animationDelay: '0.2s' }}
                  />
                  <div
                     className="h-4 w-1 animate-steam rounded-full bg-gray-300 opacity-60"
                     style={{ animationDelay: '0.4s' }}
                  />
               </div>

               {/* Top bun */}
               <div
                  className="h-6 w-20 animate-bounce-bun rounded-t-[50%] bg-amber-400 shadow-md"
                  style={{ animationDelay: '0s' }}>
                  <div className="mx-auto mt-1 flex justify-center gap-1">
                     <span className="h-1 w-1 rounded-full bg-amber-600 opacity-40" />
                     <span className="h-1 w-1 rounded-full bg-amber-600 opacity-40" />
                     <span className="h-1 w-1 rounded-full bg-amber-600 opacity-40" />
                     <span className="h-1 w-1 rounded-full bg-amber-600 opacity-40" />
                  </div>
               </div>

               {/* Lettuce */}
               <div
                  className="h-2 w-22 -mt-1 animate-bounce-bun rounded-sm bg-green-500 shadow-sm"
                  style={{ animationDelay: '0.1s' }}
               />

               {/* Cheese */}
               <div
                  className="h-2 w-18 -mt-1 animate-bounce-bun rounded-sm bg-yellow-400 shadow-sm"
                  style={{ animationDelay: '0.2s' }}
               />

               {/* Patty */}
               <div
                  className="h-4 w-20 -mt-1 animate-bounce-bun rounded-sm bg-primary shadow-md"
                  style={{ animationDelay: '0.3s' }}
               />

               {/* Bottom bun */}
               <div
                  className="h-5 w-20 -mt-1 animate-bounce-bun rounded-b-lg bg-amber-500 shadow-md"
                  style={{ animationDelay: '0.4s' }}
               />
            </div>

            {/* Loading text */}
            <div className="flex flex-col items-center gap-2">
               <h2 className="font-bebas text-2xl tracking-wider text-secondary">Mama Sarah</h2>
               <div className="flex items-center gap-1">
                  <span
                     className="h-2 w-2 animate-pulse-dot rounded-full bg-primary"
                     style={{ animationDelay: '0s' }}
                  />
                  <span
                     className="h-2 w-2 animate-pulse-dot rounded-full bg-primary"
                     style={{ animationDelay: '0.15s' }}
                  />
                  <span
                     className="h-2 w-2 animate-pulse-dot rounded-full bg-primary"
                     style={{ animationDelay: '0.3s' }}
                  />
               </div>
               <p className="font-plus-jakarta text-sm text-foreground">
                  Preparing your delicious meal...
               </p>
            </div>
         </div>

         {/* Custom keyframes */}
         <style jsx>{`
            @keyframes steam {
               0% {
                  transform: translateY(0) scaleX(1);
                  opacity: 0.6;
               }
               50% {
                  transform: translateY(-10px) scaleX(1.5);
                  opacity: 0.3;
               }
               100% {
                  transform: translateY(-20px) scaleX(1);
                  opacity: 0;
               }
            }

            @keyframes bounce-bun {
               0%,
               100% {
                  transform: translateY(0);
               }
               50% {
                  transform: translateY(-3px);
               }
            }

            @keyframes pulse-dot {
               0%,
               100% {
                  transform: scale(1);
                  opacity: 1;
               }
               50% {
                  transform: scale(0.5);
                  opacity: 0.5;
               }
            }

            :global(.animate-steam) {
               animation: steam 1.5s ease-in-out infinite;
            }

            :global(.animate-bounce-bun) {
               animation: bounce-bun 0.8s ease-in-out infinite;
            }

            :global(.animate-pulse-dot) {
               animation: pulse-dot 0.6s ease-in-out infinite;
            }
         `}</style>
      </div>
   )
}

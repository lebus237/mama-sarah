import { Image, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

// @ts-ignore
import styles from './AuthLayout.module.scss'

const testimonials = [
   {
      quote: "Serve customers the best food with prompt and friendly in a welcoming atmosphere, and they'll keep coming back.",
      author: 'Estalla, CEO of restaurants King Food',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
   },
   {
      quote: 'Quality ingredients and exceptional service create memorable dining experiences that customers treasure.',
      author: 'Marcus, Owner of Bella Vista',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
   },
   {
      quote: "The secret to success is treating every customer like family and every meal like it's for someone you love.",
      author: 'Sofia, Chef & Restaurateur',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
   },
]

export default function AuthLayout() {
   const [currentSlide, setCurrentSlide] = useState(0)

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentSlide(prev => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
   }, [])

   return (
      <div className={styles.container}>
         <div className={styles.leftSection}>
            <div className={styles.slideshow}>
               {testimonials.map((testimonial, index) => (
                  <div
                     key={index}
                     className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                  >
                     <div className={styles.imageContainer}>
                        <Image
                           src={testimonial.image}
                           alt="Restaurant interior"
                           className={styles.slideImage}
                        />
                        <div className={styles.overlay} />
                     </div>
                     <div className={styles.testimonialContent}>
                        <Text className={styles.quote}>"{testimonial.quote}"</Text>
                        <Text className={styles.author}>{testimonial.author}</Text>
                     </div>
                  </div>
               ))}
            </div>

            <div className={styles.slideIndicators}>
               {testimonials.map((_, index) => (
                  <button
                     key={index}
                     className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                     onClick={() => setCurrentSlide(index)}
                  />
               ))}
            </div>
         </div>

         <div className={styles.rightSection}>
            <Outlet />
         </div>
      </div>
   )
}

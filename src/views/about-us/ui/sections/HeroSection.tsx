import { I18nLabel } from '@/shared/i18n'

export const HeroSection = ({ title }: { title: string }) => {
   return (
      <div className="xl:pt-36 xl:pb-24">
         <h1 className="text-center font-extrabold text-5xl font-bebas">
            <I18nLabel label={title} />
         </h1>
      </div>
   )
}

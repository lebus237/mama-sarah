import { I18nLabel } from '@shared/i18n'
import { Badge } from '@mantine/core'

export enum Gender {
   FEMALE = 'female',
   UNKNOW = 'unknown',
   MALE = 'male',
}

function GenderBadge({ gender }: { gender: Gender }) {
   return (
      <Badge
         radius="xl"
         style={{ textTransform: 'lowercase' }}
         size="lg"
         bg={gender === 'male' ? 'blue' : gender === 'female' ? 'purple' : 'gray'}>
         <I18nLabel label={`gender.${gender}`} />
      </Badge>
   )
}

export default GenderBadge

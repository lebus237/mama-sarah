import { InjectionContainer } from '../../../../../packages/app/src/infrastructure/ioc/InjectionContainer'

export const getRepository = <I>(repository: string) => {
   return new InjectionContainer().container.get(repository) as I
}

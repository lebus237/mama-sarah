import type { ResourceQueryType } from '../request/ResourseQueryType'

export default abstract class AbstractQuery implements ResourceQueryType {
   constructor(public readonly elementId: string) {}
}

export type BuildType<T, Rest = never> = Rest extends never
   ? { value: T }
   : { value: T; next: Rest }

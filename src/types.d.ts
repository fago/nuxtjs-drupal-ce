import type { ModuleOptions } from './module'
import type { DrupalPageResponse, MenuResponse } from './types/api'

// Define the type for the runtime-config,.
// see https://nuxt.com/docs/guide/going-further/runtime-config#manually-typing-runtime-config
declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    drupalCe: ModuleOptions
  }
}

export interface NuxtOptionsWithDrupalCe extends NuxtOptions {
  drupalCe?: ModuleOptions
}

// Re-export API types for easier importing
export type { 
  DrupalPageResponse, 
  MenuResponse, 
  DrupalMessages,
  CustomElement,
  MetaTags,
  LocalTasks,
  Breadcrumb
} from './types/api'
export interface DrupalPageResponse {
  title: string
  messages: DrupalMessages
  breadcrumbs: Breadcrumb[]
  metatags: MetaTags
  content_format: 'json' | 'markup'
  content: CustomElement | string
  page_layout: string
  local_tasks: LocalTasks
  redirect?: RedirectResponse
}

export interface DrupalMessages {
  error?: string[]
  success?: string[]
  warning?: string[]
  info?: string[]
}

export interface Breadcrumb {
  url?: string
  label: string
  frontpage?: boolean
}

export interface MetaTags {
  meta: MetaTag[]
  link: LinkTag[]
  jsonld?: any
}

export interface MetaTag {
  name: string
  content: string
}

export interface LinkTag {
  rel: string
  href: string
  hreflang?: string
}

export interface CustomElement {
  element: string
  [key: string]: any
}

export interface LocalTasks {
  primary: LocalTask[]
  secondary: LocalTask[]
}

export interface LocalTask {
  url: string
  label: string
  active: boolean
}

export interface RedirectResponse {
  external: boolean
  statusCode: number
  url: string
}

export interface MenuResponse {
  key: string
  title: string
  description?: string
  uri: string
  alias: string
  external: boolean
  absolute: string
  relative: string
  existing: boolean
  weight: string
  expanded: boolean
  enabled: boolean
  uuid: string
  options: any[]
}

export interface DrupalCeError extends Error {
  statusCode: number
  context?: Record<string, any>
}

export interface FetchPageOptions {
  query?: Record<string, any>
  headers?: Record<string, string>
  [key: string]: any
}

export interface FetchMenuOptions {
  key?: string
  getCachedData?: (key: string) => any
  headers?: Record<string, string>
  [key: string]: any
}
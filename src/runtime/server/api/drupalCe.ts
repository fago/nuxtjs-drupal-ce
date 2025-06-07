import { defineEventHandler, proxyRequest, getRouterParams, getQuery } from 'h3'
import { getDrupalBaseUrl } from '../../composables/useDrupalCe/server'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)._
  const path = params ? '/' + params : ''
  const query = getQuery(event)
  const queryString = query && Object.keys(query).length > 0 ? '?' + new URLSearchParams(query as Record<string, string>) : ''
  const { ceApiEndpoint } = useRuntimeConfig().public.drupalCe
  
  // Remove x-forwarded-proto header as it causes issues with the request.
  delete event.req.headers['x-forwarded-proto']
  
  return await proxyRequest(event, getDrupalBaseUrl() + ceApiEndpoint + path + queryString)
})
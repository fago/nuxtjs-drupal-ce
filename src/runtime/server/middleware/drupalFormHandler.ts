import { defineEventHandler, readFormData, createError } from 'h3'
import { getDrupalBaseUrl } from '../../composables/useDrupalCe/server'
import { useRuntimeConfig } from '#imports'
import type { DrupalPageResponse } from '../../types/api'

interface FormHandlerContext {
  drupalCeCustomPageResponse?: {
    _data?: DrupalPageResponse
    headers?: Record<string, string>
    error?: {
      data: any
      statusCode: number
      message: string
    }
  }
}

export default defineEventHandler(async (event) => {
  const { ceApiEndpoint } = useRuntimeConfig().public.drupalCe

  if (event.node.req.method === 'POST') {
    if (event.req.headers['x-form-processed']) {
      return
    }

    const formData = await readFormData(event)

    if (formData) {
      const targetUrl = event.node.req.url
      const response = await $fetch.raw<DrupalPageResponse>(getDrupalBaseUrl() + ceApiEndpoint + targetUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'x-form-processed': 'true',
        },
      }).catch((error) => {
        const context = event.context as FormHandlerContext
        context.drupalCeCustomPageResponse = {
          error: {
            data: error,
            statusCode: error.statusCode || 400,
            message: error.message || 'Error when POSTing form data (drupalFormHandler).',
          },
        }
      })

      if (response) {
        const context = event.context as FormHandlerContext
        context.drupalCeCustomPageResponse = {
          _data: response._data,
          headers: Object.fromEntries(response.headers.entries()),
        }
      }
    }
    else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'POST requests without form data are not supported (drupalFormHandler).',
      })
    }
  }
})
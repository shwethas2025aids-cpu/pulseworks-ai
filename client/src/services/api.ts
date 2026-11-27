
import { z } from 'zod'

const TodoSchema = z.object({
  id: z.number(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number(),
})

const ApiResponseSchema = z.object({
  todos: z.array(TodoSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type ExternalTodo = z.infer<typeof TodoSchema>

const API_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com'

export async function fetchExternalTodos(): Promise<ExternalTodo[]> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const json: unknown = await response.json()
    const result = ApiResponseSchema.safeParse(json)

    if (!result.success) {
      throw new Error('Invalid API response format')
    }

    return result.data.todos
  } finally {
    clearTimeout(timeout)
  }
}

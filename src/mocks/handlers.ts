import { http, HttpResponse } from 'msw';

export const handlers = [
    // Intercept "GET https://example.com/user" requests...
    http.post('/api/data', async ({ request }) => {
        // Read the intercepted request body as JSON.
        const data = await request.json()
     
        // response with status code!
        return HttpResponse.json({message: 'Successfully submitted!'}, { status: 201 })
      }),
    
    
  ]
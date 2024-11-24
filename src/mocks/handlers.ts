import { http, HttpResponse } from 'msw';

export const handlers = [
    // Intercept "GET https://example.com/user" requests...
    http.post('/api/data', async ({ request }) => {
        // Read the intercepted request body as JSON.
        const data = await request.json()
     
        // Push the new post to the map of all posts.
        console.log(data);
     
        // Don't forget to declare a semantic "201 Created"
        // response and send back the newly created post!
        return HttpResponse.json({message: 'Successfully submitted!'}, { status: 201 })
      }),
    
    
  ]
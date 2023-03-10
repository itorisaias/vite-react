import { rest } from 'msw';

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    // Persist user's authentication in the session
    // sessionStorage.setItem("is-authenticated", "true");
    const { age } = await req.json();

    if (+age < 18) {
      return res(
        ctx.status(400),
        ctx.json({
          error: 'User not permited',
        })
      );
    }

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // const isAuthenticated = sessionStorage.getItem('is-authenticated')

    // if (!isAuthenticated) {
    //   // If not authenticated, respond with a 403 error
    //   return res(
    //     ctx.status(403),
    //     ctx.json({
    //       errorMessage: 'Not authorized',
    //     }),
    //   )
    // }

    // If authenticated, return a mocked user details
    return res(
      ctx.delay(4000),
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    );
  }),
];

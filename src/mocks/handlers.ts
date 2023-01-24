import { rest } from "msw";

export const handlers = [
  rest.post("/login", async (req, res, ctx) => {
    // Persist user's authentication in the session

    sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.delay(1000),
      ctx.status(200)
    );
  }),
  rest.post("/signup", async (req, res, ctx) => {
    const payload = await req.json();
    return res(
      ctx.delay(),
      ctx.status(201),
      ctx.body({ id: Date.now(), ...payload })
    );
  }),
  rest.get("/assessments", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // const isAuthenticated = sessionStorage.getItem('is-authenticated')

    // // If not authenticated, respond with a 403 error
    // if (!isAuthenticated) {
    //   return res(
    //     ctx.status(403),
    //     ctx.json({
    //       errorMessage: 'Not authorized',
    //     }),
    //   )
    // }

    // If authenticated, return a mocked user details
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            name: "Teste",
          },
        ],
      })
    );
  }),
];

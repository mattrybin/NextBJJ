import http from 'http';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export type AppRouter = typeof appRouter;

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
    greet: publicProcedure
        .input((val: unknown) => {
            if (typeof val === 'string') return val;
            throw new Error(`Invalid input: ${typeof val}`);
        })
        .query(({ input }) => ({ greeting: `hello, ${input}!` })),
});

const trpcHandler = createHTTPHandler({
    router: appRouter,
    createContext: () => ({}),
});

// createHTTPServer({
//     router: appRouter,
//     createContext() {
//         return {};
//     },
// }).listen(2022);

http.createServer((req, res) => {
    // act on the req/res objects

    // enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // accepts OPTIONS
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    // then we can pass the req/res to the tRPC handler
    trpcHandler(req, res);
}).listen(2022);

console.log("Server started at port 2022")

// const trpcHandler = createHTTPHandler({
//     router: appRouter,
//     createContext: () => ({}),
// })

// // tRPC Server
// http
//     .createServer((req, res) => {
//         // enable CORS
//         res.setHeader("Access-Control-Allow-Origin", "*")
//         res.setHeader("Access-Control-Request-Method", "*")
//         res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET")
//         res.setHeader("Access-Control-Allow-Headers", "*")

//         // accepts OPTIONS
//         if (req.method === "OPTIONS") {
//             res.writeHead(200)
//             return res.end()
//         }
//         trpcHandler(req, res)
//     })
//     .listen(3100)

// // // API Server
// // // export const openApiDocument = generateOpenApiDocument(appRouter, {
// // //   title: "tRPC OpenAPI",
// // //   version: "1.0.0",
// // //   baseUrl: "http://localhost:3000",
// // // })
// // http.createServer(createOpenApiHttpHandler({ router: appRouter })).listen(3000)
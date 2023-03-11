import { ssrMiddleware } from 'quasar/wrappers'

// This middleware should execute as last one
// since it captures everything and tries to
// render the page with Vue

export default ssrMiddleware(({ app, resolve, render, serve }) => {
    // we capture any other Express route and hand it
    // over to Vue and Vue Router to render our page
    app.get(resolve.urlPath('*'), (req, res) => {
        res.setHeader('Content-Type', 'text/html')
        
        render(/* the ssrContext: */ { req, res })
        .then(html => {
            // now let's send the rendered html to the client
            res.send(html)
        })
        .catch(err => {
            // oops, we had an error while rendering the page
            
            // we were told to redirect to another URL
            if (err.url) {
                if (err.code) {
                    res.redirect(err.code, err.url)
                }
                else {
                    res.redirect(err.url)
                }
            }
            else if (err.code === 404) {
                // hmm, Vue Router could not find the requested route
                
                // Should reach here only if no "catch-all" route
                // is defined in /src/routes
                res.redirect(resolve.urlPath('404'))
                //res.status(404).send('404 | Page Not Found')
            }
            else if (err.code === 403) {
                // hmm, Vue Router could not find the requested route
                
                // Should reach here only if no "catch-all" route
                // is defined in /src/routes
                //res.status(403).send('404 | Page Not Found')
                res.redirect(resolve.urlPath('403'))
            }
            else {
                // we're in production, so we should have another method
                // to display something to the client when we encounter an error
                // (for security reasons, it's not ok to display the same wealth
                // of information as we do in development)
                
                // Render Error Page on production or
                // create a route (/src/routes) for an error page and redirect to it
                //res.status(500).send('500 | Internal Server Error')
                // console.error(err.stack)
                res.redirect(resolve.urlPath('500'))
            }
        })
    })
})

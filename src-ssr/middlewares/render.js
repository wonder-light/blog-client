import { ssrMiddleware } from 'quasar/wrappers'

// This middleware should execute as last one
// since it captures everything and tries to
// render the page with Vue

function getErrorHtml(code = 404, message = '页面不存在') {
    return `
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <title>百叶的小世界 | ${ code }${ message }</title>
  <meta content="${ code }页面不存在" data-qmeta="title" name="title">
  <meta content="百叶" data-qmeta="author" name="author">
  <meta content="天之涯，地之角，知交半零落，一壶浊酒尽余欢，今宵别梦寒。" data-qmeta="description" name="description">
  <meta content="百叶|博客|个人博客|${ code }" data-qmeta="keywords" name="keywords">
  <meta content="http://blog.nianian.cn/" data-qmeta="url" name="url">
  <meta content="http://blog.nianian.cn/favicon.png" data-qmeta="image" name="image">
  <meta content="${ code }${ message }" data-qmeta="ogTitle" property="og:title">
  <meta content="website" data-qmeta="ogType" property="og:type">
  <meta content="http://blog.nianian.cn/" data-qmeta="ogUrl" property="og:url">
  <meta content="天之涯，地之角，知交半零落，一壶浊酒尽余欢，今宵别梦寒。" data-qmeta="ogDescription" property="og:description">
  <meta content="http://blog.nianian.cn/favicon.png" data-qmeta="ogImage" property="og:image">
  <meta content="${ code }${ message }" data-qmeta="twitterTitle" property="twitter:title">
  <meta content="天之涯，地之角，知交半零落，一壶浊酒尽余欢，今宵别梦寒。" data-qmeta="twitterDescription" property="twitter:description">
  <meta content="summary_large_image" data-qmeta="twitterCard" property="twitter:card">
  <meta content="http://blog.nianian.cn/" data-qmeta="twitterUrl" property="twitter:url">
  <meta content="http://blog.nianian.cn/favicon.png" data-qmeta="twitterImage" property="twitter:image">
  <meta content="telephone=no" name="format-detection">
  <meta content="no" name="msapplication-tap-highlight">
  <meta content="user-scalable=yes, initial-scale=1, maximum-scale=2, minimum-scale=0.1, width=device-width" name="viewport">
  <link href="/icons/favicon-128x128.png" rel="icon" sizes="128x128" type="image/png">
  <link href="/icons/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png">
  <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">
  <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">
  <link href="/favicon.png" rel="icon" type="image/png">
</head>
<body style="user-select: none">
  <div style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;display: flex;align-content: center;justify-content: center">
    <img style="width: 70%" alt="${ code }${ message }" src="/image/${ code }.svg"/>
  </div>
</body>
</html>`
}

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
            else if (err.code === 404 || err.message.includes('404')) {
                // hmm, Vue Router could not find the requested route
                
                // Should reach here only if no "catch-all" route
                // is defined in /src/routes
                //res.redirect(resolve.urlPath('404'))
                res.status(404).send(getErrorHtml(404, '页面不存在'))
            }
            else if (err.code === 403 || err.message.includes('403')) {
                // hmm, Vue Router could not find the requested route
                
                // Should reach here only if no "catch-all" route
                // is defined in /src/routes
                res.status(403).send(getErrorHtml(403, '页面拒绝访问'))
                //res.redirect(resolve.urlPath('403'))
            }
            else {
                // we're in production, so we should have another method
                // to display something to the client when we encounter an error
                // (for security reasons, it's not ok to display the same wealth
                // of information as we do in development)
                
                // Render Error Page on production or
                // create a route (/src/routes) for an error page and redirect to it
                res.status(500).send(getErrorHtml(500, '服务器内部错误'))
                // console.error(err.stack)
                //res.redirect(resolve.urlPath('500'))
            }
        })
    })
})

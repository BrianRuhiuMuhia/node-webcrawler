const {JSDOM}=require("jsdom")
async function crawlPage(baseUrl,currentUrl,pages)
{
    let response=undefined
    let baseUrlObj=new URL(baseUrl)
    let currentUrlObj=new URL(currentUrl)
    if(baseUrlObj.hostname !=currentUrlObj.hostname)
    {
        return pages
    }
    let normalizeCurrentUrl=normalizeUrl(currentUrl)
    if(pages[normalizeCurrentUrl]>1)
    {
        pages[normalizeCurrentUrl]+=1
        return pages
    }
    pages[normalizeCurrentUrl]=1
try{
    response=await fetch(baseUrl)
    if(response.status>399)
{
    console.log(`error on page ${response.status} on page ${baseUrl}`)
    return pages
}
const contentType=response.headers.get('content-type')
if(!contentType.includes("text/html"))
{
    console.log(`error on page not html on page ${baseUrl}`)
    return pages
}
}
catch(err)
{
    console.log(err)
}
let html=await response.text()
const urls=getUrlsFromHtml(html,baseUrl)
for(url of urls)
{
    pages=await crawlPage(baseUrl,url,pages)
}
return pages
}
function normalizeUrl(urlString)
{
    const urlObj=new URL(urlString)
    const hostPath=`${urlObj.hostname}/${urlObj.path}`
    if(hostPath>0 && hostPath.slice(-1)==="/" )
       return hostPath[0,-1]
    else return hostPath
}
function getUrlsFromHtml(htmlBody,baseUrl)
{
    const urls=[]
    const dom=new JSDOM(htmlBody)
    const linkList=dom.window.document.querySelectorAll("a")
    for(let element of linkList)
    {
        if(element.slice(0,1)==="/")
        {
            try{
                const urlObj=new URL(`${baseUrl}${element.href}`)
                 urls.push(urlObj)
            }
            catch(err)
            {
                console.log(err)
            } 
        }
        else{
            try{
                const urlObj=new URL(element.href)
                urls.push(urlObj)
                        }
                        catch(err)
                        {
                            console.log(err)
                        
        
        }
    }
 }
     
    return urls
}


module.exports={normalizeUrl,getUrlsFromHtml,crawlPage}
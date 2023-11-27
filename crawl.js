const {JSDOM}=require("jsdom")
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
            urls.push(`${baseUrl}${element}`)
        }
        else{

            urls.push(element)
        }
    }
    return urls
}

getUrlsFromHtml(html)
module.exports={normalizeUrl,getUrlsFromHtml}
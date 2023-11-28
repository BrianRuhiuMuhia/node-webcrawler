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

getUrlsFromHtml(html)
module.exports={normalizeUrl,getUrlsFromHtml}
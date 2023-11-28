const {crawlPage}=require("./crawl")
async function main()
{
    let baseUrl=undefined
if(process.argv.length<3)
{
    console.log("no website")
    process.exit(1)
}
if(process.argv.length>3)
{
    console.log("to many arguments")
    process.exit(1)
}
else{
baseUrl=process.argv[2]
const pages=await crawlPage(baseUrl,baseUrl,{})
for(let page in pages)
{
    console.log(page)
}
}
}
main()
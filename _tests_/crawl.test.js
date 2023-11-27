const {normalizeUrl}=require("./crawl.js")
const {test,expect}=require("jest")
test("normalize url",()=>{
    expect(normalizeUrl("")).toEqual("")
})
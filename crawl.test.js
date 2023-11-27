const {expect,test}=require('jest')
const {normalizeUrl}=require('./crawl.js')
test("normalize url",()=>{
    expect(normalizeUrl("").toEqual(""))
})
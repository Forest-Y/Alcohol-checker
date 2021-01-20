function searchData(allData, setData){
    const resultObject = {}
    const resultArray = Object.keys(allData).filter((name) => {
        return name.includes(localStorage.searchWord)
    })
    resultArray.map(key => {
        resultObject[key] = {
            name: allData[key]["name"],
            per: allData[key]["per"],
            amount: allData[key]["amount"]
        }
        return null
    })
    //console.log(resultArray, resultObject)
    setData(resultObject)
}
export default searchData
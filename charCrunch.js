var newArr = [];
function createNewArray(){
  for(var i = 0; i < charArr.length; i++){
    for(var j = 0; j < toBeFiltered.length; j++){
      if(charArr[i] === toBeFiltered[j].character){
        toBeFiltered[j].frequencyRank = i + 1;
        newArr.push(toBeFiltered[j]);
      }
    }
  }
  return newArr;
}
createNewArray();

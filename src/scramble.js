import React, { useState, useEffect, useRef} from "react";
import dictionary from './dictionary'




// function copyArrayintoArrayList(arr, prevArr, arrList, num)
// {
//   for(let j = 0; j < prevArr.length; j++)
//     {
//       let current = prevArr[j];
//       if(!arrList[j]) 
//         arrList.push(current);
//       else{
//          for(let k = 0; k < current.length; k++)
//         {
//           if(!arrList[j].includes(current[k])){
//             arrList[j].push(current[k]);
//           }
//         }
//       }
//     }
//   if(num === 0) arrList.push(arr);
//   else {
//     for(let i = 0; i < arr.length; i++)
//     {
//       if(!arrList[arrList.length -1]. includes(arr[i]))
//       arrList[arrList.length - 1].push(arr[i]);
//     }
//   }
//   return arrList;
// }

// function returnSorted([arr])
// {
//   let arr2 = [];
//   let totalArr = [];
//  for(let i = 0;  i < arr.length; i++)
//    {
//      let remaining = arr.slice();
//      remaining.splice(i, 1);
//      let returnedNum = returnSorted([remaining, totalArr]);
//      let endings = returnedNum[0];
//      totalArr = copyArrayintoArrayList(endings, returnedNum[1], totalArr, i);
//      if(endings.length == 0) return [[arr[i]], totalArr];
//      for(let j = 0; j < endings.length; j++)
//        {
//          if(!arr2.includes(arr[i] + endings[j])){
         
//              arr2.push(arr[i] + endings[j]);
//             }

//        }
     
//    }
//    return [arr2, totalArr];
// }


// function checkWord(wordCheck)
// {

//   const wordArr = dictionary.split('\n');
//   for(let i = 0; i < wordArr.length - 1; i++)
//   {
//     if(wordArr[i] === wordCheck) return true;
//   }
//   return false;
// }

function defineCombo(letters)  // takes a cluster of letters and tallies how many of each letter
{
  let word = new Array(26).fill(0); // represents count of 26 letters of alphabit
  for(let i = 0; i < letters.length; i++)
    {
     word[letters[i].charCodeAt(0) - 97]++;
    }
  return word;
}

function checkWord(word, letters)
{
  let lettersCombo = defineCombo(letters);
  let wordCombo = defineCombo(word);
  
  let result = 1; // 1 = full scramble, 2 = partial scramble, neg = impossible word
  wordCombo.forEach((number, indx) => {
    if(wordCombo[indx] > lettersCombo[indx]) result = -1;
    else if(wordCombo[indx] < lettersCombo[indx]) result *= 2;
  })
  if(result == 1) return "scramble";
  if(result < 0) return "none";
  return "partial";
}

function checkDictionary(letters)
{
    let scramble = [];
    let partial = [];
    const wordArr = dictionary.split('\n');
    for(let i = 0; i < wordArr.length - 1; i++)
    {
        let check = checkWord(wordArr[i], letters);
        if(check === "scramble") scramble.push(wordArr[i]);
        if(check === "partial") partial.push(wordArr[i]);
    }
    return [scramble, partial];
}

function WordList({list})
{
  return <div>
    {list.length == 0? <p>There are no words to show.</p>: 
        list.map((word, indx) => {
            return <p key = {indx}>{word}</p>
        })}
  </div>
}

function Scramble()
{
    const [scramble, setScramble] = useState([]);
    const [words, setWords] = useState([]);
    const [partial, setPartial] = useState([]);
    const myContainer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
          console.log('useEffect running');
          try {
          } catch (err) {
            console.log(err);

    
        }}
        fetchData();
      }, []);

    return <div>
        <h2>Write the letters you would like unscrambled: </h2>
        <form onSubmit = { async(event) =>{
            event.preventDefault();
            setScramble(myContainer.current.value)
            const checkDict = checkDictionary(myContainer.current.value);
            setWords(checkDict[0]);
            setPartial(checkDict[1]);
            // const sorted = returnSorted([myContainer.current.value.split('')]);
            // setWords(sorted[0].filter(word => checkWord(word)));
            // console.log(sorted);
            // setWordLists(sorted[1]);

        }}>
            <input type = "text" ref = {myContainer}></input>
            <input type = "submit"></input>
        </form>
        <h3>Full Words from {scramble}: </h3>
        <WordList list = {words}/>
        <h3>Partial words from {scramble}:</h3>
        <WordList list = {partial} />
       
    </div>
}



export default Scramble;
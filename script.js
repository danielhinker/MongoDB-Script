// Selects the database
var db = db.getSiblingDB('mongoTest');

// Clears it just in case there was already data
db.dropDatabase();

let arrayOfWords = ['it', 'was', 'the', 'best', 'of', 'times', 'it', 'was', 'the', 'worst', 'of',
'times', 'it', 'was', 'the', 'age', 'of', 'wisdom', 'it', 'was', 'the', 'age',
'of', 'foolishness', 'it', 'was', 'the', 'epoch', 'of', 'belief', 'it', 'was',
'the', 'epoch', 'of', 'incredulity', 'it', 'was', 'the', 'season', 'of',
'light', 'it', 'was', 'the', 'season', 'of', 'darkness', 'it', 'was', 'the',
'spring', 'of', 'hope', 'it', 'was', 'the', 'winter', 'of', 'despair', 'we',
'had', 'everything', 'before', 'us', 'we', 'had', 'nothing']
const posts = []
/*
This creates multiple documents with an array of words along with a date.
I manually specified the dates so that they wouldn't be all the same when I run
the script.
The array of words are chosen from arrayOfWords using a random number generator
The dates are also randomly picked this way ranging from the past 2 days.
Only used this for testing purposed. Will not working after a few days past
since the current dates will have changed
*/

for (let i = 0; i < 10; i++) {
    var data = { words: [],
        postedDate: new Date(`2019-08-1${Math.floor(Math.random() * 3) + 3}`)};
    for (let i = 0; i < 10; i++) {
        
        data.words[i] = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)]
            
        };
    posts.push(data);
    }

// Saves the document into the collection worddates
db.worddates.insert(posts);

// Shows all documents in the collection
let showAllArrays = () => { 
    return db.worddates.find({}, { _id: false, words: true });
};

// Takes in all documents and returns one array with all the words. 
let getAllWords = (showAllArraysFunction) => {
    let allArrays = showAllArraysFunction()
    let findCount = allArrays.count();
    let newArray = [];
    for (let i = 0; i < findCount; i++) {
        newArray = newArray.concat(allArrays[i].words);
    }
    return newArray;
};

// Array that contains all words from every documents
let allWords = getAllWords(showAllArrays);


// Takes an array of words and returns most used word
let findMostCommonWord = (allWordsArray) => {
    let wordCount = {};
    let highestCount = allWordsArray[0];
    let currentCount = 1;
    for (let i = 0; i < allWordsArray.length; i++) {
        let word = allWordsArray[i];
        if (wordCount[word] == null)
            wordCount[word] = 1;
        else
            wordCount[word]++;
        if (wordCount[word] > currentCount) {
            highestCount = word;
            currentCount = wordCount[word];
        }
    }
    return highestCount;
};

let showPastWords = () => {
    let targetDate = new Date(new Date().setDate(new Date().getDate() - 1));
    return db.worddates.find({ 'postedDate': { $gte: targetDate } },
        { _id: false, words: true });
    
};

// Words from the past 2 days ago
let showPastPastWords = () => {
    let targetDate = new Date(new Date().setDate(new Date().getDate() - 1));
    let targetDate2 = new Date(new Date().setDate(new Date().getDate() - 2));
    return db.worddates.find({ 'postedDate': { $lte: targetDate, $gte: targetDate2} },
        { _id: false, words: true });
};

`2019-08-1${Math.floor(Math.random() * 3) + 3}`

// let showBothDays = () => {
//     let targetDate2 = new Date(new Date().setDate(new Date().getDate() - 2));
//     return db.worddates.find({ 'postedDate': { $gte: targetDate2 } },
//         { _id: false, words: true });
// };

let wordsToday = getAllWords(showPastWords);
let wordsYesterday = getAllWords(showPastPastWords);

let findWordCounts = (allWordsArray) => {
    let wordCount = {};
    let highestCount = allWordsArray[0];
    let currentCount = 1;
    for (let i = 0; i < allWordsArray.length; i++) {
        let word = allWordsArray[i];
        if (wordCount[word] == null)
            wordCount[word] = 1;
        else
            wordCount[word]++;
        if (wordCount[word] > currentCount) {
            highestCount = word;
            currentCount = wordCount[word];
        }
    }
    return wordCount;
};

let findTrendingWord = () => {
    
    let wordCountToday = findWordCounts(wordsToday);
    let wordCountYesterday = findWordCounts(wordsYesterday);
     
    // copy wordCountToday to this object
    let newObject = wordCountToday;
    let highestCount = 0;
    let trendingWord = '';
    for (let x in wordCountYesterday) {
        if (newObject[x] == null) {
            newObject[x] = wordCountYesterday[x];
            newObject[x] -= wordCountYesterday[x];
        } else {
            newObject[x] -= wordCountYesterday[x];
        }
        if (newObject[x] > highestCount) {
            highestCount = newObject[x];
            trendingWord = x;
        }
    }
    return trendingWord;
    
};

// SOLUTION 1
// The word that occurs the most frequently in the entire data set.
let mostCommonWord = findMostCommonWord(allWords);

// SOLUTION 2
// Variable with the word that occurs most frequently in just the last 24 hours.
var commonPastWord = findMostCommonWord(getAllWords(showPastWords));


// SOLUTION 3
// Trending word that increased more than any other word in the last 24 hours
// over the previous 24 hour period
let trendingWord = findTrendingWord();
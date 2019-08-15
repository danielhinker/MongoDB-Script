# MongoDB-Script

Script to find the most frequently used word in a data set, in the past 24 hours, the "trending" word, which appears most in the last 24 hours over the previous 24 hours.

In the mongo terminal, type the command below:
```
load('script.js')
```

The word that occurs the most in the data set is saved in the variable below:
```
mostCommonWord
```

The word that occurs most frequently in the past 24 hours is saved in:
```
commonPastWord
```

The trending word which is the one that increased in used in the past 24 hours over the previous 24 hours is:
```
trendingWord
```

Just type it in the console and you will get the word

There are other commands that can show you the detailed counts of each word, you can check it out on the script.js file.

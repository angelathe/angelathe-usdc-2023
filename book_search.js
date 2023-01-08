/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 

 function findSearchTermInBooks(searchTerm, scannedTextObj) {

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    if (scannedTextObj.length === 0) {
        return result;
    }

    for (const book of scannedTextObj) {
        
        if (book.Content.length === 0) {
            continue;
        }

        for (const line of book.Content) {

            if (line.Text.includes(searchTerm)) {
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": line.Page,
                    "Line": line.Line
                  });
            }

            lineTrim = line.Text.trim()
            if (lineTrim.endsWith("-")) {
                const textSplit = lineTrim.split(' ');
                const wordBreak1 = textSplit.at(-1).slice(0, -1);

                if (wordBreak1 !== searchTerm.slice(0, wordBreak1.length)) {
                    continue
                }

                var nextLine = null
                var nextPage = null
                var nextTextSplit = null

                if (!book.Content.find(l => l.Line === line.Line+1)) {
                    nextTextSplit = book.Content.find(
                        l => l.Page === line.Page+1 && l.Line === 1).Text.trim();
                    nextPage = line.Page + 1
                    nextLine = 1
                } 
                else {
                    nextTextSplit = book.Content.find(
                        l => l.Line === line.Line+1).Text.trim();
                    nextPage = line.Page
                    nextLine = line.Line + 1
                }

                const searchTermRestLen = searchTerm.slice(
                    wordBreak1.length, searchTerm.length).length
                const wordBreak2 = nextTextSplit.slice(0, searchTermRestLen);
                const combine = wordBreak1.concat(wordBreak2);

                if (combine === searchTerm) {
                    result.Results.push(
                        {
                        "ISBN": book.ISBN,
                        "Page": line.Page,
                        "Line": line.Line
                        }, 
                        {
                        "ISBN": book.ISBN,
                        "Page": book.Content.find(l => l.Page === nextPage).Page,
                        "Line": book.Content.find(l => l.Line === nextLine).Line
                        }, 
                    );
                }
            }
        }
    }
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/* Unit Test 3 - Positive Test #1, results from multiple lines and books */
const janeAustinIn = [
    {
        "Title": "Pride and Prejudice",
        "ISBN": "9780141439518",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "It is a truth universally acknowledged, that a single man in posses-"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "sion of a good fortune, must be in want of a wife."
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "However little known the feelings or views of such a man may be"
            },
            {
                "Page": 1,
                "Line": 4,
                "Text": "on his first entering a neighbourhood, this truth is so well fixed in the"
            },
            {
                "Page": 1,
                "Line": 5,
                "Text": "minds of the surrounding families, that he is considered the rightful"
            },
            {
                "Page": 1,
                "Line": 6,
                "Text": "property of some one or other of their daughters."
            }
        ] 
    },
    {
        "Title": "Sense and Sensibility",
        "ISBN": "9780140430479",
        "Content": [
            {
                "Page": 1,
                "Line": 5,
                "Text": "rounding acquaintance. The late owner of this estate was a single man,"
            }
        ]
    }
]

const janeAustinOut = {
    "SearchTerm": "man",
    "Results": [
        {
            "ISBN": "9780141439518",
            "Page": 1,
            "Line": 1
        },
        {
            "ISBN": "9780141439518",
            "Page": 1,
            "Line": 3
        },
        {
            "ISBN": "9780140430479",
            "Page": 1,
            "Line": 5
        }
    ]
}

const test3result = findSearchTermInBooks("man", janeAustinIn);
if (JSON.stringify(janeAustinOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3. Missing or incorrect results.");
    console.log("Expected:", janeAustinOut);
    console.log("Received:", test3result);
}

/* Unit Test 4 - No Books */
const noBooksIn = []

const noBooksOut = {
    "SearchTerm": "hello",
    "Results": [
    ]
}

const test4result = findSearchTermInBooks("hello", noBooksIn);
if (JSON.stringify(noBooksOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4. No results should have been produced.");
    console.log("Expected:", noBooksOut);
    console.log("Received:", test4result);
}

/* Unit Test 5 - Test: Books, but none have content */
const noContentIn = [
    {
    "Title": "Twenty Thousand Leagues Under the Sea",
    "ISBN": "9780000528531",
    "Content": []
    },
    {
    "Title": "Pride and Prejudice",
    "ISBN": "9780141439518",
    "Content": []
    }
]

const noContentOut = {
    "SearchTerm": "wonderful",
    "Results": [
    ]
}

const test5result = findSearchTermInBooks("wonderful", noContentIn);
if (JSON.stringify(noContentOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5. No results should have been produced");
    console.log("Expected:", noContentOut);
    console.log("Received:", test5result);
}

/* Unit Test 6 - Negative: No matches*/
const negativeIn = [
    {
    "Title": "Twenty Thousand Leagues Under the Sea",
    "ISBN": "9780000528531",
    "Content": [{
        "Page": 31,
        "Line": 8,
        "Text": "now simply went on by her own momentum. The dark-"
        },
        {
        "Page": 31,
        "Line": 9,
        "Text": "ness was then profound; and however good the Canadian\'s"
        },
        {
        "Page": 31,
        "Line": 10,
        "Text": "eyes were, I asked myself how he had managed to see, and"
        }]
    },
    {
    "Title": "Pride and Prejudice",
    "ISBN": "9780141439518",
    "Content": [{
        "Page": 1,
        "Line": 1,
        "Text": "It is a truth universally acknowledged, that a single man in posses-"
    },
    {
        "Page": 1,
        "Line": 2,
        "Text": "sion of a good fortune, must be in want of a wife."
    },
    {
        "Page": 1,
        "Line": 3,
        "Text": "However little known the feelings or views of such a man may be"
    }]
    }
]

const negativeOut = {
    "SearchTerm": "wonderful",
    "Results": []
}

const test6result = findSearchTermInBooks("wonderful", negativeIn);
if (JSON.stringify(negativeOut) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6. No results should have been produced");
    console.log("Expected:", negativeOut);
    console.log("Received:", test6result);
}

/* Unit Test 7 - Case Sensitive Test*/
const caseSensitiveIn = [
    {
    "Title": "Twenty Thousand Leagues Under the Sea",
    "ISBN": "9780000528531",
    "Content": [{
        "Page": 31,
        "Line": 8,
        "Text": "now simply went on by her own momentum. The dark-"
        },
        {
        "Page": 31,
        "Line": 9,
        "Text": "ness was then profound; and however good the Canadian\'s"
        },
        {
        "Page": 31,
        "Line": 10,
        "Text": "eyes were, I asked myself how he had managed to see, and"
        }]
    },
    {
    "Title": "Pride and Prejudice",
    "ISBN": "9780141439518",
    "Content": [{
        "Page": 1,
        "Line": 1,
        "Text": "It is a truth universally acknowledged, that a single man in posses-"
    },
    {
        "Page": 1,
        "Line": 2,
        "Text": "sion of a good fortune, must be in want of a wife."
    },
    {
        "Page": 1,
        "Line": 3,
        "Text": "However little known the feelings or views of such a man may be"
    }]
    }
]

const caseSensitiveOut = {
    "SearchTerm": "However",
    "Results": [{
        "ISBN": "9780141439518",
        "Page": 1,
        "Line": 3,
    }]
}

const test7result = findSearchTermInBooks("However", caseSensitiveIn);
if (JSON.stringify(caseSensitiveOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7. Matches should be case-sensitive.");
    console.log("Expected:", caseSensitiveOut);
    console.log("Received:", test7result);
}

/* Unit Test 8 - Word broken up on two lines*/
const twentyLeaguesDarkness = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const testwordbresult = findSearchTermInBooks("darkness", twentyLeaguesIn); 
if (JSON.stringify(twentyLeaguesDarkness) === JSON.stringify(testwordbresult)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8. Results did not find hyphenated word break.");
    console.log("Expected:", twentyLeaguesDarkness);
    console.log("Received:", testwordbresult);
}

/* Unit Test 9 - Word broken up on two lines, lines not in order. */
const janeAustinWordBreakPageIn = [
    {
        "Title": "Pride and Prejudice",
        "ISBN": "9780141439518",
        "Content": [
            {
                "Page": 13,
                "Line": 36,
                "Text": "It was generally evident whenever they met, that he did admire her"
            },
            {
                "Page": 13,
                "Line": 37,
                "Text": "and to her it was equally evident that Jane was yielding to the prefer-"
            },
            {
                "Page": 14,
                "Line": 1,
                "Text": "ence which she had begun to entertain for him from the first, and was"
            },
        ] 
    }
]

const janeAustinWordBreakPageOut = {
    "SearchTerm": "preference",
    "Results": [
        {
            "ISBN": "9780141439518",
            "Page": 13,
            "Line": 37
        },
        {
            "ISBN": "9780141439518",
            "Page": 14,
            "Line": 1
        }
    ]
}

const test9result = findSearchTermInBooks("preference", janeAustinWordBreakPageIn); 
if (JSON.stringify(janeAustinWordBreakPageOut) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9. Results did not find hyphenated word break or produce correct match.");
    console.log("Expected:", janeAustinWordBreakPageOut);
    console.log("Received:", test9result);
}
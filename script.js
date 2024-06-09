const words = [
    { text: "բարև", audio: new Audio("audio/barev.m4a") },
    { text: "մանկապարտեզ", audio: new Audio("audio/mankapartez.m4a") },
    { text: "կարմիր", audio: new Audio("audio/karmir.m4a") },
    { text: "զրո", audio: new Audio("audio/0.m4a") },
    { text: "քվադրիլիոն", audio: new Audio("audio/10to15.m4a") },
    { text: "մեկ", audio: new Audio("audio/1.m4a") },
    { text: "երկու", audio: new Audio("audio/2.m4a") },
    { text: "սեղան", audio: new Audio("audio/Seghan.m4a") },
    { text: "ճանճ", audio: new Audio("audio/tshantsh.m4a") },
//    { text: "տատիկ", audio: new Audio("audio/Tatik.m4a") },
    { text: "սուպեր", audio: new Audio("audio/Super.m4a") },
    { text: "մարիո", audio: new Audio("audio/Mario.m4a") },
    { text: "ութ", audio: new Audio("audio/8.m4a") },
    { text: "քսան", audio: new Audio("audio/20.m4a") },
    { text: "միլիոն", audio: new Audio("audio/1000000.m4a") },
    { text: "համակարգիչ", audio: new Audio("audio/Hamakargich.m4a") },
];

let selectedWords = [];
let currentWordIndex = 0;
let numWords = 0;
const completionUrl = "https://www.smbgames.be/super-mario-bros.php";

const numWordsInput = document.getElementById("numWords");
const startButton = document.getElementById("startButton");
const playButton = document.getElementById("playButton");
const checkButton = document.getElementById("checkButton");
const inputWord = document.getElementById("inputWord");
const feedback = document.getElementById("feedback");
const completionLink = document.getElementById("completionLink");

// Function to start the game
function startGame()
{
    numWords = parseInt(numWordsInput.value);
    if (isNaN(numWords) || numWords < 1)
    {
        feedback.textContent = "Խնդրում ենք մուտքագրել ճիշտ քանակ:";
        feedback.style.color = "red";
        return;
    }
    selectedWords = getRandomWords(numWords);
    currentWordIndex = 0;
    feedback.textContent = "";
    numWordsInput.style.display = "none";
    startButton.style.display = "none";
    playButton.style.display = "inline-block";
    inputWord.style.display = "inline-block";
    checkButton.style.display = "inline-block";
    playWordAudio(currentWordIndex);
}

// Event listener for start button click
startButton.addEventListener("click", startGame);

// Event listener for enter key press on numWordsInput
numWordsInput.addEventListener("keypress", (e) =>
{
    if (e.key === "Enter")
    {
        startGame();
    }
});

// Event listener for play button click
playButton.addEventListener("click", () =>
{
    playWordAudio(currentWordIndex);
});

// Function to check the typed word
function checkWord(numWords)
{
    const userInput = inputWord.value.trim();
    if (userInput === selectedWords[currentWordIndex].text)
    {
        feedback.textContent = "Ճիշտ է! Դու պատասխանել ես " + (currentWordIndex + 1) + " բառ " + numWords + " բառից: Մնաց " + (numWords - currentWordIndex - 1) + " բառ։";
        feedback.style.color = "green";
        currentWordIndex++;
        if (currentWordIndex < selectedWords.length)
        {
            playWordAudio(currentWordIndex);
        }
        else
        {
            feedback.textContent = "Շնորհավորում ենք! Դու ավարտել ես բոլոր բառերը:";
            completionLink.href = completionUrl;
            completionLink.style.display = "inline-block";
        }
    }
    else
    {
        feedback.textContent = "Փորձեք կրկին. Դու պատասխանել ես " + currentWordIndex + " բառ " + numWords + " բառից: Մնաց " + (numWords - currentWordIndex) + " բառ։";
        feedback.style.color = "red";
    }
    inputWord.value = "";
}

// Event listener for check button click
checkButton.addEventListener("click", checkWord);

// Event listener for enter key press on inputWord
inputWord.addEventListener("keypress", (e) =>
{
    if (e.key === "Enter")
    {
        checkWord(numWords);
    }
});

// Function to play the word audio
function playWordAudio(index)
{
    selectedWords[index].audio.play();
}

// Function to get random words
function getRandomWords(num)
{
    let shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}


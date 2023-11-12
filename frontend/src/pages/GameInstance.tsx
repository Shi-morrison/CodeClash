import m from "mithril";
import stream from "mithril/stream";
import * as monaco from 'monaco-editor';
import LikeButton from "../components/Like";
import DislikeButton from "../components/Dislike";
import WinModal from "../components/GameWonModal";

function DiffAndRating() {
    let difficulty = 'Easy';
    return {
        view: () => (
            <>
                <div class="container mt-3">
                    <h2 class="problemText mb-0 text-orange-100">Difficulty: <p class="text-[#14f754] mb-0"> {difficulty}</p> </h2>      
                </div>
                
            </>
        )
    }
}

function ProblemTxt() {
    let problemText = stream('Loading problem text...');

    // Request the content of the problem.txt file
    m.request({
        method: "GET",
        url: "/problem.txt",
    }).then((result) => {
        // Update the stream with the result of the request
        problemText(result);
    }).catch((error) => {
        // Update the stream in case of an error
        problemText("Error loading problem text.");
    });
    return {
        view: () => (
            //start of html shit
            <>
        
                <div class="codeClashFont text-6xl text-[#6ec3c1] p-2">
                    <h1>Problem:{problemName}</h1>
                </div>
                <div class="items-center p-1">
                    <DiffAndRating />
                </div>
                <div class="problemText p-5 text-[#d4e0fa]">
                    <p class="text-l"> {twoSum}</p>
                </div>
                <div tabindex="0" class="collapse bg-base-200"> 
                    <div class="collapse-title text-xl font-medium problemText text-yellow-100">
                        Hint 1
                    </div>
                    <div class="collapse-content"> 
                        <p class="problemText text-yellow-100">try to find a solution of O(n) time</p>
                    </div>
                </div>
                <div tabindex="0" class="collapse bg-base-200"> 
                    <div class="collapse-title text-xl font-medium problemText text-yellow-100">
                        Hint 2
                    </div>
                    <div class="collapse-content"> 
                        <p class="problemText text-yellow-100">Keep tracked of numbers that you visited in the array</p>
                    </div>
                </div>
                <div tabindex="0" class="collapse bg-base-200"> 
                    <div class="collapse-title text-xl font-medium problemText text-yellow-100">
                        Hint 3
                    </div>
                    <div class="collapse-content"> 
                        <p class="problemText text-yellow-100">try to use an array list</p>
                    </div>
                </div>
                {/* right now my implementation to load text from a txt file inst working 😭*/}
                {/* <p>{problemText()}</p> right now this is just empty string for some reason */}
                
            </>
            //end of html shit for my own eyes
        ),
    };
}
function PowerUpList() {
    const powerUps = stream([
        { id: 1, name: "Power-up 1" , imageSrc: "/powerUP.webp"},
        { id: 2, name: "Power-up 2" },
        { id: 3, name: "Power-up 3" },
    ]);
    function handlePowerUpClick(clickedPowerUp:any) {
        powerUps(powerUps().filter((powerUp) => powerUp.id !== clickedPowerUp.id));
        // Implement logic for the effect of the power-up here
      }
    return {
        view: () => (
            <>
                <div class="power-up-list flex">
                {powerUps().map((powerUp) => (
                    <div
                        class="power-up justify items-center"
                        onclick={() => handlePowerUpClick(powerUp)}

                    >
                    {/* Style each power-up as a square div with background color */}
                    <img src="/powerUP.webp" style="width: 100px; height:100px;"></img>
                    </div>
                ))}
                </div>
            </>
        )
    }
}
function GameLayout() {
    
    let isGameWon = stream(false);

    function openGameWonModal() {
        isGameWon(true);
        console.log("clicked")
    }
    return {
        view: () => (
            //start of html things
            <>
                
                <div class="bg-black-100 w-full h-full p-4 flex flex-col items-center justify-center">
                    <div class="grid grid-cols-3 gap-4">
                        {/* Player's Editor */}
                        <div class="col-span-1">
                            <h1 class="problemText text-blue-200">Your Code</h1>
                            <Editor editorClass="overflow-hidden rounded-lg" />
                        </div>

                        {/* Problem Statement */}
                        <div class="col-span-1">
                            <ProblemTxt />
                        </div>

                        {/* Opponent's Editor */}
                        <div class="col-span-1">
                            <h1 class="problemText text-red-500">Your Opponents Code</h1>
                            <div class="blur-sm">
                                <Editor editorClass="overflow-hidden rounded-lg filter blur-lg" />
                            </div>
                        </div>
                    </div>
                </div>
                <PowerUpList />
                <div class="flex justify-between" id="play_multi" data-hover="hover" data-hit="hit1">
                    <div class="mr-5 p-5 bg-gradient-to-br from-gray-800 via-gray-600 to-blue-900 hover:from-blue-900 hover:via-gray-700 hover:to-purple-900 active:from-gray-700 active:via-blue-500 active:to-purple-700">
                        <img src="/RunCode.svg" /> 
                    </div>
                    <div class="ml-5 p-5 bg-gradient-to-br from-green-900 via-green-600 to-green-800 hover:from-green-900 hover:via-green-700 hover:to-green-900 active:from-green-700 active:via-green-500 active:to-green-700">
                        <img src ='/SubmitCode.svg' onclick={openGameWonModal} />
                    </div>
                    
                </div>
                {/* Conditionally render the modal */}
                <div class="centerChris">
                {isGameWon() ? (
                    <WinModal />
                ) : null}

                </div>
            </>
            //end of html things
        )
    }
}

function Editor(){ //this uses the monaco npm package to get vscode editor in a window basically. 
    let langVar = "javascript" //this is a varible that we can change to change the language they want to program in
    let editor: monaco.editor.IStandaloneCodeEditor;
    let editorRef: HTMLElement;
    return {
        oncreate: (vnode:any) => {
            editorRef= vnode.dom as HTMLElement;
            editor = monaco.editor.create(editorRef, {
                value: "// Type your code here",
                language: langVar,
                theme: "vs-dark",
                automaticLayout: true,
            });
        },
        onremove: () => {
            if(editor) {
                editor.dispose();
            }
        },
        view: () => (
            <>
                <div id = "container" style={{height: '600px', width:'550px', border: '1px solid #ccc'}}></div>
            </>
        )
    }
}
export default GameLayout;
let problemName = 'Two Sum';
let twoSum = 'You are given an array of size N. The array is not sorted, and each number in the array is unique. You are also given a sum variable in which two numbers in the array can add up to that sum. Write an algorithm where 2 numbers in the array add up to the sum. '
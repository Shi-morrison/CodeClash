import m from "mithril";
import stream from "mithril/stream";
import * as monaco from 'monaco-editor';
import WinModal from "../components/GameWonModal";

function DiffAndRating() {
    let difficulty = 'Easy';
    return {
        view: () => (
            <>
                <div class="container mt-3">
                    <h2 class="problemText mb-0 text-orange-100">Difficulty: <span class="text-[#14f754] mb-0"> {difficulty}</span> </h2>      
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
        
                <div class="codeClashFont text-6xl text-[#6ec3c1] p-2 mb-4">
                    <h1>Problem:{problemName}</h1>
                </div>
                <div class="items-center p-1">
                    <DiffAndRating />
                </div>
                <div class="problemText p-5 text-[#d4e0fa]">
                    <p class="text-l"> {twoSum}</p>
                </div>
                
                <div class ="exampleDiv problemText text-[#6ec3c1] space-y-4">
                    <div class="example1 p-4 shadow-lg rounded-lg bg-gray-600">
                        <h3 class="font-bold">Example 1:</h3>
                        <div class="border-l-4 border-blue-500 pl-4 ml-4">
                            <p class="text-gray-400"><span class="font-bold text-gray-300">Input:</span> nums = [2,7,11,15], target = 9</p>
                            <p class="text-gray-400"><span class="font-bold text-gray-300">Output:</span> [0,1]</p>
                            <p class="text-gray-400"><span class="font-bold text-gray-300">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>

                        </div>
                    </div>

                    <div class="example2 problemText text-[#6ec3c1] p-4 shadow-lg rounded-lg bg-gray-600">
                        <h3 class="font-bold">Example 2:</h3>
                        <div class="border-l-4 border-blue-500 pl-4 ml-4">
                            <p class="text-gray-400"><span class="font-bold text-gray-300">Input:</span> nums = [3,2,4], target = 6</p>
                            <p class="text-gray-400"><span class="font-bold text-gray-300">Output:</span> [1,2]</p>

                        </div>
                    </div>

                    <div class="example3 problemText p-4 shadow-lg rounded-lg bg-gray-600">
                        <h3 class="font-bold">Example 3:</h3>
                        <div class="border-l-4 border-blue-500 pl-4 ml-4">
                            <p class="text-gray-400"><span class="font-bold text-gray-300">Input:</span> nums = [3,3], target = 6</p>
                            <p class="text-gray-400"><span class="font-bold text-gray-300">Output:</span> [0,1]</p>

                        </div>
                    </div>
                </div>
                
                {/* <div tabindex="0" class="collapse bg-base-200 p-3"> 
                    <div class="collapse-title text-xl font-medium  text-yellow-100 problemText">
                        Hint 1
                    </div>
                    <div class="collapse-content"> 
                        <p tabindex="0" class="problemText text-yellow-100">try to find a solution of O(n) time</p>
                    </div>
                </div>
                <div tabindex="0" class="collapse bg-base-200 p-3"> 
                    <div class="collapse-title text-xl font-medium problemText text-yellow-100">
                        Hint 2
                    </div>
                    <div class="collapse-content"> 
                        <p class="problemText text-yellow-100">Keep tracked of numbers that you visited in the array</p>
                    </div>
                </div>
                <div tabindex="0" class="collapse bg-base-200 p-3"> 
                    <div class="collapse-title text-xl font-medium problemText text-yellow-100">
                        Hint 3
                    </div>
                    <div class="collapse-content"> 
                        <p class="problemText text-yellow-100">try to use an array list</p>
                    </div>
                </div> */}
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
                    <img src="/powerUP.webp" style="width: 50px; height:50px;"></img>
                    </div>
                ))}
                </div>
            </>
        )
    }
}
function GameLayout() {
    let isGameWon = false;

    return {
        view: () => (
            //start of html things
            <>
                <div style="position: fixed; right: 0; bottom: 0; width: 100vw; height: 100vh; z-index: -1;">
                    <video autoplay muted loop playsinline id="myVideo" style="
                        height: 100%;
                        width: 177.777778vh;
                        max-width: initial;
                        min-width: 100%;
                        min-height: 56.25vw;
                    ">
                        <source src="/videoBG.mp4" type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                </div>
                <div class=" w-full h-full p-4 flex flex-col items-center justify-center">
                    <div class="grid grid-cols-2 gap-4">
                        {/* Problem Statement  and explanation should be on the left side*/}
                        <div class="col-span-1">
                            <ProblemTxt />
                        </div>

                        {/* Player's Editor  need to move this to the right side of the screen*/}
                        <div class="col-span-1" style={{position: "relative"}}>
                            <Editor editorClass=" rounded-lg" />
                        {/* Opponent's Editor , should be a child of the player editor i guess*/}
                            {/* <div class="col-span-1">
                                <h1 class="problemText text-red-500">Your Opponents Code</h1>
                                <div class="blur-sm">
                                    <OpponentEditor editorClass=" rounded-lg filter blur-lg" />
                                </div>
                            </div> */}
                        </div>
                        
                    </div>
                </div>
                
                
                
                <div class="bottomControls w-full p-5 bg-black-100 flex justify-between items-center">
                    
                    <div class="flex flex-grow justify-end space-x-2">
                        <PowerUpList />
                        <div class="w-60 h-14 p-2 bg-gradient-to-br from-gray-800 via-gray-600 to-blue-900 hover:from-blue-900 hover:via-gray-700 hover:to-purple-900 active:from-gray-700 active:via-blue-500 active:to-purple-700">
                            <img src="/RunCode.svg" class="" /> 
                        </div>
                        <div class="w-80 h-14 p-2 bg-gradient-to-br from-green-900 via-green-600 to-green-800 hover:from-green-900 hover:via-green-700 hover:to-green-900 active:from-green-700 active:via-green-500 active:to-green-700"
                            style={
                                // { opacity: 0.5, pointerEvents: "none" }
                                {}
                            }>
                            <img src='/SubmitCode.svg' class="" onclick={() => {
                                isGameWon = true;
                            }} />
                        </div>
                    </div>

                </div>
                {/* Conditionally render the modal */}
                <div class="centerChris">
                {isGameWon ? (
                    <WinModal onclose={() => {
                        isGameWon = false;
                    }} />
                ) : undefined}

                </div>
            </>
            //end of html things
        )
    }
}

function Editor(){ //this uses the monaco npm package to get vscode editor in a window basically. 
    let langVar = "javascript" //this is a varible that we can change to change the language they want to program in
    let editor: monaco.editor.IStandaloneCodeEditor;
    return {
        view: () => (
            <>
                <div id = "container" style={{
                    width: '100%',
                    height: 'calc(100vh - 132px)',
                    border: '1px solid #ccc',
                    marginBottom: '0px'
                }} oncreate={vnode => {
                    editor = monaco.editor.create(vnode.dom, {
                        value: "// Type your code here",
                        language: langVar,
                        theme: "vs-dark",
                        automaticLayout: true,
                    });
                }} onbeforeremove={() => {
                    if(editor) {
                        editor.dispose();
                    }
                }}></div>
                
                <div id="opponentEditorContainer" style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    height: '177px',
                    width: '188px',
                    border: '1px solid #ccc',
                    zIndex: 10
                }}>
                    <h1 class="problemText text-red-500 text-xs text-center">Your Opponents Code</h1>
                    <div class="blur-sm">
                        
                        <OpponentEditor  />
                    </div>
                </div>
            </>
        )
    }
}
//basically same but smaller
function OpponentEditor(){ //this uses the monaco npm package to get vscode editor in a window basically. 
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
                <div id = "container" style={{height: '145px', width:'185px', border: '1px solid #ccc'}}></div>
            </>
        )
    }
}
export default GameLayout;
let problemName = 'Two Sum';
let twoSum = 'You are given an array of size N. The array is not sorted, and each number in the array is unique. You are also given a sum variable in which two numbers in the array can add up to that sum. Write an algorithm where 2 numbers in the array add up to the sum. '
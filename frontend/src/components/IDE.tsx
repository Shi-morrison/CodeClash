import m from 'mithril';

// Function to format the current date and time
const getCurrentDateTime = (): string => {
  const now = new Date();
  return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
};

function IDE() {
    let lines = [`Python 3.9.7 (${getCurrentDateTime()})`];
    let currentLine = '';
    // Define the solution as an array of strings, each representing a line of code
    const solution = [
        "bry-guy",
        "he lookin real shy",
        "he never gets high",
        "he refuses to cry",
        "he's into guys",
        "but he might be bi",
        "he sometimes lie",
        "he always ask why",
        "he never wants to apply",
        "and right now he nigh nigh",
    ];

    function typeSolution(index = 0) {
        if (index < solution.length) {
            const typeCommand = (lineIndex: number = 0) => {
                if (lineIndex < solution[index].length) {
                    currentLine += solution[index].charAt(lineIndex);
                    m.redraw();
                    setTimeout(() => typeCommand(lineIndex + 1), 75); // Typing speed
                } else {
                    lines.push(currentLine);
                    currentLine = '';
                    m.redraw();
                    // Call the next line after a slight delay
                    setTimeout(() => typeSolution(index + 1), 250);
                }
            };
            // Start typing the current line
            typeCommand();
        }
    }

    return {
        oncreate: () => {
            typeSolution();
        },
        view: (vnode: m.VnodeDOM) => {
            return (
                <div class="relative bg-[#1c2736] opacity-75 h-96 w-[48rem] p-4 text-[#6ec3c1] font-mono text-lg overflow-hidden rounded">
                    <div class="absolute right-4 top-4 flex space-x-2">
                        <span class="block w-3 h-3 bg-red-500 rounded-full"></span>
                        <span class="block w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span class="block w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    {lines.map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                    <div>
                        {`${currentLine}`}
                        <span class="main-page-cursor"></span>
                    </div>
                </div>
            );
        },
    };
}

export default IDE;

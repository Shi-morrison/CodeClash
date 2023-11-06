import m from 'mithril';

// Function to format the current date and time
const getCurrentDateTime = (): string => {
  const now = new Date();
  return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
};

interface IDEState {
  lines: string[];
  currentLine: string;
  typeSolution?: () => void; // Method to type the solution
}

interface IDEComponent extends m.ClassComponent<IDEState> {
  typeSolution: (index?: number) => void;
  lines: string[];
  currentLine: string;
  view(vnode: m.VnodeDOM<{}, IDEState>): m.Vnode<any, any>;
}

const IDE: IDEComponent = {
    oninit: (vnode) => {
        vnode.state.lines = [`Python 3.9.7 (${getCurrentDateTime()})`];
        vnode.state.currentLine = '';
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
        
        

        // Method to type out the solution line by line
        vnode.state.typeSolution = (index = 0) => {
            if (index < solution.length) {
                const typeCommand = (lineIndex: number = 0) => {
                    if (lineIndex < solution[index].length) {
                        vnode.state.currentLine += solution[index].charAt(lineIndex);
                        m.redraw();
                        setTimeout(() => typeCommand(lineIndex + 1), 75); // Typing speed
                    } else {
                        vnode.state.lines.push(vnode.state.currentLine);
                        vnode.state.currentLine = '';
                        m.redraw();
                        // Call the next line after a slight delay
                        setTimeout(() => vnode.state.typeSolution!(index + 1), 250);
                    }
                };
                // Start typing the current line
                typeCommand();
            }
        };
    },
    oncreate: (vnode) => {
        // Start typing the first line which is a command
        vnode.state.typeSolution!();
    },
    view: (vnode) => {
        return (
            <div class="hidden md:block bg-blue-900 h-96 w-[48rem] p-4 text-white font-mono text-lg overflow-hidden rounded">
                {vnode.state.lines.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                <div>
                    {`${vnode.state.currentLine}`}
                    <span class="cursor"></span>
                </div>
            </div>
        );
    },    
    lines: [],
    currentLine: '',
    typeSolution: function (index?: number | undefined): void {
        throw new Error('Function not implemented.');
    }
};

export default IDE;

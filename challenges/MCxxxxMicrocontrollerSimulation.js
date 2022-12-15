// MCxxxx microcontroller simulation
//
// This puzzle is directly inspired by the game SHENZHEN I/O
// If you like this puzzle, please go check out this game (trust me, you'll love it).
// Steam : https://store.steampowered.com/app/504210/SHENZHEN_IO/
// GOG.com : https://www.gog.com/fr/game/shenzhen_io
//
// MCxxxx Language official documentation : https://usermanual.wiki/Document/SHENZHENIOManual.736522646/view
//
// --- Puzzle ---
//
// In this puzzle you will be asked to create a simple emulator for a microcontroller from the MCxxxx family.
// Specifically, a simplified version of the MC6000 microcontroller that we will call MC5999.
//
// MC5999 features :
//
// - (2) general-purpose registers (acc, dat)
// - (2) Xbus pins (x0, x1)
//
// Registers :
//
// - acc : stores the result of an arithmetic instruction
// - dat : used for temporary storage of a value
// - x0 and x1 : Xbus pins (used respectively for input and output)
//
// Microcontrollers of the MCxxxx family take use of a unique programming language (similar to assembler).
// Please note that some instructions of this language will not be included as they are not necessary for this puzzle. All instructions below are necessary for this puzzle.
//
// Captions :
//
//
// | Notation |       Meaning       |
// |    R     |       Register      |
// |    I     |       Integer       |
// |   R/I    | Register or integer |
// |    L     |       Label         |
//
//
// Basic instructions :
//
//
//  - mov R/I R : Copy the value of the first operand into the second operand
//  - jmp L : Jump to the instruction following the specified label
//
//
// Arithmetic instructions :
//
//
// The result of an arithmetic instruction will always be stored in the acc register.
//
//  - add R/I : Add the value of the first operand to the value of the acc register
//  - sub R/I : Subtract the value of the first operand to the value of the acc register
//  - mul R/I : Multiply the value of the first operand by the value of the acc register
//  - not : If the value in acc is 0, store a value of 100 in acc. Otherwise, store a value of 0 in acc
//  - dgt R/I : Isolate the specified digit of the value in the acc register and stores it in
// the acc register
//  - dst R/I R/I : Isolate the digit of acc specified by the first operand and set it to
// the value of the second operand
//
// Examples of the dgt and dst instructions:
//
// | acc | Instruction | acc' |  | acc | Instruction | acc' |
// | 596 |    dgt 0    |   6  |  | 596 |  dst 0 7    | 597  |
// | 596 |    dgt 1    |   9  |  | 596 |  dst 1 7    | 576  |
// | 596 |    dgt 2    |   5  |  | 596 |  dst 2 7    | 796  |
//
//
// Branching (a.k.a. Test) instructions :
//
//
//  - teq R/I R/I : Test if the value of the first operand is equal to
// the value of the second operand
//
//  - tgt R/I R/I : Test if the value of the first operand is (strictly)
// greater than the value of the second operand
//
//  - tlt R/I R/I : Test if the value of the first operand is (strictly)
// less than the value of the second operand
//
//  - tcp R/I R/I : Compare the value of the first operand with
// the value of the second operand
//
// Behavior of the tcp (A) (B) instruction :
//
// | Case  | Effect on '+' instructions | Effect on '-' instructions |
// | A > B |          Enabled           |         Disabled           |
// | A = B |          Disabled          |         Disabled           |
// | A < B |          Disabled          |         Enabled            |
//
//
// Conditional Execution :
//
// All instructions in the MCxxxx programming language are capable of conditional execution.
// Prefixing an instruction with a + or - symbol will cause that instruction to be enabled or disabled by test instructions.
// When an instruction is disabled by a test instruction, it will be skipped. Instructions with no prefix are never disabled and always execute normally.
// + and - instructions are both disabled by default.
// For all test instructions (except for tcp) + and - can be interpreted as enabled when a test case is true or false respectively.
// All test instructions will affect all + and - prefixed instructions until another test instruction is executed.
//
// For example :
// If we execute the operation "tgt 5 0", 5 is greater than 0, so instructions with the prefix "+"
// will be executed and instructions with the prefix "-" will be skipped.
// Other prefixes :
//
//
//    Lines with the prefix # are considered as comments and shall not be executed.
//    Lines with the prefix @ shall only be executed one time.
//
//
// Labels :
//
// Labels are single words ending with the suffix :.
// Note that an instruction can be placed after a label. This instructions will not have any prefix as the label itself already counts as a prefix.
//
// Xbus pins:
//
// For this puzzle you are provided with two Xbus "pins" x0 and x1.
// x0 is used for input, meaning that when the program asks you to take a value from the x0 register you need to take it from the "input data" line.
// Similarly x1 is used as an output so when the program asks you to place a value in the x1 register, this value will be part of the output of your solution.
// Input
// You will receive multiple lines of text representing a source code in the MCxxxx language.
//
// Line 1 : An integer K representing the length of the Input Data array
// Line 2 : K integers separated by white spaces representing your Input Data
// Line 3 : An integer N representing the number of lines of code
// Next N lines : A Line of code
// Output
// Line 1 : The program's Output Data represented by integers separated by white spaces
// Constraints
// 1 ≤ K ≤ 100
// 1 ≤ N ≤ 20
//
// -999 ≤ D ≤ 999 for any integer D within the Input and Output Data.
//
// At the start of a program, the registers will contain a value of 0.
//
// Registers can store integer values between -999 and 999, inclusive.
// If an arithmetic operation would produce a result outside this range, the closest allowed value is stored instead.
// For example, if acc contains the value 800 and the instruction add 400 is executed, then the value 999 will be stored in acc.
//
// The program will always output at least one value.
//
// There cannot be two labels with the same name.
//
// Special case : dst A B and dgt A furthermore require 0 ≤ A ≤ 2 and 0 ≤ B ≤ 9.
//
// Answer:
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

run();

function run() {
  let ptr = 0;
  let cond = null;

  let [inputs, linesOfCode] = readInput();
  const reg = { acc: 0, dat: 0, x0: inputs.reverse(), x1: [] };

  linesOfCode = linesOfCode.filter((e) => !e.trim().startsWith("#"));
  const commands = linesOfCode.map((e) => parseCommands(e));
  const labels = parseLabels(commands);

  while (ptr < commands.length) {
    let curIns = commands[ptr];
    let arr = [];

    // No condition is set, so skip any signed instructions
    if (curIns.sign !== null && cond === null) {
      ptr++;
      continue;
    }
    // Condition and sign handling
    if (curIns.sign === true && cond === false) {
      ptr++;
      continue;
    }
    if (curIns.sign === false && cond === true) {
      ptr++;
      continue;
    }
    // Deal with single execution lines (once instructions)
    if (curIns.once) {
      if (curIns.enabled === true) {
        curIns.enabled = false;
      } else {
        ptr++;
        continue;
      }
    }

    switch (curIns.ins) {
      case "label":
        break;
      //  mov R/I R : Copy the value of the first operand into the second operand
      case "mov":
        if (curIns.arg2 === "x1") {
          reg.x1.push(+get(curIns.arg1, reg));
        } else {
          reg[curIns.arg2] = +get(curIns.arg1, reg);
        }
        break;
      // jmp L : Jump to the instruction following the specified label
      case "jmp":
        if (curIns.arg1 in labels) ptr = +labels[curIns.arg1];
        break;
      // add R/I : Add the value of the first operand to the value of the acc register
      case "add":
        reg.acc = putR(+get(curIns.arg1, reg) + +reg.acc);
        break;
      // sub R/I : Subtract the value of the first operand to the value of the acc register
      case "sub":
        reg.acc = putR(reg.acc - +get(curIns.arg1, reg));
        break;
      // mul R/I : Multiply the value of the first operand by the value of the acc register
      case "mul":
        reg.acc = putR(+get(curIns.arg1, reg) * reg.acc);
        break;
      // not : If the value in acc is 0, store a value of 100 in acc. Otherwise, store a value of 0 in acc
      case "not":
        if (reg.acc === 0) reg.acc = 100;
        else reg.acc = 0;
        break;
      // dgt R/I : Isolate the specified digit of the value in the acc register and stores it in the acc register
      case "dgt":
        arr = reg.acc.toString().padStart(3, 0).split("").reverse();
        if (+get(curIns.arg1, reg) < 3) {
          reg.acc = +arr[+get(curIns.arg1, reg)];
        }
        break;
      // dst R/I R/I : Isolate the digit of acc specified by the first operand and set it to the value of the second operand
      case "dst":
        arr = reg.acc.toString().padStart(3, 0).split("").reverse();
        if (+get(curIns.arg1, reg) < 3 && +get(curIns.arg2, reg) < 10) {
          arr[+get(curIns.arg1, reg)] = +get(curIns.arg2, reg);
          reg.acc = +arr.reverse().join("");
        }
        break;
      // teq R/I R/I : Test if the value of the first operand is equal to the value of the second operand
      case "teq":
        cond = +get(curIns.arg1, reg) === +get(curIns.arg2, reg);
        break;
      // tgt R/I R/I : Test if the value of the first operand is (strictly) greater than the value of the second operand
      case "tgt":
        cond = +get(curIns.arg1, reg) > +get(curIns.arg2, reg);
        break;
      // tlt R/I R/I : Test if the value of the first operand is (strictly) less than the value of the second operand
      case "tlt":
        cond = +get(curIns.arg1, reg) < +get(curIns.arg2, reg);
        break;
      // tcp R/I R/I : Compare the value of the first operand with the value of the second operand
      case "tcp":
        if (+get(curIns.arg1, reg) === +get(curIns.arg2, reg)) {
          cond = null;
        } else cond = +get(curIns.arg1, reg) > +get(curIns.arg2, reg);
        break;

      default:
        break;
    }
    ptr++;
  }
  console.log(reg.x1.join(" "));
}

// Helper functions:

// Handles getting a value from an integer or from a register/input
function get(arg, reg) {
  if (isNaN(arg)) {
    if (arg === "x0") return +reg.x0.pop();
    else return +reg[arg];
  } else return arg;
}

// Makes sure values we are putting into a register are bounded properly
function putR(val) {
  if (val > 999) return 999;
  if (val < -999) return -999;
  return val;
}

// Do the initial input read and split everything up
function readInput() {
  const k = parseInt(readline());
  const inputs = readline().split(" ").map(Number);
  const n = parseInt(readline());
  const linesOfCode = [];
  for (let i = 0; i < n; i++) {
    let line = readline();
    // Deal with labels, which may be embedded in a line of code
    if (line.includes(":")) {
      if (line.trim().endsWith(":")) {
        linesOfCode.push(line);
      } else {
        linesOfCode.push(line.split(":")[0] + ":");
        linesOfCode.push(line.split(":").slice(1).join("").trim());
      }
    } else linesOfCode.push(line);
  }
  return [inputs, linesOfCode];
}

// Create a command object that deals with various parameters of execution
function parseCommands(cmd) {
  const obj = {
    label: false,
    ins: "",
    arg1: "",
    arg2: "",
    sign: null,
    once: false,
    enabled: true,
  };

  const arr = cmd.split(" ");
  if (arr[0] === "@") {
    obj.once = true;
    arr.shift();
  }
  if (arr[0] === "+" || arr[0] === "-") {
    if (arr[0] === "+") {
      obj.sign = true;
    } else {
      obj.sign = false;
    }
    arr.shift();
    obj.enabled = false;
  }
  if (arr[0].trim().endsWith(":")) {
    obj.label = arr[0].slice(0, -1);
    obj.ins = "label";
    return obj;
  }
  obj.ins = arr.shift();
  obj.arg1 = arr.shift();
  obj.arg2 = arr.shift();
  return obj;
}

// Splits out the labels to a "label: index" key pair for instruction lookup
function parseLabels(cmd) {
  let labels = {};
  cmd.forEach((e, i) => {
    if (e.label) labels[e.label] = i;
  });
  return labels;
}

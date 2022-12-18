// Simple CPU Emulation 1
//
//  Goal
// You must create an emulator that takes a set of instructions and interprets them.
// An emulator is a software program that mimics hardware, in this case a CPU.
// In this puzzle, you'll have to emulate an Arithmetic and Logic Unit (ALU) and registers.
// This CPU uses three 8-bit registers numbered 0,1, and 2, initialized to zero.
//
// Example:
// Instruction - Opcode - description; comment
// 1015 - 1knn - LD k, nn ; Load 0x15 into register 0x0
//
// Opcode table
// 0000 – EXIT - Stop Execution and print result
// 1knn - LD k, nn - Load value nn into register k
// 20xy - ADD x, y - Add the value of register y to register x and store the value in register x, if the result
//                   is greater than 8 bits set register 2 to 1 else 0. Only the lowest 8-bits are stored in register x.
// 30xy - SUB x, y - Subtract the value of register y from register x and store the value in register x, if register x < register y set register 2 to 1 else 0.
// 40xy – OR x,y – Bitwise OR on value of register x and register y, store value in register x
// 50xy – AND x,y – Bitwise AND on value of register x and register y, store value in register x
// 60xy – XOR x, y - Bitwise XOR on value of register x and register y, store value in register x
// 7knn – SE k, nn – Skip next instruction if value of register k equals nn
// 8knn – SNE k, nn – Skip next instruction if value of register k is not equal to nn
// 90xy – SE x,y – Skip next instruction if value of register x equals value of register y
// A0xy – SNE x,y - Skip next instruction if value of register x is not equal to the value of register y
//
// Example set of instructions:
//
// 1005110520010000
//
//
// opcode - instruction - comment
// 1005 - LD 0, 05 - Load 0x05 into register 0x0
// 1105 - LD 1, 05 - Load 0x05 into register 0x1
// 2001 - ADD 0,1 - Add register 0x0 to register 0x1, store in register 0x0
// 0000 - EXIT - stop and print results
//
// Example execution:
// # register values = 0, 0, 0
// opcode 1005
// # register values = 5, 0, 0
// opcode 1105
// # register values = 5, 5, 0
// opcode 2001
// # register values = 10, 5, 0
// opcode 0000
// # exit and print register values
// PRINT 10 5 0
// Input
// You will receive a string of hexadecimal characters that represent the instructions to be interpreted.
// Each character represents 4 bits and an opcode is made up of 4 characters, or 16 bits. An opcode is a single operation that must be performed.
//
// Line 1: A string of hex characters, program, without spaces
// Output
// Print the values of registers 0,1 and 2, in decimal notation and separated by spaces.
// Constraints
// program length <= 100 and is divisible by 4
// Example
// Input
//
// 1005110520010000
//
// Output
//
// 10 5 0
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
  const program = readline();
  const code = parseInput(program);
  execute(code);
}

function execute(code) {
  let ptr = 0;
  let reg = {
    0: 0,
    1: 0,
    2: 0,
  };

  while (ptr < code.length) {
    let curIns = code[ptr].ins;
    let x = code[ptr].arg1;
    let y = code[ptr].arg2;
    let k = code[ptr].k;
    let tmp = 0;

    switch (curIns) {
      case "EXIT":
        ptr = code.length;
        break;
      case "LDK":
        reg[k] = +x;
        break;
      case "ADD":
        tmp = +reg[x] + +reg[y];
        if (tmp > 255) reg["2"] = 1;
        else reg["2"] = 0;
        reg[x] = tmp & 0xff;
        break;
      case "SUB":
        reg[x] = +reg[x] - +reg[y];
        if (+reg[x] < +reg[y]) reg["2"] = 1;
        else reg["2"] = 0;
        reg[x] = reg[x] & 0xff;
        break;
      case "OR":
        reg[x] = +reg[x] | +reg[y];
        break;
      case "AND":
        reg[x] = +reg[x] & +reg[y];
        break;
      case "XOR":
        reg[x] = +reg[x] ^ +reg[y];
        break;
      case "SEK":
        if (+reg[k] === +x) ptr++;
        break;
      case "SNEK":
        if (+reg[k] !== +x) ptr++;
        break;
      case "SE":
        if (+reg[x] === +reg[y]) ptr++;
        break;
      case "SNE":
        if (+reg[x] !== +reg[y]) ptr++;
        break;
    }
    ptr++;
  }
  console.error(reg);
  console.log(`${reg[0]} ${reg[1]} ${reg[2]}`);
}

function parseInput(prg) {
  let arr = prg.match(/.{1,4}/g);
  console.error(arr);
  arr = arr.map((e) => disassemble(e));
  return arr;
}

function disassemble(ins) {
  let dis = {
    ins: "",
    k: "",
    arg1: "",
    arg2: "",
  };

  let opcode = ins.split("");

  switch (opcode[0]) {
    case "0":
      dis.ins = "EXIT";
      break;
    case "1":
      dis.ins = "LDK";
      dis.k = opcode[1];
      dis.arg1 = "0x" + opcode[2] + opcode[3];
      break;
    case "2":
      dis.ins = "ADD";
      dis.arg1 = opcode[2];
      dis.arg2 = opcode[3];
      break;
    case "3":
      dis.ins = "SUB";
      dis.arg1 = opcode[2];
      dis.arg2 = opcode[3];
      break;
    case "4":
      dis.ins = "OR";
      dis.arg1 = opcode[2];
      dis.arg2 = opcode[3];
      break;
    case "5":
      dis.ins = "AND";
      dis.arg1 = opcode[2];
      dis.arg2 = opcode[3];
      break;
    case "6":
      dis.ins = "XOR";
      dis.arg1 = opcode[2];
      dis.arg2 = opcode[3];
      break;
    case "7":
      dis.ins = "SEK";
      dis.k = opcode[1];
      dis.arg1 = "0x" + opcode[2] + opcode[3];
      break;
    case "8":
      dis.ins = "SNEK";
      dis.k = opcode[1];
      dis.arg1 = "0x" + opcode[2] + opcode[3];
      break;
    case "9":
      dis.ins = "SE";
      dis.arg1 = opcode[2];
      dis.arg2 = opcode[3];
      break;
    case "A":
      dis.ins = "SNE";
      dis.arg1 = opcode[2];
      dis.arg2 = opcode[3];
      break;
    default:
      break;
  }
  return dis;
}

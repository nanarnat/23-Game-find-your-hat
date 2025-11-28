"use strict";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

// Board tiles
const PLAYER = "*";
const EMPTY = "░";
const HOLE = "O";
const HAT = "^";

// Hardcoded board
function makeBoard(input){
	if (input){
		let board = [
		[PLAYER, EMPTY, HOLE],
		[EMPTY, HOLE, EMPTY],
		[EMPTY, HAT, EMPTY],
		];
		return board;
	} else{
		row = customRow();
		col = customCol();
		const board = [];
		let playerSpawn = False;
		let hatSpawn = False;
		return board;
	}
}

function random(){
	
	if (PP) {
		const tiles = Math.floor(Math.random()*4);
		switch (tiles){
			case 1 : 
			PP = false;
			return PLAYER; 
			break;
			case 2 : 
			return HOLE; 
			break;
			case 3 : 
			return HAT; 
			break;
			default: 
			return EMPTY; 
			break;
		}
	} else {
		const tiles = Math.floor(Math.random()*3);
		switch (tiles){
			case 1 : 
			return HAT;
			break;
			case 2 : 
			return HOLE; 
			break;
			default: 
			return EMPTY; 
			break;
		}
	}
}

function customRow(){
	let answer = true;
	let rowNum;
		while (answer){
			const row = prompt("How many rows do you want?")
			rowNum = Number(row);
			if (rowNum !== 0 && !isNaN(rowNum) && Number.isInteger(rowNum)) {
				answer = false;
			} else {
				console.log("Invalid format")
			}
		}
	return rowNum;	
}

function customCol(){
	let answer = true;
	let colNum;
		while (answer){
			const col = prompt("How many cols do you want?")
			colNum = Number(col);
			if (colNum !== 0 && !isNaN(colNum) && Number.isInteger(colNum)) {
				answer = false;
			} else {
				console.log("Invalid format")
			}
		}
	return rowNum;
}

// Game state

let playerRow = 0;
let playerCol = 0;
let playing = true;

// Print board
function printBoard(board) {
	console.clear(); // call console.clear() before print each move
	for (let i = 0; i < rowLength; i++) {
		const pBoard = board[i].join("");
		console.log(pBoard);
	}
}

// Game play loop
function gameLoop() {
	let gameContinue = true;
	while (gameContinue){
		printBoard(board);
		const input = prompt("Which way? (w/a/s/d): ");
		gameContinue = whichWay(input);
	}
}

function whichWay(input){
	let way = true;
	let con = true;
	while(way){
		input = input.toLowerCase();
		switch (input){
			case "a": 
			con = moveLeft(); 
			way = false;
			break;
			case "w": 
			con = moveUp();	
			way = false; 
			break;
			case "s": 
			con = moveDown(); 
			way = false;
			break;
			case "d": 
			con = moveRight(); 
			way = false;
			break;
			default:
			console.log("Incorrect Format")
			input = prompt("Which way? (w/a/s/d): ");
			break;
		}
	}
	return con;
}	

function moveUp(){
	if (playerRow > 0){
		const pastRow = playerRow;
		const pastCol = playerCol;
		playerRow--;
		if (checkHole(playerCol, playerRow)){
			console.log("Game over you fell in the hole");
			return false;
		}else if (checkHat(playerRow, playerCol)){
			console.log("Victory!");
		} else {
			updateBoard(pastRow, pastCol, playerRow, playerCol);
			return true;
		}
	} else {
		return outOfBoard();
	}	
}

function moveDown(){
	if (playerRow < rowLength-1){
		const pastRow = playerRow;
		const pastCol = playerCol;
		playerRow++;
		if (checkHole(playerCol, playerRow)){
			console.log("Game over you fell in the hole");
			return false;
		} else if (checkHat(playerRow, playerCol)){
			console.log("Victory!");
		}else {
			updateBoard(pastRow, pastCol, playerRow, playerCol);
			return true;
		}
	} else {
		return outOfBoard();
	}
}

function moveLeft(){
	if (playerCol > 0){
		const pastRow = playerRow;
		const pastCol = playerCol;
		playerCol--;
		if (checkHole(playerCol, playerRow)){
			console.log("Game over you fell in the hole");
			return false;
		} else if (checkHat(playerRow, playerCol)){
			console.log("Victory!");
		}	else {
			updateBoard(pastRow, pastCol, playerRow, playerCol);
			return true;
		}
	} else {
		return outOfBoard();
	}
}

function moveRight(){
	if (playerCol < colLength-1){
		const pastRow = playerRow;
		const pastCol = playerCol;
		playerCol++;
		if (checkHole(playerCol, playerRow)){
			console.log("Game over you fell in the hole");
			return false;
		} else if (checkHat(playerRow, playerCol)){
			console.log("Victory!");
		}else {
			updateBoard(pastRow, pastCol, playerRow, playerCol);
			return true;
		}
	} else {
		return outOfBoard();
	}
}

function updateBoard(row,col,rowNew,colNew){
	board[row][col] = EMPTY;
	board[rowNew][colNew] = PLAYER;
}

function outOfBoard(){
	console.log("Game over you fell out of board");
	return false;
}

function checkHole(playerCol,playerRow){
	if (board[playerRow][playerCol] === HOLE){
		return true;
	} else {
		return false;
	}
}

function checkHat(playerRow, playerCol){
	if (board[playerRow][playerCol] === HAT){
		return true;
	} else {
		return false;
	}
}

function gameStart(input) {
	let startQuestion = true;
	while (startQuestion) {
		if (input.toLowerCase() === "y") {
			startQuestion = false;
			console.log(input);
			console.log("Hardcoded Board");
			const hBoard = true;
			return hBoard;
		} else if (input.toLowerCase() === "n") {
			startQuestion = false;
			console.log(input);
			console.log("Custom Board");
			const hBoard = false
			return hBoard;
		} else {
			console.log(input);
			input = prompt("Please answer (y/n) format: ");
		}
	}
}

const input = prompt("Do you want to play hardcoded board (y/n): ");
let board = makeBoard(gameStart(input) );
if (gameStart(input) !== true) {
	playerRow = 0;
	playerCol = 0;
}
const rowLength = board.length;
const colLength = board[0].length;
gameLoop();


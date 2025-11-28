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
	}
	
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
		//moves.push(board[playerRow][playerCol]);
		const input = prompt("Which way? (w/a/s/d): ");
		whichWay(input);
	}
}

function whichWay(input){
	let way = true;
	while(way){
		input = input.toLowerCase();
		switch (input){
			case "a": 
			moveLeft(); 
			way = false;
			break;
			case "w": 
			moveUp();	
			way = false; 
			break;
			case "s": 
			moveDown(); 
			way = false;
			break;
			case "d": 
			moveRight(); 
			way = false;
			break;
			default:
			console.log("Incorrect Format")
			input = prompt("Which way? (w/a/s/d): ");
			break;
		}
	}
}

function moveUp(){
	if (playerRow > 0){
		playerRow--;
		moves.push(board[playerRow][playerCol]);
		return playerRow;
	} else {
		const outOfBoard = true;
		return outOfBoard;
	}	
}

function moveDown(){
	if (playerRow < rowLength){
		playerRow++;
		moves.push(board[playerRow][playerCol]);
		return playerRow;
	} else {
		const outOfBoard = true;
		return outOfBoard;
	}
}

function moveLeft(){
	if (playerCol > 0){
		playerCol--;
		moves.push(board[playerRow][playerCol]);
		return playerCol;
	} else {
		const outOfBoard = true;
		return outOfBoard;
	}
}

function moveRight(){
	if (playerCol < colLength){
		playerCol++;
		moves.push(board[playerRow][playerCol]);
		return playerCol;
	} else {
		const outOfBoard = true;
		return outOfBoard;
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
const rowLength = board.length;
const colLength = board[0].length;
gameLoop();


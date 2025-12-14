"use strict";

const FACE_COLOR = "#3b061a";
const TEXT_COLOR = "#ce4383";

const HAND_COLORS = ["#ffffff", "#ffffff", "salmon", "#0000ff"];
const HAND_LENGTHS = [0.7, 0.85, 0.9, 0.9];

const canvas = document.querySelector("#hextime canvas");
const ctx = canvas.getContext("2d");

let hexTime = 0;
let hexString = "";

let currTime = new Date();
let dayStart = new Date(
	currTime.getUTCFullYear(),
	currTime.getUTCMonth(),
	currTime.getUTCDate(),
	0,
	-currTime.getTimezoneOffset(),
	0,
	0
);

function updateTime() {
	currTime = new Date();
	hexTime = (2 ** 16 * (currTime - dayStart) / 86400000) % 2 ** 16;
	hexString = Math.floor(hexTime).toString(16).toUpperCase();
	document.querySelector("#hextime .time").innerText = "0x" + "0".repeat(4-hexString.length) + hexString;
	document.querySelector("#hextime .date").innerText = currTime.toISOString().substring(0, 10);
	document.querySelector("#hextime .hms").innerText = currTime.toISOString().substring(11, 16);
	document.querySelector("title").innerText = "0x" + "0".repeat(4-hexString.length) + hexString;
}

function drawClock() {

	let x = canvas.width;
	let y = canvas.height;
	let radius = Math.min(x, y) / 2;

	ctx.clearRect(0, 0, x, y);

	// clock face

	ctx.fillStyle = FACE_COLOR;
	ctx.beginPath();
	ctx.arc(x / 2, y / 2, radius, 0, 2 * Math.PI, 0);
	ctx.fill();

	ctx.lineWidth = 5;
	ctx.fillStyle = TEXT_COLOR;
	ctx.strokeStyle = TEXT_COLOR;
	ctx.font = `Bold ${radius / 5}px "Atkinson Hyperlegible Mono"`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	// major ticks

	for (let i = 0; i < 16; i++) {
		ctx.beginPath();
		ctx.moveTo(x / 2 + 0.9 * radius * Math.sin(2 * Math.PI * i / 16), y / 2 - 0.9 * radius * Math.cos(2 * Math.PI * i / 16));
		ctx.lineTo(x / 2 + radius * Math.sin(2 * Math.PI * i / 16), y / 2 - radius * Math.cos(2 * Math.PI * i / 16));
		ctx.stroke();

		ctx.fillText(
			i.toString(16).toUpperCase(),
			x / 2 + 0.8 * radius * Math.sin(2 * Math.PI * i / 16),
			y / 2 + 4 - 0.8 * radius * Math.cos(2 * Math.PI * i / 16)
		); // shh don't tell anyone it's off center
	}

	ctx.lineWidth = 3;

	const ticks = 128;

	for (let i = 0; i < ticks; i++) {
		ctx.beginPath();
		ctx.moveTo(x / 2 + 0.95 * radius * Math.sin(2 * Math.PI * i / ticks), y / 2 - 0.95 * radius * Math.cos(2 * Math.PI * i / ticks));
		ctx.lineTo(x / 2 + radius * Math.sin(2 * Math.PI * i / ticks), y / 2 - radius * Math.cos(2 * Math.PI * i / ticks));
		ctx.stroke();
	}

	ctx.lineWidth = 5;


	for (let i = 0; i < 3; i++) {
		ctx.strokeStyle = HAND_COLORS[i];
		ctx.beginPath();
		ctx.moveTo(
			x / 2 - 0.1 * radius * Math.sin(2 * Math.PI * hexTime / 2 ** (16 - 4 * i)),
			y / 2 + 0.1 * radius * Math.cos(2 * Math.PI * hexTime / 2 ** (16 - 4 * i))
		);
		ctx.lineTo(
			x / 2 + HAND_LENGTHS[i] * radius * Math.sin(2 * Math.PI * hexTime / 2 ** (16 - 4 * i)),
			y / 2 - HAND_LENGTHS[i] * radius * Math.cos(2 * Math.PI * hexTime / 2 ** (16 - 4 * i))
		);
		ctx.stroke();
	}

	ctx.fillStyle = HAND_COLORS[2];
	ctx.beginPath();
	ctx.arc(x / 2, y / 2, 10, 0, 2 * Math.PI, 0);
	ctx.fill();

}

updateTime();
drawClock();
setInterval(updateTime, 16.666);
setInterval(drawClock, 16.666);
#!/usr/bin/env node
// Building Images via node canvas
// https://github.com/Automattic/node-canvas
// Article: https://flaviocopes.com/canvas-node-generate-image/
// Grapihcs Library on top of Canvas: http://fabricjs.com/fabric-intro-part-1#why_fabric
// 36x36 for Icon 144 DPI

import process from 'node:process';
import xbar, {separator} from '@sindresorhus/xbar';
import canvas from 'canvas';
import {UniversalSpeedtest, SpeedUnits} from 'universal-speedtest';

const config = {
	speedtest: 'speedtestnet', // Speedtestnet | cloudflarecom
	timeout: 5, // Seconds
	unit: SpeedUnits.MBps,
	debug: false, // If `true` this does not run the speedtest and instead uses test value (reduces time needed when playing with image drawing)
	drawBox: false, // Box around drawn image
};

function pad(pad, string_, padLeft) {
	if (typeof string_ === 'undefined') {
		return pad;
	}

	if (padLeft) {
		return (pad + string_).slice(-pad.length);
	}

	return (string_ + pad).slice(0, Math.max(0, pad.length));
}

async function getSpeedtestResult() {
	const speedtest = new UniversalSpeedtest({
		measureUpload: true,
		downloadUnit: config.unit,
		timeout: config.timeout,
		wait: true,
	});

	try {
		return [
			false,
			config.speedtest.toLocaleLowerCase() === 'speedtestnet'
				? await speedtest.runSpeedtestNet()
				: await speedtest.runCloudflareCom(),
		];
	} catch (error) {
		return [true, error];
	}
}

async function runSpeedtest() {
	if (config.debug) {
		return {
			downloadSpeed: 7.14,
			uploadSpeed: 8.1467,
		};
	}

	const [error, result] = await getSpeedtestResult();

	if (error) {
		console.log('Error while SpeedTesting');
		console.log('---');
		console.log(result);
		process.exit(0);
	}

	return result;
}

const result = await runSpeedtest();

const download = `${(Math.round(result.downloadSpeed * 100) / 100).toFixed(
	2,
)} ${config.unit}`;
const upload = `${(Math.round(result.uploadSpeed * 100) / 100).toFixed(2)} ${
	config.unit
}`;

const length = Math.max(download.length, upload.length);
const padSpaces = Array.from({length: length + 1}).join(' ');

const width = 10 + (length * 6);
const height = 20;

const {createCanvas} = canvas;

const myCanvas = createCanvas(width, height);
const ctx = myCanvas.getContext('2d');

ctx.strokeStyle = '#FFF';
ctx.lineWidth = 2;
if (config.drawBox) {
	ctx.strokeRect(0, 0, width, height);
}

ctx.font = 'bold 10px Hack Nerd Font'; // Ubuntu Mono' // Source Code Pro'
ctx.textAlign = 'left';
ctx.textBaseline = 'top';
ctx.fillStyle = '#FFFFFF';

const text1l = 'D:';
const text1r = `${pad(padSpaces, download, true)}`;
const text2l = 'U:';
const text2r = `${pad(padSpaces, upload, true)}`;

ctx.fillText(text1l, 0, 0);
ctx.fillText(text2l, 0, 10);

ctx.textAlign = 'right';
ctx.fillText(text1r, width, 0);
ctx.fillText(text2r, width, 10);

const imageBase64 = myCanvas.toBuffer('image/png').toString('base64');

xbar([
	{
		text: '',
		dropdown: false,
		image: imageBase64,
	},
	separator,
	{
		text: `Ping: ${result.ping * 1000} ms`,
	},
	{
		text: `Download speed: ${result.downloadSpeed} ${config.unit}`,
	},
	{
		text: `Upload speed: ${result.uploadSpeed} ${config.unit}`,
	},
	{
		text: `Last updated: ${new Date().toLocaleString()}`,
	},
]);

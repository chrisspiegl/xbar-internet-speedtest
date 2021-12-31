# xbar-internet-speedtest

> [xbar](https://github.com/matryer/xbar) plugin to test you internet speed in regular interval and display upload and download speed in the menu bar

<img src="media/screenshot.png" style="width: 100%;">

Always know how fast your internet (upload & download) is at any given moment.

## Install

```bash
npm install --global xbar-internet-speedtest
```

At the moment you will have to link the files manually so that the `index.js` file is found and executed properly by xbar. But maybe it will be possible in the future to do this similar to [alfy](https://github.com/sindresorhus/alfy).

Basic installation would be to either download this package into the xbar plugins folder so that it lands in the folder `xbar/plugins/xbar-internet-speedtest`, then run `npm install` and followed by that you can then `ln -s ./index.sh ../001-xbar-internet-speedtest.15m.sh` so that it will be found and executed by xbar every 15 minutes.

*Important Note:* It may be necessary to add additional pacakges for the image building library [node-canvas](https://github.com/Automattic/node-canvas) to work. The instructions can be found [here](https://github.com/Automattic/node-canvas#compiling).

*Requires [Node.js](https://nodejs.org) 14+ and the [xbar](https://github.com/matryer/xbar).*

## Usage

Configuration can be applied by editing the `index.js` file.

At the top there is a `config` variable which you can adjust without having to mess with code.

You can for example change which speedtest you'd prefer (choose between Speedtest.net and Cloudflare.com).

## Related

* [My Alfred Workflows](https://github.com/chrisspiegl/alfred-workflows) - My Alfred Workflow Directory (if you like automatino, you might like this).
* [xbar](https://github.com/matryer/xbar) - The main program necessary to run this plugin.
* [@sindresorhus/xbar](https://github.com/sindresorhus/xbar) - Handy library for writing xbar plugins.
* [universal-speedtest](https://github.com/karelkryda/universal-speedtest) - Library to run speedtests via node.js and not need puppeteer made possible by [Karel Krýda](https://github.com/karelkryda).

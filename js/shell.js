/*
 * Copyright (c) CiotoFlow
 *
 * This file is part of CiotoShell.
 *
 * CiotoShell is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CiotoShell is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CiotoShell.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Cioto Shell v2.0 */

var audio = null;
var term = null;

var helpPage = [
    "Commands available:",
    "    help  ... print this help page",
    "    clear ... clear the screen",
    "    exit  ... leave this terminal",
    " ",
    "Happy Hacking!",
    " "
];

var commands = {
    "help": "help_cmd",
    "clear": "clear_cmd",
    "exit": "exit_cmd"
};

function init()
{
    term = new Terminal({ x: 0, y: 0, termDiv: 'terminal', initHandler: termInitHandler, 
			  handler: termHandler, crsrBlinkMode: true, ps: "ciotoflow>",
			  cols: 100, rows: 30 });
    term.open();
}

function termHandler()
{
    var parser = new Parser();
    parser.parseLine(this);

    var cmd = this.argv[this.argc++].toLowerCase();

    this.newLine();
    
    if (cmd == "help") {
	this.write(helpPage);
    } else if (cmd == "clear") {
	this.clear();
    } else if (cmd == "exit") {
	this.cursorOff();
	this.write("Terminal closed.");
	location.href = "http://flow.ciotoni.net";
	return;
    } else if (cmd != "") {
	this.write(cmd + ": command not found");
    }
    
    this.prompt();
}

function termInitHandler()
{
    this.type('>');
    this.cursorOn();
    setTimeout(function() {openingSequence(0);}, 600);
}

function openingSequence(n)
{
    var openingPrompt = 'tell\bnet flow.ciotoni.it\b\bnet';

    term.cursorOff();
    
    if (n < openingPrompt.length) {
	var c = openingPrompt.charAt(n++);

	switch (c) {
	case '\b':
	    term.c--;
	    term.type(' ');
	    term.c--;
	    break;
	default:
	    term.type(c);
	}
	
	term.cursorOn();
	var delay =  (c == '\b')? 300 : 
	    (n < openingPrompt.length && openingPrompt.charAt(n) == '\b')? 240:120;
	setTimeout(function() {openingSequence(n);}, delay+Math.floor(Math.random()*120));
    } else {
	setTimeout(startPrompt, 800);
    }
}

function startPrompt()
{
    term.newLine();
    term.type("Trying flow.ciotoni.net");
    audio.play();
    for (var i=1; i<12; i++) {
	setTimeout("term.type('.')", 1000 * i);	
    }

    setTimeout("connected()", 13000);
}

function connected()
{
    term.newLine();
    term.write("Connected to flow.ciotoni.net");
    term.newLine();
    term.newLine();
    term.write("Ciotoflow - let the _CIOTIA_ flows out ::: cioto-shell V2.0");
    term.newLine();
    term.newLine();
    term.write("Please type HELP if you need assistance.");
    term.newLine();
    term.newLine();

    term.prompt();
}

function setupAudio() {
    var type;
    var v = 0.2; /* Volume */

    audio = document.createElement('audio');

    if (!audio || !audio.canPlayType)
	return;
    
    if (audio.canPlayType('audio/mpeg') != '') {
	type = 'mp3';
    } else if (audio.canPlayType('audio/ogg') != '') {
	type = 'ogg';
    } else if (audio.canPlayType('audio/wav') != '' || audio.canPlayType('audio/x-wav') != '') {
	type = 'wav';
    } else {
	return;
    }

    audio.setAttribute('preload', 'auto');
    audio.setAttribute('autobuffer', 'autobuffer');
    audio.setAttribute('src', 'sounds/modem.'+type);
    audio.load();
    audio.volume = v;
}

setupAudio();
onload=init;

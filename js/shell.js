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
    "    help     ... print this help page",
    "    clear    ... clear the screen",
    "    exit     ... leave this terminal",
    "    ls       ... list content [ pplnx upgrade ]",
    "    whoami   ... print effective userid",
    "    date     ... print the system date and time",
    "    time     ... get time",
    "    history  ... history library",
    "    cal      ... displays a calendar",
    "    whereami ... display your probable position",
    " ",
    "Happy Hacking!",
    " "
];

var boh = [
    " "
];

var commands_for_completion = ["help","clear","exit","ls","who","whoami","date","time","history","cal","whereami"];

var commands = {
    "help": "help_cmd",
    "clear": "clear_cmd",
    "exit": "exit_cmd",
    "ls": "list_content",
    "whoami": "whoami_cmd",
    "date": "date_cmd",
    "time": "time_cmd",
    "history": "history_cmd",
    "cal": "cal_cmd",
    "whereami": "whereami_cmd"
};

var vgeoip_country_code;
var vgeoip_country_name;
var vgeoip_city;
var vgeoip_region;
var vgeoip_latitude;
var vgeoip_longitude;

function init()
{
    term = new Terminal({ x: 0, y: 0, termDiv: 'terminal', initHandler: termInitHandler, 
			  handler: termHandler, ctrlHandler: controlHandler,
			  crsrBlinkMode: true, ps: "ciotoflow>",
			  cols: 100, rows: 30 });
    term.open();
}

function termHandler()
{
    var parser = new Parser();
    parser.parseLine(this);
    
    // quì perdiamo l'argomento ....
    try { var cmd = this.argv[this.argc++].toLowerCase(); }
    catch(err) { this.write( boh );  var cmd = '';}
    
    // quì acchiappiamo l'argomento :)
    try { var arg = this.argv[1].toLowerCase(); }
    catch(err) { var arg = ""; }

    
    /* pplnx debug only
    this.write("\ncmd echo : "+cmd);
    this.write("\narg echo : "+arg);
    this.write("\narg cnt : "+this.argc);
    */
    
    this.user = "ciotoflow";    

    this.newLine();
    
    // quì ci vuole uno switch case
    // http://www.w3schools.com/js/js_switch.asp
    if (cmd == "help") {
	this.write(helpPage);
    } else if (cmd == "clear") {
	this.clear();
    } else if (cmd == "exit") {
	this.cursorOff();
	this.write("Terminal closed.");
	location.href = "http://flow.ciotoni.net";
	return;
    } 

    else if (cmd == "ls" && arg=="contatti") {
        
    par = this;
    
        $('#result').load('../human.html #contatti', 
        function (responseText, textStatus, XMLHttpRequest) {
    if (textStatus == "success") {
        
        var res = $('#result').text();
        
        par.write( res );
        

    }
    if (textStatus == "error") {
         // oh noes!
    }
    });
    
    }

    else if (cmd == "ls" && arg=="incontro") {
    par = this;
        $('#result').load('../human.html #incontro', 
        function (responseText, textStatus, XMLHttpRequest) {
    if (textStatus == "success") {
        
        var res = $('#result').text();
        
        par.write( res ); par.newLine();
        

    }
    if (textStatus == "error") {
         // oh noes!
    }
    });
    
    }

    else if (cmd == "ls" && arg=="news") {
    par = this;
        $('#result').load('../human.html #news', 
        function (responseText, textStatus, XMLHttpRequest) {
    if (textStatus == "success") {
        
        var res = $('#result').text();
        
        par.write( res );
        

    }
    if (textStatus == "error") {
         // oh noes!
    }
    });
    
    }

    else if (cmd == "ls") {
	this.write("contatti news incontro\n\n");
    }

    else if (cmd == "whoami" || cmd =="who"){
	this.write(this.user);
    }

    else if (cmd == "date"){
	this.write(Date());
    }

    else if (cmd == "history"){
	this.write(this.history);
    }

    else if (cmd == "time"){
	var d=new Date();
	this.write(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
    }

    else if (cmd == "history"){
        this.write(this.history);
    }

    else if (cmd == "cal"){
	Date.prototype.getMonthName=function(){
		return['January','February','March','April','May','June','July','August','September','October','November','December'][this.getMonth()];
	};
	Date.prototype.daysInMonth=function(){
		return new Date(this.getFullYear(),this.getMonth()+1,0).getDate();
	};
	 
	if(this.argv.length==1){
		d=new Date();
	}else{
		if(this.argv[1]=='-h'||this.argv[1]=='--help'){
			this.write('display this months calendar.%n');
			this.write('usage: cal [month]%n');
			return;
		}else if(!isnumeric(this.argv[1])){
			this.write('usage: cal [month] where [month] is numeric%n');
			return;
		      }else{
			now=new Date();
			var year=now.getFullYear();
			var day=now.getUTCDate();
			var month=this.argv[1]-1;
			d=new Date(year,month,day);
		      }
		}

	var calArray=[];
	var buildStr='';
	var numDays=d.daysInMonth();
	var startDay=new Date(d.getFullYear(),d.getMonth(),1).getDay();
	calArray.push(d.getMonthName()+' '+d.getFullYear());
	calArray.push('Sun Mon Tue Wed Thu Fri Sat');
	for(var i=0;i<startDay;i++){
		buildStr+='    ';
	}
	var blankdays=startDay;
	var filler='';
	var j=1;
	for(i=1;i<=numDays;i++){
			
		if(d.getDate()==i){
			j='%+r'+i+'%-r';
		}else{
			j=i;
		}
	
		if(i<10){
			buildStr+=' '+j+'  ';
		}else{
			buildStr+=j+'  ';
		}

		blankdays++;
		if(((blankdays%7)===0)&&(i<numDays)){
			calArray.push(buildStr);
			buildStr='';
		}
	}

	blankdays++;
	while((blankdays%7)!==0){
		buildStr+='    ';
		blankdays++;
	}

	calArray.push(buildStr);

	this.write(calArray);
    }

    else if (cmd == "whereami"){
        if(typeof vgeoip_country_code=='undefined'){
    	    initGeoIP();
    	}
 	this.write('Country:  '+vgeoip_country_name+' ('+vgeoip_country_code+')%n');
   	this.write('City:     '+vgeoip_city+'%n');
    	this.write('Position: '+vgeoip_latitude+'(latitude) - '+vgeoip_longitude+'(longitude)%n');
    }

    else if (cmd != "") {
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
	var delay =  (c == '\b')? 100 : 
	    (n < openingPrompt.length && openingPrompt.charAt(n) == '\b')? 40:20;
	setTimeout(function() {openingSequence(n);}, delay+Math.floor(Math.random()*20));
    } else {
	setTimeout(startPrompt, 100);
    }
}

function startPrompt()
{
    term.newLine();
    term.type("Trying flow.ciotoni.net");
    // l'audio è immorale
    audio.play();
    for (var i=1; i<3; i++) {
	setTimeout("term.type('.')", 100 * i);	
    }

    setTimeout("connected()", 200);
}

function connected()
{
    term.newLine();
    term.write("Connected to flow.ciotoni.net");
    term.newLine();
    term.newLine();
    term.write("Ciotoflow - let the _CIOTIA_ flows out ::: cioto-shell V2.1");
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

function isnumeric(str){
	for(var i=0;i<str.length;i++){
		var c=str.charAt(i);
		var a=c.charCodeAt(0);
		if(!(a>47&&a<58)&&!(a==45)){
			return false;
		}

		if(a==45&&i!==0){
			return false;
		}
	}
	return true;
}

function initGeoIP(){
	if(!window.geoip_country_code){
		vgeoip_country_code="N/A";
		vgeoip_country_name="N/A";
		vgeoip_city="N/A";
		vgeoip_region="N/A";
		vgeoip_latitude="N/A";
		vgeoip_longitude="N/A";
	}else{
		vgeoip_country_code=geoip_country_code();
		vgeoip_country_name=geoip_country_name();
		vgeoip_city=geoip_city();
		vgeoip_region=geoip_region();
		vgeoip_latitude=geoip_latitude();
		vgeoip_longitude=geoip_longitude();
	}
}

function controlHandler(){
    if(this.inputChar==termKey.ETX){
        this.newLine();
        this.prompt();
    }else if(this.inputChar==termKey.EOT){
        this.close();
    }
    else if(this.inputChar==9){
        tabCompletion(this);
    }
}

function tabCompletion(t){
    var tosort=[];
    var tolist=[];
    var arg='';
    var cmd='';
    var lpath='';
    var typed=t._getLine();
    if(typed.indexOf(' ')!=-1){
        args=typed.split(' ');
        cmd=args[0]+' ';
        if(args.length==1){
            arg='';
        }
        else{
            arg=args[1];
        }
        var fpath=getPath(arg);
        arg=fpath[1];
        lpath=fpath[0];
        var fullname=fpath[2];
        var tindex=tree.indexOf(fullname);
        if(tindex==-1){
            tindex=tree.indexOf(lpath);
            if(tindex==-1){
                tosort.push('');
            }
            else{
                tosort=tree_files[tindex][0];
            }
        }else{
        tosort=tree_files[tindex][0];
        if(t._getLine().charAt(t._getLine().length-1)!='/'){
            t.type('/');
        }
        arg='';
    }
}else{
    arg=typed;
    tosort=commands_for_completion;
}
var tabresult='';
for(var i=0;i<tosort.length;i++){
    if(tosort[i].indexOf(arg)===0){
        tolist.push(tosort[i]);
    }
}
if(tolist.length===0){
    tabresult='';
}
else if(tolist.length==1){
    tabresult=tolist[0].slice(arg.length);
    t.type(tolist[0].slice(arg.length));
}
else if(tolist.length>1){
    tabresult=tolist[0].slice(arg.length);
    var j=0;
    var nextchar=' ';
    if(tolist[0].length<arg.length){
        tabresult=arg;
    }else{
        tabresult=arg;
        while(tolist[0].length>(arg.length+j)&&nextchar.length>0){
            nextchar=tolist[0].charAt(arg.length+j);
            for(var k=1;k<tolist.length;k++){
                if((arg.length+j)>tolist[k].length||tolist[k].charAt(arg.length+j)!=nextchar){
                    nextchar='';
                    break;
                }
            }
        tabresult+=nextchar;
        t.type(nextchar);
        j++;
    }
}
}
if(tolist.length>1){
    t.charMode=true;
    typed=t._getLine();
    t.lock=true;
    t.cursorOff();
    t.newLine();
    listing(t,tolist);
    t.cursorOn();
    t.lock=false;
    t.charMode=false;
    t.prompt();
    t.type(typed);
}
}

function listing(t,f){
    if(typeof f=='undefined'){
        t.write('Error path does not exist%n');
        return;
    }
    var files=f;
    var name_length=0;
    var space_divider=5;
    var fileslist=[];
    for(var i=0;i<files.length;i++){
        if(files[i].length>name_length){
            name_length=files[i].length;
        }
    }
name_length=name_length+space_divider;
var dividers=Math.round((t.conf.cols-2)/name_length);
var j=1;
var thisline='';
for(var k=0;k<files.length;k++){
    thisline+=files[k];
    var this_name_lenth=files[k].length;
    var space_missing=name_length-this_name_lenth;
    var space='';
    while(space_missing>0){
        space=space+' ';
        space_missing--;
    }
    thisline+=space;
    j++;
    if(j>=dividers){
        fileslist.push(thisline);
        t.write(thisline+'%n');
        thisline='';
        j=1;
    }
}
if(j!==0){
    t.write(thisline+'%n');
}
}

setupAudio();
onload=init;


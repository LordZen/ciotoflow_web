
var phrases = [
    "Il ciotoflow &egrave; la copia non autorizzata della bibbia",
    "Il ciotoflow &egrave; un gestore di pompe funebri nei tempi morti",
    "Il ciotoflow &egrave; una ciotia",
    "Il ciotoflow &egrave; un null pointer",
    "Il ciotoflow &egrave; quella cosa con protuberanze in rj45",
    "Il ciotoflow &egrave; quella cosa con un cat7 in posizione eretta",
    "Il ciotoflow &egrave; un p&ograve; quel cazzo che ti pare",
    "Il ciotoflow &egrave; alla fine che come all'inizio andava qualcuno che per&ograve; programmava in Vala",
    "Il ciotoflow &egrave; un p&ograve; come ipv6 che si esite,ma per&ograve; che palle alla fine aspetto la fine del mondo",
    "Il ciotoflow &egrave; un case arrugginito vicino a un cassonetto pieno di wikiqoute",
    "Il ciotoflow &egrave; un bot sclerato sull'orlo di fallire il test di Turing,ma che per&ograve; potrebbe lavorare alla durex",
    "Il ciotoflow &egrave; un testo random stampato sulla carta d'identit&agrave; di Gioacchino Croce incrociato al semaforo"
];

function show_random(c)
{
    c.append(phrases[Math.floor(Math.random()*phrases.length)]);
}
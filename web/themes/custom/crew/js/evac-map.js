(function($) {
// This array represents each of the places from which evacuation routes exist.
// The first element is the name of the place (building). The second and third
// are the latitude and longitude. The fourth is the description of the
// evactuation point. The fifth is an optional filename giving an evacuation
// plan.
var places = [
	['Reset Map',41.508,-81.608,'Click on a building in the list above to show its evacuation point.'],
	['11409 Glenwood Ave.',41.500325,-81.604185,'Sidewalk in front of building'],
	['11422 Fairchild',41.500888,-81.603757,'Sidewalk in front of building'],
	['11426 Fairchild',41.500891,-81.603618,'Sidewalk in front of building'],
	['11430 Fairchild',41.500886,-81.603471,'Sidewalk in front of building'],
	['1576 E. 115th St., New Res Hall',41.515011,-81.604744,'Side walk in front of building'],
	['1680 E. 117th St.',41.511898,-81.602715,'In front of building'],
	['1719 E. 116th Place',41.511703,-81.603425,'In front of building'],
	['1727 E. 116th Place',41.511592,-81.603321,'In front of building'],
	['2266 Murray Hill',41.502316,-81.602381,'Sidewalk in front of building'],
	['Adelbert Gym/One-to-One',41.503245,-81.605455,'Sidewalk in front of building'],
	['Adelbert Hall',41.505044,-81.607991,'Sidewalk in front of building Adelbert Road side'],
	['Allen Memorial Library',41.505802,-81.608234,'Adjacent parking lot'],
	['Alpha Chi Omega',41.511689,-81.605285,'In front of building'],
	['Alpha Phi',41.513956,-81.607981,'Rear parking lot'],
	['Alumni Center',41.511938,-81.606975,'Adjacent parking lot'],
	['Alumni House',41.500483,-81.602741,'Courtyard near Tippit'],
	['Amasa Stone Chapel',41.504743,-81.609303,'Adjacent VIC parking lot'],
	['Art Studio',41.50223,-81.603313,'Adjacent parking lot'],
	['AW Smith',41.502736,-81.6072,'Sidewalk in front of building in the middle of the quad'],
	['Barking Spider',41.511348,-81.606956,'Adjacent parking lot'],
	['Barrie House (11920 Carlton) PMA',41.501362,-81.59992,'Sidewalk in front of building'],
	['Bellflower Hall',41.511833,-81.605102,'Sidewalk in front of building'],
	['Beta Theta Pi/Pi Beta Phi',41.502381,-81.601543,'Parking lot in front of Delta Gamma'],
	['Bingham',41.502598,-81.607188,'Sidewalk in front of building in the middle of the quad'],
	['Bio Enterprise',41.498884,-81.608032,'Adjacent parking lot'],
	['Biomedical Research Building',41.504671,-81.604844,'Sidewalk in front of BRB between Wood and UH'],
	['Carlton Commons',41.500102,-81.601485,'Rear parking lot'],
	['Carriage House (behind Phi Mu)',41.511365,-81.604572,'In front of building'],
	['Carriage House (Security)',41.511861,-81.60586,'Adjacent parking lot'],
	['CCSB & Wright Fuel Cell',41.509648,-81.61836,'Adjacent parking lot'],
	['Cedar Avenue Service Center',41.499025,-81.61299,'Parking lot in front of building'],
	['Clapp Hall',41.503919,-81.606357,'Sidewalk in front of building'],
	['Clark Hall',41.509141,-81.607724,'Sidewalk in front of building'],
	['Clarke Tower',41.514439,-81.605831,'In front of building near pavilion'],
	['Cleveland Hearing and Speech',41.511654,-81.602881,'Rear parking lot'],
	['Coffee House',41.511379,-81.607059,'Rear parking lot'],
	['Crawford',41.504435,-81.609432,'Sidewalk in front of building quad side'],
	['Cutler House',41.513761,-81.605233,'Courtyard near Storrs'],
	['Cutter House',41.512167,-81.607623,'Tree in front of Cutter & Smith near the street'],
	['Degrace Hall',41.504525,-81.607398,'Adjacent parking lot'],
	['Delta Gamma',41.502329,-81.601647,'In front of Beta Theta Pi'],
	['Delta Sigma Delta',41.511177,-81.605969,'Sidewalk in front of building (Bellflower Rd.)'],
	['Delta Tau Delta',41.51402,-81.606879,'Sidewalk in front of building'],
	['Delta Upsilon/Phi Kappa Psi',41.501653,-81.600615,'In front of Phi Kappa Tau'],
	['Dennys',41.511836,-81.605859,'Adjacent parking lot'],
	['Dental School (All other floors)',41.505267,-81.603658,'Sidewalk in front of building old ER Drive'],
	['Dental School (Podium Level)',41.505353,-81.602713,'Sidewalk corner of Cornell Rd. and Circle Dr.'],
	['Dively Building',41.510478,-81.606291,'Adjacent parking lot'],
	['Eldred Theatre',41.504077,-81.608257,'Sidewalk rear of building quad side'],
	['Fairchild House (11414 Fairchild Road)',41.50092,-81.60408,'Sidewalk in front of building'],
	['Fayette House',41.5016649,-81.6021161,'the parking area of the Greek Life houses on the East side'],
	['Fribley Commons',41.500939,-81.60238,'Adjacent drive way near Tippit/Howe'],
	['Glaser House',41.500364,-81.600604,'Rear parking lot'],
	['Glennan (front)',41.501901,-81.606934,'Sidewalk in front of building quad side'],
	['Glennan (rear)',41.501552,-81.60762,'Rear parking lot'],
	['Glidden House',41.510874,-81.608049,'Side walk in front of building'],
	['Guilford House',41.508822,-81.608056,'Sidewalk in front of building near fountain'],
	['Gund Law School',41.510989,-81.608584,'Sidewalk in front of building East Blvd side'],
	['Harcourt House',41.500283,-81.598123,'Adjacent parking lot'],
	['Harkness Chapel',41.509238,-81.607715,'Sidewalk adjacent to building near Clark'],
	['Haydn Hall',41.508905,-81.607698,'Sidewalk in front of building'],
	['Health Services',41.50353,-81.604803,'Sidewalk in rear of building'],
	['Hitchcock House',41.514051,-81.60532,'Courtyard near Cutler'],
	['Howe House',41.500951,-81.602395,'In front of the building near Fribley Commons'],
	['ITS Care Center 11424 Bellflower',41.511603,-81.605073,'Sidewalk in front of building'],
	['Kappa Alpha Theta/Sigma Psi',41.502005,-81.600124,'Adjacent side parking lot'],
	['Kelvin Smith Library',41.5072,-81.609206,'In front of building oval'],
	['Kent Hale Smith',41.503559,-81.606251,'in front of building oval'],
	['Kusch House',41.500625,-81.600088,'Rear parking lot'],
	['L’Albatros',41.51169,-81.606083,'Adjacent parking lot'],
	['Leutner Commons',41.513453,-81.605555,'Sidewalk in front of building near Wade'],
	['Lot 29',41.507006,-81.609926,'Sidewalk in front of entrance off East Blvd'],
	['Lot 46',41.512484,-81.602909,'Sidewalk in front of entrance off E.117th'],
	['Lot 53',41.502697,-81.604652,'Sidewalk in front of entrance off Adelbert Rd'],
	['Lot 55',41.505513,-81.604453,'Sidewalk in front of entrance off old ER Drive'],
	['Maltz Center, MPAC, The Temple',41.507374,-81.616338,'Adjacent side parking lot'],
	['Mandel Center for Non-Profit Organizations',41.511163,-81.605278,'Adjacent parking lot'],
	['Mandel School of Applied Social Sciences',41.510845,-81.606858,'Adjacent parking lot'],
	['Mather Dance',41.508506,-81.608251,'Sidewalk in front of building near Haydn'],
	['Mather House',41.508076,-81.607768,'Sidewalk in front of building near Church of Covenant'],
	['Mather Memorial',41.509795,-81.60746,'Sidewalk in rear of building Mather Quad'],
	['Michelson House',41.500268,-81.60093,'Rear parking lot'],
	['Millis Science Center',41.504525,-81.607398,'Parking lot in front of building'],
	['Mt. Sinai Garage',41.510089,-81.617492,'Adjacent parking lot'],
	['Nord Hall (front)',41.502775,-81.607668,'Sidewalk in front of building quad side'],
	['Nord Hall (rear)',41.502289,-81.608313,'Rear parking lot'],
	['Norton',41.513014,-81.605926,'In front of Tyler'],
	['Noyes House',41.5019794,-81.6021927,'the common area of the South Residential Village Low rises just West of Fribley'],
	['NRV House 1',41.512419,-81.603379,'Courtyard between House 1 & 3'],
	['NRV House 2',41.512419,-81.603379,'Courtyard between House 1 & 3'],
	['NRV House 3',41.512419,-81.603379,'Courtyard between House 1 & 3'],
	['NRV House 3A',41.512855,-81.60413,'Rear courtyard near football field'],
	['NRV House 4',41.512855,-81.60413,'Rear courtyard near football field'],
	['NRV House 5',41.513504,-81.604212,'Rear courtyard near football field'],
	['NRV House 6 & 7',41.514229,-81.604161,'Rear courtyard near football field'],
	['Nursing School (all other floors)',41.505571,-81.604338,'Sidewalk in front of building old ER Drive'],
	['Nursing School (Podium Level)',41.50533,-81.603576,'Outside main podium entrance by white statue'],
	['Olin (front)',41.502484,-81.607509,'Sidewalk in front of building quad side'],
	['Olin (rear)',41.502006,-81.608061,'Rear parking lot'],
	['Overlook House',41.503536,-81.598458,'Sidewalk in front of building'],
	['Pathology',41.504739,-81.606706,'Sidewalk in front of building by UH'],
	['Peter B. Lewis',41.510113,-81.607397,'Sidewalk in front of building, Ford Drive and Bellflower Road intersection'],
	['Phi Delta Theta',41.502682,-81.601382,'Parking lot in front of the building near Beta Theta Pi'],
	['Phi Gamma Delta',41.510791,-81.606455,'Sidewalk in front of building'],
	['Alpha Gamma Delta/Sigma Chi',41.501181,-81.60059,'Side parking lot'],
	['Phi Kappa Psi',41.501481,-81.600773,'In front of Kappa Alpha Theta'],
	['Phi Kappa Theta',41.514145,-81.609407,'Sidewalk in front of building'],
	['Phi Mu',41.511482,-81.605219,'Sidewalk in front of the building'],
	['Phi Sigma Rho (Scholar’s House)',41.501229,-81.600937,'Adjacent side parking lot'],
	['Pierce House',41.513929,-81.60581,'In front of Storrs'],
	['Police HQ (American Heart)',41.511769,-81.604109,'Adjacent parking lot'],
	['Raymond House',41.512662,-81.605563,'In front of Sherman'],
	['Recovery House (2272 Murray Hill) PMA',41.502224,-81.602486,'Sidewalk in front of the building'],
	['Research Tower',41.504155,-81.604425,'Sidewalk in courtyard of Wood/Sears Tower'],
	['Richey Mixon, ThinkBox, Lincoln Storage',41.500475,-81.606033,'Adjacent parking lot-Lot 07'],
	['Robbins/Sears Tower',41.504155,-81.604335,'Sidewalk in courtyard of Wood/Sears Tower'],
	['Robbins/Sears Tower',41.504596,-81.604201,'Podium in front of Robbins'],
	['Rockefeller',41.503503,-81.608048,'Sidewalk in front of building quad side'],
	['Sears Building/Library (front)',41.502995,-81.607942,'Sidewalk in front of building quad side'],
	['Sears Building/Library (rear)',41.502533,-81.608577,'Rear parking lot'],
	['Service Building (front)',41.503725,-81.603821,'Adjacent side parking lot at end of dock ramp (Lot 26)'],
	['Service Building (rear)',41.50428,-81.603589,'Podium Level behind Robbins'],
	['Sherman House',41.512983,-81.605596,'In front of Norton'],
	['Sigma Alpha Epsilon',41.514426,-81.608793,'Sidewalk in front of building'],
	['Sigma Nu',41.50269,-81.601247,'Parking lot in front of Phi Delta Theta'],
	['Smith House',41.512041,-81.607488,'Tree in front of Cutter & Smith near the street'],
	['Staley House',41.500371,-81.602732,'Courtyard in front of Tippit'],
	['Stephanie Tubbs Jones (NRV 8)',41.515011,-81.605062,'Area in front of main entrance'],
	['Stone Commons',41.513042,-81.607708,'Rear parking lot'],
	['Storrs House',41.513922,-81.605784,'Courtyard near Pierce'],
	['Strosacker',41.503161,-81.607602,'Sidewalk in front of building quad side'],
	['Taft House',41.512828,-81.606908,'Light pole in front of Taplin'],
	['Taplin House',41.512828,-81.606908,'Light pole in front of Taplin'],
	['The Noble',41.511636,-81.603455,'Sidewalk in front of the building'],
	['Theta Chi',41.513692,-81.606661,'Light pole in front of building'],
	['Thwing Center',41.507097,-81.608047,'Sidewalk in front of building Euclid Ave side'],
	['Tinkham Veale University Center (TVUC), North',41.508633,-81.608872,'North side of building Bellflower sidewalk'],
	['Tinkham Veale University Center (TVUC), South',41.507141,-81.609069,'South side of building KSL Oval'],
	['Tippit house',41.500371,-81.602732,'Courtyard in front of building'],
	['Tomlinson (front)',41.504248,-81.609426,'Sidewalk in front of building quad side'],
	['Tomlinson (rear)',41.50389,-81.609866,'Rear parking lot'],
	['Triangle 1',41.509362,-81.60321,'Adjacent parking lot'],
	['Triangle 2',41.509362,-81.60321,'Adjacent parking lot'],
	['Triangle Parking Garage',41.509362,-81.60321,'Adjacent parking lot'],
	['Twin Gables',41.511425,-81.604283,'Sidewalk in front of building'],
	['Tyler House',41.514213,-81.605707,'In front of Norton'],
	['Veale Center',41.501291,-81.606507,'Sidewalk in front of building'],
	['Wade Commons/Denison Hall',41.513024,-81.605615,'In front of Norton'],
	['Wade Park House/Manor (11420 Wade Park)',41.51582,-81.604918,'Sidewalk in front of building'],
	['White (front)',41.502173,-81.607318,'Sidewalk in front of building quad side'],
	['White (rear)',41.501946,-81.607865,'Rear parking lot'],
	['Wickenden (front)',41.503293,-81.608227,'Sidewalk in front of building quad side'],
	['Wickenden (rear)',41.50286,-81.608788,'Rear parking lot'],
	['Wolstein Hall',41.510871,-81.606063,'Sidewalk in front of building'],
	['Wolstein Research (WRB), Front',41.505991,-81.602868,'Corner of Cornell Rd and Circle Dr'],
	['Wolstein Research (WRB), Rear',41.507301,-81.602563,'Rear parking lot'],
	['Wyant Athletic and Wellness Center, Front',41.514200,-81.603020,'Area in front of main entrance'],
	['Wood',41.504397,-81.605098,'Sidewalk in front of building between Wood and UH'],
	['Yost Hall',41.50371,-81.60885,'Sidewalk in front of building quad side'],
	['Zeta Beta Tau',41.513853,-81.607615,'Rear parking lot'],
	['Tri Sigma',41.502113,-81.600307,'Adjacent side parking lot'],
];

var map;
var markers = [];
var selectedIndex = -1;



function getIndex(name) {
	for (var i = 0; i < places.length; i++) {
		if (places[i][0] == name) {
			return i;
		}
	}
}

window.selectBuilding = function() {
	if (selectedIndex >= 0) markers[selectedIndex].setIcon();
	var x = document.getElementById('buildingList').value;
	selectedIndex = getIndex(x);
	var place = places[selectedIndex];
	map.panTo({lat: place[1], lng: place[2]});
	if (place[0] == 'Reset Map') {
		map.setZoom(15);
	} else {
		map.setZoom(17);
	}

	markers[selectedIndex].setIcon('https://dudbm6bcnmy8e.cloudfront.net/cwru-drupal-assets/images/circle.png');

	if (place[0] == 'Reset Map') {
		var txt = place[3];
		markers[selectedIndex].setIcon('');
	} else {
		var txt = 'Evacuation point for ' + place[0] + ': ' + place[3] + '.';
	}

	var leg = document.getElementById('legend');

	var newTxt = document.createTextNode(txt);

	leg.replaceChild(newTxt, leg.firstChild);
	if (typeof place[4] !== 'undefined') {
		var a = document.createElement('a');
		var linkText = document.createTextNode('Evacuation plan');
		a.appendChild(linkText);
		//a.title = "my title text";
		a.href = 'http://onsite-server.case.edu/' + place[4];
		leg.appendChild(document.createTextNode(' '));
		leg.appendChild(a);
	}
}

function addOption(txt) {
	var list = document.getElementById('buildingList');
	var newOpt = document.createElement('option');
	var newTxt = document.createTextNode(txt);
	newOpt.appendChild(newTxt);
	list.appendChild(newOpt);
}

function initialize() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {lat: 41.508, lng: -81.608},
		scrollwheel:  false
	});

	for (var i = 0; i < places.length; i++) {
		var place = places[i];
		var marker = new google.maps.Marker({
			map: map,
			position: {lat: place[1], lng: place[2]},
			title: 'Evacuation point for ' + place[0] + ': ' + place[3] + '.'
		});
		markers.push(marker);
		addOption(place[0]);
	}
}
$(document).ready(function() {
	initialize();
});
})(jQuery);

let patches = [ 
	1, 2, 3, 4, 5, 7, 8, 9, 10, 
	11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
	21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
	31, 32, 33 
];

const tinyPatch = 6;

let patches_selected = new Array();

let selected = false;

main();

function main(){
	patches = shuffle(patches);
	patches.push(tinyPatch);
	drawSetup();	
}



function drawSetup(){
	let setup = "";
	let isSelectionDrawed = false;
	let count_get_button = 0;

	for(i in patches){
		if(count_get_button > 2){
			setup += "<div class='gap'><img id='" + patches[i] + "' src='img/" + patches[i] + ".png' /></div>";
		}else{
			setup += "<div class='gap'><img id='" + patches[i] + "' onclick='getPatch(this)' src='img/" + patches[i] + ".png' /></div>";
		}

		count_get_button++;

		if((i+1) % 3 === 0){
			if(!isSelectionDrawed){
				isSelectionDrawed = true;
			}
		}
	}

	$('#patches').html(setup);
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getPatch(element){
	if(selected){
		$(selected).css({ opacity: 100 });
	}

	selected = element;

	$(element).css({ opacity: 0.25 });
}

function pass(){
	if(selected){
		patches_selected.push(selected.id);

		let kill_id = -1;

		for(x in patches){
			if(patches[x] == selected.id){
				kill_id = x;
			}
		}

		if(kill_id > -1){
			for(i = 0; i < kill_id; i++){
				// llevamos el elemento uno o dos al final de los parches
				patches.push(patches[i]);
				delete patches[i];
			}

			delete patches[kill_id];
		}

		selected = false;
	}else{
		alert("Selecciona un parche");
	}

	fixSort();
	drawSetup();
}

function fixSort(){
	let new_patches = [];

	for(x in patches){
		new_patches.push(patches[x])
	}

	patches = [];
	patches = new_patches;
}

window.onbeforeunload = () => {
	return "Refresh";
}
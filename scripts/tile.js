$(document).ready(function () {

    $('#StartGameModal').modal('show');

});

var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var score = 0;
var level = 1;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard(){
	document.getElementById('match_found').innerHTML = " ";
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
	document.getElementById('level').innerHTML = "LEVEL: " +level;
	document.getElementById('score').innerHTML = "SCORE: " +score;
}


function memoryFlipTile(tile,val){
	
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			var tile_1 = document.getElementById(memory_tile_ids[0]);
			tile_1.classList.add('flip');

		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			var tile_2 = document.getElementById(memory_tile_ids[1]);
			tile_2.classList.add('flip');

			if(memory_values[0] == memory_values[1]){
				var tile_1 = document.getElementById(memory_tile_ids[0]);
				var tile_2 = document.getElementById(memory_tile_ids[1]);
				tile_1.classList.add('animate');
				tile_2.classList.add('animate');
				tile_1.style.opacity = '0';
				tile_2.style.opacity = '0';
				score += 10;
			    document.getElementById('score').innerHTML = "SCORE: " +score;
			    document.getElementById('match_found').innerHTML = "Match Found";
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					level+= 1;
					score = 0;
					$('#newGameModal').modal('show');
				     document.getElementById
					document.getElementById('memory_board').innerHTML = "";

				    
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(images/image1.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(images/image1.jpg) no-repeat';
            	    tile_2.innerHTML = "";
            	    document.getElementById('match_found').innerHTML = "Match Not Found";
            	    tile_1.classList.remove('flip');
            	    tile_2.classList.remove('flip');
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
				

			}
		}
	}
}

function newGame () {
	newBoard();
}


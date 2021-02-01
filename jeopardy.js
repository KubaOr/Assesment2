
setupAndStart(); //load game
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


async function getData() {
    let cat = [];
    let idCount = [];
    let temp_id;
    let j=0;
    let clueIdCount = [];
    let tempClues = [];
    let maxInt = 18200;
    let count = 0;
    while (count < 6) {
        id = getRandomInt(maxInt);
        if (idCount.includes(id) || id === 0) {
            continue;
        }
        idCount.push(id);
        let temp = await axios.get('https://jservice.io/api/category/?id=' + id);
        if (temp.data.clues.length > 5) {
            j = 0;
            clueIdCount = [];
            tempClues = [];
            let strTemp = temp.data.title;
            //
            let temp_length = temp.data.clues.length;
            while (j<5){
                temp_id = getRandomInt(temp_length);
                clueIdCount.push(temp_id);
                tempClues.push({ 'question': temp.data.clues[temp_id]['question'], 'answer': temp.data.clues[temp_id]['answer'], 'state': 0 });
                temp.data.clues.splice(temp_id, 1);
                temp_length--;
                j++;
            }
            //
            let tempObj = { 'title': strTemp, 'clues': tempClues, };
            cat.push(tempObj);
            count++;
        }
        else {
            j = 0;
            tempClues = [];
            let strTemp = temp.data.title;
            //
            while (j < 5) {
                tempClues.push({'question': temp.data.clues[j]['question'], 'answer': temp.data.clues[j]['answer'], 'state': 0 });
                j++;
            }
            //
            let tempObj = { 'title': strTemp, 'clues': tempClues };
            cat.push(tempObj);
            count++;
        }
    }
    return cat;
}
async function getCategoryIds() {
    categories = await getData();
    console.log(categories);
}


async function setupAndStart() {
    categories = [];
    await getCategoryIds();
    const tableHeads = document.getElementsByTagName('th');
    const tableElements = document.getElementsByTagName('td');
    console.log(tableHeads);
    for (i = 0; i < 6; i++){
        tableHeads[i].textContent = categories[i]['title'];
    }
    for (i = 0; i < 30; i++){
        tableElements[i].textContent = '?';
    }
    $('#myTable').show();
    let tableBody = document.getElementsByTagName('tbody');
    $('#myTable tbody tr td').click(function () {
        let currentRow = $(this).parent().index();
        let currentCol = $(this).index();
        let state = categories[currentCol].clues[currentRow].state;
        if (state < 2) {
            if (state === 0) {
                tableBody[0].children[currentRow].children[currentCol].textContent = categories[currentCol].clues[currentRow]['question'];
            }
            else if (state === 1) {
                tableBody[0].children[currentRow].children[currentCol].textContent = categories[currentCol].clues[currentRow]['answer'];
            }
            categories[currentCol].clues[currentRow].state++;
        }
    });
    ////
    const myBtn = document.getElementById('restart');
    myBtn.addEventListener("click", function () {
        $('#myTable tbody tr td').off('click');
        categories = [];
        console.log(categories);
        setupAndStart();
        console.log("You just clicked the h1 element!");
      })


}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
/**
 * Created by Brendan on 3/17/2018.
 */
$(document).ready(function(){
    //Used to check/set various element states
    initPassage();

    //Auto-hide pip on page change
    $('.pipContainer').animate({
        height: 'toggle'
    },1);
    //Auto-hide inventory on page change
    $(".itemList").toggle();
    //Populate inventory list with array on page load
    var temp = JSON.parse(localStorage.items);
    for(var i=0; i< temp.length; i++){
     $('.itemList').append('<li class="item green-text">'+temp[i]+'</li>');
     }
    //Hacky way to hide pip on page load (otherwise it flashes before disappearing)
    setTimeout(function () {
        $('.pipContainer').css("bottom", "0px");
    },100);
});
$('.togglePip').click(function() {
    togglePip();
});
//Hide/show 'Scan' button on 'object of interest' hover
$('.togglePip').hover(function(){
    $(".scanBtn", this).toggle();
});
//For 'close' button on pip
$('.closePip').click(function(){
    togglePip();
});
//Hide/show inventory list on button click
$('.itemToggle').click(function(){
    $(".itemList").toggle();
});
 /*
 Next few functions handle player actions (i.e. pick up polar bear head)
 They each push the item to the items array, flip a state flag, hide pip on click, and show the inventory list with new item to let player know they did something right.
 */
$('.addPolar').click(function(){
    addItem("Polar Bear Head");
    localStorage.setItem("hasHead", "true");
    $(this).toggle();
    togglePip();
});
$('.addUrn').click(function(){
    addItem('Art Coke "Urn"');
    localStorage.setItem("hasUrn", "true");
    $(this).toggle();
    togglePip();
});
$('.addBev').click(function(){
    addItem('Burial Urn with Beverly');
    localStorage.setItem("hasBev", "true");
    $(this).toggle();
    togglePip();
});

//Popping an alert seemed like the easiest thing to do with
$('#hist').click(function () {
   alert('Your curiosity almost gets the best of you to check out the historical archives before you remember why you’re there. You’re a treasure hunter, not a professor at some stuffy university!');
});
$('#walkway').click(function () {
    visitWW();
});
//Both code + eye scan are necessary to open vault door. I check each time to see if both state variables are true.
$('.enterCode').click(function () {
    localStorage.setItem("code", "true");
    $(this).toggle();
    checkDoor();
});
$('.useEye').click(function () {
    localStorage.setItem("eyeScan", "true");
    $(this).toggle();
    checkDoor();
});

$('.ropeSwing').click(function () {
    localStorage.setItem("swing", "true");
    $(this).toggle();
});

/* Run at each new page load to check for states. I hide or show buttons based on things the user has or hasn't done.
*  Examples:
*   If user has picked up certain items, I don't show those pick-up action buttons in the pip.
*   If the user has not done something (like pick up the Urn), I hide dependent actions (like use Urn to collect Beverly).
* */
function initPassage(){
    if(localStorage.hasHead == "true" && $('.addPolar').length){
        $('.addPolar').hide();
    }
    if(localStorage.hasUrn == "true" && $('.addUrn').length){
        $('.addUrn').hide();
    }
    if(localStorage.hasUrn == "false" && $('.addBev').length){
        $('.addBev').hide();
    }
    if(localStorage.hasBev == "true" && $('#lobby2DT').length){
        $('#lobby2DT').html("There are three paths before you, an entrance on the south wall leading to some kind of historical archive, a doorway on the north wall that leads to an unknown location, <b>and the empty space where a walkway once was. It seems a little cliche to you for some reason, but you could probably swing across with your trusty rope.</b>");
    }
    if(localStorage.hasBev == "false" && $('#walkway').length){
        $('#walkway').hide();
    }
    if(localStorage.hasBev == "true"){
        visitWW();
    }
    if(localStorage.unlockDoor == "true" && $('#vaultDoor').length){
        $('#vaultDoor').hide();
    }
    if(localStorage.hasHead == "false" && $('.useEye').length){
        $('.useEye').hide();
    }
}

//If the user enters the code and scans the eye, then they have unlocked the vault door. I add a new button to allow them to progress to the vault room and remove the "Locked Vault Room Door" button
function checkDoor() {
    if(localStorage.code == "true" && localStorage.eyeScan == "true"){
        localStorage.setItem("unlockDoor", "true");
        $('.nav > ul').append('<li><a href="vaultRoom.html" class="white-text btn custom" id="vaultDoor">Unlocked Vault Room Door</a></li>');
        $('#vaultDoor').hide();
    }
}
function visitWW(){
    localStorage.setItem("visitedWalkway", "true");
}
function togglePip(){
    $('.pipContainer').animate({
        height: 'toggle'
    });
}

/*Adds new item to 'items' array
* Instantiates new <li> to inventory list
* I replace 'Art Coke Urn' with 'Burial Urn with Beverly' since they are the same item technically
* */
function addItem(i){
    var temp = JSON.parse(localStorage.items);
    if(i === "Burial Urn with Beverly"){
        var index = temp.indexOf('Art Coke "Urn"');
        temp.splice(index, 1);
    }
    temp.push(i);
    localStorage.setItem("items", JSON.stringify(temp));
    $('.itemList').append('<li class="item green-text">'+i+'</li>');
    $(".itemList").toggle();
    console.log(JSON.parse(localStorage.items));
}
function resetAll(){
    localStorage.clear();
}
// function swapText() {
//     $('.pipTitle').html('Crumbling Walkway');
//     $('.pipText').html('Looks like this walkway has crumbled away. You might need to find an alternative solution to cross it.');
//     $('.ropeSwing').show();
//     $('.ropeText').show();
//     $('.rightCol').hide();
//     $('.leftCol').hide();
//     $('.addUrn').hide();
// }
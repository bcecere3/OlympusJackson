/**
 * Created by Brendan on 3/17/2018.
 */


var hasHead = false;
$(document).ready(function(){

    initPassage();
    console.log(JSON.parse(localStorage.items));
    $('.pipContainer').animate({
        height: 'toggle'
    },1);
    $(".itemList").toggle();
    var temp = JSON.parse(localStorage.items);
    for(var i=0; i< temp.length; i++){
     $('.itemList').append('<li class="item green-text">'+temp[i]+'</li>');
     }
    setTimeout(function () {
        $('.pipContainer').css("bottom", "0px");
    },100);
});
$('.togglePip').click(function() {
    togglePip();
});
$('.togglePip').hover(function(){
    $(".scanBtn", this).toggle();
});
$('.closePip').click(function(){
    togglePip();
    //$(".itemList").toggle();
});
$('.link-internal').click(function(){
    togglePip();
    console.log(JSON.parse(localStorage.items));
});
$('.itemToggle').click(function(){
    $(".itemList").toggle();
});
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
$('#hist').click(function () {
   alert('Your curiosity almost gets the best of you to check out the historical archives before you remember why you’re there. You’re a treasure hunter, not a professor at some stuffy university!');
});
$('#walkway').click(function () {
    visitWW();
});

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
function initPassage(){
    console.log(localStorage.hasHead);
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
function swapText() {
    $('.pipTitle').html('Crumbling Walkway');
    $('.pipText').html('Looks like this walkway has crumbled away. You might need to find an alternative solution to cross it.');
    $('.ropeSwing').show();
    $('.ropeText').show();
    $('.rightCol').hide();
    $('.leftCol').hide();
    $('.addUrn').hide();
}
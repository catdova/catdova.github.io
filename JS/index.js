$('.ii').click(function(){
	$('.ii-container').slideToggle();
});

$('.i').click(function(){
	$('.i-container').slideToggle();
});

$('.lyriccitation1').click(displayNoteOne);

$('#citation1').click(displayNoteOne);

$('#bottompic').click(function(){
	$(this).hide(600);
	$('#bottompic2').show();
})

$('#bottompic2').click(function(){
	$(this).hide(600);
	$('#bottompic').show();
})

function displayNoteOne (){
	event.preventDefault();
	$('.note1').slideToggle();
};


$('.lyriccitation').click(function(){
	displayNote ($(this).data("citation"));
});


function displayNote(noteNumber){
	event.preventDefault();
	$(noteNumber).slideToggle();
}

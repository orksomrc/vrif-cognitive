Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{

	var messageText = 'Starting Number Memory Task Now';
	var time = 15000; //time in milliseconds
	var c = this.questionContainer; //make the container
    var tc = QBuilder('span',{},messageText); //make the span that will hold the text
	jQuery(tc).css({'color':'red','fontSize':'24pt','paddingLeft':'100px','display':'none'}); //style the span
    var ic = QBuilder('div',{},[tc]); //make the Div holding the span
    jQuery(c).append(ic); // append the div to the container
 	
   // function below to make the span  appear after a few seconds	
	(function(){
		
 		jQuery(tc).show();
 	
	}).delay(time/1000);
	
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
//disable the text field in the beginning
var qidstr = this.questionId;
var responseTextField = document.getElementById('QR~' + qidstr);
responseTextField.setAttribute("type","number");
responseTextField.disabled = true;


//create the div that holds the number
var c = this.questionContainer;
var newDiv = document.createElement('div');
	jQuery(newDiv).css({"width":"300px","height":"100px","padding-left":"1.5em"}).attr("id","newDiv");
//append the div to the container
jQuery(c).append(newDiv);

});

Qualtrics.SurveyEngine.addOnReady(function()
{

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
	
//get question ID
var qidstr = this.questionId;
var responseTextField = document.getElementById('QR~' + qidstr);

//create the number	
var minuend = getRandom(100, 999)
var subtrahend = getRandom(5,9) 
var result = minuend - subtrahend
//set an embedded field that records the randomly generated number
Qualtrics.SurveyEngine.setEmbeddedData('qs4_minuend', minuend)                              
Qualtrics.SurveyEngine.setEmbeddedData('qs4_subtrahend', subtrahend)
Qualtrics.SurveyEngine.setEmbeddedData('qs4_result', result)
//make number into string of individual letters
var minuendArr = [],
sMinuend = minuend.toString();
sSubtrahend = subtrahend.toString();

for (var i = 0, len = sMinuend.length; i < len; i += 1) {
    minuendArr.push(+sMinuend.charAt(i));
}
	

	
var time = 2000; //time in milliseconds after which number block disappears

	// //the for loop creates the spans necessary to hold the random numbers
	// for (var i = 0, len = minuendArr.length; i < len; i +=1){
	// 	var tc = document.createElement('span');
	// 	jQuery(tc).attr("id", "span"+i);
	// 	jQuery(tc).append(minuendArr[i]);
	// 	jQuery(tc).append(" ");
	// 	jQuery(tc).css({"color":"red","fontSize":"24pt","display":"none"});
	// 	jQuery("#newDiv").append(tc);		
	// }

var minuendSpan = document.createElement('span');
	jQuery(minuendSpan).append(sMinuend).css({"color":"red","fontSize":"24pt","display":"none"}).attr("id","minuendSpan");
	jQuery("#newDiv").append(minuendSpan);

var underSpan = document.createElement('span');
	jQuery(underSpan).append(" - ").css({"color":"red","fontSize":"24pt","display":"none"}).attr("id","underspan");
	jQuery("#newDiv").append(underSpan);

var subtrahendSpan = document.createElement('span');
	jQuery(subtrahendSpan).append(sSubtrahend).css({"color":"red","fontSize":"24pt","display":"none"}).attr("id","subtrahendSpan");
	jQuery("#newDiv").append(subtrahendSpan);

var questionSpan = document.createElement('span');
	jQuery(questionSpan).append(" = &quest;").css({"color":"red","fontSize":"24pt","display":"none","font-weight":"bold"}).attr("id","questionSpan");
	jQuery("#newDiv").append(questionSpan);

	//separate fade in functions needed due to the different nature of jQuery executing within Qualtrics. It doesn't allow
	// delay functions to be executed inline
	
	(function(){
			jQuery("#minuendSpan").fadeIn();
			jQuery("#underspan").fadeIn();
			jQuery("#subtrahendSpan").fadeIn();
			jQuery("#questionSpan").fadeIn();
	}).delay(0.5);
	/*
	//more optimized code
	
	jQuery( "span" ).each(function( index ) {
		jQuery(this).text().fadeIn();
	}).delay(index +1);
	*/
	
	
	(function(){
	responseTextField.disabled = false;
	jQuery(responseTextField).focus();
	
 }).delay(time/1000);

});

Qualtrics.SurveyEngine.addOnUnload(function()
{


});

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	var qidstr = this.questionId;

var responseTextField = document.getElementById('QR~' + qidstr);
var currentResponse = responseTextField.value;

/* console log to see what was captured */
console.log('response text entry 1 is: ' + currentResponse)

/* Assign response to ED */
/* The following line creates (if it doesn't exist) or set (if already exist) an embedded data value */
Qualtrics.SurveyEngine.setEmbeddedData('ed_field_name', currentResponse)                              

/* get the randomly generated number */

var result = Qualtrics.SurveyEngine.getEmbeddedData('qs4_result')


/*check if the number variable is the same as the currentResponse variable*/
if(currentResponse == result)
{
	Qualtrics.SurveyEngine.setEmbeddedData('qs4_answer',1)
	console.log('result of the question is True')
}
else 
{
	Qualtrics.SurveyEngine.setEmbeddedData('qs4_answer',0)
	console.log('result of the question is False')
}

});
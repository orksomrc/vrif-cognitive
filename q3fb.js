Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
//disable the text field in the beginning
var qidstr = this.questionId;
var responseTextField = document.getElementById('QR~' + qidstr)
responseTextField.setAttribute("type","number");;
responseTextField.disabled = true;


//create the div that holds the number
var c = this.questionContainer;
var newDiv = document.createElement('div');
	jQuery(newDiv).css({"width":"100px","height":"100px","padding-left":"1.5em"}).attr("id","newDiv");
//append the div to the container
jQuery(c).append(newDiv);

});

Qualtrics.SurveyEngine.addOnReady(function()
{

	
//get question ID
var qidstr = this.questionId;
var responseTextField = document.getElementById('QR~' + qidstr);
//create the number	
var number = Math.floor((Math.random() * (999 - 101) + 101))

//set an embedded field that records the randomly generated number
Qualtrics.SurveyEngine.setEmbeddedData('q3fb_number', number)                              

//make number into string of individual letters
var outputArr = [],
sNumber = number.toString();

for (var i = 0, len = sNumber.length; i < len; i += 1) {
    outputArr.push(+sNumber.charAt(i));
}
	
var underSpan = document.createElement('span');
	jQuery(underSpan).append("_ _ _ ").css({"color":"red","fontSize":"24pt","display":"none"}).attr("id","underspan");
	jQuery("#newDiv").append(underSpan);
	
//The following code was shifted up to addOnLoad()	
//var c = this.questionContainer;
//var newDiv = document.createElement('div');
//jQuery(newDiv).css({"width":"100px","height":"100px"});
//append the div to the container
//jQuery(c).append(newDiv);
	
var time = 3000; //time in milliseconds after which number block disappears

	//the for loop creates the spans necessary to hold the random numbers
	for (var i =0, len = outputArr.length; i < len; i +=1){
		var tc = document.createElement('span');
		jQuery(tc).attr("id", "span"+i);
		jQuery(tc).append(outputArr[i]);
		jQuery(tc).append(" ");
		jQuery(tc).css({"color":"red","fontSize":"24pt","display":"none"});
		jQuery("#newDiv").append(tc);		
	}



	//separate fade in functions needed due to the different nature of jQuery executing within Qualtrics. It doesn't allow
	// delay functions to be executed inline
	(function(){
			jQuery("#span0").fadeIn();
	}).delay(0);
	(function(){
			jQuery("#span1").fadeIn();
	}).delay(1);
	(function(){
			jQuery("#span2").fadeIn();
	}).delay(2);
	
	/*
	//more optimized code
	
	jQuery( "span" ).each(function( index ) {
		jQuery(this).text().fadeIn();
	}).delay(index +1);
	*/
	
	
	(function(){
	 jQuery("#span0").hide();
	 jQuery("#span1").hide();
	 jQuery("#span2").hide();
	 jQuery("#underspan").show();
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
var randNumber = Qualtrics.SurveyEngine.getEmbeddedData('q3fb_number')                              

/*check if the number variable is the same as the currentResponse variable*/
if(currentResponse == randNumber)
{
	Qualtrics.SurveyEngine.setEmbeddedData('q3fb_answer',1)
	console.log('result of the question is True')
}
else 
{
	Qualtrics.SurveyEngine.setEmbeddedData('q3fb_answer',0)
	console.log('result of the question is False')
}

});
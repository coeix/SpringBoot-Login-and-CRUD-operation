var text = "";
$(document).ready(function() {
	// --------- Session Retrieve -------------
	text = sessionStorage.getItem("userLogged");
	obj = JSON.parse(text);
	//alert("User Logged: " + obj.name + " " + obj.surname);
	$("#idLogged").text(obj.id);
	$("#nameLogged").text(obj.name);
	$("#surnameLogged").text(obj.surname);
	$("#birthDateLogged").text(obj.birthDate);
	$("#emailLogged").text(obj.email);
	$("#passwordLogged").text(obj.password);
	
	// --------- Hide and Show function --------
	$("#hide").hide();
	$("#letMeSee").hide();
	$("#show").click(function(){
    	$("#letMeSee").show();
		$("#hide").show();
		$("#show").hide();
  	});
  	$("#hide").click(function(){
    	$("#letMeSee").hide();
		$("#hide").hide();
		$("#show").show();
  	});

	// --------- Toggle function ---------------
	$("#toggle").click(function(){
    	$("#toggled").toggle();
  	});
});
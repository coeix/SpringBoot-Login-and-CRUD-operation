<%@ page contentType="text/html" pageEncoding="UTF-8" isELIgnored="false"
	import="antlr.collections.List"
	import="java.util.ArrayList"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/ajaxProfile.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
		<style type="text/css">
     		<%@include file="css/style.css"%>
		</style>
		<title>Profile</title>
	</head>
	<body>
		<div class="page">
			<br/>
			<!-- ----------------------- Logout ------------------------- -->
			<p class="floatRight">
				<a href="#logout" onClick="logout()">Logout</a>
			</p>
			<!-- ----------------------- Welcome ------------------------ -->
			<p>
				<h2>Welcome <span id="nameLogged"/></span> <span id="surnameLogged"/></span></h2>
				<p>your email is: <span id="emailLogged"/></span></p>
			<p>
			<br/><br/>
			<!-- ---------------------- User Table ---------------------- -->
			<button id="show" onClick="findAllUser()">Show User Table</button>
			<button id="hide">Hide User Table</button>
			<div id="letMeSee">
				<br/>
				<table class="border">
					<tr class="border">
						<th>Id</th>
						<th>Name</th>
						<th>Surname</th>
						<th>Birth Date</th>
						<th>Email</th>
						<th>Password</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
					<tbody id="userTable">
					</tbody>
				</table>
				<br/><br/>
			</div>
			<!-- ------------------- end User Table --------------------- -->
		</div>
	</body>
</html>
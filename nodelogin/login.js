const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const { request } = require('http');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'new_user',
	password : 'password',
	database : 'nodelogin',
    port : 3306
});

const app = express();

// const EventEmitter = require('events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();



app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

	app.use(function(request, response, next) {
	  response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	  next();
	});


// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	response.header('Expires', '-1');
	response.header('Pragma', 'no-cache');
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	response.header('Expires', '-1');
	response.header('Pragma', 'no-cache');

	connection.changeUser({ database: 'nodelogin' }, function(err) {
		if (err) throw err;
		console.log('Switched to nodelogin');
	  });
	// Capture the input fields
	let sapid = request.body.sapid;
	let password = request.body.password;
	//const hash = bcrypt.hashSync("pass@123", 10);
	//console.log(hash);
	// Ensure the input fields exists and are not empty
	if (sapid && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE sapid = ?', [sapid], function(error, results, fields) {
			
			// If there is an issue with the query, output the error
			if (error) throw error;
			console.log(results)
			if(results[0]){
				console.log(results[0].password);
				//console.log(fields);
				var resulttt = bcrypt.compareSync(password, results[0].password);
				// If the account exists
				if (results.length > 0 && resulttt) {
					// Authenticate the user
					request.session.loggedin = true;
					request.session.sapid = sapid;
					request.session.namee = results[0].name;
					request.session.role = results[0].role;
					request.session.course = results[0].course;
					console.log(request.session.role);
					console.log(request.session.course);


					if (request.session.role=='S'){
						response.redirect('/home');
					}
					else{
						request.session.checkPoint1 = false;
						request.session.checkPoint1 = false;
						response.redirect('/teacher');
					}

					// response.redirect('/home');

					// Redirect to home page
				} else {
					//alert("Incorrect Credentials");
					response.redirect('/invalidCred');
				}		
			}
			else {
				//alert("Incorrect Credentials");
				response.redirect('/invalidCred');
				response.end();

			}	
			
					
			//response.end();
		});
	} else {
		response.send('Please enter Sapid and Password!');
		response.end();
	}
});

app.get('/redirect', function(request, response) {
	if (request.session.role=='S'){
		response.redirect('/home');
	}
	else{
		request.session.checkPoint1 = false;
		request.session.checkPoint1 = false;
		response.redirect('/teacher');
	}
});

app.get('/changePassword', function(request, response) {
	response.render('changePass.html');
});

app.get('/invalidCred', function(request, response) {
	response.render('invalidCred.html');
});

app.get('/noChange', function(request, response) {
	response.render('noChange.html');
});

app.get('/yesChange', function(request, response) {
	response.render('yesChange.html');
});

app.post('/submitNewPassword', function(request, response) {

	connection.changeUser({ database: 'nodelogin' }, function(err) {
		if (err) throw err;
		console.log('Switched to nodelogin');
	});

	let epass = request.body.epass;
	let npass1 = request.body.npass1;
	let npass2 = request.body.npass2;

	//const hash = bcrypt.hashSync("pass@123", 10);
	//console.log(hash);
	// Ensure the input fields exists and are not empty
	if (epass && npass1 && npass1 ===npass2) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE sapid = ?', [request.session.sapid], function(error, results, fields) {
			
			// If there is an issue with the query, output the error
			if (error) throw error;
			console.log(results[0].password);
			//console.log(fields);
			var resulttt = bcrypt.compareSync(epass, results[0].password);
			// If the account exists
			if (results.length > 0 && resulttt) {
				// Authenticate the user
				const hasher = bcrypt.hashSync(npass1, 10);
	            console.log(hasher);
				connection.query('UPDATE accounts SET password = ? WHERE sapid = ?', [hasher, request.session.sapid], function(error, results, fields) {
					if (error) throw error;
					response.redirect('/yesChange');

				});


				

				// response.redirect('/home');

				// Redirect to home page
			} else {
				
				response.redirect('/noChange');
			}			
			//response.end();
		});
	} else {
		
		response.redirect('/noChange');
	}
});

app.get('/api/studentList', function(request, response) {

	connection.changeUser({ database: request.session.course }, function(err) {
		if (err) throw err;
		console.log('Switched TTOO '+request.session.course);
	});

	connection.query('SELECT names.sapid,`name`,rollno  FROM enrollment NATURAL JOIN names WHERE shortForm =?;',[request.session.lecDetails.shortForm], (error, results, fields) => {
		if (error) {
            console.error(error);
            response.status(500).send('An error occurred. Please try again later.');
            return;
        }
		console.log(results);
		response.json(results);
	});
});


app.get('/api/subjectList', function(request, response) {

	connection.changeUser({ database: 'btce4' }, function(err) {
		if (err) throw err;
		console.log('Switched to btce4');
	});

	connection.query('SELECT shortForm,courseName FROM enrollment NATURAL JOIN courses WHERE sapid =?',[request.session.sapid], (error, results, fields) => {
		if (error) {
            console.error(error);
            response.status(500).send('An error occurred. Please try again later.');
            return;
        }
		console.log(results);
		response.json(results);
	});
});


app.get('/api/attendance', function(request, response) {

	connection.changeUser({ database: 'btce4' }, function(err) {
		if (err) throw err;
		console.log('Switched to btce4');
	});

	connection.query('SELECT * FROM records NATURAL JOIN courses WHERE sapid =?',[request.session.sapid], (error, results, fields) => {
		if (error) {
            console.error(error);
            response.status(500).send('An error occurred. Please try again later.');
            return;
        }
		console.log(results);
		response.json(results);
	});
});

app.get('/api/getBranchList', function(request, response) {

	connection.changeUser({ database: 'nodelogin' }, function(err) {
		if (err) throw err;
		console.log('Switched to nodelogin');
	});

	connection.query('SELECT * FROM teachers NATURAL JOIN branchNames WHERE sapid =?',[request.session.sapid], (error, results, fields) => {
		if (error) {
            console.error(error);
            response.status(500).send('An error occurred. Please try again later.');
            return;
        }
		console.log(results);
		response.json(results);
	});
});

app.get('/api/getLectureData', function(request, response) {

	connection.changeUser({ database: request.session.branchName.branchShortForm }, function(err) {
		if (err) throw err;
		console.log('Switched to '+request.session.branchName.branchShortForm);
	});
	const today = new Date().toISOString().slice(0, 10);
	console.log(today); // Output: "2022-01-01"


	connection.query('SELECT * FROM teachers NATURAL JOIN lectures NATURAL JOIN courses WHERE sapid =? and datee=?;',[request.session.sapid,today], (error, results, fields) => {
		if (error) {
            console.error(error);
            response.status(500).send('An error occurred. Please try again later.');
            return;
        }
		console.log(results);
		response.json(results);
	});
});


// http://localhost:3000/home
app.get('/home', function(request, response) {
	response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	response.header('Expires', '-1');
	response.header('Pragma', 'no-cache');
  
	if (request.session.loggedin && request.session.role==='S') {
		response.render('studentDashboard.ejs',{ sap: request.session.sapid, fullName: request.session.namee });
		response.end();
				
		  	
	} else {
		request.session.destroy();
		response.redirect('/');
	}
	
});

app.get('/report', function(request, response) {
	response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	response.header('Expires', '-1');
	response.header('Pragma', 'no-cache');
	  
	if (request.session.loggedin && request.session.role==='S') {
		
		response.render('studentReport.ejs',{ sap: request.session.sapid, fullName: request.session.namee });
		response.end();
		  	
	} else {
		request.session.destroy();
		response.redirect('/');

	}
	
});

app.get('/markAttendance', function(request, response) {
	response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	response.header('Expires', '-1');
	response.header('Pragma', 'no-cache');
	  
	if (request.session.loggedin && request.session.role==='T' && request.session.checkPoint2 === true) {
		
		response.render('markAttendance.ejs',{ coursee:request.session.lecDetails});
		  	
	} else {
		request.session.destroy();
		response.redirect('/');
	}
	
});

app.get('/teacher', function(request, response) {
  
	if (request.session.loggedin && request.session.role==='T') {
		request.session.checkPoint1 = false;
		request.session.checkPoint2 = false;
	
		// response.send("WAIT");
		
		response.render('teacherBranchSelect.ejs',{ sap: request.session.sapid, fullName: request.session.namee });
		response.end();
				
		  	
	} else {
		request.session.destroy();
		response.redirect('/');
	}
	
});

app.get('/selectLecture', function(request, response) {
  
	if (request.session.loggedin && request.session.role==='T' && request.session.checkPoint1 === true) {
	
		// response.send("WAIT");
		response.render('teacherSubjectSelect.ejs',{ branchh:request.session.branchName });
		// response.end();
				
		  	
	} else {
		request.session.destroy();
		response.redirect('/');
	}
	
});

app.post('/submitBranch', (request, response) => {

	if (request.session.loggedin && request.session.role==='T') {
		console.log(request.body);
		request.session.branchName = request.body;
		console.log(request.session.branchName);
		console.log("HELLO");
		request.session.checkPoint1 = true;
		response.render('teacherSubjectSelect.ejs',{ branchh:request.session.branchName });
		// response.end();	
		  	
	} else {
		request.session.destroy();
		response.redirect('/');
	}
	
	// response.send('Data received!');
});

app.post('/submitLecture', (request, response) => {

	if (request.session.loggedin && request.session.role==='T') {
		console.log(request.body);
		request.session.lecDetails = request.body;
		request.session.checkPoint2 = true;
		// console.log(request.session.branchName);
		// console.log("HELLO");
		response.render('markAttendance.ejs',{ coursee:request.session.lecDetails.courseName });
		  	
	} else {
		request.session.destroy();
		response.redirect('/');
	}
	
	// response.send('Data received!');
});

app.post('/submitAttendance', function(request, response) {

	connection.changeUser({ database: request.session.branchName.branchShortForm }, function(err) {
		if (err) throw err;
		console.log('Switched to '+request.session.branchName.branchShortForm);
	});

	console.log();
	console.log();

	var sql = 'INSERT INTO records (sapid, teacherName, shortForm, status,datee,startTime) VALUES ?';
	var values = [];
	var obj= request.body;

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if(obj[key][0]===true){
				values.push([key, request.session.lecDetails.teacherName, request.session.lecDetails.shortForm, 'P', request.session.lecDetails.datee, request.session.lecDetails.startTime]);

			}
			else{
				values.push([key, request.session.lecDetails.teacherName, request.session.lecDetails.shortForm, 'A', request.session.lecDetails.datee, request.session.lecDetails.startTime]);

			}
		
		}
	}

	const sqlQuery = 'UPDATE lectures SET marked=? WHERE teacherName=? AND shortForm=? AND datee=? AND startTime=?';
	const values2 = ['T', request.session.lecDetails.teacherName, request.session.lecDetails.shortForm, request.session.lecDetails.datee, request.session.lecDetails.startTime];

	connection.query(sqlQuery, values2, function (err, result) {
		if (err) throw err;
		console.log('Number of records updated: ' + result.affectedRows);
	});


	connection.query(sql, [values], function (err, result) {
		if (err) throw err;
		console.log('Number of records inserted: ' + result.affectedRows);
	});


	console.log(request.session.lecDetails);
	console.log(request.body);
	console.log(values);
	console.log();
	console.log();
	request.session.lecDetails='';
	request.session.checkPoint1 = true;
	request.session.checkPoint2 = false;
	response.render('teacherSubjectSelect.ejs',{ branchh:request.session.branchName });





	// connection.query('SELECT * FROM teachers NATURAL JOIN lectures NATURAL JOIN courses WHERE sapid =? and datee=?;',[request.session.sapid,today], (error, results, fields) => {
	// 	if (error) {
    //         console.error(error);
    //         response.status(500).send('An error occurred. Please try again later.');
    //         return;
    //     }
		
	// });
});

app.get('/logout', function(request, response) {
    request.session.destroy();
    response.redirect('/');
});

app.listen(3000);
var
	express     = require('express'),
	app         = express(),
	logger      = require('morgan'),
	path        = require('path'),
	mongoose    = require('mongoose'),
	bodyParser  = require('body-parser'),
	apiRoutes   = require('./routes/api.js')


var port        = process.env.PORT || 3000;

//if using local db:
//mongoose.connect('mongodb://localhost/goals_app', function(err){
//if using mongolab.com's db:
mongoose.connect('mongodb://goals_app:houfu@ds029595.mongolab.com:29595/goals_app', function(err){
	if(err) throw err
	console.log('Connected to MongoDB')
})

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req,res){
	console.log('getting index...')
	// res.render('index')
	res.sendFile(__dirname + '/public/index.html')
})

app.use('/api', apiRoutes)

app.listen(port, function(){
	console.log('Server Listening on port ' + port)
})


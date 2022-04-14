const express = require('express');
const cors=require('cors');
const jobsRoute= require('./routes/jobs');

const path = require('path');
const mongoose = require('mongoose');

const jobs= require('./models/jobs')
const app = express();

app.use(cors());
app.use(express.json({limit: "30mb",extended :true}));
app.use(express.urlencoded({limit: "30mb", extended:true}))
// app.set('view engine', 'ejs')
// app.set('views',path.join(__dirname, '/views'))
// app.engine('ejs',ejsMate);


app.use(express.static('build'))

app.use('/api/jobs',jobsRoute)


url='mongodb+srv://dbUser:dbUser@joblist.qq5pq.mongodb.net/JobApp?retryWrites=true&w=majority'
mongoose
    .connect(url)
    .then(()=>console.log('Database connected'))
    .catch((err)=>{console.log(err)})

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'));
})

// app.get('/', async(req,res) => {
    
  
//     const {search} = req.query
    
//    if(search){

//        const regex=new RegExp(escapeRegex(search), 'gi')

//        jobs.find({
//        $or :[
//         {"company_name"  :regex},
//         {"job_title"  :regex},
//         {"location"  :regex},
//         {"job_description_html"  :regex}   

//        ]
//     }
//             ,(err,foundjobs)=>{
//           if(err){
//               console.log(err);
//           }else{
//             res.send({foundjobs,search})
//             //   res.render('homepage',{foundjobs,search});
//           }
//       })
//    }
//    else{
//        const job= await jobs.find()
//     res.send({search,job})

//    }
// })





port =process.env.PORT || 5000;
app.listen(port , (req,res) => {
    console.log(`Listening on port ${port}`)
})



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
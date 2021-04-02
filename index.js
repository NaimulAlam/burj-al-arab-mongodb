const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()

// hiding sensitive data in env file and added env to git ignore
// console.log(process.env.DB_PASS);

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dspyj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 5000;

const app = express();

// cors help to read data from different origin and body parser help to read data from the body of website(client)
app.use(cors());
app.use(bodyParser.json());

var serviceAccount = require("./configs/burj-al-arab22-firebase-adminsdk-o7c5o-caa1345a61.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const bookings = client.db("burjAlArab").collection("bookings");

  //collect data from client and POST/send it to database
  app.post("/addBooking", (req, res) => {
    const newBooking = req.body;
    bookings.insertOne(newBooking).then((result) => {
      res.send(result.insertedCount > 0);
    });
    console.log(newBooking);
  });

  //get/take data from database and send it to Client
  app.get("/bookings", (req, res) => {
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith("Bearer ")) {
      const idToken = bearer.split(" ")[1];
    //   console.log({ idToken });
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
        //   const uid = decodedToken.uid;
        //   console.log({uid});
        // checking clint info with database then giving the response after match. secure data pass
          const tokenEmail = decodedToken.email;
          const queryEmail = req.query.email;
          if (tokenEmail == queryEmail) {
            bookings
              .find({ email: queryEmail })
              .toArray((err, documents) => {
                res.status(200).send(documents);
              });
          }
          else{
            res.status(401).send('un-authorized access');
          }
        })
        .catch((error) => {
            res.status(401).send('un-authorized access');
        });
    }
    else{
        res.status(401).send('un-authorized access');
    }

  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port);

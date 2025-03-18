const mongoose = require('mongoose');
const {connectDB, User, Admin, Ticket} = require('./dbschema');

const seedDB = async() => {
    try{
        await connectDB();
        // const user = await User.insertOne({
        //     username:"dipak",
        //     password:"1234",
        //     type:"user"
        // })
        // const admin = await Admin.insertOne({
        //     username:"saurav",
        //     password:"1234",
        //     type:"admin"
        // })

         const matches = [
            {
                ground: "Eden Gardens, Kolkata",
                date: "2025-03-22",
                time: "19:30",
                team1: {
                    name: "Kolkata Knight Riders",
                    captain: "Shreyas Iyer",
                    coach: "Chandrakant Pandit"
                },
                team2: {
                    name: "Royal Challengers Bengaluru",
                    captain: "Faf du Plessis",
                    coach: "Andy Flower"
                },
                tickets: 50000
            },
            {
                ground: "Rajiv Gandhi International Stadium, Hyderabad",
                date: "2025-03-23",
                time: "15:30",
                team1: {
                    name: "Sunrisers Hyderabad",
                    captain: "Aiden Markram",
                    coach: "Daniel Vettori"
                },
                team2: {
                    name: "Rajasthan Royals",
                    captain: "Sanju Samson",
                    coach: "Kumar Sangakkara"
                },
                tickets: 48000
            },
            {
                ground: "MA Chidambaram Stadium, Chennai",
                date: "2025-03-23",
                time: "19:30",
                team1: {
                    name: "Chennai Super Kings",
                    captain: "MS Dhoni",
                    coach: "Stephen Fleming"
                },
                team2: {
                    name: "Mumbai Indians",
                    captain: "Rohit Sharma",
                    coach: "Mark Boucher"
                },
                tickets: 55000
            },
            {
                ground: "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam",
                date: "2025-03-24",
                time: "19:30",
                team1: {
                    name: "Delhi Capitals",
                    captain: "Rishabh Pant",
                    coach: "Ricky Ponting"
                },
                team2: {
                    name: "Lucknow Super Giants",
                    captain: "KL Rahul",
                    coach: "Justin Langer"
                },
                tickets: 47000
            },
            {
                ground: "MA Chidambaram Stadium, Chennai",
                date: "2025-03-28",
                time: "19:30",
                team1: {
                    name: "Chennai Super Kings",
                    captain: "MS Dhoni",
                    coach: "Stephen Fleming"
                },
                team2: {
                    name: "Royal Challengers Bengaluru",
                    captain: "Faf du Plessis",
                    coach: "Andy Flower"
                },
                tickets: 55000
            },
            {
                ground: "Narendra Modi Stadium, Ahmedabad",
                date: "2025-03-29",
                time: "19:30",
                team1: {
                    name: "Gujarat Titans",
                    captain: "Shubman Gill",
                    coach: "Ashish Nehra"
                },
                team2: {
                    name: "Mumbai Indians",
                    captain: "Rohit Sharma",
                    coach: "Mark Boucher"
                },
                tickets: 70000
            }
        ];

        await Ticket.insertMany(matches);
        console.log('seeded database');
    }
    catch(err){
        console.log(err);
    }
}

seedDB();
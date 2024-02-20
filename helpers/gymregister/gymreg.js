const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for gym
const gymSchema = new Schema({
  name: String,
  membershipFee: Number,
  monthlyFee: Number,
  dailyFee: Number,
  peakTimes: {
    morningPeakStartTime: String,
    morningPeakEndTime: String,
    nightPeakStartTime: String,
    nightPeakEndTime: String
  },
  holidayDays: [String],
  description: String,
  images: [{
    data: Buffer,
    contentType: String,
    imageName: String
  }],
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  owner: { type: Schema.Types.ObjectId, ref: 'Owner' } // Foreign key to gym owner
});

// Define schema for gym owner


// Create models
const Gym = mongoose.model('Gym', gymSchema);


function gymregisterstep1(gymData){
    console.log(gymData)
    return new Promise(async(resolve,reject)=>{
        const newgym=new Gym();
        newgym.name=gymData.gymName
        newgym.membershipFee=gymData.membershipFee
        newgym.monthlyFee=gymData.monthlyFees
        newgym.dailyFee=gymData.dailyfees
        newgym.peakTimes.morningPeakStartTime=gymData.morningPeakStartTime
        newgym.peakTimes.morningPeakEndTime=gymData.morningPeakEndTime
        newgym.peakTimes.nightPeakStartTime=gymData.nightPeakStartTime
        newgym.peakTimes.nightPeakEndTime=gymData.nightPeakEndTime





        
        newgym.description=gymData.description
        newgym.owner=gymData.gymowner
        newgym.holidayDays=gymData.holidayDays

        newgym.save()
        resolve(newgym)


        
        // userData.password=await bcrypt.hash(userData.password,10)
        // const newowner = new gymowner();
        // newowner.email=userData.email;
        // newowner.username=userData.username;
        // newowner.password=userData.password;
        // newowner.save();
        // resolve(newowner);
    })

}

function calculatedailyfee(monthlyFee,holidays){
    const totalDaysInMonth = 30;
  
    // Calculate the number of working days in the month
    const workingDaysInMonth = totalDaysInMonth - holidays.length;
  
    // Calculate the daily fee
    const dailyFee = monthlyFee / workingDaysInMonth;
    
    return dailyFee;
}




module.exports = { calculatedailyfee,
gymregisterstep1};


const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const monitizeSchema = new Schema({
    // other fields in your main schema
    applied: [{ type: Schema.Types.ObjectId, ref: 'Owner' }],
    verified: [{ type: Schema.Types.ObjectId, ref: 'Owner' }]
});



const Monitize = mongoose.model('Monitize', monitizeSchema);



function apply(ownerId){
    return new Promise(async(resolve,reject)=>{

        try {
            const monetization = await Monitize.findOne({});
            if (!monetization) {
                // If monetization document doesn't exist, create a new one
                const newMonetization = new Monitize({
                    applied: [],
                    verified: []
                });
                newMonetization.applied.push(ownerId); // Insert ownerId into applied array
                await newMonetization.save();
                resolve("Owner added to the applied array.");
            } else {
                if (monetization.applied.includes(ownerId)) {
                    resolve("Owner already exists in the applied array.");
                } else if (monetization.verified.includes(ownerId)) {
                    resolve("Owner already exists in the verified array.");
                } else {
                    monetization.applied.push(ownerId); // Insert ownerId into applied array
                    await monetization.save();
                    resolve("Owner added to the applied array.");
                }
            }
        } catch (error) {
            console.error("Error processing monetization:", error);
            
        }

    })
}


function fetch_details(){
    return new Promise(async(resolve,reject)=>{
        const monetization = await Monitize.findOne({});
        resolve(monetization)

    })
}


module.exports = {
    apply,
    fetch_details
}






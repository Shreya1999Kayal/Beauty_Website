const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const SessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "roleModel",
        required: [true, "User is required"],
    },
    refreshTokenHash: {
        type: String,
        required: [true, "Refresh token is required"],
    },
    ip: {
        type: String,
        required: [true, "IP address is required"]
    },
    userAgent: {
        type: String,
        required: [true, "User agent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        versionKey: false,
    })


SessionSchema.pre("save", async function () {
    try {
       
            const salt = await bcrypt.genSalt(10);
            this.refreshTokenHash = await bcrypt.hash(this.refreshTokenHash, salt)
            
    }
    catch (error) {
        console.log(error)
        
    }
})


SessionSchema.methods.compareRefreshToken = async function (plainRefreshToken) {
    return await bcrypt.compare(plainRefreshToken, this.refreshTokenHash);
}




module.exports = mongoose.model("Session", SessionSchema)
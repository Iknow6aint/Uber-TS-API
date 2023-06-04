import mongoose from "mongoose";

var rideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    },
    paymentStatus: {
        type: String,
        default: "Not paid",
        enum: ["Not paid", "Paid"]
    },
    status: {
        type: String,
        default: 'Not Processed',
        enum: [
            "Accepted",
            "Requested",
            "Ongoing",
            "Completed",
            "Dispatched driver",
            "Cancelled",
            "Arrived"
        ]
    },
    destination: {
        type: String,
    },
    pickup: {
        type: String
    },
    disCount: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price: {
        type: Number
    }


}, {
    timestamps: true,
}
);

export const RideModel = mongoose.model('Ride', rideSchema);
// Ride Actions
export const getRide = () => RideModel.find();
export const getRideById = (id: string) => RideModel.findById(id);
export const createRide = (values: Record<string, any>) => new RideModel(values).save().then((order) => order.toObject());
export const deleteRideById = (id: string) => RideModel.findOneAndDelete({ _id: id });
export const updateRideById = (id: string, values: Record<string, any>) => RideModel.findByIdAndUpdate(id, values);
import mongoose from 'mongoose';

// driver Config
const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    car: [
        {
            name: {
                type: String,
                required: true
            },
            model: {
                type: String
            },
            plateNumber: {
                type: String
            }
        }
    ],
    number: { type: Number, required: true },
    Status: {
        type: String,
        default: 'Available',
        enum: [
            "Available",
            "On a ride",
            "Processing",
            "Dispatched",
            "Rejected",
            "Arrived"
        ]
    },
    acceptRide: {
        type: Boolean
    },
    trips: [
        {
            ride: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ride'
            }
        }
    ],
    isAvailable: {
        type: Boolean,
        default: false,
    }

});
export const DriverModel = mongoose.model('Driver', driverSchema);
// Driver Actions
export const getDriver = () => DriverModel.find();
export const getDriverById = (id: string) => DriverModel.findById(id);
export const createDriver = (values: Record<string, any>) => new DriverModel(values).save().then((user) => user.toObject());
export const deleteDriverById = (id: string) => DriverModel.findOneAndDelete({ _id: id });
export const updateDriverById = (id: string, values: Record<string, any>) => DriverModel.findByIdAndUpdate(id, values);

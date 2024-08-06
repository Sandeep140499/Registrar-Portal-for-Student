const generateBookingId = require("../function/booking_id");
const RegistrationModel = require("../models/registration");
const buildQuery = require("./services/queryBuilder");

exports.createRegistration = async (req, res) => {
  try {
    const registrationId = await generateBookingId(RegistrationModel, "RAM");
    console.log(registrationId, "0000000000");
    // Add the generated bookingId to the request body
    const registrationData = { ...req.body, bookingId: registrationId };
    const registration = await RegistrationModel.create(registrationData);

    res.status(201).json({ registration: registration });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRegistration = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery.buildQueryNested(queryParams);

    if (pagination || pagination === "true") {
      const count = await RegistrationModel.countDocuments();
      const totalPage = Math.ceil(count / pageSize);

      const registration = await RegistrationModel.find(query)
        .populate("created_by")
        .populate("updated_by")
        .populate("vehicle_id")
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();

      return res
        .status(200)
        .json({ registration: registration, pages: totalPage });
    }

    const count = await RegistrationModel.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    const registration = await RegistrationModel.find(query)
      .populate("vehicle_id")
      .sort({ createdAt: -1 })
      .exec();
    return res
      .status(200)
      .json({ registration: registration, pages: totalPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await RegistrationModel.findById(req.params.id)
      .populate("vehicle_id")
      .populate("created_by")
      .populate("updated_by");
    if (!registration) {
      return res.status(404).json({ message: "registration not found" });
    }
    res.status(200).json({ registration: registration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const registration = await RegistrationModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!registration) {
      return res.status(404).json({ message: "registration not found" });
    }
    res.status(200).json({ registration: registration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await RegistrationModel.findByIdAndDelete(
      req.params.id
    );
    if (!registration) {
      return res.status(404).json({ message: "registration not found" });
    }
    res.status(200).json({ message: "registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get by user id
exports.getRegistrationByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const registration = await RegistrationModel.find({ user_id })
      .populate("vehicle_id")
      .populate("created_by")
      .populate("updated_by")
      .sort({ createdAt: -1 })
      .exec();

    if (!registration || registration.length === 0) {
      return res
        .status(404)
        .json({ message: "registration not found for the specified user_id" });
    }

    res.status(200).json({ registration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegistrationByVehicleId = async (req, res) => {
  try {
    const { vehicle_id } = req.params;

    const registration = await RegistrationModel.find({ vehicle_id })
      .populate("created_by")
      .populate("updated_by")
      .sort({ createdAt: -1 })
      .exec();

    if (!registration || registration.length === 0) {
      return res
        .status(404)
        .json({ message: "registration not found for the specified user_id" });
    }

    res.status(200).json({ registration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getAllFiltered = async (req, res) => {
//   try {
//     const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
//     const query = buildQuery(queryParams);

//     if (pagination || pagination === "true") {
//       const count = await VehicleModal.countDocuments();
//       const totalPage = Math.ceil(count / pageSize);

//       const vehicles = await VehicleModal.aggregate([
//         { $match: query },
//         { $sort: { createdAt: -1 } },
//         { $skip: (page - 1) * pageSize },
//         { $limit: pageSize },
//         {
//           $lookup: {
//             from: "registrations",
//             localField: "vehicle_id",
//             foreignField: "vehicle_id",
//             as: "registration",
//           },
//         },
//         {
//           $match: {
//             $or: [
//               // Conditions for the Vehicle collection
//               {
//                 /* Your conditions for the Vehicle collection */
//               },
//               // Conditions for the Registration collection
//               { "registration.field": { $eq: value } }, // Example condition on a field in the registration
//             ],
//           },
//         },
//       ]).exec();

//       return res.status(200).json({ vehicles: vehicles, pages: totalPage });
//     }

//     const count = await VehicleModal.countDocuments();
//     const totalPage = Math.ceil(count / pageSize);
//     const vehicles = await VehicleModal.aggregate([
//       { $match: query },
//       { $sort: { createdAt: -1 } },
//       {
//         $lookup: {
//           from: "registrations",
//           localField: "vehicle_id",
//           foreignField: "vehicle_id",
//           as: "registration",
//         },
//       },
//       {
//         $match: {
//           $or: [
//             // Conditions for the Vehicle collection
//             {
//               /* Your conditions for the Vehicle collection */
//             },
//             // Conditions for the Registration collection
//             { "registration.field": { $eq: value } }, // Example condition on a field in the registration
//           ],
//         },
//       },
//     ]).exec();

//     return res.status(200).json({ vehicles: vehicles, pages: totalPage });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import { Consignment } from "../models/Consignment.js";

export const addConsignment = async (req, res) => {
  try {
    const { consignmentNumber, whomeToDeliver, status, statusMessage } =
      req.body;

    if (!consignmentNumber || !whomeToDeliver || !status || !statusMessage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: null,
      });
    }

    // Check for existing consignment (case insensitive)
    const existingConsignment = await Consignment.findOne({
      consignmentNumber: consignmentNumber.toUpperCase(),
    });

    if (existingConsignment) {
      return res.status(409).json({
        success: false,
        message: "Consignment already exists",
        data: null,
      });
    }

    // Create new consignment (storing in uppercase)
    const consignment = await Consignment.create({
      consignmentNumber: consignmentNumber.toUpperCase(),
      whomeToDeliver,
      status,
      statusMessage,
    });

    return res.status(201).json({
      success: true,
      message: "Consignment added successfully",
      data: consignment,
    });
  } catch (error) {
    console.error("Error in addConsignment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      data: null,
    });
  }
};

export const getAllConsignments = async (req, res) => {
  try {
    const consignments = await Consignment.find().sort({ createdAt: -1 });

    res.json(consignments);
  } catch (error) {
    console.error("Error in getAllConsignments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      data: null,
    });
  }
};

export const searchConsignment = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    // console.log(searchTerm);

    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: "Kuch to likhna padega",
        data: null,
      });
    }

    // Create a case-insensitive search query for both fields
    const query = {
      $or: [
        { consignmentNumber: new RegExp(searchTerm, "i") },
        { whomeToDeliver: new RegExp(searchTerm, "i") },
      ],
    };

    const consignments = await Consignment.find(query);

    if (consignments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sorry bhai, kuch nahi mila!",
        data: null,
      });
    }

    // console.log(consignments);
    return res.status(200).json({
      success: true,
      message: "Ye mila, dekh!!",
      data: consignments,
    });
  } catch (error) {
    console.error("Error in getConsignmentById:", error);
    return res.status(500).json({
      success: false,
      message: "Server ki galti hai!",
      error: error.message,
      data: null,
    });
  }
};

export const deleteConsignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
        data: null,
      });
    }

    const consignment = await Consignment.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Consignment deleted successfully",
      data: consignment,
    });
  } catch (error) {
    console.error("Error in deleteConsignment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      data: null,
    });
  }
};

export const updateConsignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
        data: null,
      });
    }

    const { consignmentNumber, whomeToDeliver, status, statusMessage } =
      req.body;

    const consignment = await Consignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      message: "Consignment updated successfully",
      data: consignment,
    });
  } catch (error) {
    console.error("Error in updateConsignment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      data: null,
    });
  }
};

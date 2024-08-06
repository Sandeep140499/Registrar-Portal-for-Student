const Card = require("../../models/Card");
const buildQuery = require("./queryBuilder");

const createData = async (model, data) => {
  try {
    console.log(data, "card");
    const response = await model.create(data);
    return {
      response: response,
      isSuccess: true,
    };
  } catch (error) {
    console.log(error?.message, "error");
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
const UpdateData = async (model, data) => {
  try {
    if (data?._id) {
      const response = await model.findByIdAndUpdate({ _id: data?._id }, data, {
        new: true,
      });
      return {
        response: response,
        isSuccess: true,
      };
    } else {
      const items = new model(data);
      const response = await items.save();
      // const response = await model.create(data);
      return {
        response: response,
        isSuccess: true,
      };
    }
  } catch (error) {
    console.log(error?.message, "error");
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
const GetAllData = async (model, data) => {
  try {
    const { pagination, page = 1, pageSize = 20, ...queryParams } = data?.query;
    const query = buildQuery(queryParams);
    const count = await model.countDocuments();
    const totalPage = Math.ceil(count / pageSize);

    if (pagination) {
      const stories = await model
        .find(query)
        .populate("cards")
        .sort({ _id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return { stories: stories, pages: totalPage };
    } else {
      const stories = await model
        .find(query)
        .populate("cards")
        .sort({ _id: -1 })
        .exec();
      return { stories: stories, pages: totalPage };
    }
  } catch (error) {
    console.log(error?.message, "error");
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

const getDataBySlug = async (model, slug) => {
  try {
    const tag = await model.findOne({ slug: slug });
    if (!tag) {
      return res.status(404).json({ message: "Data not found." });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createData,
  UpdateData,
  GetAllData,
  getDataBySlug,
};

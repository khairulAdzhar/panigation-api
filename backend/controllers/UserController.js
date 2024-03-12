import User from "../models/userModel.js";
import { Op } from "sequelize";

export const getUser = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";

  const offset = limit * page;
  const totalRows = await User.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });

  const totalPage = Math.ceil(totalRows / limit);

  const result = await User.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
  });
  const currentData = result.length;
  res.status(200).json({
    result: result,
    page: page,
    limit: limit,
    currentRows: currentData,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

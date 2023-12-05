import Price from "../models/Price";
import paginate from 'express-paginate';

class PriceController {
  public static async apiPrice(req, res) {
    try {
      const [results, itemCount] = await Promise.all([
        Price.find({}).limit(req.query.limit ?? 20).skip(req.skip).lean().exec(),
        Price.countDocuments({})
      ]);
      const pageCount = Math.ceil(itemCount / req.query.limit);
      res.json({
        object: 'list',
        has_more: paginate.hasNextPages(req)(pageCount),
        data: results
      });
      // res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send({message: "Internal Server Error"});
    }
  };
}

export default PriceController
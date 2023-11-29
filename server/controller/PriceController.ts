class PriceController {
   public static async apiPrice (req, res) {
      try {

         res.status(200).send({ message: "ok" });
      } catch (error) {
         console.log(error);
         res.status(500).send({ message: "Internal Server Error" });
      }
   };
}

export default PriceController
const ReviewModel = require("../reviews/review.model");
const ProductModel = require("./products.model");

const express = require("express");
const router = express.Router();
//post a product 
router.post("/create-product",async(req,res)=>{
    try{
        const newproduct = await ProductModel.create({...req.body});
         res.status(200).send(newproduct);    
         //calculate review 
         const reviews = await ReviewModel.find({productId:newproduct._id});
         if(reviews.length>0){
            const totalRating = reviews.reduce((acc,review)=>{
              return  acc+review.rating

            },0);
            const averageRating = totalRating/reviews.length;
            newproduct.rating = averageRating;
            await newproduct.save();
         }

    }catch(err){
       res.status(500).send({message:"Error creating new product"});
    }
   
});
router.get("/",async(req,res)=>{
    try{
    const  { searchInput, category,brand,color, ratings,minPrice,maxPrice, sort,page=1,limit=10 } = req.query;
    let filter = {};
    let sortOption = {};
    if(searchInput){
        filter.name= {$regex:searchInput,$options:'i'}
    }
    if(ratings){
        filter.rating = {$gte:Number(ratings)}    }
    if(category && category!=='all'){
        filter.category = category;
    }
       if(brand && brand!=='all'){
        filter.brand = brand;
       }

       if(color && color!=="all"){
        filter.color = color;
       }
       if(minPrice && maxPrice){
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if(!isNaN(min) && !isNaN(max)){
            filter.price = {$gte:min,$lte:max}
        }
        
       }
       if (sort === "priceLowToHigh") sortOption.price = 1;
       else if (sort === "priceHighToLow") sortOption.price = -1;
       else if (sort === "nameAZ") sortOption.name = 1;
       else if (sort === "nameZA") sortOption.name = -1;
       else if (sort === "ratingHighToLow") sortOption.rating = -1;
           
           const totalProducts = await ProductModel.countDocuments(filter);
           const totalPages = Math.ceil(totalProducts/parseInt(limit));
            const skippage = (parseInt(page-1))*(parseInt(limit));
            const products = await ProductModel.find(filter)
            .skip(skippage).limit(parseInt(limit))
            .populate("author","email")
            .sort(sortOption);

           res.status(200).send({products,totalPages,totalProducts});
          
         

    }catch(err){
        res.status(200).send({message:"Error Fetching projects"});
    }
});
//get a single product by  id 
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id).populate("author", "username email");

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const reviews = await ReviewModel.find({ productId: id }).populate("author", "username email");

        res.status(200).send({ product, reviews });
    } catch (err) {
        console.error("Error fetching product or reviews:", err.message);
        res.status(500).send({ message: "Something went wrong while fetching the product" });
    }
});
//update 
router.patch("/update/:id",verifyToken,verifyAdmin,async(req,res)=>{
    try{
        const {id} = req.params;
        const updateproduct = await ProductModel.findByIdAndUpdate(id,{...req.body},{new:true});
        if(!updateproduct){
            return res.status(500).send("product not found");
        }
        res.status(200).send({message:"Product updated successfully",product:updateproduct});
    }catch(err){
        res.status(500).send({ message: "Something went wrong while update the product" });

    }
   
});
//delete 
router.delete("/delete/:id",async(req,res)=>{
    try{
        const {id } = req.params;
        const deleteProduct = await ProductModel.findByIdAndDelete(id);
        if(!deleteProduct){
            return res.status(500).send("product not found");

        }
        const deletereview = await ReviewModel.deleteMany({productId:id});
        res.status(200).send({
            message: "Product and associated reviews deleted successfully",
            deletedProduct: deleteProduct,
            deletedReviewsCount: deletereview.deletedCount,
          });
          
    }catch(err){
        res.status(500).send({ message: "Something went wrong while deleting the product" });

    }
})

module.exports = router;
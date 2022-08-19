import express from 'express'
import Publisher from '../models/publish.js';
import Book from '../models/book.js';

const indexrouter=express.Router()

indexrouter.post('/addPublisher', async (req, res) => {
    try {
     
       const publisher = new Publisher(req.body);
       await publisher.save();
       res.status(201).json({success:true, data: publisher });
 
    } catch (err) {
       res.status(400).json({success: false, message:err.message});
    }
 });



 indexrouter.post('/addBook', async (req, res)=>{
   try {
   
      const book = new Book(req.body);
   
      await book.save();

      const publisher = await Publisher.findById({_id: book.publisher})
      publisher.publishedBooks.push(book);
      await publisher.save();

         res.status(200).json({success:true, data: book })

   } catch (err) {
      res.status(400).json({success: false, message:err.message})
   }
})


indexrouter.get('/publishers', async (req, res) => {
   try {
      const data = await Publisher.find()
                                 .populate({path: 'booksPublished', select: 'name publishYear author'});
      res.status(200).json({success: true, data});
   } catch (err) {
      res.status(400).json({success: false, message:err.message});
   }
})


 export default indexrouter
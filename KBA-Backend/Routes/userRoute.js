
import { Router } from 'express';
import {course,cart} from './adminRoute.js'
import { authenticate } from '../Middleware/auth.js';

const user = Router();

user.get('/getCourse',authenticate,(req ,res)=>{     


       
try{
    const key = req.query.courseName;
    console.log("CourseName:",key);

    const result = course.get(key);

    if (result ){
       res.status(200).json({result});
    } else {
        res.status(404).json({msg:'course not found'});
    
    }
} catch (error){
    console.error("error fetching course:", error);
    res.status(500).json({error: 'internal server Error'});    
    
}

});                

// user.get('/getCourse/:CourseName',(req,res)=>{
//     console.log(req.params.CourseName);
// })   
                                                                                                 
user.get('/getCourse/:CourseName',authenticate,(req, res) => {                     
  try {                                         
    const key = req.params.CourseName;     
    console.log("CourseName:", key);        

    const result = course.get(key);  
      
    
                                          

    if (result) {
      res.status(200).json({ result });  
    } else {
      res.status(404).json({ msg: 'course not found' });  
    }

  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



                         
user.post('/addToCart', authenticate, (req,res)=>{      
    try {
        const UserName = req.name;
        console.log("Username:",UserName);
        const {CourseName} = req.body  
                                           
        const result = course.get(CourseName)
                                
        if(result){      
            let userCart = cart.get(UserName);
            if (!userCart) {
                userCart = [];
            }    
            console.log(userCart);

            const isCourseAlreadyInCart = userCart.some(e =>      
                e.CourseName === CourseName  
            );                   
                                              
            
            if (isCourseAlreadyInCart) {
                res.status(401).json({msg:'This course already exists in the cart'});
            } else {
                userCart.push({CourseName, Price: result.Price});
                cart.set(UserName, userCart);
                console.log("Usercart: ",userCart);
                res.status(200).json({msg:'Course added to cart successfully'});
            }
        } else{
            res.status(404).json({msg:'Course not found'})
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});          

user.get('/getCartDetails',authenticate, (req, res) => {
    try {
        const UserName = req.name;
        console.log("Username:",UserName);
        
        const result = cart.get(UserName);
        console.log("Cart:", result)

        if (!result) {           
            res.status(404).json({msg:'Cart is empty'});
        } else {
            res.status(200).json({cart:result});
        }   
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

            

user.delete('/deleteFromCart', authenticate, (req, res) => {    
    try {                                                                       
        const UserName = req.name; 
        console.log("Username:", UserName);     

        const { CourseName } = req.body; 
        let userCart = cart.get(UserName);    

        if (!userCart || userCart.length === 0) {
            return res.status(404).json({ msg: 'Cart is empty' });                    
        }

        const courseIndex = userCart.findIndex(item => item.CourseName === CourseName);    
                                                               
     
        if (courseIndex === -1) {            
            return res.status(404).json({ msg: 'Course not found in cart' });
        }  

        userCart.splice(courseIndex, 1);               

        cart.set(UserName, userCart);       
        console.log("Updated cart:", userCart);

        res.status(200).json({ msg: 'Course removed from cart successfully' });

    } catch (error) {                                   
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });  
    }         
});






user.get('/getCartTotal', authenticate, (req, res) => {   
    try {       
        const UserName = req.name;  
        console.log("Username:", UserName);

        const result = cart.get(UserName);
        console.log("Cart:", result);       
                                                 
        if (!result || result.length === 0) {  
            res.status(404).json({ 
                msg: 'Cart is empty', 
                totalItems: 0, 
                totalPrice: 0
            });
        } else {
            const totalItems = result.length;
            const totalPrice = result.reduce((sum, item) => sum + item.Price, 0);

            res.status(200).json({               
                cart: result, 
                totalItems, 
                totalPrice 
            });            
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
 
});




export { user }; 


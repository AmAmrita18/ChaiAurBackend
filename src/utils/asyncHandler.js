//ye ek method banayega jo export kar dega

//using Promises
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}









export {asyncHandler}

//hm promises wala async handler use karenge...par ye try-catch se bhi hota hai
// asynHandler ek higher order function hai...higher order function vo function hote hai jo function ko as a parameter k tarah bhi accept kar sakte hai ya usko return kar sakte h...usko variable k tarah treat karte hai
// Step-1: const asyncHandler = () => {}
// Step-2: const asyncHandler = (fn) => {}
// Step-3: const asyncHandler = (func) => async() => {}

//using try-catch
// const asyncHandler = (fn) => (req, res, next) => {
//     try {
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
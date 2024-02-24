import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uplodeOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res) => {
    
    // get user details from frontend
    const {fullName, email, username, password} = req.body
    // console.log("email: ", email, "password: ", password);
    

    // validation - not empty
    if(
        [fullName, email, username, password].some((field) => field?.trim() === "") 
    ){
        throw new ApiError(400, "All filds are required")
    }


    // check if user already exist - username and email
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })
    
    if(existedUser) {
        throw new ApiError(409, "username or email already exist")
    }
    

    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path
    // console.log(req.files);

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avtar file is required")
    }
    

    // upload them to cloudinary, avatar upload check
    const avatar = await uplodeOnCloudinary(avatarLocalPath)
    const coverImage = await uplodeOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400, "Avtar file not uploaded successfully")
    }


    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    // remove password and refresh token from response
    const createdUser = await User.findById(user._id)
    .select("-password -refreshToken")


    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registerimg the user")
    }


    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user register successfully")
    )
    






})

export {registerUser}
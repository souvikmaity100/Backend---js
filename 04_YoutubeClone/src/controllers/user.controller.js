import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uplodeOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // Avoid validation on save for the current request only

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { fullName, email, username, password } = req.body;
  // console.log("email: ", email, "password: ", password);

  // validation - not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All filds are required");
  }

  // check if user already exist - username and email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "username or email already exist");
  }

  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files);

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avtar file is required");
  }

  // upload them to cloudinary, avatar upload check
  const avatar = await uplodeOnCloudinary(avatarLocalPath);
  const coverImage = await uplodeOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avtar file not uploaded successfully");
  }

  // create user object - create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // remove password and refresh token from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registerimg the user");
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user register successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { email, username, password } = req.body;
  if (!(username || email)) {
    throw new ApiError(400, "Username or Email is required");
  }

  // username or email exist or not
  // find the user
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(
      404,
      "user does not exist, please create an account first",
    );
  }

  // check the password
  if (!password) {
    throw new ApiError(404, "please enter the password");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password not correct");
  }

  // create a access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // send cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged In Successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );

  // reset cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  
    const user = User.findById(decodedToken?._id);
  
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
  
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
  
    const options ={
      httpOnly: true,
      secure: true
    }
  
    const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
  
    return res.status(200)
    .cookie("accessToken", accessToken ,options)
    .cookie("refreshToken", newRefreshToken ,options)
    .json(new ApiResponse(200, {accessToken, newRefreshToken}, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }

});

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const {oldPassword,newPassword} = req.body

  const user = await User.findById(req.user?._id) 

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {
    throw new ApiError(401,"Wrong old password")
  }

  user.password = newPassword

  await user.save({validateBeforeSave : false})

  return res.status(200).json(new ApiResponse(200, {}, 'Password has been changed'))
})

const getCurrentUser = asyncHandler(async (req,res)=>{
  return res.status(200).json(new ApiResponse(200, req.user))
})

const updateAccountDetails = asyncHandler(async (req,res)=>{
  const {fullName, email} = req.body

  if (!fullName || !email) {
    throw new ApiError(400, "all fields are required")
  }

  const user = User.findByIdAndUpdate(
    req.user._id,
    { 
      $set: {
        fullName,
        email
      }
    },
    { new: true}
    ).select('-password') // exclude the password field from

    return res.status(200).json(new ApiResponse(200, user, "Account updated successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing")
  }

  const avatar = await uplodeOnCloudinary(avatarLocalPath)

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploding on avatar")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id, 
    {
      $set: {
        avatar: avatar.url
      }
    },
    { new: true}
    ).select('-password') // exclude the password field from

    return res.status(200).json(new ApiResponse(200, user, "Avtar updated successfully"))
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover Image file is missing")
  }

  const coverImage = await uplodeOnCloudinary(coverImageLocalPath)

  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploding on Cover Image")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id, 
    {
      $set: {
        coverImage: coverImage.url
      }
    },
    { new: true}
    ).select('-password') // exclude the password field from

    return res.status(200).json(new ApiResponse(200, user, "Cover Image updated successfully"))
})

export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentUserPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage };

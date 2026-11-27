const postModel = require('../models/post.js');
const userModel = require('../models/user.js');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

exports.createPost = async (req, res) => {
    try {
        const { userId } = req.params
        const { content} = req.body;
        const files = req.files
        const media = []
        // Check for Allowed Files Here
        if (files.length > 0) {
             const invalidFiles = files.map((file) => {
                file.mimetype.startsWith('application/pdf')
             })
             if (invalidFiles.includes(true)) { 
                files.forEach(element => {
                    if (fs.existsSync(element.path)) {
                        fs.unlinkSync(element.path)
                    }
                    
                });
                return res.status(400).json({
                    message: 'PDF is not Allowed'
                })
             }
        }
        // Check if User Exist
        const user = await userModel.findById(userId).populate('posts')
        if (!user) {
            return res.status(400).json({
                message: "User trying to create Post, does not exists"
            })
        }
        // Upload files to Cloudinary AND Push to Media Variable
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, (error, data) => {
                if (error) {
                    fs.unlinkSync(file.path)
                    res.status(500).json({
                        message: "Failed to Upload Files: " + error.message
                    })
                } else {
                    return data
                }
            })

            const mediaObject = {
            imageUrl: result.secure_url,
            imageId: result.secure_id
        }
        media.push(mediaObject);
        fs.unlinkSync(file.path)

        }

    // Create the data object for the data to create
        const data = {
            content,
            userId,
            media
        }

        // const newPost = await postModel.create(data);

        const newPost = new postModel(data);

        user.posts.push(newPost._id);
        // save the changes to Database
        await newPost.save();
        await user.save();


        res.status(201).json({
            message: 'Post Created Successfully',
            data: newPost
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const allPosts = await userModel.find();

        res.status(200).json({
            message: `All users found and the length is ${allPosts.length}`,
            data: allPosts
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOnePost = async (req, res) => {
    try {
        const { id } = req.params
        const onePost = await postModel.findById(id);

        if (!onePost) {
            return res.status(400).json({
                message: "Post not Found"
            })
        }

        res.status(200).json({
            message: 'One Post Retrieved Successfully',
            data: onePost
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// exports.updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { fullName, email, gender, password, age } = req.body;
//         const user = await userModel.findById(id);
//         if (!user) {
//             return res.status(400).json({
//                 message: "User not Found"
//             })
//         }

//         const data = {
//             fullName,
//             // email: email.toLowerCase,
//             gender,
//             password,
//             age
//         }

//         if (email && email !== user.email){
//             const emailExist = await userModel.findOne({email: email.toLowerCase})
//             if (emailExist) {
//                 return res.status(404).json({
//                     message: 'Email already in use'
//                 })
//             }
//         }

//         const updatedUser = await userModel.findByIdAndUpdate(id, data, {new: true})
//         res.status(201).json({
//             message: 'User Created Successfully',
//             data: updatedUser
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }

// exports.deleteUser = async (req, res) => {
//     try {
//         const {id} = req.params;
        
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }
import PostModel from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const docPost = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await docPost.save();

    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json("Create POST Error");
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Get posts error" });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({ message: "cant get a post" });
        }

        if (!doc) {
          return res.status(404).json({ message: "post not found" });
        }

        res.json(doc);
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "get posts error" });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({ message: "Failed to delete the post" });
        }
        if (!doc) {
          return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Delete completed" });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export const update = async (req, res) => {
  const postId = req.params.id;
  try {
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        user: req.userId,
      },
      (err, doc) => {
        if (!doc) {
          return res.status(404).json({ message: "Post not found" });
        }

        if (err) {
          return res
            .status(500)
            .json({ message: `Failed to update post ${postId}` });
        }
      }
    );
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to update post" });
  }
};

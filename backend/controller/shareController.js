import ShareModel from "../models/shareModel.js";

export const addMessage = async (req, res) => {
  try {
    const newMessage = new ShareModel(req.body); 
    newMessage.chatter = req.body.userId
    newMessage.message = req.body.message;
    newMessage.attachment = req.body.attachment

    await newMessage.save();

    res.json({ newMessage });
  } catch (error) {
    res.send(error.message);
  }
};

export const shareList = async (req, res) => {
  try {
    const shareElement = await ShareModel
      .find({})
      .populate("chatter")
    res.send(shareElement)
  } catch (error) {
    res.status(500).send(error.message)
  }
};

export const updateMessage = async(req,res)=>{
  const messageId = req.params.id;
 
 if (req.body.like) {
    try{
      const message = await ShareModel
      .findOneAndUpdate({_id:messageId},
       {$inc: {like:+1}},
        {new: true}
      );
        res.json(message)
      } catch (error) {
        res.send(error.message);
      }
 }  else if (req.body.disLike) {
    try{
      const message = await ShareModel
      .findOneAndUpdate({_id:messageId},
        {$inc: {disLike:+1}},
        {new: true}
      );
        res.json(message)
    } catch (error) {
        res.send(error.message);
      }
 }  else if (req.body.newEmoji) {
    try{
      const message = await ShareModel
      .findOneAndUpdate({_id:messageId}, 
        { $push:{emoji:{
          emojiType:req.body.emojiType,
          commenter:req.body.commenter,
          }}
        },
        {new: true});
      res.json(message)
    } catch (error) {
      res.send(error.message);
    }
 }  else {
  const message = await ShareModel
      .findOneAndUpdate({_id:messageId}, 
        req.body,
        {new: true});
    res.json(message )
 }
}

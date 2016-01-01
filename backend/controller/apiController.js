
import UserModel from "../models/userModel.js";

export const postMyAccount = async (req, res) => {

  // da die email-Adresse nicht im JWT gespeichert wird (und das sollte sie niemals),
  // rufen wir sie hier von der Datenbank ab
  try {

    const userMail = ( await UserModel
      .findById(req.userId)
      .select("eMail")).eMail;
    return res.send({
      /* name: req.userName, */
      id: req.userId,
      eMail: userMail
    })
    
  } catch (error) {
    console.error(error);
    res.status(500).send({error})
  }
}
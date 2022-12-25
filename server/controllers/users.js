import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async(req, res) =>{
  try{
      const users = await User.find({ role: "manager" }).select("-password");
      res.status(200).json(users);
  } catch (error) {
      res.status(404).json({ message: error.message});
  }
}

/* delete */
export const deleteUser = async(req, res) => {
  const { id } = req.params

  //confirm data
  if(!id) {
      return res.status(400).json({ message: 'Data ID Required'})
  }

  const user = await User.findById(id).exec()

  if(!user) {
      return res.status(400).json({ message: 'Data not found'})
  }
  const result = await user.deleteOne()

  const reply = `data user ${result.email} with ID ${result._id} deleted`
  res.json(reply)
}
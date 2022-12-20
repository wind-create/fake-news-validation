import hoax_faq from "../models/hoax_faq.js";

export const getQAHoaxNews = async(req, res) =>{
    try{
        const QAHoaxNews = await hoax_faq.find()
        res.status(200).json(QAHoaxNews);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}
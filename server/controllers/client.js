import hoax_faq from "../models/hoax_faq.js";
import faq from "../models/faq.js";

export const getQAHoaxNews = async(req, res) =>{
    try{
        const QAHoaxNews = await hoax_faq.find()
        res.status(200).json(QAHoaxNews);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getFaq = async(req, res) =>{
    try{
        const Faq = await faq.find()
        res.status(200).json(Faq);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}
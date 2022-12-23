import hoax_faq from "../models/hoax_faq.js";
import faq from "../models/faq.js";


/* add data client */


export const add = async(req, res) => {
    try {
        const {
            pertanyaan,
            response
        } = req.body;

        const newData = new faq({
            pertanyaan,
            response,
        });
        await newData.save();

        const data = await newData.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(409).json({ message: err.message});
    }
};

/* update data */ 

export const updateData = async (req, res) => {
    try{
        const { id } = req.params;
        const pertanyaan =  await faq.findById(id);
        const response = await faq.findById(id);
    
        const updatedData = await faq.findByIdAndUpdate(
            id,
            { pertanyaan: pertanyaan.pertanyaan},
            { response: response.response },
            { new: true}
        );
    
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
    
};

/* get data client */
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
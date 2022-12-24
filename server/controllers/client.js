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

export const updateDataFaq = async (req, res) => {
    try{    
        const updatedatafaq = await faq.updateOne(
            {_id:req.params.id}, {$set: req.body}
        );
    
        res.status(200).json(updatedatafaq);
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

/* delete data client */

export const deleteFaq = async(req, res) => {
    const { id } = req.params

    //confirm data
    if(!id) {
        return res.status(400).json({ message: 'Data ID Required'})
    }

    const Faq = await faq.findById(id).exec()

    if(!Faq) {
        return res.status(400).json({ message: 'Data not found'})
    }
    const result = await Faq.deleteOne()

    const reply = `data FAQ ${result.pertanyaan} with ID ${result._id} deleted`
    res.json(reply)
}

/* get data by id */
export const getFAQById = async (req, res) => {
    try {
        const Faq = await faq.findById(req.params.id);
        res.json(Faq);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
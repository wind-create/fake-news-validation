import mongoose from "mongoose";

const hoax_faqSchema = new mongoose.Schema({
    pertanyaan: String,
    response: String,
}, {
    timestamps: true
});

const hoax_faq = mongoose.model("hoax_faq", hoax_faqSchema);
export default hoax_faq;
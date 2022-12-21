import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    pertanyaan: String,
    response: String,
}, {
    timestamps: true
});

const faq = mongoose.model("faq", faqSchema);
export default faq;
const OpenAI = require("openai");
const jobSchema = require("../models/jobSchema")
const userSchema = require("../models/User")
const resumeSchema = require("../models/resumeSchema")
const mongoose = require('mongoose')

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_TOKEN
});

//Function to call Deepseek API for tailoring
exports.tailorResume = async (req, res, next) => {
    try{
        if (!req.user) {return res.status(401).send('Not logged in')};
        const jobId = req.body.jobId;
        const userId = req.user.id;
        //console.log("Job ID: ",jobId);
        //console.log("user ID: ",userId);
        //Validate IDs
        if (!jobId || !userId){
            return res.status(500).send('Internal error');
        }

        if (!mongoose.Types.ObjectId.isValid(jobId) || 
            !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const jobPost = await jobSchema.findById(jobId);
        if (!jobPost) {
            return res.status(404).json({ error: 'Job post not found' });
        }

        //Fetch user master resume json from user by ID
        const user = await userSchema.findOne({ _id: userId });
        const userResume = user?.masterResume;
        if (!userResume) {
            return res.status(404).json({ 
                error: 'Master resume not found',
                solution: 'Please upload a master resume first'
            });
        }

        //console.log("User resume: ",userResume);
        //console.log("Job post: ",jobPost);
        
        //Call DeepSeek API
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Respond in JSON format. Your response should be a reduction of the master resume json, without any modification to original text." },
                {role: "user", content: "Please tailor this master resume json: "+JSON.stringify(userResume) +" to this job post json: "+JSON.stringify(jobPost)+" by only removing elements from the master resume json."}
        ],
            model: "deepseek-chat",//Standard chat model
            response_format: { type: "json_object" }, // Forces JSON output
            temperature: 1.0 //Standard temperature for data analysis
        });
        const response = JSON.parse(completion.choices[0].message.content);
        console.log(response);
        //Output validation here...
        if (!response){
            return res.status(500).send('Internal error');
        }
        const resume = new resumeSchema({
            job: jobId,
            user: userId,
            content: response
        });
        await resume.save();
        console.log("IT WORKS!!!");
        return res.status(200).json(response);
    }
    catch(err){
        console.error("Error fetching job post data:", err);
        return res.status(500).json({ error: "Failed to tailor resume" });
    }
}
const OpenAI = require("openai");
const jobSchema = require("../models/jobSchema")
const resumeSchema = require("../models/resumeSchema")

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_TOKEN
});

//Function to call Deepseek API for tailoring
exports.tailorResume = async (req, res, next) => {
    try{
        if (!req.user) return res.status(401).send('Not logged in');
        const jobId = res.locals.job_id;
        const jobPost = await jobSchema.find({_id:jobId})
        //Fetch user master resume json from user by ID
        const userId = req.user.id;
        const userResume = await resumeSchema.find({ user: userId});
        console.log("User resume: "+userResume);
        console.log("Job post: "+ jobPost);
        //Call DeepSeek API
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Respond in JSON format. Your response should be a reduction of the master resume json, without any modification to original text." }],
            messages: [{role: "user", content: "Please tailor this master resume json: "+JSON.stringify(userResume) +" to this job post json: "+JSON.stringify(jobPost)+" by only removing elements from the master resume json."}],
            model: "deepseek-chat",//Standard chat model
            response_format: { type: "json_object" }, // Forces JSON output
            temperature: "1.0" //Standard temperature for data analysis
        });
        const response = completion.choices[0].message.content.json();
        console.log(response);
        //Output validation here...
        if (!content || !jobId || !userId){
            return res.status(500).send('Internal error');
        }
        const resume = new resumeSchema({
            job: jobId,
            user: userId,
            content: response
        });
        await resume.save();
        console.log("SHIT WORKS!!!");
        return res.json(response);
    }
    catch(err){
        console.error("Error fetching job post data:", error);
        return res.status(500).json({ error: "Failed to tailor resume" });
    }
}
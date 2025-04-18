/* connect to database, load schema, require keyword-extractor from npm */
require('dotenv').config();
const { connectDB, disconnectDB } = require('../../config/mongo');
const Job = require('../models/jobSchema');
const keyword_extractor = require('keyword-extractor');

// myles and adrian's sample resume json's for testing
const myles = require('../models/example-resume.json');
const adrian = require('../models/example-resume2.json');

// make iterable
const resumes = [myles, adrian]

// known skills (copied over)
const knownSkills = [
    'javascript', 'python', 'react', 'node', 'aws', 'docker', "react.js",
    'frontend', 'front-end', 'front end', 'RStudio', ".NET","3D", "Animation", "Design", "Modelling", "ActionScript", 
    "Adobe", "Engineering", "AJAX", "Algorithm", "Algorithms", "Amazon Web Services",
    "Analytics", "Angular.js", "Apache", "App Developer", "Development", "full stack", "full-stack",
    "Artificial Intelligence", "AI", "Artificial", "Intelligence", "ML", "Machine Learning", "ASP.NET", "Azure", "backbone.js",
    "big data", "analysis", "biotechnology", "bootstrap", "architecture", "business", "c", "c programming", "programming", "c++",
    "c#", "c ++", "c #", "cakephp", "casperJS", "chrome", "os", "coding", "ab testing", "ab", "a/b", "graphics", "security", 
    "vision", "cs-cart", "css", "java", "js", "html", "r", "rstudio", "mining", "debugging", "django", "ecommerce", "software",
    "ember.js", "erlang", "excel", "express", "express js", "recognition", "finance", "financial", "firefox", "flash", "fortran",
    "API", "game", "game design", "geospatial", "arcgis", "gis", "git", "golang", "google", "GPGPU", "GPU", "hadoop",
    "Hbase", "hive", "automation", "html5", "ibm", "imaging", "installation", "research", "framework", "iphone", "javafx",
    "jQuery", "json", "jsp", "knockout.js", "latex", "linear programming", "linkedin", "linux", "livecode", "logistics", 
    "mac", "map reduce", "hadoop", "reduce", "matlab", "spark", "meteorJS", "microsoft", "sql", "sql server", "oracle", 
    "postgres", "nosql", "testing", "mysql", "nlp", "natural", "language", "processing", "natural language", "nginx", "node.js",
    "couch", "mongo", "mongodb", "atlas", "couchdb", "cassandra", "database", "parallel", "processing", "pattern", "recognition",
    "php", "piping", "pipeline", "etl", "transformation", "manipulation", "cleaning", "plugin", "PostgreSQL", "Powerpoint",
    "Powershell", "Qualtrics", "survey", "methodology", "quickbase", "React.js", "Redis", "regex", "regular", "expressions",
    "robotics", "ruby", "SAS", "scala", "scheme", "schema", "script", "scripting", "shell", "unix", "command", "sqlite",
    "statistics", "statistical", "network", "networks", "IT", "project", "management", "version", "control", "swift", "tableau",
    "powerbi", "typescript", "ubuntu", "urdu", "UX", "UI", "user", "accessibility", "interaction", "usability", "interface",
    "GUI", "VB.NET", "vectorization", "visualization", "XML", "scraping", "hosting", "server", "client", "windows",
    "wireframe", "wireframes", "xmpp", "query", "data", "structures", "latency", "strings", "memory", "distributed", "problem",
    "solving", "spss", "graph", "plot", "ggplot", "snowflake", "d3", "qlikview", "applied", "complex", "packages", "quantitative",
    "science", "d3.js", "deep", "learning", "tensorflow", "optimization", "queries", "middleware", "computing", "predictive",
    "analyst", "structured", "unstructured", "Scikit-learn", "scikit", "pandas", "mathematics", "anomoly", "detection", 
    "object-oriented", "rust", "go", "frameworks", "cloud", "google", "gcp", "IDE", "pig", "torch", "tuning", "trends", "parameters",
    "relational", "non-relational", "impala", "kafka", "hdfs", "s3", "cyber", "lifecycle", "consulting", "strategy",
    "teradata", "hardware", "pyspark", "agile", "genetic", "phd", "masters", "spss", "scrum", "libraries", "bayesian", "inference",
    "soap", "metrics", "tdd", "bi", "julia", "golang", "numpy", "incident", "response", "cryptography", "malware", "threat",
    "penetration", "forensics", "intrusion", "risk", "seaborn", "plotly", "wireshark", "nmap", "splunk", "jupyter", "survival",
    "cox", "hazards", "modeling", "kaplan", "nonparametric", "parametric", "multivariate", "hierarchical", "clustering",
    "spatial", "temporal", "trend", "teaching", "tutoring", "chat", "chatbot", "socket.io", "shiny", "MochaJS", "Deepseek",
    "lua", "android", "sdk", "devops", "fixml", "cross-platform", "regression", "logistic", "wrangling", "wrangle", "census"
  ];

  const extractSkills = (text) => {
    const keywords = keyword_extractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    });
    return keywords.filter(word => knownSkills.includes(word));
  };
  
  // async function for connecting to DB
  const scoreResumesAgainstJobs = async () => {
    try {
      await connectDB();
      console.log('Connected to MongoDB.\n');
  
      const jobs = await Job.find({}).limit(5); // limit for testing

      // loop through jobs pulled from DB
      for (const job of jobs) {
        console.log(`\n Job: ${job.job_title}`);
        const jobSkills = extractSkills(job.description || '');
        
        // loop through resumes and score
        for (const resume of resumes) {
          const resumeSkills = extractSkills(resume.text);
          const matchedSkills = resumeSkills.filter(skill => jobSkills.includes(skill));
          // version 1: just output score value as length... normalize to 100 later
          const score = matchedSkills.length;
  
          console.log(`\n  Resume: ${resume.name}`);
          console.log(`  Matched Skills: ${matchedSkills.join(', ')}`);
          console.log(`  Match Score: ${score}`);
        }
      }
      // error handling
    } catch (err) {
      console.error('Error scoring resumes:', err.message);
    } finally {
      await disconnectDB();
      console.log('\nDisconnected from MongoDB.');
    }
  };
  
  scoreResumesAgainstJobs();
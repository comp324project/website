
// Resource from Dr. Hayward:
// https://www.npmjs.com/package/keyword-extractor

/*
TO DO:
- filter for technical skills (soft skills necessary to ALL jobs.. maybe drop this)
    - need new file for skills list (looking online for existing or need to manually create..)
- new file for scoring algorithm (simple weighted and normalized?)
*/




// keyword extractor test for historical data
require('dotenv').config();
const { connectDB, disconnectDB } = require('../../config/mongo');
const Job = require('../models/jobSchema');
const keyword_extractor = require('keyword-extractor');

// skills list sourced from these sites:
// https://gist.github.com/LastZactionHero/1cae1a78f3d19f0a867600b900b02b8a
// https://github.com/NeeharikaKusampudi/Skills-for-Data-Science-position/blob/master/Data%20Science%20Skills.txt
// https://github.com/mikeasilva/data-scientist-skills/blob/master/raw_skills.csv

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
    "penetration", "forensics", "intrusion", "risk", "seaborn", "plotly", "wireshark", "nmap", "splunk", "jupyter"
  ];

// connect to db, fetch jobs, loop and get keywords, log result to console
const testKeywordExtractor = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB.');

    // fetch jobs ... limit for testing
    const jobs = await Job.find({}).limit(20);

    for (const job of jobs) {
      const description = job.description || '';
      
      const keywords = keyword_extractor.extract(description, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
      });
      const filteredSkills = keywords.filter(word => knownSkills.includes(word));

      console.log(`\nJob Title: ${job.title}`);
      console.log(`Extracted Filtered Keywords:`, filteredSkills);
    }
    
  } catch (error) {
    console.error('Error during keyword extraction test:', error.message);
  } finally {
    await disconnectDB();
    console.log('Disconnected from MongoDB.');
  }
};

testKeywordExtractor();

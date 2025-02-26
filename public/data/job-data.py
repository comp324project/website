#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Feb 19 10:49:46 2025

@author: areuschel
"""

"""
Data Store for COMP 324/424: Client-Side Web Design
"""

# Import Libraries for EDA
import pandas as pd
import os


# Read in Dataset from Kaggle
os.chdir("/Users/areuschel/Desktop/COMP424/Resume")
rawData = pd.read_csv("data/postings.csv")



# Exploratory Data Analysis

### View sample of data
sample1 = rawData.sample(100)

### Check missing values
jobMissing = rawData.isnull().sum()


# Data Cleaning

print(rawData.columns)

"""
Notes:
    
    - Columns important for web application:
        - job_id = unique identifier
        - company_name
        - title
        - description (will need to string detect from this column)
        - location (for filtering on web application)
        - job_posting_url (many will be null, but include for purpose of application)
        - work_type (for filtering)
        - formatted_experience_level 
        - sponsored (show if applicable, filtering)
        - work_type (show if applicable)
        - normalized salary
        
    
    - Columns to remove:
        - zip_code, fips ... missing values & already have (city, state)
        - views, applies ... outdated information since data is from 2023-2024
        - application_url ... already have job posting url and these will also be outdated
        - expiry ... will be outdated. purpose of application is tailoring, so this doesn't matter.
        - original_listed ... same as above
        - closed_time ... same as above
        - application_type ... not interesting info for resume builder
        - listed_time ... same as outdated above
        - posting_domain ... not interesting info for resume builder
        - currency ... pretty much all US
        - compensation_type ... not many options here
        - med_salary ... 50% missing and not that interesting
        - skills_desc ... 98% missing. Should use string detects to make new column for this(?)
"""

## 1. Select columns to keep 
rawClean1 = rawData.drop(columns = ["zip_code", "fips", "views", "applies", "application_url",
                                    "expiry", "original_listed_time", "closed_time", "application_type", 
                                    "listed_time", "posting_domain", "currency", "compensation_type",
                                    "med_salary", "skills_desc"])

## 2. View sample of cleaned data
sample2 = rawClean1.sample(200)

## 3. Remove jobs without company name or description... 1% or less missing, so not a big deal
rawClean2 = rawClean1.dropna(subset = ["company_name", "description"])

## 4. Missing Data Updated
jobMissing = rawClean2.isnull().sum()/123849 # divide to get %

"""
Cols with missing data:
    - max_salary ... 0.749
    - pay_period ... 0.698
    - min_salary ... 0.749
    - remote_allowed ... 0.866
    - formatted_experience_level ... 0.225
    - normalized salary ... 0.698
    
Impact on Web Application:
    - We will need to make a note if user filters by these columns that not all postings will show if 
    - (cont) these values are not included in description
    
    - We could also not make all of these filter options. This way we could just print information like so:
        - Salary: # if provided, else "See URL for more information" OR "not provided"
          Remote: Yes/No if provided, else ^^^
          etc.
"""

## 5. Clean to focus on CS-related job titles
CS_jobs = ["analyst", "software", "ML", "engineer", "programmer", "scientist", "data", "frontend", "backend",
           "UI", "UX", "IT", "database", "machine learning", "data science", "Java", "Javascript", "SQL",
           "Developer", "Web", "interface", "security analyst", "cyber", "network", "systems", "AWS", "AI", 
           "artificial intelligence", "swe", "computer", "business intelligence"]

pattern = "|".join([f"\\b{word}\\b" for word in CS_jobs])  

rawClean3 = rawClean2[rawClean2['title'].str.contains(pattern, case=False, na=False, regex=True)]


## 6. Simplify for Job Schema
rawClean4 = rawClean3.drop(columns=['job_id', 'max_salary', 'pay_period', 'company_id', 'min_salary', 
                                    'formatted_work_type', 'remote_allowed', 'formatted_experience_level',
                                    'sponsored','work_type', 'normalized_salary'])


## 7. Save cleaned data (02/26/2025)
rawClean3.to_csv("/Users/areuschel/Desktop/COMP424/Resume/data/jobs_cleaned_02-26.csv")


# Import libraries for DB connection
import pymongo
from pymongo import MongoClient



# Connection to MongoDB - Data Store

### NOTE: this needs to be updated. code below is an old connection to a db I had
#         will test this once we build connection to web app

"""
# Create connection (get connection string in Atlas) 
client = MongoClient("mongodb+srv://areuschel:Lab24work!@hw453.nvbzd.mongodb.net/?retryWrites=true&w=majority&appName=HW453")

# Test connection
db = client.sample_airbnb
"""

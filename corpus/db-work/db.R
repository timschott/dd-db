### Load DDDB. ###

library("mongolite")
library("dotenv")

## load creds from .env
load_dot_env()

url_path = Sys.getenv("MONGO_URI")

## test, make sure connec is working 

logomancing_db <- mongo(collection = "words", # table
                  db = "fun-words", # db
                  url = url_path, 
                  verbose = TRUE)

print(logomancing_db)

logomances <- logomancing_db$find(query = '{}')

## great

## now, connect to new db and load data. 





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

## connect to new db

dd_db <- mongo(collection = "texts", # table
                        db = "dddb", # db
                        url = url_path, 
                        verbose = TRUE)


print(dd_db)

## load texts

americana <- scan("../txts(cleaned)/Americana.txt",what="character",sep="\n")

whitenoise <- scan("../txts(cleaned)/WhiteNoise.txt",what="character",sep="\n")

libra <- scan("../txts(cleaned)/Libra.txt",what="character",sep="\n")

## for each text, create a json block for each paragraph and load into db. 


 




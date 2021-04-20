### Load DDDB. ###

library("mongolite")
library("dotenv")

## load creds from .env
load_dot_env()

url_path = Sys.getenv("MONGO_URI")

## connect to DDDB

dd_db <- mongo(collection = "texts", # Creating collection
                         db = "dddb", # Creating DataBase
                         url = url_path, 
                         verbose = TRUE)

## load texts

americana <- scan("../txts(cleaned)/Americana.txt",what="character",sep="\n")

whitenoise <- scan("../txts(cleaned)/WhiteNoise.txt",what="character",sep="\n")

libra <- scan("../txts(cleaned)/Libra.txt",what="character",sep="\n")

## for each text, load each paragraph into dataframe and then just mass-insert that

## following columns:

# fake id
# content
# book
# dialogue

libra_content <- libra

# fill dialogue vec

libra_dialogue_vec <- c(0)

for (i in 1:length(libra_content)) {
  if (grepl('\"', libra[i]) == TRUE) {
    libra_dialogue_vec[i] = 1
  } else {
    libra_dialogue_vec[i] = 0
  }
}

libra_book <- rep("Libra", length(libra_content))
libra_para_counter <- seq(1, length(libra_content))
libra_fake_id <- paste0("Libra_",libra_para_counter)

libra_para_matrix <- cbind(libra_fake_id, libra_content, libra_dialogue_vec, libra_book)

libra_para_df <- as.data.frame(libra_para_matrix, stringsAsFactors = FALSE)
colnames(libra_para_df) <- c("FakeID", "Content", "Dialogue", "Book")

## commit this to db and see how it looks.

dd_db$insert(libra_para_df)
# Complete! Processed total of 4743 rows.




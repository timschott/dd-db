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

## LIBRA

libra_content <- libra

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

## WHITE NOISE 

white_noise_content <- whitenoise

white_noise_dialogue_vec <- c(0)

for (i in 1:length(white_noise_content)) {
  if (grepl('\"', white_noise_content[i]) == TRUE) {
    white_noise_dialogue_vec[i] = 1
  } else {
    white_noise_dialogue_vec[i] = 0
  }
}

white_noise_book <- rep("WhiteNoise", length(white_noise_content))
white_noise_para_counter <- seq(1, length(white_noise_content))
white_noise_fake_id <- paste0("WhiteNoise_",white_noise_para_counter)

white_noise_para_matrix <- cbind(white_noise_fake_id, white_noise_content, white_noise_dialogue_vec, white_noise_book)

white_noise_para_df <- as.data.frame(white_noise_para_matrix, stringsAsFactors = FALSE)
colnames(white_noise_para_df) <- c("FakeID", "Content", "Dialogue", "Book")

dd_db$insert(white_noise_para_df)
# Complete! Processed total of 3283 rows.

## AMERICANA 

americana_content <- americana

americana_dialogue_vec <- c(0)

for (i in 1:length(americana_content)) {
  if (grepl('“|”', americana_content[i]) == TRUE) {
    americana_dialogue_vec[i] = 1
  } else {
    americana_dialogue_vec[i] = 0
  }
}

americana_book <- rep("Americana", length(americana_content))
americana_para_counter <- seq(1, length(americana_content))
americana_fake_id <- paste0("Americana_",americana_para_counter)

americana_para_matrix <- cbind(americana_fake_id, americana_content, americana_dialogue_vec, americana_book)

americana_para_df <- as.data.frame(americana_para_matrix, stringsAsFactors = FALSE)
colnames(americana_para_df) <- c("FakeID", "Content", "Dialogue", "Book")

dd_db$insert(americana_para_df)
# Complete! Processed total of 2602 rows.


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# UTILITY FUNCTIONS
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Collapse a vector to a regex separated by "OR": --------------
collapse_regex_or <- function(key_list) {
  keystr <- paste(key_list, collapse = "|")
  return(keystr)
}


# Word tokenizer: -----------------------------------------------
word_tokenizer <- function(txt) {
  
  # console.log(txt);
  # Define abbreviations and replace the point temporarily:
    abbrevs <- c("mind", "z.B", "etc", "oä", "bzw");
    txt <- gsub(paste0("(?<=", collapse_regex_or(abbrevs), ")(\\.)"), "xABBREVx", txt,
                perl = TRUE)
      
    
    # Split the text into its tokens:
      txtsplt <- txt
      
      # Handle those followed by space or quotes:
      txtsplt <- gsub("([.,;?!:])(?=[\\s\"'\\x{2018}\\x{2019}\\x{201c}\\x{201d}?])", 
                      " \\1 ", txtsplt, perl = TRUE)
      # Also address those followed by  line end!
      txtsplt <- gsub("([.,;?!:])(?=$)", 
                      " \\1 ", txtsplt, perl = TRUE)
      txtsplt <- gsub("([)])", 
                      " \\1 ", txtsplt, perl = TRUE)  # space before any parenthesis.
      txtsplt <- gsub("([(\"'\\x{2018}\\x{2019}\\x{201c}\\x{201d}])",  # space before quotes.
                      " \\1 ", txtsplt, perl = TRUE)
      
      txtsplt <- strsplit(txtsplt, "[\\s\\x{2022}]", perl = TRUE)

      # Replace abbreviation points:
      out <- gsub("xABBREVx", ".", txtsplt[[1]])  # re-replace the point.

    # console.log("Token split");
    # console.log(split);

    # Remove empty tokens and punctuation:
    # const clean_split = split.replace(/(?<!\W)[.,/#!$%^&*;:{}=_`~()](?!\W)/g,"");
    # Remove punctuation that is not within words.
    # Punctuation list: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
               # return split.filter(x => !/(?<!\w)[.,/#!$%^&*;:{}=_`~()](?!\w)/g.test(x));
    return(out[nchar(out) > 0])
}




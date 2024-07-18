# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# MAIN FUNCTIONS
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Unicode characters for quotes:
ucode_quotes <- c("\\x{2018}", "\\x{2019}", "\\x{201c}", "\\x{201d}", "\\x{201e}")

# Function to create token data: -----------------------
get_token_data <- function(txt) {
  
  txt <- gsub('"', "\\\"", txt)  # escape quotes.
  
  # TODO: Improve handling of quotes!
  
  text_tokens = word_tokenizer(txt)  # Define the text as word and punctuation tokens.
  # console.log(text_tokens);  # for testing.

  # get paragraphs:
  # print("PARAGRAPHS");
  paragraph_array <- gregexpr("\\n\\n", txt, perl = TRUE)[[1]]
  
  # Initialize values:
  tpos_end <- 0
  sentence_id <- 0
  cur_paragraph_id <- 0
  
  token_info <- c()
  
  for(token_i in text_tokens){
    # if(token_i %in% c("\\n\\*", ".", ":", ";", ",", "?", "!", "(", ")", "\"", "'", "/", "\\-", 
    #                   ucode_quotes
    #                   ) |
    #    grepl("\\++", token_i)){
    if(token_i %in% c("\\n\\*", ".", ":", ";", ",", "?", "!", "(", ")", "\"", "'", "/", "\\-") |
         grepl(collapse_regex_or(c(ucode_quotes, "\\++")), token_i)){
      
      # Escape and add lookahead or behind.
      if (token_i %in% c("(", ")")) {
        token_pat <- gsub("([.?()/])", "\\\\\\1", token_i)
      } else if (token_i %in% c("\"", "'", ucode_quotes)) {
        token_pat = token_i  # no requirement to escape?
      } else {
        token_pat = paste0(gsub("([.?()/+\\-])", "\\\\\\1", token_i), 
                           "(?=\\s|\\n|$|\\.|,|-|[\"'", paste0(ucode_quotes, collapse = ""), "])")
      }
      
    } else {
      token_pat <- paste0("(?<!\\w)", token_i, "(?!\\w)")
    }
    
    cur_rex <- gregexpr(token_pat, txt, perl = TRUE)
    
    # Get position information (start, length):
    pos_info <- rbind(cur_rex[[1]], attr(cur_rex[[1]], "match.length"))
    pos_info <- cbind(pos_info[, pos_info[1,] > tpos_end])[,1]  # get rid of past entries.
    
    print(token_i)
    print(tpos_end)
    print(pos_info)
    
    substr(txt, 365, 366)
    
    # TODO: at "insgesamt" it goes wrong
    
    
    # Extract info:
    tpos_start <- pos_info[1]
    tpos_end <- sum(pos_info) - 1

    # Assign sentence ID:
    sentence_id <- sentence_id + token_i %in% c("?", ".", "!", ";")
      # increment the id when a punctuation token is found
    
    # Assign paragraph ID:
    if(all(paragraph_array != -1)){
      if (pos_info[1] > paragraph_array[cur_paragraph_id + 1]) {
        cur_paragraph_id <- cur_paragraph_id + 1
      }  # increment the id when a punctuation token is found 
    }


    token_info <- rbind(token_info, c(token_i, tpos_start, tpos_end, 
                                      sentence_id, cur_paragraph_id))
    
  }
 
  return(data.frame(token_info))
}
  
  

# Function to extract regex matches and their positions from a text: -----------------
  get_regex_matches <- function(txt, regexp) {
    # Initialize an empty list to store matches
    arr_out <- list()
    
    # Find all matches using regexpr
    matches <- gregexec(regexp, txt, perl = TRUE)
    dimlist <- unlist(dimnames(matches[[1]]))
    type <- dimlist[dimlist > 0]
    match_pos <- matches[[1]][type,]  # TODO: Does this always work?
    match_lens <- attr(matches[[1]], "match.length")[type,]
    matchlist <- regmatches(txt, matches)[[1]][type,]
    
    for (i in seq_along(matchlist)) {
      match <- matchlist[i]
      if (nchar(match) > 0) {
        # Extract the matched text
        curmatch <- list(
          type = type,
          match = match,
          start_end = c(match_pos[i], match_pos[i] + match_lens[i])
        )
        arr_out[[i]] <- curmatch
      }
    }
    
    return(arr_out)
  }

  get_regex_matches(tsttxt, regex_perc)
  
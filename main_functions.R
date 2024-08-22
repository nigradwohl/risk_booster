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
  # print(text_tokens);  # for testing.

  # get paragraphs:
  # print("PARAGRAPHS");
  paragraph_array <- c(gregexpr("\\n\\n", txt, perl = TRUE)[[1]], nchar(txt))
  
  # Initialize values:
  tpos_end <- 0
  sentence_id <- 0
  cur_paragraph_id <- 0
  
  token_info <- data.frame()
  
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
      } else if (token_i %in% c("\"", "'") | grepl(collapse_regex_or(ucode_quotes), token_i)) {
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
    
    # cat(token_i, "\n")
    # print(pos_info)
    # 
    # substr(txt, 365, 366)
    
    # Extract info:
    tpos_start <- pos_info[1]
    tpos_end <- sum(pos_info) - 1
    
    # print(tpos_end)  # final positions. 

    # Assign sentence ID:
    sentence_id <- sentence_id + token_i %in% c("?", ".", "!", ";")
      # increment the id when a punctuation token is found
    
    # Assign paragraph ID:
    if(all(paragraph_array != -1)){
      if (pos_info[1] > paragraph_array[cur_paragraph_id + 1]) {
        cur_paragraph_id <- cur_paragraph_id + 1
      }  # increment the id when a punctuation token is found 
    }


    token_info <- rbind(token_info, data.frame(token = token_i, 
                                      start = tpos_start, end = tpos_end, 
                                      sent = sentence_id, par = cur_paragraph_id, is_num = grepl("\\d", token_i) ))
    
  }
  
  token_info <- cbind(id = 1:nrow(token_info), token_info)
  
  return(data.frame(token_info))
}
  
  

# Function to extract regex matches and their positions from a text: -----------------
  get_regex_matches <- function(regexp, txt) {
    # Initialize an empty list to store matches
    arr_out <- list()
    
    # Find all matches using regexpr
    matches <- gregexec(regexp, txt, perl = TRUE)
    dimlist <- unlist(dimnames(matches[[1]]))
    type <- dimlist[dimlist > 0]
    
    if(!is.null(type)){
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
    }
    
    
    return(arr_out)
  }

  # get_regex_matches(tsttxt, regex_perc)
  
# Detect matches defined in an object in a regular expression. ----------------
# TODO
  # For testing:
  # check_dict <- check_numbers_dict
  # token_dat <- token_data
  detect_regex_match <- function(txt, token_dat, check_dict){
    

    # get all matches:
    arr_match <- unlist(sapply(check_dict, get_regex_matches, txt = txt), recursive = FALSE)
    
    
    # Connect matches to token data:
    token_match <- NA
    match_type <- NA
    
    dropvec <- c()
    
    # curmatch <- arr_match[[2]]  # for testing.
    
    # TODO: Loop?
    for(i in 1:length(arr_match)){
      
      curmatch <- arr_match[[i]]
      
      match_start <- token_dat$start >= curmatch$start_end[1] & token_dat$start < curmatch$start_end[2]
      match_end <- token_dat$end <= (curmatch$start_end[2] - 1) & token_dat$end > curmatch$start_end[1]
      
      match_pos <- match_start | match_end
    
      
      # If one of the indices can be found:
      if(any(match_start) | any(match_end)){
        
        if(!any(match_end)){match_end <- match_start}
        if(!any(match_start)){match_start <- match_end}
        
        # n_ele  # NEEDED?
        
        cur_type <- curmatch$type  # define current type.
        
        # Check if the match has been defined already:
        if(all(is.na(match_type[range(which(match_pos))]))){
          
          # Establish new match:
          token_match[match_pos] <- i  # match_id.
          match_type[match_pos] <- cur_type  # cur_type.
          
        } else if(!curmatch$type %in% c("unknown", "ucarryforward", "ucarryback")){
          
          dropvec <- c(dropvec, i)  # flag for dropping.
          prev_ix <- token_match[which(match_pos)[1]]
          prev_type <- arr_match[prev_ix[1]]$type
          
          
          precedence_list <- c("nyear", "age")  # define precedence.
          
          # Add the match:
          if(!is.na(prev_ix)){
            # prev_ix = Array.isArray(prev_ix) ? prev_ix : [prev_ix];
            
            token_match <- list(c(token_match, i))
            
            # Handle precedence:
            if(which(precedence_list == cur_type) < which(precedence_list == prev_type)){
              token_match[prev_ix[1]]$type <- cur_type
            } else {
              cur_type <- prev_type
            }  # eof. precedence.
            
          }
          
        } else {
          dropvec <- c(dropvec, i)  # flag for dropping.
        }
        
      }
      
    }
    
    # Remove the indices that have to be dropped:
    arr_match <- arr_match[-dropvec]
    
    # Sort the array by the starting position of each match:
    arr_match <- arr_match[order(sapply(arr_match, `[[`, "start_end")[1,])]
    

    return(list(arr_match = arr_match, match_id = token_match, match_type = match_type))
    
    
    
  }
  
  
# Function to detect topic in text: -------------------------------------------
  detect_topic <- function(tokens, key_list){
    
    token_str <- paste0(tokens, collapse = "_")  # collapse all tokens.
    
    # One subarray of key_list must be met:
    # e.g., ["Schutzwirkung"], ["Ansteckungsgefahr", "nur"], ["besser", "geschützt"]
    # key_list <- list(c("Schutzwirkung"), c("Ansteckungsgefahr", "nur"), c("besser", "geschützt"))
    
    
    topic_present <- any(sapply(key_list, FUN = function(sublist) {
      all(sapply(sublist, FUN = grepl, token_str, perl = TRUE))
      }))

    return(topic_present)
    
    
  }
  
  
# Function to get additional unit info from token data: ----------------------
  # Funktion zur Erkennung zusätzlicher Einheitendaten aus den Token-Daten
  # Function to detect additional unit information from token data
  detect_unit <- function(token_data) {
    # Check if 'is_num' column exists, if not add it
    if (!"is_num" %in% colnames(token_data)) {
      stop("Token data is missing the 'is_num' column.")
    }
    
    # Check if 'unit' column exists, if not initialize it
    if (!"unit" %in% colnames(token_data)) {
      token_data$unit <- rep(NA, nrow(token_data))
    }
    
    # Initialize unit info
    unit_info <- ifelse(is.na(token_data$unit), rep(NA, nrow(token_data)), token_data$unit)
    
    # Define unit lookup patterns
    unit_lookup <- list(
      list(pattern = "%|[Pp]rozent\\w*", unit = "perc"),  # Percentages
      list(pattern = "[Tt]eilnehm|[Ff][aä]ll|[Ii]nfektion|Proband|Person|Mensch|Kind|Mädchen|Junge|Männer|Frauen|Verl[aä]uf|Erwachsen|[Ii]nfizierte|Patient", unit = "freq")  # Frequencies
    )
    
    # Helper function to count consecutive values
    count_reps <- function(array) {
      result <- numeric()
      begins <- numeric()
      counter <- 1
      for (i in seq_along(array)) {
        if (i < length(array) && array[i] == array[i + 1]) {
          counter <- counter + 1
        } else {
          result <- c(result, rep(counter, counter))
          begins <- c(begins, rep(i - counter + 1, counter))
          counter <- 1
        }
      }
      list(counts = result, begins = begins)
    }
    
    # Loop through the rows of token_data
    for (ix_tok in seq_len(nrow(token_data))) {
      if (token_data$is_num[ix_tok]) {
        cur_token <- token_data$token[ix_tok]
        
        # Check adjacent tokens for unit patterns
        for (ix_nxt in ix_tok:min(ix_tok + 3, nrow(token_data))) {
          nxt_token <- token_data$token[ix_nxt]
          
          # Check for matches
          cur_info <- sapply(unit_lookup, function(x) {
            if (grepl(x$pattern, nxt_token)) x$unit else NA
          })
          cur_info <- cur_info[!is.na(cur_info)]
          
          if (length(cur_info) > 0 && (is.na(unit_info[ix_tok]) || unit_info[ix_tok] == "unknown")) {
            # Update unit info
            n_ele <- ix_nxt - ix_tok + 1
            unit_info[ix_tok:(ix_tok + n_ele - 1)] <- rep(cur_info[1], n_ele)
          }
        }
        
        # Handle unknown cases
        if (is.na(unit_info[ix_tok])) {
          unit_info[ix_tok] <- "unknown"
        } else if (unit_info[ix_tok] == "ucarryforward") {
          n_reps <- count_reps(unit_info)
          prev_info <- unit_info[seq_len(ix_tok - 1)]
          prev_units <- prev_info[!is.na(prev_info) & prev_info != "ucarryforward"]
          
          if (length(prev_units) > 0) {
            unit_info[n_reps$begins[ix_tok]:(n_reps$begins[ix_tok] + n_reps$counts[ix_tok] - 1)] <- rep(prev_units[length(prev_units)], n_reps$counts[ix_tok])
          } else {
            unit_info[n_reps$begins[ix_tok]:(n_reps$begins[ix_tok] + n_reps$counts[ix_tok] - 1)] <- rep("unknown", n_reps$counts[ix_tok])
          }
        }
      }
    }
    
    return(unit_info)
  }
  
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
                                               sent = sentence_id, par = cur_paragraph_id ))
    
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
    
    for (i in 1:length(matchlist)) {
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
  
  # Get all matches:
  arr_match <- unlist(sapply(check_dict, get_regex_matches, txt = txt), recursive = FALSE)
  
  # Check if arr_match is empty
  if (length(arr_match) == 0) {
    return(list(arr_match = list(), match_id = NA, match_type = NA))
  }
  
  # Initialize
  token_match <- rep(NA, length(arr_match))  # Initialize with NA
  match_type <- rep(NA, length(arr_match))    # Initialize with NA
  dropvec <- integer()
  
  for(i in 1:length(arr_match)){
    
    curmatch <- arr_match[[i]]
    match_start <- token_dat$start >= curmatch$start_end[1] & token_dat$start < curmatch$start_end[2]
    match_end <- token_dat$end <= (curmatch$start_end[2] - 1) & token_dat$end > curmatch$start_end[1]
    match_pos <- match_start | match_end
    
    if(any(match_start) | any(match_end)){
      
      if(!any(match_end)){ match_end <- match_start }
      if(!any(match_start)){ match_start <- match_end }
      
      cur_type <- curmatch$type
      cat("Unit is:") 
      print(cur_type)
      
      if(all(is.na(match_type[match_pos]))){
        token_match[match_pos] <- i
        match_type[match_pos] <- cur_type
      } else if(!curmatch$type %in% c("unknown", "ucarryforward", "ucarryback")){
        
        dropvec <- c(dropvec, i)
        prev_ix <- token_match[which(match_pos)[1]]
        if (!is.na(prev_ix)) {
          prev_type <- arr_match[[prev_ix]]$type
          
          precedence_list <- c("nyear", "age")
          cur_precedence <- which(precedence_list == cur_type)
          prev_precedence <- which(precedence_list == prev_type)
          
          if (length(cur_precedence) == 0) cur_precedence <- Inf
          if (length(prev_precedence) == 0) prev_precedence <- Inf
          
          if (cur_precedence < prev_precedence) {
            token_match[prev_ix] <- i
            match_type[prev_ix] <- cur_type
          } else {
            cur_type <- prev_type
          }
        }
        
      } else {
        dropvec <- c(dropvec, i)
      }
      
    }
    
  }
  
  dropvec <- as.integer(dropvec)
  arr_match <- arr_match[-dropvec]
  
  start_positions <- sapply(arr_match, function(x) x$start_end[1])
  arr_match <- arr_match[order(start_positions)]
  
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


library(stringr)
add_number_info <- function(token_dat) {
  
  
  is_num <- grepl("\\d", token_dat$token) | 
    (grepl(collapse_regex_or(numwords), token_dat$token, perl = TRUE) & !is.na(token_dat$unit))
  token_dat$is_num <- is_num
  return(token_dat)
}

# Function to get additional unit info from token data: ----------------------

# Function to detect additional unit information from token data
detect_unit <- function(token_data) {
  # Check if 'is_num' column exists, if not add it
  if (!"is_num" %in% colnames(token_data)) {
    add_number_info(token_dat)
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
      if (i < length(array) && !is.na(array[i]) && !is.na(array[i + 1]) && array[i] == array[i + 1]) {
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
  
# Function to detect the type of each number by using its unit and additional context information ------------------
  detect_number_type <- function(token_data, txt, numtype_dict) {
    
    if (!"is_num" %in% colnames(token_data)) {
      token_dat$unit <- detect_unit()
    }
 
    
    num_types <- rep(NA, nrow(token_data))
    
    # Also check for topics?
    sentence_set <- unique(token_data$sent)
    sentence_counts <- table(token_data$sent)
    
    # Include topic-specific keywords:
    if ("impf" %in% token_data$topics) {
      # Include Impf-specific keys
      numtype_dict$decr$keyset <- c(numtype_dict$decr$keyset, keyset_impf)
    }
    
    # Define the regex pattern
    relation_dict <- list(
      treatre_pre = "(\\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,3}(auf die|unter den) ([a-zA-ZÄÖÜßäöü]+ ){0,2}geimpften (Proband\\w+|Teilnehm\\w+|Kind\\w+|Behandelt))",
      controlrel_pre = "\\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,3}(in der|unter den (Teilnehme\\w+ |Proband\\w+){,2} der|auf die (Teilnehme\\w+ |Proband\\w+){,2}) (Kontroll|Placebo|Vergleichs)-?[Gg]ruppe",
      treatre_post = "(auf die|unter den) ([a-zA-ZÄÖÜßäöü]+ ){0,2}(geimpften|behandelten) (Proband\\w+|Teilnehm\\w+) ([a-zA-ZÄÖÜßäöü]+ ){1,2}\\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,2}",
      treatre_post2 = "(auf die|unter den) ([a-zA-ZÄÖÜßäöü]+ ){0,2}(Behandelt\\w+) ([a-zA-ZÄÖÜßäöü]+ ){1,2}\\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,2}",
      controlrel_post1 = "(auf die|unter den) (Teilnehme\\w+ |Proband\\w+){,2} ([a-zA-ZÄÖÜßäöü]+ ){1,2}(Kontroll|Placebo|Vergleichs)-?[Gg]ruppe ([a-zA-ZÄÖÜßäöü]+ ){1,2}\\d+ ([a-zA-ZÄÖÜßäöü]+ ){0,2}",
      controlrel_post2 = "in der (Kontroll|Placebo|Vergleichs)[- ]?[Gg]ruppe ([a-zA-ZÄÖÜßäöü]+ ){1,2}\\d+( [a-zA-ZÄÖÜßäöü]+){0,2}"
    )
    
    
    ref_matches <- detect_regex_match(txt, token_data, relation_dict)
    
    
    prev_token <- 0
    num_types <- rep("other", length(token_data$id))  # Initialize num_types with default value
    
    for (key in names(sentence_counts)) {
      value <- sentence_counts[[key]]
      
      # Get tokens in sentence:
      final_token <- prev_token + value  # Get the final token of the sentence
      
      # Extract relevant slices of token data
      token_ids <- token_data$id[(prev_token + 1):final_token]
      num_info <- token_data$is_num[(prev_token + 1):final_token]
      
      # Only continue if any numbers are present:
      if (any(num_info)) {
        
        sentence_tokens <- token_data$token[(prev_token + 1):final_token]
        sentence_units <- token_data$unit[(prev_token + 1):final_token]
        
        # Get positions of numbers
        # cat("Number positions\n")
        num_array <- token_ids[num_info]
        # print(num_array)
        
        for (num in num_array) {
          curnum_id <- which(token_data$id == num)  # Get global ID of current number in sentence
          numtype <- "other"
          
          # Check for type
          for (key in names(numtype_dict)) {
            value <- numtype_dict[[key]]
            
            if (token_data$unit[curnum_id] %in% value$number_unit) {
              keyset <- value$keyset
              
              keys_present <- sapply(keyset, function(keylist) {
                all(sapply(keylist, function(keyex) {
                  any(sapply(sentence_tokens, function(token) grepl(keyex, token)))
                }))
              })
              
              if (any(keys_present)) {
                numtype <- key
              }
            }
          }
          
          # Check number if numtype remained other
          if (numtype == "other") {
            if (length(ref_matches$match_type) >= num && length(ref_matches$match_type[[num]]) > 0) {
              numtype <- ref_matches$match_type[[num]]
            }
          }
          
          # Assign the numtype to the corresponding number token
          num_types[curnum_id] <- numtype
          
          # Debugging Info
          # cat("Debugging Info:\n")
          # cat("Global num index (num):", num, "\n")
          # cat("curnum_id:", curnum_id, "\n")
          # cat("Sentence tokens:", paste(sentence_tokens, collapse=", "), "\n")
          # cat("Current numtype:", numtype, "\n\n")
        }
      }
      
      # Update last token
      prev_token <- final_token
    }
    
    # OUTPUT
    # print("Output numtypes:")
    # print(num_types)
    return(num_types)
  }
  
# Function to investigat a context window around numbers or other entities --------------
  investigate_context <- function(token_data, index_arr, keyset, only_pars = TRUE) {
    
    # Initialize context info vector
    context_info <- rep(NA, nrow(token_data))  # equivalent to Array(token_data.nrow).fill(-1)
    
    # Convert keyset to regex patterns
    keyset <- lapply(keyset, function(keys) {
      paste0("\\b(", paste(keys, collapse = "|"), ")\\b")
    })
    
    # Get paragraph min and max
    # Initialisiere par_minmax basierend auf token_data
    par_minmax <- tapply(1:nrow(token_data), token_data$par, range)
    # print(par_minmax)
    
    # Define sentence end tokens
    sentence_end_tokens <- c("\n", ".", "?", "!", ":")
    
    for (token_ix in index_arr) {
      
      # Prepare the window
      testcounter <- 0
      
      # Define the maximum range for the window
      min_start <- 1
      max_end <- nrow(token_data)
      
      if (only_pars) {
        curpar <- token_data$par[token_ix]
        min_start <- par_minmax[[as.character(curpar)]][1]
        max_end <- par_minmax[[as.character(curpar)]][2]
      }
      
      lock_start <- token_ix
      lock_end <- token_ix + 2
      
      numberfeats <- character()
      key_info <- list()
      
      stop_tokens <- c("\n", ".", "?", "!", ":", "und", ";", "–", ",", "oder", "-")
      stop_token_start <- FALSE
      stop_token_end <- FALSE
      stop_update_count <- 0
      
      description_complete <- FALSE
      
      window_start <- token_ix
      window_end <- token_ix
      
      
     
      
      
      while (!description_complete && (lock_start > min_start || lock_end < max_end)) {
        
        # Check if stop token is a sentence end token
        is_sentence_end_end <- token_data$token[window_end] %in% sentence_end_tokens
        
        if (is_sentence_end_end) {
          while (window_start > lock_start) {
            window_start <- window_start - 1
            if (token_data$token[window_start] %in% stop_tokens) {
              stop_token_start <- TRUE
              break
            }
          }
        } else {
          while (window_start > lock_start) {
            window_start <- window_start - 1
            if (token_data$token[window_start] %in% stop_tokens) {
              stop_token_start <- TRUE
              break
            }
          }
          
          while (window_end < lock_end) {
            window_end <- window_end + 1
            if (token_data$token[window_end] %in% stop_tokens) {
              stop_token_end <- TRUE
              break
            }
          }
        }
        
        # Extract tokens in the current window
        test_tokens <- token_data$token[window_start:window_end]
        test_str <- paste(test_tokens, collapse = "_")
        
        # Test the tokens here
        for (key in names(keyset)) {
          pattern <- keyset[[key]]
          if (grepl(pattern, test_str, perl = TRUE)) {
            if (!(key %in% numberfeats)) {
              key_info[[key]] <- list(
                positions = gregexpr(pattern, test_str, perl = TRUE)[[1]], 
                stop_update_count = stop_update_count,
                testcounter = testcounter
              )
            }
            numberfeats <- unique(c(numberfeats, key))
          }
        }
        
        lock_start <- if (!stop_token_start && lock_start > min_start) lock_start - 1 else lock_start
        lock_end <- if (!stop_token_end && lock_end < max_end) lock_end + 1 else lock_end
        
        if (is_sentence_end_end || (stop_token_start && stop_token_end) || 
            (stop_token_end && lock_start == min_start) || 
            (stop_token_start && lock_end == max_end)) {
          stop_tokens <- head(stop_tokens, -1)
          stop_token_start <- token_data$token[window_start] %in% stop_tokens
          stop_token_end <- token_data$token[window_end] %in% stop_tokens
          stop_update_count <- stop_update_count + 1
        }
        
        if (length(numberfeats) > 0 && stop_update_count > 2) {
          description_complete <- TRUE
          if (length(numberfeats) > 1) {
            numberfeats <- setdiff(numberfeats, "all")
          }
        }
        
        if (testcounter > 50 || (lock_end == max_end && lock_start == min_start)) {
          description_complete <- TRUE
          numberfeats <- unique(c(numberfeats, "unknown"))
        }
        
        testcounter <- testcounter + 1
      }
      
      # Assign the information to the data
      context_info[token_ix] <- paste(numberfeats, collapse = ",")
    }
    
    return(context_info)
  }
  
  
  
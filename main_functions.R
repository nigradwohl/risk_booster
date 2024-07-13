# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# MAIN FUNCTIONS
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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
  
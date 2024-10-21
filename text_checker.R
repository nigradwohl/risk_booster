# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# TRANSLATED TEXT-CHECKER
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


# An initial testtext:
# tsttxt <- " Die Einreichung basiert auf einem 95 %igen Impfschutz (p<0.0001) in Probanden ohne vorherige SARS-CoV-2-Infektion (erstes Hauptziel der Studie), wie die Phase-3-Studie zeigte. Auch in Probanden mit oder ohne vorheriger SARS-CoV-2-Infektion konnte ein Impfschutz erreicht werden (zweites Hauptziel der Studie). In beiden Fällen wurde der Impfschutz sieben Tage nach Verabreichung der zweiten Dosis erzielt. Die Wirksamkeit des Impfstoffs war über alle Alters- und Geschlechtsgruppen und die gesamte diverse Studienpopulation hin konsistent. Der Impfschutz bei Erwachsenen über 65 Jahren lag bei über 94 %. Die Abschlussanalyse des ersten Hauptziels der Studie wurde nach 170 bestätigten COVID-19-Fällen durchgeführt. Insgesamt wurde der Impfstoff in der Studie gut vertragen und das Data Monitoring Committee (DMC) konnte bisher keine schwerwiegenden Nebenwirkungen feststellen. 41 % der weltweiten Studienteilnehmer und 45 % der amerikanischen Studienteilnehmer sind im Alter von 56 bis 85 Jahren."


tsttxt <- "Ein Junge ist krank."


# Get other scripts: -----------------------------
source("util_funs.R")
source("modifyable_defintions.R")
source("main_functions.R")




# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# --------- TEXT INPUT AND PRE-PROCESSING --------
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# TODO: Get the text from HTML! 

test_text <- function(txt){
  
  cat("Raw text:\n")
  cat(jsonlite::toJSON(txt, auto_unbox = TRUE), "\n")
  
  # Get spaces before bullet points, not preceded by a fullstop and add the fullstop.
  inputText <- gsub("(?<![.?!;])\\s\u{2022}", ". \u{2022}", txt, perl = TRUE)
  inputText <- gsub("\\.\\n\\.", ".\n\n", inputText)  # Replace stray changes.
  
  # Check if the text ends with a punctuation mark, and if not, add a full stop.
  if (!grepl("[.?!;]$", inputText)) {
    inputText <- paste0(inputText, ".")
  }
  
  cat("Pre-processed text:\n")
  cat(jsonlite::toJSON(inputText, auto_unbox = TRUE), "\n")
  

  input_txt <- inputText
  
  token_dat <- get_token_data(input_txt)
  
  # TODO: How to save the modifyiable defintions?
  modifyiable_defs <- list(
    units_exc = units_exc,
    check_numbers_dict = check_numbers_dict,
    window_keys = window_keys,
    numtype_keyset = numtype_keyset
  )
  
  
  
  # Text-level: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # Detect topics: ------------
  # Topic list in R should match Java:
  topic_list <- list(
    impf = "(?<!gl|sch)[Ii]mpf",
    mask = "Maske|FFP",
    protect = list(
      c("Schutzwirkung"), c("Ansteckungsgefahr", "nur"), c("besser", "geschützt")
    ),
    lower_risk = list(
      c("mindern", "Risiko"), c("schützen", "Schutz"), c("Infekt", "Ansteck")
    ),
    cancer_risk = c("[Rr]isiko", "Krebs"),
    drug = list(
      c("[Mm]edikament", "Krebs"), c("[Mm]edikament", "wirk")
    ),
    lifex = "Lebenserwartung"
  )
  
  
    # Assign to main object attribute:
    attr(token_dat, "topics") <- names(topic_list)[sapply(topic_list, 
                                                    FUN = function(top){detect_topic(token_dat$token, top)})]
    
  
  if (!"lifex" %in% attr(token_dat, "topics")) {
    modifyiable_defs$check_numbers_dict <- with(modifyiable_defs,
         check_numbers_dict[names(check_numbers_dict) != "yearnum"]
         )
    # modifyiable_defs$check_numbers_dict <- modifyiable_defs$check_numbers_dict[names(modifyiable_defs$check_numbers_dict) != "yearnum"]
    # If no life-expectancy is discussed, remove numbers of years.
  } else {

    modifyiable_defs$units_exc <- with(modifyiable_defs,
         units_exc <- units_exc[units_exc != "age"]
         # show age, when it comes to life expectancy.
    )
  }
  
  
  # Get regex-based matches: -------
    # uses: check_dict <- modifyiable_defs$check_numbers_dict
    regex_matches <- detect_regex_match(input_txt, token_dat, modifyiable_defs$check_numbers_dict)
    token_dat$match <- regex_matches$match_id
    token_dat$unit <- sapply(regex_matches$match_type, `[`, 1)  # get raw vector of types.
    
    token_dat <- add_number_info(token_dat)
    token_dat$is_nw <- grepl(collapse_regex_or(numwords), token_dat$token, perl = TRUE)
    
    token_dat$unit <- detect_unit(token_dat)
    print("TEST")
    print(token_dat$unit)
    
    
    
  
    
  # Try to detect outcomes and conditions! ------
    regex_targetcond <- "(?:Schutz vor|Krankheit)\\s+(\\w+(?=[ .,;?!])\\s*\\w*)"
    matches <- gregexpr(regex_targetcond, input_txt, perl = TRUE)
    condmatches <- regmatches(input_txt, matches)
    targetconds <- unlist(lapply(condmatches, function(x) {
      sub("^(?:Schutz vor|Krankheit)\\s+", "", x)
    }))
    
    
  # Detect topic features -------
    # TODO: Migrate to (modifyiable) defintions!
    topic_list_features <- list(
      eff = list(c(collapse_regex_or(c("Nutz", "(?<!Neben)[Ww]irks(am|ung)", "Schutz", "schütz", targetconds)))),
      side = list(c("Nebenwirk"), c("Herzmuskelentzündung")),
      treatgroup = list(c("(Impf|Behandlungs)(-|\\s)?[Gg]ruppe"), c("(Antidepressiva|Medika).*erh(a|ie)lten")),
      controlgroup = list(c("(Kontroll|Placebo|Vergleichs)(-|\\s)?[Gg]ruppe"), c("kein\\s?Medika")),
      comp_time = list(
        c("(schlechter|besser)", "als", "vor", "Jahren"), 
        c("(veränder|erhöh)", "zwischen\\s?\\d{4}"), 
        c("Abstand", "(wuchs|vergrößert)", "Jahre", "\\d{4}")
      )
    ) 
    
    # Save topics as attr:
    # Make sure to not overwrite the original topics but to add to them:
    attr(token_dat, "topics") <- c(attr(token_dat, "topics"),
                                   names(topic_list_features)[sapply(topic_list_features, FUN = function(top) {
      detect_topic(token_dat$token, top)
    })])
    
  # Add keywords according to the type of comparison (currently collected in the "topic" property): -------
    
    if ("comp_time" %in% attr(token_dat, "topics")) {
      
      year_tokens <- token_dat$token[token_dat$unit == "year"]
      modifyiable_defs$window_keys$treat_contr$treat <- c(window_keys$treat_contr$treat, "nur_noch")
      modifyiable_defs$window_keys$treat_contr$contr <- c(window_keys$treat_contr$contr, "zum_Vergleich", "vor_.*Jahren", "[Ww]ährend_.*noch")
    }
    
    if (any(c("treatgroup", "controlgroup", "impf", "protect", "drug") %in% attr(token_dat, "topics"))) {
      attr(token_dat, "topics") <- c(attr(token_dat, "topics"), "comp_treat")
    }
    
    # is_intervention <- all(c("eff", "side") %in% attr(token_dat, "topics"))  # unused in original code.
    
    if (!"comp_treat" %in% attr(token_dat, "topics")) {
      # TODO: Avoid overwriting the original object -- use modifyiable_defs (we coudl also define something like cur_windowkeys instead!
      modifyiable_defs$window_keys$effside$eff <- NULL
      modifyiable_defs$window_keys$effside$side <- NULL
    }
    
    # Remove duplicate topics
    attr(token_dat, "topics") <- unique(attr(token_dat, "topics"))
    
    # Print final topics
    cat("Final topics after removing duplicates:\n")
    print(attr(token_dat, "topics"))
    
  # Number level: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
    modifyiable_defs$numtype_keyset$ncase$keyset <- c(modifyiable_defs$numtype_keyset$ncase$keyset, collapse_regex_or(targetconds))
    token_dat$numtype <- detect_number_type(token_dat, input_txt, modifyiable_defs$numtype_keyset)
   #  print(token_dat$numtype)
    
   
    remove_non_numeric_tokens <- function(tokens, is_num, nonumpat) {
      is_num <- mapply(function(token, is_num) {
        is_num && !grepl(nonumpat, token)
      }, tokens, is_num)
      return(is_num)
    }
    
    nonumpat <- "[A-Za-zÄäÖöÜüß]+[-\\.]?\\d"
    
    token_dat$is_num <- remove_non_numeric_tokens(token_dat$token, token_dat$is_num, nonumpat)
   
    cat(" +++ detecting missing units +++\n")
    no_unit_ix <- which(token_dat$is_num & token_dat$unit == "unknown")
    new_units <- investigate_context(token_dat, no_unit_ix, modifyiable_defs$window_keys$units, FALSE)
    
    
    for (ix in no_unit_ix) {
      if (nzchar(new_units[ix])) {
        token_dat$unit[ix] <- new_units[ix]
      }
    }
    # print(token_dat$unit)
    
   # Regex-based again ----------------------
    regex_numwords_raw <- paste0("(?<!\\w)(", paste(numwords, collapse = "|"), ")")
    excludePattern <- paste(
      "ein", "eine", "einer", "einen", "einem", "eines",
      "[Zz]wei(?!fe)",
      "[Dd]rei",
      "[Vv]ier",
      "[Ff]ünf",
      "[Ss]echs",
      "[Ss]ieben",
      "[Aa]cht(?!e)",
      "[Nn]eun(?!k)",
      "[Zz]ehn",
      "[Ee]lf",
      "[Zz]wölf",
      "[Zz]weieinhalb",
      sep = "|"
    )
    

    is <- sapply(seq_along(token_dat$token), function(i) {
      if (grepl(regex_numwords_raw, token_dat$token[i], perl = TRUE) && !token_dat$is_num[i]) {
        return(token_dat$token[i])
      } else {
        return(NA)
      }
    })
    
    
    
    print("+++ Additional candidate number words: +++");
    for (i in seq_along(token_dat)) {
      # Check if token is a candidate based on regex_numwords_raw and excludePattern
      if (grepl(regex_numwords_raw, token_dat$token[i], perl = TRUE) &&
          !grepl(excludePattern, token_dat$token[i], perl = TRUE)) {
        
        cursent <- token_dat$sent[i]
        
        # Find previous numtypes that match "ncase" within the current or previous sentence
        prev_ntypes <- token_dat$numtype[which(token_dat$sent >= cursent - 1 & 1:nrow(token_dat) <= i & token_dat$numtype == "ncase")]
        
        if (length(prev_ntypes) > 0) {
          token_dat$unit[i] <- "freq"
          token_dat$is_num[i] <- TRUE
          token_dat$numtype[i] <- tail(prev_ntypes, 1)  # Get the last matching "ncase"
        }
      }
    }
    
    allnum_ix <- which(token_dat$is_num & !(token_dat$unit %in% units_exc))
    freq_ix <- which(token_dat$unit == "freq")
    perc_ix <- which(token_dat$unit %in% c("perc", "mult"))
    token_dat$gtype <- investigate_context(token_dat, allnum_ix, modifyiable_defs$window_keys$grouptype, FALSE)
    token_dat$gtype <- ifelse(token_dat$unit == "perc", "sub", token_dat$gtype)
    n_subgroup_ix <- which(token_dat$is_num & token_dat$gtype != "total" & !is.na(token_dat$gtype))
    print(n_subgroup_ix)
    
    cat("---------- Get treatment and control: -----------\n")
    token_dat$group <- investigate_context(token_dat, n_subgroup_ix, modifyiable_defs$window_keys$treat_contr, FALSE)
    print(token_dat$group)
    
    cat("---------- Get effectivity and side effects: -----------\n")
    if ("comp_treat" %in% token_dat$topics) {
      modifyiable_defs$window_keys$effside$eff <- c(modifyiable_defs$window_keys$effside$eff, targetconds)
    }
    token_dat$effside <- investigate_context(token_dat, n_subgroup_ix, modifyiable_defs$window_keys$effside, FALSE)
    print(token_dat$effside)
    
    cat("---------- Get information about the underlying conditions (morbidity, mortality...): -----------\n")
    token_dat$ftype <- investigate_context(token_dat, freq_ix, modifyiable_defs$window_keys$conditions, FALSE)
    print(token_dat$ftype)
    
    
    # Transformation of `gtype`
    token_dat$gtype <- sapply(1:nrow(token_dat), function(ix) {
      numtype_is_ncase <- token_dat$numtype[ix] == "ncase"
      group_is_unknown_or_all <- token_dat$group[ix] %in% c("unknown", "all")
      
      # Check if numtype or group is NA before performing logical operations
      if (is.na(token_dat$numtype[ix]) || is.na(token_dat$group[ix])) {
        return(token_dat$gtype[ix])  # Return original value if NA
      }
      
      # Perform logical check
      if (numtype_is_ncase && group_is_unknown_or_all) {
        return("total")
      } else {
        return(token_dat$gtype[ix])
      }
    })
    
   
    cat("---------- Detect relative changes: -----------\n")
    n_change_ix <- which(token_dat$is_num & token_dat$numtype %in% c("incr", "decr"))
    token_dat$relabs <- investigate_context(token_dat, perc_ix, modifyiable_defs$window_keys$rel, TRUE)
    token_dat$relabs <- sapply(1:nrow(token_dat), function(ix) {
      if (!is.na(token_dat$numtype[ix]) && token_dat$numtype[ix] %in% c("incr", "decr") && token_dat$relabs[ix] != "abs") {
        return("rel")
      } else {
        return(token_dat$relabs[ix])
      }
    })
    
    cat("~~~~~~~~~~~~~~ TRANSLATING NUMBER WORDS ~~~~~~~~~~~~~~\n")
    num_arr <- 0:12
  
    token_dat$trnum <- token_dat$token
    
    for (ix in 1:(nrow(token_dat))) {
      if (token_dat$is_num[ix] && token_dat$is_nw[ix]) {
        if (ix < nrow(token_dat) && !token_dat$is_num[ix + 1]) {
          token <- token_dat$token[ix]
          cat("+++ Current Token is", token, "\n")
          num_ix <- which(sapply(numwords, function(nw) grepl(paste0("\\b", nw, "\\b"), token, perl = TRUE)))
          
          if (length(num_ix) > 0) {
            token_dat$trnum[ix] <- as.character(num_arr[num_ix[1]])
          }
        } else {
          token_dat$is_num[ix] <- FALSE
          token_dat$is_nw[ix] <- FALSE
        }
      }
    }
    
    
    # Update information on small percentages:
    regex_num <- "\\d+(\\.\\d+)?"
    
    # Neue Spalte `smperc` erstellen
    token_dat$smperc <- sapply(1:nrow(token_dat), function(ix) {
      if (token_dat$unit[ix] == "perc" && token_dat$is_num[ix]) {
        extracted_num <- sub(",", ".", regmatches(token_dat$trnum[ix], regexpr(regex_num, token_dat$trnum[ix])))
        return(as.numeric(extracted_num) < 1)
      } else {
        return(NA)
      }
    })
    
    
    # Investigate change for relative or absolute:
    for (ix in n_change_ix) {
      out <- "unclear"
      
      if (token_dat$unit[ix] == "mult") {
        out <- "rel"
      } else if (token_dat$relabs[ix] == "abs") {
        out <- "abs"
      } else {
        numpart <- gsub(",", ".", gsub(".*?(\\d+\\.?\\d*).*", "\\1", token_dat$trnum[ix]))
        numpart_numeric <- suppressWarnings(as.numeric(numpart))
        if (!is.na(numpart_numeric)) {
          out <- ifelse(numpart_numeric < 10, "abs", "rel")
        }
      }
      
      token_dat$relabs[ix] <- out
    }
    
    # Code remaining percentages as absolute:
    token_dat$relabs <- sapply(1:nrow(token_dat), function(ix) {
      if (!is.na(token_dat$unit[ix]) && token_dat$unit[ix] == "perc" && 
          !is.na(token_dat$relabs[ix]) && token_dat$relabs[ix] %in% c(NA, "unknown")) {
        return("abs")
      } else {
        return(token_dat$relabs[ix])
      }
    })
    
    # Fix some issues with numtype:
    token_dat$numtype <- sapply(1:nrow(token_dat), function(ix) {
      if (!is.na(token_dat$unit[ix]) && token_dat$unit[ix] == "freq" && 
          !is.na(token_dat$numtype[ix]) && token_dat$numtype[ix] %in% c(NA, "other") && 
          !is.na(token_dat$gtype[ix]) && token_dat$gtype[ix] == "sub") {
        return("ncase")
      } else {
        return(token_dat$numtype[ix])
      }
    })
    
    # Reference information for absolute percentages and subgroups (WORK IN PROGRESS):
    token_dat$reference <- investigate_context(token_dat, n_subgroup_ix, modifyiable_defs$window_keys$reference, FALSE)
    
    # Carry backward number information
    cat("CARRYBACKWARD!\n")
    
   
    for (ix in allnum_ix) {
      if (!is.na(token_dat$unit[ix]) && token_dat$unit[ix] == "ucarryback") {
        ix_nxt <- which(token_dat$is_num[(ix + 1):min(ix + 2, nrow(token_dat))])
        
        if (length(ix_nxt) > 0) {
          ix_nxt <- ix_nxt[1] + ix  
          token_dat$unit[ix] <- token_dat$unit[ix_nxt]
          token_dat$numtype[ix] <- token_dat$numtype[ix_nxt]
          token_dat$gtype[ix] <- token_dat$gtype[ix_nxt]
          token_dat$group[ix] <- token_dat$group[ix_nxt]
          token_dat$effside[ix] <- token_dat$effside[ix_nxt]
          token_dat$ftype[ix] <- token_dat$ftype[ix_nxt]
          token_dat$relabs[ix] <- token_dat$relabs[ix_nxt]
        }
      }
    }
  
    # Code: 531 
    # Return --------
    data_frame <- list(
      token_dat = token_dat,
      final_topics = attr(token_dat, "topics")
    )
    return(data_frame)
    print(data_frame)
    
   

    
    
}

# Run test:
test_output <- test_text(tsttxt)
# test_output <- test_text(tsttxt2)

print(test_output, max = 100000)


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# --------- HIGHLIGHTING--------
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

highlight_text <- function(data_frame, input_txt) {
  token_dat <-  data_frame$token_dat
  cur_ix <- 1
  # Get rid of unidentified carryforward and backward units:
  token_dat$unit[token_dat$unit %in% c("ucarryforward", "ucarryback")] <- NA
  
  # Default
  cur_tooltip <- "Kein nennenswerter Wert wurde erwähnt"
  cur_popup <- "Keine nennenswerte Wert wurde erwähnt"
  
  # Initialize an empty list to store the results
  results <- list()
  
  excluded_tokens <- c(")", "]", "}", "...", "\n", ".", "?", "!", ":", "\n•\t", "•\t", "und", ";", "–", ",", "oder", "-")
  
  # Loop through each token in the data
  for (i in seq_len(nrow(token_dat))) {
    if (token_dat$is_num[i]) {
      cur_unit <- token_dat$unit[i] # determine unit of current token.
      
      if (is.list(cur_unit)) {
        cur_unit <- cur_unit[[1]] # for now take the first array element.
      }
      
      if (!is.na(cur_unit) && !(cur_unit %in% units_exc)) {
        text_pre <- substr(input_txt, cur_ix, token_dat$start[i] - 1)
        
        # Calculate the length of matching units
        match_len <- 0
        while (i + match_len <= nrow(token_dat) && !is.na(token_dat$unit[i + match_len])) {
          match_len <- match_len + 1
        }
        
        # Signature of current number:
        currow <- token_dat[i, ]
        col_info <- c(currow$unit, currow$numtype, currow$relabs)
        
        # Traverse the info_tree to find tooltip and popup information
        tooltip_info <- info_tree$traverse(col_info)
        if (!is.null(tooltip_info)) {
          cur_tooltip <- tooltip_info$tool
          cur_popup <- tooltip_info$popup
        }
        
        # Highlight next two tokens if current token is "natürliche Häufigkeit"
        next_tokens <- c()
        if (currow$unit == "nh") {
          for (j in (i + 1):min(nrow(token_dat), i + 2)) { 
            if (j <= nrow(token_dat)) {
              if (!(token_dat$token[j] %in% excluded_tokens)) {
                next_tokens <- c(next_tokens, token_dat$token[j])
              }
            }
          }
        } else {
          for (j in (i + 1):min(nrow(token_dat), i + 1)) { 
            if (j <= nrow(token_dat)) {
              if (!(token_dat$token[j] %in% excluded_tokens)) {
                next_tokens <- c(next_tokens, token_dat$token[j])
              }
            }
          }
        }
        
        # Store the result
        results[[i]] <- list(
          token = currow$token, 
          next_tokens = next_tokens,
          tooltip = cur_tooltip,         
          popup = cur_popup,
          # For Warnings
          group = token_dat$group[i], 
          cur_unit = cur_unit,         
          effside = token_dat$effside[i],
          smperc = token_dat$smperc[i]
        )
        
        i <- i + match_len 
      }
    }
  }
  
  results <- Filter(function(x) length(x) > 0, results)
  
  return(results)
  print(results)
}

highlight_text(test_text(tsttxt), tsttxt)


highlight_tokens <- function(input_txt, results) {
  
  # Initialize 
  excluded_tokens <- c(")", "]", "}", "...", "\n", ".", "?", "!", ":", "\n•\t", "•\t", "und", ";", "–", ",", "oder", "-")
  highlighted_text <- input_txt
  
  # Sort the results by the length of the token in descending order
  # This ensures that longer tokens are replaced before shorter ones
  # results_sorted <- results[order(sapply(results, function(x) nchar(x$token)), decreasing = TRUE)]
  
  # Iterate over each result in the sorted list
  for (res in results) {
    token <- res$token
    # Combine the next tokens into a single string separated by spaces
    next_tokens <- paste(res$next_tokens, collapse = " ")
    # Create the full match string by combining the token and next tokens if they exist
    full_match <- if (nchar(next_tokens) > 0) {
      paste(token, next_tokens, sep = " ")
    } else {
      token
    }
    
    # If the token is in the list of excluded tokens, skip highlighting
    if (token %in% excluded_tokens) {
      next
    }
    
    tooltip <- res$tooltip
    popup <- res$popup
    
    # Determine if a warning about unclear reference should be shown
    warn_noref <- (!is.na(res$group) && (res$group == "all" || res$group == "")) && 
      (!is.na(res$cur_unit) && res$cur_unit == "perc") && 
      (!is.na(res$effside) && res$effside %in% c("eff", "side"))
    warn_small <- (!is.na(res$smperc) && res$smperc == TRUE)
    
    # Debugging for warn_noref
    # print(paste("warn_noref:", warn_noref))
    # print(paste("tooltip:", tooltip))
    
    # Define the highlighting based on the conditions
    if (warn_noref == TRUE) {
      color <- "yellow"
      highlight <- paste0(
        "<span class='tooltip-container' style='background-color:", color, 
        "; cursor: pointer; display: inline-block;' onclick=\"Shiny.setInputValue('popup_info', '", 
        popup, "', {priority: 'event'})\">",
        full_match,
        "<span class='tooltip-text'>",
        tooltip,
        "<br>(Bezug unklar)",
        "</span></span>"
      )
    } else if (grepl("p[-]?Wert|Relative Prozentzahl", tooltip, ignore.case = TRUE)) {
      color <- "yellow"
      highlight <- paste0(
        "<span class='tooltip-container' style='background-color:", color, 
        "; cursor: pointer; display: inline-block;' onclick=\"Shiny.setInputValue('popup_info', '", 
        popup, "', {priority: 'event'})\">",
        full_match,
        "<span class='tooltip-text'>",
        tooltip,
        "</span></span>"
      )
    } else  if (warn_small == TRUE) {
      color <- "yellow"
      highlight <- paste0(
        "<span class='tooltip-container' style='background-color:", color, 
        "; cursor: pointer; display: inline-block;' onclick=\"Shiny.setInputValue('popup_info', '", 
        popup, "', {priority: 'event'})\">",
        full_match,
        "<span class='tooltip-text'>",
        tooltip,
        "<br>(Prozentzahl < 1%)",
        "</span></span>"
      )
    } else {
      color <- "lightblue"
      highlight <- paste0(
        "<span class='tooltip-container' style='background-color:", color, 
        "; cursor: pointer; display: inline-block;' onclick=\"Shiny.setInputValue('popup_info', '", 
        popup, "', {priority: 'event'})\">",
        full_match,
        "<span class='tooltip-text'>",
        tooltip,
        "</span></span>"
      )
    }
    
    # Replace the matched text in the highlighted_text with the HTML span for highlighting
    highlighted_text <- gsub(full_match, highlight, highlighted_text, fixed = TRUE)
  }
  
  return(highlighted_text)
}

test <- highlight_tokens(tsttxt, highlight_text(test_text(tsttxt), tsttxt))
print(test)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# --------- FEEDBACK--------
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


feedback <- function(data_frame, input_txt){
  topic <-  data_frame$final_topics
  token_dat <- data_frame$token_dat
  
  # initialize notes.
  norisk <- FALSE 
  key_topics_str <- ""
  
  # Define feature aliases
  feature_aliases <- list(
    comp_time = list(
      treat = "Untersuchungszeitpunkt", 
      # "Zeitpunkt, zu dem sich etwas verändert hat (z.B., Zunahme oder Abnhame von Erkrankungen).", 
      contr = "Behandlungszeitpunkt"
      # "Zeitpunkt, mit dem der Untersuchungszeitpunkt verglichen wird."
    ),
    comp_treat = list(
      treat = "Behandlungsgruppe", 
      # "Gruppe, die die Behandlung erhalten hat oder einem Risiko ausgesetzt war.", 
      contr = "Vergleichsgruppe"
      # "Gruppe, die keine Behandlung erhalten hat oder einem Risiko nicht ausgesetzt war."
    ),
    comp_default = list(
      treat = "Behandlungsgruppe",
      # "Gruppe, in der sich etwas verändert hat (z.B., Zunahme oder Abnhame von Erkrankungen). ",
      contr = "Vergleichsgruppe"
      # "Gruppe, mit der verglichen wird." 
    )
  )
  
  # Filter topics that were detected
  curcomp <- grep("comp_", topic, value = TRUE)
  
  # Determine the current comparison type
  curcomp <- if ("comp_treat" %in% curcomp) "comp_treat" else if (length(curcomp) > 0) curcomp[1] else "comp_default"
  curfeats <- feature_aliases[[curcomp]]
  
  # Print results
  print("Curcomp")
  print(curcomp)
  print("Curfeats")
  print(curfeats)
  
  feature_dict <- list(
    eff = "Nutzen", 
    # "Wirksamkeit einer Behandlung oder Impfung (z.B., verhinderte Erkranungen, Genesung, Vermeidung von Todesfällen). Sollte immer mit Zahlen belegt werden.", # Wiki Nutzen
    side = "Schaden", 
    # "Schaden (z.B., Nebenwirkungen) einer Behandlung oder Impfung. Sollte immer mit Zahlen belegt werden.", # Wiki Schaden 
    damage = "Risiko", 
    # "Risiko einer negativen Auswirkung (z.B., Erkrankung).", # Wiki Rsik 
    treat = paste0(curfeats[["treat"]]),
    contr = paste0(curfeats[["contr"]])
  )
  
  feature_list <- ""
  text_features <- list() 
  
  risknum_ix <- Filter(function(x) {
    token_dat$unit[x] %in% c("perc", "freq", "nh", "mult", "nyear") && token_dat$is_num[x]
  }, token_dat$id)
  
  print("Risknum indices:")
  print(risknum_ix)
  
  # Get each of these rows
  risknum_rows <- lapply(risknum_ix, function(x) token_dat[x, ])
  risknums_flat <- unlist(risknum_rows)
  
  # Function to check for any matching elements in the array
  check_any_arr <- function(arrs, check_arr) {
    any(sapply(arrs, function(arr) all(check_arr %in% arr)))
  }
  
  # 1. and 2. Global tests: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  txtfeat_dict <- list(
    any_risknum = length(risknum_ix) > 0,
    eff_num = "eff" %in% risknums_flat,
    side_num = "side" %in% risknums_flat,
    damage_num = "damage" %in% risknums_flat,
    treat_num = "treat" %in% risknums_flat,
    contr_num = "contr" %in% risknums_flat,
    # Interactions:
    eff_treat_num = check_any_arr(risknum_rows, c("eff", "treat")),
    side_treat_num = check_any_arr(risknum_rows, c("side", "treat")),
    eff_contr_num = check_any_arr(risknum_rows, c("eff", "contr")),
    side_contr_num = check_any_arr(risknum_rows, c("side", "contr"))
  )
  
  print("1")
  print(txtfeat_dict)
  
  # Additional checks using token_dat$topics
  txtfeat_dict$eff <- txtfeat_dict$eff_num || "eff" %in% topic
  txtfeat_dict$side <- txtfeat_dict$side_num || "side" %in% topic
  txtfeat_dict$damage <- txtfeat_dict$damage_num || "damage" %in% topic
  txtfeat_dict$treat <- txtfeat_dict$treat_num || "treatgroup" %in% topic
  txtfeat_dict$contr <- txtfeat_dict$contr_num || "controlgroup" %in% topic
  
  print("2")
  print(txtfeat_dict)
  
  # Specific number info:
  txtfeat_dict$rel <- any(c("incr", "decr", "mult") %in% token_dat$numtype)
  txtfeat_dict$rel_only <- txtfeat_dict$rel && !("abs" %in% token_dat$relabs) &&
    !check_any_arr(risknum_rows, c("freq", "sub"))
  
  print("3")
  print(txtfeat_dict)
  
  # Additional information for efficacy and side effect units/numtypes:
  addfeat_dict <- list(
    effunit = unique(token_dat$unit[token_dat$effside == "eff" & !is.na(token_dat$unit)]),
    effnumtype = unique(token_dat$numtype[token_dat$effside == "eff" & token_dat$numtype != "other" & !is.na(token_dat$numtype)]),
    sideunit = unique(token_dat$unit[token_dat$effside == "side" & !is.na(token_dat$unit)]),
    sidenumtype = unique(token_dat$numtype[token_dat$effside == "side" & token_dat$numtype != "other" & !is.na(token_dat$numtype)])
  )
  
  # Handling mismatched framing
  mismatched_framing <- "none"
  if (txtfeat_dict$eff_num && txtfeat_dict$side_num) {
    # Array of relevant indicators
    mismatch_arr <- c(
      check_any_arr(risknum_rows, c("side", "abs")), 
      check_any_arr(risknum_rows, c("side", "rel")),
      check_any_arr(risknum_rows, c("eff", "abs")),
      check_any_arr(risknum_rows, c("eff", "rel"))
    )
    
    if (all(mismatch_arr == c(TRUE, FALSE, FALSE, TRUE))) {
      mismatched_framing <- "side_rel"
    } else if (all(mismatch_arr == c(FALSE, TRUE, TRUE, FALSE))) {
      mismatched_framing <- "eff_rel"
    }
  }
  
  cat("~~~~~~~~~~~~ Text features: ~~~~~~~~~~~~~~~~\n")
 # print(txtfeat_dict)
  print(addfeat_dict)
  
  # Turn keys into an array
  feature_arr <- names(txtfeat_dict)[unlist(txtfeat_dict)]
  
  cat("Feature array:\n")
  print(risknum_rows)
  print(feature_arr)
  
  # ++++ Feedback on features: ~~~~
  print("~~~~~~~~~~~~ Feedback on features: ~~~~~~~~~~~~~~~~")
  
  # Define feature sets for testing
  feature_set <- list(
    eff_side = list(
      fset = c("eff", "side"),
      tool = "Nur indem Lesende vollständig über die Wirksamkeit und mögliche Nebeneffekte informiert werden, können sie sich ein unabhängiges Urteil über die erwünschten und unerwünschten Folgen bilden und eine informierte Entscheidung treffen.",
      zumzur = "zum "
    ),
    damage = list(
      fset = c("damage"),
      zumzur = "zu einem "
    ),
    treat_contr = list(
      fset = c("treat", "contr"),
      tool = "Nur indem die Lesenden die Risiken (Wahrscheinlichkeiten) mit und ohne Intervention kennen, können Sie sich ein unabhängiges Urteil über das Ausmaß von Nutzen und Schaden bilden und eine informierte Entscheidung treffen.",
      zumzur = "zur "
    )
  )
  
  # Remove/adjust Nutzen/Schaden terminology based on topics
  if ("comp_treat" %in% topic) {
    feature_set$damage <- NULL  
  } else {
    key_topics_str <- paste0(
      "<span style='color: grey;'>",
      "Der Text berichtet keine Intervention (z.B., Medikamentenbehandlung), ",
      "die einen Vergleich zwischen einer Behandlungsgruppe und einer Vergleichsgruppe anstellt",
      ifelse("comp_time" %in% topic,  
             ", sondern scheint Zeitpunkte zu vergleichen. ", ". "),
      "Daher sind keine Kausalaussagen möglich.<br> ",
      "</span>"
      # Wiki Kausalaussagen
      # "Kausalaussagen beschreiben, ob ein Faktor ursächlich für ein Ergebnis ist ",
      # "(z.B., ein Medikament für die Genesung). Das ist nur zuverlässig in Experimenten mit randomisierter Zuteilung möglich."
    )
    
    print("WICHTIG")
    print(key_topics_str)
    
    feature_set$eff_side <- NULL  
    feature_set$treat_contr <- NULL  
  }
  
  # Overarching text features: ~~~~~~~~~~~~~~~~~~~~~
  for (key in names(feature_set)) {
    value <- feature_set[[key]]
    
    feature_str <- "Es"
    
    # Get present features:
    feats_present <- value$fset[sapply(value$fset, function(feat) feat %in% feature_arr)]
    feats_missing <- value$fset[sapply(value$fset, function(feat) !(feat %in% feature_arr))]
    feats_present <- sapply(feats_present, function(k) feature_dict[[k]])
    feats_missing <- sapply(feats_missing, function(k) feature_dict[[k]])
    
    cat("Features present and missing are:\n")
    print(feats_present);
    print(feats_missing); 
    
    
    # Check if all features are present
    if (length(feats_missing) == 0) {
      # Add green check mark for good status
      feature_str <- paste0("✅ ", feature_str)
      feature_str <- paste0(feature_str, " werden Informationen ", value$zumzur, paste(feats_present, collapse = " und "), " berichtet.<br>")
      
    } else if (key == "damage") {
      feature_str <- paste0( feature_str, " konnte kein Gesundheitsrisiko erkannt werden. ",
                             " Wenn der Text ein Gesundheitsrisiko behandelt, kontaktieren Sie uns bitte, damit wir den Fehler beheben können.<br>")
      
    } else {
      if (length(feats_missing) == 1) {
        # Add warning triangle for missing one feature
        feature_str <- paste0("⚠️ ", feature_str)
        feature_str <- paste0(feature_str, " werden nur Informationen ", value$zumzur, paste(feats_present, collapse = ", "), 
                              " berichtet. Es sollten auch Informationen ", value$zumzur, paste(feats_missing, collapse = ", "), " berichtet werden.<br>")
      } else {
        # Add red cross for missing multiple features
        feature_str <- paste0("❌ ", feature_str)
        feature_str <- paste0(feature_str, " werden weder Informationen ", value$zumzur, 
                              paste(sapply(value$fset, function(key) feature_dict[[key]]), collapse = " noch "), " berichtet.<br>")
      }
      # Append tooltip with inline styles
      feature_str <- paste0(
      feature_str,
      "<span class='tooltip-container' style='cursor: pointer; display: inline-block;' onclick=\"Shiny.setInputValue('popup_info', '", 
      value$tool, "', {priority: 'event'});\">",
      "<u>(Warum ist das ein Problem?)</u>",
      "</span><br>"
      )
    }
    
    # Append feedback
    feature_list <- paste0(feature_list, feature_str)
    # print(feature_list)
  }
  
  
  # Final output
  feature_list <- paste0("<strong><h4>Berichtet der Text belastbare Informationen?</h4></strong><br>", feature_list)
  
  # print(feature_list)
  
  
  # Flag out the use of numbers: ~~~~~~~~~~~~~~~~~~~~~~~
  feature_num <- ""
  any_risk_num <- txtfeat_dict$any_risknum  
  
  if (any_risk_num) {
    
    # Differentiate: Does it report numbers only about effectivity? Also about side effects?
    if ("comp_treat" %in% topic) {
      # Do this only if groups are compared!
      
      eff_num <- "eff_num" %in% feature_arr
      side_num <- "side_num" %in% feature_arr
      
      if (eff_num && side_num) {
        feature_num <- paste0(feature_num, "✅ Sowohl zum Nutzen als auch zum Schaden wurden Zahlen angegeben.<br>")
      } else {
        if (eff_num || side_num) {
          feature_num <- paste0(feature_num, "⚠️ Zahlen nur zum", ifelse(eff_num, " Nutzen", " Schaden"), " angegeben.<br>")
        } else {
          feature_num <- paste0(feature_num, "❌ Die verwendeten Zahlen beziehen sich leider weder auf Nutzen noch auf Schaden.<br>")
        }
      }
      
      arr_eff_both <- if ("eff_treat_num" %in% feature_arr && "eff_contr_num" %in% feature_arr) {
        c("✅", "", "")
      } else {
        c("❌", "nicht erkennbar ", 
          "Nur indem die Lesenden die Größe des Nutzens mit und ohne Intervention kennen, ",
          "können Sie sich ein unabhängiges Urteil über das Ausmaß des Nutzens bilden ",
          "und eine informierte Entscheidung treffen.")
      }
      
      arr_side_both <- if ("side_treat_num" %in% feature_arr && "side_contr_num" %in% feature_arr) {
        c("✅", "", "")
      } else {
        c("❌", "nicht erkennbar ",
          "Nur indem die Lesenden die Größe des Schadens mit und ohne Intervention kennen, ",
          "können Sie sich ein unabhängiges Urteil über das Ausmaß des Schadens bilden ",
          "und eine informierte Entscheidung treffen.")
      }
      
      feature_num <- paste0(feature_num, arr_eff_both[1], " Der Nutzen wird ", arr_eff_both[2], " mit Zahlen für Behandlungs- und Vergleichsgruppe belegt. " , arr_eff_both[3], "<br>")
      feature_num <- paste0(feature_num, arr_side_both[1], " Die Schadenwirkung wird ", arr_side_both[2], " mit Zahlen für Behandlungs- und Vergleichsgruppe belegt. ", arr_side_both[3], "<br>")
      
      
    } else if ("comp_time" %in% topic) {
      treat_num <- "treat_num" %in% feature_arr
      contr_num <- "contr_num" %in% feature_arr
      
      if (treat_num && contr_num) {
        feature_num <- paste0(feature_num, "✅ Sowohl zum Untersuchungszeitpunkt als auch zum Vergleichszeitpunkt wurden Zahlen angegeben.<br>")
      } else if (treat_num || contr_num) {
        feature_num <- paste0(feature_num, "⚠️ Zahlen nur zum ", ifelse(treat_num, "Untersuchungszeitpunkt", "Vergleichszeitpunkt"), " angegeben.<br>")
      } else {
        feature_num <- paste0(feature_num, "❌ Die Zahlen beziehen sich leider nicht auf die absoluten Risiken zum Untersuchungs- oder Vergleichszeitpunkt.<br>")
      }
    }
    
  } else {
    feature_num <- paste0(feature_num,
                          "❌ Der Text scheint keine Zahlen zu den Risiken zu berichten. ",
                          "Rein verbale Beschreibungen sollten vermieden werden. ",
                          "Bitte versuchen Sie Zahlen zu berichten.")
  }
  
  # Only talks about numbers if the text talks about risk:
  if (!norisk && nchar(feature_num) > 0) {
    feature_list_number <- paste0("<br> <h4 style='margin-bottom: 5px;'>Welche Zahleninformation wird berichtet?</h4><br>", feature_num)
  }
  
  # Combine the list of text features:
  feature_list <- paste0(feature_list, feature_list_number, "<br> <br>", 
                         'Benötigten Sie Hilfe, prüfen Sie mit dem <a href="https://sciencexmedia-riskbooster-8cad5501391b.herokuapp.com/checklist_main.html" target="_blank"><u>Risikorechner</u></a>, ob die Informationen, die Ihnen vorliegen ausreichen, um transparent über die Wirksamkeit und Risiken zu berichten.')
  return(feature_list)
  
  # Code: 1273
  # ToDo: add "Weitere Anmerkungen, Warum ist das ein Problem?"
}


feedback(test_text(tsttxt), tsttxt)



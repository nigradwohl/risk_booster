# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# TRANSLATED TEXT-CHECKER
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


# An initial testtext:
tsttxt <- " Die Einreichung basiert auf einem 95 %igen Impfschutz (p<0.0001) in Probanden ohne vorherige SARS-CoV-2-Infektion (erstes Hauptziel der Studie), wie die Phase-3-Studie zeigte. Auch in Probanden mit oder ohne vorheriger SARS-CoV-2-Infektion konnte ein Impfschutz erreicht werden (zweites Hauptziel der Studie). In beiden Fällen wurde der Impfschutz sieben Tage nach Verabreichung der zweiten Dosis erzielt. Die Wirksamkeit des Impfstoffs war über alle Alters- und Geschlechtsgruppen und die gesamte diverse Studienpopulation hin konsistent. Der Impfschutz bei Erwachsenen über 65 Jahren lag bei über 94 %. Die Abschlussanalyse des ersten Hauptziels der Studie wurde nach 170 bestätigten COVID-19-Fällen durchgeführt. Insgesamt wurde der Impfstoff in der Studie gut vertragen und das Data Monitoring Committee (DMC) konnte bisher keine schwerwiegenden Nebenwirkungen feststellen. 41 % der weltweiten Studienteilnehmer und 45 % der amerikanischen Studienteilnehmer sind im Alter von 56 bis 85 Jahren."


tsttxt2 <- "•	BNT162b2 zeigt in der primären Endpunktanalyse 28 Tage nach der ersten Impfung eine 95%ige Wirksamkeit gegen COVID-19; insgesamt traten 170 bestätigte COVID-19-Fälle auf, mit 162 Fällen in der Placebogruppe und 8 Fällen in der Impfstoffgruppe
•	Die Wirksamkeit war über alle Alters- und Geschlechtsgruppen und die gesamte diverse Studienpopulation hin konsistent; der Impfschutz bei Erwachsenen über 65 Jahren lag bei über 94 %
•	Die von der US-amerikanischen Food and Drug Administration (FDA) geforderten Sicherheitsdaten für die Genehmigung einer Notfallzulassung wurden erreicht
•	Der Impfstoff wurde in allen Teilnehmerpopulationen gut vertragen, insgesamt nahmen 43.000 Probanden an der Studie teil; es wurden keine schwerwiegenden Nebenwirkungen festgestellt; die einzigen Nebenwirkungen dritten Grades die häufiger als 2 % auftraten, waren Erschöpfung mit 3,8 % und Kopfschmerzen mit 2,0 %
•	Die Unternehmen planen, innerhalb der nächsten Tage den Antrag auf Notfallzulassung bei der FDA einzureichen und werden die Daten mit weiteren Zulassungsbehörden weltweit teilen
•	Die Unternehmen gehen davon aus, weltweit bis zu 50 Millionen Impfstoffdosen im Jahr 2020 zu produzieren sowie bis zu 1,3 Milliarden Dosen bis Ende 2021

NEW YORK, USA und MAINZ, Deutschland, 18. November 2020 — Pfizer Inc. (NYSE: PFE) und BioNTech SE (Nasdaq: BNTX, „BioNTech”) gaben heute bekannt, dass die Abschlussanalyse im Rahmen ihrer laufenden Phase-3-Studie stattgefunden hat. BioNTechs mRNA-basierter Impfstoffkandidat BNT162b2 gegen COVID-19-Erkrankungen erreichte alle primären Endpunkte der Studie. Die Auswertung der Daten zeigte in Probanden ohne vorherige SARS-CoV-2-Infektion einen 95%tigen Impfschutz (p<0.0001). Auch in Probanden mit oder ohne vorheriger SARS-CoV-2-Infektion konnte ein Impfschutz erreicht werden. In beiden Fällen wurde der Impfschutz sieben Tage nach der zweiten Dosis ermittelt. Die Abschlussanalyse wurde, basierend auf dem Studienprotokoll, nach 170 bestätigten COVID-19-Fällen durchgeführt. Davon wurden 162 Fälle in der Placebogruppe und 8 Fälle in der BNT162b2-Impfstoff-Gruppe nachgewiesen. Die Wirksamkeit der Impfung war über alle Alters- und Geschlechtsgruppen in der gesamten diversen Studienpopulation konsistent. Der Impfschutz bei Erwachsenen über 65 Jahren lag bei über 94 %.

In der Studie traten insgesamt 10 schwere COVID-19-Verläufe auf. Davon wurden 9 in der Placebogruppe und einer in der BNT162b2-Gruppe beobachtet. Bislang konnte das Data Monitoring Committee keine schwerwiegenden Nebenwirkungen feststellen. Eine Untersuchung der entblindeten Daten zur Impfstoffreaktion in einer randomisierten Subgruppe der finalen Phase-2/3-Analyse mit mindestens 8.000 der über 18-jährigen Probanden zeigte, dass der Impfstoff gut verträglich ist. Die meisten Nebenwirkungen traten nur vorübergehend auf. Die einzigen schweren Nebenwirkungen (3. Grades), die in mehr als 2 % der Probanden nach der ersten oder zweiten Impfung auftraten, waren Erschöpfung mit 3,8 % sowie Kopfschmerzen mit 2,0 % nach der zweiten Dosis. Wie auch schon in früheren Analysen traten bei älteren Studienteilnehmern weniger und schwächer ausgeprägte Nebenwirkungen auf.
"


# Get other scripts: -----------------------------
source("util_funs.R")
source("modifyable_defintions.R")
source("main_functions.R")




# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# --------- TEXT INPUT AND PRE-PROCESSING --------
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# TODO: Get the text from HTML! 

test_text <- function(txt){
  
  input_txt <- txt
  
  token_dat <- get_token_data(input_txt)
  
  # TODO: How to save the modifyiable defintions?
  modifyiable_defs <- list(
    units_exc = units_exc,
    check_numbers_dict = check_numbers_dict  
  )
  
  
  
  # Text-level: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # Detect topics: ------------
    topic_list <- list(
      impf = c("(?<!gl|sch)[Ii]mpf"),
      mask = c("Maske|FFP"),
      protect = c("Schutzwirkung", "Ansteckungsgefahr", "nur", "besser", "geschützt"),
      lower_risk = c("mindern", "Risiko", "schützen|Schutz", "Infekt|Ansteck"),
      cancer_risk = c("[Rr]isiko", "Krebs"),
      med_risk = c("[Mm]edikament", "Krebs", "[Mm]edikament", "wirk")
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
    
    
  
    
  # Try to detect outcomes and conditions! ------
    regex_targetcond <- "(?:Schutz vor|Krankheit)\\s+(\\w+(?=[ .,;?!])\\s*\\w*)"
    matches <- gregexpr(regex_targetcond, input_txt, perl = TRUE)
    condmatches <- regmatches(input_txt, matches)
    targetconds <- unlist(lapply(condmatches, function(x) {
      sub("^(?:Schutz vor|Krankheit)\\s+", "", x)
    }))
    
    
  # Detect topic features -------
    topic_list_features <- list(
      eff = list(c(collapse_regex_or(c("Nutz", "(?<!Neben)[Ww]irks(am|ung)", "Schutz", "schütz", targetconds)))),
      side = list(c("Nebenwirk", "Herzmuskelentzündung")),
      treatgroup = list(c("(Impf|Behandlungs)-?.*[Gg]ruppe", "(Antidepressiva|Medika).*erh(a|ie)lten")),
      controlgroup = list(c("(Kontroll|Placebo|Vergleichs)-?.*[Gg]ruppe", "kein.*Medika")),
      comp_time = list(c("schlechter|besser", "als", "vor", "Jahren"),
                       c("veränder|erhöh", "zwischen_\\d{4}"),
                       c("Abstand", "wuchs|vergrößert", "Jahre", "\\d{4}"))
    )
    
    attr(token_dat, "topics") <- names(topic_list_features)[sapply(topic_list, FUN = function(top) {
      detect_topic(token_dat$token, top)
    })]
    
  # Add keywords according to the type of comparison (currently collected in the "topic" property): -------
    
    if ("comp_time" %in% attr(token_dat, "topics")) {
      
      year_tokens <- token_dat$token[token_dat$unit == "year"]
      window_keys$treat_contr$treat <- c(window_keys$treat_contr$treat, "nur_noch")
      window_keys$treat_contr$contr <- c(window_keys$treat_contr$contr, "zum_Vergleich", "vor_.*Jahren", "[Ww]ährend_.*noch")
    }
    
    if (any(c("treatgroup", "controlgroup", "impf", "protect", "drug") %in% attr(token_dat, "topics"))) {
      attr(token_dat, "topics") <- c(attr(token_dat, "topics"), "comp_treat")
    }
    
    is_intervention <- all(c("eff", "side") %in% attr(token_dat, "topics"))
    
    if (!"comp_treat" %in% attr(token_dat, "topics")) {
      window_keys$effside$eff <- NULL
      window_keys$effside$side <- NULL
    }
    
    # Remove duplicate topics
    attr(token_dat, "topics") <- unique(attr(token_dat, "topics"))
    
    
  # Number level: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
    numtype_keyset$ncase$keyset <- c(numtype_keyset$ncase$keyset, collapse_regex_or(targetconds))
    token_dat$numtype <- detect_number_type(token_dat, input_txt, numtype_keyset)
   #  print(token_dat$numtype)
    
  # 
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
    new_units <- investigate_context(token_dat, no_unit_ix, window_keys$units, FALSE)
    
    
    for (ix in no_unit_ix) {
      if (nzchar(new_units[ix])) {
        token_dat$unit[ix] <- new_units[ix]
      }
    }
    print(token_dat$unit)
    
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
    
    # Filter based on condition
    filter_ids <- function(data, condition) {
      which(condition)
    }
    
    
    allnum_ix <- filter_ids(token_dat, token_dat$is_num & !(token_dat$unit %in% units_exc))
    freq_ix <- filter_ids(token_dat, token_dat$unit == "freq")
    perc_ix <- filter_ids(token_dat, token_dat$unit %in% c("perc", "mult"))
    token_dat$gtype <- investigate_context(token_dat, allnum_ix, window_keys$grouptype, FALSE)
    token_dat$gtype <- ifelse(token_dat$unit == "perc", "sub", token_dat$gtype)
    n_subgroup_ix <- filter_ids(token_dat, token_dat$is_num & !(token_dat$gtype %in% c("total", -1)))
    
    cat("---------- Get treatment and control: -----------\n")
    token_dat$group <- investigate_context(token_dat, n_subgroup_ix, window_keys$treat_contr, FALSE)
    print(token_dat$group)
    
    cat("---------- Get effectivity and side effects: -----------\n")
    if ("comp_treat" %in% token_dat$topics) {
      window_keys$effside$eff <- c(window_keys$effside$eff, targetconds)
    }
    token_dat$effside <- investigate_context(token_dat, n_subgroup_ix, window_keys$effside, FALSE)
    print(token_dat$effside)
    
    cat("---------- Get information about the underlying conditions (morbidity, mortality...): -----------\n")
    token_dat$ftype <- investigate_context(token_dat, freq_ix, window_keys$conditions, FALSE)
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
    token_dat$relabs <- investigate_context(token_dat, perc_ix, window_keys$rel, TRUE)
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
    
    for (ix in 1:(nrow(token_dat) - 1)) {
      if (token_dat$is_num[ix] & token_dat$is_nw[ix]) {
        if (!token_dat$is_num[ix + 1]) {
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
    token_dat$smperc <- ifelse(
      token_dat$unit == "perc" & token_dat$is_num, 
      {
        # Extrahiere numerische Teile und ersetze Komma durch Punkt
        numpart <- gsub(",", ".", gsub(".*?(\\d+\\.?\\d*).*", "\\1", token_dat$trnum))
        # Konvertiere in numerischen Wert und prüfe, ob er < 1 ist
        is_small_perc <- suppressWarnings(as.numeric(numpart))
        ifelse(!is.na(is_small_perc) & is_small_perc < 1, TRUE, -1)
      }, 
      -1
    )
    
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
    token_dat$reference <- investigate_context(token_dat, n_subgroup_ix, window_keys$reference, FALSE)
    
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
    
    # Debuggingn: ~~~~~~~~~~~~~~~~~~
    # cat("~~~~~ Updated token data: ~~~~~~\n")
    # print(token_dat)
    # cat(paste0(nrow(token_dat), " rows and ", ncol(token_dat), " columns\n"))
    # print(token_dat[allnum_ix, ])  
    
    
    
    
   
    
   
    

    
    # Code: 531 
    # Return --------
   return(token_dat)
    
}

# Run test:
test_output <- test_text(tsttxt)
test_output <- test_text(tsttxt2)

print(test_output, max = 100000)





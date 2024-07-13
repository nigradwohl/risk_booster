# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# MODIFIABLE DEFINITIONS
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



# Array of units that should not be considered further
units_exc <- c("age", "currency", "time", "date", "year", "dur", "legal", "medical", "enum", "misc", "rank", "phone")


# Regular expressions: -----------------------------------------------------------------








# Dictionaries: -------------------------------------------------------------------------

check_numbers_dict <- list(
  perc = list(
    regex = regex_perc
    # "tooltip" = "Ich bin eine Prozentzahl und möchte gerne eine Referenz",
    # "note" = "Sie haben eine Prozentzahl verwendet. Stellen Sie sicher, dass eine Referenz vorhanden ist [mögliche Referenz ggf. ausflaggen!]. klicken Sie [HIER] um mehr zu erfahren."
  ),
  perc_word = list(
    regex = gsub(paste0("(", collapse_regex_or(numwords), ") ?(%|\\\-?[Pp]rozent)\\\w*(?=[\\s.?!])"), "dg", "", perl = TRUE)
  ),
  freq_word = list(
    regex = regex_numwords
  ),
  nh = list(
    regex = regex_nh
    # "tooltip" = "Ich bin eine \"natürliche\" Häufigkeit",
    # "note" = "Sie haben eine natürliche Häufigkeit verwendet. Das ist sehr gut. Am besten sollte der Nenner über Vergleiche der Gleiche sein (z.B. 1 aus 100 Geimpften erkrankt, während 3 aus 100 ungeimpften erkranken)."
  ),
  nh2 = list(
    regex = regex_nh2
  ),
  mult = list(
    regex = regex_mult
  ),
  mult2 = list(
    regex = gsub("(?<mult>([Hh]alb|[Dd]oppelt|[Dd]reifach|[Dd]reimal) (so )?(viele|gr[oö]ß|hoch|niedrig|besser|erhöht|höher))", "dg", "", perl = TRUE)
  ),
  pval = list(
    regex = gsub(paste0("(?<pval>p ?[\\<\\=] ?", pat_num, ")"), "dg", "", perl = TRUE)
  ),
  confint = list(
    regex = gsub(paste0(pat_num, " ?% ?[CK]I:? \\[?", pat_num, " ?[-\\u2013;,] ?", pat_num, "\\]?"), "dg", "", perl = TRUE)
  ),
  yearnum = list(
    regex = gsub("(?<nyear>\\d+([.|,]\\d+)( Jahr[a-z]*))", "dg", "", perl = TRUE)
    # regex = gsub("(?<age>(\\d+-? bis )*\\d+([.|,]\\d+)?-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))", "dg", "", perl = TRUE)
  ),
  yearnum2 = list(
    regex = gsub("(?<nyear>\\d+( Jahr[a-z]*) ([A-Za-z]+ )?(?=länger|steiger|reduzier))", "dg", "", perl = TRUE)
    # regex = gsub("(?<age>(\\d+-? bis )*\\d+([.|,]\\d+)?-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))", "dg", "", perl = TRUE)
  ),
  rank = list(
    regex = gsub("(?<rank>(Rang|Pl[aä]tze) \\d+( (und|bis) \\d+))", "dg", "", perl = TRUE)
    # regex = gsub("(?<age>(\\d+-? bis )*\\d+([.|,]\\d+)?-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))", "dg", "", perl = TRUE)
  ),
  age = list(
    regex = gsub("(?<age>(?<![,.])(\\d+-? (bis|und) )?\\d+-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))", "dg", "", perl = TRUE)
    # regex = gsub("(?<age>(\\d+-? bis )*\\d+([.|,]\\d+)?-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))", "dg", "", perl = TRUE)
  ),
  currency_post = list(
    regex = gsub(paste0("(?<currency>", pat_num, " ?(EUR|€|Euro|Dollar))"), "dg", "", perl = TRUE)
  ),
  currency_pre = list(
    regex = gsub(paste0("(?<currency>", "(USD|\\$) ?", pat_num, ")"), "dg", "", perl = TRUE)
  )
)



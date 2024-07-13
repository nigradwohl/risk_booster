# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# MODIFIABLE DEFINITIONS
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



# Array of units that should not be considered further
units_exc <- c("age", "currency", "time", "date", "year", "dur", "legal", "medical", "enum", "misc", "rank", "phone")


# Regular expressions: -----------------------------------------------------------------
month_names = c("Januar", "Februar", "März", "April", "Mai", "Juni",
                     "Juli", "August", "September", "Oktober", "November",
                     "Dezember")
pat_num = "(?:(?<![\\-A-Za-zÄÖÜäöüß0-9_.])(?:[0-9]+(?:[.,:][0-9]+)?))(?!\\.[0-9A-Za-zÄÖÜäöüß]|[a-zA-Z0-9ÄÖÜäöüß])";
numwords = c("[Kk]einen?", "(?<![Kk])[Ee]ine?[rm]?(?![gnz])", "[Zz]wei(?!fe)", "[Dd]rei", "[Vv]ier", "[Ff]ünf", "[Ss]echs",
                  "[Ss]ieben", "[Aa]cht(?!e)", "[Nn]eun(?!k)", "[Zz]ehn", "[Ee]lf", "[Zz]wölf")

regex_num = paste0("(?<unknown>", pat_num, "( Millionen| Milliarden)?)")  # regex to detect numbers; d-flag provides beginning and end!.
regex_numwords = paste0("(?<unknown>(", collapse_regex_or(numwords), ") (Person(en)?|F[aä]lle?))")
regex_perc = paste0("(?<perc>(", pat_num, " bzw\\. )?", pat_num, " ?(%|\\-?[Pp]rozent)\\w*(?=[\\s.?!])", ")")
regex_nh = paste0("(?<nh>", pat_num, " (?!%|[Pp]rozent)(\\w+ )?(von|aus|in) (\\w+ )?", pat_num, ")")  # TODO: Handle numberwords here.
regex_nh2 = paste0("(?<nh>(", collapse_regex_or(numwords), ") (?!%|[Pp]rozent)(\\w+ )?(von|aus|in) (\\w+ )?", pat_num, ")")
regex_mult = paste0("(?<mult>", pat_num, "[ \\-]?([Mm]al|[Ff]ach) (so )?( ?viele|gr[oö]ß(er)?|hoch|niedrig(er)?|besser|erhöht|höher)(?=[\\s.?!])", ")")
regex_dur2 = "(?<dur>\d+([,.]\d+)?-?\d*([,.]\d+)?(Minuten?| Stunden?| Tagen?| Wochen?))"





# Dictionaries: -------------------------------------------------------------------------

## Units: -----------------------

check_numbers_dict <- list(
  "perc": regex_perc,
  "perc_word": paste0("(?<perc>(", collapse_regex_or(numwords), ") ?(%|\\-?[Pp]rozent)\\w*(?=[\\s.?!])", ")"),
  "freq_word": regex_numwords,
  "nh": regex_nh,
  "nh2": regex_nh2,
  # multtude of something (e.g. 20-fach).
  "mult": regex_mult,
  "mult2": "(?<mult>([Hh]alb|[Dd]oppelt|[Dd]reifach|[Dd]reimal) (so )?(viele|gr[oö]ß|hoch|niedrig|besser|erhöht|höher))",
  "pval": regexec(paste0("(?<pval>p ?[\\<\\=] ?", pat_num, ")")),
  "confint": regexec(paste0("(?<confint>", pat_num, " ?% ?[CK]I:? \\[?", pat_num, " ?[-\\u2013;,] ?", pat_num, "\\]?)")),
  "yearnum": "(?<nyear>\d+([.|,]\d+)( Jahr[a-z]*))",  # require comma or point separator!
    "yearnum2": "(?<nyear>\d+( Jahr[a-z]*) ([A-Za-z]+ )?(?=länger|steiger|reduzier))",  # require comma or point separator!
    # "lifeexpectancy":
    #     regexec(paste0("(?<nyear>Lebens(dauer|erwartung) (zwischen|von) ", pat_num, "( Jahr[a-z]*))"))  # require comma or pouint separator!
    #     # "(?<age>(\d+-? bis )*\d+([.|,]\d+)?-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))")
  # ,
  # Currently excluded:
    "rank": "(?<rank>(Rang|Pl[aä]tze) \d+( (und|bis) \d+)?)",
  # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # Simple matches:
    "age": "(?<age>(?<![,.])(\d+-? (bis|und) )?\d+-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))",
  "currency_post": regexec(paste0("(?<currency>", pat_num, " ?(EUR|€|Euro|Dollar)", ")")),
  "currency_pre": regexec(paste0("(?<currency>", "(USD|\$) ?", pat_num, ")")),
  "time": "(?<time>(\d{1,2}(\.\d{2})? Uhr)|(\d{1,2}:\d{2}))",
  "date": "(?<date>\d{1,2}\.\d{1,2}\.(18|19|20)\d{2}(?![|.\w]))",
  "month": regexec(paste0("(?<date>\\d{1,2}\\.? (", collapse_regex_or(month_names), ")( \\d{4})?)")),
  "datemon": "(?<date>\d{1,2}\.\d{1,2}\.(18|19|20)\d{2}(?![|.\w]))",
  "year": "(?<year>(Jahr|Anfang|Ende|Mitte|Nach) \d{4})",
  "year2": "(?<year>(18|19|20)?\d{2}er)",
  "year3": "(?<year>(?<!(,|\.|Jahr |Anfang |Ende |Mitte |Nach ))(19|20)\d{2}(?![|.\w]))",  # 20th and 21st century.
  "monyear": regexec(paste0("(?<year>", collapse_regex_or(month_names), " \\d{4})")),
  "yearrange": "(?<year>(zwischen|von) (18|19|20)\d{2}(?![|.\w]) (und|bis) (18|19|20)?\d{2}(?![|.\w]))",
  "dur": "(?<dur>[0-9]+(-stündig|-tägig|-monatig| Minuten?| Stunden?| Tagen?| Wochen?| Monate?))",
  "dur2": regex_dur2,
  "legal": "(?<legal>(Artikel|§|Absatz|Paragra(ph|f)) ?\d+)",
  "medical": paste0("(?<medical>(BMI|Diabetes Typ) ?", pat_num, ")"),
  "medical_post": regexec(paste0("(?<medical>", pat_num, " (Gene))")),
  # Carry-forward match:
    "carry_forward_pre": regexec(paste0("(?<ucarryforward>((waren|sind) es|[Dd]avon[^.]*) (\\w+ ){0,2}", pat_num, "(?=\\W))")),
  # (\w+ ){0,2} allows up to 2 more words.
  "carry_forward_post": regexec(paste0("(?<ucarryforward>", pat_num, " (waren|sind) es)")),
  "phone": "(?<phone>[+]?[0-9]* ?([(]?[0-9]{0,3}[)])?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{1,6})",
  # MIscellaneous numbers to be excluded!
    "misc": paste0("(?<misc>(", pat_num, " bis )?", pat_num, "\\.? (Grad|Staat|Schritt|Kommentare|.[gC](?= .)))"),
  "degree": paste0("(?<misc>(", pat_num, " bis )?", pat_num, "\\.?(.[gC](?= .)))"),
  # Enumeration:
    "enum": "(?<enum>\(\d{1,2}\))",
  # "within_nums":
    #   regexec(paste0("(?<misc>","\w*-?", pat_num, ")"))
  # Default number match:
    "other_num": regex_num
)
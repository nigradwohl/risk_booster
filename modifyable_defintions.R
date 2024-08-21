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
regex_dur2 = "(?<dur>\\d+([,.]\\d+)?-?\\d*([,.]\\d+)?(Minuten?| Stunden?| Tagen?| Wochen?))"


# Person words:
person_all <- c("Proband", "[Tt]eilnehm", "[Pp]erson", "Mensch", "Frauen", "Männer", "Kind", "Erwachsen", "Mädchen", "Junge", "[Ii]nfektion", "[Ii]nfizierte")

# Object that can be looped over to check numbers for number types that are specific to their units in "number_unit" -------
numtype_keyset <- list(
  
  incr = list(
    number_unit = c("perc", "mult", "nyear"),  # Add other types eventually
    keyset = list(
      list(
        paste0(collapse_regex_or(c("[Rr]isiko", "[Ww]ahrscheinlich", "Inzidenz", "Todesfälle"))),
        paste0(collapse_regex_or(c("höher", "erhöht", "so hoch")))
      ),
      list(
        paste0(collapse_regex_or(c("[Rr]isiko", "[Ww]ahrscheinlich", "Inzidenz", "Todesfälle"))),
        paste0(collapse_regex_or(c("so"))),
        paste0(collapse_regex_or(c("hoch")))
      ),
      list(
        paste0(collapse_regex_or(c("[Uu]nterschied", "höher", "vergrößerte"))),
        paste0(collapse_regex_or(c("Lebenserwartung", "Abstand")))
      ),
      list(
        paste0(collapse_regex_or(c("Anstieg")))
      )
    )
  ),
  
  decr = list(
    number_unit = c("perc", "mult", "nyear"),  # Add other types eventually
    keyset = list(
      list(
        paste0(collapse_regex_or(c("[Rr]isiko", "Gefahr", "[Ww]ahrscheinlich", "Inzidenz", "Todesfälle", "Erkrank"))),
        paste0(collapse_regex_or(c("[Rr]eduzier", "minimier", "niedriger", "(ge|ver)ringert?", "s[ae]nk")))
      ),
      list(
        paste0(collapse_regex_or(c("besser"))),
        paste0(collapse_regex_or(c("geschützt")))
      ),
      list(
        paste0(collapse_regex_or(c("st[aeo]rb"))),
        paste0(collapse_regex_or(c("früher")))
      ),
      list(
        paste0(collapse_regex_or(c("weniger"))),
        paste0(collapse_regex_or(c("lebt?en")))
      ),
      list(
        paste0(collapse_regex_or(c("Sterblichkeitslücke"))),
        paste0(collapse_regex_or(c("vergrößert")))
      ),
      list(
        paste0(collapse_regex_or(c("Demenz", "Krankheit"))),
        paste0(collapse_regex_or(c("verlangsamt")))
      )
    )
  ),
  
  ncase = list(
    number_unit = c("freq", "nh"),
    keyset = list(
      list(
        paste0("Fälle|Verläufe"), paste0("insgesamt|nach|Studie")
      ),
      list(
        paste0("[Ee]rkrankt|[Bb]etroffen")
      ),
      list(
        paste0("Todesfälle")
      ),
      list(
        paste0("(ver)?st[aeo]rben"), paste0(collapse_regex_or(person_all))
      ),
      list(
        paste0("berichte(te)?n|entwickel|beobacht|meldet(e|en)"), paste0("Unwohlsein|Nebenwirkungen")
      ),
      list(
        paste0("berichte(te)?n"), paste0("wohl"), paste0("fühlen")
      )
    )
  ),
  
  ntot = list(
    number_unit = c("freq"),
    keyset = list(
      list(
        paste0(collapse_regex_or(person_all)),
        paste0(collapse_regex_or(c("insgesamt", "nahmen", "erh(a|ie)lten", "befragt", "ausgewählt", "umfass(t|en)"))),
        paste0(collapse_regex_or(c("Studie", "Untersuchung", "Erhebung")))
      ),
      list(
        paste0(collapse_regex_or(c("Daten", "[Bb]efragt"))),
        paste0(collapse_regex_or(c("von", "über"))),
        paste0(collapse_regex_or(person_all))
      ),
      list(
        paste0(collapse_regex_or(person_all)),
        paste0(collapse_regex_or(c("Analyse", "rekrutiert")))
      )
    )
  )
)

# Sets of keys to be used with window approach. Will be created upon each click! ----------------
window_keys <- list(
  grouptype = list(
    total = c("[Ii]nsgesamt", "alle_", "Basis", "umfass(t|en)", "waren.*jeweils", "etwa.*[Tt]eiln[ae]hme"),
    sub = c("[Ii]n_", "[Uu]nter_", "[Dd]avon_",
            "der.*[Tt]eilnehmer", "entfielen.*auf")
  ),
  treat_contr = list(
    contr = c("(Kontroll|Placebo|Vergleichs|Scheinpräparat)-?.*([Gg]ruppe|[Ee]mpfänger)",
              "(?<!Impfstoff|Impf)-(Gruppe|Empfänger)",
              "(?<!Impfstoff|Impf|Behandlungs|Untersuchungs)(gruppe|empfänger)",
              "Prävention.*wenigsten.*befolgte",
              "kein.*Medika",
              "Scheinpräparat_(gespritzt|erhalten|bekommen)"),
    treat = c("[Gg]eimpfte?n?", "Impf-?.*([Gg]ruppe|[Em]pfänger)",
              "(?<!Kontroll|Vergleichs|Placebo|Scheinpräparat)-(Gruppe|Empfänger)",
              "(?<!Kontroll|Vergleichs|Placebo|Scheinpräparat)(gruppe|empfänger)",
              "Behandlungsgruppe", "Behandelte", "Impfstoff_(gespritzt|erhalten|bekommen)",
              "([Tt]eilnehmer|Probanden).*Impfung",
              "erh(a|ie)lten.*(Präparat|Medikament)",
              "(Präparat|Medikament|Antidepressiva).*erh(a|ie)lten", "Placebo_geschluckt",
              "gesündesten.*Lebensstil"),
    all = c("(aller|insgesamt).*[Tt]eilnehmer|Probanden",
            "(Teilnehm|Proband).*rekrutiert",
            "insgesamt.*(Fälle|Verläufe)", "(Fälle|Verläufe).*insgesamt",
            "beiden.*Gruppen", "sowohl.*[Gg]ruppe")
  ),
  effside = list(
    eff = c("(?<![Nn]eben)[Ww]irk(?!lich)", "Impfschutz",
            "Schutz", "geschützt",
            "(reduziert|verringert|minimiert|gesunken).*(Risiko|[Gg]efahr|Wahrscheinlichkeit).*(Ansteckung|Infektion|[Ee]rkrank)",
            "((Risiko|[Gg]efahr|Wahrscheinlichkeit).*(Ansteckung|Infektion|[Ee]rkrank)).*(reduziert|verringert|minimiert|gesunken)",
            "(Risiko|[Gg]efahr|Wahrscheinlichkeit).*(reduziert|verringert|minimiert|gesunken)",
            "(Ansteckungsgefahr|Infektionsrisiko).*(nur|verringert)",
            "Reduzierung",
            "(mindert|reduziert).*Symptome",
            "schwer.*Verl[aä]uf",
            "Verbesserung"),
    side = c("Nebenwirk", "Komplikation", "unerwünschte.*Effekt", "Herzmuskelentzündung", "Hirnblutung", "Impfreaktion?en?", "[Hh]erpes", "Fieber", "Gehirnentzündung"),
    damage = c("(Inzidenz|[Ee]rkank|Todesfäll|Risiko).*(erhöht|vielfach)",
               "(erhöht|vielfach).*(Inzidenz|[Ee]rkank|Todesfäll|Risiko)",
               "Risiko.*Erkrank",
               "Todesf[aä]ll|gestorben|tödlich|Infektion",
               "Lebenserwartung.*sink|weniger", "st[aeo]rb.*früher",
               "[Nn]ur.*Gesundheitszustand.*gut",
               "([Gg]esundheit|[Ff]inanz|[Pp]sychisch).*Belastung"),
    all = c("jeweils", "beiden.*Gruppen"),
    sample = c("im.*Alter")
  ),
  incr_decr = list(
    risk_incr = c("(Risiko|Wahrscheinlichkeit).*(erhöht|steigt)",
                  "(erhöht|steigt).*(Risiko|Wahrscheinlichkeit)"),
    risk_decr = c("(Risiko|Wahrscheinlichkeit).*(sinkt|verringert|reduziert)",
                  "(sinkt|verringert|reduziert).*(Risiko|Wahrscheinlichkeit)",
                  "schütz(en|t).*(Erkrankung|Ansteckung)")
  ),
  conditions = list(
    pers = c("Krankenakt"),
    ill = c("erkrank(t|en)", "Verl[äa]uf", "[Ii]nfiziert", "entwickeln"),
    death = c("st[eao]rben", "Todesfälle", "Todesfall(!?e)")
  ),
  units = list(
    freq = c("Proband", "Teilnehm", "Infektion", "Krankenakt"),
    death = c("(ge|ver)st[aeo]rben"),
    medical = c("BMI")
  ),
  rel = list(
    abs = c("[Qq]uote", "Anteil", "mehr_als(?!.*(?:Wirksamkeit|Impfschutz|Schutz(wirkung)?|verlangsamt|gesunken|Anstieg|geschützt))"), 
    rel = c("Wirksamkeit", "Impfschutz", "Schutz(wirkung=?)", "verlangsamt", "gesunken", "Anstieg", "geschützt")
  ),
  reference = list(
    tot = c("(der|aller)_(Studien)?[Tt]eilnehm"),
    sub = c("Kontroll-?.*[Gg]ruppe", "Placebo-?.*[Gg]ruppe",
            "Vergleichs-?.*[Gg]ruppe",
            "Prävention.*wenigsten.*befolgte",
            "kein.*Medika")
  )
)





# Dictionaries: -------------------------------------------------------------------------

## Units: -----------------------

check_numbers_dict <- list(
  "perc" = regex_perc,
  "perc_word" = paste0("(?<perc>(", collapse_regex_or(numwords), ") ?(%|\\-?[Pp]rozent)\\w*(?=[\\s.?!])", ")"),
  "freq_word" = regex_numwords,
  "nh" = regex_nh,
  "nh2" = regex_nh2,
  # multtude of something (e.g. 20-fach).
  "mult" = regex_mult,
  "mult2" = "(?<mult>([Hh]alb|[Dd]oppelt|[Dd]reifach|[Dd]reimal) (so )?(viele|gr[oö]ß|hoch|niedrig|besser|erhöht|höher))",
  "pval" = paste0("(?<pval>p ?[\\<\\=] ?", pat_num, ")"),
  "confint" = paste0("(?<confint>", pat_num, " ?% ?[CK]I:? \\[?", pat_num, " ?[-\\x{2013};,] ?", pat_num, "\\]?)"),
  "yearnum" = "(?<nyear>\\d+([.|,]\\d+)( Jahr[a-z]*))",  # require comma or point separator!
    "yearnum2" = "(?<nyear>\\d+( Jahr[a-z]*) ([A-Za-z]+ )?(?=länger|steiger|reduzier))",  # require comma or point separator!
    # "lifeexpectancy" =
    #     regexec(paste0("(?<nyear>Lebens(dauer|erwartung) (zwischen|von) ", pat_num, "( Jahr[a-z]*))"))  # require comma or pouint separator!
    #     # "(?<age>(\\d+-? bis )*\\d+([.|,]\\d+)?-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))")
  # ,
  # Currently excluded:
    "rank" = "(?<rank>(Rang|Pl[aä]tze) \\d+( (und|bis) \\d+)?)",
  # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # Simple matches:
    age = "(?<age>(?<![,.])(\\d+-? (bis|und) )?\\d+-?( Jahr[a-z]*[ |.]?|-[Jj]ährig[a-z]*))",
  currency_post = paste0("(?<currency>", pat_num, " ?(EUR|€|Euro|Dollar)", ")"),
  currency_pre = paste0("(?<currency>", "(USD|\\$) ?", pat_num, ")"),
  time = "(?<time>(\\d{1,2}(\\.\\d{2})? Uhr)|(\\d{1,2}:\\d{2}))",
  date = "(?<date>\\d{1,2}\\.\\d{1,2}\\.(18|19|20)\\d{2}(?![|.\\w]))",
  month = paste0("(?<date>\\d{1,2}\\.? (", collapse_regex_or(month_names), ")( \\d{4})?)"),
  datemon = "(?<date>\\d{1,2}\\.\\d{1,2}\\.(18|19|20)\\d{2}(?![|.\\w]))",
  year = "(?<year>(Jahr|Anfang|Ende|Mitte|Nach) \\d{4})",
  year2 = "(?<year>(18|19|20)?\\d{2}er)",
  year3 = "(?<year>(?<!,|\\.|Jahr |Anfang |Ende |Mitte |Nach )(19|20)\\d{2}(?![|.\\w]))",  # 20th and 21st century.
  monyear = paste0("(?<year>", collapse_regex_or(month_names), " \\d{4})"),
  yearrange = "(?<year>(zwischen|von) (18|19|20)\\d{2}(?![|.\\w]) (und|bis) (18|19|20)?\\d{2}(?![|.\\w]))",
  dur = "(?<dur>[0-9]+(-stündig|-tägig|-monatig| Minuten?| Stunden?| Tagen?| Wochen?| Monate?))",
  dur2 = regex_dur2,
  legal = "(?<legal>(Artikel|§|Absatz|Paragra(ph|f)) ?\\d+)",
  medical = paste0("(?<medical>(BMI|Diabetes Typ) ?", pat_num, ")"),
  medical_post = paste0("(?<medical>", pat_num, " (Gene))"),
  # Carry-forward match:
    carry_forward_pre = paste0("(?<ucarryforward>((waren|sind) es|[Dd]avon[^.]*) (\\w+ ){0,2}", pat_num, "(?=\\W))"),
  # (\\w+ ){0,2} allows up to 2 more words.
  carry_forward_post = paste0("(?<ucarryforward>", pat_num, " (waren|sind) es)"),
  carry_back = paste0("(?<ucarryback>", pat_num, " (bzw\\.|und|bis))", "dg"),
  phone = "(?<phone>[+]?[0-9]* ?([(]?[0-9]{0,3}[)])?[-\\s.]?[0-9]{3,4}[-\\s.]?[0-9]{3,4}[-\\s.]?[0-9]{1,6})",
  # MIscellaneous numbers to be excluded!
    misc = paste0("(?<misc>(", pat_num, " bis )?", pat_num, "\\.? (Grad|Staat|Schritt|Kommentare|.[gC](?= .)))"),
  degree = paste0("(?<misc>(", pat_num, " bis )?", pat_num, "\\.?(.[gC](?= .)))"),
  # Enumeration:
    enum = "(?<enum>\\(\\d{1,2}\\))",
  # within_nums =
    #   regexec(paste0("(?<misc>","\\w*-?", pat_num, ")"))
  # Default number match:
    other_num = regex_num
)

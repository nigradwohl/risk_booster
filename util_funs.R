# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# UNTILITY FUNCTIONS
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Collapse a vector to a regex separated by "OR":

collapse_regex_or <- function(key_list) {
  keystr <- paste(key_list, collapse = "|")
  return(keystr)
}

#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    https://shiny.posit.co/
#

library(shiny)



# Define server logic:
server <- function(input, output) {}

# Run the application 
shinyApp(ui = htmlTemplate("www/landing_page.html"), server)

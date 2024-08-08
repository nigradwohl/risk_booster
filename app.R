#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    https://shiny.posit.co/
#

library(shiny)

cur_template <- paste0(readLines("www/landing_page.html"), collapse = "")


# Define server logic:
server <- function(input, output) {
  
  output$instructions <- renderText(HTML("<p>Bitte geben Sie das Passwort ein. Wenn Sie kein Passwort haben,
         kontaktieren Sie uns unter
         <a href='mailto:risk.booster@gmail.com?subject=\"Zugang Riskbooster\">risk.booster@gmail.com</a></p>"))

  observeEvent(input$showApp,
               {
                 # Works ok-ish -- icons are missing:
                 # insertUI('body',
                 #          ui = HTML(
                 #            paste0(readLines("www/landing_page.html"), collapse = ""))
                 #          )

                 # print(cur_template)
                 
                 # TODO: Maybe also read CSS? 
                 
                 if(input$password == "1234"){
                   insertUI('html',
                            ui = htmlTemplate("www/landing_page.html")
                   )
                   
                   # Remove the button (later password field):
                   removeUI(selector = ".container-fluid")
                   
                   tags$script('$(document).ready(function(){
                   alert( "Handler for `click` called." );
                   })')
                   
                 } else {
                   output$feedback <- renderText("Falsches Passwort!")
                 }


               })
}
  


ui <- fluidPage(
  
  tags$head(HTML('
    <meta charset="UTF-8">
    <link rel="stylesheet" href="stylefiles/global_styles.css">
<!--    <link rel="stylesheet" href="stylefiles/functional_styles.css">-->
    <link rel="stylesheet" href="stylefiles/textcheck-styles.css">

    <script src="jquery/jquery-3.7.1.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!--    Check whether to download the icon library or the icons-->

    <script src="global_scripts.js"></script>
    <script src="scripts/info_data.js"></script>
    <title>Text processing test</title>

    <style media="print">
        .noprint {
            display: none;
        }
    </style>
')),
  
    textOutput("instructions"),
    # HTML("<p>Bitte geben Sie das Passwort ein. Wenn Sie kein Passwort haben,
    #      kontaktieren Sie uns unter
    #      <a href='mailto:risk.booster@gmail.com?subject=\"Zugang Riskbooster\">risk.booster@gmail.com</a></p>"),
    textInput("password", "Passwort"),
    # TODO: Make HTML control that is type password.
    htmlOutput("feedback"),
    actionButton('showApp', "Show App")


)

# Run the application 
# shinyApp(ui = htmlTemplate("www/landing_page.html"), server)
shinyApp(ui = ui, server)

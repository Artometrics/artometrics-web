#!/usr/bin/env Rscript
# Install CRAN packages used by Artometrics R chart scripts and article tooling.

pkgs <- c(
  "tidyverse",
  "scales",
  "plotly",
  "jsonlite",
  "showtext",
  "sysfonts",
  "httr2",
  "dotenv"
)

missing <- pkgs[!vapply(pkgs, requireNamespace, quietly = TRUE, FUN.VALUE = logical(1))]

if (!length(missing)) {
  message("All Artometrics R packages already installed.")
  quit(status = 0)
}

message("Installing: ", paste(missing, collapse = ", "))
install.packages(
  missing,
  repos = "https://cloud.r-project.org/",
  dependencies = c("Depends", "Imports")
)

failed <- pkgs[!vapply(pkgs, requireNamespace, quietly = TRUE, FUN.VALUE = logical(1))]
if (length(failed)) {
  stop("Failed to install: ", paste(failed, collapse = ", "))
}

message("Done.")

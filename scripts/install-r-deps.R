#!/usr/bin/env Rscript
# Install CRAN packages used by Artometrics R chart scripts and article tooling.

pkgs <- c(
  "tidyverse",
  "scales",
  "plotly",
  "jsonlite",
  "showtext",
  "sysfonts",
  "ggtext",
  "cowplot",
  "patchwork",
  "ragg",
  "httr2",
  "dotenv",
  # Used by gold Artometrics Quarto reports
  "ggrepel",
  "glue",
  "janitor",
  "ggridges",
  "fmsb",
  "igraph",
  "ggraph",
  "tidygraph",
  "Lahman",
  "httr",
  "readxl"
)

missing <- pkgs[!vapply(pkgs, requireNamespace, quietly = TRUE, FUN.VALUE = logical(1))]

if (!length(missing)) {
  message("All Artometrics R packages already installed.")
  quit(status = 0)
}

message("Installing: ", paste(missing, collapse = ", "))
lib <- Sys.getenv("R_LIBS_USER")
if (!nzchar(lib)) {
  lib <- file.path(Sys.getenv("HOME"), "R", paste0(R.version$platform, "-library"), paste0(R.version$major, ".", R.version$minor))
}
dir.create(lib, recursive = TRUE, showWarnings = FALSE)
install.packages(
  missing,
  lib = lib,
  repos = "https://cloud.r-project.org/",
  dependencies = c("Depends", "Imports", "LinkingTo")
)

failed <- pkgs[!vapply(pkgs, requireNamespace, quietly = TRUE, FUN.VALUE = logical(1))]
if (length(failed)) {
  stop("Failed to install: ", paste(failed, collapse = ", "))
}

message("Done.")

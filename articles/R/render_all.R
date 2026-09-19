#!/usr/bin/env Rscript
# Render each standalone Quarto project under articles/<slug>/.

args <- commandArgs(trailingOnly = TRUE)
limit <- NULL
if (length(args) >= 2 && args[1] == "--limit") {
  limit <- as.integer(args[2])
}

root <- if (file.exists("articles/R/render_all.R")) {
  normalizePath("articles", winslash = "/", mustWork = TRUE)
} else if (file.exists("R/render_all.R")) {
  normalizePath(".", winslash = "/", mustWork = TRUE)
} else {
  stop("Run from the artometrics-web repo root")
}

skip_dirs <- c("tools", "styles", "assets", "R", "figures", "outputs")

find_projects <- function(base) {
  if (!dir.exists(base)) return(character())
  tops <- list.dirs(base, full.names = TRUE, recursive = FALSE)
  tops <- tops[!basename(tops) %in% skip_dirs]
  tops <- tops[!grepl("^_", basename(tops))]
  tops[file.exists(file.path(tops, "_quarto.yml"))]
}

projects <- find_projects(root)
if (length(projects) == 0) {
  stop("No article projects found (expected _quarto.yml under articles/<slug>/)")
}

if (!is.null(limit) && limit > 0) {
  projects <- head(projects, limit)
}

failed <- character()
for (proj in projects) {
  message("Quarto project: ", proj)
  status <- system2("quarto", "render", stdout = TRUE, stderr = TRUE, wd = proj)
  writeLines(status)
  exit_code <- attr(status, "status")
  if (!is.null(exit_code) && exit_code != 0) {
    failed <- c(failed, proj)
  }
}

if (length(failed) > 0) {
  stop("Failed renders: ", paste(failed, collapse = ", "))
}

message("All requested article renders completed.")

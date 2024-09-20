$addon_name = "copy-as-twitter"
# Define the files to zip and the output file name
$filesToZip = "src"
$outDir = "dist"
$outputZip = "$outDir\$addon_name.xpi"

if (-Not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir
}

# Create the zip archive
Compress-Archive -Path $filesToZip -DestinationPath $outputZip -Force

# Optional: Output a success message
Write-Host "Files zipped and renamed to $outputZip"

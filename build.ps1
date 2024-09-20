$addon_name = "copy-as-twitter"
# Define the files to zip and the output file name
$srcDir = "src"
$outDir = "$PSScriptRoot\dist"
$outputZip = "$outDir\$addon_name.xpi"

if (-Not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir
}

# Create the zip archive
Push-Location $srcDir
Compress-Archive -Path ".\*" -DestinationPath $outputZip -Force
Pop-Location

Write-Host "Files zipped and renamed to $outputZip"

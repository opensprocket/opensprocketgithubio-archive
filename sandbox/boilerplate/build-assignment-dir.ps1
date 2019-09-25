#get user input
Write-Host -Object "Create a folder structure with all the needed files"
Write-Host -Object "Make sure to run from the root folder!"
$rootFolder = Read-Host -Prompt "Root folder name: "
$mainIndex = Read-Host -Prompt "Main HTML file name: "
#set onedrive path
$oneDrive = 

#make folder structure & copy files
mkdir $rootFolder
cd $rootFolder
#copy in index file
copy 
mkdir css
mkdir js
mkdir images


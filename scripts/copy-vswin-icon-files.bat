@echo off
set /p SOURCE_PATH="Enter source folder path: "
xcopy %SOURCE_PATH%\*_16x.png ..\public\catalog\vswin-icons /s/i
xcopy %SOURCE_PATH%\*_16x.svg ..\public\catalog\vswin-icons /s/i
xcopy %SOURCE_PATH%\*_16x.xaml ..\public\catalog\vswin-icons /s/i

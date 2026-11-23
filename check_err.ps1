$p = Start-Process -FilePath "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList "--headless --disable-gpu --enable-logging=stderr file:///F:/TKW_JADE/pages/search.html" -NoNewWindow -PassThru -RedirectStandardError "edge_err.log"
$p.WaitForExit()
Get-Content "edge_err.log" | Select-String -Pattern "Uncaught|Error|SyntaxError|ReferenceError|TypeError"
Remove-Item "edge_err.log" -ErrorAction SilentlyContinue
